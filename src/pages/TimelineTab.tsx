import { useState } from "react";

export type Evolucao = {
  id: number;
  data: string;
  tipo: "Consulta" | "WhatsApp" | "Ligação" | "Mensagem";
  peso?: number;
  bioimpedancia?: string;
  saciedade?: number;
  sono?: number;
  atividadeFisica?: number;
  fogachos?: number;
  perdaUrinaria?: number;
  libido?: number;
  constipacao?: number;
  comentariosPaciente?: string;
  condutas?: string;
  mudancaMedicamentos?: string;
  mudancaSuplementos?: string;
  examesSolicitados?: string;
  planoProximoContato?: string;
};

const initialEvolucoes: Record<number, Evolucao[]> = {
  1: [
    {
      id: 1, data: "01/03/2026", tipo: "Consulta",
      peso: 72.4, saciedade: 5, sono: 5, atividadeFisica: 3, fogachos: 6, perdaUrinaria: 3, libido: 4, constipacao: 4,
      comentariosPaciente: "Sinto muito cansaço à tarde. Difícil seguir a dieta.",
      condutas: "Iniciou protocolo Lapidar 40+. Dieta low-carb. Suplementação vitamina D.",
      examesSolicitados: "LDL, HDL, TG, TSH, T4L, HbA1c, insulina, vitamina D.",
      planoProximoContato: "Retorno em 3 meses com exames. Checkin mensal pelo WhatsApp.",
    },
    {
      id: 2, data: "10/06/2026", tipo: "Consulta",
      peso: 70.2, saciedade: 7, sono: 7, atividadeFisica: 5, fogachos: 4, perdaUrinaria: 2, libido: 5, constipacao: 2,
      comentariosPaciente: "Energia bem melhor! Fogachos ainda incomodam mas reduziram.",
      condutas: "Manteve protocolo. Ajustou vitamina D para 10.000UI. Adicionou magnésio.",
      mudancaSuplementos: "Vitamina D aumentada: 5.000 → 10.000 UI. Magnésio 300mg adicionado.",
      examesSolicitados: "LDL, HDL, vitamina D, TSH.",
      planoProximoContato: "Retorno Set/26. Continuar musculação 3x/sem.",
    },
    {
      id: 3, data: "02/09/2026", tipo: "Consulta",
      peso: 68.1, saciedade: 8, sono: 8, atividadeFisica: 7, fogachos: 2, perdaUrinaria: 1, libido: 7, constipacao: 1,
      comentariosPaciente: "Me sinto outra pessoa! Perdendo peso e dormindo muito melhor.",
      condutas: "Excelente evolução. Manteve medicamentos. Revisar LDL em Dez/26.",
      planoProximoContato: "Retorno Dez/26. Meta: LDL < 100 mg/dL.",
    },
  ],
  2: [
    {
      id: 1, data: "15/01/2026", tipo: "Consulta",
      peso: 80.2, saciedade: 4, sono: 4, atividadeFisica: 3, fogachos: 2, perdaUrinaria: 2, libido: 3, constipacao: 6,
      comentariosPaciente: "Ciclos irregulares há 6 meses. Acne e queda de cabelo.",
      condutas: "Solicitei painel hormonal completo. Início de Espironolactona 100mg.",
      examesSolicitados: "Testosterona, SHBG, DHEA-S, insulina, LH/FSH.",
      planoProximoContato: "Retorno em 45 dias com exames.",
    },
    {
      id: 2, data: "10/09/2026", tipo: "Consulta",
      peso: 75.8, saciedade: 7, sono: 7, atividadeFisica: 5, fogachos: 1, perdaUrinaria: 1, libido: 6, constipacao: 2,
      comentariosPaciente: "Ciclo voltou a ser regular! Acne melhorou muito.",
      condutas: "Manteve protocolo SOP. Excelente adesão.",
      planoProximoContato: "Retorno Out/26.",
    },
  ],
  3: [
    {
      id: 1, data: "10/01/2026", tipo: "Consulta",
      peso: 88.0, saciedade: 3, sono: 3, atividadeFisica: 0, fogachos: 8, perdaUrinaria: 6, libido: 2, constipacao: 7,
      comentariosPaciente: "Nunca consigo emagrecer. Já tentei de tudo. Muito desanimada.",
      condutas: "Iniciou Rosuvastatina 20mg + Metformina 850mg. Dieta hipocalórica estruturada.",
      examesSolicitados: "LDL, HDL, TG, glicemia, HbA1c, insulina, TSH, vitamina D.",
      planoProximoContato: "Retorno em 3 meses. Caminhada 20min/dia como início.",
    },
    {
      id: 2, data: "05/09/2026", tipo: "Consulta",
      peso: 85.6, saciedade: 6, sono: 6, atividadeFisica: 3, fogachos: 4, perdaUrinaria: 3, libido: 5, constipacao: 3,
      comentariosPaciente: "Perdi 2,4 kg. Começando a caminhar. Fogachos ainda intensos.",
      condutas: "Adicionou Levotiroxina 75mcg (TSH 4.2). Ajustou dieta para low-carb.",
      mudancaMedicamentos: "Levotiroxina 75mcg adicionada — TSH 4.2 mUI/L.",
      planoProximoContato: "Retorno Dez/26. Meta -3 kg. Iniciar musculação.",
    },
  ],
  4: [
    {
      id: 1, data: "05/02/2026", tipo: "Consulta",
      peso: 62.0, saciedade: 7, sono: 7, atividadeFisica: 6, fogachos: 1, perdaUrinaria: 1, libido: 7, constipacao: 2,
      comentariosPaciente: "Planejando engravidar. Quero otimizar minha saúde antes.",
      condutas: "Iniciou protocolo fertilidade. Ácido fólico + vitamina D + ômega-3 + CoQ10.",
      examesSolicitados: "AMH, FSH, LH, estradiol D3, progesterona D21.",
      planoProximoContato: "Retorno mensal durante tratamento.",
    },
    {
      id: 2, data: "08/09/2026", tipo: "Consulta",
      peso: 59.8, saciedade: 9, sono: 9, atividadeFisica: 8, fogachos: 0, perdaUrinaria: 0, libido: 9, constipacao: 1,
      comentariosPaciente: "Me sinto ótima! Saúde nunca esteve tão boa.",
      condutas: "Excelente resposta. Adicionou progesterona natural 200mg fase lútea.",
      mudancaSuplementos: "Zinco Quelato 30mg adicionado.",
      mudancaMedicamentos: "Progesterona natural 200mg vaginal, noite — fase lútea.",
      planoProximoContato: "Continuidade do protocolo. Aguardando janela de transferência.",
    },
  ],
  5: [
    {
      id: 1, data: "01/03/2026", tipo: "Consulta",
      peso: 68.0, saciedade: 6, sono: 6, atividadeFisica: 4, fogachos: 2, perdaUrinaria: 2, libido: 6, constipacao: 3,
      comentariosPaciente: "Quero manter o peso e ter mais energia no dia a dia.",
      condutas: "Protocolo Pocket. Foco em estilo de vida. Levotiroxina 25mcg (TSH 2.8).",
      examesSolicitados: "LDL, HDL, TSH, vitamina D.",
      planoProximoContato: "Retorno em 6 meses.",
    },
    {
      id: 2, data: "12/09/2026", tipo: "Consulta",
      peso: 65.7, saciedade: 8, sono: 8, atividadeFisica: 7, fogachos: 1, perdaUrinaria: 1, libido: 7, constipacao: 1,
      comentariosPaciente: "Excelente! Muito disposta, perdendo gordura sem esforço extremo.",
      condutas: "Manteve protocolo. LDL normalizado. Vitamina D 42 ng/mL.",
      planoProximoContato: "Retorno Jan/27. Revisão de Levotiroxina.",
    },
  ],
  6: [
    {
      id: 1, data: "15/06/2026", tipo: "Consulta",
      peso: 75.0, saciedade: 5, sono: 5, atividadeFisica: 2, fogachos: 5, perdaUrinaria: 4, libido: 4, constipacao: 5,
      comentariosPaciente: "Difícil manter rotina. Trabalho muito. Sedentária.",
      condutas: "Iniciou protocolo 40+. Rosuvastatina 10mg. Dieta simplificada.",
      examesSolicitados: "Painel lipídico, glicemia, TSH.",
      planoProximoContato: "Retorno Out/26. Paciente em pausa no momento.",
    },
  ],
};

