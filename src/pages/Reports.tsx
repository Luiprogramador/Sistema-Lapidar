import { useState } from "react";

const reportItems = [
  {
    title: "Hábitos de Vida — Semana",
    description: "Check diário de alimentação, atividade física e sono por paciente.",
    icon: "◎",
    color: "#66724A",
  },
  {
    title: "Exames Pendentes",
    description: "Lista de pacientes com solicitações de exames em aberto.",
    icon: "▣",
    color: "#C6A15B",
  },
  {
    title: "Risco Cardiovascular",
    description: "Pacientes com LDL acima da meta e calculadora PREVENT.",
    icon: "♥",
    color: "#5B2333",
  },
  {
    title: "Bioimpedâncias Pendentes",
    description: "Pacientes que não realizaram bioimpedância no período.",
    icon: "⊙",
    color: "#7A3047",
  },
  {
    title: "Vitamina D Baixa",
    description: "Pacientes com dosagem abaixo de 30 ng/mL.",
    icon: "☀",
    color: "#C6A15B",
  },
  {
    title: "Atividade Física",
    description: "Aderência a cardio e musculação por protocolo.",
    icon: "◈",
    color: "#66724A",
  },
  {
    title: "Envio de Ebook",
    description: "Controle de envios e postagens de material educativo.",
    icon: "◷",
    color: "#5B2333",
  },
  {
    title: "Faturamento Mensal",
    description: "Relatório financeiro detalhado com receita por protocolo.",
    icon: "▤",
    color: "#C6A15B",
  },
];

const habitsSummary = [
  { nome: "Ana Paula Ferreira", fibras: 5, proteinas: 6, hidratacao: 4, cardio: 2, musculacao: 5, sonoMedio: "7h" },
  { nome: "Beatriz Lima", fibras: 6, proteinas: 4, hidratacao: 6, cardio: 5, musculacao: 3, sonoMedio: "6h30" },
  { nome: "Carla Mendes", fibras: 2, proteinas: 5, hidratacao: 5, cardio: 0, musculacao: 0, sonoMedio: "5h" },
  { nome: "Daniela Rocha", fibras: 7, proteinas: 7, hidratacao: 7, cardio: 6, musculacao: 7, sonoMedio: "8h" },
  { nome: "Fernanda Alves", fibras: 6, proteinas: 7, hidratacao: 7, cardio: 3, musculacao: 6, sonoMedio: "7h" },
];

function ScoreDot({ value, max = 7 }: { value: number; max?: number }) {
  const pct = value / max;
  const color = pct >= 0.7 ? "#66724A" : pct >= 0.4 ? "#C6A15B" : "#D97706";
  return (
    <div className="flex items-center gap-1">
      <div className="w-12 h-1.5 rounded-full overflow-hidden" style={{ background: "#F0EAE0" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${pct * 100}%`, background: color }}
        />
      </div>
      <span className="text-xs" style={{ color: "#9B8B7A" }}>
        {value}/{max}
      </span>
    </div>
  );
}

export default function Reports() {
  const [activeTab, setActiveTab] = useState<"overview" | "habits" | "cardiovascular">("overview");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2
          className="text-2xl font-normal"
          style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}
        >
          Relatórios
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "#9B8B7A" }}>
          Análises clínicas e exportações
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "#E8E0D0" }}>
        {(
          [
            { id: "overview", label: "Visão Geral" },
            { id: "habits", label: "Hábitos de Vida" },
            { id: "cardiovascular", label: "Risco Cardiovascular" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === tab.id ? "#fff" : "transparent",
              color: activeTab === tab.id ? "#5B2333" : "#9B8B7A",
              boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {reportItems.map((r) => (
            <button
              key={r.title}
              className="group rounded-xl p-5 text-left transition-all hover:shadow-md"
              style={{ background: "#fff", border: "1px solid #E8E0D0" }}
            >
              <div
                className="text-2xl mb-3 leading-none"
                style={{ color: r.color }}
              >
                {r.icon}
              </div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: "#1A1008" }}>
                {r.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "#9B8B7A" }}>
                {r.description}
              </p>
              <div
                className="mt-3 text-xs font-medium"
                style={{ color: r.color }}
              >
                Gerar relatório →
              </div>
            </button>
          ))}
        </div>
      )}

      {activeTab === "habits" && (
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "#fff", border: "1px solid #E8E0D0" }}
        >
          <div className="p-4 border-b" style={{ borderColor: "#F0EAE0" }}>
            <h3 className="text-sm font-semibold" style={{ color: "#5B2333" }}>
              Aderência aos Hábitos — Últimos 7 dias
            </h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#F8F5F0" }}>
                {["Paciente", "Fibras", "Proteínas", "Hidratação", "Cardio", "Musculação", "Sono Médio"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left text-xs font-medium"
                    style={{ color: "#9B8B7A" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habitsSummary.map((p, i) => (
                <tr
                  key={i}
                  className="border-t"
                  style={{ borderColor: "#F0EAE0" }}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: "#1A1008" }}>
                    {p.nome}
                  </td>
                  <td className="px-4 py-3"><ScoreDot value={p.fibras} /></td>
                  <td className="px-4 py-3"><ScoreDot value={p.proteinas} /></td>
                  <td className="px-4 py-3"><ScoreDot value={p.hidratacao} /></td>
                  <td className="px-4 py-3"><ScoreDot value={p.cardio} /></td>
                  <td className="px-4 py-3"><ScoreDot value={p.musculacao} /></td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#5B2333" }}>
                    {p.sonoMedio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "cardiovascular" && (
        <div className="space-y-4">
          <div
            className="rounded-xl p-5"
            style={{ background: "#fff", border: "1px solid #E8E0D0" }}
          >
            <h3 className="text-sm font-semibold mb-1" style={{ color: "#5B2333" }}>
              Calculadora de Risco Cardiovascular — PREVENT
            </h3>
            <p className="text-xs mb-4" style={{ color: "#9B8B7A" }}>
              American Heart Association · Ferramenta oficial para cálculo de risco em 10 e 30 anos
            </p>
            <a
              href="https://professional.heart.org/en/guidelines-and-statements/prevent-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "#5B2333" }}
            >
              ♥ Abrir Calculadora PREVENT
            </a>
          </div>

          <div
            className="rounded-xl overflow-hidden"
            style={{ background: "#fff", border: "1px solid #E8E0D0" }}
          >
            <div className="p-4 border-b" style={{ borderColor: "#F0EAE0" }}>
              <h3 className="text-sm font-semibold" style={{ color: "#5B2333" }}>
                Pacientes com LDL Acima da Meta
              </h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#F8F5F0" }}>
                  {["Paciente", "Protocolo", "LDL Atual", "Meta", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-left text-xs font-medium"
                      style={{ color: "#9B8B7A" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { nome: "Ana Paula Ferreira", protocolo: "Lapidar 40+", ldl: 148, meta: 100 },
                  { nome: "Carla Mendes", protocolo: "Lapidar 40+", ldl: 162, meta: 100 },
                  { nome: "Sabrina Oliveira", protocolo: "Lapidar SOP", ldl: 124, meta: 100 },
                ].map((p, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: "#F0EAE0" }}>
                    <td className="px-4 py-3 font-medium" style={{ color: "#1A1008" }}>{p.nome}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#9B8B7A" }}>{p.protocolo}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: "#991B1B" }}>
                      {p.ldl} mg/dL
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#9B8B7A" }}>
                      &lt; {p.meta} mg/dL
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "#FEE2E2", color: "#991B1B" }}
                      >
                        Acima da meta +{p.ldl - p.meta}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
