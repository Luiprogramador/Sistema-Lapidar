import { useState } from "react";

type RiscoNivel = "baixo" | "intermediario" | "alto" | "muito-alto" | "extremo";

type RiscoState = {
  nivel: RiscoNivel;
  has: boolean;
  dm: boolean;
  tabagismo: boolean;
  historiaFamiliar: boolean;
  ldlAtual?: number;
  naoHdlAtual?: number;
  apob?: number;
  lpa?: number;
  pcrus?: number;
};

const nivelConfig: Record<RiscoNivel, { label: string; cor: string; bg: string; ldlMeta: number; descricao: string }> = {
  "baixo":      { label: "Baixo",         cor: "#3D6B2E", bg: "#E8F0E0", ldlMeta: 130, descricao: "Classificação demonstrativa. A avaliação clínica deve ser feita pela profissional responsável." },
  "intermediario": { label: "Intermediário", cor: "#92610A", bg: "#FEF3C7", ldlMeta: 100, descricao: "Classificação demonstrativa. A avaliação clínica deve ser feita pela profissional responsável." },
  "alto":       { label: "Alto",          cor: "#C2410C", bg: "#FEE2E2", ldlMeta: 70,  descricao: "Classificação demonstrativa. A avaliação clínica deve ser feita pela profissional responsável." },
  "muito-alto": { label: "Muito Alto",    cor: "#991B1B", bg: "#FEE2E2", ldlMeta: 55,  descricao: "Classificação demonstrativa. A avaliação clínica deve ser feita pela profissional responsável." },
  "extremo":    { label: "Extremo",       cor: "#6B1021", bg: "#FCE7EA", ldlMeta: 40,  descricao: "Classificação demonstrativa. A avaliação clínica deve ser feita pela profissional responsável." },
};

const niveis: RiscoNivel[] = ["baixo", "intermediario", "alto", "muito-alto", "extremo"];
function isRiskLevel(value: unknown): value is RiscoNivel {
  return niveis.some((level) => level === value);
}

function isRiscoState(value: unknown): value is RiscoState {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return isRiskLevel(record.nivel) &&
    ["has", "dm", "tabagismo", "historiaFamiliar"].every((key) => typeof record[key] === "boolean") &&
    ["ldlAtual", "naoHdlAtual", "apob", "lpa", "pcrus"].every((key) =>
      record[key] === undefined || (typeof record[key] === "number" && Number.isFinite(record[key]) && record[key] >= 0),
    );
}

const lipidInputs: { key: keyof Pick<RiscoState, "naoHdlAtual">; label: string; meta: string }[] = [
  { key: "naoHdlAtual", label: "Não-HDL atual", meta: "< 130 mg/dL" },
];

