import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { BotaoImprimirResumo } from "./Relatorio";
import RiscoCV from "./RiscoCV";
import { MedicamentosTab, SuplementosTab } from "./TabelaHistorico";
import TimelineTab from "./TimelineTab";
import ArquivosTab from "./ArquivosTab";

export type Patient = {
  id: number;
  nome: string;
  idade: number;
  protocolo: string;
  ativa: boolean;
  ultimaConsulta: string;
  proximaConsulta: string;
  alertas: string[];
  habitos: {
    fibras: boolean;
    proteinas: boolean;
    hidratacao: boolean;
    cardio: boolean;
    musculacao: boolean;
    sono: string;
  };
  telefone?: string;
  cpf?: string;
  dataNascimento?: string;
  objetivo?: string;
  consultaAtual?: string;
  pesoInicial?: number;
  pesoMeta?: number;
  trh?: string;
  contraceptivo?: string;
  observacoes?: string;
  origemLead?: string;
  foto?: string;
};

type BioRow = { data: string; peso: number; gordura: number; musculo: number; agua: number; imc: number };

const bioimpedanciaData: Record<number, BioRow[]> = {
  1: [
    { data: "01/03", peso: 72.4, gordura: 32.1, musculo: 43.2, agua: 51.8, imc: 27.4 },
    { data: "15/03", peso: 71.9, gordura: 31.8, musculo: 43.4, agua: 52.0, imc: 27.2 },
    { data: "01/04", peso: 71.8, gordura: 31.5, musculo: 43.5, agua: 52.1, imc: 27.2 },
    { data: "15/04", peso: 71.2, gordura: 31.1, musculo: 43.7, agua: 52.3, imc: 26.9 },
    { data: "01/05", peso: 70.9, gordura: 30.8, musculo: 43.8, agua: 52.5, imc: 26.8 },
    { data: "15/05", peso: 70.5, gordura: 30.4, musculo: 44.0, agua: 52.8, imc: 26.7 },
    { data: "01/06", peso: 70.2, gordura: 29.9, musculo: 44.1, agua: 53.0, imc: 26.6 },
    { data: "15/06", peso: 69.8, gordura: 29.5, musculo: 44.3, agua: 53.2, imc: 26.4 },
    { data: "01/07", peso: 69.5, gordura: 29.1, musculo: 44.5, agua: 53.4, imc: 26.3 },
    { data: "15/07", peso: 69.1, gordura: 28.7, musculo: 44.6, agua: 53.6, imc: 26.1 },
    { data: "01/08", peso: 68.8, gordura: 28.4, musculo: 44.8, agua: 53.9, imc: 26.0 },
    { data: "15/08", peso: 68.4, gordura: 28.0, musculo: 45.0, agua: 54.1, imc: 25.9 },
    { data: "01/09", peso: 68.1, gordura: 27.6, musculo: 45.2, agua: 54.3, imc: 25.8 },
  ],
  2: [
    { data: "01/03", peso: 80.2, gordura: 38.5, musculo: 40.1, agua: 48.2, imc: 30.1 },
    { data: "15/03", peso: 79.8, gordura: 38.1, musculo: 40.3, agua: 48.4, imc: 29.9 },
    { data: "01/04", peso: 79.4, gordura: 37.8, musculo: 40.4, agua: 48.6, imc: 29.8 },
    { data: "15/04", peso: 79.0, gordura: 37.4, musculo: 40.6, agua: 48.9, imc: 29.6 },
    { data: "01/05", peso: 78.6, gordura: 36.9, musculo: 40.8, agua: 49.1, imc: 29.5 },
    { data: "15/05", peso: 78.3, gordura: 36.5, musculo: 41.0, agua: 49.3, imc: 29.4 },
    { data: "01/06", peso: 77.9, gordura: 36.1, musculo: 41.2, agua: 49.5, imc: 29.2 },
    { data: "15/06", peso: 77.5, gordura: 35.7, musculo: 41.4, agua: 49.8, imc: 29.1 },
    { data: "01/07", peso: 77.1, gordura: 35.3, musculo: 41.6, agua: 49.9, imc: 28.9 },
    { data: "15/07", peso: 76.7, gordura: 34.9, musculo: 41.8, agua: 50.1, imc: 28.8 },
    { data: "01/08", peso: 76.4, gordura: 34.5, musculo: 41.9, agua: 50.4, imc: 28.7 },
    { data: "15/08", peso: 76.1, gordura: 34.2, musculo: 42.1, agua: 50.6, imc: 28.5 },
    { data: "01/09", peso: 75.8, gordura: 33.8, musculo: 42.3, agua: 50.8, imc: 28.4 },
  ],
  3: [
    { data: "01/03", peso: 88.0, gordura: 41.2, musculo: 39.5, agua: 46.1, imc: 33.2 },
    { data: "15/03", peso: 87.7, gordura: 41.0, musculo: 39.6, agua: 46.2, imc: 33.1 },
    { data: "01/04", peso: 87.5, gordura: 40.8, musculo: 39.7, agua: 46.3, imc: 33.0 },
    { data: "15/04", peso: 87.3, gordura: 40.6, musculo: 39.7, agua: 46.4, imc: 33.0 },
    { data: "01/05", peso: 87.1, gordura: 40.5, musculo: 39.8, agua: 46.5, imc: 32.9 },
    { data: "15/05", peso: 86.9, gordura: 40.3, musculo: 39.9, agua: 46.6, imc: 32.8 },
    { data: "01/06", peso: 86.8, gordura: 40.2, musculo: 40.0, agua: 46.7, imc: 32.8 },
    { data: "15/06", peso: 86.6, gordura: 40.0, musculo: 40.1, agua: 46.8, imc: 32.7 },
    { data: "01/07", peso: 86.4, gordura: 39.8, musculo: 40.2, agua: 46.9, imc: 32.6 },
    { data: "15/07", peso: 86.2, gordura: 39.6, musculo: 40.3, agua: 47.0, imc: 32.6 },
    { data: "01/08", peso: 86.0, gordura: 39.4, musculo: 40.5, agua: 47.1, imc: 32.5 },
    { data: "15/08", peso: 85.8, gordura: 39.2, musculo: 40.6, agua: 47.2, imc: 32.4 },
    { data: "01/09", peso: 85.6, gordura: 39.0, musculo: 40.7, agua: 47.3, imc: 32.3 },
  ],
  4: [
    { data: "01/03", peso: 62.0, gordura: 24.5, musculo: 42.0, agua: 56.0, imc: 22.8 },
    { data: "01/04", peso: 61.5, gordura: 23.9, musculo: 42.3, agua: 56.4, imc: 22.6 },
    { data: "01/05", peso: 61.2, gordura: 23.3, musculo: 42.6, agua: 56.8, imc: 22.5 },
    { data: "01/06", peso: 60.8, gordura: 22.7, musculo: 43.0, agua: 57.2, imc: 22.4 },
    { data: "01/07", peso: 60.4, gordura: 22.1, musculo: 43.3, agua: 57.6, imc: 22.2 },
    { data: "01/08", peso: 60.1, gordura: 21.6, musculo: 43.6, agua: 58.0, imc: 22.1 },
    { data: "01/09", peso: 59.8, gordura: 21.1, musculo: 43.9, agua: 58.4, imc: 22.0 },
  ],
  5: [
    { data: "01/03", peso: 68.0, gordura: 29.0, musculo: 43.0, agua: 52.0, imc: 25.8 },
    { data: "01/04", peso: 67.6, gordura: 28.5, musculo: 43.2, agua: 52.3, imc: 25.6 },
    { data: "01/05", peso: 67.2, gordura: 28.0, musculo: 43.5, agua: 52.6, imc: 25.5 },
    { data: "01/06", peso: 66.8, gordura: 27.4, musculo: 43.8, agua: 53.0, imc: 25.3 },
    { data: "01/07", peso: 66.4, gordura: 26.9, musculo: 44.1, agua: 53.3, imc: 25.1 },
    { data: "01/08", peso: 66.0, gordura: 26.3, musculo: 44.4, agua: 53.7, imc: 25.0 },
    { data: "01/09", peso: 65.7, gordura: 25.8, musculo: 44.7, agua: 54.1, imc: 24.9 },
  ],
  6: [
    { data: "01/03", peso: 75.0, gordura: 34.0, musculo: 41.5, agua: 50.0, imc: 28.5 },
    { data: "01/06", peso: 74.2, gordura: 33.2, musculo: 41.8, agua: 50.5, imc: 28.2 },
    { data: "01/09", peso: 73.5, gordura: 32.5, musculo: 42.1, agua: 51.0, imc: 27.9 },
  ],
};

