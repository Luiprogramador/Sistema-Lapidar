import { useEffect, useState } from "react"

import type { ReactNode } from "react"

export type ConsultationWorkspaceProps = {
  nomePaciente: string

  protocolo: string

  onBack?: () => void

  onOpenJourney?: () => void
}

type ConsultationTab = "checklist" | "exames" | "anotacoes" | "analises"

type ChecklistFlags = {
  pressao: boolean

  peso: boolean

  medicamentos: boolean

  historico: boolean

  objetivos: boolean
}

type WorkspaceData = {
  privateNotes: string

  publicDraft: string

  publishedAnalysis: string

  publishedAt: string
}

type DemoExam = {
  id: string

  name: string

  unit: string

  previous: string

  current: string

  goal: string

  direction: "max" | "min" | "range"

  threshold: number

  upperThreshold?: number
}

type PersistedWorkspace = {
  key: string

  data: WorkspaceData

  storageError: string

  savedAt: string
}

const colors = {
  burgundy: "#5B2333",

  ink: "#1A1008",

  muted: "#83776A",

  border: "#E8E0D0",

  paper: "#FFFFFF",

  background: "#F4EFE7",

  gold: "#C6A15B",

  olive: "#66724A",

  red: "#9C4A43",
}

const initialWorkspaceData: WorkspaceData = {
  privateNotes:
    "DEMO — Relata melhora percebida na disposição. Conversamos sobre rotina e pontos que deseja acompanhar.",

  publicDraft:
    "Neste encontro, revisamos seus objetivos e os dados disponíveis para acompanhar sua jornada. Vamos continuar observando sua evolução em conjunto.",

  publishedAnalysis: "",

  publishedAt: "",
}

const initialChecklist: ChecklistFlags = {
  pressao: false,

  peso: false,

  medicamentos: true,

  historico: true,

  objetivos: false,
}

const initialExams: DemoExam[] = [
  {
    id: "glicemia",
    name: "Glicemia em jejum",
    unit: "mg/dL",
    previous: "96",
    current: "92",
    goal: "≤ 100",
    direction: "max" as const,
    threshold: 100,
  },

  {
    id: "hba1c",
    name: "Hemoglobina glicada",
    unit: "%",
    previous: "5,6",
    current: "5,4",
    goal: "≤ 5,7",
    direction: "max" as const,
    threshold: 5.7,
  },

  {
    id: "ldl",
    name: "Colesterol LDL",
    unit: "mg/dL",
    previous: "142",
    current: "128",
    goal: "≤ 130",
    direction: "max" as const,
    threshold: 130,
  },

  {
    id: "hdl",
    name: "Colesterol HDL",
    unit: "mg/dL",
    previous: "48",
    current: "51",
    goal: "≥ 50",
    direction: "min" as const,
    threshold: 50,
  },

  {
    id: "triglicerideos",
    name: "Triglicerídeos",
    unit: "mg/dL",
    previous: "138",
    current: "116",
    goal: "≤ 150",
    direction: "max" as const,
    threshold: 150,
  },

  {
    id: "vitamina-d",
    name: "Vitamina D (25-OH)",
    unit: "ng/mL",
    previous: "24",
    current: "32",
    goal: "30–60",
    direction: "range" as const,
    threshold: 30,
    upperThreshold: 60,
  },

  {
    id: "tsh",
    name: "TSH",
    unit: "µUI/mL",
    previous: "3,1",
    current: "2,6",
    goal: "0,4–4,0",
    direction: "range" as const,
    threshold: 0.4,
    upperThreshold: 4,
  },
]

const tabs: { id: ConsultationTab; label: string; shortLabel: string }[] = [
  { id: "checklist", label: "Checklist", shortLabel: "Checklist" },

  { id: "exames", label: "Exames", shortLabel: "Exames" },

  { id: "anotacoes", label: "Anotações", shortLabel: "Anotações" },

  { id: "analises", label: "Análises em consulta", shortLabel: "Análises" },
]

function isInDemoGoal(exam: DemoExam, value: number) {
  if (exam.direction === "max") return value <= exam.threshold

  if (exam.direction === "min") return value >= exam.threshold

  return (
    value >= exam.threshold && value <= (exam.upperThreshold ?? exam.threshold)
  )
}

