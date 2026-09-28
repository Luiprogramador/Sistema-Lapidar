import { useState } from "react";

type JourneyStage = {
  id: string;
  title: string;
  owner: string;
  tasks: string[];
};

const stages: JourneyStage[] = [
  { id: "lead", title: "Contato inicial", owner: "Secretaria", tasks: ["Registrar origem do lead e objetivo", "Explicar consulta e reembolso", "Agendar primeira consulta", "Enviar orientações e formulário pré-consulta", "Confirmar agendamento"] },
  { id: "first-consult", title: "Primeira consulta", owner: "Médica", tasks: ["Realizar consulta e avaliação clínica", "Registrar objetivos e plano inicial", "Definir indicação para o Método Lapidar"] },
  { id: "enrollment", title: "Fechamento e entrada no programa", owner: "Secretaria", tasks: ["Confirmar adesão e plano contratado", "Registrar duração de 6 ou 12 meses", "Agendar Marco Zero", "Enviar orientações pré-consulta"] },
  { id: "pre-zero", title: "Pré-Marco Zero", owner: "Médica", tasks: ["Preparar plano individual e cronograma", "Conferir diário e materiais", "Preparar kit da jornada"] },
  { id: "zero", title: "Marco Zero", owner: "Médica", tasks: ["Apresentar plano e cronograma", "Entregar contrato, kit e diário", "Registrar medidas e bioimpedância inicial", "Definir metas individualizadas", "Orientar acesso à biblioteca Lapidar"] },
  { id: "journey", title: "Jornada em andamento", owner: "Equipe e paciente", tasks: ["Realizar consultas e bioimpedâncias conforme cronograma", "Acompanhar check-ins e contatos", "Solicitar e acompanhar exames periódicos", "Atualizar plano e metas mantendo o histórico", "Registrar sessões e encaminhamentos previstos"] },
  { id: "closing", title: "Fechamento do ciclo", owner: "Médica", tasks: ["Realizar bioimpedância e exames finais", "Gerar relatório comparativo da jornada", "Realizar consulta de fechamento", "Definir próxima fase com a paciente"] },
];

const followUpOptions = [
  { id: "intensive", title: "Evolução · alta intensidade", cadence: "Consulta e bioimpedância mensais", tasks: ["Consulta médica mensal", "Bioimpedância mensal", "Nutricionista a cada 3 meses", "Acompanhamento clínico contínuo", "Suporte e Lapidar Society ativos"] },
  { id: "regular", title: "Evolução · média intensidade", cadence: "Consulta e bioimpedância bimestrais", tasks: ["Consulta médica bimestral", "Bioimpedância bimestral", "Nutricionista a cada 3 meses", "Acompanhamento clínico contínuo", "Suporte e Lapidar Society ativos"] },
  { id: "maintenance", title: "Manutenção", cadence: "Consulta e bioimpedância trimestrais", tasks: ["Consulta médica trimestral", "Bioimpedância trimestral", "Nutricionista a cada 6 meses", "Suporte e Lapidar Society ativos"] },
];

type JourneyProgress = { checked: Record<string, boolean>; followUp: string };

function readProgress(patientId: number): { value: JourneyProgress; error: string | null } {
  const empty = { checked: {}, followUp: "" };
  try {
    const raw = window.localStorage.getItem(`lapidar-demo-journey-${patientId}`);
    if (!raw) return { value: empty, error: null };
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("checked" in parsed) ||
      typeof parsed.checked !== "object" ||
      parsed.checked === null ||
      !Object.values(parsed.checked).every((value) => typeof value === "boolean") ||
      !("followUp" in parsed) ||
      typeof parsed.followUp !== "string"
    ) {
      return { value: empty, error: "O progresso salvo da jornada está inválido. Marque uma etapa para reiniciar os dados locais." };
    }
    return { value: { checked: parsed.checked as Record<string, boolean>, followUp: parsed.followUp }, error: null };
  } catch {
    return { value: empty, error: "Não foi possível carregar o progresso local desta jornada. Verifique o armazenamento do navegador." };
  }
}

