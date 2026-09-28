import { useState, useRef } from "react";

type Arquivo = {
  id: number;
  nome: string;
  descricao: string;
  tipo: string;
  tamanho: string;
  data: string;
  enviado: boolean;
  dataEnvio?: string;
};

const tipoIcone: Record<string, string> = {
  "application/pdf": "PDF",
  "image/jpeg": "IMG",
  "image/png":  "IMG",
  default:      "ARQ",
};

const tipoColor: Record<string, { bg: string; text: string }> = {
  PDF: { bg: "#FEE2E2", text: "#991B1B" },
  IMG: { bg: "#DBEAFE", text: "#1D4ED8" },
  ARQ: { bg: "#F0EAE0", text: "#9B8B7A" },
};

const initialArquivos: Record<number, Arquivo[]> = {
  1: [
    { id: 1, nome: "Exames_MarAbrMai_2026.pdf",    descricao: "Hemograma, lipidograma, TSH, vitamina D",  tipo: "application/pdf", tamanho: "1,2 MB", data: "05/03/2026", enviado: true,  dataEnvio: "05/03/2026" },
    { id: 2, nome: "Bioimpedancia_Set_2026.pdf",   descricao: "Relatório InBody da consulta de Set/26",    tipo: "application/pdf", tamanho: "820 KB", data: "02/09/2026", enviado: true,  dataEnvio: "02/09/2026" },
    { id: 3, nome: "Laudo_ECG_2026.pdf",           descricao: "Eletrocardiograma — cardiologista",         tipo: "application/pdf", tamanho: "540 KB", data: "15/08/2026", enviado: false },
  ],
  2: [
    { id: 1, nome: "Hormonal_SOP_Jan2026.pdf",     descricao: "Testosterona, SHBG, DHEA-S, LH, FSH",      tipo: "application/pdf", tamanho: "980 KB", data: "20/01/2026", enviado: true,  dataEnvio: "20/01/2026" },
    { id: 2, nome: "Exames_Set2026.pdf",           descricao: "Lipidograma, insulina, vitamina D, B12",    tipo: "application/pdf", tamanho: "1,1 MB", data: "10/09/2026", enviado: true,  dataEnvio: "10/09/2026" },
  ],
  3: [
    { id: 1, nome: "Exames_Jan2026.pdf",           descricao: "Glicemia, HbA1c, lipidograma completo",     tipo: "application/pdf", tamanho: "1,4 MB", data: "12/01/2026", enviado: true,  dataEnvio: "12/01/2026" },
    { id: 2, nome: "TSH_Levotiroxina_Abr2026.pdf", descricao: "TSH controle pós-início Levotiroxina",      tipo: "application/pdf", tamanho: "310 KB", data: "18/04/2026", enviado: false },
    { id: 3, nome: "Exames_Set2026.pdf",           descricao: "LDL 162, HbA1c 5.8, vitamina D 18",        tipo: "application/pdf", tamanho: "1,2 MB", data: "05/09/2026", enviado: true,  dataEnvio: "05/09/2026" },
  ],
  4: [
    { id: 1, nome: "AMH_FSH_Fev2026.pdf",         descricao: "Reserva ovariana, LH/FSH D3",              tipo: "application/pdf", tamanho: "755 KB", data: "10/02/2026", enviado: true,  dataEnvio: "10/02/2026" },
    { id: 2, nome: "Prog_D21_Set2026.pdf",         descricao: "Progesterona fase lútea D21",              tipo: "application/pdf", tamanho: "280 KB", data: "08/09/2026", enviado: true,  dataEnvio: "08/09/2026" },
  ],
  5: [
    { id: 1, nome: "Lipidograma_Mar2026.pdf",      descricao: "LDL, HDL, TG, VLDL baseline",             tipo: "application/pdf", tamanho: "640 KB", data: "03/03/2026", enviado: true,  dataEnvio: "03/03/2026" },
    { id: 2, nome: "Exames_Set2026.pdf",           descricao: "LDL 96, TSH 2.1, vitamina D 42",           tipo: "application/pdf", tamanho: "870 KB", data: "12/09/2026", enviado: false },
  ],
  6: [
    { id: 1, nome: "Exames_Jun2026.pdf",           descricao: "Exames de base — primeira consulta",        tipo: "application/pdf", tamanho: "1,0 MB", data: "15/06/2026", enviado: true,  dataEnvio: "15/06/2026" },
  ],
};

function readFiles(patientId: number) {
  const demo = initialArquivos[patientId] ?? [];
  try {
    const saved = window.localStorage.getItem(`lapidar-demo-files-${patientId}`);
    if (!saved) return { arquivos: demo, error: null as string | null };
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every((file) => file && typeof file.id === "number" && typeof file.nome === "string" && typeof file.enviado === "boolean")) {
      return { arquivos: demo, error: "A lista local de arquivos está inválida. Um novo envio de demonstração poderá substituí-la." };
    }
    return { arquivos: parsed as Arquivo[], error: null as string | null };
  } catch {
    return { arquivos: demo, error: "Não foi possível ler os arquivos salvos neste navegador." };
  }
}