// ─── SCORE LAPIDAR ───────────────────────────────────────────────────────────

type ScoreEntry = {
  data: string;
  saciedade: number; fome: number; energia: number; sono: number; humor: number;
  libido: number; fogachos: number; perdaUrinaria: number; constipacao: number; adesao: number;
};

const scoreLabels: { key: keyof Omit<ScoreEntry, "data">; label: string; lowerIsBetter?: boolean }[] = [
  { key: "saciedade", label: "Saciedade" },
  { key: "energia", label: "Energia" },
  { key: "sono", label: "Sono" },
  { key: "humor", label: "Humor" },
  { key: "libido", label: "Libido" },
  { key: "adesao", label: "Adesão" },
  { key: "fome", label: "Fome", lowerIsBetter: true },
  { key: "fogachos", label: "Fogachos", lowerIsBetter: true },
  { key: "perdaUrinaria", label: "Perda urinária", lowerIsBetter: true },
  { key: "constipacao", label: "Constipação", lowerIsBetter: true },
];

const scoreData: Record<number, ScoreEntry[]> = {
  1: [
    { data: "Mar/26", saciedade: 5, fome: 7, energia: 4, sono: 5, humor: 5, libido: 4, fogachos: 6, perdaUrinaria: 3, constipacao: 4, adesao: 5 },
    { data: "Jun/26", saciedade: 7, fome: 5, energia: 6, sono: 7, humor: 7, libido: 5, fogachos: 4, perdaUrinaria: 2, constipacao: 2, adesao: 7 },
    { data: "Set/26", saciedade: 8, fome: 3, energia: 8, sono: 8, humor: 8, libido: 7, fogachos: 2, perdaUrinaria: 1, constipacao: 1, adesao: 9 },
  ],
  2: [
    { data: "Mar/26", saciedade: 4, fome: 8, energia: 3, sono: 4, humor: 4, libido: 3, fogachos: 2, perdaUrinaria: 2, constipacao: 6, adesao: 5 },
    { data: "Jun/26", saciedade: 6, fome: 6, energia: 5, sono: 6, humor: 6, libido: 5, fogachos: 1, perdaUrinaria: 1, constipacao: 4, adesao: 7 },
    { data: "Set/26", saciedade: 7, fome: 4, energia: 7, sono: 7, humor: 7, libido: 6, fogachos: 1, perdaUrinaria: 1, constipacao: 2, adesao: 8 },
  ],
  3: [
    { data: "Mar/26", saciedade: 3, fome: 9, energia: 2, sono: 3, humor: 3, libido: 2, fogachos: 8, perdaUrinaria: 6, constipacao: 7, adesao: 3 },
    { data: "Jun/26", saciedade: 5, fome: 7, energia: 4, sono: 5, humor: 5, libido: 4, fogachos: 6, perdaUrinaria: 4, constipacao: 5, adesao: 5 },
    { data: "Set/26", saciedade: 6, fome: 5, energia: 6, sono: 6, humor: 6, libido: 5, fogachos: 4, perdaUrinaria: 3, constipacao: 3, adesao: 7 },
  ],
  4: [
    { data: "Mar/26", saciedade: 7, fome: 4, energia: 7, sono: 7, humor: 7, libido: 7, fogachos: 1, perdaUrinaria: 1, constipacao: 2, adesao: 8 },
    { data: "Jun/26", saciedade: 8, fome: 3, energia: 8, sono: 8, humor: 8, libido: 8, fogachos: 1, perdaUrinaria: 1, constipacao: 1, adesao: 9 },
    { data: "Set/26", saciedade: 9, fome: 2, energia: 9, sono: 9, humor: 9, libido: 9, fogachos: 0, perdaUrinaria: 0, constipacao: 1, adesao: 10 },
  ],
  5: [
    { data: "Mar/26", saciedade: 6, fome: 5, energia: 6, sono: 6, humor: 6, libido: 6, fogachos: 2, perdaUrinaria: 2, constipacao: 3, adesao: 7 },
    { data: "Jun/26", saciedade: 7, fome: 4, energia: 7, sono: 7, humor: 7, libido: 7, fogachos: 1, perdaUrinaria: 1, constipacao: 2, adesao: 8 },
    { data: "Set/26", saciedade: 8, fome: 3, energia: 8, sono: 8, humor: 8, libido: 7, fogachos: 1, perdaUrinaria: 1, constipacao: 1, adesao: 9 },
  ],
  6: [
    { data: "Mar/26", saciedade: 5, fome: 6, energia: 5, sono: 5, humor: 5, libido: 4, fogachos: 5, perdaUrinaria: 4, constipacao: 5, adesao: 4 },
    { data: "Set/26", saciedade: 6, fome: 5, energia: 6, sono: 6, humor: 6, libido: 5, fogachos: 4, perdaUrinaria: 3, constipacao: 4, adesao: 5 },
  ],
};

