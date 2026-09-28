import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { mes: "Abr", receita: 8400, despesa: 2100 },
  { mes: "Mai", receita: 9200, despesa: 2300 },
  { mes: "Jun", receita: 8800, despesa: 2200 },
  { mes: "Jul", receita: 10500, despesa: 2600 },
  { mes: "Ago", receita: 11200, despesa: 2800 },
  { mes: "Set", receita: 12800, despesa: 3100 },
];

type Transaction = { id: number; data: string; nome: string; tipo: string; valor: number; status: "Pago" | "Pendente"; natureza: "Receita" | "Despesa" };
const transactions: Transaction[] = [
  { id: 1, data: "15/09/2026", nome: "Ana Paula Ferreira", tipo: "Retorno", valor: 350, status: "Pago", natureza: "Receita" },
  { id: 2, data: "15/09/2026", nome: "Beatriz Lima", tipo: "Primeira consulta", valor: 450, status: "Pago", natureza: "Receita" },
  { id: 3, data: "15/09/2026", nome: "Carla Mendes", tipo: "Bioimpedância", valor: 200, status: "Pendente", natureza: "Receita" },
  { id: 4, data: "14/09/2026", nome: "Daniela Rocha", tipo: "Retorno", valor: 350, status: "Pago", natureza: "Receita" },
  { id: 5, data: "14/09/2026", nome: "Fernanda Alves", tipo: "Retorno", valor: 350, status: "Pago", natureza: "Receita" },
  { id: 6, data: "13/09/2026", nome: "Gabriela Nunes", tipo: "Retorno", valor: 350, status: "Pendente", natureza: "Receita" },
  { id: 7, data: "12/09/2026", nome: "Letícia Santos", tipo: "Primeira consulta", valor: 450, status: "Pago", natureza: "Receita" },
  { id: 8, data: "11/09/2026", nome: "Patricia Souza", tipo: "Retorno", valor: 350, status: "Pago", natureza: "Receita" },
];
const FINANCIAL_STORAGE_KEY = "lapidar-demo-financial-v1";

const protocols = [
  { name: "Lapidar 40+", count: 34, ticketMedio: 385 },
  { name: "Lapidar SOP", count: 22, ticketMedio: 350 },
  { name: "Lapidar Fertilidade", count: 18, ticketMedio: 420 },
  { name: "Pocket", count: 14, ticketMedio: 280 },
];

function readSavedTransactions(): { transactions: Transaction[]; error: string | null } {
  try {
    const saved = window.localStorage.getItem(FINANCIAL_STORAGE_KEY);
    if (!saved) return { transactions: [], error: null };
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every((transaction) =>
      transaction &&
      typeof transaction.id === "number" &&
      typeof transaction.data === "string" &&
      typeof transaction.nome === "string" &&
      typeof transaction.tipo === "string" &&
      typeof transaction.valor === "number" &&
      (transaction.status === "Pago" || transaction.status === "Pendente") &&
      (transaction.natureza === "Receita" || transaction.natureza === "Despesa"),
    )) {
      return { transactions: [], error: "Os lançamentos salvos estão inválidos. Salvar um novo lançamento substituirá a demonstração local." };
    }
    return { transactions: parsed as Transaction[], error: null };
  } catch {
    return { transactions: [], error: "Não foi possível ler os lançamentos locais deste navegador." };
  }
}