export default function PatientJourney({ patientId }: { patientId: number }) {
  const [loaded] = useState(() => readProgress(patientId));
  const [progress, setProgress] = useState(loaded.value);
  const [error, setError] = useState<string | null>(loaded.error);
  const total = stages.reduce((sum, stage) => sum + stage.tasks.length, 0);
  const completed = Object.values(progress.checked).filter(Boolean).length;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  const update = (next: JourneyProgress) => {
    try {
      window.localStorage.setItem(`lapidar-demo-journey-${patientId}`, JSON.stringify(next));
      setProgress(next);
      setError(null);
    } catch {
      setError("Não foi possível salvar o progresso da jornada neste navegador.");
    }
  };

  return (
    <section className="space-y-4" aria-labelledby="journey-title">
      <div className="rounded-2xl border bg-white p-5" style={{ borderColor: "#E8E0D0" }}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 id="journey-title" className="text-lg" style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}>Jornada da paciente</h3>
            <p className="mt-1 text-xs" style={{ color: "#9B8B7A" }}>Checklist operacional compartilhado pela equipe · dados locais de demonstração</p>
          </div>
          <span className="text-lg font-semibold" style={{ color: "#5B2333" }}>{percentage}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ background: "#F0EAE0" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${percentage}%`, background: "linear-gradient(90deg, #5B2333, #C6A15B)" }} />
        </div>
        <p className="mt-2 text-xs" style={{ color: "#9B8B7A" }}>{completed} de {total} etapas concluídas</p>
      </div>

      {error && <p role="alert" className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">{error}</p>}

      <div className="space-y-3">
        {stages.map((stage, index) => {
          const done = stage.tasks.filter((_, taskIndex) => progress.checked[`${stage.id}-${taskIndex}`]).length;
          return (
            <details key={stage.id} className="group rounded-xl border bg-white" style={{ borderColor: "#E8E0D0" }}>
              <summary className="flex cursor-pointer list-none items-center gap-3 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white" style={{ background: "#5B2333" }}>{index + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold" style={{ color: "#1A1008" }}>{stage.title}</span>
                  <span className="block text-xs" style={{ color: "#9B8B7A" }}>{stage.owner} · {done}/{stage.tasks.length} concluídas</span>
                </span>
                <span aria-hidden="true" className="text-lg" style={{ color: "#9B8B7A" }}>⌄</span>
              </summary>
              <div className="space-y-1 border-t px-4 py-3" style={{ borderColor: "#F0EAE0" }}>
                {stage.tasks.map((task, taskIndex) => {
                  const key = `${stage.id}-${taskIndex}`;
                  return (
                    <label key={key} className="flex cursor-pointer items-start gap-3 rounded-lg p-2 text-sm hover:bg-[#FBF8F4]" style={{ color: "#1A1008" }}>
                      <input
                        type="checkbox"
                        checked={Boolean(progress.checked[key])}
                        onChange={(event) => update({ ...progress, checked: { ...progress.checked, [key]: event.target.checked } })}
                        className="mt-0.5 accent-[#5B2333]"
                      />
                      <span>{task}</span>
                    </label>
                  );
                })}
              </div>
            </details>
          );
        })}
      </div>

      <div className="rounded-2xl border bg-white p-5" style={{ borderColor: "#E8E0D0" }}>
        <h4 className="text-sm font-semibold" style={{ color: "#5B2333" }}>Próxima fase após o ciclo</h4>
        <p className="mt-1 text-xs" style={{ color: "#9B8B7A" }}>A decisão clínica deve ser discutida com a paciente.</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {followUpOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={progress.followUp === option.id}
              onClick={() => update({ ...progress, followUp: option.id })}
              className="rounded-xl border p-3 text-left transition-colors"
              style={{
                borderColor: progress.followUp === option.id ? "#5B2333" : "#E8E0D0",
                background: progress.followUp === option.id ? "#F8F0F1" : "#fff",
              }}
            >
              <span className="block text-xs font-semibold" style={{ color: "#5B2333" }}>{option.title}</span>
              <span className="mt-1 block text-xs" style={{ color: "#9B8B7A" }}>{option.cadence}</span>
            </button>
          ))}
        </div>
        {progress.followUp && (
          <div className="mt-4 border-t pt-3" style={{ borderColor: "#F0EAE0" }}>
            <p className="mb-2 text-xs font-semibold" style={{ color: "#5B2333" }}>Acompanhamento da fase selecionada</p>
            <div className="space-y-1">
              {followUpOptions.find((option) => option.id === progress.followUp)?.tasks.map((task, index) => {
                const key = `followUp-${progress.followUp}-${index}`;
                return (
                  <label key={key} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 text-sm" style={{ color: "#1A1008" }}>
                    <input
                      type="checkbox"
                      checked={Boolean(progress.checked[key])}
                      onChange={(event) => update({ ...progress, checked: { ...progress.checked, [key]: event.target.checked } })}
                      className="accent-[#5B2333]"
                    />
                    {task}
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
