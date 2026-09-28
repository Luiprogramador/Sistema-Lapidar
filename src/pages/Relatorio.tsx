import type { Patient } from "./PatientDetail";

// ── Mock data: Medicamentos, Suplementos, Timeline, Plano Atual ───────────────

type Medicamento = { nome: string; dose: string; frequencia: string; inicio: string };
type Suplemento   = { nome: string; dose: string; horario: string };
type TimelineItem = { data: string; evento: string; detalhe?: string };
type PlanoAtual   = { objetivo: string; dieta: string; exercicio: string; observacoes: string };

const medicamentosData: Record<number, Medicamento[]> = {
  1: [
    { nome: "Levotiroxina",         dose: "50 mcg",  frequencia: "1x ao dia – jejum",     inicio: "Jan/26" },
    { nome: "Rosuvastatina",        dose: "10 mg",   frequencia: "1x ao dia – noite",     inicio: "Mar/26" },
  ],
  2: [
    { nome: "Espironolactona",      dose: "100 mg",  frequencia: "1x ao dia",             inicio: "Fev/26" },
    { nome: "Metformina",           dose: "500 mg",  frequencia: "2x ao dia – refeições", inicio: "Mar/26" },
  ],
  3: [
    { nome: "Rosuvastatina",        dose: "20 mg",   frequencia: "1x ao dia – noite",     inicio: "Jan/26" },
    { nome: "Metformina",           dose: "850 mg",  frequencia: "2x ao dia – refeições", inicio: "Jan/26" },
    { nome: "Levotiroxina",         dose: "75 mcg",  frequencia: "1x ao dia – jejum",     inicio: "Abr/26" },
  ],
  4: [
    { nome: "Ácido fólico",         dose: "400 mcg", frequencia: "1x ao dia",             inicio: "Fev/26" },
    { nome: "Progesterona natural", dose: "200 mg",  frequencia: "1x ao dia – noite",     inicio: "Mai/26" },
  ],
  5: [
    { nome: "Levotiroxina",         dose: "25 mcg",  frequencia: "1x ao dia – jejum",     inicio: "Mar/26" },
  ],
  6: [
    { nome: "Rosuvastatina",        dose: "10 mg",   frequencia: "1x ao dia – noite",     inicio: "Jun/26" },
  ],
};

const suplementosData: Record<number, Suplemento[]> = {
  1: [
    { nome: "Vitamina D3 + K2",  dose: "10.000 UI",  horario: "Manhã com gordura" },
    { nome: "Ômega-3",           dose: "2 g",        horario: "Almoço" },
    { nome: "Magnésio Quelato",  dose: "300 mg",     horario: "Noite" },
    { nome: "Colágeno UC-II",    dose: "40 mg",      horario: "Jejum – manhã" },
  ],
  2: [
    { nome: "Vitamina D3",       dose: "5.000 UI",   horario: "Manhã com gordura" },
    { nome: "Inositol (Myo)",    dose: "2 g",        horario: "2x ao dia" },
    { nome: "N-Acetilcisteína",  dose: "600 mg",     horario: "Almoço" },
    { nome: "Vitamina B12",      dose: "1.000 mcg",  horario: "Manhã" },
  ],
  3: [
    { nome: "Vitamina D3 + K2",  dose: "7.000 UI",   horario: "Manhã com gordura" },
    { nome: "Ômega-3",           dose: "3 g",        horario: "Almoço" },
    { nome: "Magnésio Quelato",  dose: "400 mg",     horario: "Noite" },
    { nome: "Berberina",         dose: "500 mg",     horario: "Antes das refeições" },
  ],
  4: [
    { nome: "Vitamina D3",       dose: "5.000 UI",   horario: "Manhã com gordura" },
    { nome: "Ômega-3",           dose: "2 g",        horario: "Almoço" },
    { nome: "CoQ10",             dose: "200 mg",     horario: "Manhã" },
    { nome: "Zinco Quelato",     dose: "30 mg",      horario: "Noite" },
  ],
  5: [
    { nome: "Vitamina D3 + K2",  dose: "5.000 UI",   horario: "Manhã com gordura" },
    { nome: "Magnésio Quelato",  dose: "300 mg",     horario: "Noite" },
    { nome: "Vitamina B12",      dose: "500 mcg",    horario: "Manhã" },
  ],
  6: [
    { nome: "Vitamina D3",       dose: "7.000 UI",   horario: "Manhã com gordura" },
    { nome: "Ômega-3",           dose: "2 g",        horario: "Almoço" },
  ],
};