export default function Financial() {
  const [loaded] = useState(readSavedTransactions);
  const [extraTransactions, setExtraTransactions] = useState<Transaction[]>(loaded.transactions);
  const [storageError, setStorageError] = useState<string | null>(loaded.error);
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<{ nome: string; tipo: string; valor: string; natureza: "Receita" | "Despesa"; status: "Pago" | "Pendente" }>({ nome: "", tipo: "Consulta", valor: "", natureza: "Receita", status: "Pendente" });
  const transactionList = [...transactions, ...extraTransactions].sort((a, b) => b.id - a.id);
  const extraPaid = extraTransactions.filter((transaction) => transaction.status === "Pago");
  const receitaMes = 12800 + extraPaid.filter((transaction) => transaction.natureza === "Receita").reduce((sum, transaction) => sum + transaction.valor, 0);
  const despesaMes = 3100 + extraPaid.filter((transaction) => transaction.natureza === "Despesa").reduce((sum, transaction) => sum + transaction.valor, 0);
  const lucro = receitaMes - despesaMes;
  const pendente = transactions.filter((t) => t.status === "Pendente").reduce((s, t) => s + t.valor, 0) +
    extraTransactions.filter((t) => t.status === "Pendente" && t.natureza === "Receita").reduce((s, t) => s + t.valor, 0);
  const chartData = monthlyData.map((month, index) => index === monthlyData.length - 1
    ? { ...month, receita: receitaMes, despesa: despesaMes }
    : month);
  const filteredTransactions = transactionList.filter((transaction) => {
    const matchesSearch = transaction.nome.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "Todos" ||
      (filter === "Pendentes" ? transaction.status === "Pendente" : transaction.natureza === filter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2
          className="text-2xl font-normal"
          style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}
        >
          Financeiro
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "#9B8B7A" }}>
          Setembro 2026 · valores ilustrativos
        </p>
      </div>
      <p className="text-xs" style={{ color: "#9B8B7A" }}>Protótipo local com lançamentos fictícios; não representa o saldo real da clínica.</p>
      {storageError && <p role="alert" className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">{storageError}</p>}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {["Todos", "Receita", "Despesa", "Pendentes"].map((option) => (
            <button key={option} type="button" onClick={() => setFilter(option)} aria-pressed={filter === option} className="rounded-lg px-3 py-1.5 text-xs" style={{ background: filter === option ? "#5B2333" : "#fff", color: filter === option ? "#F4EFE7" : "#5B2333", border: "1px solid #E8E0D0" }}>{option}</button>
          ))}
        </div>
        <button type="button" onClick={() => setFormOpen(true)} className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ background: "#5B2333" }}>+ Novo lançamento</button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Receita Bruta", value: `R$ ${receitaMes.toLocaleString("pt-BR")}`, color: "#66724A" },
          { label: "Despesas", value: `R$ ${despesaMes.toLocaleString("pt-BR")}`, color: "#9B8B7A" },
          { label: "Lucro Líquido", value: `R$ ${lucro.toLocaleString("pt-BR")}`, color: "#5B2333" },
          { label: "A Receber", value: `R$ ${pendente.toLocaleString("pt-BR")}`, color: "#C6A15B" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-xl p-4"
            style={{ background: "#fff", border: "1px solid #E8E0D0" }}
          >
            <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: "#9B8B7A" }}>
              {k.label}
            </p>
            <p
              className="text-xl font-semibold"
              style={{ fontFamily: "var(--font-serif)", color: k.color }}
            >
              {k.value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#fff", border: "1px solid #E8E0D0" }}
      >
        <h3 className="text-sm font-semibold mb-4" style={{ color: "#5B2333" }}>
          Receita vs. Despesas — Últimos 6 Meses
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0EAE0" vertical={false} />
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#9B8B7A" }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: "#9B8B7A" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(v, name) => [
                `R$ ${Number(v).toLocaleString("pt-BR")}`,
                name === "receita" ? "Receita" : "Despesa",
              ]}
              contentStyle={{
                background: "#fff",
                border: "1px solid #E8E0D0",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Bar dataKey="receita" fill="#5B2333" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="despesa" fill="#C6A15B" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent transactions */}
        <div
          className="rounded-xl p-5"
          style={{ background: "#fff", border: "1px solid #E8E0D0" }}
        >
          <h3 className="text-sm font-semibold mb-4" style={{ color: "#5B2333" }}>
            Lançamentos Recentes
          </h3>
          <div className="space-y-2">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row">
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar lançamento..." aria-label="Buscar lançamento" className="flex-1 rounded-lg px-3 py-2 text-sm" style={{ background: "#F8F5F0", border: "1px solid #E8E0D0" }} />
            </div>
            {filteredTransactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
                style={{ borderColor: "#F0EAE0" }}
              >
                <div>
                  <p className="text-sm" style={{ color: "#1A1008" }}>
                    {t.nome}
                  </p>
                  <p className="text-xs" style={{ color: "#9B8B7A" }}>
                    {t.data} · {t.tipo} · {t.natureza}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium" style={{ color: "#5B2333" }}>
                    R$ {t.valor}
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      background: t.status === "Pago" ? "#E8F0E0" : "#FEF3C7",
                      color: t.status === "Pago" ? "#66724A" : "#92400E",
                    }}
                  >
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
            {filteredTransactions.length === 0 && <p className="py-5 text-center text-sm" style={{ color: "#9B8B7A" }}>Nenhum lançamento corresponde aos filtros.</p>}
          </div>

          {formOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onMouseDown={(event) => {
              if (event.target === event.currentTarget) setFormOpen(false);
            }}>
              <form className="w-full max-w-lg space-y-4 rounded-2xl p-5" style={{ background: "#F4EFE7", border: "1px solid #E8E0D0" }} onSubmit={(event) => {
                event.preventDefault();
                const next: Transaction[] = [{
                  id: Date.now(),
                  data: new Date().toLocaleDateString("pt-BR"),
                  nome: form.nome.trim(),
                  tipo: form.tipo,
                  valor: Number(form.valor),
                  natureza: form.natureza,
                  status: form.status,
                }, ...extraTransactions];
                try {
                  window.localStorage.setItem(FINANCIAL_STORAGE_KEY, JSON.stringify(next));
                  setExtraTransactions(next);
                  setStorageError(null);
                  setFormOpen(false);
                  setForm({ nome: "", tipo: "Consulta", valor: "", natureza: "Receita", status: "Pendente" });
                } catch {
                  setStorageError("Não foi possível salvar o lançamento neste navegador.");
                }
              }}>
                <div>
                  <h3 className="text-xl" style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}>Novo lançamento</h3>
                  <p className="mt-1 text-xs" style={{ color: "#9B8B7A" }}>Registro fictício para demonstração local.</p>
                </div>
                <label className="block text-xs font-medium" style={{ color: "#6D5C50" }}>Descrição
                  <input required value={form.nome} onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))} className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm" style={{ background: "#fff", border: "1px solid #E8E0D0" }} />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-xs font-medium" style={{ color: "#6D5C50" }}>Natureza
                    <select value={form.natureza} onChange={(event) => {
                      const value = event.target.value;
                      if (value === "Receita" || value === "Despesa") setForm((current) => ({ ...current, natureza: value }));
                    }} className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
                      <option>Receita</option><option>Despesa</option>
                    </select>
                  </label>
                  <label className="text-xs font-medium" style={{ color: "#6D5C50" }}>Categoria
                    <input required value={form.tipo} onChange={(event) => setForm((current) => ({ ...current, tipo: event.target.value }))} className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm" style={{ background: "#fff", border: "1px solid #E8E0D0" }} />
                  </label>
                  <label className="text-xs font-medium" style={{ color: "#6D5C50" }}>Valor (R$)
                    <input required type="number" min="0.01" step="0.01" value={form.valor} onChange={(event) => setForm((current) => ({ ...current, valor: event.target.value }))} className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm" style={{ background: "#fff", border: "1px solid #E8E0D0" }} />
                  </label>
                  <label className="text-xs font-medium" style={{ color: "#6D5C50" }}>Status
                    <select value={form.status} onChange={(event) => {
                      const value = event.target.value;
                      if (value === "Pago" || value === "Pendente") setForm((current) => ({ ...current, status: value }));
                    }} className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
                      <option>Pendente</option><option>Pago</option>
                    </select>
                  </label>
                </div>
                <div className="flex justify-end gap-2 border-t pt-4" style={{ borderColor: "#E8E0D0" }}>
                  <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg px-4 py-2 text-sm" style={{ background: "#E8E0D0", color: "#5B2333" }}>Cancelar</button>
                  <button type="submit" className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ background: "#5B2333" }}>Salvar lançamento</button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Protocol breakdown */}
        <div
          className="rounded-xl p-5"
          style={{ background: "#fff", border: "1px solid #E8E0D0" }}
        >
          <h3 className="text-sm font-semibold mb-4" style={{ color: "#5B2333" }}>
            Receita por Protocolo
          </h3>
          <div className="space-y-3">
            {protocols.map((p) => {
              const total = p.count * p.ticketMedio;
              const max = Math.max(...protocols.map((x) => x.count * x.ticketMedio));
              return (
                <div key={p.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "#5B2333" }}>{p.name}</span>
                    <span style={{ color: "#9B8B7A" }}>
                      R$ {total.toLocaleString("pt-BR")} · {p.count} pac. · R$ {p.ticketMedio} ticket
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "#F0EAE0" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${(total / max) * 100}%`, background: "#5B2333" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="mt-4 pt-4 border-t"
            style={{ borderColor: "#F0EAE0" }}
          >
            <div className="flex justify-between text-sm">
              <span style={{ color: "#9B8B7A" }}>Total estimado (mês)</span>
              <span className="font-semibold" style={{ color: "#5B2333" }}>
                R${" "}
                {protocols
                  .reduce((s, p) => s + p.count * p.ticketMedio, 0)
                  .toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
