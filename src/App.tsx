import { useState, useRef, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Agenda from "./pages/Agenda";
import Financial from "./pages/Financial";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import PatientPortal from "./pages/PatientPortal";

export type Page = "dashboard" | "patients" | "agenda" | "financial" | "reports" | "settings";
type DemoRole = "doctor" | "secretary" | "patient";

const notifications = [
  { id: 1, text: "Carla Mendes — LDL acima da meta", time: "há 5 min", unread: true },
  { id: 2, text: "Beatriz Lima — Vitamina D baixa (18 ng/mL)", time: "há 22 min", unread: true },
  { id: 3, text: "4 bioimpedâncias pendentes esta semana", time: "há 1h", unread: true },
  { id: 4, text: "Próxima consulta: Ana Paula — amanhã 09:00", time: "há 2h", unread: false },
  { id: 5, text: "Fernanda Alves — ebook enviado com sucesso", time: "ontem", unread: false },
];

function Topbar({
  onMenuToggle,
  onNavigate,
  onLogout,
  role,
  onRoleChange,
}: {
  onMenuToggle: () => void;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  role: DemoRole;
  onRoleChange: (role: DemoRole) => void;
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifs.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const markAllRead = () => setNotifs((n) => n.map((x) => ({ ...x, unread: false })));

  return (
    <header
      className="flex items-center justify-between px-4 lg:px-6 py-3 border-b shrink-0"
      style={{ background: "#5B2333", borderColor: "rgba(255,255,255,0.08)", minHeight: 56 }}
    >
      {/* Mobile hamburger */}
      <button
        className="lg:hidden p-2 rounded-lg"
        style={{ color: "#F4EFE7" }}
        onClick={onMenuToggle}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-xs" style={{ color: "#F4EFE7" }}>
          <span className="hidden md:inline">Perfil de demonstração</span>
          <select
            value={role}
            onChange={(event) => {
              const value = event.target.value;
              if (value === "doctor" || value === "secretary" || value === "patient") onRoleChange(value);
            }}
            aria-label="Perfil de demonstração"
            className="rounded-md px-2 py-1 text-xs"
            style={{ background: "#F4EFE7", color: "#5B2333" }}
          >
            <option value="doctor">Médica</option>
            <option value="secretary">Secretaria</option>
            <option value="patient">Paciente</option>
          </select>
        </label>
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ color: "#F4EFE7" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-vinho" style={{ background: "#C6A15B", borderColor: "#5B2333" }} />
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-11 w-72 sm:w-80 rounded-xl shadow-lg overflow-hidden z-50" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "#F0EAE0" }}>
                <span className="text-sm font-semibold" style={{ color: "#5B2333" }}>Notificações</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs" style={{ color: "#C6A15B" }}>
                    Marcar todas como lidas
                  </button>
                )}
              </div>
              <div className="divide-y" style={{ borderColor: "#F0EAE0" }}>
                {notifs.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-3 cursor-pointer"
                    style={{ background: n.unread ? "#FBF8F4" : "#fff" }}
                    onClick={() => setNotifs((prev) => prev.map((x) => x.id === n.id ? { ...x, unread: false } : x))}
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: n.unread ? "#C6A15B" : "transparent" }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs leading-relaxed" style={{ color: "#1A1008" }}>{n.text}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#9B8B7A" }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-5" style={{ background: "rgba(255,255,255,0.15)" }} />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
              style={{ background: "rgba(198,161,91,0.35)", color: "#F4EFE7", border: "1px solid rgba(198,161,91,0.5)" }}>
              AG
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold leading-tight" style={{ color: "#F4EFE7" }}>Dra. Andressa Gomide</p>
              <p className="text-xs leading-tight" style={{ color: "rgba(244,239,231,0.55)" }}>Ginecologista Endócrina</p>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(244,239,231,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hidden sm:block">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-11 w-52 rounded-xl shadow-lg overflow-hidden z-50" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: "#F0EAE0" }}>
                <p className="text-sm font-semibold" style={{ color: "#1A1008" }}>Dra. Andressa Gomide</p>
                <p className="text-xs" style={{ color: "#9B8B7A" }}>CRM DF 29235 · RQE 24717</p>
              </div>
              {[{ label: "Meu Perfil", icon: "◎" }, { label: "Configurações", icon: "⚙" }].map((item) => (
                <button
                  key={item.label}
                  onClick={() => { setProfileOpen(false); onNavigate("settings"); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left"
                  style={{ color: "#1A1008" }}
                >
                  <span style={{ color: "#9B8B7A" }}>{item.icon}</span>{item.label}
                </button>
              ))}
              <div className="border-t" style={{ borderColor: "#F0EAE0" }}>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left"
                  style={{ color: "#991B1B" }}
                >
                  <span>↩</span> Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "patients", label: "Pacientes", icon: "♀" },
  { id: "agenda", label: "Agenda", icon: "◷" },
  { id: "financial", label: "Financeiro", icon: "◈" },
  { id: "reports", label: "Relatórios", icon: "▤" },
  { id: "settings", label: "Configurações", icon: "⚙" },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState<DemoRole>("doctor");

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  if (role === "patient") {
    return (
      <div className="min-h-screen" style={{ background: "#F4EFE7" }}>
        <header className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6" style={{ background: "#5B2333" }}>
          <div>
            <p className="text-lg text-white" style={{ fontFamily: "var(--font-serif)" }}>Lapidar</p>
            <p className="text-xs" style={{ color: "#D4B578" }}>Portal da paciente · demonstração</p>
          </div>
          <button
            onClick={() => setRole("doctor")}
            className="rounded-lg px-3 py-2 text-sm"
            style={{ background: "rgba(255,255,255,0.12)", color: "#F4EFE7" }}
          >
            Voltar ao painel da equipe
          </button>
        </header>
        <PatientPortal />
      </div>
    );
  }

  const visibleNavItems = role === "secretary"
    ? navItems.filter((item) => item.id !== "reports")
    : navItems;

  return (
    <div className="flex min-h-screen" style={{ background: "#F4EFE7" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className="fixed lg:relative z-40 lg:z-auto w-56 min-h-screen flex flex-col shrink-0 transition-transform duration-200"
        style={{
          background: "#5B2333",
          transform: sidebarOpen ? "translateX(0)" : undefined,
        }}
      >
        <style>{`
          @media (max-width: 1023px) {
            aside {
              transform: ${sidebarOpen ? "translateX(0)" : "translateX(-100%)"};
            }
          }
        `}</style>

        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-white text-xl leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
            Lapidar
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "#C6A15B" }}>Gestão Clínica</p>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
          {visibleNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setSidebarOpen(false); }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all duration-150"
              style={{
                color: page === item.id ? "#F4EFE7" : "rgba(244,239,231,0.6)",
                background: page === item.id ? "rgba(198,161,91,0.2)" : "transparent",
                borderLeft: page === item.id ? "2px solid #C6A15B" : "2px solid transparent",
              }}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 min-h-screen flex flex-col overflow-hidden lg:ml-0">
        <Topbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onNavigate={setPage}
          onLogout={() => { setLoggedIn(false); setPage("dashboard"); }}
          role={role}
          onRoleChange={(nextRole) => { setRole(nextRole); setSidebarOpen(false); }}
        />
        <div className="flex-1 overflow-y-auto">
          {page === "dashboard" && <Dashboard />}
          {page === "patients" && <Patients />}
          {page === "agenda" && <Agenda />}
          {page === "financial" && <Financial />}
          {page === "reports" && <Reports />}
          {page === "settings" && <Settings />}
        </div>
      </main>
    </div>
  );
}
