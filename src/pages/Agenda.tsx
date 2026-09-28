import { useState } from "react";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const appointments = [
  { data: "2026-09-16", horario: "08:00", nome: "Ana Paula Ferreira", tipo: "Retorno", protocolo: "Lapidar 40+" },
  { data: "2026-09-16", horario: "09:30", nome: "Beatriz Lima", tipo: "Primeira consulta", protocolo: "Lapidar SOP" },
  { data: "2026-09-16", horario: "11:00", nome: "Carla Mendes", tipo: "Bioimpedância", protocolo: "Lapidar 40+" },
  { data: "2026-09-17", horario: "09:00", nome: "Sabrina Oliveira", tipo: "Retorno", protocolo: "Lapidar Fertilidade" },
  { data: "2026-09-17", horario: "10:30", nome: "Letícia Santos", tipo: "Retorno", protocolo: "Pocket" },
  { data: "2026-09-17", horario: "14:00", nome: "Daniela Rocha", tipo: "Exames", protocolo: "Lapidar Fertilidade" },
  { data: "2026-09-18", horario: "08:30", nome: "Fernanda Alves", tipo: "Retorno", protocolo: "Pocket" },
  { data: "2026-09-18", horario: "10:00", nome: "Gabriela Nunes", tipo: "Retorno", protocolo: "Lapidar 40+" },
  { data: "2026-09-22", horario: "09:00", nome: "Patricia Souza", tipo: "Bioimpedância", protocolo: "Lapidar SOP" },
  { data: "2026-09-22", horario: "11:00", nome: "Julia Cardoso", tipo: "Primeira consulta", protocolo: "Lapidar SOP" },
];

const tipoColors: Record<string, { bg: string; text: string }> = {
  "Retorno": { bg: "#EDE9F8", text: "#5B2333" },
  "Primeira consulta": { bg: "#E8F0E0", text: "#3A4E25" },
  "Bioimpedância": { bg: "#FEF3C7", text: "#92400E" },
  "Exames": { bg: "#E0F2FE", text: "#075985" },
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function Agenda() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().slice(0, 10)
  );

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const dayAppointments = appointments.filter((a) => a.data === selectedDate);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const hasAppt = (day: number) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return appointments.some((a) => a.data === dateStr);
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2
            className="text-2xl font-normal"
            style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}
          >
            Agenda
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "#9B8B7A" }}>
            {appointments.length} consultas agendadas
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: "#5B2333" }}
        >
          + Novo Agendamento
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Calendar */}
        <div
          className="rounded-xl p-5"
          style={{ background: "#fff", border: "1px solid #E8E0D0" }}
        >
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-1 rounded hover:opacity-70" style={{ color: "#5B2333" }}>
              ‹
            </button>
            <h3 className="text-sm font-semibold" style={{ color: "#5B2333" }}>
              {MONTHS[viewMonth]} {viewYear}
            </h3>
            <button onClick={nextMonth} className="p-1 rounded hover:opacity-70" style={{ color: "#5B2333" }}>
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 gap-0 mb-2">
            {DAYS.map((d) => (
              <div
                key={d}
                className="text-center text-xs font-medium py-1"
                style={{ color: "#9B8B7A" }}
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isSelected = dateStr === selectedDate;
              const isToday = dateStr === today.toISOString().slice(0, 10);
              const hasA = hasAppt(day);
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className="relative flex flex-col items-center justify-center h-9 rounded-lg text-sm transition-all"
                  style={{
                    background: isSelected ? "#5B2333" : isToday ? "#F4EFE7" : "transparent",
                    color: isSelected ? "#F4EFE7" : "#1A1008",
                    fontWeight: isToday ? 600 : 400,
                  }}
                >
                  {day}
                  {hasA && (
                    <div
                      className="absolute bottom-1 w-1 h-1 rounded-full"
                      style={{ background: isSelected ? "#C6A15B" : "#5B2333" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day appointments */}
        <div
          className="rounded-xl p-5"
          style={{ background: "#fff", border: "1px solid #E8E0D0" }}
        >
          <h3 className="text-sm font-semibold mb-1" style={{ color: "#5B2333" }}>
            {new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h3>
          {dayAppointments.length === 0 ? (
            <p className="text-sm mt-8 text-center" style={{ color: "#9B8B7A" }}>
              Nenhuma consulta neste dia.
            </p>
          ) : (
            <div className="space-y-3 mt-3">
              {dayAppointments.map((a, i) => {
                const colors = tipoColors[a.tipo] || { bg: "#F0EAE0", text: "#5B2333" };
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{ background: "#F8F5F0" }}
                  >
                    <div
                      className="text-xs font-semibold pt-0.5 shrink-0 w-10"
                      style={{ color: "#C6A15B" }}
                    >
                      {a.horario}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: "#1A1008" }}>
                        {a.nome}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#9B8B7A" }}>
                        {a.protocolo}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
                      style={{ background: colors.bg, color: colors.text }}
                    >
                      {a.tipo}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Upcoming week summary */}
      <div
        className="mt-4 rounded-xl p-5"
        style={{ background: "#fff", border: "1px solid #E8E0D0" }}
      >
        <h3 className="text-sm font-semibold mb-4" style={{ color: "#5B2333" }}>
          Próximas Consultas
        </h3>
        <div className="space-y-2">
          {appointments
            .filter((a) => a.data >= today.toISOString().slice(0, 10))
            .sort((a, b) => (a.data + a.horario).localeCompare(b.data + b.horario))
            .slice(0, 8)
            .map((a, i) => {
              const colors = tipoColors[a.tipo] || { bg: "#F0EAE0", text: "#5B2333" };
              const d = new Date(a.data + "T12:00:00");
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2 border-b last:border-0"
                  style={{ borderColor: "#F0EAE0" }}
                >
                  <div className="text-xs w-20 shrink-0" style={{ color: "#9B8B7A" }}>
                    {d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })} · {a.horario}
                  </div>
                  <div className="flex-1 text-sm" style={{ color: "#1A1008" }}>
                    {a.nome}
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: colors.bg, color: colors.text }}
                  >
                    {a.tipo}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
