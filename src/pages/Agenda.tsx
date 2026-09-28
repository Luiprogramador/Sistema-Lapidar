import { useEffect, useState } from "react";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

type Appointment = { data: string; horario: string; nome: string; tipo: string; protocolo: string; status?: "agendada" | "cancelada" };
const APPOINTMENT_STORAGE_KEY = "lapidar-demo-appointments-v1";

function dateOffset(offset: number) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const initialAppointments: Appointment[] = [
  { data: dateOffset(1), horario: "08:00", nome: "Ana Paula Ferreira", tipo: "Retorno", protocolo: "Lapidar 40+" },
  { data: dateOffset(1), horario: "09:30", nome: "Beatriz Lima", tipo: "Primeira consulta", protocolo: "Lapidar SOP" },
  { data: dateOffset(1), horario: "11:00", nome: "Carla Mendes", tipo: "Bioimpedância", protocolo: "Lapidar 40+" },
  { data: dateOffset(2), horario: "09:00", nome: "Sabrina Oliveira", tipo: "Retorno", protocolo: "Lapidar Fertilidade" },
  { data: dateOffset(2), horario: "10:30", nome: "Letícia Santos", tipo: "Retorno", protocolo: "Pocket" },
  { data: dateOffset(2), horario: "14:00", nome: "Daniela Rocha", tipo: "Exames", protocolo: "Lapidar Fertilidade" },
  { data: dateOffset(3), horario: "08:30", nome: "Fernanda Alves", tipo: "Retorno", protocolo: "Pocket" },
  { data: dateOffset(3), horario: "10:00", nome: "Gabriela Nunes", tipo: "Retorno", protocolo: "Lapidar 40+" },
  { data: dateOffset(7), horario: "09:00", nome: "Patricia Souza", tipo: "Bioimpedância", protocolo: "Lapidar SOP" },
  { data: dateOffset(7), horario: "11:00", nome: "Julia Cardoso", tipo: "Primeira consulta", protocolo: "Lapidar SOP" },
];

