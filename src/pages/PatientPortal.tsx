import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";

type TriState = "sim" | "nao" | "nao-programado";
type NutritionState = "atingida" | "parcial" | "nao";
type TabId = "inicio" | "ficha" | "diario" | "evolucao" | "materiais" | "arquivos" | "avisos";
type Goal = { id: string; name: string; guidance: string; frequency: string };
type CheckIn = {
  id: string;
  date: string;
  strength: TriState;
  cardio: TriState;
  protein: NutritionState;
  fiber: NutritionState;
  water: NutritionState;
  sleepTime: string;
  wakeTime: string;
  awakenings: number;
  sleepQuality: number;
  energy: number;
  stress: number;
  goals: Record<string, TriState>;
  symptoms: Record<string, boolean>;
  observation: string;
};
type PortalData = { version: 1; goals: Goal[]; checkIns: CheckIn[] };
type Draft = Omit<CheckIn, "id">;
type Range = "7" | "30" | "90" | "todo";

const STORAGE_KEY = "lapidar.patient-portal.v1";
const STARTER_GOALS: Goal[] = [
  { id: "meta-pausa", name: "Pausa consciente", guidance: "Reserve alguns minutos para respirar e desacelerar.", frequency: "Diária" },
  { id: "meta-rotina", name: "Rotina de autocuidado", guidance: "Siga o combinado na sua consulta.", frequency: "5x por semana" },
];
const SYMPTOMS = ["Fogachos", "Ressecamento", "Irritabilidade", "Névoa mental", "Libido"];
const NAV_TABS: { id: TabId; label: string; mobileLabel: string; icon: string }[] = [
  { id: "inicio", label: "Início", mobileLabel: "Início", icon: "⌂" },
  { id: "ficha", label: "Minha ficha", mobileLabel: "Ficha", icon: "♡" },
  { id: "diario", label: "Diário", mobileLabel: "Diário", icon: "✎" },
  { id: "evolucao", label: "Evolução", mobileLabel: "Evolução", icon: "↗" },
  { id: "materiais", label: "Materiais", mobileLabel: "Materiais", icon: "▤" },
  { id: "arquivos", label: "Arquivos", mobileLabel: "Arquivos", icon: "▧" },
];
const colors = {
  wine: "#5B2333",
  wineDark: "#3E1623",
  wineLight: "#7A3047",
  wineSoft: "rgba(91, 35, 51, 0.07)",
  gold: "#C6A15B",
  goldLight: "#E2C98D",
  cream: "#F5EFE6",
  paper: "#FAF6F0",
  border: "rgba(91, 35, 51, 0.16)",
  text: "#2A0E16",
  muted: "#7A6569",
};
const cardStyle = {
  background: "#FAF6F0",
  border: "1px solid rgba(91, 35, 51, 0.13)",
  borderRadius: 20,
  boxShadow: "0 4px 18px rgba(91, 35, 51, 0.05)",
};
const buttonBase = { border: 0, cursor: "pointer", font: "inherit" };

function localToday() {
  const date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isTriState(value: unknown): value is TriState {
  return value === "sim" || value === "nao" || value === "nao-programado";
}

function isNutritionState(value: unknown): value is NutritionState {
  return value === "atingida" || value === "parcial" || value === "nao";
}

function parseData(raw: string): PortalData {
  const value: unknown = JSON.parse(raw);
  if (!isObject(value) || value.version !== 1 || !Array.isArray(value.goals) || !Array.isArray(value.checkIns)) {
    throw new Error("O formato dos dados salvos não é reconhecido.");
  }
  const goals = value.goals;
  const checkIns = value.checkIns;
  if (!goals.every((item) => isObject(item) && typeof item.id === "string" && typeof item.name === "string" && typeof item.guidance === "string" && typeof item.frequency === "string")) {
    throw new Error("Há uma meta inválida nos dados salvos.");
  }
  const validCheckIn = (item: unknown): item is CheckIn => {
    if (!isObject(item)) return false;
    return typeof item.id === "string"
      && typeof item.date === "string"
      && isTriState(item.strength)
      && isTriState(item.cardio)
      && isNutritionState(item.protein)
      && isNutritionState(item.fiber)
      && isNutritionState(item.water)
      && typeof item.sleepTime === "string"
      && typeof item.wakeTime === "string"
      && typeof item.awakenings === "number"
      && Number.isFinite(item.awakenings)
      && typeof item.sleepQuality === "number"
      && Number.isFinite(item.sleepQuality)
      && typeof item.energy === "number"
      && Number.isFinite(item.energy)
      && typeof item.stress === "number"
      && Number.isFinite(item.stress)
      && isObject(item.goals)
      && Object.values(item.goals).every(isTriState)
      && isObject(item.symptoms)
      && Object.values(item.symptoms).every((symptom) => typeof symptom === "boolean")
      && typeof item.observation === "string";
  };
  if (!checkIns.every(validCheckIn)) throw new Error("Há um registro inválido nos dados salvos.");
  return { version: 1, goals: goals as Goal[], checkIns: checkIns as CheckIn[] };
}

function emptyDraft(goals: Goal[]): Draft {
  return {
    date: localToday(),
    strength: "nao-programado",
    cardio: "nao-programado",
    protein: "nao",
    fiber: "nao",
    water: "nao",
    sleepTime: "",
    wakeTime: "",
    awakenings: 0,
    sleepQuality: 5,
    energy: 5,
    stress: 5,
    goals: Object.fromEntries(goals.map((goal) => [goal.id, "nao-programado"])),
    symptoms: {},
    observation: "",
  };
}

function dateLabel(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}

function Card({ children, className = "", style = {} }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <section className={className} style={{ ...cardStyle, ...style }}>{children}</section>;
}

function Heading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1.5">
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: colors.gold }} />
        <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#8B6A42" }}>{eyebrow}</p>
      </div>
      <h2 className="text-2xl font-semibold sm:text-3xl" style={{ color: colors.wine, fontFamily: "var(--font-serif, Georgia, serif)" }}>{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6" style={{ color: colors.muted }}>{description}</p>
    </div>
  );
}