const tipoConfig = {
  Consulta:  { cor: "#5B2333", bg: "#F8E8EC", icone: "🏥" },
  WhatsApp:  { cor: "#3D6B2E", bg: "#E8F0E0", icone: "💬" },
  Ligação:   { cor: "#92610A", bg: "#FEF3C7", icone: "📞" },
  Mensagem:  { cor: "#1D4ED8", bg: "#DBEAFE", icone: "✉️" },
};

const scoreFields: { key: keyof Evolucao; label: string }[] = [
  { key: "saciedade",      label: "Saciedade" },
  { key: "sono",           label: "Sono" },
  { key: "atividadeFisica",label: "Atividade física" },
  { key: "fogachos",       label: "Fogachos" },
  { key: "perdaUrinaria",  label: "Perda urinária" },
  { key: "libido",         label: "Libido" },
  { key: "constipacao",    label: "Constipação" },
];

function NovaEvolucaoModal({ onSave, onClose }: { onSave: (e: Evolucao) => void; onClose: () => void }) {
  const today = new Date().toLocaleDateString("pt-BR");
  const [form, setForm] = useState<Omit<Evolucao, "id">>({
    data: today,
    tipo: "Consulta",
  });

  const set = <K extends keyof Evolucao>(k: K, v: Evolucao[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const handleSave = () => {
    onSave({ ...form, id: Date.now() });
    onClose();
  };

  const inputStyle: React.CSSProperties = {
    background: "#fff", border: "1.5px solid #E8E0D0", color: "#1A1008",
    borderRadius: 10, padding: "8px 12px", fontSize: 13, width: "100%", outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 11, fontWeight: 600, color: "#9B8B7A",
    textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5,
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto"
        style={{ background: "#F4EFE7", borderRadius: "20px 20px 0 0", padding: "20px 20px 32px" }}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full mx-auto mb-4 sm:hidden" style={{ background: "#D0C8BE" }} />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-serif)", color: "#3E1623" }}>
              Nova Evolução
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "#9B8B7A" }}>Registro de demonstração local</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-70" style={{ background: "#E8E0D0", color: "#5B2333" }}>
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Tipo + Data */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>Tipo</label>
              <select
                value={form.tipo}
                onChange={(e) => set("tipo", e.target.value as Evolucao["tipo"])}
                style={inputStyle}
              >
                {(["Consulta", "WhatsApp", "Ligação", "Mensagem"] as const).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Data</label>
              <input
                value={form.data}
                onChange={(e) => set("data", e.target.value)}
                style={inputStyle}
                placeholder="DD/MM/AAAA"
              />
            </div>
          </div>

          {/* Peso + Bioimpedância */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>Peso (kg)</label>
              <input
                type="number" step="0.1"
                value={form.peso ?? ""}
                onChange={(e) => set("peso", e.target.value ? parseFloat(e.target.value) : undefined)}
                style={inputStyle}
                placeholder="Ex: 68.5"
              />
            </div>
            <div>
              <label style={labelStyle}>Bioimpedância</label>
              <input
                value={form.bioimpedancia ?? ""}
                onChange={(e) => set("bioimpedancia", e.target.value || undefined)}
                style={inputStyle}
                placeholder="Ex: Gordura 28%, Músculo 45%"
              />
            </div>
          </div>

          {/* Score 0-10 */}
          <div>
            <label style={{ ...labelStyle, marginBottom: 8 }}>Scores da Paciente (0–10)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {scoreFields.map(({ key, label }) => (
                <div key={String(key)} className="rounded-xl p-3" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#9B8B7A", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {label}
                  </label>
                  <input
                    type="number" min={0} max={10}
                    value={((form as Record<string, unknown>)[key as string] as number | undefined) ?? ""}
                    onChange={(e) => set(key, e.target.value ? parseInt(e.target.value) : undefined)}
                    className="w-full text-center rounded-lg py-1.5 text-base font-bold outline-none"
                    style={{ background: "#F8F4EF", border: "1.5px solid #E8E0D0", color: "#5B2333" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Textos clínicos */}
          {([
            { key: "comentariosPaciente", label: "Comentários da Paciente" },
            { key: "condutas",            label: "Condutas" },
            { key: "mudancaMedicamentos", label: "Mudança de Medicamentos" },
            { key: "mudancaSuplementos",  label: "Mudança de Suplementos" },
            { key: "examesSolicitados",   label: "Exames Solicitados" },
            { key: "planoProximoContato", label: "Plano até Próximo Contato" },
          ] as { key: keyof Evolucao; label: string }[]).map(({ key, label }) => (
            <div key={String(key)}>
              <label style={labelStyle}>{label}</label>
              <textarea
                rows={2}
                value={((form as Record<string, unknown>)[key as string] as string | undefined) ?? ""}
                onChange={(e) => set(key, e.target.value || undefined)}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                placeholder="—"
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: "#5B2333" }}
          >
            Salvar Evolução
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: "#E8E0D0", color: "#9B8B7A" }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TimelineTab({ patientId }: { patientId: number }) {
  const demoEvolucoes = [...(initialEvolucoes[patientId] ?? [])].sort((a, b) => b.id - a.id);
  const [loadedState] = useState(() => {
    try {
      const saved = window.localStorage.getItem(`lapidar-demo-timeline-${patientId}`);
      if (!saved) return { evolucoes: demoEvolucoes, error: null as string | null };
      const parsed: unknown = JSON.parse(saved);
      if (!Array.isArray(parsed) || !parsed.every((event) => event && typeof event.id === "number" && typeof event.data === "string" && typeof event.tipo === "string")) {
        return { evolucoes: demoEvolucoes, error: "Os registros locais da timeline estão inválidos. Um novo registro poderá substituir os dados da demonstração." };
      }
      return { evolucoes: parsed as Evolucao[], error: null as string | null };
    } catch {
      return { evolucoes: demoEvolucoes, error: "Não foi possível carregar a timeline local deste navegador." };
    }
  });
  const [evolucoes, setEvolucoes] = useState<Evolucao[]>(loadedState.evolucoes);
  const [storageError, setStorageError] = useState<string | null>(loadedState.error);
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleSave = (e: Evolucao) => {
    const next = [e, ...evolucoes];
    try {
      window.localStorage.setItem(`lapidar-demo-timeline-${patientId}`, JSON.stringify(next));
      setEvolucoes(next);
      setExpanded(e.id);
      setStorageError(null);
    } catch {
      setStorageError("Não foi possível salvar esta evolução localmente.");
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-normal" style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}>Timeline Clínica</h3>
          <p className="text-xs mt-0.5" style={{ color: "#9B8B7A" }}>{evolucoes.length} evolução{evolucoes.length !== 1 ? "ões" : ""} registrada{evolucoes.length !== 1 ? "s" : ""} · mais recente primeiro</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: "#5B2333" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nova Evolução
        </button>
      </div>

      <p className="text-xs" style={{ color: "#9B8B7A" }}>Timeline de demonstração. Registros ficam neste navegador e não são enviados a um prontuário.</p>
      {storageError && <p role="alert" className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">{storageError}</p>}

      {evolucoes.length === 0 && (
        <div className="rounded-2xl p-12 text-center" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
          <p className="text-sm" style={{ color: "#9B8B7A" }}>Nenhuma evolução registrada. Clique em "Nova Evolução" para começar.</p>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[22px] top-0 bottom-0 w-0.5" style={{ background: "#E8E0D0" }} />
        <div className="space-y-4">
          {evolucoes.map((ev) => {
            const tc = tipoConfig[ev.tipo];
            const isOpen = expanded === ev.id;
            const scores = scoreFields.filter(({ key }) => ev[key] !== undefined);
            return (
              <div key={ev.id} className="relative pl-12">
                {/* Dot */}
                <div
                  className="absolute left-3 top-4 w-5 h-5 rounded-full flex items-center justify-center text-xs z-10"
                  style={{ background: tc.cor, border: "3px solid #F4EFE7" }}
                />

                <div
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all"
                  style={{ background: "#fff", border: `1px solid ${isOpen ? tc.cor + "44" : "#E8E0D0"}` }}
                  onClick={() => setExpanded(isOpen ? null : ev.id)}
                >
                  {/* Card header */}
                  <div className="px-5 py-4 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="text-base">{tc.icone}</span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: tc.bg, color: tc.cor }}>
                            {ev.tipo}
                          </span>
                          <span className="text-xs font-semibold" style={{ color: "#C6A15B" }}>{ev.data}</span>
                          {ev.peso && (
                            <span className="text-xs" style={{ color: "#9B8B7A" }}>Peso: <strong style={{ color: "#5B2333" }}>{ev.peso} kg</strong></span>
                          )}
                        </div>
                        {ev.comentariosPaciente && (
                          <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "#9B8B7A" }}>
                            "{ev.comentariosPaciente.substring(0, isOpen ? 9999 : 80)}{!isOpen && ev.comentariosPaciente.length > 80 ? "…" : ""}"
                          </p>
                        )}
                      </div>
                    </div>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9B8B7A" strokeWidth="2"
                      strokeLinecap="round" className="shrink-0 mt-1 transition-transform"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="border-t px-5 pb-5 space-y-4" style={{ borderColor: "#F0EAE0" }}>
                      {/* Scores */}
                      {scores.length > 0 && (
                        <div className="pt-4">
                          <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "#9B8B7A", fontSize: "0.65rem" }}>Scores</p>
                          <div className="flex flex-wrap gap-2">
                            {scores.map(({ key, label }) => {
                              const v = ev[key] as number;
                              const col = v >= 7 ? "#3D6B2E" : v >= 4 ? "#92610A" : "#DC2626";
                              return (
                                <div key={String(key)} className="rounded-lg px-3 py-1.5 text-center" style={{ background: "#F8F4EF", minWidth: 72 }}>
                                  <div className="text-xs" style={{ color: "#9B8B7A", fontSize: "0.62rem" }}>{label}</div>
                                  <div className="text-base font-bold" style={{ color: col }}>{v}/10</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Campos textuais */}
                      {([
                        { key: "condutas",            label: "Condutas" },
                        { key: "mudancaMedicamentos",  label: "Mudança de Medicamentos" },
                        { key: "mudancaSuplementos",   label: "Mudança de Suplementos" },
                        { key: "examesSolicitados",    label: "Exames Solicitados" },
                        { key: "bioimpedancia",        label: "Bioimpedância" },
                        { key: "planoProximoContato",  label: "Plano até Próximo Contato" },
                      ] as { key: keyof Evolucao; label: string }[]).filter(({ key }) => ev[key]).map(({ key, label }) => (
                        <div key={String(key)}>
                          <p className="text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: "#9B8B7A", fontSize: "0.65rem" }}>{label}</p>
                          <p className="text-xs leading-relaxed" style={{ color: "#1A1008" }}>{String(ev[key])}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <NovaEvolucaoModal
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