function readAppointments(): { appointments: Appointment[]; error: string | null } {
  try {
    const saved = window.localStorage.getItem(APPOINTMENT_STORAGE_KEY);
    if (!saved) return { appointments: initialAppointments, error: null };
    const parsed: unknown = JSON.parse(saved);
    if (
      !Array.isArray(parsed) ||
      !parsed.every((item) =>
        item &&
        typeof item.data === "string" &&
        typeof item.horario === "string" &&
        typeof item.nome === "string" &&
        typeof item.tipo === "string" &&
        typeof item.protocolo === "string",
      )
    ) {
      return { appointments: initialAppointments, error: "Os agendamentos locais estão inválidos. Crie um novo agendamento para substituir os dados de demonstração." };
    }
    return { appointments: parsed as Appointment[], error: null };
  } catch {
    return { appointments: initialAppointments, error: "Não foi possível ler a agenda local. Verifique o armazenamento do navegador." };
  }
}

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
  const [savedState] = useState(readAppointments);
  const [appointments, setAppointments] = useState(savedState.appointments);
  const [storageError, setStorageError] = useState<string | null>(savedState.error);
  const [newAppointmentOpen, setNewAppointmentOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [newAppointment, setNewAppointment] = useState({
    data: dateOffset(1),
    horario: "09:00",
    nome: "",
    tipo: "Retorno",
    protocolo: "Lapidar 40+",
  });
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(
    dateOffset(0)
  );

  useEffect(() => {
    if (storageError) return;
    try {
      window.localStorage.setItem(APPOINTMENT_STORAGE_KEY, JSON.stringify(appointments));
    } catch {
      setStorageError("Não foi possível salvar a agenda neste navegador. Os agendamentos atuais não foram sincronizados.");
    }
  }, [appointments, storageError]);

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
            {appointments.filter((appointment) => appointment.status !== "cancelada").length} consultas agendadas
          </p>
        </div>
        {formError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800">{formError}</p>}
        <button
          onClick={() => setNewAppointmentOpen(true)}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: "#5B2333" }}
        >
          + Novo Agendamento
        </button>
      </div>

      <p className="mb-4 text-xs" style={{ color: "#9B8B7A" }}>Agendamentos de demonstração · alterações ficam salvas neste navegador.</p>
      {storageError && <p role="alert" className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">{storageError}</p>}

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

          {newAppointmentOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onMouseDown={(event) => {
              if (event.target === event.currentTarget) setNewAppointmentOpen(false);
            }}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const next = { ...newAppointment, nome: newAppointment.nome.trim() };
                  if (appointments.some((appointment) => appointment.data === next.data && appointment.horario === next.horario && appointment.status !== "cancelada")) {
                    setFormError("Já existe um agendamento neste horário. Escolha outro horário antes de salvar.");
                    return;
                  }
                  setAppointments((current) => [...current, next].sort((a, b) => (a.data + a.horario).localeCompare(b.data + b.horario)));
                  setStorageError(null);
                  setFormError(null);
                  setSelectedDate(next.data);
                  setViewYear(Number(next.data.slice(0, 4)));
                  setViewMonth(Number(next.data.slice(5, 7)) - 1);
                  setNewAppointment({ data: dateOffset(1), horario: "09:00", nome: "", tipo: "Retorno", protocolo: "Lapidar 40+" });
                  setNewAppointmentOpen(false);
                }}
                className="w-full max-w-lg space-y-4 rounded-2xl p-5"
                style={{ background: "#F4EFE7", border: "1px solid #E8E0D0" }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl" style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}>Novo agendamento</h3>
                    <p className="mt-1 text-xs" style={{ color: "#9B8B7A" }}>Demonstração local — não envia lembretes.</p>
                  </div>
                  <button type="button" aria-label="Fechar" onClick={() => setNewAppointmentOpen(false)} className="text-xl" style={{ color: "#5B2333" }}>×</button>
                </div>
                <label className="block text-xs font-medium" style={{ color: "#6D5C50" }}>
                  Paciente
                  <input required value={newAppointment.nome} onChange={(event) => setNewAppointment((current) => ({ ...current, nome: event.target.value }))} className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm" style={{ background: "#fff", border: "1px solid #E8E0D0" }} />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-xs font-medium" style={{ color: "#6D5C50" }}>Data
                    <input required type="date" value={newAppointment.data} onChange={(event) => setNewAppointment((current) => ({ ...current, data: event.target.value }))} className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm" style={{ background: "#fff", border: "1px solid #E8E0D0" }} />
                  </label>
                  <label className="text-xs font-medium" style={{ color: "#6D5C50" }}>Horário
                    <input required type="time" value={newAppointment.horario} onChange={(event) => setNewAppointment((current) => ({ ...current, horario: event.target.value }))} className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm" style={{ background: "#fff", border: "1px solid #E8E0D0" }} />
                  </label>
                  <label className="text-xs font-medium" style={{ color: "#6D5C50" }}>Tipo
                    <select value={newAppointment.tipo} onChange={(event) => setNewAppointment((current) => ({ ...current, tipo: event.target.value }))} className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
                      {["Retorno", "Primeira consulta", "Bioimpedância", "Exames"].map((tipo) => <option key={tipo}>{tipo}</option>)}
                    </select>
                  </label>
                  <label className="text-xs font-medium" style={{ color: "#6D5C50" }}>Protocolo
                    <select value={newAppointment.protocolo} onChange={(event) => setNewAppointment((current) => ({ ...current, protocolo: event.target.value }))} className="mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
                      {["Lapidar 40+", "Lapidar SOP", "Lapidar Fertilidade", "Pocket"].map((protocol) => <option key={protocol}>{protocol}</option>)}
                    </select>
                  </label>
                </div>
                <div className="flex justify-end gap-2 border-t pt-4" style={{ borderColor: "#E8E0D0" }}>
                  <button type="button" onClick={() => setNewAppointmentOpen(false)} className="rounded-lg px-4 py-2 text-sm" style={{ background: "#E8E0D0", color: "#5B2333" }}>Cancelar</button>
                  <button type="submit" className="rounded-lg px-4 py-2 text-sm text-white" style={{ background: "#5B2333" }}>Salvar agendamento</button>
                </div>
              </form>
            </div>
          )}

          {selectedAppointment && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4" onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedAppointment(null);
            }}>
              <section role="dialog" aria-modal="true" aria-labelledby="appointment-detail-title" className="w-full max-w-md rounded-2xl p-5" style={{ background: "#F4EFE7", border: "1px solid #E8E0D0" }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 id="appointment-detail-title" className="text-xl" style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}>Detalhes do agendamento</h3>
                    <p className="mt-1 text-sm" style={{ color: "#9B8B7A" }}>{selectedAppointment.data} · {selectedAppointment.horario}</p>
                  </div>
                  <button type="button" aria-label="Fechar detalhes" onClick={() => setSelectedAppointment(null)} className="text-xl" style={{ color: "#5B2333" }}>×</button>
                </div>
                <div className="my-4 space-y-2 rounded-xl bg-white p-4 text-sm">
                  <p><span style={{ color: "#9B8B7A" }}>Paciente: </span>{selectedAppointment.nome}</p>
                  <p><span style={{ color: "#9B8B7A" }}>Tipo: </span>{selectedAppointment.tipo}</p>
                  <p><span style={{ color: "#9B8B7A" }}>Protocolo: </span>{selectedAppointment.protocolo}</p>
                  <p><span style={{ color: "#9B8B7A" }}>Status: </span>{selectedAppointment.status === "cancelada" ? "Cancelada (preservada no histórico)" : "Agendada"}</p>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setSelectedAppointment(null)} className="rounded-lg px-4 py-2 text-sm" style={{ background: "#E8E0D0", color: "#5B2333" }}>Fechar</button>
                  {selectedAppointment.status !== "cancelada" && (
                    <button
                      type="button"
                      onClick={() => {
                        const cancelled = { ...selectedAppointment, status: "cancelada" as const };
                        setAppointments((current) => current.map((appointment) =>
                          appointment.data === selectedAppointment.data &&
                          appointment.horario === selectedAppointment.horario &&
                          appointment.nome === selectedAppointment.nome
                            ? cancelled
                            : appointment,
                        ));
                        setSelectedAppointment(cancelled);
                      }}
                      className="rounded-lg px-4 py-2 text-sm font-medium"
                      style={{ background: "#FEE2E2", color: "#991B1B" }}
                    >
                      Cancelar sem apagar histórico
                    </button>
                  )}
                </div>
              </section>
            </div>
          )}
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
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedAppointment(a)}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{
                      background: a.status === "cancelada" ? "#F0EAE0" : "#F8F5F0",
                      opacity: a.status === "cancelada" ? 0.7 : 1,
                      width: "100%",
                      textAlign: "left",
                    }}
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
                    <span className="text-right">
                      <span
                        className="block text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: a.status === "cancelada" ? "#FEE2E2" : colors.bg, color: a.status === "cancelada" ? "#991B1B" : colors.text }}
                      >
                        {a.status === "cancelada" ? "Cancelada" : a.tipo}
                      </span>
                      <span className="mt-1 block text-[10px]" style={{ color: "#9B8B7A" }}>Ver detalhes</span>
                    </span>
                  </button>
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
            .filter((a) => a.data >= dateOffset(0) && a.status !== "cancelada")
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