export default function RiscoCV({ patientId }: { patientId: number }) {
  const initialRisk: RiscoState = {
    nivel: patientId === 1 || patientId === 3 ? "alto" : patientId === 2 ? "intermediario" : "baixo",
    has: patientId === 3,
    dm: patientId === 3,
    tabagismo: false,
    historiaFamiliar: patientId === 1 || patientId === 3,
    ldlAtual: patientId === 1 ? 148 : patientId === 2 ? 124 : patientId === 3 ? 162 : patientId === 4 ? 88 : patientId === 5 ? 96 : undefined,
    apob:  patientId === 1 ? 95 : patientId === 2 ? 78 : patientId === 3 ? 105 : undefined,
    lpa:   patientId === 1 ? 18 : patientId === 2 ? 22 : patientId === 3 ? 28  : undefined,
    pcrus: patientId === 1 ? 0.8 : patientId === 2 ? 1.4 : patientId === 3 ? 2.1 : undefined,
  };
  const storageKey = `lapidar-demo-cv-${patientId}`;
  const [loaded] = useState(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) return { state: initialRisk, error: null as string | null };
      const parsed: unknown = JSON.parse(saved);
      if (!isRiscoState(parsed)) return { state: initialRisk, error: "Os dados cardiovasculares locais estão inválidos. Salve uma alteração para reiniciar a demonstração." };
      return { state: { ...initialRisk, ...parsed }, error: null as string | null };
    } catch {
      return { state: initialRisk, error: "Não foi possível ler os dados cardiovasculares deste navegador." };
    }
  });
  const [state, setState] = useState<RiscoState>(loaded.state);
  const [storageError, setStorageError] = useState<string | null>(loaded.error);

  const updateState = (change: (current: RiscoState) => RiscoState) => {
    const next = change(state);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      setState(next);
      setStorageError(null);
    } catch {
      setStorageError("Não foi possível salvar os dados cardiovasculares neste navegador.");
    }
  };

  const cfg = nivelConfig[state.nivel];
  const metaAtingida = state.ldlAtual !== undefined && state.ldlAtual <= cfg.ldlMeta;
  const ldlDelta = state.ldlAtual !== undefined ? state.ldlAtual - cfg.ldlMeta : undefined;

  const toggle = (field: keyof Pick<RiscoState, "has" | "dm" | "tabagismo" | "historiaFamiliar">) =>
    updateState((current) => ({ ...current, [field]: !current[field] }));

  const setNum = (field: keyof Pick<RiscoState, "ldlAtual" | "naoHdlAtual" | "apob" | "lpa" | "pcrus">, v: string) => {
    const parsed = v === "" ? undefined : Number(v);
    if (parsed !== undefined && (!Number.isFinite(parsed) || parsed < 0)) return;
    updateState((current) => ({ ...current, [field]: parsed }));
  };

  return (
    <div className="space-y-5">
      <p className="text-xs" style={{ color: "#9B8B7A" }}>Valores e recomendações são ilustrativos e não substituem avaliação clínica. Alterações ficam apenas neste navegador.</p>
      {storageError && <p role="alert" className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">{storageError}</p>}

      {/* Nível de risco selector */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: "#F0EAE0" }}>
          <h3 className="text-base font-semibold" style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}>
            Classificação de Risco Cardiovascular
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#9B8B7A" }}>Selecione o nível de risco global da paciente</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
            {niveis.map((n) => {
              const c = nivelConfig[n];
              const active = state.nivel === n;
              return (
                <button
                  key={n}
                  onClick={() => updateState((current) => ({ ...current, nivel: n }))}
                  className="rounded-xl px-4 py-3 text-left transition-all"
                  style={{
                    background: active ? c.bg : "#F8F4EF",
                    border: `2px solid ${active ? c.cor : "#E8E0D0"}`,
                    outline: "none",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.cor }} />
                    <span className="text-xs font-bold" style={{ color: c.cor }}>{c.label}</span>
                  </div>
                  <p className="text-xs leading-tight" style={{ color: "#9B8B7A" }}>LDL meta: &lt; {c.ldlMeta} mg/dL</p>
                </button>
              );
            })}
          </div>

          {/* Descrição do nível */}
          <div className="rounded-xl px-4 py-3" style={{ background: cfg.bg, border: `1px solid ${cfg.cor}22` }}>
            <p className="text-xs font-semibold mb-0.5" style={{ color: cfg.cor }}>{cfg.label} Risco</p>
            <p className="text-xs leading-relaxed" style={{ color: cfg.cor }}>{cfg.descricao}</p>
          </div>
        </div>
      </div>

      {/* Grid: LDL + fatores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* LDL panel */}
        <div className="rounded-2xl" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
          <div className="px-5 py-3 border-b" style={{ borderColor: "#F0EAE0" }}>
            <h4 className="text-sm font-semibold" style={{ color: "#5B2333" }}>Meta LDL e Resultado</h4>
          </div>
          <div className="p-5 space-y-4">

            {/* KPIs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl p-3 text-center" style={{ background: "#F8F4EF" }}>
                <p className="text-xs mb-1" style={{ color: "#9B8B7A", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>Meta LDL</p>
                <p className="text-2xl font-bold" style={{ color: "#5B2333" }}>&lt; {cfg.ldlMeta}</p>
                <p className="text-xs" style={{ color: "#9B8B7A" }}>mg/dL</p>
              </div>
              <div className="rounded-xl p-3 text-center" style={{ background: "#F8F4EF" }}>
                <p className="text-xs mb-1" style={{ color: "#9B8B7A", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>LDL Atual</p>
                <p className="text-2xl font-bold" style={{ color: state.ldlAtual && state.ldlAtual > cfg.ldlMeta ? "#DC2626" : "#3D6B2E" }}>
                  {state.ldlAtual ?? "—"}
                </p>
                <p className="text-xs" style={{ color: "#9B8B7A" }}>mg/dL</p>
              </div>
              <div className="rounded-xl p-3 text-center" style={{
                background: state.ldlAtual === undefined ? "#F8F4EF" : metaAtingida ? "#E8F0E0" : "#FEE2E2",
              }}>
                <p className="text-xs mb-1" style={{ color: "#9B8B7A", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>Meta</p>
                <p className="text-lg font-bold" style={{ color: state.ldlAtual === undefined ? "#9B8B7A" : metaAtingida ? "#3D6B2E" : "#DC2626" }}>
                  {state.ldlAtual === undefined ? "—" : metaAtingida ? "✓ Sim" : "✗ Não"}
                </p>
                {ldlDelta !== undefined && (
                  <p className="text-xs" style={{ color: ldlDelta > 0 ? "#DC2626" : "#3D6B2E" }}>
                    {ldlDelta > 0 ? `+${ldlDelta}` : ldlDelta} mg/dL
                  </p>
                )}
              </div>
            </div>

            {/* LDL input */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#9B8B7A" }}>Atualizar LDL Atual (mg/dL)</label>
              <input
                type="number"
                value={state.ldlAtual ?? ""}
                onChange={(e) => setNum("ldlAtual", e.target.value)}
                placeholder="Ex: 148"
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "#F8F4EF", border: "1.5px solid #E8E0D0", color: "#1A1008" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#5B2333")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E0D0")}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {lipidInputs.map((field) => (
                <label key={field.key} className="block text-xs font-semibold" style={{ color: "#9B8B7A" }}>
                  {field.label} (mg/dL)
                  <input
                    type="number"
                    min="0"
                    value={state[field.key] ?? ""}
                    onChange={(event) => setNum(field.key, event.target.value)}
                    placeholder={field.meta}
                    className="mt-1.5 w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                    style={{ background: "#F8F4EF", border: "1.5px solid #E8E0D0", color: "#1A1008" }}
                  />
                </label>
              ))}
            </div>
            <p className="text-xs" style={{ color: "#9B8B7A" }}>
              Redução necessária estimada de LDL: {ldlDelta !== undefined && ldlDelta > 0 ? `${Math.round((ldlDelta / (state.ldlAtual ?? 1)) * 100)}%` : ldlDelta !== undefined ? "Meta demonstrativa atingida" : "Informe o LDL para estimar"}.
            </p>
          </div>
        </div>

        <div className="rounded-xl border p-4" style={{ background: "#fff", borderColor: "#E8E0D0" }}>
          <h4 className="text-sm font-semibold" style={{ color: "#5B2333" }}>Estratégias para discussão clínica</h4>
          <p className="mt-1 text-xs leading-relaxed" style={{ color: "#9B8B7A" }}>
            Valores, metas e classificações exibidos são dados de demonstração e não substituem a avaliação clínica, diretrizes vigentes ou decisão da profissional responsável.
          </p>
          <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2" style={{ color: "#1A1008" }}>
            <li>• Confirmar fatores de risco e histórico clínico.</li>
            <li>• Revisar exames recentes e a meta individual definida.</li>
            <li>• Registrar a decisão e o plano na consulta.</li>
            <li>• Acompanhar exames conforme orientação profissional.</li>
          </ul>
        </div>

        {/* Fatores de risco */}
        <div className="rounded-2xl" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
          <div className="px-5 py-3 border-b" style={{ borderColor: "#F0EAE0" }}>
            <h4 className="text-sm font-semibold" style={{ color: "#5B2333" }}>Fatores de Risco</h4>
          </div>
          <div className="p-5 space-y-2">
            {([
              { key: "has",             label: "Hipertensão Arterial (HAS)" },
              { key: "dm",              label: "Diabetes Mellitus (DM)" },
              { key: "tabagismo",       label: "Tabagismo" },
              { key: "historiaFamiliar",label: "História Familiar de DCV" },
            ] as { key: keyof Pick<RiscoState, "has"|"dm"|"tabagismo"|"historiaFamiliar">; label: string }[]).map((f) => (
              <button
                key={f.key}
                onClick={() => toggle(f.key)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left"
                style={{
                  background: state[f.key] ? "#FEE2E2" : "#F8F4EF",
                  border: `1px solid ${state[f.key] ? "#FECACA" : "#E8E0D0"}`,
                }}
              >
                <span className="text-sm font-medium" style={{ color: state[f.key] ? "#991B1B" : "#1A1008" }}>
                  {f.label}
                </span>
                <div
                  className="w-9 h-5 rounded-full relative transition-all"
                  style={{ background: state[f.key] ? "#DC2626" : "#D0C8BE" }}
                >
                  <div
                    className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all"
                    style={{ left: state[f.key] ? "calc(100% - 1.125rem)" : "0.125rem" }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Marcadores avançados */}
      <div className="rounded-2xl" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
        <div className="px-5 py-3 border-b" style={{ borderColor: "#F0EAE0" }}>
          <h4 className="text-sm font-semibold" style={{ color: "#5B2333" }}>Marcadores Avançados</h4>
          <p className="text-xs mt-0.5" style={{ color: "#9B8B7A" }}>ApoB, Lp(a) e PCR-us influenciam o risco residual</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {([
              { key: "apob",  label: "ApoB",   unidade: "mg/dL", refMax: 80,  ref: "< 80 mg/dL" },
              { key: "lpa",   label: "Lp(a)",  unidade: "mg/dL", refMax: 30,  ref: "< 30 mg/dL" },
              { key: "pcrus", label: "PCR-us", unidade: "mg/L",  refMax: 1,   ref: "< 1 mg/L" },
            ] as { key: keyof Pick<RiscoState,"apob"|"lpa"|"pcrus">; label: string; unidade: string; refMax: number; ref: string }[]).map((m) => {
              const val = state[m.key];
              const status = val === undefined ? "neutro" : val <= m.refMax ? "verde" : val <= m.refMax * 1.3 ? "amarelo" : "vermelho";
              const colors = { verde: "#3D6B2E", amarelo: "#92610A", vermelho: "#991B1B", neutro: "#9B8B7A" };
              const bgs    = { verde: "#E8F0E0", amarelo: "#FEF3C7", vermelho: "#FEE2E2", neutro: "#F8F4EF" };
              return (
                <div key={m.key} className="rounded-xl p-4" style={{ background: bgs[status], border: `1px solid ${colors[status]}22` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold" style={{ color: colors[status] }}>{m.label}</span>
                    <span className="text-xs" style={{ color: colors[status] }}>
                      {status === "verde" ? "✓ Normal" : status === "amarelo" ? "! Atenção" : status === "vermelho" ? "✗ Elevado" : "—"}
                    </span>
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    value={val ?? ""}
                    onChange={(e) => setNum(m.key, e.target.value)}
                    placeholder="—"
                    className="w-full px-3 py-2 rounded-lg text-sm font-bold outline-none"
                    style={{ background: "rgba(255,255,255,0.6)", border: `1.5px solid ${colors[status]}44`, color: colors[status] }}
                  />
                  <p className="text-xs mt-1.5" style={{ color: "#9B8B7A" }}>Ref: {m.ref}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