// ─── EXAMES ──────────────────────────────────────────────────────────────────

type ExameEntry = {
  nome: string;
  unidade: string;
  meta: string;
  metaNum?: { min?: number; max?: number };
  atual?: number;
  anterior?: number;
  data?: string;
  grupo: string;
};

type ExamesRecord = { data: string; exames: ExameEntry[] };

function avaliarExame(e: ExameEntry): "verde" | "amarelo" | "vermelho" | "neutro" {
  if (e.atual === undefined || !e.metaNum) return "neutro";
  const { min, max } = e.metaNum;
  const v = e.atual;
  const ok = (min === undefined || v >= min) && (max === undefined || v <= max);
  if (ok) return "verde";
  const warnMin = min !== undefined ? min * 0.85 : undefined;
  const warnMax = max !== undefined ? max * 1.15 : undefined;
  const warn = (warnMin === undefined || v >= warnMin) && (warnMax === undefined || v <= warnMax);
  return warn ? "amarelo" : "vermelho";
}

const statusColors = {
  verde: { bg: "#E8F0E0", text: "#3D6B2E", dot: "#66724A" },
  amarelo: { bg: "#FEF3C7", text: "#92610A", dot: "#D97706" },
  vermelho: { bg: "#FEE2E2", text: "#991B1B", dot: "#DC2626" },
  neutro: { bg: "#F0EAE0", text: "#9B8B7A", dot: "#C0B09A" },
};

const examesBase: ExameEntry[] = [
  // Cardiovascular
  { grupo: "Cardiovascular", nome: "LDL", unidade: "mg/dL", meta: "< 100", metaNum: { max: 100 } },
  { grupo: "Cardiovascular", nome: "HDL", unidade: "mg/dL", meta: "> 50", metaNum: { min: 50 } },
  { grupo: "Cardiovascular", nome: "Triglicerídeos", unidade: "mg/dL", meta: "< 150", metaNum: { max: 150 } },
  { grupo: "Cardiovascular", nome: "ApoB", unidade: "mg/dL", meta: "< 80", metaNum: { max: 80 } },
  { grupo: "Cardiovascular", nome: "Lp(a)", unidade: "mg/dL", meta: "< 30", metaNum: { max: 30 } },
  { grupo: "Metabólico", nome: "HbA1c", unidade: "%", meta: "< 5,7%", metaNum: { max: 5.7 } },
  { grupo: "Metabólico", nome: "Insulina", unidade: "µUI/mL", meta: "< 10", metaNum: { max: 10 } },
  { grupo: "Metabólico", nome: "Glicemia", unidade: "mg/dL", meta: "70–99", metaNum: { min: 70, max: 99 } },
  { grupo: "Micronutrientes", nome: "Vitamina D", unidade: "ng/mL", meta: "> 40", metaNum: { min: 40 } },
  { grupo: "Micronutrientes", nome: "Vitamina B12", unidade: "pg/mL", meta: "> 400", metaNum: { min: 400 } },
  { grupo: "Micronutrientes", nome: "Ferritina", unidade: "ng/mL", meta: "50–200", metaNum: { min: 50, max: 200 } },
  { grupo: "Inflamatório", nome: "Homocisteína", unidade: "µmol/L", meta: "< 10", metaNum: { max: 10 } },
  { grupo: "Inflamatório", nome: "PCR-us", unidade: "mg/L", meta: "< 1", metaNum: { max: 1 } },
  { grupo: "Hepático/Renal", nome: "TGO", unidade: "U/L", meta: "< 36", metaNum: { max: 36 } },
  { grupo: "Hepático/Renal", nome: "TGP", unidade: "U/L", meta: "< 40", metaNum: { max: 40 } },
  { grupo: "Hepático/Renal", nome: "Creatinina", unidade: "mg/dL", meta: "0,5–1,1", metaNum: { min: 0.5, max: 1.1 } },
  { grupo: "Tireóide", nome: "TSH", unidade: "mUI/L", meta: "0,4–2,5", metaNum: { min: 0.4, max: 2.5 } },
  { grupo: "Tireóide", nome: "T4 Livre", unidade: "ng/dL", meta: "0,8–1,8", metaNum: { min: 0.8, max: 1.8 } },
  { grupo: "Hormonal", nome: "Estradiol", unidade: "pg/mL", meta: "30–400", metaNum: { min: 30, max: 400 } },
  { grupo: "Hormonal", nome: "Progesterona", unidade: "ng/mL", meta: "1–25", metaNum: { min: 1, max: 25 } },
  { grupo: "Hormonal", nome: "Testosterona", unidade: "ng/dL", meta: "15–70", metaNum: { min: 15, max: 70 } },
  { grupo: "Hormonal", nome: "SHBG", unidade: "nmol/L", meta: "18–114", metaNum: { min: 18, max: 114 } },
];