const timelineData: Record<number, TimelineItem[]> = {
  1: [
    { data: "Jan/26", evento: "Primeira consulta",         detalhe: "Queixa de fadiga e ganho de peso pós-40." },
    { data: "Fev/26", evento: "Exames de base",            detalhe: "LDL 155, TSH 3.1, Vitamina D 22." },
    { data: "Mar/26", evento: "Início do Protocolo 40+",   detalhe: "Rosuvastatina 10mg + ajuste alimentar." },
    { data: "Jun/26", evento: "Retorno trimestral",        detalhe: "Perda de 2 kg. LDL 148. D ajustada." },
    { data: "Set/26", evento: "Consulta atual",            detalhe: "Composição corporal melhorando. Score energético 8/10." },
  ],
  2: [
    { data: "Jan/26", evento: "Primeira consulta",         detalhe: "Irregularidade menstrual e acne." },
    { data: "Fev/26", evento: "Exames — SOP confirmada",   detalhe: "Androgênios elevados. Insulina 15." },
    { data: "Mar/26", evento: "Protocolo SOP iniciado",    detalhe: "Espironolactona + Metformina + Inositol." },
    { data: "Set/26", evento: "Consulta atual",            detalhe: "Ciclos regulares. Insulina 12. Score 7/10." },
  ],
  3: [
    { data: "Jan/26", evento: "Primeira consulta",         detalhe: "Obesidade grau II. Sem atividade física." },
    { data: "Jan/26", evento: "Exames de base",            detalhe: "LDL 170, Glicemia 112, HbA1c 5.8%." },
    { data: "Abr/26", evento: "Adição de Levotiroxina",    detalhe: "TSH 4.2 — hipotireoidismo subclínico." },
    { data: "Set/26", evento: "Consulta atual",            detalhe: "Perda de 2.4 kg. LDL 162. Adesão melhorando." },
  ],
  4: [
    { data: "Fev/26", evento: "Primeira consulta",         detalhe: "Planejamento para fertilização." },
    { data: "Fev/26", evento: "Exames hormonais",          detalhe: "FSH, LH e estradiol dentro do esperado." },
    { data: "Mai/26", evento: "Suplementação otimizada",   detalhe: "CoQ10 + progesterona natural adicionados." },
    { data: "Set/26", evento: "Consulta atual",            detalhe: "Composição corporal excelente. Score 9/10." },
  ],
  5: [
    { data: "Mar/26", evento: "Primeira consulta",         detalhe: "Manutenção de peso e saúde metabólica." },
    { data: "Mar/26", evento: "Exames de base",            detalhe: "Perfil lipídico limítrofe. Vit D 36." },
    { data: "Set/26", evento: "Consulta atual",            detalhe: "Perda de 2.3 kg. LDL normalizado. Score 8/10." },
  ],
  6: [
    { data: "Jun/26", evento: "Primeira consulta",         detalhe: "Sobrepeso. Inatividade. LDL 34 elevado." },
    { data: "Set/26", evento: "Retorno",                   detalhe: "Perda de 1.5 kg. Protocolo em andamento." },
  ],
};

