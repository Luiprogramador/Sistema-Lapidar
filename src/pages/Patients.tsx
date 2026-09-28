import { useEffect, useState } from "react";
import PatientDetail from "./PatientDetail";
import type { Patient } from "./PatientDetail";

const PROTOCOLS = ["Todos", "Lapidar 40+", "Lapidar SOP", "Lapidar Fertilidade", "Pocket"];
const PATIENT_STORAGE_KEY = "lapidar-demo-patients-v1";

const patients: Patient[] = [
  {
    id: 1,
    nome: "Ana Paula Ferreira",
    idade: 43,
    protocolo: "Lapidar 40+",
    ativa: true,
    ultimaConsulta: "02/09/2026",
    proximaConsulta: "30/09/2026",
    alertas: ["LDL acima da meta"],
    habitos: { fibras: true, proteinas: true, hidratacao: false, cardio: false, musculacao: true, sono: "22:30 · 7h" },
    telefone: "(11) 98801-2233",
    objetivo: "Emagrecimento e melhora da composição corporal",
    pesoInicial: 72.4,
    pesoMeta: 65.0,
  },
  {
    id: 2,
    nome: "Beatriz Lima",
    idade: 29,
    protocolo: "Lapidar SOP",
    ativa: true,
    ultimaConsulta: "10/09/2026",
    proximaConsulta: "10/10/2026",
    alertas: ["Vitamina D baixa"],
    habitos: { fibras: true, proteinas: false, hidratacao: true, cardio: true, musculacao: false, sono: "23:00 · 6h" },
    telefone: "(21) 97722-8844",
    objetivo: "Regularização hormonal e controle do peso",
    pesoInicial: 80.2,
    pesoMeta: 72.0,
  },
  {
    id: 3,
    nome: "Carla Mendes",
    idade: 51,
    protocolo: "Lapidar 40+",
    ativa: true,
    ultimaConsulta: "05/09/2026",
    proximaConsulta: "03/10/2026",
    alertas: ["LDL acima da meta", "Sem atividade física"],
    habitos: { fibras: false, proteinas: true, hidratacao: true, cardio: false, musculacao: false, sono: "00:00 · 5h" },
    telefone: "(31) 99900-5566",
    objetivo: "Redução de gordura visceral e melhora do LDL",
    pesoInicial: 88.0,
    pesoMeta: 78.0,
  },
  {
    id: 4,
    nome: "Daniela Rocha",
    idade: 35,
    protocolo: "Lapidar Fertilidade",
    ativa: true,
    ultimaConsulta: "08/09/2026",
    proximaConsulta: "06/10/2026",
    alertas: [],
    habitos: { fibras: true, proteinas: true, hidratacao: true, cardio: true, musculacao: true, sono: "22:00 · 8h" },
    telefone: "(11) 99488-1122",
    objetivo: "Preparação corporal para fertilização",
    pesoInicial: 62.0,
    pesoMeta: 58.0,
  },
  {
    id: 5,
    nome: "Fernanda Alves",
    idade: 38,
    protocolo: "Pocket",
    ativa: true,
    ultimaConsulta: "12/09/2026",
    proximaConsulta: "12/10/2026",
    alertas: [],
    habitos: { fibras: true, proteinas: true, hidratacao: true, cardio: false, musculacao: true, sono: "23:30 · 7h" },
    telefone: "(85) 98833-7700",
    objetivo: "Manutenção do peso e saúde metabólica",
    pesoInicial: 68.0,
    pesoMeta: 63.0,
  },
  {
    id: 6,
    nome: "Gabriela Nunes",
    idade: 45,
    protocolo: "Lapidar 40+",
    ativa: false,
    ultimaConsulta: "15/06/2026",
    proximaConsulta: "—",
    alertas: [],
    habitos: { fibras: false, proteinas: false, hidratacao: false, cardio: false, musculacao: false, sono: "—" },
    telefone: "(41) 97711-3300",
    objetivo: "Reeducação alimentar e redução de peso",
    pesoInicial: 75.0,
    pesoMeta: 67.0,
  },
];

const habitLabels = [
  { key: "fibras", label: "Fibras" },
  { key: "proteinas", label: "Proteínas" },
  { key: "hidratacao", label: "Água" },
  { key: "cardio", label: "Cardio" },
  { key: "musculacao", label: "Musculação" },
] as const;

