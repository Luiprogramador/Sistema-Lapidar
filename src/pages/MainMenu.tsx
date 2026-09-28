import type { Page } from "../App";

const buttons = [
  {
    id: "dashboard" as Page,
    label: "Dashboard",
    description: "Visão geral clínica",
    icon: "⊞",
  },
  {
    id: "patients" as Page,
    label: "Pacientes",
    description: "Cadastro e protocolos",
    icon: "♀",
  },
  {
    id: "agenda" as Page,
    label: "Agenda",
    description: "Consultas e contatos",
    icon: "◷",
  },
  {
    id: "financial" as Page,
    label: "Financeiro",
    description: "Faturamento e receitas",
    icon: "◈",
  },
  {
    id: "reports" as Page,
    label: "Relatórios",
    description: "Análises e exportações",
    icon: "▤",
  },
  {
    id: "settings" as Page,
    label: "Configurações",
    description: "Sistema e preferências",
    icon: "⚙",
  },
];

export default function MainMenu({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ background: "#5B2333" }}
    >
      {/* Logo area */}
      <div className="mb-12 text-center">
        <h1
          className="text-5xl font-normal mb-2"
          style={{ fontFamily: "var(--font-serif)", color: "#F4EFE7" }}
        >
          Lapidar
        </h1>
        <p className="text-sm tracking-widest uppercase" style={{ color: "#C6A15B" }}>
          Gestão Clínica · Saúde Feminina
        </p>
        <div
          className="mt-4 h-px w-24 mx-auto"
          style={{ background: "linear-gradient(90deg, transparent, #C6A15B, transparent)" }}
        />
      </div>

      {/* Grid of buttons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => onNavigate(btn.id)}
            className="group flex flex-col items-start gap-2 p-6 rounded-2xl text-left transition-all duration-200"
            style={{
              background: "rgba(244,239,231,0.07)",
              border: "1px solid rgba(198,161,91,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(244,239,231,0.13)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(198,161,91,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(244,239,231,0.07)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(198,161,91,0.2)";
            }}
          >
            <span
              className="text-2xl leading-none"
              style={{ color: "#C6A15B" }}
            >
              {btn.icon}
            </span>
            <div>
              <div
                className="text-lg font-medium"
                style={{ fontFamily: "var(--font-serif)", color: "#F4EFE7" }}
              >
                {btn.label}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(244,239,231,0.5)" }}>
                {btn.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Date */}
      <p className="mt-10 text-xs" style={{ color: "rgba(244,239,231,0.3)" }}>
        {new Date().toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