const planoAtualData: Record<number, PlanoAtual> = {
  1: {
    objetivo:    "Reduzir gordura corporal para < 27% e normalizar LDL < 100 mg/dL até Dez/26.",
    dieta:       "Protocolo low-carb moderado: 100–120 g CHO/dia. Prioridade: proteínas (1,8 g/kg), gorduras boas, fibras ≥ 30 g/dia.",
    exercicio:   "Musculação 3x/semana + caminhada 30 min 4x/semana. Meta: 7.000 passos/dia.",
    observacoes: "Revisão de Rosuvastatina em Dez/26. Monitorar TSH a cada 3 meses. Incentivar check diário de hábitos.",
  },
  2: {
    objetivo:    "Regularizar ciclo menstrual e reduzir androgênios livres. Meta de peso: 72 kg.",
    dieta:       "Low-GI: eliminar açúcares refinados. Foco em fibras solúveis e proteínas magras. Fracionar em 4 refeições.",
    exercicio:   "Musculação 3x + Yoga/pilates 2x. Evitar exercício de alta intensidade em excesso (HIIT limitado a 1x/semana).",
    observacoes: "Reavaliar insulina em Dez/26. Manter Inositol por 12 meses. Revisão de Espironolactona em 6 meses.",
  },
  3: {
    objetivo:    "Perda de 10 kg em 6 meses. LDL < 130. HbA1c < 5,7%. Introduzir atividade física regular.",
    dieta:       "Protocolo hipocalórico estruturado: déficit de 500 kcal/dia. CHO ≤ 80 g/dia. Sem ultraprocessados.",
    exercicio:   "Iniciar caminhada 20 min/dia. Evolução gradual para musculação 2x/semana em 60 dias.",
    observacoes: "Monitorar glicemia mensalmente. Revisar Metformina conforme resposta glicêmica. Apoio psicológico recomendado.",
  },
  4: {
    objetivo:    "Otimizar saúde oocitária e preparo corporal para fertilização assistida.",
    dieta:       "Dieta mediterrânea: antioxidantes, ômega-3, polifenóis. Evitar álcool e ultraprocessados completamente.",
    exercicio:   "Pilates 3x + caminhadas leves 5x. Sem exercícios de alto impacto durante tratamento.",
    observacoes: "Parceria com equipe de reprodução humana. Reavaliação hormonal mensal. CoQ10 por no mínimo 90 dias.",
  },
  5: {
    objetivo:    "Manutenção do peso em 63–65 kg. LDL < 100. Melhorar disposição e qualidade do sono.",
    dieta:       "Alimentação intuitiva guiada: proteínas 1,6 g/kg, CHO estratégico peri-treino, carboidratos à noite.",
    exercicio:   "Musculação 4x/semana. Cardio de baixa intensidade 2x. Pedômetro: 8.000 passos/dia.",
    observacoes: "Revisão de Levotiroxina em Jan/27. Monitorar Vit D trimestralmente.",
  },
  6: {
    objetivo:    "Perda de 8 kg. LDL < 100. Iniciar rotina de exercícios.",
    dieta:       "Redução calórica moderada. Eliminar açúcares. Aumentar vegetais e proteínas.",
    exercicio:   "Caminhada 30 min 5x/semana. Avaliação para musculação em 60 dias.",
    observacoes: "Paciente em pausa do protocolo. Retorno agendado para Out/26.",
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function Row({ label, value }: { label: string; value?: string | number }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
      <span style={{ minWidth: 160, fontWeight: 600, color: "#5B2333", fontSize: 11 }}>{label}</span>
      <span style={{ color: "#1A1008", fontSize: 11 }}>{value ?? "—"}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        background: "linear-gradient(to right, #3E1623, #5B2333)",
        color: "#F4EFE7",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "5px 12px",
        borderRadius: 6,
        marginBottom: 10,
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function RelatorioImpressao({ patient, bioAtual, bioInicial }: {
  patient: Patient;
  bioAtual?: { peso: number; gordura: number; musculo: number; agua: number; imc: number };
  bioInicial?: { peso: number; gordura: number; musculo: number; agua: number; imc: number };
}) {
  const meds   = medicamentosData[patient.id] ?? [];
  const sups   = suplementosData[patient.id] ?? [];
  const timeline = timelineData[patient.id] ?? [];
  const plano  = planoAtualData[patient.id];

  const pesoAtual   = bioAtual?.peso   ?? patient.pesoInicial ?? 0;
  const pesoInicial = patient.pesoInicial ?? pesoAtual;
  const pesoMeta    = patient.pesoMeta ?? pesoAtual;
  const pct = pesoInicial !== pesoMeta
    ? Math.min(100, Math.max(0, ((pesoInicial - pesoAtual) / (pesoInicial - pesoMeta)) * 100))
    : 100;

  const hoje = new Date().toLocaleDateString("pt-BR");

  return (
    <div
      id="relatorio-lapidar"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 11,
        color: "#1A1008",
        background: "#fff",
        padding: "28px 32px",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, paddingBottom: 16, borderBottom: "2px solid #5B2333" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#5B2333", display: "flex", alignItems: "center", justifyContent: "center", color: "#F4EFE7", fontWeight: 700, fontSize: 14 }}>
              L
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: "#3E1623" }}>Lapidar</div>
              <div style={{ fontSize: 9, color: "#C6A15B", letterSpacing: "0.1em", textTransform: "uppercase" }}>Saúde Feminina</div>
            </div>
          </div>
          <div style={{ fontSize: 9, color: "#9B8B7A" }}>Dra. Andressa Gomide · Médica Especialista em Saúde da Mulher</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 14, color: "#3E1623", fontWeight: 600 }}>Resumo Clínico</div>
          <div style={{ fontSize: 9, color: "#9B8B7A", marginTop: 2 }}>Gerado em {hoje}</div>
        </div>
      </div>

      {/* Identificação */}
      <Section title="Identificação da Paciente">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
          <Row label="Nome"              value={patient.nome} />
          <Row label="Protocolo"         value={patient.protocolo} />
          <Row label="Idade"             value={`${patient.idade} anos`} />
          <Row label="Telefone"          value={patient.telefone} />
          <Row label="Status"            value={patient.ativa ? "Ativa" : "Inativa"} />
          <Row label="Consulta atual"    value={patient.ultimaConsulta} />
          <Row label="Próxima consulta"  value={patient.proximaConsulta} />
          <Row label="Objetivo"          value={patient.objetivo} />
        </div>
      </Section>

      {/* Peso e composição */}
      <Section title="Peso e Composição Corporal">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0 16px", marginBottom: 10 }}>
          {[
            { label: "Peso inicial", value: `${pesoInicial} kg` },
            { label: "Peso atual",   value: `${pesoAtual} kg` },
            { label: "Meta",         value: `${pesoMeta} kg` },
            { label: "Δ Peso",       value: `${(pesoAtual - pesoInicial).toFixed(1)} kg` },
            { label: "% Atingido",   value: `${Math.round(pct)}%` },
          ].map((k) => (
            <div key={k.label} style={{ background: "#F8F4EF", borderRadius: 8, padding: "8px 10px", border: "1px solid #E8E0D0" }}>
              <div style={{ fontSize: 8, color: "#9B8B7A", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>{k.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#5B2333" }}>{k.value}</div>
            </div>
          ))}
        </div>
        {bioAtual && bioInicial && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0 12px" }}>
            {[
              { label: "Gordura",  ini: bioInicial.gordura, atu: bioAtual.gordura, unit: "%" },
              { label: "Músculo",  ini: bioInicial.musculo, atu: bioAtual.musculo, unit: "kg" },
              { label: "Água",     ini: bioInicial.agua,    atu: bioAtual.agua,    unit: "%" },
              { label: "IMC",      ini: bioInicial.imc,     atu: bioAtual.imc,     unit: "" },
            ].map((m) => {
              const delta = +(m.atu - m.ini).toFixed(1);
              const color = delta < 0 ? "#66724A" : delta > 0 ? "#DC2626" : "#9B8B7A";
              return (
                <div key={m.label} style={{ background: "#F8F4EF", borderRadius: 8, padding: "8px 10px", border: "1px solid #E8E0D0" }}>
                  <div style={{ fontSize: 8, color: "#9B8B7A", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1008" }}>{m.atu}{m.unit}</div>
                  <div style={{ fontSize: 9, color, marginTop: 1 }}>{delta > 0 ? "+" : ""}{delta}{m.unit} vs início</div>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {/* Exames */}
      <Section title="Exames Laboratoriais">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
          <thead>
            <tr style={{ background: "#F8F4EF" }}>
              {["Exame", "Atual", "Anterior", "Δ", "Meta", "Status"].map((h) => (
                <th key={h} style={{ padding: "5px 8px", textAlign: "left", fontWeight: 600, color: "#5B2333", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E8E0D0" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patient.id in medicamentosData && [
              ["LDL", "Cardiovascular"], ["HDL", "Cardiovascular"], ["Triglicerídeos", "Cardiovascular"],
              ["HbA1c", "Metabólico"], ["Glicemia", "Metabólico"], ["Insulina", "Metabólico"],
              ["Vitamina D", "Micronutrientes"], ["Vitamina B12", "Micronutrientes"], ["Ferritina", "Micronutrientes"],
              ["TSH", "Tireóide"], ["T4 Livre", "Tireóide"],
              ["Estradiol", "Hormonal"], ["Testosterona", "Hormonal"],
            ].map(([nome]) => {
              // simple mock row placeholder – real data wired in patient data
              return (
                <tr key={nome} style={{ borderBottom: "1px solid #F8F4EF" }}>
                  <td style={{ padding: "4px 8px", fontWeight: 600, color: "#3E1623" }}>{nome}</td>
                  <td style={{ padding: "4px 8px", color: "#1A1008" }}>—</td>
                  <td style={{ padding: "4px 8px", color: "#9B8B7A" }}>—</td>
                  <td style={{ padding: "4px 8px", color: "#9B8B7A" }}>—</td>
                  <td style={{ padding: "4px 8px", color: "#9B8B7A" }}>—</td>
                  <td style={{ padding: "4px 8px" }}>
                    <span style={{ background: "#F0EAE0", color: "#9B8B7A", borderRadius: 4, padding: "1px 6px", fontSize: 9 }}>—</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>

      {/* Medicamentos + Suplementos */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <Section title="Medicamentos">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
            <thead>
              <tr>
                {["Medicamento", "Dose", "Frequência", "Desde"].map((h) => (
                  <th key={h} style={{ padding: "4px 6px", textAlign: "left", fontWeight: 600, color: "#9B8B7A", fontSize: 9, borderBottom: "1px solid #E8E0D0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {meds.length === 0
                ? <tr><td colSpan={4} style={{ padding: "6px", color: "#9B8B7A", fontSize: 10 }}>Nenhum medicamento.</td></tr>
                : meds.map((m, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #F8F4EF" }}>
                    <td style={{ padding: "4px 6px", fontWeight: 600, color: "#3E1623" }}>{m.nome}</td>
                    <td style={{ padding: "4px 6px", color: "#1A1008" }}>{m.dose}</td>
                    <td style={{ padding: "4px 6px", color: "#9B8B7A" }}>{m.frequencia}</td>
                    <td style={{ padding: "4px 6px", color: "#9B8B7A" }}>{m.inicio}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </Section>

        <Section title="Suplementos">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
            <thead>
              <tr>
                {["Suplemento", "Dose", "Horário"].map((h) => (
                  <th key={h} style={{ padding: "4px 6px", textAlign: "left", fontWeight: 600, color: "#9B8B7A", fontSize: 9, borderBottom: "1px solid #E8E0D0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sups.length === 0
                ? <tr><td colSpan={3} style={{ padding: "6px", color: "#9B8B7A", fontSize: 10 }}>Nenhum suplemento.</td></tr>
                : sups.map((s, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #F8F4EF" }}>
                    <td style={{ padding: "4px 6px", fontWeight: 600, color: "#3E1623" }}>{s.nome}</td>
                    <td style={{ padding: "4px 6px", color: "#1A1008" }}>{s.dose}</td>
                    <td style={{ padding: "4px 6px", color: "#9B8B7A" }}>{s.horario}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </Section>
      </div>

      {/* Timeline */}
      <Section title="Timeline Resumida">
        <div style={{ position: "relative", paddingLeft: 20 }}>
          <div style={{ position: "absolute", left: 6, top: 4, bottom: 4, width: 2, background: "#E8E0D0", borderRadius: 2 }} />
          {timeline.map((t, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 10, paddingLeft: 16 }}>
              <div style={{ position: "absolute", left: -8, top: 3, width: 8, height: 8, borderRadius: "50%", background: "#C6A15B", border: "2px solid #fff" }} />
              <span style={{ fontWeight: 700, color: "#5B2333", fontSize: 10, marginRight: 8 }}>{t.data}</span>
              <span style={{ fontWeight: 600, color: "#1A1008", fontSize: 10 }}>{t.evento}</span>
              {t.detalhe && <div style={{ color: "#9B8B7A", fontSize: 9, marginTop: 2 }}>{t.detalhe}</div>}
            </div>
          ))}
        </div>
      </Section>

      {/* Plano Atual */}
      {plano && (
        <Section title="Plano Atual">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
            {[
              { label: "Objetivo clínico", value: plano.objetivo },
              { label: "Exercício",         value: plano.exercicio },
              { label: "Dieta",             value: plano.dieta },
              { label: "Observações",        value: plano.observacoes },
            ].map((f) => (
              <div key={f.label}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#5B2333", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>{f.label}</div>
                <div style={{ fontSize: 10, color: "#1A1008", lineHeight: 1.5 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Footer */}
      <div style={{ borderTop: "1px solid #E8E0D0", paddingTop: 10, marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 8, color: "#C0B09A" }}>
          Documento gerado pelo sistema Lapidar · Confidencial · Uso exclusivo da Dra. Andressa Gomide
        </div>
        <div style={{ fontSize: 8, color: "#C6A15B" }}>lapidar.com.br</div>
      </div>
    </div>
  );
}

// ── Botão e modal de impressão ────────────────────────────────────────────────

export function BotaoImprimirResumo({ patient, bioAtual, bioInicial }: {
  patient: Patient;
  bioAtual?: { peso: number; gordura: number; musculo: number; agua: number; imc: number };
  bioInicial?: { peso: number; gordura: number; musculo: number; agua: number; imc: number };
}) {
  const handlePrint = () => {
    const printWin = window.open("", "_blank", "width=900,height=700");
    if (!printWin) return;

    const container = document.getElementById("relatorio-lapidar-hidden");
    if (!container) return;

    printWin.document.write(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8"/>
        <title>Resumo Clínico – ${patient.nome}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet"/>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #fff; }
          @media print {
            @page { margin: 16mm 14mm; size: A4; }
          }
        </style>
      </head>
      <body>
        ${container.innerHTML}
        <script>
          window.onload = function() { window.print(); };
        <\/script>
      </body>
      </html>
    `);
    printWin.document.close();
  };

  return (
    <>
      {/* Hidden render of the report for innerHTML extraction */}
      <div id="relatorio-lapidar-hidden" style={{ display: "none" }}>
        <RelatorioImpressao patient={patient} bioAtual={bioAtual} bioInicial={bioInicial} />
      </div>

      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
        style={{ background: "#5B2333", color: "#F4EFE7" }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        Imprimir Resumo
      </button>
    </>
  );
}
