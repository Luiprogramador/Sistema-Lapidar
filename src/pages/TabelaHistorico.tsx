import { useState } from "react";

export type RegistroTabela = {
  id: number;
  data: string;
  nome: string;
  dose: string;
  motivo: string;
  observacao: string;
};

const initialMeds: Record<number, RegistroTabela[]> = {
  1: [
    { id: 1, data: "Jan/26", nome: "Levotiroxina",  dose: "50 mcg",  motivo: "Hipotireoidismo subclínico",     observacao: "Tomar em jejum, 30 min antes do café" },
    { id: 2, data: "Mar/26", nome: "Rosuvastatina", dose: "10 mg",   motivo: "LDL acima da meta (155 mg/dL)", observacao: "Tomar à noite. Revisar em 3 meses" },
  ],
  2: [
    { id: 1, data: "Fev/26", nome: "Espironolactona", dose: "100 mg", motivo: "SOP — hiperandrogenismo",       observacao: "Monitorar potássio" },
    { id: 2, data: "Mar/26", nome: "Metformina",       dose: "500 mg", motivo: "Resistência insulínica",       observacao: "2x ao dia com refeições" },
  ],
  3: [
    { id: 1, data: "Jan/26", nome: "Rosuvastatina", dose: "20 mg",   motivo: "LDL 170 mg/dL",               observacao: "Tomar à noite" },
    { id: 2, data: "Jan/26", nome: "Metformina",    dose: "850 mg",  motivo: "Pré-diabetes (HbA1c 5,8%)",   observacao: "2x ao dia com refeições" },
    { id: 3, data: "Abr/26", nome: "Levotiroxina",  dose: "75 mcg",  motivo: "TSH 4.2 — hipotireoidismo",   observacao: "Jejum. Verificar TSH em 6 semanas" },
  ],
  4: [
    { id: 1, data: "Fev/26", nome: "Ácido fólico",         dose: "400 mcg", motivo: "Preparo para gestação",       observacao: "" },
    { id: 2, data: "Mai/26", nome: "Progesterona natural", dose: "200 mg",  motivo: "Suporte fase lútea",          observacao: "Vaginal ou oral — noite" },
  ],
  5: [
    { id: 1, data: "Mar/26", nome: "Levotiroxina", dose: "25 mcg", motivo: "TSH limítrofe 2,8", observacao: "Reavaliação em 3 meses" },
  ],
  6: [
    { id: 1, data: "Jun/26", nome: "Rosuvastatina", dose: "10 mg", motivo: "LDL 148 mg/dL", observacao: "Iniciar e reavaliar em 3 meses" },
  ],
};

const initialSups: Record<number, RegistroTabela[]> = {
  1: [
    { id: 1, data: "Jan/26", nome: "Vitamina D3 + K2", dose: "10.000 UI", motivo: "Vitamina D 22 ng/mL",       observacao: "Com refeição gordurosa" },
    { id: 2, data: "Jan/26", nome: "Ômega-3",           dose: "2 g",       motivo: "Suporte cardiovascular",    observacao: "Almoço" },
    { id: 3, data: "Jan/26", nome: "Magnésio Quelato",  dose: "300 mg",    motivo: "Qualidade do sono",          observacao: "Noite" },
    { id: 4, data: "Mar/26", nome: "Colágeno UC-II",    dose: "40 mg",     motivo: "Saúde articular",           observacao: "Jejum, manhã" },
  ],
  2: [
    { id: 1, data: "Jan/26", nome: "Vitamina D3",      dose: "5.000 UI",  motivo: "D 22 ng/mL",               observacao: "Com gordura" },
    { id: 2, data: "Fev/26", nome: "Inositol (Myo)",   dose: "2 g",       motivo: "SOP — sensibilidade insulínica", observacao: "2x ao dia" },
    { id: 3, data: "Fev/26", nome: "N-Acetilcisteína", dose: "600 mg",    motivo: "Anti-inflamatório / SOP",   observacao: "Almoço" },
    { id: 4, data: "Mar/26", nome: "Vitamina B12",      dose: "1.000 mcg", motivo: "B12 350 pg/mL",            observacao: "Sublingual, manhã" },
  ],
  3: [
    { id: 1, data: "Jan/26", nome: "Vitamina D3 + K2", dose: "7.000 UI", motivo: "D 15 ng/mL",               observacao: "Com gordura" },
    { id: 2, data: "Jan/26", nome: "Ômega-3",           dose: "3 g",      motivo: "TG elevado e LDL alto",     observacao: "Almoço" },
    { id: 3, data: "Jan/26", nome: "Magnésio Quelato",  dose: "400 mg",   motivo: "Sono ruim / constipação",   observacao: "Noite" },
    { id: 4, data: "Mar/26", nome: "Berberina",          dose: "500 mg",   motivo: "Resistência insulínica",   observacao: "Antes das refeições principais" },
  ],
  4: [
    { id: 1, data: "Fev/26", nome: "Vitamina D3", dose: "5.000 UI", motivo: "Preparo gestacional",    observacao: "Manhã com gordura" },
    { id: 2, data: "Fev/26", nome: "Ômega-3",     dose: "2 g",      motivo: "Saúde fetal / hormonal", observacao: "Almoço" },
    { id: 3, data: "Fev/26", nome: "CoQ10",        dose: "200 mg",   motivo: "Qualidade oocitária",    observacao: "Manhã" },
    { id: 4, data: "Mai/26", nome: "Zinco Quelato",dose: "30 mg",    motivo: "Suporte hormonal",       observacao: "Noite" },
  ],
  5: [
    { id: 1, data: "Mar/26", nome: "Vitamina D3 + K2", dose: "5.000 UI",  motivo: "D 36 ng/mL",      observacao: "Manhã" },
    { id: 2, data: "Mar/26", nome: "Magnésio Quelato",  dose: "300 mg",    motivo: "Sono e estresse",  observacao: "Noite" },
    { id: 3, data: "Mar/26", nome: "Vitamina B12",      dose: "500 mcg",   motivo: "Manutenção",       observacao: "Manhã" },
  ],
  6: [
    { id: 1, data: "Jun/26", nome: "Vitamina D3", dose: "7.000 UI", motivo: "D 18 ng/mL",          observacao: "Manhã com gordura" },
    { id: 2, data: "Jun/26", nome: "Ômega-3",     dose: "2 g",      motivo: "Suporte cardiovascular", observacao: "Almoço" },
  ],
};

