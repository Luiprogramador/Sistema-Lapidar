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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "#5B2333",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        minHeight: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        gap: 8,
      }}
    >
      {/* Mobile hamburger */}
      <button
        className="lg:hidden"
        style={{ color: "#F4EFE7", padding: 8, borderRadius: 8, minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
        onClick={onMenuToggle}
        aria-label="Abrir menu"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <div className="hidden lg:block" />

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, color: "#F4EFE7", fontSize: 13 }}>
          <span className="hidden md:inline">Perfil de demonstração</span>
          <select
            value={role}
            onChange={(event) => {
              const value = event.target.value;
              if (value === "doctor" || value === "secretary" || value === "patient") onRoleChange(value);
            }}
            aria-label="Perfil de demonstração"
            style={{ background: "#F4EFE7", color: "#5B2333", borderRadius: 6, padding: "4px 8px", fontSize: 13, minHeight: 36 }}
          >
            <option value="doctor">Médica</option>
            <option value="secretary">Secretaria</option>
            <option value="patient">Paciente</option>
          </select>
        </label>

        {/* Notificações */}
        <div style={{ position: "relative" }} ref={notifRef}>
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            style={{ color: "#F4EFE7", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", position: "relative" }}
            aria-label={`Notificações${unreadCount > 0 ? `, ${unreadCount} não lidas` : ""}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 && (
              <span style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: "50%", background: "#C6A15B", border: "2px solid #5B2333" }} />
            )}
          </button>
          {notifOpen && (
            <div style={{ position: "absolute", right: 0, top: 52, width: 300, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", background: "#fff", border: "1px solid #E8E0D0", zIndex: 60, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #F0EAE0" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#5B2333" }}>Notificações</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} style={{ fontSize: 12, color: "#C6A15B", background: "none", border: "none", cursor: "pointer" }}>
                    Marcar todas como lidas
                  </button>
                )}
              </div>
              <div>
                {notifs.map((n) => (
                  <div
                    key={n.id}
                    style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", borderBottom: "1px solid #F0EAE0", background: n.unread ? "#FBF8F4" : "#fff", cursor: "pointer" }}
                    onClick={() => setNotifs((prev) => prev.map((x) => x.id === n.id ? { ...x, unread: false } : x))}
                  >
                    <div style={{ marginTop: 6, width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: n.unread ? "#C6A15B" : "transparent" }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, color: "#1A1008", lineHeight: 1.5 }}>{n.text}</p>
                      <p style={{ fontSize: 12, color: "#9B8B7A", marginTop: 2 }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)" }} />

        {/* Perfil */}
        <div style={{ position: "relative" }} ref={profileRef}>
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px 4px 4px", borderRadius: 99, background: "rgba(255,255,255,0.07)", minHeight: 44 }}
          >
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(198,161,91,0.35)", color: "#F4EFE7", border: "1px solid rgba(198,161,91,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
              AG
            </div>
            <div className="hidden sm:block" style={{ textAlign: "left" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#F4EFE7", lineHeight: 1.2 }}>Dra. Andressa Gomide</p>
              <p style={{ fontSize: 11, color: "rgba(244,239,231,0.55)", lineHeight: 1.2 }}>Ginecologista Endócrina</p>
            </div>
            <svg className="hidden sm:block" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(244,239,231,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {profileOpen && (
            <div style={{ position: "absolute", right: 0, top: 52, width: 208, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", background: "#fff", border: "1px solid #E8E0D0", zIndex: 60, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #F0EAE0" }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1008" }}>Dra. Andressa Gomide</p>
                <p style={{ fontSize: 12, color: "#9B8B7A" }}>CRM DF 29235 · RQE 24717</p>
              </div>
              {[{ label: "Meu Perfil", icon: "◎" }, { label: "Configurações", icon: "⚙" }].map((item) => (
                <button
                  key={item.label}
                  onClick={() => { setProfileOpen(false); onNavigate("settings"); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", fontSize: 14, color: "#1A1008", background: "none", border: "none", textAlign: "left", cursor: "pointer", minHeight: 44 }}
                >
                  <span style={{ color: "#9B8B7A" }}>{item.icon}</span>{item.label}
                </button>
              ))}
              <div style={{ borderTop: "1px solid #F0EAE0" }}>
                <button
                  onClick={onLogout}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", fontSize: 14, color: "#991B1B", background: "none", border: "none", textAlign: "left", cursor: "pointer", minHeight: 44 }}
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
  { id: "settings", label: "Config.", icon: "⚙" },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState<DemoRole>("doctor");

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  // ── Portal da Paciente ──────────────────────────────────────────────────────
  if (role === "patient") {
    return (
      <div style={{ minHeight: "100vh", background: "#F4EFE7" }}>
        <header style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: "#5B2333", minHeight: 56,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 16px", gap: 8,
        }}>
          <div>
            <p style={{ fontSize: 18, color: "#fff", fontFamily: "var(--font-serif)", lineHeight: 1.2 }}>Lapidar</p>
            <p style={{ fontSize: 12, color: "#D4B578" }}>Portal da paciente · demonstração</p>
          </div>
          <button
            onClick={() => setRole("doctor")}
            style={{ background: "rgba(255,255,255,0.12)", color: "#F4EFE7", borderRadius: 8, padding: "8px 14px", fontSize: 14, minHeight: 44, cursor: "pointer", border: "none" }}
          >
            Voltar ao painel
          </button>
        </header>
        <div style={{ paddingTop: 56 }}>
          <PatientPortal />
        </div>
      </div>
    );
  }

  // ── Painel Clínico ──────────────────────────────────────────────────────────
  const visibleNavItems = role === "secretary"
    ? navItems.filter((item) => item.id !== "reports")
    : navItems;

  return (
    <div style={{ background: "#F4EFE7", minHeight: "100vh" }}>

      {/* ── Topbar: fixed em TODAS as telas ── */}
      <Topbar
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onNavigate={setPage}
        onLogout={() => { setLoggedIn(false); setPage("dashboard"); }}
        role={role}
        onRoleChange={(nextRole) => { setRole(nextRole); setSidebarOpen(false); }}
      />

      {/* ── Overlay mobile para fechar sidebar ── */}
      {sidebarOpen && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 35 }}
          className="lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar: fixed, desktop sempre visível, mobile = drawer ── */}
      <aside style={{
        position: "fixed",
        top: 56,        // abaixo da topbar
        left: 0,
        bottom: 0,
        width: 224,
        background: "#5B2333",
        zIndex: 40,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
      }}
        // Inline media query override via className trick:
        className="lapidar-sidebar"
      >
        <style>{`
          @media (min-width: 1024px) {
            .lapidar-sidebar { transform: translateX(0) !important; }
          }
        `}</style>

        <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "12px 12px", flex: 1 }}>
          {visibleNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setSidebarOpen(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 500,
                textAlign: "left",
                transition: "all 0.15s",
                color: page === item.id ? "#F4EFE7" : "rgba(244,239,231,0.65)",
                background: page === item.id ? "rgba(198,161,91,0.2)" : "transparent",
                borderTop: "none",
                borderRight: "none",
                borderBottom: "none",
                borderLeft: page === item.id ? "3px solid #C6A15B" : "3px solid transparent",
                minHeight: 48, // acessibilidade: toque mínimo
                cursor: "pointer",
                width: "100%",
              }}
              aria-current={page === item.id ? "page" : undefined}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Conteúdo principal: padding-top (topbar) + padding-left (sidebar no desktop) ── */}
      <div style={{ paddingTop: 56, paddingBottom: 0 }} className="lg:pl-56">
        <main style={{ minHeight: "calc(100vh - 56px - 56px)" }} className="lg:min-h-[calc(100vh-56px)]">
          {page === "dashboard" && <Dashboard />}
          {page === "patients" && <Patients />}
          {page === "agenda" && <Agenda />}
          {page === "financial" && <Financial />}
          {page === "reports" && <Reports />}
          {page === "settings" && <Settings />}
        </main>
      </div>

      {/* ── Bottom Nav Mobile: acessibilidade para idosas (visível apenas quando a tela diminui) ── */}
      <nav
        className="lapidar-mobile-bottombar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          background: "#5B2333",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.2)",
          alignItems: "center",
          justifyContent: "space-around",
          height: 60,
          padding: "0 4px",
        }}
        aria-label="Navegação móvel"
      >
        {visibleNavItems.slice(0, 6).map((item) => (
          <button
            key={item.id}
            onClick={() => { setPage(item.id); setSidebarOpen(false); }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              height: "100%",
              color: page === item.id ? "#C6A15B" : "rgba(244,239,231,0.6)",
              background: page === item.id ? "rgba(198,161,91,0.15)" : "transparent",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            aria-current={page === item.id ? "page" : undefined}
          >
            <span style={{ fontSize: 20, lineHeight: 1 }}>{item.icon}</span>
            <span style={{ fontSize: 11, fontWeight: page === item.id ? 600 : 400 }}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Espaço compensador do bottom nav no mobile */}
      <div className="lapidar-mobile-bottombar" style={{ height: 60 }} />
    </div>
  );
}
