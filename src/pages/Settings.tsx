import { useState } from "react";

export default function Settings() {
  const [clinicName, setClinicName] = useState("Clínica Lapidar");
  const [doctorName, setDoctorName] = useState("Dra. Andressa Gomide");
  const [crm, setCrm] = useState("CRM DF 29235 · RQE 24717");
  const [email, setEmail] = useState("contato@clinicalapidar.com.br");
  const [phone, setPhone] = useState("(11) 99999-0000");
  const [habitCheckin, setHabitCheckin] = useState(true);
  const [ldlAlert, setLdlAlert] = useState(true);
  const [vitDAlert, setVitDAlert] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div>
        <h2
          className="text-2xl font-normal"
          style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}
        >
          Configurações
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "#9B8B7A" }}>
          Dados da clínica e preferências do sistema
        </p>
      </div>

      {/* Clinic data */}
      <div
        className="rounded-xl p-5 space-y-4"
        style={{ background: "#fff", border: "1px solid #E8E0D0" }}
      >
        <h3 className="text-sm font-semibold" style={{ color: "#5B2333" }}>
          Dados da Clínica
        </h3>
        {[
          { label: "Nome da Clínica", value: clinicName, set: setClinicName },
          { label: "Profissional", value: doctorName, set: setDoctorName },
          { label: "CRM / Registro", value: crm, set: setCrm },
          { label: "E-mail", value: email, set: setEmail },
          { label: "Telefone / WhatsApp", value: phone, set: setPhone },
        ].map((f) => (
          <div key={f.label}>
            <label className="block text-xs font-medium mb-1" style={{ color: "#9B8B7A" }}>
              {f.label}
            </label>
            <input
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-vinho"
              style={{
                background: "#F8F5F0",
                border: "1px solid #E8E0D0",
                color: "#1A1008",
              }}
            />
          </div>
        ))}
      </div>

      {/* Protocols */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#fff", border: "1px solid #E8E0D0" }}
      >
        <h3 className="text-sm font-semibold mb-4" style={{ color: "#5B2333" }}>
          Protocolos Ativos
        </h3>
        <div className="space-y-2">
          {["Lapidar 40+", "Lapidar SOP", "Lapidar Fertilidade", "Pocket"].map((p) => (
            <div
              key={p}
              className="flex items-center justify-between py-2 border-b last:border-0"
              style={{ borderColor: "#F0EAE0" }}
            >
              <span className="text-sm" style={{ color: "#1A1008" }}>
                {p}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "#E8F0E0", color: "#66724A" }}
              >
                Ativo
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div
        className="rounded-xl p-5 space-y-3"
        style={{ background: "#fff", border: "1px solid #E8E0D0" }}
      >
        <h3 className="text-sm font-semibold mb-1" style={{ color: "#5B2333" }}>
          Alertas e Notificações
        </h3>
        {[
          { label: "Check diário de hábitos", sub: "Receber aviso de pacientes sem check", value: habitCheckin, set: setHabitCheckin },
          { label: "Alerta LDL acima da meta", sub: "Notificar quando LDL > meta do protocolo", value: ldlAlert, set: setLdlAlert },
          { label: "Alerta Vitamina D baixa", sub: "Notificar dosagem < 30 ng/mL", value: vitDAlert, set: setVitDAlert },
        ].map((opt) => (
          <div key={opt.label} className="flex items-start justify-between gap-4 py-2 border-b last:border-0" style={{ borderColor: "#F0EAE0" }}>
            <div>
              <p className="text-sm" style={{ color: "#1A1008" }}>{opt.label}</p>
              <p className="text-xs" style={{ color: "#9B8B7A" }}>{opt.sub}</p>
            </div>
            <button
              onClick={() => opt.set(!opt.value)}
              className="relative shrink-0 w-10 h-5 rounded-full transition-all duration-200"
              style={{ background: opt.value ? "#5B2333" : "#E8E0D0" }}
            >
              <div
                className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200"
                style={{ left: opt.value ? "calc(100% - 1.125rem)" : "0.125rem" }}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Ebook */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#fff", border: "1px solid #E8E0D0" }}
      >
        <h3 className="text-sm font-semibold mb-1" style={{ color: "#5B2333" }}>
          Ebook
        </h3>
        <p className="text-xs mb-4" style={{ color: "#9B8B7A" }}>
          Configure o material educativo enviado às pacientes
        </p>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: "#5B2333" }}
          >
            Gerenciar Envios
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: "#F4EFE7", color: "#5B2333", border: "1px solid #E8E0D0" }}
          >
            Ver Postagens
          </button>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: "#5B2333" }}
        >
          Salvar Configurações
        </button>
        {saved && (
          <span className="text-sm" style={{ color: "#66724A" }}>
            ✓ Salvo com sucesso
          </span>
        )}
      </div>
    </div>
  );
}