function TabelaEditavel({
  titulo,
  registros,
  onAdd,
}: {
  titulo: string;
  registros: RegistroTabela[];
  onAdd: (r: Omit<RegistroTabela, "id">) => void;
}) {
  const [form, setForm] = useState({ data: "", nome: "", dose: "", motivo: "", observacao: "" });
  const [adding, setAdding] = useState(false);

  const handleSave = () => {
    if (!form.nome.trim()) return;
    onAdd({ ...form, data: form.data || new Date().toLocaleDateString("pt-BR", { month: "short", year: "2-digit" }).replace(". ", "/") });
    setForm({ data: "", nome: "", dose: "", motivo: "", observacao: "" });
    setAdding(false);
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
      <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: "#F0EAE0" }}>
        <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}>{titulo}</h3>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80"
          style={{ background: "#5B2333", color: "#F4EFE7" }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Adicionar
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="px-5 py-4 border-b" style={{ borderColor: "#F0EAE0", background: "#FDFAF7" }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
            {([
              { key: "data",       label: "Data",      placeholder: "Set/26" },
              { key: "nome",       label: "Nome *",    placeholder: "Ex: Levotiroxina" },
              { key: "dose",       label: "Dose",      placeholder: "Ex: 50 mcg" },
              { key: "motivo",     label: "Motivo",    placeholder: "Ex: TSH elevado" },
              { key: "observacao", label: "Observação",placeholder: "Ex: Tomar em jejum", col2: true },
            ] as { key: keyof typeof form; label: string; placeholder: string; col2?: boolean }[]).map((f) => (
              <div key={f.key} className={f.col2 ? "sm:col-span-2" : ""}>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#9B8B7A" }}>{f.label}</label>
                <input
                  value={form[f.key]}
                  onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: "#fff", border: "1.5px solid #E8E0D0", color: "#1A1008" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#5B2333")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E0D0")}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: "#5B2333" }}>
              Salvar
            </button>
            <button onClick={() => setAdding(false)} className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ background: "#F0EAE0", color: "#9B8B7A" }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "#F8F4EF" }}>
              {["Data", "Nome", "Dose", "Motivo", "Observação"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold whitespace-nowrap" style={{ color: "#9B8B7A" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registros.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm" style={{ color: "#9B8B7A" }}>
                  Nenhum registro. Clique em "Adicionar" para incluir.
                </td>
              </tr>
            ) : (
              [...registros].reverse().map((r) => (
                <tr key={r.id} className="border-t" style={{ borderColor: "#F8F4EF" }}>
                  <td className="px-4 py-3 text-xs font-semibold whitespace-nowrap" style={{ color: "#C6A15B" }}>{r.data}</td>
                  <td className="px-4 py-3 font-semibold text-xs" style={{ color: "#3E1623" }}>{r.nome}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#1A1008" }}>{r.dose || "—"}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#9B8B7A" }}>{r.motivo || "—"}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#9B8B7A" }}>{r.observacao || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function MedicamentosTab({ patientId }: { patientId: number }) {
  const [meds, setMeds] = useState<RegistroTabela[]>(initialMeds[patientId] ?? []);

  const addMed = (r: Omit<RegistroTabela, "id">) =>
    setMeds((s) => [...s, { ...r, id: Date.now() }]);

  return <TabelaEditavel titulo="Histórico de Medicamentos" registros={meds} onAdd={addMed} />;
}

export function SuplementosTab({ patientId }: { patientId: number }) {
  const [sups, setSups] = useState<RegistroTabela[]>(initialSups[patientId] ?? []);

  const addSup = (r: Omit<RegistroTabela, "id">) =>
    setSups((s) => [...s, { ...r, id: Date.now() }]);

  return <TabelaEditavel titulo="Histórico de Suplementos" registros={sups} onAdd={addSup} />;
}