function Choice<T extends string>({ label, value, options, onChange }: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold" style={{ color: colors.wine }}>{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className="rounded-full px-3.5 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-sm"
              style={{
                ...buttonBase,
                background: selected ? "linear-gradient(135deg, #6B2A3C, #5B2333)" : "rgba(91, 35, 51, 0.06)",
                color: selected ? "#F4EFE7" : colors.wine,
                border: `1.5px solid ${selected ? "#5B2333" : "rgba(91, 35, 51, 0.2)"}`,
                boxShadow: selected ? "0 2px 10px rgba(91,35,51,0.28)" : "none",
                outlineColor: colors.gold,
                transition: "all 0.15s ease",
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Slider({ label, value, onChange, minLabel, maxLabel }: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  minLabel: string;
  maxLabel: string;
}) {
  const id = `slider-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold" style={{ color: colors.text }}>{label}</label>
        <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: colors.cream, color: colors.wine }}>{value}/10</span>
      </div>
      <input id={id} type="range" min="0" max="10" value={value} onChange={(event) => onChange(Number(event.target.value))} className="w-full accent-[#5B2333]" aria-valuetext={`${value} de 10`} />
      <div className="flex justify-between text-[11px]" style={{ color: "#807572" }}><span>{minLabel}</span><span>{maxLabel}</span></div>
    </div>
  );
}

function adherenceFor(entry: CheckIn, goals: Goal[]): number | null {
  const values: (TriState | NutritionState)[] = [entry.strength, entry.cardio, entry.protein, entry.fiber, entry.water];
  goals.forEach((goal) => values.push(entry.goals[goal.id] ?? "nao-programado"));
  const applicable = values.filter((value) => value !== "nao-programado");
  if (applicable.length === 0) return null;
  const score = applicable.reduce((sum, value) => sum + (value === "sim" || value === "atingida" ? 1 : value === "parcial" ? 0.5 : 0), 0);
  return Math.round(score * 100 / applicable.length);
}

export default function PatientPortal({ lapidar40Plus = false }: { lapidar40Plus?: boolean }) {
  const [activeTab, setActiveTab] = useState<TabId>("inicio");
  const [data, setData] = useState<PortalData>({ version: 1, goals: STARTER_GOALS, checkIns: [] });
  const [draft, setDraft] = useState<Draft>(() => emptyDraft(STARTER_GOALS));
  const [storageReady, setStorageReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [range, setRange] = useState<Range>("30");
  const [goalEditorOpen, setGoalEditorOpen] = useState(false);
  const [goalDraft, setGoalDraft] = useState<Goal>({ id: "", name: "", guidance: "", frequency: "" });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const loaded = parseData(raw);
        setData(loaded);
        setDraft(emptyDraft(loaded.goals));
      }
      setStorageReady(true);
    } catch (error) {
      setStorageError(error instanceof Error ? `Não foi possível ler os dados locais: ${error.message}` : "Não foi possível ler os dados locais.");
      setStorageReady(true);
    }
  }, []);

  const persist = (next: PortalData): boolean => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setStorageError(null);
      setNotice("Alterações salvas neste dispositivo.");
      return true;
    } catch (error) {
      setStorageError(error instanceof Error ? `Não foi possível salvar no dispositivo: ${error.message}` : "Não foi possível salvar no dispositivo.");
      setNotice("");
      return false;
    }
  };

  const setDraftField = <K extends keyof Draft,>(key: K, value: Draft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setNotice("");
  };

  const resetLocalData = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      const fresh: PortalData = { version: 1, goals: STARTER_GOALS, checkIns: [] };
      setData(fresh);
      setDraft(emptyDraft(fresh.goals));
      setStorageError(null);
      setNotice("Dados locais apagados. Você pode começar um novo diário.");
    } catch (error) {
      setStorageError(error instanceof Error ? `Não foi possível limpar os dados locais: ${error.message}` : "Não foi possível limpar os dados locais.");
    }
  };

  const saveCheckIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!storageReady || storageError) return;
    const entry: CheckIn = {
      ...draft,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      symptoms: lapidar40Plus ? draft.symptoms : {},
    };
    const next = { ...data, checkIns: [entry, ...data.checkIns] };
    if (persist(next)) {
      setData(next);
      // Comemoração por meta: confete se adesão >= 80%
      const adh = adherenceFor(entry, data.goals);
      if (adh !== null && adh >= 80) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3500);
      }
      setDraft(emptyDraft(data.goals));
      setActiveTab("evolucao");
    }
  };

  const saveGoal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!storageReady || storageError) return;
    const normalized = {
      ...goalDraft,
      name: goalDraft.name.trim(),
      guidance: goalDraft.guidance.trim(),
      frequency: goalDraft.frequency.trim(),
    };
    if (!normalized.name || !normalized.guidance || !normalized.frequency) {
      setNotice("Preencha o nome, a orientação e a frequência da meta.");
      return;
    }
    const id = normalized.id || `meta-${Date.now()}`;
    const goal = { ...normalized, id };
    const goals = normalized.id ? data.goals.map((item) => item.id === id ? goal : item) : [...data.goals, goal];
    const next = { ...data, goals };
    if (persist(next)) {
      setData(next);
      setDraft((current) => ({ ...current, goals: { ...current.goals, [id]: current.goals[id] ?? "nao-programado" } }));
      closeGoalEditor();
    }
  };

  const closeGoalEditor = () => {
    setGoalEditorOpen(false);
    setGoalDraft({ id: "", name: "", guidance: "", frequency: "" });
  };

  const deleteGoal = (id: string) => {
    if (!storageReady || storageError) return;
    const next = { ...data, goals: data.goals.filter((goal) => goal.id !== id) };
    if (persist(next)) {
      setData(next);
      setDraft((current) => {
        const goals = { ...current.goals };
        delete goals[id];
        return { ...current, goals };
      });
    }
  };

  const filteredCheckIns = useMemo(() => {
    if (range === "todo") return data.checkIns;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - Number(range) + 1);
    cutoff.setHours(0, 0, 0, 0);
    return data.checkIns.filter((entry) => new Date(`${entry.date}T00:00:00`).getTime() >= cutoff.getTime());
  }, [data.checkIns, range]);

  const adherence = filteredCheckIns.map((entry) => adherenceFor(entry, data.goals)).filter((value): value is number => value !== null);
  const averageAdherence = adherence.length ? Math.round(adherence.reduce((sum, value) => sum + value, 0) / adherence.length) : null;
  const latestCheckIn = data.checkIns[0];

  const renderHome = () => (
    <>
      <div className="mb-6 overflow-hidden rounded-[28px] p-6 sm:p-9" style={{ background: "linear-gradient(120deg, #5B2333, #713448)", color: colors.paper }}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "#E2C98D" }}>Seu espaço de cuidado</p>
        <h2 className="max-w-xl text-3xl leading-tight sm:text-4xl" style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}>Um passo de cada vez, no seu ritmo.</h2>
        <p className="mt-3 max-w-xl text-sm leading-6" style={{ color: "rgba(255,252,248,.8)" }}>Acompanhe sua jornada, registre como você está e encontre aqui o que sua equipe preparou para você.</p>
        <button type="button" onClick={() => setActiveTab("diario")} className="mt-5 rounded-full px-5 py-3 text-sm font-bold" style={{ ...buttonBase, background: "#E2C98D", color: "#3E1623" }}>Fazer meu check-in <span aria-hidden="true">→</span></button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5" style={{ borderTop: "3.5px solid #5B2333", background: "#FAF6F0" }}>
          <p className="text-xs uppercase tracking-wide font-bold" style={{ color: "#8B6A42" }}>Próxima consulta</p>
          <p className="mt-2 text-xl font-bold" style={{ color: colors.wine }}>15 de outubro</p>
          <p className="mt-1 text-sm" style={{ color: colors.muted }}>Quinta-feira · 14h30 · Online</p>
        </Card>
        <Card className="p-5" style={{ borderTop: "3.5px solid #5B2333", background: "#FAF6F0" }}>
          <p className="text-xs uppercase tracking-wide font-bold" style={{ color: "#8B6A42" }}>Diário Lapidar</p>
          <p className="mt-2 text-xl font-bold" style={{ color: colors.wine }}>{data.checkIns.length} {data.checkIns.length === 1 ? "registro" : "registros"}</p>
          <p className="mt-1 text-sm" style={{ color: colors.muted }}>{latestCheckIn ? `Último: ${dateLabel(latestCheckIn.date)}` : "Seu primeiro check-in começa aqui."}</p>
        </Card>
        <Card className="p-5" style={{ borderTop: "3.5px solid #5B2333", background: "#FAF6F0" }}>
          <p className="text-xs uppercase tracking-wide font-bold" style={{ color: "#8B6A42" }}>Para você</p>
          <p className="mt-2 text-xl font-bold" style={{ color: colors.wine }}>1 material novo</p>
          <p className="mt-1 text-sm" style={{ color: colors.muted }}>Guia de rotina e bem-estar</p>
        </Card>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className="p-5 sm:p-6" style={{ borderLeft: "4px solid #5B2333", background: "#FAF6F0" }}>
          <h3 className="text-lg font-semibold" style={{ color: colors.wine, fontFamily: "var(--font-serif, Georgia, serif)" }}>Sua próxima conversa</h3>
          <p className="mt-2 text-sm leading-6" style={{ color: colors.muted }}>Nutrição e hábitos · 15 de outubro, às 14h30</p>
          <button type="button" onClick={() => setActiveTab("ficha")} className="mt-4 text-sm font-bold" style={{ ...buttonBase, background: "transparent", color: colors.wine }}>Ver consultas →</button>
        </Card>
        <Card className="p-5 sm:p-6" style={{ borderLeft: "4px solid #5B2333", background: "#FAF6F0" }}>
          <h3 className="text-lg font-semibold" style={{ color: colors.wine, fontFamily: "var(--font-serif, Georgia, serif)" }}>Um lembrete gentil</h3>
          <p className="mt-2 text-sm leading-6" style={{ color: colors.muted }}>Pequenas escolhas consistentes também são progresso. Registre seu dia sem buscar perfeição.</p>
          <button type="button" onClick={() => setActiveTab("evolucao")} className="mt-4 text-sm font-bold" style={{ ...buttonBase, background: "transparent", color: colors.wine }}>Ver minha evolução →</button>
        </Card>
      </div>
    </>
  );

  const renderProfile = () => (
    <>
      <Heading eyebrow="Minha ficha" title="Seu cuidado, em um só lugar" description="Informações fictícias para demonstrar como sua área pessoal pode funcionar." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8B6A42" }}>Dados pessoais</p>
          <h3 className="mt-3 text-2xl" style={{ color: colors.wine, fontFamily: "var(--font-serif, Georgia, serif)" }}>Mariana Oliveira</h3>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
            <div><dt style={{ color: "#807572" }}>Nascimento</dt><dd className="mt-1 font-medium">12/04/1982</dd></div>
            <div><dt style={{ color: "#807572" }}>E-mail</dt><dd className="mt-1 break-all font-medium">mariana.exemplo@email.com</dd></div>
            <div><dt style={{ color: "#807572" }}>Objetivo</dt><dd className="mt-1 font-medium">Mais energia e bem-estar</dd></div>
            <div><dt style={{ color: "#807572" }}>Acompanhamento</dt><dd className="mt-1 font-medium">Nutrição integrativa</dd></div>
          </dl>
          <p className="mt-5 rounded-xl p-3 text-xs leading-5" style={{ background: colors.cream, color: colors.muted }}>Informações demonstrativas. Neste protótipo, seus dados não são enviados à clínica.</p>
        </Card>
        <Card className="p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8B6A42" }}>Consultas</p>
          <div className="mt-4 border-l-2 pl-4" style={{ borderColor: colors.gold }}><p className="text-xs" style={{ color: "#807572" }}>Próxima consulta · 15 out, 14h30</p><h3 className="mt-1 font-semibold" style={{ color: colors.wine }}>Acompanhamento de rotina</h3><p className="mt-1 text-sm" style={{ color: colors.muted }}>Online · Nutrição</p><span className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ color: "#66724A", background: "#EEF1E8" }}>Confirmada</span></div>
          <div className="mt-5 border-l-2 pl-4" style={{ borderColor: colors.border }}><p className="text-xs" style={{ color: "#807572" }}>Consulta anterior · 20 set, 10h</p><h3 className="mt-1 font-semibold" style={{ color: colors.wine }}>Acolhimento e planejamento</h3><p className="mt-1 text-sm" style={{ color: colors.muted }}>Online · Nutrição</p></div>
        </Card>
      </div>
      <Card className="mt-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8B6A42" }}>Diário Lapidar</p><h3 className="mt-1 text-xl" style={{ color: colors.wine, fontFamily: "var(--font-serif, Georgia, serif)" }}>Metas personalizadas</h3></div>
          {!goalEditorOpen && <button type="button" disabled={!storageReady || Boolean(storageError)} onClick={() => { setGoalDraft({ id: "", name: "", guidance: "", frequency: "" }); setGoalEditorOpen(true); }} className="rounded-full px-4 py-2 text-xs font-bold disabled:opacity-50" style={{ ...buttonBase, background: colors.wine, color: colors.paper }}>Adicionar meta</button>}
        </div>
        {data.goals.length === 0 && <p className="mt-4 text-sm" style={{ color: colors.muted }}>Nenhuma meta personalizada ainda.</p>}
        <div className="mt-3 divide-y" style={{ borderColor: colors.border }}>
          {data.goals.map((goal) => (
            <div key={goal.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div className="min-w-0"><p className="text-sm font-semibold" style={{ color: colors.text }}>{goal.name} <span className="font-normal" style={{ color: "#807572" }}>· {goal.frequency}</span></p><p className="mt-1 text-xs leading-5" style={{ color: "#807572" }}>{goal.guidance}</p></div>
              <div className="flex gap-2">
                <button type="button" disabled={!storageReady || Boolean(storageError)} onClick={() => { setGoalDraft(goal); setGoalEditorOpen(true); }} className="rounded-full px-3 py-2 text-xs font-semibold disabled:opacity-50" style={{ ...buttonBase, background: colors.cream, color: colors.wine }}>Editar</button>
                <button type="button" disabled={!storageReady || Boolean(storageError)} onClick={() => { if (window.confirm(`Remover a meta “${goal.name}”?`)) deleteGoal(goal.id); }} className="rounded-full px-3 py-2 text-xs font-semibold disabled:opacity-50" style={{ ...buttonBase, background: "#FFF3EF", color: "#783A31" }} aria-label={`Remover a meta ${goal.name}`}>Remover</button>
              </div>
            </div>
          ))}
        </div>
        {goalEditorOpen && (
          <form onSubmit={saveGoal} className="mt-4 rounded-2xl p-4 sm:p-5" style={{ background: "#F8F4EE" }}>
            <h4 className="font-semibold" style={{ color: colors.wine }}>{goalDraft.id ? "Editar meta" : "Nova meta"}</h4>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div><label htmlFor="goal-name" className="mb-1 block text-xs font-semibold" style={{ color: colors.text }}>Nome</label><input id="goal-name" required maxLength={70} value={goalDraft.name} onChange={(event) => setGoalDraft((current) => ({ ...current, name: event.target.value }))} className="w-full rounded-xl border px-3 py-2.5 text-sm" style={{ borderColor: "#D8CEC1", background: colors.paper }} /></div>
              <div><label htmlFor="goal-frequency" className="mb-1 block text-xs font-semibold" style={{ color: colors.text }}>Frequência</label><input id="goal-frequency" required maxLength={50} placeholder="Ex.: diária, 3x por semana" value={goalDraft.frequency} onChange={(event) => setGoalDraft((current) => ({ ...current, frequency: event.target.value }))} className="w-full rounded-xl border px-3 py-2.5 text-sm" style={{ borderColor: "#D8CEC1", background: colors.paper }} /></div>
              <div className="sm:col-span-2"><label htmlFor="goal-guidance" className="mb-1 block text-xs font-semibold" style={{ color: colors.text }}>Orientação</label><textarea id="goal-guidance" required maxLength={180} rows={2} value={goalDraft.guidance} onChange={(event) => setGoalDraft((current) => ({ ...current, guidance: event.target.value }))} className="w-full resize-y rounded-xl border px-3 py-2.5 text-sm" style={{ borderColor: "#D8CEC1", background: colors.paper }} /></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2"><button type="submit" disabled={!storageReady || Boolean(storageError)} className="rounded-full px-4 py-2 text-xs font-bold disabled:opacity-50" style={{ ...buttonBase, background: colors.wine, color: colors.paper }}>Salvar meta</button><button type="button" onClick={closeGoalEditor} className="rounded-full px-4 py-2 text-xs font-semibold" style={{ ...buttonBase, background: colors.border, color: colors.wine }}>Cancelar</button></div>
          </form>
        )}
      </Card>
    </>
  );

  const renderDiary = () => (
    <>
      <Heading eyebrow="Diário Lapidar" title="Como foi o seu dia?" description="Leva poucos minutos. Não existe resposta certa — este espaço é seu." />
      <form onSubmit={saveCheckIn}>
        <Card className="mb-4 p-5 sm:p-7"><label htmlFor="checkin-date" className="mb-2 block text-sm font-semibold" style={{ color: colors.text }}>Dia do registro</label><input id="checkin-date" type="date" required max={localToday()} value={draft.date} onChange={(event) => setDraftField("date", event.target.value)} className="rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "#D8CEC1", background: colors.paper, color: colors.text }} /></Card>
        <Card className="mb-4 p-5 sm:p-7">
          <h3 className="mb-5 text-xl" style={{ color: colors.wine, fontFamily: "var(--font-serif, Georgia, serif)" }}>Movimento e nutrição</h3>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <Choice label="Musculação" value={draft.strength} onChange={(value) => setDraftField("strength", value)} options={[{ value: "sim", label: "Sim" }, { value: "nao", label: "Não" }, { value: "nao-programado", label: "Não programado" }]} />
            <Choice label="Cardio" value={draft.cardio} onChange={(value) => setDraftField("cardio", value)} options={[{ value: "sim", label: "Sim" }, { value: "nao", label: "Não" }, { value: "nao-programado", label: "Não programado" }]} />
            <Choice label="Proteína" value={draft.protein} onChange={(value) => setDraftField("protein", value)} options={[{ value: "atingida", label: "Atingida" }, { value: "parcial", label: "Parcial" }, { value: "nao", label: "Não" }]} />
            <Choice label="Fibras" value={draft.fiber} onChange={(value) => setDraftField("fiber", value)} options={[{ value: "atingida", label: "Atingida" }, { value: "parcial", label: "Parcial" }, { value: "nao", label: "Não" }]} />
            <Choice label="Água" value={draft.water} onChange={(value) => setDraftField("water", value)} options={[{ value: "atingida", label: "Atingida" }, { value: "parcial", label: "Parcial" }, { value: "nao", label: "Não" }]} />
          </div>
        </Card>
        <Card className="mb-4 p-5 sm:p-7">
          <h3 className="mb-5 text-xl" style={{ color: colors.wine, fontFamily: "var(--font-serif, Georgia, serif)" }}>Sono, energia e estresse</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            <div><label htmlFor="sleep-time" className="mb-2 block text-sm font-semibold" style={{ color: colors.text }}>Que horas dormiu?</label><input id="sleep-time" type="time" value={draft.sleepTime} onChange={(event) => setDraftField("sleepTime", event.target.value)} className="w-full rounded-xl border px-3 py-2.5 text-sm" style={{ borderColor: "#D8CEC1", background: colors.paper }} /></div>
            <div><label htmlFor="wake-time" className="mb-2 block text-sm font-semibold" style={{ color: colors.text }}>Que horas acordou?</label><input id="wake-time" type="time" value={draft.wakeTime} onChange={(event) => setDraftField("wakeTime", event.target.value)} className="w-full rounded-xl border px-3 py-2.5 text-sm" style={{ borderColor: "#D8CEC1", background: colors.paper }} /></div>
            <div><label htmlFor="awakenings" className="mb-2 block text-sm font-semibold" style={{ color: colors.text }}>Despertares durante a noite</label><input id="awakenings" type="number" min="0" max="30" value={draft.awakenings} onChange={(event) => setDraftField("awakenings", Number(event.target.value))} className="w-full rounded-xl border px-3 py-2.5 text-sm" style={{ borderColor: "#D8CEC1", background: colors.paper }} /></div>
            <Slider label="Qualidade do sono" value={draft.sleepQuality} onChange={(value) => setDraftField("sleepQuality", value)} minLabel="Muito ruim" maxLabel="Muito boa" />
            <Slider label="Energia" value={draft.energy} onChange={(value) => setDraftField("energy", value)} minLabel="Bem baixa" maxLabel="Ótima" />
            <Slider label="Estresse" value={draft.stress} onChange={(value) => setDraftField("stress", value)} minLabel="Nenhum" maxLabel="Muito alto" />
          </div>
        </Card>
        {data.goals.length > 0 && <Card className="mb-4 p-5 sm:p-7">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-xl" style={{ color: colors.wine, fontFamily: "var(--font-serif, Georgia, serif)" }}>Minhas metas</h3><p className="mt-1 text-sm" style={{ color: colors.muted }}>Metas que você combinou consigo mesma.</p></div><button type="button" onClick={() => { setActiveTab("ficha"); setGoalEditorOpen(true); }} className="text-xs font-bold" style={{ ...buttonBase, background: "transparent", color: colors.wineLight }}>Personalizar metas</button></div>
          <div className="grid gap-5 sm:grid-cols-2">{data.goals.map((goal) => <div key={goal.id}><p className="mb-0.5 text-sm font-semibold" style={{ color: colors.text }}>{goal.name} <span className="text-xs font-normal" style={{ color: "#807572" }}>· {goal.frequency}</span></p><p className="mb-2 text-xs leading-5" style={{ color: "#807572" }}>{goal.guidance}</p><Choice label={`Status: ${goal.name}`} value={draft.goals[goal.id] ?? "nao-programado"} onChange={(value) => setDraftField("goals", { ...draft.goals, [goal.id]: value })} options={[{ value: "sim", label: "Sim" }, { value: "nao", label: "Não" }, { value: "nao-programado", label: "Não programado" }]} /></div>)}</div>
        </Card>}
        {lapidar40Plus && <Card className="mb-4 p-5 sm:p-7"><h3 className="text-xl" style={{ color: colors.wine, fontFamily: "var(--font-serif, Georgia, serif)" }}>Como você se sentiu?</h3><p className="mb-4 mt-1 text-sm" style={{ color: colors.muted }}>Marque o que fez parte do seu dia. Essas respostas são opcionais.</p><div className="grid gap-3 sm:grid-cols-2">{SYMPTOMS.map((symptom) => <label key={symptom} className="flex cursor-pointer items-center gap-3 rounded-xl p-3 text-sm" style={{ background: "#F8F4EE", color: colors.text }}><input type="checkbox" checked={Boolean(draft.symptoms[symptom])} onChange={(event) => setDraftField("symptoms", { ...draft.symptoms, [symptom]: event.target.checked })} className="h-4 w-4 accent-[#5B2333]" />{symptom}</label>)}</div></Card>}
        <Card className="mb-5 p-5 sm:p-7"><label htmlFor="observation" className="mb-2 block text-sm font-semibold" style={{ color: colors.text }}>Observação livre <span className="font-normal" style={{ color: "#807572" }}>(opcional)</span></label><textarea id="observation" rows={4} maxLength={1000} value={draft.observation} onChange={(event) => setDraftField("observation", event.target.value)} placeholder="Algo que você gostaria de lembrar ou compartilhar..." className="w-full resize-y rounded-xl border px-3 py-3 text-sm leading-6" style={{ borderColor: "#D8CEC1", background: colors.paper, color: colors.text }} /><p className="mt-1 text-right text-xs" style={{ color: "#807572" }}>{draft.observation.length}/1000</p></Card>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center"><button disabled={!storageReady || Boolean(storageError)} type="submit" className="rounded-full px-6 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50" style={{ ...buttonBase, background: colors.wine, color: colors.paper }}>Salvar check-in</button><p className="text-xs" style={{ color: "#807572" }}>Seus registros ficam somente neste dispositivo.</p></div>
      </form>
    </>
  );

  const renderEvolution = () => (
    <>
      <Heading eyebrow="Minha evolução" title="Seu caminho, sem comparações" description="Acompanhe seus registros e perceba padrões ao longo do tempo. Dias sem atividade programada não contam como falha." />
      <div className="mb-5 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar período da evolução">
        {[{ value: "7", label: "7 dias" }, { value: "30", label: "30 dias" }, { value: "90", label: "90 dias" }, { value: "todo", label: "Todo o período" }].map((option) => <button key={option.value} type="button" aria-pressed={range === option.value} onClick={() => setRange(option.value as Range)} className="rounded-full px-4 py-2 text-xs font-semibold" style={{ ...buttonBase, background: range === option.value ? colors.wine : colors.paper, color: range === option.value ? colors.paper : colors.wine, border: `1px solid ${colors.border}` }}>{option.label}</button>)}
      </div>
      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-[20px] p-5 text-white" style={{ background: "linear-gradient(135deg, #5B2333 0%, #441422 100%)", boxShadow: "0 6px 20px rgba(91,35,51,0.2)", border: "1px solid rgba(198,161,91,0.3)" }}>
          <p className="text-xs uppercase tracking-wide font-bold" style={{ color: "#E2C98D" }}>Check-ins no período</p>
          <p className="mt-2 text-3xl font-bold" style={{ color: "#F4EFE7" }}>{filteredCheckIns.length}</p>
        </div>
        <div className="rounded-[20px] p-5 text-white" style={{ background: "linear-gradient(135deg, #5B2333 0%, #441422 100%)", boxShadow: "0 6px 20px rgba(91,35,51,0.2)", border: "1px solid rgba(198,161,91,0.3)" }}>
          <p className="text-xs uppercase tracking-wide font-bold" style={{ color: "#E2C98D" }}>Ações acompanhadas</p>
          <p className="mt-2 text-3xl font-bold" style={{ color: "#F4EFE7" }}>{averageAdherence === null ? "—" : `${averageAdherence}%`}</p>
          <p className="mt-1 text-xs" style={{ color: "rgba(244,239,231,0.75)" }}>Média das ações programadas</p>
        </div>
        <div className="rounded-[20px] p-5 text-white" style={{ background: "linear-gradient(135deg, #5B2333 0%, #441422 100%)", boxShadow: "0 6px 20px rgba(91,35,51,0.2)", border: "1px solid rgba(198,161,91,0.3)" }}>
          <p className="text-xs uppercase tracking-wide font-bold" style={{ color: "#E2C98D" }}>Energia média</p>
          <p className="mt-2 text-3xl font-bold" style={{ color: "#F4EFE7" }}>{filteredCheckIns.length ? `${(filteredCheckIns.reduce((sum, item) => sum + item.energy, 0) / filteredCheckIns.length).toFixed(1)}/10` : "—"}</p>
        </div>
      </div>
      <Card className="mb-5 p-5 sm:p-7" style={{ borderTop: "3.5px solid #5B2333", background: "#FAF6F0" }}>
        <h3 className="text-lg font-semibold" style={{ color: colors.wine, fontFamily: "var(--font-serif, Georgia, serif)" }}>Ações acompanhadas por check-in</h3><p className="mt-1 text-xs" style={{ color: "#807572" }}>Percentual de ações concluídas ou parcialmente concluídas. Itens não programados são excluídos.</p>
        {filteredCheckIns.length === 0 ? <p className="mt-5 rounded-xl p-4 text-sm" style={{ background: "rgba(91,35,51,0.06)", color: colors.muted }}>Ainda não há registros neste período. Seu primeiro check-in já vai aparecer aqui.</p> : <div className="mt-5 space-y-4">{[...filteredCheckIns].reverse().map((entry) => {
          const value = adherenceFor(entry, data.goals);
          return <div key={entry.id} className="grid grid-cols-[92px_1fr_44px] items-center gap-3"><span className="text-xs" style={{ color: colors.muted }}>{new Date(`${entry.date}T12:00:00`).toLocaleDateString("pt-BR", { day: "numeric", month: "short" })}</span><div className="h-3 overflow-hidden rounded-full" style={{ background: "rgba(91,35,51,0.12)" }}><div className="h-full rounded-full" style={{ width: `${value ?? 0}%`, background: "linear-gradient(90deg, #5B2333, #C6A15B)" }} /></div><span className="text-right text-xs font-bold" style={{ color: colors.wine }}>{value === null ? "—" : `${value}%`}</span></div>;
        })}</div>}
      </Card>
      <Card className="p-5 sm:p-7"><h3 className="text-lg font-semibold" style={{ color: colors.wine, fontFamily: "var(--font-serif, Georgia, serif)" }}>Seus registros</h3>
        {filteredCheckIns.length === 0 ? <p className="mt-3 text-sm" style={{ color: colors.muted }}>Quando você salvar um check-in, poderá revisitar suas anotações por aqui.</p> : <div className="mt-3 divide-y" style={{ borderColor: colors.border }}>{filteredCheckIns.map((entry) => <details key={entry.id} className="py-4"><summary className="cursor-pointer text-sm font-semibold" style={{ color: colors.wine }}>{dateLabel(entry.date)} <span className="ml-1 text-xs font-normal" style={{ color: "#807572" }}>· Energia {entry.energy}/10 · Sono {entry.sleepQuality}/10</span></summary><div className="mt-3 grid gap-2 text-sm sm:grid-cols-2" style={{ color: colors.muted }}><p>Musculação: {entry.strength === "nao-programado" ? "Não programado" : entry.strength === "sim" ? "Sim" : "Não"}</p><p>Cardio: {entry.cardio === "nao-programado" ? "Não programado" : entry.cardio === "sim" ? "Sim" : "Não"}</p><p>Proteína: {entry.protein === "atingida" ? "Atingida" : entry.protein === "parcial" ? "Parcial" : "Não"}</p><p>Fibras: {entry.fiber === "atingida" ? "Atingida" : entry.fiber === "parcial" ? "Parcial" : "Não"}</p><p>Água: {entry.water === "atingida" ? "Atingida" : entry.water === "parcial" ? "Parcial" : "Não"}</p><p>Estresse: {entry.stress}/10 · Despertares: {entry.awakenings}</p><p className="sm:col-span-2">Sono: {entry.sleepTime || "horário não informado"}–{entry.wakeTime || "horário não informado"} · Qualidade {entry.sleepQuality}/10</p>{entry.observation && <p className="sm:col-span-2">Observação: {entry.observation}</p>}{lapidar40Plus && Object.values(entry.symptoms).some(Boolean) && <p className="sm:col-span-2">Sintomas: {Object.entries(entry.symptoms).filter(([, active]) => active).map(([name]) => name).join(", ")}</p>}</div></details>)}</div>}
      </Card>
    </>
  );

  const renderMaterials = () => (
    <>
      <Heading eyebrow="Materiais" title="Conteúdos para sua jornada" description="Materiais fictícios de exemplo. Sua equipe pode compartilhar conteúdos personalizados nesta área." />
      <div className="grid gap-4 sm:grid-cols-2">
        {[{ title: "Guia de rotina e bem-estar", type: "Guia · 8 min de leitura", text: "Ideias práticas para construir uma rotina possível, respeitando seu momento e sua energia." }, { title: "Movimento sem pressão", type: "Conteúdo · 5 min de leitura", text: "Como incluir movimento na semana de um jeito gentil, flexível e conectado ao seu corpo." }, { title: "Montando um prato equilibrado", type: "Material · 6 min de leitura", text: "Referências visuais para pensar em proteínas, fibras e variedade no dia a dia." }, { title: "Sono e autocuidado", type: "Áudio · 4 min", text: "Uma pausa guiada fictícia para encerrar o dia com mais tranquilidade." }].map((item) => <Card key={item.title} className="flex flex-col p-5 sm:p-6"><span aria-hidden="true" className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl text-xl" style={{ color: colors.wine, background: colors.cream }}>✧</span><p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#8B6A42" }}>{item.type}</p><h3 className="mt-2 text-xl" style={{ color: colors.wine, fontFamily: "var(--font-serif, Georgia, serif)" }}>{item.title}</h3><p className="mt-2 flex-1 text-sm leading-6" style={{ color: colors.muted }}>{item.text}</p><button type="button" onClick={() => setNotice("Este material é apenas uma demonstração do protótipo.")} className="mt-4 self-start text-sm font-bold" style={{ ...buttonBase, background: "transparent", color: colors.wineLight }}>Explorar material →</button></Card>)}
      </div>
    </>
  );

  const renderFiles = () => (
    <>
      <Heading eyebrow="Arquivos" title="Documentos compartilhados" description="Arquivos fictícios para ilustrar o espaço de documentos da paciente." />
      <Card className="overflow-hidden">
        <div className="hidden grid-cols-[1fr_140px_120px] gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wide sm:grid" style={{ background: "#F8F4EE", color: "#807572" }}><span>Arquivo</span><span>Adicionado</span><span>Tipo</span></div>
        {[["Plano de acompanhamento", "10 out 2026", "PDF"], ["Orientações para consulta", "20 set 2026", "PDF"], ["Exames de exemplo", "04 set 2026", "PDF"]].map(([name, date, type]) => <div key={name} className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-4 first:border-t-0 sm:grid sm:grid-cols-[1fr_140px_120px]" style={{ borderColor: colors.border }}><div className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold" style={{ background: colors.cream, color: colors.wine }}>{type}</span><div><p className="text-sm font-semibold" style={{ color: colors.wine }}>{name}</p><p className="mt-1 text-xs sm:hidden" style={{ color: "#807572" }}>{date}</p></div></div><span className="hidden text-sm sm:block" style={{ color: colors.muted }}>{date}</span><button type="button" onClick={() => setNotice("O download de arquivos não está disponível neste protótipo.")} className="rounded-full px-3 py-2 text-xs font-semibold" style={{ ...buttonBase, background: colors.cream, color: colors.wine }}>Visualizar</button></div>)}
      </Card>
    </>
  );

  const renderNotifications = () => (
    <>
      <Heading eyebrow="Notificações" title="Avisos para você" description="Lembretes de demonstração para representar as notificações do portal." />
      <div className="space-y-3">{[{ title: "Consulta confirmada", detail: "Sua próxima consulta é dia 15 de outubro, às 14h30.", time: "Hoje", fresh: true }, { title: "Novo material disponível", detail: "O guia de rotina e bem-estar foi adicionado à sua área de materiais.", time: "Ontem", fresh: true }, { title: "Lembrete do Diário Lapidar", detail: "Se quiser, registre como foi seu dia. Alguns minutos já bastam.", time: "Esta semana", fresh: false }].map((noticeItem) => <Card key={noticeItem.title} className="flex gap-4 p-5"><span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: noticeItem.fresh ? colors.gold : "#D8CEC1" }} aria-label={noticeItem.fresh ? "Nova notificação" : "Notificação lida"} /><div className="flex-1"><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-semibold" style={{ color: colors.wine }}>{noticeItem.title}</h3><span className="text-xs" style={{ color: "#807572" }}>{noticeItem.time}</span></div><p className="mt-1 text-sm leading-6" style={{ color: colors.muted }}>{noticeItem.detail}</p></div></Card>)}</div>
    </>
  );

  const content = {
    inicio: renderHome,
    ficha: renderProfile,
    diario: renderDiary,
    evolucao: renderEvolution,
    materiais: renderMaterials,
    arquivos: renderFiles,
    avisos: renderNotifications,
  }[activeTab]();

  const confettiColors = ["#5B2333", "#C6A15B", "#66724A", "#F4EFE7", "#E2C98D", "#7A3047"];
  const confettiPieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 1.5}s`,
    duration: `${2 + Math.random() * 1.5}s`,
    color: confettiColors[i % confettiColors.length],
    size: `${6 + Math.random() * 8}px`,
    rotation: `${Math.random() * 720}deg`,
  }));

  return (
    <div className="min-h-screen font-sans" style={{ background: colors.cream, color: "#2D2020" }}>
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes celebrationBanner {
          0% { transform: scale(0.65); opacity: 0; }
          15% { transform: scale(1.04); opacity: 1; }
          25% { transform: scale(1); opacity: 1; }
          85% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.85); opacity: 0; }
        }
      `}</style>

      {/* ✨ Confete de celebração */}
      {showConfetti && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}>
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              style={{
                position: "absolute",
                top: 0,
                left: piece.left,
                width: piece.size,
                height: piece.size,
                background: piece.color,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                animation: `confettiFall ${piece.duration} ${piece.delay} ease-in forwards`,
              }}
            />
          ))}
          {/* Popup de parabéns — perfeitamente centralizado no meio da viewport */}
          <div style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            padding: 16,
          }}>
            <div style={{
              background: "linear-gradient(135deg, #5B2333, #7A3047)",
              color: "#F4EFE7",
              borderRadius: 24,
              padding: "28px 36px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(198,161,91,0.3)",
              animation: "celebrationBanner 3.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              maxWidth: 420,
              width: "100%",
            }}>
              <p style={{ fontSize: 36, marginBottom: 6, lineHeight: 1 }}>🎉</p>
              <p style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: 22, fontWeight: 700, margin: 0, color: "#F4EFE7" }}>Parabéns!</p>
              <p style={{ fontSize: 14, opacity: 0.9, marginTop: 8, marginBottom: 0, lineHeight: 1.4 }}>Você atingiu 80% ou mais das suas metas hoje!</p>
            </div>
          </div>
        </div>
      )}
      <header className="sticky z-20 border-b backdrop-blur" style={{ top: 56, borderColor: "rgba(198,161,91,0.25)", background: "linear-gradient(180deg, #5B2333 0%, #4D1826 100%)", boxShadow: "0 4px 20px rgba(0,0,0,0.18)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <button type="button" onClick={() => setActiveTab("inicio")} className="text-left" aria-label="Lapidar, ir para o início">
            <span className="block text-2xl leading-none font-bold" style={{ color: "#F4EFE7", fontFamily: "var(--font-serif, Georgia, serif)" }}>Lapidar</span>
            <span className="mt-1 block text-[10px] uppercase font-semibold tracking-[0.18em]" style={{ color: "#D4B578" }}>Seu espaço de cuidado</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold" style={{ color: "#F4EFE7" }}>Olá, Mariana</p>
              <p className="text-xs" style={{ color: "rgba(244,239,231,0.72)" }}>Que bom ter você por aqui</p>
            </div>
            
            {/* Botão redondo com o sininho para notificações */}
            <button
              type="button"
              onClick={() => setActiveTab("avisos")}
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition-all"
              aria-label="Ver notificações"
              style={{
                ...buttonBase,
                background: activeTab === "avisos" ? "#C6A15B" : "rgba(255, 255, 255, 0.12)",
                color: activeTab === "avisos" ? "#3E1623" : "#F4EFE7",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full" style={{ background: "#C6A15B", border: "1.5px solid #5B2333" }} />
            </button>
          </div>
        </div>

        {/* Barra de abas: visível apenas em telas grandes (desktop >= 1024px); no celular é oculta para não poluir */}
        <nav aria-label="Navegação do portal" className="desktop-nav-tabs mx-auto max-w-6xl gap-1.5 overflow-x-auto px-3 pb-2.5 sm:px-6">
          {NAV_TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-current={active ? "page" : undefined}
                className="flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1"
                style={{
                  ...buttonBase,
                  background: active ? "#C6A15B" : "rgba(255,255,255,0.08)",
                  color: active ? "#3E1623" : "rgba(244,239,231,0.85)",
                  boxShadow: active ? "0 2px 8px rgba(0,0,0,0.25)" : "none",
                  outlineColor: colors.gold,
                  transition: "all 0.15s ease",
                }}
              >
                <span aria-hidden="true">{tab.icon}</span>{tab.label}
              </button>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 sm:pt-9">
        {!storageReady && <div role="status" className="mb-4 text-sm" style={{ color: colors.muted }}>Carregando seus dados locais…</div>}
        {storageError && <div role="alert" className="mb-5 flex flex-col gap-3 rounded-2xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "#C86C54", background: "#FFF3EF", color: "#783A31" }}><p className="text-sm leading-5">{storageError}</p><button type="button" onClick={resetLocalData} className="shrink-0 self-start rounded-full px-4 py-2 text-xs font-bold sm:self-auto" style={{ ...buttonBase, background: colors.wine, color: colors.paper }}>Apagar dados locais e reiniciar</button></div>}
        {!storageError && notice && <p role="status" className="mb-4 rounded-xl px-4 py-3 text-sm" style={{ background: "#EEF1E8", color: "#455136" }}>{notice}</p>}
        {content}
        <footer className="mt-10 rounded-2xl px-4 py-4 text-center text-xs leading-5" style={{ background: "rgba(91,35,51,0.06)", border: "1px solid rgba(91,35,51,0.14)", color: "#5B2333" }}>
          <p className="font-bold">Protótipo local · dados totalmente fictícios</p>
          <p style={{ color: "#7A6569" }}>Este portal é uma demonstração e não substitui orientação, avaliação ou atendimento médico. Os registros ficam neste dispositivo e podem ser apagados pelo navegador.</p>
        </footer>
      </main>

      {/* ── Bottom Bar Mobile no Portal da Paciente (visível apenas em telas menores) ── */}
      <nav
        className="lapidar-mobile-bottombar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          background: "#5B2333",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.2)",
          alignItems: "center",
          justifyContent: "space-around",
          height: 60,
          padding: "0 4px",
        }}
        aria-label="Navegação rápida do portal"
      >
        {NAV_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              height: "100%",
              color: activeTab === tab.id ? "#C6A15B" : "rgba(244,239,231,0.6)",
              background: activeTab === tab.id ? "rgba(198,161,91,0.15)" : "transparent",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>{tab.icon}</span>
            <span style={{ fontSize: 10, fontWeight: activeTab === tab.id ? 600 : 400 }}>{tab.mobileLabel}</span>
          </button>
        ))}
      </nav>
      {/* Espaço compensador do bottom nav no mobile */}
      <div className="lapidar-mobile-bottombar" style={{ height: 60 }} />
    </div>
  );
}