function makeStorageKey(nomePaciente: string, protocolo: string) {
  return `lapidar:consulta:${encodeURIComponent(nomePaciente)}:${encodeURIComponent(protocolo)}`
}

function isWorkspaceData(value: unknown): value is WorkspaceData {
  if (!value || typeof value !== "object") return false

  const data = value as Record<string, unknown>

  return (
    typeof data.privateNotes === "string" &&
    typeof data.publicDraft === "string" &&
    typeof data.publishedAnalysis === "string" &&
    typeof data.publishedAt === "string"
  )
}

function readWorkspace(key: string): PersistedWorkspace {
  try {
    if (typeof window === "undefined") {
      return { key, data: initialWorkspaceData, storageError: "", savedAt: "" }
    }

    const storedValue = window.localStorage.getItem(key)

    if (!storedValue)
      return { key, data: initialWorkspaceData, storageError: "", savedAt: "" }

    const parsed: unknown = JSON.parse(storedValue)

    if (
      !parsed ||
      typeof parsed !== "object" ||
      !("data" in parsed) ||
      !isWorkspaceData(parsed.data) ||
      !("savedAt" in parsed) ||
      typeof parsed.savedAt !== "string"
    ) {
      throw new Error("Os dados salvos estão em um formato inválido.")
    }

    return { key, data: parsed.data, storageError: "", savedAt: parsed.savedAt }
  } catch (error) {
    const detail = error instanceof Error ? error.message : "erro desconhecido"

    return {
      key,

      data: initialWorkspaceData,

      storageError: `Não foi possível carregar as anotações locais: ${detail}`,

      savedAt: "",
    }
  }
}

