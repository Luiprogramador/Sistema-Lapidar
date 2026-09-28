import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const consultasData = [
  { dia: "Seg", n: 5 },
  { dia: "Ter", n: 8 },
  { dia: "Qua", n: 6 },
  { dia: "Qui", n: 9 },
  { dia: "Sex", n: 4 },
];

const protocoloData = [
  { name: "Lapidar 40+", value: 34, color: "#5B2333" },
  { name: "Lapidar SOP", value: 22, color: "#C6A15B" },
  { name: "Lapidar Fertilidade", value: 18, color: "#66724A" },
  { name: "Pocket", value: 14, color: "#7A3047" },
];

const alertasPacientes = [
  { nome: "Fernanda Alves", protocolo: "Lapidar 40+", alerta: "LDL acima da meta" },
  { nome: "Mariana Costa", protocolo: "Lapidar SOP", alerta: "Vitamina D baixa" },
  { nome: "Juliana Ramos", protocolo: "Lapidar Fertilidade", alerta: "Sem atividade física" },
  { nome: "Carla Mendes", protocolo: "Lapidar 40+", alerta: "LDL acima da meta" },
  { nome: "Beatriz Lima", protocolo: "Pocket", alerta: "Vitamina D baixa" },
];

const proximosContatos = [
  { nome: "Ana Paula Ferreira", horario: "09:00", motivo: "Retorno 30 dias" },
  { nome: "Sabrina Oliveira", horario: "10:30", motivo: "Resultados exames" },
  { nome: "Letícia Santos", horario: "14:00", motivo: "Primeira consulta" },
  { nome: "Patricia Souza", horario: "15:30", motivo: "Bioimpedância" },
];

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-1"
      style={{ background: "#fff", border: "1px solid #E8E0D0" }}
    >
      <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "#9B8B7A" }}>
        {label}
      </span>
      <span
        className="text-2xl font-semibold leading-tight"
        style={{ color: accent || "#5B2333", fontFamily: "var(--font-serif)" }}
      >
        {value}
      </span>
      {sub && (
        <span className="text-xs" style={{ color: "#9B8B7A" }}>
          {sub}
        </span>
      )}
    </div>
  );
}

function AlertBadge({ type }: { type: string }) {
  const map: Record<string, { bg: string; text: string }> = {
    "LDL acima da meta": { bg: "#FEE2E2", text: "#991B1B" },
    "Vitamina D baixa": { bg: "#FEF3C7", text: "#92400E" },
    "Sem atividade física": { bg: "#E0F2FE", text: "#075985" },
  };
  const style = map[type] || { bg: "#F3F4F6", text: "#374151" };
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium"
      style={{ background: style.bg, color: style.text }}
    >
      {type}
    </span>
  );
}

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2
          className="text-2xl font-normal"
          style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}
        >
          Dashboard
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "#9B8B7A" }}>
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <StatCard label="Total de Pacientes" value="88" sub="todas as ativas e inativas" />
        <StatCard label="Pacientes Ativas" value="72" sub="em protocolo ativo" accent="#66724A" />
        <StatCard label="Consultas na Semana" value="32" sub="seg–sex" accent="#5B2333" />
      </div>

      {/* Protocol distribution */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {protocoloData.map((p) => (
          <div
            key={p.name}
            className="rounded-xl p-4 flex flex-col gap-2"
            style={{ background: "#fff", border: "1px solid #E8E0D0" }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: p.color }}
            />
            <span className="text-xs font-medium" style={{ color: "#9B8B7A" }}>
              {p.name}
            </span>
            <span
              className="text-xl font-semibold"
              style={{ fontFamily: "var(--font-serif)", color: p.color }}
            >
              {p.value}
            </span>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Protocol pie chart */}
        <div
          className="col-span-1 rounded-xl p-5"
          style={{ background: "#fff", border: "1px solid #E8E0D0" }}
        >
          <h3 className="text-sm font-semibold mb-4" style={{ color: "#5B2333" }}>
            Pacientes por Protocolo
          </h3>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie
                data={protocoloData}
                cx="50%"
                cy="50%"
                innerRadius={36}
                outerRadius={56}
                paddingAngle={2}
                dataKey="value"
              >
                {protocoloData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, name) => [v, name]}
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #E8E0D0",
                  borderRadius: 8,
                  fontSize: 11,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {protocoloData.map((p) => (
              <div key={p.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  <span style={{ color: "#5B2333" }}>{p.name}</span>
                </div>
                <span style={{ color: "#9B8B7A" }}>{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consultas por dia */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#fff", border: "1px solid #E8E0D0" }}
      >
        <h3 className="text-sm font-semibold mb-4" style={{ color: "#5B2333" }}>
          Consultas Esta Semana
        </h3>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={consultasData} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0EAE0" vertical={false} />
            <XAxis dataKey="dia" tick={{ fontSize: 12, fill: "#9B8B7A" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9B8B7A" }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(v) => [v, "Consultas"]}
              contentStyle={{
                background: "#fff",
                border: "1px solid #E8E0D0",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Bar dataKey="n" fill="#5B2333" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row: alerts + contacts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Alertas clínicos */}
        <div
          className="rounded-xl p-5"
          style={{ background: "#fff", border: "1px solid #E8E0D0" }}
        >
          <h3 className="text-sm font-semibold mb-1" style={{ color: "#5B2333" }}>
            Alertas Clínicos
          </h3>
          <p className="text-xs mb-4" style={{ color: "#9B8B7A" }}>
            Exames pendentes · Bioimpedâncias · LDL · Vitamina D · Atividade física
          </p>
          <div className="space-y-2">
            {alertasPacientes.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b last:border-0"
                style={{ borderColor: "#F0EAE0" }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: "#1A1008" }}>
                    {p.nome}
                  </p>
                  <p className="text-xs" style={{ color: "#9B8B7A" }}>
                    {p.protocolo}
                  </p>
                </div>
                <AlertBadge type={p.alerta} />
              </div>
            ))}
          </div>
        </div>

        {/* Próximos contatos terça */}
        <div
          className="rounded-xl p-5"
          style={{ background: "#fff", border: "1px solid #E8E0D0" }}
        >
          <h3 className="text-sm font-semibold mb-1" style={{ color: "#5B2333" }}>
            Próximos Contatos — Terça-feira
          </h3>
          <p className="text-xs mb-4" style={{ color: "#9B8B7A" }}>
            {new Date().toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
            })}
          </p>
          <div className="space-y-3">
            {proximosContatos.map((c, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="text-xs font-medium pt-0.5 shrink-0 w-12 text-right"
                  style={{ color: "#C6A15B" }}
                >
                  {c.horario}
                </div>
                <div
                  className="flex-1 pb-3 border-b last:border-0"
                  style={{ borderColor: "#F0EAE0" }}
                >
                  <p className="text-sm font-medium" style={{ color: "#1A1008" }}>
                    {c.nome}
                  </p>
                  <p className="text-xs" style={{ color: "#9B8B7A" }}>
                    {c.motivo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