const examesData: Record<number, ExamesRecord> = {
  1: {
    data: "Set/26", exames: [
      { ...examesBase[0], atual: 148, anterior: 155, data: "Set/26" },
      { ...examesBase[1], atual: 52, anterior: 48, data: "Set/26" },
      { ...examesBase[2], atual: 168, anterior: 185, data: "Set/26" },
      { ...examesBase[3], atual: 95, anterior: 105, data: "Set/26" },
      { ...examesBase[4], atual: 18, anterior: 20, data: "Set/26" },
      { ...examesBase[5], atual: 5.4, anterior: 5.6, data: "Set/26" },
      { ...examesBase[6], atual: 8, anterior: 11, data: "Set/26" },
      { ...examesBase[7], atual: 92, anterior: 98, data: "Set/26" },
      { ...examesBase[8], atual: 28, anterior: 22, data: "Set/26" },
      { ...examesBase[9], atual: 380, anterior: 350, data: "Set/26" },
      { ...examesBase[10], atual: 65, anterior: 55, data: "Set/26" },
      { ...examesBase[11], atual: 9.5, anterior: 11, data: "Set/26" },
      { ...examesBase[12], atual: 0.8, anterior: 1.2, data: "Set/26" },
      { ...examesBase[13], atual: 28, anterior: 30, data: "Set/26" },
      { ...examesBase[14], atual: 32, anterior: 35, data: "Set/26" },
      { ...examesBase[15], atual: 0.85, anterior: 0.82, data: "Set/26" },
      { ...examesBase[16], atual: 1.8, anterior: 2.1, data: "Set/26" },
      { ...examesBase[17], atual: 1.1, anterior: 1.0, data: "Set/26" },
      { ...examesBase[18], atual: 85, anterior: 72, data: "Set/26" },
      { ...examesBase[19], atual: 8.5, anterior: 7.0, data: "Set/26" },
      { ...examesBase[20], atual: 38, anterior: 32, data: "Set/26" },
      { ...examesBase[21], atual: 55, anterior: 50, data: "Set/26" },
    ]
  },
  2: {
    data: "Set/26", exames: [
      { ...examesBase[0], atual: 124, anterior: 130, data: "Set/26" },
      { ...examesBase[1], atual: 45, anterior: 42, data: "Set/26" },
      { ...examesBase[2], atual: 130, anterior: 145, data: "Set/26" },
      { ...examesBase[3], atual: 78, anterior: 85, data: "Set/26" },
      { ...examesBase[4], atual: 22, anterior: 25, data: "Set/26" },
      { ...examesBase[5], atual: 5.2, anterior: 5.3, data: "Set/26" },
      { ...examesBase[6], atual: 12, anterior: 15, data: "Set/26" },
      { ...examesBase[7], atual: 96, anterior: 100, data: "Set/26" },
      { ...examesBase[8], atual: 22, anterior: 18, data: "Set/26" },
      { ...examesBase[9], atual: 310, anterior: 280, data: "Set/26" },
      { ...examesBase[10], atual: 45, anterior: 38, data: "Set/26" },
      { ...examesBase[11], atual: 11, anterior: 12, data: "Set/26" },
      { ...examesBase[12], atual: 1.4, anterior: 1.8, data: "Set/26" },
      { ...examesBase[13], atual: 30, anterior: 32, data: "Set/26" },
      { ...examesBase[14], atual: 35, anterior: 38, data: "Set/26" },
      { ...examesBase[15], atual: 0.9, anterior: 0.88, data: "Set/26" },
      { ...examesBase[16], atual: 2.2, anterior: 2.5, data: "Set/26" },
      { ...examesBase[17], atual: 1.2, anterior: 1.1, data: "Set/26" },
      { ...examesBase[18], atual: 55, anterior: 48, data: "Set/26" },
      { ...examesBase[19], atual: 6.0, anterior: 5.5, data: "Set/26" },
      { ...examesBase[20], atual: 30, anterior: 28, data: "Set/26" },
      { ...examesBase[21], atual: 42, anterior: 38, data: "Set/26" },
    ]
  },
  3: {
    data: "Set/26", exames: [
      { ...examesBase[0], atual: 162, anterior: 170, data: "Set/26" },
      { ...examesBase[1], atual: 44, anterior: 41, data: "Set/26" },
      { ...examesBase[2], atual: 210, anterior: 225, data: "Set/26" },
      { ...examesBase[3], atual: 105, anterior: 115, data: "Set/26" },
      { ...examesBase[4], atual: 28, anterior: 30, data: "Set/26" },
      { ...examesBase[5], atual: 5.8, anterior: 6.0, data: "Set/26" },
      { ...examesBase[6], atual: 14, anterior: 18, data: "Set/26" },
      { ...examesBase[7], atual: 105, anterior: 112, data: "Set/26" },
      { ...examesBase[8], atual: 18, anterior: 15, data: "Set/26" },
      { ...examesBase[9], atual: 280, anterior: 255, data: "Set/26" },
      { ...examesBase[10], atual: 38, anterior: 30, data: "Set/26" },
      { ...examesBase[11], atual: 14, anterior: 16, data: "Set/26" },
      { ...examesBase[12], atual: 2.1, anterior: 2.5, data: "Set/26" },
      { ...examesBase[13], atual: 42, anterior: 45, data: "Set/26" },
      { ...examesBase[14], atual: 48, anterior: 52, data: "Set/26" },
      { ...examesBase[15], atual: 0.92, anterior: 0.90, data: "Set/26" },
      { ...examesBase[16], atual: 3.8, anterior: 4.2, data: "Set/26" },
      { ...examesBase[17], atual: 0.9, anterior: 0.85, data: "Set/26" },
      { ...examesBase[18], atual: 25, anterior: 20, data: "Set/26" },
      { ...examesBase[19], atual: 3.5, anterior: 3.0, data: "Set/26" },
      { ...examesBase[20], atual: 28, anterior: 25, data: "Set/26" },
      { ...examesBase[21], atual: 38, anterior: 35, data: "Set/26" },
    ]
  },
  4: {
    data: "Set/26", exames: [
      { ...examesBase[0], atual: 88, anterior: 92, data: "Set/26" },
      { ...examesBase[1], atual: 62, anterior: 58, data: "Set/26" },
      { ...examesBase[2], atual: 95, anterior: 110, data: "Set/26" },
      { ...examesBase[3], atual: 68, anterior: 74, data: "Set/26" },
      { ...examesBase[4], atual: 12, anterior: 14, data: "Set/26" },
      { ...examesBase[5], atual: 5.1, anterior: 5.2, data: "Set/26" },
      { ...examesBase[6], atual: 7, anterior: 9, data: "Set/26" },
      { ...examesBase[7], atual: 85, anterior: 88, data: "Set/26" },
      { ...examesBase[8], atual: 48, anterior: 40, data: "Set/26" },
      { ...examesBase[9], atual: 450, anterior: 420, data: "Set/26" },
      { ...examesBase[10], atual: 72, anterior: 65, data: "Set/26" },
      { ...examesBase[11], atual: 8.0, anterior: 8.5, data: "Set/26" },
      { ...examesBase[12], atual: 0.5, anterior: 0.6, data: "Set/26" },
      { ...examesBase[13], atual: 22, anterior: 24, data: "Set/26" },
      { ...examesBase[14], atual: 25, anterior: 28, data: "Set/26" },
      { ...examesBase[15], atual: 0.82, anterior: 0.84, data: "Set/26" },
      { ...examesBase[16], atual: 1.5, anterior: 1.6, data: "Set/26" },
      { ...examesBase[17], atual: 1.2, anterior: 1.1, data: "Set/26" },
      { ...examesBase[18], atual: 180, anterior: 160, data: "Set/26" },
      { ...examesBase[19], atual: 15, anterior: 12, data: "Set/26" },
      { ...examesBase[20], atual: 42, anterior: 38, data: "Set/26" },
      { ...examesBase[21], atual: 68, anterior: 62, data: "Set/26" },
    ]
  },
  5: {
    data: "Set/26", exames: [
      { ...examesBase[0], atual: 96, anterior: 102, data: "Set/26" },
      { ...examesBase[1], atual: 58, anterior: 55, data: "Set/26" },
      { ...examesBase[2], atual: 118, anterior: 130, data: "Set/26" },
      { ...examesBase[3], atual: 72, anterior: 80, data: "Set/26" },
      { ...examesBase[4], atual: 16, anterior: 18, data: "Set/26" },
      { ...examesBase[5], atual: 5.3, anterior: 5.4, data: "Set/26" },
      { ...examesBase[6], atual: 9, anterior: 11, data: "Set/26" },
      { ...examesBase[7], atual: 90, anterior: 95, data: "Set/26" },
      { ...examesBase[8], atual: 42, anterior: 36, data: "Set/26" },
      { ...examesBase[9], atual: 420, anterior: 390, data: "Set/26" },
      { ...examesBase[10], atual: 60, anterior: 52, data: "Set/26" },
      { ...examesBase[11], atual: 9.0, anterior: 9.5, data: "Set/26" },
      { ...examesBase[12], atual: 0.7, anterior: 0.9, data: "Set/26" },
      { ...examesBase[13], atual: 24, anterior: 26, data: "Set/26" },
      { ...examesBase[14], atual: 28, anterior: 30, data: "Set/26" },
      { ...examesBase[15], atual: 0.88, anterior: 0.86, data: "Set/26" },
      { ...examesBase[16], atual: 2.0, anterior: 2.2, data: "Set/26" },
      { ...examesBase[17], atual: 1.4, anterior: 1.3, data: "Set/26" },
      { ...examesBase[18], atual: 110, anterior: 95, data: "Set/26" },
      { ...examesBase[19], atual: 10, anterior: 8.5, data: "Set/26" },
      { ...examesBase[20], atual: 35, anterior: 30, data: "Set/26" },
      { ...examesBase[21], atual: 52, anterior: 46, data: "Set/26" },
    ]
  },
  6: { data: "Set/26", exames: examesBase.map((e) => ({ ...e })) },
};