function Panel({
  title,

  subtitle,

  children,

  action,
}: {
  title: string

  subtitle?: string

  children: ReactNode

  action?: ReactNode
}) {
  return (
    <section
      className="overflow-hidden rounded-2xl border bg-white shadow-sm"
      style={{ borderColor: colors.border }}
    >
      <div
        className="flex flex-wrap items-start justify-between gap-3 border-b px-5 py-4 sm:px-6"
        style={{ borderColor: "#F0EAE0" }}
      >
        <div>
          <h2
            className="font-serif text-lg font-semibold"
            style={{ color: colors.burgundy }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="mt-1 text-sm leading-relaxed"
              style={{ color: colors.muted }}
            >
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  )
}

function Field({
  label,

  value,

  onChange,

  placeholder,

  type = "text",

  suffix,
}: {
  label: string

  value: string

  onChange: (value: string) => void

  placeholder?: string

  type?: string

  suffix?: string
}) {
  return (
    <label className="block">
      <span
        className="mb-1.5 block text-xs font-semibold"
        style={{ color: colors.muted }}
      >
        {label}
      </span>
      <span
        className="flex rounded-xl border bg-white focus-within:ring-2 focus-within:ring-[#C6A15B]"
        style={{ borderColor: colors.border }}
      >
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 w-full rounded-xl bg-transparent px-3 py-2.5 text-sm outline-none"
          style={{ color: colors.ink }}
        />
        {suffix && (
          <span
            className="flex shrink-0 items-center pr-3 text-xs"
            style={{ color: colors.muted }}
          >
            {suffix}
          </span>
        )}
      </span>
    </label>
  )
}

function StatusPill({
  children,
  positive = true,
}: {
  children: ReactNode
  positive?: boolean
}) {
  return (
    <span
      className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={{
        background: positive ? "#EDF1E8" : "#FAEEE9",

        color: positive ? colors.olive : colors.red,
      }}
    >
      {children}
    </span>
  )
}

export default function ConsultationWorkspace({
  nomePaciente,

  protocolo,

  onBack,

  onOpenJourney,
}: ConsultationWorkspaceProps) {
  const storageKey = makeStorageKey(nomePaciente, protocolo)

  const [activeTab, setActiveTab] = useState<ConsultationTab>("checklist")

  const [checklist, setChecklist] = useState(initialChecklist)

  const [vitals, setVitals] = useState({ pressure: "", weight: "68,4" })

  const [medications, setMedications] = useState(
    "Nenhuma informada · confirmar na consulta",
  )

  const [history, setHistory] = useState(
    "DEMO — Sem alergias relatadas. Antecedentes familiares a confirmar.",
  )

  const [goals, setGoals] = useState(
    "DEMO — Mais disposição e acompanhamento regular.",
  )

  const [exams, setExams] = useState(initialExams)

  const [workspace, setWorkspace] = useState<PersistedWorkspace>(() =>
    readWorkspace(storageKey),
  )

  const [notice, setNotice] = useState("")

  useEffect(() => {
    if (workspace.key !== storageKey) {
      setWorkspace(readWorkspace(storageKey))

      setNotice("")
    }
  }, [storageKey, workspace.key])

  const updateData = (patch: Partial<WorkspaceData>) => {
    setWorkspace((current) => ({
      ...current,

      data: { ...current.data, ...patch },
    }))

    setNotice("")
  }

  const saveLocally = () => {
    const savedAt = new Date().toISOString()

    try {
      if (typeof window === "undefined")
        throw new Error(
          "O armazenamento local não está disponível neste ambiente.",
        )

      window.localStorage.setItem(
        storageKey,
        JSON.stringify({ data: workspace.data, savedAt }),
      )

      setWorkspace((current) => ({
        ...current,
        key: storageKey,
        storageError: "",
        savedAt,
      }))

      setNotice("Anotações salvas neste dispositivo.")
    } catch (error) {
      const detail =
        error instanceof Error ? error.message : "erro desconhecido"

      setWorkspace((current) => ({
        ...current,

        key: storageKey,

        storageError: `Não foi possível salvar localmente: ${detail}`,
      }))

      setNotice("")
    }
  }

  const publishAnalysis = () => {
    const content = workspace.data.publicDraft.trim()

    if (!content) {
      setNotice("Escreva uma análise para a paciente antes de publicar.")

      return
    }

    updateData({
      publishedAnalysis: content,

      publishedAt: new Date().toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    })

    setNotice(
      "Prévia publicada para a paciente neste protótipo. Salve para persistir no dispositivo.",
    )
  }

  const checkedCount = Object.values(checklist).filter(Boolean).length

  return (
    <div
      className="min-h-screen"
      style={{ background: colors.background, color: colors.ink }}
    >
      <header
        className="border-b"
        style={{
          background: colors.burgundy,
          borderColor: "rgba(255,255,255,0.12)",
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                aria-label="Voltar"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4B578]"
              >
                <svg
                  aria-hidden="true"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                  <path d="M9 12h12" />
                </svg>
              </button>
            )}
            <div className="min-w-0">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: "#D4B578" }}
              >
                Lapidar · Consulta
              </p>
              <h1 className="mt-0.5 truncate font-serif text-xl font-semibold text-white sm:text-2xl">
                {nomePaciente}
              </h1>
              <p
                className="mt-0.5 text-xs"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                {protocolo} <span aria-hidden="true">·</span> 28 set 2026
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider"
              style={{
                borderColor: "rgba(255,255,255,0.28)",
                color: "#F4EFE7",
              }}
            >
              Ambiente demo
            </span>
            {onOpenJourney && (
              <button
                type="button"
                onClick={onOpenJourney}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4B578]"
                style={{ background: colors.gold, color: colors.burgundy }}
              >
                Abrir jornada
                <svg
                  aria-hidden="true"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: colors.olive }}
            >
              Atendimento individual
            </p>
            <h2
              className="mt-1 font-serif text-2xl font-semibold sm:text-3xl"
              style={{ color: colors.burgundy }}
            >
              Espaço da consulta
            </h2>
          </div>
          <p
            className="rounded-full px-3 py-1.5 text-xs"
            style={{ background: "#EEE7DC", color: colors.muted }}
          >
            Dados demonstrativos · não usar como registro clínico
          </p>
        </div>

        <div
          className="mb-6 overflow-x-auto rounded-2xl border bg-white p-1.5 shadow-sm"
          style={{ borderColor: colors.border }}
        >
          <div
            className="flex min-w-max gap-1"
            role="tablist"
            aria-label="Seções da consulta"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A15B]"
                style={{
                  background:
                    activeTab === tab.id ? colors.burgundy : "transparent",

                  color: activeTab === tab.id ? "#FFFFFF" : colors.muted,
                }}
              >
                <span className="sm:hidden">{tab.shortLabel}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === "checklist" && (
          <div
            id="panel-checklist"
            role="tabpanel"
            aria-labelledby="tab-checklist"
            className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.8fr)]"
          >
            <Panel
              title="Checklist clínica"
              subtitle="Registre os dados abordados nesta consulta. Os valores abaixo são exemplos fictícios."
              action={
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: "#F4EFE7", color: colors.burgundy }}
                >
                  {checkedCount} de 5 concluídos
                </span>
              }
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Pressão arterial"
                  value={vitals.pressure}
                  onChange={(pressure) =>
                    setVitals((current) => ({ ...current, pressure }))
                  }
                  placeholder="Ex.: 120/80"
                  suffix="mmHg"
                />
                <Field
                  label="Peso atual"
                  value={vitals.weight}
                  onChange={(weight) =>
                    setVitals((current) => ({ ...current, weight }))
                  }
                  placeholder="Ex.: 68,4"
                  suffix="kg"
                />
              </div>
              <div className="mt-5">
                <label
                  className="mb-1.5 block text-xs font-semibold"
                  style={{ color: colors.muted }}
                  htmlFor="medications"
                >
                  Medicações e suplementos (conferir com a paciente)
                </label>
                <textarea
                  id="medications"
                  value={medications}
                  onChange={(event) => setMedications(event.target.value)}
                  rows={3}
                  className="w-full resize-y rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#C6A15B]"
                  style={{ borderColor: colors.border, color: colors.ink }}
                />
              </div>
              <div className="mt-4">
                <label
                  className="mb-1.5 block text-xs font-semibold"
                  style={{ color: colors.muted }}
                  htmlFor="history"
                >
                  Histórico relevante
                </label>
                <textarea
                  id="history"
                  value={history}
                  onChange={(event) => setHistory(event.target.value)}
                  rows={3}
                  className="w-full resize-y rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#C6A15B]"
                  style={{ borderColor: colors.border, color: colors.ink }}
                />
              </div>
              <div className="mt-4">
                <label
                  className="mb-1.5 block text-xs font-semibold"
                  style={{ color: colors.muted }}
                  htmlFor="goals"
                >
                  Objetivos relatados pela paciente
                </label>
                <textarea
                  id="goals"
                  value={goals}
                  onChange={(event) => setGoals(event.target.value)}
                  rows={3}
                  className="w-full resize-y rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#C6A15B]"
                  style={{ borderColor: colors.border, color: colors.ink }}
                />
              </div>
            </Panel>
            <Panel
              title="Etapas da consulta"
              subtitle="Marque os tópicos conferidos durante a conversa."
            >
              <div className="space-y-2">
                {([
                  ["pressao", "Pressão aferida"],

                  ["peso", "Peso registrado"],

                  ["medicamentos", "Medicações revisadas"],

                  ["historico", "Histórico conferido"],

                  ["objetivos", "Objetivos alinhados"],
                ] as [keyof ChecklistFlags, string][]).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition hover:bg-[#FBF8F4]"
                    style={{ borderColor: colors.border }}
                  >
                    <input
                      type="checkbox"
                      checked={checklist[key]}
                      onChange={(event) =>
                        setChecklist((current) => ({
                          ...current,
                          [key]: event.target.checked,
                        }))
                      }
                      className="h-4 w-4 accent-[#5B2333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A15B]"
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: colors.ink }}
                    >
                      {label}
                    </span>
                  </label>
                ))}
              </div>
              <p
                className="mt-4 rounded-xl p-3 text-xs leading-relaxed"
                style={{ background: "#F8F4ED", color: colors.muted }}
              >
                Campos e marcações ficam nesta tela de demonstração. Anotações e
                análises são salvas separadamente na aba correspondente.
              </p>
            </Panel>
          </div>
        )}

        {activeTab === "exames" && (
          <div id="panel-exames" role="tabpanel" aria-labelledby="tab-exames">
            <Panel
              title="Painel de exames"
              subtitle="Conjunto demonstrativo metabólico e endócrino. Edite os resultados atuais para visualizar o status ilustrativo."
            >
              <div className="mb-4 flex flex-wrap gap-2">
                <span
                  className="rounded-lg px-3 py-2 text-xs font-medium"
                  style={{ background: "#F8F4ED", color: colors.muted }}
                >
                  Histórico, atual e meta por exame
                </span>
                <span
                  className="rounded-lg px-3 py-2 text-xs font-semibold"
                  style={{ background: "#FBF3E3", color: "#795C28" }}
                >
                  Metas fictícias para demonstração — não são orientação clínica
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
                  <thead>
                    <tr
                      className="text-[11px] uppercase tracking-wider"
                      style={{ color: colors.muted }}
                    >
                      <th
                        className="border-b px-3 py-3 font-semibold"
                        style={{ borderColor: colors.border }}
                      >
                        Exame
                      </th>
                      <th
                        className="border-b px-3 py-3 font-semibold"
                        style={{ borderColor: colors.border }}
                      >
                        Anterior · demo
                      </th>
                      <th
                        className="border-b px-3 py-3 font-semibold"
                        style={{ borderColor: colors.border }}
                      >
                        Atual · demo
                      </th>
                      <th
                        className="border-b px-3 py-3 font-semibold"
                        style={{ borderColor: colors.border }}
                      >
                        Meta · demo
                      </th>
                      <th
                        className="border-b px-3 py-3 font-semibold"
                        style={{ borderColor: colors.border }}
                      >
                        Status condicional
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map((exam) => {
                      const numericCurrent = Number(
                        exam.current.replace(",", "."),
                      )

                      const hasCurrent = exam.current.trim() !== ""

                      const hasValidValue =
                        hasCurrent && Number.isFinite(numericCurrent)

                      const inGoal =
                        hasValidValue && isInDemoGoal(exam, numericCurrent)

                      return (
                        <tr key={exam.id}>
                          <th
                            scope="row"
                            className="border-b px-3 py-3.5 text-sm font-semibold"
                            style={{
                              borderColor: colors.border,
                              color: colors.ink,
                            }}
                          >
                            {exam.name}
                          </th>
                          <td
                            className="border-b px-3 py-3.5 text-sm"
                            style={{
                              borderColor: colors.border,
                              color: colors.muted,
                            }}
                          >
                            {exam.previous}{" "}
                            <span className="text-xs">{exam.unit}</span>
                          </td>
                          <td
                            className="border-b px-3 py-3.5"
                            style={{ borderColor: colors.border }}
                          >
                            <label
                              className="sr-only"
                              htmlFor={`exam-${exam.id}`}
                            >
                              Resultado atual de {exam.name}
                            </label>
                            <span
                              className="flex w-36 items-center rounded-lg border bg-white focus-within:ring-2 focus-within:ring-[#C6A15B]"
                              style={{ borderColor: colors.border }}
                            >
                              <input
                                id={`exam-${exam.id}`}
                                inputMode="decimal"
                                value={exam.current}
                                onChange={(event) =>
                                  setExams((current) =>
                                    current.map((item) =>
                                      item.id === exam.id
                                        ? {
                                            ...item,
                                            current: event.target.value,
                                          }
                                        : item,
                                    ),
                                  )
                                }
                                className="min-w-0 w-full bg-transparent px-2.5 py-2 text-sm outline-none"
                                style={{ color: colors.ink }}
                              />
                              <span
                                className="pr-2 text-[10px]"
                                style={{ color: colors.muted }}
                              >
                                {exam.unit}
                              </span>
                            </span>
                          </td>
                          <td
                            className="border-b px-3 py-3.5 text-sm font-medium"
                            style={{
                              borderColor: colors.border,
                              color: colors.ink,
                            }}
                          >
                            {exam.goal}{" "}
                            <span
                              className="text-xs font-normal"
                              style={{ color: colors.muted }}
                            >
                              {exam.unit}
                            </span>
                          </td>
                          <td
                            className="border-b px-3 py-3.5"
                            style={{ borderColor: colors.border }}
                          >
                            {!hasCurrent ? (
                              <StatusPill positive={false}>
                                Sem resultado
                              </StatusPill>
                            ) : !hasValidValue ? (
                              <StatusPill positive={false}>
                                Valor inválido
                              </StatusPill>
                            ) : inGoal ? (
                              <StatusPill>Na meta demo</StatusPill>
                            ) : (
                              <StatusPill positive={false}>
                                Fora da meta demo
                              </StatusPill>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <p
                className="mt-4 text-xs leading-relaxed"
                style={{ color: colors.muted }}
              >
                Os números e critérios desta tela são fictícios e servem apenas
                para demonstrar a interface. O status é uma comparação
                automática com a meta de exemplo, não uma interpretação clínica.
              </p>
            </Panel>
          </div>
        )}

        {activeTab === "anotacoes" && (
          <div
            id="panel-anotacoes"
            role="tabpanel"
            aria-labelledby="tab-anotacoes"
            className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(250px,0.7fr)]"
          >
            <Panel
              title="Anotações privadas"
              subtitle="Visíveis somente neste espaço de consulta. Não são incluídas em análises publicadas para a paciente."
              action={
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: "#F4EFE7", color: colors.burgundy }}
                >
                  Privado
                </span>
              }
            >
              <label
                htmlFor="private-notes"
                className="mb-1.5 block text-xs font-semibold"
                style={{ color: colors.muted }}
              >
                Registro interno da consulta · conteúdo de demonstração
              </label>
              <textarea
                id="private-notes"
                value={workspace.data.privateNotes}
                onChange={(event) =>
                  updateData({ privateNotes: event.target.value })
                }
                rows={12}
                placeholder="Registre suas observações privadas..."
                className="w-full resize-y rounded-xl border px-4 py-3 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-[#C6A15B]"
                style={{ borderColor: colors.border, color: colors.ink }}
              />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs" style={{ color: colors.muted }}>
                  O salvamento é local neste dispositivo, sem envio a um
                  servidor.
                </p>
                <button
                  type="button"
                  onClick={saveLocally}
                  className="min-h-10 rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A15B]"
                  style={{ background: colors.burgundy }}
                >
                  Salvar anotações
                </button>
              </div>
              {workspace.savedAt && (
                <p className="mt-3 text-xs" style={{ color: colors.olive }}>
                  Último salvamento local:{" "}
                  {new Date(workspace.savedAt).toLocaleString("pt-BR")}
                </p>
              )}
              {workspace.storageError && (
                <p
                  role="alert"
                  className="mt-3 rounded-xl border px-3 py-2.5 text-sm"
                  style={{
                    borderColor: "#E7C8C1",
                    background: "#FAEEE9",
                    color: colors.red,
                  }}
                >
                  {workspace.storageError}
                </p>
              )}
              {notice && (
                <p
                  role="status"
                  aria-live="polite"
                  className="mt-3 text-sm font-medium"
                  style={{ color: colors.olive }}
                >
                  {notice}
                </p>
              )}
            </Panel>
            <Panel
              title="Privacidade neste protótipo"
              subtitle="Separação clara entre registro interno e conteúdo compartilhado."
            >
              <div className="space-y-3">
                <div
                  className="rounded-xl border p-4"
                  style={{ borderColor: colors.border, background: "#FBF8F4" }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: colors.burgundy }}
                  >
                    Nota privada
                  </p>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: colors.muted }}
                  >
                    Salva apenas no armazenamento local do navegador. Nunca
                    aparece na prévia para a paciente.
                  </p>
                </div>
                <div
                  className="rounded-xl border p-4"
                  style={{ borderColor: "#E4D6B7", background: "#FBF7EE" }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#795C28" }}
                  >
                    Análise compartilhada
                  </p>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: colors.muted }}
                  >
                    É um texto independente, revisado e publicado manualmente na
                    aba Análises em consulta.
                  </p>
                </div>
              </div>
            </Panel>
          </div>
        )}

        {activeTab === "analises" && (
          <div
            id="panel-analises"
            role="tabpanel"
            aria-labelledby="tab-analises"
            className="grid gap-5 lg:grid-cols-2"
          >
            <Panel
              title="Rascunho da análise"
              subtitle="Escreva um resumo compreensível e adequado para compartilhar. Este texto é independente das notas privadas."
            >
              <label
                htmlFor="public-analysis"
                className="mb-1.5 block text-xs font-semibold"
                style={{ color: colors.muted }}
              >
                Texto para a paciente · demonstração
              </label>
              <textarea
                id="public-analysis"
                value={workspace.data.publicDraft}
                onChange={(event) =>
                  updateData({ publicDraft: event.target.value })
                }
                rows={9}
                placeholder="Escreva uma mensagem para a paciente..."
                className="w-full resize-y rounded-xl border px-4 py-3 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-[#C6A15B]"
                style={{ borderColor: colors.border, color: colors.ink }}
              />
              <p
                className="mt-2 text-xs leading-relaxed"
                style={{ color: colors.muted }}
              >
                Não inclua aqui informações que devam permanecer em registro
                privado. Nenhuma sugestão de tratamento é gerada por este
                protótipo.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={publishAnalysis}
                  className="min-h-10 rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A15B]"
                  style={{ background: colors.burgundy }}
                >
                  Publicar para a paciente
                </button>
                {workspace.data.publishedAt && (
                  <button
                    type="button"
                    onClick={saveLocally}
                    className="min-h-10 rounded-xl border px-4 py-2 text-sm font-semibold transition hover:bg-[#FBF8F4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A15B]"
                    style={{
                      borderColor: colors.border,
                      color: colors.burgundy,
                    }}
                  >
                    Salvar neste dispositivo
                  </button>
                )}
              </div>
              {notice && (
                <p
                  role={workspace.storageError ? "alert" : "status"}
                  aria-live="polite"
                  className="mt-3 text-sm font-medium"
                  style={{
                    color: workspace.storageError ? colors.red : colors.olive,
                  }}
                >
                  {notice}
                </p>
              )}
              {workspace.storageError && (
                <p
                  role="alert"
                  className="mt-2 rounded-xl border px-3 py-2.5 text-sm"
                  style={{
                    borderColor: "#E7C8C1",
                    background: "#FAEEE9",
                    color: colors.red,
                  }}
                >
                  {workspace.storageError}
                </p>
              )}
            </Panel>
            <Panel
              title="Prévia visível à paciente"
              subtitle="Simulação do conteúdo compartilhado. Notas privadas não são exibidas nesta área."
              action={
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: "#EDF1E8", color: colors.olive }}
                >
                  Visível à paciente
                </span>
              }
            >
              {workspace.data.publishedAnalysis ? (
                <article
                  className="rounded-xl border p-5"
                  style={{ borderColor: "#E4D6B7", background: "#FBF8F1" }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.16em]"
                    style={{ color: colors.olive }}
                  >
                    Análise compartilhada · demo
                  </p>
                  <p
                    className="mt-3 whitespace-pre-wrap text-sm leading-relaxed"
                    style={{ color: colors.ink }}
                  >
                    {workspace.data.publishedAnalysis}
                  </p>
                  {workspace.data.publishedAt && (
                    <p
                      className="mt-4 border-t pt-3 text-xs"
                      style={{ borderColor: "#E8E0D0", color: colors.muted }}
                    >
                      Publicação simulada em {workspace.data.publishedAt}
                    </p>
                  )}
                </article>
              ) : (
                <div
                  className="rounded-xl border border-dashed px-5 py-10 text-center"
                  style={{ borderColor: "#D9CFBE", background: "#FBF8F4" }}
                >
                  <p
                    className="font-serif text-lg font-semibold"
                    style={{ color: colors.burgundy }}
                  >
                    Nenhuma análise publicada
                  </p>
                  <p
                    className="mx-auto mt-2 max-w-sm text-sm leading-relaxed"
                    style={{ color: colors.muted }}
                  >
                    A prévia ficará visível aqui depois que você publicar um
                    texto. O rascunho ainda não é compartilhado.
                  </p>
                </div>
              )}
              <p
                className="mt-4 text-xs leading-relaxed"
                style={{ color: colors.muted }}
              >
                A publicação é apenas uma simulação local desta interface e não
                envia conteúdo à paciente.
              </p>
            </Panel>
          </div>
        )}
      </main>
    </div>
  )
}