export default function ArquivosTab({ patientId }: { patientId: number }) {
  const [loaded] = useState(() => readFiles(patientId));
  const [arquivos, setArquivos] = useState<Arquivo[]>(loaded.arquivos);
  const [error, setError] = useState<string | null>(loaded.error);
  const [descricao, setDescricao] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const hoje = () => new Date().toLocaleDateString("pt-BR");

  const saveFiles = (next: Arquivo[]) => {
    try {
      window.localStorage.setItem(`lapidar-demo-files-${patientId}`, JSON.stringify(next));
      setArquivos(next);
      setError(null);
    } catch {
      setError("Não foi possível salvar a lista de arquivos neste navegador.");
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const selected = Array.from(files);
    const valid = selected.filter((file) =>
      ["application/pdf", "image/jpeg", "image/png"].includes(file.type) &&
      file.size <= 20 * 1024 * 1024,
    );
    if (valid.length === 0) {
      setError("Selecione PDFs, JPGs ou PNGs de até 20 MB.");
      return;
    }
    const added = valid.map((file, index): Arquivo => ({
      id: Date.now() + index,
      nome: file.name,
      descricao: descricao || file.name,
      tipo: file.type,
      tamanho: formatBytes(file.size),
      data: hoje(),
      enviado: false,
    }));
    saveFiles([...added, ...arquivos]);
    if (valid.length !== selected.length) setError("Arquivos inválidos ignorados. Os válidos foram adicionados para demonstração.");
    setDescricao("");
  };

  const handleEnviar = (id: number) => {
    saveFiles(arquivos.map((a) => a.id === id ? { ...a, enviado: true, dataEnvio: hoje() } : a));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const getTag = (tipo: string) =>
    tipo.includes("pdf") ? "PDF" : tipo.includes("image") ? "IMG" : "ARQ";

  const enviados   = arquivos.filter((a) => a.enviado);
  const naoEnviados = arquivos.filter((a) => !a.enviado);

  return (
    <div className="space-y-5">

      <p className="text-xs" style={{ color: "#9B8B7A" }}>
        Protótipo: o navegador guarda apenas nomes, descrições e status. Arquivos não são carregados para servidor nem enviados à paciente.
      </p>
      {error && <p role="alert" className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">{error}</p>}

      {/* Upload area */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
        <div className="px-5 py-3 border-b" style={{ borderColor: "#F0EAE0" }}>
          <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}>
            Enviar Arquivo à Paciente
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#9B8B7A" }}>PDF de exames, laudos, protocolos e materiais educativos</p>
        </div>

        <div className="p-5 space-y-4">
          {/* Descrição */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#9B8B7A", fontSize: "0.65rem" }}>
              Descrição (opcional)
            </label>
            <input
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Resultados do exame de sangue de Set/26"
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: "#F8F4EF", border: "1.5px solid #E8E0D0", color: "#1A1008" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#5B2333")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E0D0")}
            />
          </div>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className="rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all py-10"
            style={{
              border: `2px dashed ${dragging ? "#5B2333" : "#D0C8BE"}`,
              background: dragging ? "rgba(91,35,51,0.04)" : "#FDFAF7",
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: dragging ? "rgba(91,35,51,0.1)" : "#F0EAE0" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={dragging ? "#5B2333" : "#C6A15B"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold" style={{ color: "#5B2333" }}>
                {dragging ? "Solte o arquivo aqui" : "Arraste ou clique para selecionar"}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#9B8B7A" }}>PDF, JPG, PNG — até 20 MB por arquivo</p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        </div>
      </div>

      {/* Pendentes de envio */}
      {naoEnviados.length > 0 && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #FEE2E2" }}>
          <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: "#FEE2E2", background: "#FFF5F5" }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#DC2626" }} />
            <h4 className="text-sm font-semibold" style={{ color: "#991B1B" }}>
              Aguardando Envio ({naoEnviados.length})
            </h4>
          </div>
          <div className="divide-y" style={{ borderColor: "#FEF2F2" }}>
            {naoEnviados.map((a) => {
              const tag = getTag(a.tipo);
              const tc = tipoColor[tag];
              return (
                <div key={a.id} className="px-5 py-4 flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: tc.bg, color: tc.text }}
                  >
                    {tag}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: "#1A1008" }}>{a.nome}</p>
                    <p className="text-xs" style={{ color: "#9B8B7A" }}>{a.descricao} · {a.tamanho} · {a.data}</p>
                  </div>
                  <button
                    onClick={() => handleEnviar(a.id)}
                    className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-80"
                    style={{ background: "#5B2333" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Simular envio
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Histórico enviados */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
        <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: "#F0EAE0" }}>
          <h4 className="text-sm font-semibold" style={{ color: "#5B2333" }}>
            Histórico de Arquivos Enviados
          </h4>
          <span className="text-xs px-2.5 py-0.5 rounded-full font-medium" style={{ background: "#E8F0E0", color: "#3D6B2E" }}>
            {enviados.length} arquivo{enviados.length !== 1 ? "s" : ""}
          </span>
        </div>

        {enviados.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm" style={{ color: "#9B8B7A" }}>Nenhum arquivo enviado ainda.</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "#F8F4EF" }}>
            {enviados.map((a) => {
              const tag = getTag(a.tipo);
              const tc = tipoColor[tag];
              return (
                <div key={a.id} className="px-5 py-4 flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: tc.bg, color: tc.text }}
                  >
                    {tag}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: "#1A1008" }}>{a.nome}</p>
                    <p className="text-xs" style={{ color: "#9B8B7A" }}>{a.descricao} · {a.tamanho}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: "#E8F0E0", color: "#3D6B2E" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Enviado
                    </span>
                    {a.dataEnvio && (
                      <p className="text-xs mt-1" style={{ color: "#9B8B7A" }}>{a.dataEnvio}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
