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

const transactions = [
  { data: "15/09/2026", nome: "Ana Paula Ferreira", tipo: "Retorno", valor: 350, status: "Pago" },
  { data: "15/09/2026", nome: "Beatriz Lima", tipo: "Primeira consulta", valor: 450, status: "Pago" },
  { data: "15/09/2026", nome: "Carla Mendes", tipo: "Bioimpedância", valor: 200, status: "Pendente" },
  { data: "14/09/2026", nome: "Daniela Rocha", tipo: "Retorno", valor: 350, status: "Pago" },
  { data: "14/09/2026", nome: "Fernanda Alves", tipo: "Retorno", valor: 350, status: "Pago" },
  { data: "13/09/2026", nome: "Gabriela Nunes", tipo: "Retorno", valor: 350, status: "Pendente" },
  { data: "12/09/2026", nome: "Letícia Santos", tipo: "Primeira consulta", valor: 450, status: "Pago" },
  { data: "11/09/2026", nome: "Patricia Souza", tipo: "Retorno", valor: 350, status: "Pago" },
];

const protocols = [
  { name: "Lapidar 40+", count: 34, ticketMedio: 385 },
  { name: "Lapidar SOP", count: 22, ticketMedio: 350 },
  { name: "Lapidar Fertilidade", count: 18, ticketMedio: 420 },
  { name: "Pocket", count: 14, ticketMedio: 280 },
];

export default function Financial() {
  const receitaMes = 12800;
  const despesaMes = 3100;
  const lucro = receitaMes - despesaMes;
  const pendente = transactions.filter((t) => t.status === "Pendente").reduce((s, t) => s + t.valor, 0);

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
          Setembro 2026
        </p>
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
          <BarChart data={monthlyData} barGap={4}>
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
            {transactions.map((t, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b last:border-0"
                style={{ borderColor: "#F0EAE0" }}
              >
                <div>
                  <p className="text-sm" style={{ color: "#1A1008" }}>
                    {t.nome}
                  </p>
                  <p className="text-xs" style={{ color: "#9B8B7A" }}>
                    {t.data} · {t.tipo}
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
          </div>
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