// ─── METRICS ─────────────────────────────────────────────────────────────────

type MetricDef = {
  key: keyof Omit<BioRow, "data">;
  label: string;
  unit: string;
  color: string;
  lowerIsBetter: boolean;
  meta: number;
  metaLabel: string;
};

const metrics: MetricDef[] = [
  { key: "peso", label: "Peso", unit: "kg", color: "#5B2333", lowerIsBetter: true, meta: 65, metaLabel: "Meta: 65 kg" },
  { key: "gordura", label: "Gordura", unit: "%", color: "#C6A15B", lowerIsBetter: true, meta: 24, metaLabel: "Meta: < 24%" },
  { key: "musculo", label: "Músculo", unit: "kg", color: "#66724A", lowerIsBetter: false, meta: 47, metaLabel: "Meta: 47 kg" },
  { key: "agua", label: "Água", unit: "%", color: "#3B82F6", lowerIsBetter: false, meta: 56, metaLabel: "Meta: > 56%" },
  { key: "imc", label: "IMC", unit: "", color: "#7A3047", lowerIsBetter: true, meta: 24.9, metaLabel: "Meta: < 24,9" },
];

function MetricCard({ metric, history }: { metric: MetricDef; history: BioRow[] }) {
  const latest = history[history.length - 1];
  const first = history[0];
  const current = latest[metric.key];
  const delta = +(current - first[metric.key]).toFixed(1);
  const isImprovement = metric.lowerIsBetter ? delta < 0 : delta > 0;
  const deltaColor = delta === 0 ? "#9B8B7A" : isImprovement ? "#66724A" : "#B91C1C";

  // Progress toward goal
  let progress = 0;
  if (metric.lowerIsBetter) {
    const start = first[metric.key];
    const goal = metric.meta;
    if (start > goal) {
      progress = Math.min(100, Math.max(0, ((start - current) / (start - goal)) * 100));
    } else {
      progress = 100;
    }
  } else {
    const start = first[metric.key];
    const goal = metric.meta;
    if (start < goal) {
      progress = Math.min(100, Math.max(0, ((current - start) / (goal - start)) * 100));
    } else {
      progress = 100;
    }
  }

  const chartData = history.map((r) => ({ data: r.data, valor: r[metric.key] }));
  const vals = chartData.map((d) => d.valor);
  const minV = Math.min(...vals, metric.meta);
  const maxV = Math.max(...vals, metric.meta);
  const pad = (maxV - minV) * 0.2 || 1;

  // Width: at least 80px per data point so there's always room to scroll
  const chartWidth = Math.max(chartData.length * 80, 600);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "#fff", border: "1px solid #E8E0D0" }}
    >
      {/* Header */}
      <div className="px-6 pt-5 pb-4 flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#9B8B7A" }}>
            {metric.label}
          </p>
          <div className="flex items-end gap-2">
            <span
              className="text-4xl font-semibold leading-none"
              style={{ fontFamily: "var(--font-serif)", color: metric.color }}
            >
              {current.toLocaleString("pt-BR")}
            </span>
            {metric.unit && (
              <span className="text-lg mb-0.5" style={{ color: "#9B8B7A" }}>
                {metric.unit}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <span
            className="text-sm font-semibold block"
            style={{ color: deltaColor }}
          >
            {delta > 0 ? "+" : ""}{delta.toLocaleString("pt-BR")}{metric.unit ? " " + metric.unit : ""}
          </span>
          <span className="text-xs" style={{ color: "#9B8B7A" }}>vs. início</span>
        </div>
      </div>

      {/* Chart — horizontal scroll */}
      <div
        style={{
          overflowX: "auto",
          overflowY: "visible",
          WebkitOverflowScrolling: "touch",
          paddingBottom: 2,
        }}
      >
        <div style={{ width: chartWidth, flexShrink: 0 }}>
          <LineChart
            width={chartWidth}
            height={200}
            data={chartData}
            margin={{ top: 12, right: 48, left: 4, bottom: 8 }}
          >
            <defs>
              <linearGradient id={`grad-${metric.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={metric.color} stopOpacity={0.12} />
                <stop offset="100%" stopColor={metric.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="data"
              tick={{ fontSize: 10, fill: "#9B8B7A" }}
              axisLine={false}
              tickLine={false}
              interval={0}
              height={28}
            />
            <YAxis
              domain={[minV - pad, maxV + pad]}
              tick={{ fontSize: 10, fill: "#9B8B7A" }}
              axisLine={false}
              tickLine={false}
              width={52}
              tickFormatter={(v) => `${Number(v).toFixed(metric.key === "imc" ? 1 : 0)}${metric.unit}`}
            />
            <Tooltip
              formatter={(v) => [`${Number(v).toLocaleString("pt-BR")}${metric.unit ? " " + metric.unit : ""}`, metric.label]}
              contentStyle={{
                background: "#fff",
                border: "1px solid #E8E0D0",
                borderRadius: 10,
                fontSize: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              labelStyle={{ color: "#9B8B7A", fontSize: 11, marginBottom: 2 }}
            />
            <ReferenceLine
              y={metric.meta}
              stroke={metric.color}
              strokeDasharray="6 3"
              strokeOpacity={0.4}
              label={{ value: metric.metaLabel, position: "insideTopRight", fontSize: 10, fill: metric.color, opacity: 0.6 }}
            />
            <Line
              type="monotone"
              dataKey="valor"
              stroke={metric.color}
              strokeWidth={2.5}
              dot={{ fill: metric.color, r: 4, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: metric.color, stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 pb-5 pt-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium" style={{ color: "#9B8B7A" }}>
            Cumprimento da meta
          </span>
          <span className="text-xs font-semibold" style={{ color: metric.color }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#F0EAE0" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: progress >= 80
                ? "#66724A"
                : progress >= 40
                  ? metric.color
                  : "#C6A15B",
            }}
          />
        </div>
        <p className="text-xs mt-1" style={{ color: "#9B8B7A" }}>
          {metric.metaLabel}
        </p>
      </div>
    </div>
  );
}

// ─── SCORE LAPIDAR COMPONENT ──────────────────────────────────────────────────

function ScoreLapidar({ patientId }: { patientId: number }) {
  const entries = scoreData[patientId] ?? [];
  if (!entries.length) return <p className="text-sm text-center py-8" style={{ color: "#9B8B7A" }}>Sem dados de Score Lapidar.</p>;

  const first = entries[0];
  const last = entries[entries.length - 1];

  // Radar inverts lowerIsBetter metrics so high = good on chart
  const toRadar = (e: ScoreEntry) =>
    scoreLabels.map(({ key, label, lowerIsBetter }) => ({
      label,
      inicial: lowerIsBetter ? 10 - first[key] : first[key],
      atual: lowerIsBetter ? 10 - last[key] : last[key],
    }));

  const radarData = toRadar(first);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
      <div className="px-6 pt-5 pb-3 border-b flex items-center justify-between" style={{ borderColor: "#F0EAE0" }}>
        <div>
          <h3 className="text-base font-semibold" style={{ fontFamily: "var(--font-serif)", color: "#5B2333" }}>
            Score Lapidar
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#9B8B7A" }}>Escala 0–10 · Radar de evolução</p>
        </div>
        <div className="flex items-center gap-4 text-xs" style={{ color: "#9B8B7A" }}>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded inline-block" style={{ background: "#C6A15B" }} /> Inicial
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded inline-block" style={{ background: "#5B2333" }} /> Atual
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-4 px-4 py-4">
        {/* Radar */}
        <div className="shrink-0" style={{ width: 340, height: 300 }}>
          <RadarChart cx={170} cy={150} outerRadius={110} width={340} height={300} data={radarData}>
            <PolarGrid stroke="#E8E0D0" />
            <PolarAngleAxis dataKey="label" tick={{ fontSize: 10, fill: "#9B8B7A" }} />
            <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
            <Radar name="Inicial" dataKey="inicial" stroke="#C6A15B" fill="#C6A15B" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 2" />
            <Radar name="Atual" dataKey="atual" stroke="#5B2333" fill="#5B2333" fillOpacity={0.15} strokeWidth={2} />
            <Tooltip
              formatter={(v) => [Number(v), String(v)]}
              contentStyle={{ background: "#fff", border: "1px solid #E8E0D0", borderRadius: 8, fontSize: 11 }}
            />
          </RadarChart>
        </div>

        {/* Score cards grid */}
        <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {scoreLabels.map(({ key, label, lowerIsBetter }) => {
            const vAtual = last[key];
            const vInicial = first[key];
            const delta = vAtual - vInicial;
            const improved = lowerIsBetter ? delta < 0 : delta > 0;
            const unchanged = delta === 0;
            const pct = (vAtual / 10) * 100;
            const barColor = vAtual >= 7 ? "#66724A" : vAtual >= 4 ? "#C6A15B" : "#DC2626";
            const deltaColor = unchanged ? "#9B8B7A" : improved ? "#66724A" : "#DC2626";
            return (
              <div key={key} className="rounded-xl px-3 py-2.5" style={{ background: "#F8F4EF", border: "1px solid #F0EAE0" }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium" style={{ color: "#5B2333" }}>{label}</span>
                  <span className="text-xs font-semibold" style={{ color: deltaColor }}>
                    {unchanged ? "=" : delta > 0 ? `+${delta}` : delta}
                  </span>
                </div>
                <div className="flex items-end gap-2 mb-1.5">
                  <span className="text-lg font-bold leading-none" style={{ color: barColor }}>{vAtual}</span>
                  <span className="text-xs mb-0.5" style={{ color: "#9B8B7A" }}>/10</span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: "#E8E0D0" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: barColor }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Line charts per metric */}
      {entries.length > 1 && (
        <div className="px-5 pb-5 pt-2 border-t" style={{ borderColor: "#F0EAE0" }}>
          <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "#9B8B7A", fontSize: "0.65rem" }}>
            Evolução por consulta
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {scoreLabels.map(({ key, label }) => {
              const chartData = entries.map((e) => ({ data: e.data, v: e[key] }));
              return (
                <div key={key} className="rounded-xl p-3" style={{ background: "#F8F4EF" }}>
                  <p className="text-xs font-medium mb-2" style={{ color: "#5B2333" }}>{label}</p>
                  <LineChart width={110} height={55} data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <Line type="monotone" dataKey="v" stroke="#5B2333" strokeWidth={1.8} dot={{ r: 2.5, fill: "#5B2333" }} />
                    <YAxis domain={[0, 10]} hide />
                    <XAxis dataKey="data" hide />
                    <Tooltip
                      formatter={(v) => [Number(v), label]}
                      contentStyle={{ fontSize: 11, background: "#fff", border: "1px solid #E8E0D0", borderRadius: 8 }}
                      labelStyle={{ color: "#9B8B7A" }}
                    />
                  </LineChart>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PAINEL EXAMES COMPONENT ──────────────────────────────────────────────────

function PainelExames({ patientId }: { patientId: number }) {
  const record = examesData[patientId];
  const exames = record?.exames ?? [];

  const grupos = Array.from(new Set(examesBase.map((e) => e.grupo)));

  return (
    <div className="space-y-4">
      {grupos.map((grupo) => {
        const lista = exames.filter((e) => e.grupo === grupo);
        if (!lista.length) return null;
        return (
          <div key={grupo} className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
            <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: "#F0EAE0", background: "#F8F4EF" }}>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#5B2333", letterSpacing: "0.08em" }}>
                {grupo}
              </span>
              {/* summary dots */}
              <div className="flex items-center gap-1 ml-auto">
                {lista.map((e, i) => {
                  const st = avaliarExame(e);
                  return <div key={i} className="w-2 h-2 rounded-full" style={{ background: statusColors[st].dot }} />;
                })}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#FDFAF7" }}>
                    {["Exame", "Atual", "Anterior", "Δ", "Meta", "Status", "Data"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold" style={{ color: "#9B8B7A", whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lista.map((e, i) => {
                    const st = avaliarExame(e);
                    const sc = statusColors[st];
                    const delta = e.atual !== undefined && e.anterior !== undefined
                      ? +(e.atual - e.anterior).toFixed(2)
                      : undefined;
                    const deltaStr = delta === undefined ? "—"
                      : delta === 0 ? "="
                        : delta > 0 ? `+${delta}` : `${delta}`;
                    const deltaColor = delta === undefined ? "#9B8B7A"
                      : delta === 0 ? "#9B8B7A"
                        : delta > 0 ? "#DC2626" : "#66724A";
                    return (
                      <tr key={i} className="border-t" style={{ borderColor: "#F8F4EF" }}>
                        <td className="px-4 py-3 font-medium text-xs" style={{ color: "#1A1008", whiteSpace: "nowrap" }}>
                          {e.nome}
                        </td>
                        <td className="px-4 py-3 font-bold text-sm" style={{ color: e.atual !== undefined ? "#1A1008" : "#9B8B7A" }}>
                          {e.atual !== undefined ? `${e.atual} ${e.unidade}` : "—"}
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: "#9B8B7A" }}>
                          {e.anterior !== undefined ? `${e.anterior} ${e.unidade}` : "—"}
                        </td>
                        <td className="px-4 py-3 text-xs font-semibold" style={{ color: deltaColor }}>
                          {deltaStr}
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: "#9B8B7A", whiteSpace: "nowrap" }}>
                          {e.meta}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1.5 w-fit"
                            style={{ background: sc.bg, color: sc.text }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: sc.dot }} />
                            {st === "verde" ? "Normal" : st === "amarelo" ? "Atenção" : st === "vermelho" ? "Alterado" : "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: "#9B8B7A" }}>
                          {e.data ?? "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mini charts for this group */}
            <div className="px-5 pb-4 pt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 border-t" style={{ borderColor: "#F0EAE0" }}>
              {lista.map((e, i) => {
                const st = avaliarExame(e);
                const sc = statusColors[st];
                if (e.atual === undefined || e.anterior === undefined) return null;
                const chartData = [
                  { label: "Ant.", v: e.anterior },
                  { label: "Atu.", v: e.atual },
                ];
                return (
                  <div key={i} className="rounded-xl p-2.5" style={{ background: "#F8F4EF", border: "1px solid #F0EAE0" }}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium leading-tight" style={{ color: "#5B2333" }}>{e.nome}</p>
                      <span className="w-2 h-2 rounded-full" style={{ background: sc.dot }} />
                    </div>
                    <LineChart width={120} height={48} data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                      <Line type="monotone" dataKey="v" stroke={sc.dot} strokeWidth={2} dot={{ r: 3, fill: sc.dot, stroke: "#fff", strokeWidth: 1.5 }} />
                      <XAxis dataKey="label" tick={{ fontSize: 9, fill: "#9B8B7A" }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        formatter={(v) => [`${Number(v)} ${e.unidade}`, e.nome]}
                        contentStyle={{ fontSize: 10, background: "#fff", border: "1px solid #E8E0D0", borderRadius: 8 }}
                      />
                      {e.metaNum?.max && (
                        <ReferenceLine y={e.metaNum.max} stroke={sc.dot} strokeDasharray="3 2" strokeOpacity={0.4} />
                      )}
                      {e.metaNum?.min && (
                        <ReferenceLine y={e.metaNum.min} stroke={sc.dot} strokeDasharray="3 2" strokeOpacity={0.4} />
                      )}
                    </LineChart>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── FICHA KPI ─────────────────────────────────────────────────────────────────

function FichaKPI({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9B8B7A", letterSpacing: "0.07em", fontSize: "0.65rem" }}>
        {label}
      </span>
      <span className="text-base font-semibold" style={{ color: "#1A1008" }}>
        {value}
      </span>
      {sub && <span className="text-xs" style={{ color: "#9B8B7A" }}>{sub}</span>}
    </div>
  );
}

type Tab = "bioimpedancia" | "score" | "risco" | "medicamentos" | "suplementos" | "timeline" | "arquivos";

export default function PatientDetail({ patient, onBack }: { patient: Patient; onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("bioimpedancia");
  const history = bioimpedanciaData[patient.id] || [];
  const latest = history[history.length - 1];
  const pesoAtual = latest?.peso ?? patient.pesoInicial ?? 0;
  const pesoInicial = patient.pesoInicial ?? pesoAtual;
  const pesoMeta = patient.pesoMeta ?? pesoAtual;

  // Percentual atingido: quanto do caminho entre inicial e meta já foi percorrido
  let pctAtingido = 0;
  if (pesoInicial !== pesoMeta) {
    pctAtingido = Math.min(100, Math.max(0, ((pesoInicial - pesoAtual) / (pesoInicial - pesoMeta)) * 100));
  } else {
    pctAtingido = 100;
  }
  const pctStr = `${Math.round(pctAtingido)}%`;
  const pctColor = pctAtingido >= 80 ? "#66724A" : pctAtingido >= 40 ? "#C6A15B" : "#B91C1C";

  const initials = patient.nome.split(" ").slice(0, 2).map((n) => n[0]).join("");
  const fichaDetails = [
    { label: "Data de nascimento", value: patient.dataNascimento ? new Date(`${patient.dataNascimento}T12:00:00`).toLocaleDateString("pt-BR") : undefined },
    { label: "CPF", value: patient.cpf },
    { label: "Consulta atual", value: patient.consultaAtual },
    { label: "TRH", value: patient.trh },
    { label: "Contraceptivo", value: patient.contraceptivo },
    { label: "Observações", value: patient.observacoes },
    { label: "Origem do lead", value: patient.origemLead },
  ].filter((detail) => detail.value);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Breadcrumb + print button */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="text-sm hover:opacity-70 transition-opacity" style={{ color: "#5B2333" }}>
            ← Pacientes
          </button>
          <span style={{ color: "#D0C8BE" }}>/</span>
          <span className="text-sm" style={{ color: "#9B8B7A" }}>{patient.nome}</span>
        </div>
        <BotaoImprimirResumo
          patient={patient}
          bioAtual={history[history.length - 1] ? {
            peso: history[history.length - 1].peso,
            gordura: history[history.length - 1].gordura,
            musculo: history[history.length - 1].musculo,
            agua: history[history.length - 1].agua,
            imc: history[history.length - 1].imc,
          } : undefined}
          bioInicial={history[0] ? {
            peso: history[0].peso,
            gordura: history[0].gordura,
            musculo: history[0].musculo,
            agua: history[0].agua,
            imc: history[0].imc,
          } : undefined}
        />
      </div>

      {/* ── FICHA DA PACIENTE ── */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>

        {/* Top bar — vinho */}
        <div className="h-2" style={{ background: "linear-gradient(to right, #3E1623, #5B2333, #7A3047)" }} />

        {/* Identity row */}
        <div className="px-5 pt-5 pb-4 flex items-start gap-4 flex-wrap border-b" style={{ borderColor: "#F0EAE0" }}>
          {/* Avatar or photo */}
          <div className="shrink-0">
            {patient.foto ? (
              <img
                src={patient.foto}
                alt={patient.nome}
                className="w-16 h-16 rounded-2xl object-cover"
                style={{ border: "2px solid #E8E0D0" }}
              />
            ) : (
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #3E1623 0%, #5B2333 100%)" }}
              >
                {initials}
              </div>
            )}
          </div>

          {/* Name + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h2
                className="text-2xl font-normal leading-tight"
                style={{ fontFamily: "var(--font-serif)", color: "#3E1623" }}
              >
                {patient.nome}
              </h2>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                style={{
                  background: patient.ativa ? "#E8F0E0" : "#F0EAE0",
                  color: patient.ativa ? "#66724A" : "#9B8B7A",
                }}
              >
                {patient.ativa ? "Ativa" : "Inativa"}
              </span>
            </div>
            <p className="text-sm" style={{ color: "#9B8B7A" }}>
              {patient.protocolo}
            </p>
            {patient.alertas.length > 0 && (
              <div className="flex gap-1.5 flex-wrap mt-2">
                {patient.alertas.map((a, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "#FEE2E2", color: "#991B1B" }}
                  >
                    ⚠ {a}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Consulta atual badge */}
          <div
            className="shrink-0 rounded-xl px-4 py-3 text-center"
            style={{ background: "#F8F4EF", border: "1px solid #E8E0D0" }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "#9B8B7A", fontSize: "0.6rem" }}>
              Consulta atual
            </p>
            <p className="text-sm font-bold" style={{ color: "#5B2333" }}>
              {patient.ultimaConsulta}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#9B8B7A" }}>
              Próxima: {patient.proximaConsulta}
            </p>
          </div>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y sm:divide-y-0" style={{ borderColor: "#F0EAE0" }}>
          {/* Idade */}
          <div className="px-5 py-4" style={{ borderColor: "#F0EAE0" }}>
            <FichaKPI label="Idade" value={`${patient.idade} anos`} />
          </div>

          {/* Telefone */}
          <div className="px-5 py-4" style={{ borderColor: "#F0EAE0" }}>
            <FichaKPI label="Telefone" value={patient.telefone ?? "—"} />
          </div>

          {/* Peso inicial */}
          <div className="px-5 py-4" style={{ borderColor: "#F0EAE0" }}>
            <FichaKPI label="Peso inicial" value={`${pesoInicial.toLocaleString("pt-BR")} kg`} />
          </div>

          {/* Peso atual */}
          <div className="px-5 py-4" style={{ borderColor: "#F0EAE0" }}>
            <FichaKPI
              label="Peso atual"
              value={`${pesoAtual.toLocaleString("pt-BR")} kg`}
              sub={pesoAtual < pesoInicial ? `▼ ${(pesoInicial - pesoAtual).toFixed(1)} kg` : undefined}
            />
          </div>

          {/* Meta */}
          <div className="px-5 py-4" style={{ borderColor: "#F0EAE0" }}>
            <FichaKPI label="Meta" value={`${pesoMeta.toLocaleString("pt-BR")} kg`} />
          </div>

          {/* Percentual atingido */}
          <div className="px-5 py-4" style={{ borderColor: "#F0EAE0" }}>
            <span className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: "#9B8B7A", fontSize: "0.65rem" }}>
              Percentual atingido
            </span>
            <span className="text-base font-bold block mb-1.5" style={{ color: pctColor }}>
              {pctStr}
            </span>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#F0EAE0" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: pctStr, background: pctColor }}
              />
            </div>
          </div>
        </div>

        {/* Objetivo */}
        {patient.objetivo && (
          <div className="px-5 py-3 border-t" style={{ borderColor: "#F0EAE0", background: "#FDFAF7" }}>
            <span className="text-xs font-semibold uppercase tracking-wider mr-2" style={{ color: "#9B8B7A", fontSize: "0.65rem" }}>
              Objetivo
            </span>
            <span className="text-sm" style={{ color: "#3E1623" }}>
              {patient.objetivo}
            </span>
          </div>
        )}
        {fichaDetails.length > 0 && (
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 px-5 py-4 border-t" style={{ borderColor: "#F0EAE0" }}>
            {fichaDetails.map((detail) => (
              <div key={detail.label}>
                <dt className="text-xs font-semibold uppercase" style={{ color: "#9B8B7A" }}>{detail.label}</dt>
                <dd className="text-sm mt-0.5 break-words" style={{ color: "#3E1623" }}>{detail.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* ── Abas ── */}
      <div className="flex gap-1 p-1 rounded-xl w-fit flex-wrap" style={{ background: "#E8E0D0" }}>
        {([
          { id: "bioimpedancia", label: "Bioimpedância" },
          { id: "score", label: "Score Lapidar" },
          { id: "risco", label: "Risco CV" },
          { id: "medicamentos", label: "Medicamentos" },
          { id: "suplementos", label: "Suplementos" },
          { id: "timeline", label: "Timeline" },
          { id: "arquivos", label: "Arquivos" },
        ] as { id: Tab; label: string }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: tab === t.id ? "#fff" : "transparent",
              color: tab === t.id ? "#5B2333" : "#9B8B7A",
              boxShadow: tab === t.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Bioimpedância ── */}
      {tab === "bioimpedancia" && (
        history.length > 0 ? (
          <div className="grid grid-cols-1 gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))" }}>
            {metrics.map((m) => (
              <MetricCard key={m.key} metric={m} history={history} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl p-10 text-center" style={{ background: "#fff", border: "1px solid #E8E0D0" }}>
            <p className="text-sm" style={{ color: "#9B8B7A" }}>Nenhuma medição registrada.</p>
          </div>
        )
      )}

      {/* ── Score Lapidar ── */}
      {tab === "score" && <ScoreLapidar patientId={patient.id} />}

      {/* ── Risco CV ── */}
      {tab === "risco" && <RiscoCV patientId={patient.id} />}

      {/* ── Medicamentos ── */}
      {tab === "medicamentos" && <MedicamentosTab patientId={patient.id} />}

      {/* ── Suplementos ── */}
      {tab === "suplementos" && <SuplementosTab patientId={patient.id} />}

      {/* ── Timeline ── */}
      {tab === "timeline" && <TimelineTab patientId={patient.id} />}

      {/* ── Arquivos ── */}
      {tab === "arquivos" && <ArquivosTab patientId={patient.id} />}
    </div>
  );
}