function readSavedPatients(): { patients: Patient[]; error: string | null; canPersist: boolean } {
  try {
    const saved = window.localStorage.getItem(PATIENT_STORAGE_KEY);
    if (!saved) return { patients, error: null, canPersist: true };

    const parsed: unknown = JSON.parse(saved);
    if (
      !Array.isArray(parsed) ||
      !parsed.every((patient) =>
        patient &&
        typeof patient.id === "number" &&
        typeof patient.nome === "string" &&
        typeof patient.protocolo === "string" &&
        typeof patient.ativa === "boolean" &&
        Array.isArray(patient.alertas) &&
        patient.habitos,
      )
    ) {
      return {
        patients,
        error: "Os dados de demonstração salvos não são válidos. Restaure a lista de exemplo para continuar.",
        canPersist: false,
      };
    }

    return { patients: parsed as Patient[], error: null, canPersist: true };
  } catch {
    return {
      patients,
      error: "Não foi possível ler os dados locais das pacientes. Verifique o armazenamento do navegador.",
      canPersist: false,
    };
  }
}

export default function Patients() {
  const [savedState, setSavedState] = useState(readSavedPatients);
  const [patientList, setPatientList] = useState(savedState.patients);
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [detailPatient, setDetailPatient] = useState<Patient | null>(null);
  const [previewPatient, setPreviewPatient] = useState<Patient | null>(null);
  const [newPatientOpen, setNewPatientOpen] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
    objetivo: "",
    protocolo: "Lapidar 40+",
    consultaAtual: "",
    pesoInicial: "",
    pesoMeta: "",
    trh: "",
    contraceptivo: "",
    observacoes: "",
    origemLead: "",
  });

  useEffect(() => {
    if (!savedState.canPersist) return;
    try {
      window.localStorage.setItem(PATIENT_STORAGE_KEY, JSON.stringify(patientList));
    } catch {
      setSavedState((current) => ({
        ...current,
        error: "Não foi possível salvar as alterações no navegador. Verifique o armazenamento local.",
        canPersist: false,
      }));
    }
  }, [patientList, savedState.canPersist]);

  const restoreDemoPatients = () => {
    try {
      window.localStorage.removeItem(PATIENT_STORAGE_KEY);
      setPatientList(patients);
      setSavedState({ patients, error: null, canPersist: true });
    } catch {
      setSavedState((current) => ({
        ...current,
        error: "Não foi possível restaurar os dados locais. Verifique as permissões do navegador.",
        canPersist: false,
      }));
    }
  };

  if (detailPatient) {
    return (
      <PatientDetail
        patient={detailPatient}
        onBack={() => {
          setPatientList((current) => current.map((patient) => patient.id === detailPatient.id ? detailPatient : patient));
          setDetailPatient(null);
        }}
      />
    );
  }

  const filtered = patientList.filter((p) => {
    const matchProtocol = filter === "Todos" || p.protocolo === filter;
    const matchSearch = p.nome.toLowerCase().includes(search.toLowerCase());
    return matchProtocol && matchSearch;
  });

  const createPatient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const birthDate = new Date(`${form.dataNascimento}T00:00:00`);
    const today = new Date();
    const ageAtRegistration = today.getFullYear() - birthDate.getFullYear() -
      (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
    const createdPatient: Patient = {
      id: Math.max(0, ...patientList.map((patient) => patient.id)) + 1,
      nome: form.nome.trim(),
      idade: ageAtRegistration,
      dataNascimento: form.dataNascimento,
      cpf: form.cpf.trim(),
      telefone: form.telefone.trim(),
      objetivo: form.objetivo.trim(),
      protocolo: form.protocolo,
      consultaAtual: form.consultaAtual.trim(),
      pesoInicial: Number(form.pesoInicial),
      pesoMeta: Number(form.pesoMeta),
      trh: form.trh.trim(),
      contraceptivo: form.contraceptivo.trim(),
      observacoes: form.observacoes.trim(),
      origemLead: form.origemLead.trim(),
      ativa: true,
      ultimaConsulta: "—",
      proximaConsulta: "—",
      alertas: [],
      habitos: { fibras: false, proteinas: false, hidratacao: false, cardio: false, musculacao: false, sono: "—" },
    };
    setPatientList((current) => [createdPatient, ...current]);
    setPreviewPatient(createdPatient);
    setNewPatientOpen(false);
    setForm({ nome: "", telefone: "", cpf: "", dataNascimento: "", objetivo: "", protocolo: "Lapidar 40+", consultaAtual: "", pesoInicial: "", pesoMeta: "", trh: "", contraceptivo: "", observacoes: "", origemLead: "" });
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-normal" style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}>
            Pacientes
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "#9B8B7A" }}>
            {patientList.filter((p) => p.ativa).length} ativas · {patientList.length} total
          </p>
        </div>
        <button onClick={() => setNewPatientOpen(true)} className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#5B2333" }}>
          + Nova Paciente
        </button>
      </div>

      {savedState.error && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950" role="alert">
          <span>{savedState.error} Os dados apresentados são fictícios e ficam apenas neste navegador.</span>
          <button type="button" onClick={restoreDemoPatients} className="rounded-lg border border-amber-500 px-3 py-1.5 text-xs font-semibold">
            Restaurar dados de demonstração
          </button>
        </div>
      )}

      <p className="mb-3 text-xs" style={{ color: "#9B8B7A" }}>
        Protótipo com dados fictícios; alterações persistem apenas neste navegador.
      </p>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-5">
        <input
          type="text"
          placeholder="Buscar paciente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm flex-1 outline-none"
          style={{ background: "#fff", border: "1px solid #E8E0D0", color: "#1A1008" }}
        />
        <div className="flex gap-1 flex-wrap">
          {PROTOCOLS.map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: filter === p ? "#5B2333" : "#fff",
                color: filter === p ? "#F4EFE7" : "#5B2333",
                border: "1px solid",
                borderColor: filter === p ? "#5B2333" : "#E8E0D0",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Patient cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => setPreviewPatient(p)}
            className="rounded-xl p-5 text-left transition-all duration-150 hover:shadow-md hover:-translate-y-0.5"
            style={{ background: "#fff", border: "1px solid #E8E0D0" }}
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
                  style={{ background: "#5B2333" }}
                >
                  {p.nome.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#1A1008" }}>
                    {p.nome}
                  </p>
                  <p className="text-xs" style={{ color: "#9B8B7A" }}>
                    {p.idade} anos · {p.protocolo}
                  </p>
                </div>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full shrink-0"
                style={{
                  background: p.ativa ? "#E8F0E0" : "#F0EAE0",
                  color: p.ativa ? "#66724A" : "#9B8B7A",
                }}
              >
                {p.ativa ? "Ativa" : "Inativa"}
              </span>
            </div>

            {/* Alertas */}
            {p.alertas.length > 0 && (
              <div className="flex gap-1.5 flex-wrap mb-3">
                {p.alertas.map((a, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "#FEE2E2", color: "#991B1B" }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            )}

            {/* Hábitos */}
            <div className="flex items-center gap-1.5 flex-wrap mb-3">
              {habitLabels.map((h) => {
                const ok = p.habitos[h.key];
                return (
                  <span
                    key={h.key}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: ok ? "#E8F0E0" : "#F5F0EA",
                      color: ok ? "#66724A" : "#C0B09A",
                    }}
                  >
                    {ok ? "✓" : "–"} {h.label}
                  </span>
                );
              })}
            </div>

            {/* Consultas */}
            <div
              className="flex items-center justify-between pt-3 border-t text-xs"
              style={{ borderColor: "#F0EAE0" }}
            >
              <span style={{ color: "#9B8B7A" }}>
                Última: <span style={{ color: "#1A1008" }}>{p.ultimaConsulta}</span>
              </span>
              <span style={{ color: "#9B8B7A" }}>
                Próxima: <span style={{ color: "#5B2333", fontWeight: 500 }}>{p.proximaConsulta}</span>
              </span>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border p-8 text-center" style={{ background: "#fff", borderColor: "#E8E0D0", color: "#9B8B7A" }}>
          Nenhuma paciente corresponde à busca e ao protocolo selecionados.
        </div>
      )}

      {previewPatient && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPreviewPatient(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="patient-preview-title"
            className="w-full max-w-lg rounded-2xl p-5 shadow-xl"
            style={{ background: "#F4EFE7", border: "1px solid #E8E0D0" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#9B8B7A" }}>Resumo da paciente</p>
                <h3 id="patient-preview-title" className="mt-1 text-2xl" style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}>
                  {previewPatient.nome}
                </h3>
                <p className="text-sm" style={{ color: "#66724A" }}>{previewPatient.idade} anos · {previewPatient.protocolo}</p>
              </div>
              <button type="button" onClick={() => setPreviewPatient(null)} aria-label="Fechar resumo" className="rounded-lg px-3 py-1 text-xl" style={{ color: "#5B2333" }}>×</button>
            </div>
            <div className="my-4 grid grid-cols-2 gap-3 rounded-xl bg-white p-4">
              {[
                ["Objetivo", previewPatient.objetivo || "Não informado"],
                ["Telefone", previewPatient.telefone || "Não informado"],
                ["Peso inicial", previewPatient.pesoInicial ? `${previewPatient.pesoInicial} kg` : "Não informado"],
                ["Meta", previewPatient.pesoMeta ? `${previewPatient.pesoMeta} kg` : "Não informada"],
                ["Última consulta", previewPatient.ultimaConsulta],
                ["Próxima consulta", previewPatient.proximaConsulta],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs" style={{ color: "#9B8B7A" }}>{label}</p>
                  <p className="text-sm font-medium" style={{ color: "#1A1008" }}>{value}</p>
                </div>
              ))}
            </div>
            {previewPatient.alertas.length > 0 && (
              <div className="mb-4 rounded-lg px-3 py-2 text-sm" style={{ background: "#FEE2E2", color: "#991B1B" }}>
                Atenção: {previewPatient.alertas.join(" · ")}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setPreviewPatient(null)} className="rounded-lg px-4 py-2 text-sm" style={{ color: "#5B2333", background: "#E8E0D0" }}>Fechar</button>
              <button
                type="button"
                onClick={() => {
                  setDetailPatient(previewPatient);
                  setPreviewPatient(null);
                }}
                className="rounded-lg px-4 py-2 text-sm font-medium text-white"
                style={{ background: "#5B2333" }}
              >
                Abrir ficha
              </button>
            </div>
          </section>
        </div>
      )}

      {newPatientOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setNewPatientOpen(false);
        }}>
          <form onSubmit={createPatient} className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl p-5 sm:p-6 space-y-5" style={{ background: "#F4EFE7", border: "1px solid #E8E0D0" }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl" style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}>Nova paciente</h3>
                <p className="text-sm mt-1" style={{ color: "#9B8B7A" }}>O cadastro cria a ficha inicial automaticamente.</p>
              </div>
              <button type="button" onClick={() => setNewPatientOpen(false)} aria-label="Fechar cadastro" className="w-9 h-9 rounded-lg text-xl" style={{ color: "#5B2333", background: "#E8E0D0" }}>×</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([
                { key: "nome", label: "Nome", type: "text", required: true },
                { key: "telefone", label: "Telefone", type: "tel", required: true },
                { key: "cpf", label: "CPF", type: "text", required: true },
                { key: "dataNascimento", label: "Data de nascimento", type: "date", required: true },
                { key: "objetivo", label: "Objetivo", type: "text", required: true },
                { key: "consultaAtual", label: "Consulta atual", type: "text", required: false },
                { key: "pesoInicial", label: "Peso inicial (kg)", type: "number", required: true },
                { key: "pesoMeta", label: "Meta de peso (kg)", type: "number", required: true },
                { key: "trh", label: "TRH", type: "text", required: false },
                { key: "contraceptivo", label: "Contraceptivo", type: "text", required: false },
                { key: "origemLead", label: "Origem do lead (opcional)", type: "text", required: false },
              ] as const).map((field) => (
                <label key={field.key} className="block text-xs font-medium" style={{ color: "#6D5C50" }}>
                  {field.label}
                  <input
                    required={field.required}
                    type={field.type}
                    min={field.type === "number" ? "0" : undefined}
                    step={field.type === "number" ? "0.1" : undefined}
                    value={form[field.key]}
                    onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                    className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm outline-none"
                    style={{ background: "#fff", border: "1px solid #E8E0D0", color: "#1A1008" }}
                  />
                </label>
              ))}
              <label className="block text-xs font-medium" style={{ color: "#6D5C50" }}>
                Protocolo
                <select value={form.protocolo} onChange={(event) => setForm((current) => ({ ...current, protocolo: event.target.value }))} className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm" style={{ background: "#fff", border: "1px solid #E8E0D0", color: "#1A1008" }}>
                  {PROTOCOLS.filter((protocol) => protocol !== "Todos").map((protocol) => <option key={protocol}>{protocol}</option>)}
                </select>
              </label>
              <label className="block text-xs font-medium sm:col-span-2" style={{ color: "#6D5C50" }}>
                Observações
                <textarea value={form.observacoes} onChange={(event) => setForm((current) => ({ ...current, observacoes: event.target.value }))} rows={3} className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm" style={{ background: "#fff", border: "1px solid #E8E0D0", color: "#1A1008" }} />
              </label>
            </div>

            <div className="flex justify-end gap-2 border-t pt-4" style={{ borderColor: "#E8E0D0" }}>
              <button type="button" onClick={() => setNewPatientOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium" style={{ color: "#5B2333", background: "#E8E0D0" }}>Cancelar</button>
              <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#5B2333" }}>Criar ficha</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
