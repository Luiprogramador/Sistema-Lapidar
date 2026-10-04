/* ============================================================
   LAPIDAR — Dados Mock Expandidos
   ============================================================ */

const EXAMES_CATALOGO = [
  { id: 'ldl',           nome: 'Colesterol LDL',       unidade: 'mg/dL',  meta: '< 100',   anterior: '148', atual: '128', refMin: 0,   refMax: 100,  dir: 'max', warnThreshold: 130 },
  { id: 'meta_ldl',      nome: 'Meta Individual LDL',  unidade: 'mg/dL',  meta: '≤ 100',   anterior: '100', atual: '100', refMin: 0,   refMax: 100,  dir: 'meta' },
  { id: 'hdl',           nome: 'Colesterol HDL',       unidade: 'mg/dL',  meta: '≥ 50',    anterior: '48',  atual: '52',  refMin: 50,  refMax: 100,  dir: 'min', warnThreshold: 45 },
  { id: 'triglicerideos',nome: 'Triglicerídeos',       unidade: 'mg/dL',  meta: '< 150',   anterior: '162', atual: '138', refMin: 0,   refMax: 150,  dir: 'max', warnThreshold: 175 },
  { id: 'apob',          nome: 'Apolipoproteína B (ApoB)', unidade: 'mg/dL', meta: '< 90', anterior: '112', atual: '94',  refMin: 0,   refMax: 90,   dir: 'max', warnThreshold: 105 },
  { id: 'lpa',           nome: 'Lipoproteína(a) [Lp(a)]', unidade: 'nmol/L', meta: '< 50', anterior: '42',  atual: '38',  refMin: 0,   refMax: 50,   dir: 'max', warnThreshold: 75 },
  { id: 'hba1c',         nome: 'Hemoglobina Glicada (HbA1c)', unidade: '%', meta: '< 5,6', anterior: '5,7', atual: '5,4', refMin: 4.0, refMax: 5.6,  dir: 'max', warnThreshold: 6.0 },
  { id: 'insulina',      nome: 'Insulina Basal',       unidade: 'µUI/mL', meta: '< 10',    anterior: '12,4',atual: '8,6', refMin: 2.0, refMax: 10.0, dir: 'max', warnThreshold: 15 },
  { id: 'glicemia',      nome: 'Glicemia em Jejum',    unidade: 'mg/dL',  meta: '< 99',    anterior: '98',  atual: '91',  refMin: 70,  refMax: 99,   dir: 'max', warnThreshold: 105 },
  { id: 'vitamina_d',    nome: 'Vitamina D (25-OH)',    unidade: 'ng/mL',  meta: '40–60',   anterior: '24',  atual: '46',  refMin: 40,  refMax: 60,   dir: 'range', warnMin: 30, warnMax: 70 },
  { id: 'vitamina_b12',  nome: 'Vitamina B12',         unidade: 'pg/mL',  meta: '≥ 500',   anterior: '340', atual: '580', refMin: 500, refMax: 1100, dir: 'min', warnThreshold: 400 },
  { id: 'ferritina',     nome: 'Ferritina',            unidade: 'ng/mL',  meta: '50–150',  anterior: '22',  atual: '68',  refMin: 50,  refMax: 150,  dir: 'range', warnMin: 30, warnMax: 200 },
  { id: 'homocisteina',  nome: 'Homocisteína',         unidade: 'µmol/L', meta: '< 10',    anterior: '13,2',atual: '8,9', refMin: 0,   refMax: 10.0, dir: 'max', warnThreshold: 12 },
  { id: 'pcr_us',        nome: 'PCR ultrassensível',   unidade: 'mg/L',   meta: '< 1,0',   anterior: '2,4', atual: '1,1', refMin: 0,   refMax: 1.0,  dir: 'max', warnThreshold: 2.0 },
  { id: 'tgo',           nome: 'TGO (AST)',            unidade: 'U/L',    meta: '< 32',    anterior: '26',  atual: '22',  refMin: 0,   refMax: 32,   dir: 'max', warnThreshold: 40 },
  { id: 'tgp',           nome: 'TGP (ALT)',            unidade: 'U/L',    meta: '< 33',    anterior: '28',  atual: '24',  refMin: 0,   refMax: 33,   dir: 'max', warnThreshold: 42 },
  { id: 'creatinina',    nome: 'Creatinina',           unidade: 'mg/dL',  meta: '0,5–1,0', anterior: '0,82',atual: '0,79',refMin: 0.5, refMax: 1.0,  dir: 'range' },
  { id: 'tsh',           nome: 'TSH',                  unidade: 'µUI/mL', meta: '1,0–2,5', anterior: '3,1', atual: '2,1', refMin: 1.0, refMax: 2.5,  dir: 'range', warnMin: 0.4, warnMax: 4.0 },
  { id: 't4_livre',      nome: 'T4 Livre',             unidade: 'ng/dL',  meta: '0,9–1,5', anterior: '1,1', atual: '1,2', refMin: 0.9, refMax: 1.5,  dir: 'range' },
  { id: 'estradiol',     nome: 'Estradiol',            unidade: 'pg/mL',  meta: '50–120',  anterior: '35',  atual: '78',  refMin: 50,  refMax: 120,  dir: 'range', warnMin: 30, warnMax: 160 },
  { id: 'progesterona',  nome: 'Progesterona',         unidade: 'ng/mL',  meta: '> 5,0',   anterior: '1,8', atual: '6,4', refMin: 5.0, refMax: 20.0, dir: 'min', warnThreshold: 3.0 },
  { id: 'testosterona',  nome: 'Testosterona Total',   unidade: 'ng/dL',  meta: '25–45',   anterior: '18',  atual: '32',  refMin: 25,  refMax: 45,   dir: 'range', warnMin: 15, warnMax: 60 },
  { id: 'shbg',          nome: 'SHBG',                 unidade: 'nmol/L', meta: '40–90',   anterior: '88',  atual: '72',  refMin: 40,  refMax: 90,   dir: 'range' }
];

EXAMES_CATALOGO.forEach(exam => {
  exam.dataAnterior = '01/07/2026';
  exam.dataAtual = '02/09/2026';
});

const PACIENTES = [
  {
    id: 1,
    nome: "Ana Paula Ferreira",
    iniciais: "AP",
    idade: 44,
    nascimento: "12/03/1980",
    telefone: "(11) 98765-4321",
    objetivo: "Perda de gordura e equilíbrio hormonal na pré-menopausa",
    protocolo: "Lapidar 40+",
    consultaAtual: "3ª Consulta",
    pesoInicial: 78.5,
    pesoAtual: 74.2,
    meta: 68,
    trh: "Sim",
    contraceptivo: "Não",
    circunferenciaAbdominal: "84 cm",
    pressao: "120/80 mmHg",
    metas: ["Perder 10kg com preservação muscular", "Regularizar sono e energia", "Controlar LDL < 100", "Aderir à musculação 3x/semana"],
    metasConcluidas: 2,
    origemLead: "Indicação",
    observacoes: "Paciente altamente comprometida. Excelente adesão ao plano nutricional e TRH bioidêntica.",
    ultimaConsulta: "15/09/2026",
    proximaConsulta: "20/10/2026",
    bioimpedancia: [
      { data: "15/03/2026", peso: 78.5, musculo: 28.2, gordura: 36.4, imc: 29.8, txGordura: 46.4, aguaCorporal: 43.1, gorduraVisceral: 12, tmb: 1580, nota: 6.2 },
      { data: "20/05/2026", peso: 76.8, musculo: 28.6, gordura: 34.9, imc: 29.2, txGordura: 45.4, aguaCorporal: 43.8, gorduraVisceral: 11, tmb: 1590, nota: 6.8 },
      { data: "15/07/2026", peso: 75.3, musculo: 29.1, gordura: 33.2, imc: 28.6, txGordura: 44.1, aguaCorporal: 44.5, gorduraVisceral: 10, tmb: 1605, nota: 7.4 },
      { data: "15/09/2026", peso: 74.2, musculo: 29.8, gordura: 31.5, imc: 28.2, txGordura: 42.4, aguaCorporal: 45.2, gorduraVisceral: 9,  tmb: 1620, nota: 7.9 },
    ],
    scoreLabels: ["Saciedade","Fome","Energia","Sono","Humor","Libido","Fogachos","Perda urinária","Constipação","Atividade física","Adesão"],
    scoreAtual:   [8, 6, 8, 8, 9, 7, 7, 9, 8, 8, 9],
    scoreAnterior:[5, 5, 6, 5, 7, 5, 4, 7, 6, 6, 6],
    riscoCV: {
      nivel: "Intermediário",
      ldl: 128,
      metaLdl: 100,
      naoHdl: 146,
      metaNaoHdl: 130,
      reducaoLdl: 14,
      has: "Sim (estágio 1, controlada)",
      dm: "Não",
      tabagismo: "Não fumante",
      historiaFamiliar: "Sim (mãe com IAM aos 62 anos)",
      apob: 94,
      metaApob: 90,
      lpa: 38,
      metaLpa: 50,
      pcrUs: 1.1,
      metaPcrUs: 1.0,
      fatores: ["HAS controlada", "Histórico familiar materno", "Idade > 40"],
      sugestoes: [
        "Atingir meta de LDL < 100 com dieta cardioprotetora e otimização de fitoesteróis",
        "Manter rotina de musculação 3x/semana e cardio zona 2 (150 min/semana)",
        "Se LDL persistir acima de 120 mg/dL no próximo retorno, discutir Rosuvastatina 5mg"
      ],
      preventScore: "4.8% de risco cardiovascular em 10 anos (AHA PREVENT)",
      metaAtingida: false
    },
    nutricaoMetas: { proteina: '100 g/dia', fibras: '25 g/dia', agua: '2,5 L/dia' },
    metasPersonalizadas: [
      { id: 'm_musc', nome: 'Musculação', freqDesejada: '3x/semana', meta: 3, realizado: 3, unidade: 'treinos', desc: 'Foco em membros inferiores e core' },
      { id: 'm_cardio', nome: 'Cardio', freqDesejada: '2x/semana', meta: 2, realizado: 2, unidade: 'sessões', desc: 'Caminhada rápida ou esteira zona 2 (40 min)' },
      { id: 'm_resp', nome: 'Respiração / Mindfulness', freqDesejada: '5x/semana', meta: 5, realizado: 5, unidade: 'práticas', desc: '5 min de respiração ao acordar' },
      { id: 'm_leit', nome: 'Leitura antes de dormir', freqDesejada: '4x/semana', meta: 4, realizado: 4, unidade: 'dias', desc: 'Substituir telas por livro' }
    ],
    diarioHoje: {
      preenchido: true,
      data: "29/09/2026",
      horario: "08:30",
      movimento: { musculacao: 'sim', cardio: 'nao_programado' },
      nutricao: { proteina: 'atingi', fibras: 'atingi', agua: 'atingi' },
      sono: { dormiu: '23:00', acordou: '06:30', duracao: '7h30', despertares: '1', qualidade: 8 },
      bemEstar: { energia: 8, estresse: 3 },
      metas: { m_musc: 'sim', m_cardio: 'nao_programado', m_resp: 'sim', m_leit: 'sim' },
      sintomas40: { fogachos: 3, ressecamento: 2, irritabilidade: 2, nevoa: 2, libido: 7 },
      observacoes: "Dia muito produtivo. Sono reparador com a suplementação de magnésio."
    },
    medicamentos: [
      { nome:"Progesterona micronizada", tipo:"Medicamento", dose:"200mg", freq:"1x/noite", inicio:"01/04/2026", motivo:"TRH bioidêntica", fim:"", receita:"receita_trh_2026.pdf" },
      { nome:"Estradiol gel", tipo:"Medicamento", dose:"0.75mg (1 pump)", freq:"1x/manhã", inicio:"01/04/2026", motivo:"TRH bioidêntica", fim:"", receita:"receita_trh_2026.pdf" },
      { nome:"Vitamina D3 + K2", tipo:"Suplemento", dose:"5000UI + 100mcg", freq:"1x/dia", inicio:"15/03/2026", motivo:"Equilíbrio metabólico / ósseo", fim:"", receita:"" },
      { nome:"Ômega-3 EPA/DHA", tipo:"Suplemento", dose:"2g", freq:"1x/dia", inicio:"15/03/2026", motivo:"Saúde cardiovascular", fim:"", receita:"" },
      { nome:"Magnésio Treonato", tipo:"Suplemento", dose:"400mg", freq:"1x/noite", inicio:"15/07/2026", motivo:"Qualidade do sono", fim:"", receita:"" },
    ],
    arquivos: [
      { id: 1, titulo: "Receita — TRH e Suplementação Individualizada", tipo: "Receitas", data: "15/09/2026", origem: "Enviado", tamanho: "245 KB", icon: "📄", desc: "Progesterona micronizada 200mg e Estradiol gel" },
      { id: 2, titulo: "Pedido de Exames — Painel Metabólico e Hormonal", tipo: "Pedidos", data: "15/09/2026", origem: "Enviado", tamanho: "180 KB", icon: "📋", desc: "Lipidograma, ApoB, Lp(a), PCR-us, Hormônios" },
      { id: 3, titulo: "Laudo Laboratorial Completo — Fleury", tipo: "Exames", data: "02/09/2026", origem: "Recebido", tamanho: "1.8 MB", icon: "🔬", desc: "Resultados de sangue, perfil lipídico e tireoide" },
      { id: 4, titulo: "Relatório de Bioimpedância InBody 770", tipo: "Exames", data: "15/09/2026", origem: "Recebido", tamanho: "920 KB", icon: "📊", desc: "Composição corporal comparativa set/2026" },
      { id: 5, titulo: "Plano Metabólico e Orientações Iniciais", tipo: "Receitas", data: "20/05/2026", origem: "Enviado", tamanho: "310 KB", icon: "📑", desc: "Metas de macronutrientes e rotina de sono" }
    ],
    timeline: [
      { tipo:"Consulta", data:"15/09/2026", icone:"🩺", titulo:"3ª Consulta Presencial", desc:"Revisão de TRH, redução de gordura visceral para 9. Peso 74.2kg (-4.3kg no total)." },
      { tipo:"WhatsApp", data:"02/09/2026", icone:"💬", titulo:"Check-in WhatsApp (Gabi)", desc:"Paciente relata excelente melhora de energia e ausência de fogachos noturnos." },
      { tipo:"Consulta", data:"15/07/2026", icone:"🩺", titulo:"2ª Consulta", desc:"Bioimpedância realizada. Redução de 1.5kg de gordura e ganho de massa magra." },
      { tipo:"Exame",   data:"01/07/2026", icone:"🔬", titulo:"Exames Laboratoriais", desc:"Lipidograma, TSH, T4L, Estradiol, Progesterona recebidos." },
      { tipo:"Consulta", data:"20/05/2026", icone:"🩺", titulo:"Marco Zero", desc:"Início oficial da jornada Lapidar 40+. Entrega de kit, plano e prescrição TRH." },
    ],
  },
  {
    id: 2,
    nome: "Beatriz Lima",
    iniciais: "BL",
    idade: 28,
    nascimento: "05/07/1998",
    telefone: "(21) 97654-3210",
    objetivo: "Regulação do ciclo menstrual, controle de SOP e fertilidade",
    protocolo: "Lapidar SOP",
    consultaAtual: "2ª Consulta",
    pesoInicial: 82.0,
    pesoAtual: 80.1,
    meta: 72,
    trh: "Não",
    contraceptivo: "Sim - DIU de prata",
    circunferenciaAbdominal: "88 cm",
    pressao: "115/75 mmHg",
    metas: ["Regularizar ovulação e ciclo", "Reduzir resistência insulínica", "Diminuir gordura visceral", "Fazer caminhada pós-refeição"],
    metasConcluidas: 1,
    origemLead: "Instagram",
    observacoes: "Ciclos irregulares com resistência insulínica. Excelente resposta ao Inositol e Metformina.",
    ultimaConsulta: "10/09/2026",
    proximaConsulta: "10/10/2026",
    bioimpedancia: [
      { data: "10/07/2026", peso: 82.0, musculo: 27.0, gordura: 38.5, imc: 31.2, txGordura: 46.9, aguaCorporal: 42.8, gorduraVisceral: 13, tmb: 1560, nota: 5.8 },
      { data: "10/09/2026", peso: 80.1, musculo: 27.4, gordura: 36.8, imc: 30.5, txGordura: 45.9, aguaCorporal: 43.4, gorduraVisceral: 12, tmb: 1572, nota: 6.3 },
    ],
    scoreLabels: ["Saciedade","Fome","Energia","Sono","Humor","Libido","Fogachos","Perda urinária","Constipação","Atividade física","Adesão"],
    scoreAtual:   [7, 6, 7, 7, 7, 6, 10, 10, 7, 6, 8],
    scoreAnterior:[4, 7, 4, 5, 5, 4, 10, 10, 5, 3, 5],
    riscoCV: {
      nivel: "Baixo",
      ldl: 118,
      metaLdl: 130,
      naoHdl: 135,
      metaNaoHdl: 160,
      reducaoLdl: 0,
      has: "Não",
      dm: "Não (resistência insulínica tratada)",
      tabagismo: "Não fumante",
      historiaFamiliar: "Não",
      apob: 82,
      metaApob: 90,
      lpa: 22,
      metaLpa: 50,
      pcrUs: 0.9,
      metaPcrUs: 1.0,
      fatores: ["Resistência insulínica"],
      sugestoes: ["Manter Inositol e controle de carboidratos refinados", "Caminhada pós-prandial de 10 min"],
      preventScore: "1.2% risco cardiovascular em 10 anos",
      metaAtingida: true
    },
    nutricaoMetas: { proteina: '90 g/dia', fibras: '28 g/dia', agua: '2,2 L/dia' },
    metasPersonalizadas: [
      { id: 'm_musc', nome: 'Musculação', freqDesejada: '3x/semana', meta: 3, realizado: 2, unidade: 'treinos', desc: 'Melhora da sensibilidade à insulina' },
      { id: 'm_pos_ref', nome: 'Caminhada pós-refeição', freqDesejada: '5x/semana', meta: 5, realizado: 4, unidade: 'caminhadas', desc: '10 a 15 min pós almoço ou jantar' },
      { id: 'm_resp', nome: 'Respiração / Mindfulness', freqDesejada: '3x/semana', meta: 3, realizado: 3, unidade: 'práticas', desc: 'Controle de estresse e cortisol' }
    ],
    diarioHoje: {
      preenchido: true,
      data: "29/09/2026",
      horario: "09:15",
      movimento: { musculacao: 'sim', cardio: 'nao' },
      nutricao: { proteina: 'atingi', fibras: 'atingi', agua: 'atingi' },
      sono: { dormiu: '23:30', acordou: '07:15', duracao: '7h45', despertares: '0', qualidade: 8 },
      bemEstar: { energia: 7, estresse: 4 },
      metas: { m_musc: 'sim', m_pos_ref: 'sim', m_resp: 'sim' },
      sintomas40: null,
      observacoes: "Ciclo menstrual desceu espontaneamente após 45 dias. Muito animada!"
    },
    medicamentos: [
      { nome:"Metformina", tipo:"Medicamento", dose:"500mg", freq:"2x/dia", inicio:"10/07/2026", motivo:"Resistência insulínica", fim:"", receita:"receita_metformina.pdf" },
      { nome:"Mio-Inositol + D-Chiro-Inositol", tipo:"Suplemento", dose:"4g (40:1)", freq:"1x/dia", inicio:"10/07/2026", motivo:"SOP e ovulação", fim:"", receita:"" },
      { nome:"Berberina", tipo:"Suplemento", dose:"500mg", freq:"2x/dia", inicio:"10/07/2026", motivo:"Glicemia e perfil lipídico", fim:"", receita:"" }
    ],
    arquivos: [
      { id: 1, titulo: "Receita — Metformina e Inositol", tipo: "Receitas", data: "10/07/2026", origem: "Enviado", tamanho: "210 KB", icon: "📄", desc: "Sensibilizadores de insulina" },
      { id: 2, titulo: "Exame Ultrassom Pélvico Transvaginal", tipo: "Exames", data: "05/09/2026", origem: "Recebido", tamanho: "2.1 MB", icon: "🔬", desc: "Morfologia ovariana e folículos antrais" }
    ],
    timeline: [
      { tipo:"Consulta", data:"10/09/2026", icone:"🩺", titulo:"2ª Consulta", desc:"Ciclo menstrual retornou espontaneamente. Insulina em queda (de 18 para 11)." },
      { tipo:"Consulta", data:"10/07/2026", icone:"🩺", titulo:"Marco Zero", desc:"Início do protocolo SOP. Introdução de Metformina e suplementação." },
    ],
  },
  {
    id: 3,
    nome: "Carla Mendes",
    iniciais: "CM",
    idade: 51,
    nascimento: "20/11/1974",
    telefone: "(31) 96543-2109",
    objetivo: "Controle rigoroso de LDL e composição corporal na menopausa",
    protocolo: "Lapidar 40+",
    consultaAtual: "5ª Consulta",
    pesoInicial: 71.0,
    pesoAtual: 68.8,
    meta: 65,
    trh: "Sim",
    contraceptivo: "Não",
    circunferenciaAbdominal: "81 cm",
    pressao: "128/84 mmHg",
    metas: ["LDL < 100 mg/dL", "Perder 6kg com ganho muscular", "Preservar densidade óssea", "Treinos de força regulares"],
    metasConcluidas: 2,
    origemLead: "Indicação médica",
    observacoes: "Menopausa estabelecida há 3 anos. LDL historicamente elevado, em monitoramento.",
    ultimaConsulta: "20/09/2026",
    proximaConsulta: "20/11/2026",
    bioimpedancia: [
      { data: "20/01/2026", peso: 71.0, musculo: 24.5, gordura: 31.8, imc: 27.8, txGordura: 44.8, aguaCorporal: 44.0, gorduraVisceral: 11, tmb: 1480, nota: 5.5 },
      { data: "20/03/2026", peso: 70.2, musculo: 24.8, gordura: 30.9, imc: 27.5, txGordura: 44.0, aguaCorporal: 44.3, gorduraVisceral: 10, tmb: 1488, nota: 6.0 },
      { data: "20/05/2026", peso: 69.5, musculo: 25.1, gordura: 30.0, imc: 27.2, txGordura: 43.2, aguaCorporal: 44.8, gorduraVisceral: 10, tmb: 1496, nota: 6.5 },
      { data: "20/07/2026", peso: 69.0, musculo: 25.4, gordura: 29.5, imc: 27.0, txGordura: 42.7, aguaCorporal: 45.0, gorduraVisceral: 9,  tmb: 1500, nota: 7.0 },
      { data: "20/09/2026", peso: 68.8, musculo: 25.6, gordura: 29.2, imc: 26.9, txGordura: 42.4, aguaCorporal: 45.2, gorduraVisceral: 9,  tmb: 1505, nota: 7.2 },
    ],
    scoreLabels: ["Saciedade","Fome","Energia","Sono","Humor","Libido","Fogachos","Perda urinária","Constipação","Atividade física","Adesão"],
    scoreAtual:   [8, 5, 8, 7, 8, 7, 7, 9, 8, 8, 9],
    scoreAnterior:[6, 7, 5, 4, 6, 4, 6, 8, 6, 5, 6],
    riscoCV: {
      nivel: "Alto",
      ldl: 158,
      metaLdl: 100,
      naoHdl: 178,
      metaNaoHdl: 130,
      reducaoLdl: 37,
      has: "Sim (estágio 1)",
      dm: "Não",
      tabagismo: "Não fumante",
      historiaFamiliar: "Sim (pai com infarto aos 55 anos)",
      apob: 118,
      metaApob: 80,
      lpa: 68,
      metaLpa: 50,
      pcrUs: 2.1,
      metaPcrUs: 1.0,
      fatores: ["HAS", "História familiar precoce de DAC", "Menopausa", "Lp(a) elevada"],
      sugestoes: [
        "Ajuste da Rosuvastatina para 20mg associada à Ezetimiba 10mg",
        "Meta estrita de LDL < 70 a 100 mg/dL devido ao risco alto",
        "Ecocardiograma e escore de cálcio coronariano recomendados"
      ],
      preventScore: "8.6% de risco cardiovascular em 10 anos (AHA PREVENT)",
      metaAtingida: false
    },
    nutricaoMetas: { proteina: '95 g/dia', fibras: '30 g/dia', agua: '2,5 L/dia' },
    metasPersonalizadas: [
      { id: 'm_musc', nome: 'Musculação', freqDesejada: '3x/semana', meta: 3, realizado: 3, unidade: 'treinos', desc: 'Densidade óssea e força' },
      { id: 'm_cardio', nome: 'Cardio aeróbico', freqDesejada: '3x/semana', meta: 3, realizado: 2, unidade: 'sessões', desc: 'Zona 2 para proteção cardiovascular' },
      { id: 'm_dren', nome: 'Drenagem linfática', freqDesejada: '1x/semana', meta: 1, realizado: 1, unidade: 'sessões', desc: 'Alívio de retenção hídrica' }
    ],
    diarioHoje: {
      preenchido: false,
      data: "29/09/2026",
      horario: "",
      movimento: { musculacao: 'sim', cardio: 'sim' },
      nutricao: { proteina: 'atingi', fibras: 'atingi', agua: 'parcialmente' },
      sono: { dormiu: '23:30', acordou: '07:00', duracao: '7h30', despertares: '1', qualidade: 7 },
      bemEstar: { energia: 7, estresse: 4 },
      metas: { m_musc: 'sim', m_cardio: 'sim', m_dren: 'nao_programado' },
      sintomas40: { fogachos: 3, ressecamento: 3, irritabilidade: 3, nevoa: 2, libido: 6 },
      observacoes: ""
    },
    medicamentos: [
      { nome:"Rosuvastatina", tipo:"Medicamento", dose:"10mg", freq:"1x/noite", inicio:"01/02/2026", motivo:"Dislipidemia de alto risco", fim:"", receita:"receita_rosuvastatina.pdf" },
      { nome:"Estradiol transdérmico", tipo:"Medicamento", dose:"50mcg", freq:"Adesivo 2x/sem", inicio:"20/01/2026", motivo:"TRH menopausa", fim:"", receita:"receita_trh_carla.pdf" },
      { nome:"Vitamina K2 (MK-7)", tipo:"Suplemento", dose:"200mcg", freq:"1x/dia", inicio:"20/01/2026", motivo:"Prevenção de calcificação vascular", fim:"", receita:"" },
    ],
    arquivos: [
      { id: 1, titulo: "Receita — Estatina e TRH Transdérmica", tipo: "Receitas", data: "20/09/2026", origem: "Enviado", tamanho: "230 KB", icon: "📄", desc: "Ajuste de doses pós exames" },
      { id: 2, titulo: "Escore de Cálcio Coronariano e AngioTC", tipo: "Exames", data: "10/08/2026", origem: "Recebido", tamanho: "4.2 MB", icon: "🔬", desc: "Avaliação vascular de placa coronariana" }
    ],
    timeline: [
      { tipo:"Consulta", data:"20/09/2026", icone:"🩺", titulo:"5ª Consulta", desc:"LDL em 158. Discussão para associar Ezetimiba. Peso 68.8kg." },
      { tipo:"Ligação",  data:"05/09/2026", icone:"📞", titulo:"Ligação de Acompanhamento (Gabi)", desc:"Dúvida sobre horário e tolerância à medicação." },
    ],
  },
  {
    id: 4,
    nome: "Daniela Rocha",
    iniciais: "DR",
    idade: 33,
    nascimento: "08/06/1993",
    telefone: "(41) 95432-1098",
    objetivo: "Preparação para gravidez, fertilidade e reserva ovariana",
    protocolo: "Lapidar Fertilidade",
    consultaAtual: "2ª Consulta",
    pesoInicial: 65.0,
    pesoAtual: 63.8,
    meta: 60,
    trh: "Não",
    contraceptivo: "Não",
    circunferenciaAbdominal: "74 cm",
    pressao: "110/70 mmHg",
    metas: ["Regularizar ovulação", "Atingir peso ideal", "Ferritina > 70", "Suplementação pré-concepção"],
    metasConcluidas: 2,
    origemLead: "Google",
    observacoes: "Tentando engravidar há 1 ano. Ovulação restabelecida com ajuste metabólico e micronutrientes.",
    ultimaConsulta: "05/09/2026",
    proximaConsulta: "05/10/2026",
    bioimpedancia: [
      { data: "05/07/2026", peso: 65.0, musculo: 23.8, gordura: 26.4, imc: 24.2, txGordura: 40.6, aguaCorporal: 46.2, gorduraVisceral: 8, tmb: 1450, nota: 7.0 },
      { data: "05/09/2026", peso: 63.8, musculo: 24.0, gordura: 25.8, imc: 23.8, txGordura: 40.4, aguaCorporal: 46.5, gorduraVisceral: 7, tmb: 1458, nota: 7.5 },
    ],
    scoreLabels: ["Saciedade","Fome","Energia","Sono","Humor","Libido","Fogachos","Perda urinária","Constipação","Atividade física","Adesão"],
    scoreAtual:   [8, 6, 8, 8, 9, 8, 10, 10, 8, 8, 9],
    scoreAnterior:[6, 6, 6, 7, 7, 6, 10, 10, 7, 7, 7],
    riscoCV: {
      nivel: "Baixo",
      ldl: 102,
      metaLdl: 160,
      naoHdl: 120,
      metaNaoHdl: 190,
      reducaoLdl: 0,
      has: "Não",
      dm: "Não",
      tabagismo: "Não fumante",
      historiaFamiliar: "Não",
      apob: 76,
      metaApob: 90,
      lpa: 18,
      metaLpa: 50,
      pcrUs: 0.6,
      metaPcrUs: 1.0,
      fatores: [],
      sugestoes: ["Manter ácido fólico na forma de metilfolato", "Atenção ao consumo de peixes ricos em DHA"],
      preventScore: "0.8% de risco cardiovascular em 10 anos",
      metaAtingida: true
    },
    nutricaoMetas: { proteina: '85 g/dia', fibras: '25 g/dia', agua: '2,4 L/dia' },
    metasPersonalizadas: [
      { id: 'm_yoga', nome: 'Yoga pré-concepção', freqDesejada: '3x/semana', meta: 3, realizado: 3, unidade: 'práticas', desc: 'Circulação pélvica e relaxamento' },
      { id: 'm_med', nome: 'Meditação / Visualização', freqDesejada: '5x/semana', meta: 5, realizado: 4, unidade: 'práticas', desc: 'Redução de ansiedade tentante' }
    ],
    diarioHoje: {
      preenchido: true,
      data: "29/09/2026",
      horario: "08:10",
      movimento: { musculacao: 'sim', cardio: 'nao_programado' },
      nutricao: { proteina: 'atingi', fibras: 'atingi', agua: 'atingi' },
      sono: { dormiu: '22:45', acordou: '06:45', duracao: '8h00', despertares: '0', qualidade: 9 },
      bemEstar: { energia: 8, estresse: 2 },
      metas: { m_yoga: 'sim', m_med: 'sim' },
      sintomas40: null,
      observacoes: "Teste de ovulação positivo no 14º dia! Sentindo-me calma e confiante."
    },
    medicamentos: [
      { nome:"Metilfolato + Metilcobalamina", tipo:"Suplemento", dose:"800mcg + 1mg", freq:"1x/dia", inicio:"05/07/2026", motivo:"Suporte folicular e pré-concepção", fim:"" },
      { nome:"Coenzima Q10 (Ubiquinol)", tipo:"Suplemento", dose:"200mg", freq:"2x/dia", inicio:"05/07/2026", motivo:"Qualidade oocitária", fim:"" },
    ],
    arquivos: [
      { id: 1, titulo: "Protocolo de Suplementação Pré-Gestacional", tipo: "Receitas", data: "05/07/2026", origem: "Enviado", tamanho: "270 KB", icon: "📄", desc: "Fórmula de suporte à reserva ovariana" }
    ],
    timeline: [
      { tipo:"Consulta", data:"05/09/2026", icone:"🩺", titulo:"2ª Consulta", desc:"Ciclo menstrual normalizado em 29 dias. Ovulação confirmada." }
    ],
  },
  {
    id: 5,
    nome: "Fernanda Alves",
    iniciais: "FA",
    idade: 47,
    nascimento: "14/02/1979",
    telefone: "(51) 94321-0987",
    objetivo: "Emagrecimento sustentável e controle da esteatose hepática",
    protocolo: "Pocket",
    consultaAtual: "4ª Consulta",
    pesoInicial: 90.2,
    pesoAtual: 86.5,
    meta: 78,
    trh: "Não",
    contraceptivo: "Não",
    circunferenciaAbdominal: "96 cm",
    pressao: "135/88 mmHg",
    metas: ["Perder 12kg", "Reduzir gordura visceral", "LDL < 130", "Constância de 3 treinos por semana"],
    metasConcluidas: 1,
    origemLead: "Indicação",
    observacoes: "Dificuldade inicial de constância, evoluindo muito bem com o acompanhamento pelo Diário Lapidar.",
    ultimaConsulta: "18/09/2026",
    proximaConsulta: "18/11/2026",
    bioimpedancia: [
      { data: "18/03/2026", peso: 90.2, musculo: 29.5, gordura: 42.0, imc: 33.5, txGordura: 46.6, aguaCorporal: 41.8, gorduraVisceral: 15, tmb: 1640, nota: 4.8 },
      { data: "18/06/2026", peso: 88.0, musculo: 29.8, gordura: 40.0, imc: 32.7, txGordura: 45.4, aguaCorporal: 42.2, gorduraVisceral: 14, tmb: 1650, nota: 5.5 },
      { data: "18/09/2026", peso: 86.5, musculo: 30.2, gordura: 38.2, imc: 32.1, txGordura: 44.1, aguaCorporal: 42.8, gorduraVisceral: 13, tmb: 1660, nota: 6.0 },
    ],
    scoreLabels: ["Saciedade","Fome","Energia","Sono","Humor","Libido","Fogachos","Perda urinária","Constipação","Atividade física","Adesão"],
    scoreAtual:   [7, 6, 7, 7, 7, 6, 7, 8, 7, 6, 8],
    scoreAnterior:[5, 8, 5, 6, 6, 4, 6, 7, 6, 3, 5],
    riscoCV: {
      nivel: "Intermediário",
      ldl: 152,
      metaLdl: 130,
      naoHdl: 170,
      metaNaoHdl: 160,
      reducaoLdl: 15,
      has: "Pré-hipertensão",
      dm: "Não",
      tabagismo: "Não fumante",
      historiaFamiliar: "Sim",
      apob: 108,
      metaApob: 90,
      lpa: 34,
      metaLpa: 50,
      pcrUs: 2.4,
      metaPcrUs: 1.0,
      fatores: ["Sobrepeso", "Sedentarismo pregresso", "Circunferência abdominal > 88cm"],
      sugestoes: ["Manter restrição de ultraprocessados", "Aumentar cardio para 180 min/semana"],
      preventScore: "5.4% de risco cardiovascular em 10 anos",
      metaAtingida: false
    },
    nutricaoMetas: { proteina: '110 g/dia', fibras: '30 g/dia', agua: '2,8 L/dia' },
    metasPersonalizadas: [
      { id: 'm_musc', nome: 'Musculação', freqDesejada: '3x/semana', meta: 3, realizado: 2, unidade: 'treinos', desc: 'Ativação metabólica' },
      { id: 'm_cardio', nome: 'Caminhada diária', freqDesejada: '4x/semana', meta: 4, realizado: 3, unidade: 'sessões', desc: 'Mínimo 6.000 passos/dia' }
    ],
    diarioHoje: {
      preenchido: false,
      data: "29/09/2026",
      horario: "",
      movimento: { musculacao: 'sim', cardio: 'nao_programado' },
      nutricao: { proteina: 'parcialmente', fibras: 'atingi', agua: 'atingi' },
      sono: { dormiu: '23:45', acordou: '06:50', duracao: '7h05', despertares: '2', qualidade: 6 },
      bemEstar: { energia: 6, estresse: 5 },
      metas: { m_musc: 'sim', m_cardio: 'nao_programado' },
      sintomas40: { fogachos: 4, ressecamento: 3, irritabilidade: 4, nevoa: 3, libido: 5 },
      observacoes: ""
    },
    medicamentos: [
      { nome:"Vitamina D3 em gotas", tipo:"Suplemento", dose:"7000UI", freq:"1x/dia", inicio:"18/03/2026", motivo:"Correção de deficiência", fim:"" },
      { nome:"N-Acetilcisteína (NAC)", tipo:"Suplemento", dose:"600mg", freq:"2x/dia", inicio:"18/03/2026", motivo:"Apoio hepático e antioxidante", fim:"" }
    ],
    arquivos: [
      { id: 1, titulo: "Ultrassonografia de Abdome Total", tipo: "Exames", data: "15/08/2026", origem: "Recebido", tamanho: "1.9 MB", icon: "🔬", desc: "Esteatose hepática grau 1 em regressão" }
    ],
    timeline: [
      { tipo:"Consulta", data:"18/09/2026", icone:"🩺", titulo:"4ª Consulta", desc:"Perda acumulada de 3.7kg. Gordura visceral caiu 2 pontos." }
    ],
  },
  {
    id: 6,
    nome: "Gabriela Torres",
    iniciais: "GT",
    idade: 26,
    nascimento: "30/09/2000",
    telefone: "(71) 93210-9876",
    objetivo: "Regularização menstrual pós-suspensão de anticoncepcional",
    protocolo: "Lapidar SOP",
    consultaAtual: "1ª Consulta",
    pesoInicial: 72.5,
    pesoAtual: 72.5,
    meta: 65,
    trh: "Não",
    contraceptivo: "Pílula suspensa recentemente",
    circunferenciaAbdominal: "80 cm",
    pressao: "118/76 mmHg",
    metas: ["Restabelecer ciclo natural sem sangramento de escape", "Perder 7kg", "Equilibrar acne e oleosidade"],
    metasConcluidas: 0,
    origemLead: "TikTok",
    observacoes: "Suspendeu anticoncepcional há 2 meses. Queixa de oleosidade e acne leve.",
    ultimaConsulta: "25/09/2026",
    proximaConsulta: "25/10/2026",
    bioimpedancia: [
      { data: "25/09/2026", peso: 72.5, musculo: 25.8, gordura: 31.4, imc: 26.8, txGordura: 43.3, aguaCorporal: 45.0, gorduraVisceral: 9, tmb: 1510, nota: 5.0 },
    ],
    scoreLabels: ["Saciedade","Fome","Energia","Sono","Humor","Libido","Fogachos","Perda urinária","Constipação","Atividade física","Adesão"],
    scoreAtual:   [6, 7, 5, 6, 5, 5, 10, 10, 6, 5, 7],
    scoreAnterior:[6, 7, 5, 6, 5, 5, 10, 10, 6, 5, 7],
    riscoCV: {
      nivel: "Baixo",
      ldl: 95,
      metaLdl: 160,
      naoHdl: 112,
      metaNaoHdl: 190,
      reducaoLdl: 0,
      has: "Não",
      dm: "Não",
      tabagismo: "Não fumante",
      historiaFamiliar: "Não",
      apob: 70,
      metaApob: 90,
      lpa: 15,
      metaLpa: 50,
      pcrUs: 0.8,
      metaPcrUs: 1.0,
      fatores: [],
      sugestoes: ["Acompanhar retorno dos ciclos nos próximos 90 dias"],
      preventScore: "0.6% de risco cardiovascular em 10 anos",
      metaAtingida: true
    },
    nutricaoMetas: { proteina: '85 g/dia', fibras: '25 g/dia', agua: '2,2 L/dia' },
    metasPersonalizadas: [
      { id: 'm_musc', nome: 'Musculação', freqDesejada: '3x/semana', meta: 3, realizado: 1, unidade: 'treinos', desc: 'Iniciando musculação orientada' },
      { id: 'm_sono', nome: 'Rotina de sono sem telas', freqDesejada: '5x/semana', meta: 5, realizado: 3, unidade: 'noites', desc: 'Desligar celular 30min antes' }
    ],
    diarioHoje: {
      preenchido: true,
      data: "29/09/2026",
      horario: "10:00",
      movimento: { musculacao: 'sim', cardio: 'nao_programado' },
      nutricao: { proteina: 'atingi', fibras: 'atingi', agua: 'atingi' },
      sono: { dormiu: '00:15', acordou: '07:30', duracao: '7h15', despertares: '0', qualidade: 7 },
      bemEstar: { energia: 7, estresse: 4 },
      metas: { m_musc: 'sim', m_sono: 'sim' },
      sintomas40: null,
      observacoes: "Primeira semana com os suplementos prescritos. Sem efeitos colaterais."
    },
    medicamentos: [
      { nome:"Inositol 40:1", tipo:"Suplemento", dose:"4g/dia", freq:"1x/dia", inicio:"25/09/2026", motivo:"SOP e regulação ovariana", fim:"" },
      { nome:"Zinco Quelado", tipo:"Suplemento", dose:"25mg", freq:"1x/dia", inicio:"25/09/2026", motivo:"Controle de oleosidade e acne", fim:"" }
    ],
    arquivos: [
      { id: 1, titulo: "Pedido de Exames Iniciais SOP", tipo: "Pedidos", data: "25/09/2026", origem: "Enviado", tamanho: "190 KB", icon: "📋", desc: "Hormônios, glicemia e insulina" }
    ],
    timeline: [
      { tipo:"Consulta", data:"25/09/2026", icone:"🩺", titulo:"1ª Consulta / Marco Zero", desc:"Início do plano Lapidar SOP. Prescrição de Inositol e solicitação de exames." }
    ],
  },
  {
    id: 7,
    nome: "Letícia Santos",
    iniciais: "LS",
    idade: 39,
    nascimento: "22/04/1987",
    telefone: "(85) 92109-8765",
    objetivo: "Pré-menopausa, controle do estresse e recomposição corporal",
    protocolo: "Lapidar 40+",
    consultaAtual: "3ª Consulta",
    pesoInicial: 75.0,
    pesoAtual: 72.1,
    meta: 67,
    trh: "Não",
    contraceptivo: "DIU hormonal",
    circunferenciaAbdominal: "78 cm",
    pressao: "115/78 mmHg",
    metas: ["Perder 8kg", "Melhorar sono profundo", "Vitamina D > 50", "Bota de compressão 2x/semana"],
    metasConcluidas: 2,
    origemLead: "Podcast",
    observacoes: "Transição peri-menopausa. Excelente evolução com higiene do sono e atividade física.",
    ultimaConsulta: "12/09/2026",
    proximaConsulta: "12/11/2026",
    bioimpedancia: [
      { data: "12/03/2026", peso: 75.0, musculo: 26.5, gordura: 32.0, imc: 28.4, txGordura: 42.6, aguaCorporal: 44.5, gorduraVisceral: 10, tmb: 1520, nota: 6.0 },
      { data: "12/06/2026", peso: 73.5, musculo: 26.8, gordura: 30.8, imc: 27.9, txGordura: 41.9, aguaCorporal: 44.8, gorduraVisceral: 9,  tmb: 1528, nota: 6.8 },
      { data: "12/09/2026", peso: 72.1, musculo: 27.2, gordura: 29.8, imc: 27.4, txGordura: 41.3, aguaCorporal: 45.2, gorduraVisceral: 9,  tmb: 1535, nota: 7.3 },
    ],
    scoreLabels: ["Saciedade","Fome","Energia","Sono","Humor","Libido","Fogachos","Perda urinária","Constipação","Atividade física","Adesão"],
    scoreAtual:   [8, 5, 8, 8, 9, 7, 8, 9, 8, 8, 9],
    scoreAnterior:[5, 7, 6, 5, 7, 5, 7, 8, 6, 6, 6],
    riscoCV: {
      nivel: "Baixo",
      ldl: 115,
      metaLdl: 160,
      naoHdl: 132,
      metaNaoHdl: 190,
      reducaoLdl: 0,
      has: "Não",
      dm: "Não",
      tabagismo: "Não fumante",
      historiaFamiliar: "Não",
      apob: 84,
      metaApob: 90,
      lpa: 24,
      metaLpa: 50,
      pcrUs: 0.7,
      metaPcrUs: 1.0,
      fatores: [],
      sugestoes: ["Manter estilo de vida protetor e controle de estresse"],
      preventScore: "1.5% risco cardiovascular em 10 anos",
      metaAtingida: true
    },
    nutricaoMetas: { proteina: '95 g/dia', fibras: '26 g/dia', agua: '2,4 L/dia' },
    metasPersonalizadas: [
      { id: 'm_bota', nome: 'Bota de compressão', freqDesejada: '2x/semana', meta: 2, realizado: 2, unidade: 'sessões', desc: 'Drenagem e recuperação pós-treino' },
      { id: 'm_musc', nome: 'Musculação', freqDesejada: '3x/semana', meta: 3, realizado: 3, unidade: 'treinos', desc: 'Força e postura' }
    ],
    diarioHoje: {
      preenchido: true,
      data: "29/09/2026",
      horario: "07:50",
      movimento: { musculacao: 'sim', cardio: 'nao_programado' },
      nutricao: { proteina: 'atingi', fibras: 'atingi', agua: 'atingi' },
      sono: { dormiu: '22:30', acordou: '06:15', duracao: '7h45', despertares: '0', qualidade: 9 },
      bemEstar: { energia: 9, estresse: 2 },
      metas: { m_bota: 'sim', m_musc: 'sim' },
      sintomas40: { fogachos: 2, ressecamento: 1, irritabilidade: 1, nevoa: 1, libido: 8 },
      observacoes: "Sensação maravilhosa de descanso. Dormi a noite inteira sem interrupções."
    },
    medicamentos: [
      { nome:"Vitamina D3 em gotas", tipo:"Suplemento", dose:"5000UI", freq:"1x/dia", inicio:"12/03/2026", motivo:"Nível anterior baixo", fim:"" },
      { nome:"Melatonina sublingual", tipo:"Suplemento", dose:"0.5mg", freq:"1x/noite", inicio:"12/03/2026", motivo:"Indução do sono profundo", fim:"" }
    ],
    arquivos: [
      { id: 1, titulo: "Exames de Rotina Semestrais", tipo: "Exames", data: "01/09/2026", origem: "Recebido", tamanho: "1.6 MB", icon: "🔬", desc: "Vitamina D agora em 52 ng/mL (normalizada)" }
    ],
    timeline: [
      { tipo:"Consulta", data:"12/09/2026", icone:"🩺", titulo:"3ª Consulta", desc:"Sono consolidado. Meta de peso em 72.1kg com melhora de tônus." }
    ],
  },
  {
    id: 8,
    nome: "Patricia Souza",
    iniciais: "PS",
    idade: 55,
    nascimento: "03/12/1970",
    telefone: "(62) 91098-7654",
    objetivo: "Saúde óssea pós-menopausa, osteopenia e controle de LDL",
    protocolo: "Lapidar 40+",
    consultaAtual: "6ª Consulta",
    pesoInicial: 68.0,
    pesoAtual: 65.5,
    meta: 63,
    trh: "Sim",
    contraceptivo: "Não",
    circunferenciaAbdominal: "79 cm",
    pressao: "122/80 mmHg",
    metas: ["Estabilizar densitometria óssea", "LDL < 100", "Preservar massa magra", "Treinos de impacto e carga"],
    metasConcluidas: 3,
    origemLead: "Indicação",
    observacoes: "Pós-menopausa estável. Densitometria recente confirmou estabilidade da massa óssea. Excelente disposição.",
    ultimaConsulta: "22/09/2026",
    proximaConsulta: "22/01/2027",
    bioimpedancia: [
      { data: "22/01/2026", peso: 68.0, musculo: 22.8, gordura: 30.5, imc: 26.6, txGordura: 44.8, aguaCorporal: 43.8, gorduraVisceral: 10, tmb: 1430, nota: 7.0 },
      { data: "22/05/2026", peso: 66.8, musculo: 23.1, gordura: 29.5, imc: 26.1, txGordura: 44.1, aguaCorporal: 44.1, gorduraVisceral: 9,  tmb: 1440, nota: 7.6 },
      { data: "22/09/2026", peso: 65.5, musculo: 23.4, gordura: 28.5, imc: 25.6, txGordura: 43.5, aguaCorporal: 44.5, gorduraVisceral: 8,  tmb: 1448, nota: 8.0 },
    ],
    scoreLabels: ["Saciedade","Fome","Energia","Sono","Humor","Libido","Fogachos","Perda urinária","Constipação","Atividade física","Adesão"],
    scoreAtual:   [9, 4, 9, 8, 9, 7, 8, 9, 8, 9, 9],
    scoreAnterior:[7, 5, 7, 7, 8, 6, 8, 8, 7, 7, 7],
    riscoCV: {
      nivel: "Intermediário",
      ldl: 128,
      metaLdl: 100,
      naoHdl: 145,
      metaNaoHdl: 130,
      reducaoLdl: 22,
      has: "Não",
      dm: "Não",
      tabagismo: "Não fumante",
      historiaFamiliar: "Sim (avó com osteoporose severa)",
      apob: 96,
      metaApob: 90,
      lpa: 30,
      metaLpa: 50,
      pcrUs: 1.2,
      metaPcrUs: 1.0,
      fatores: ["Pós-menopausa", "História familiar de osteoporose"],
      sugestoes: ["Manter ingestão adequada de cálcio e vitamina D", "Exercícios resistidos com carga progressiva"],
      preventScore: "4.1% risco cardiovascular em 10 anos",
      metaAtingida: false
    },
    nutricaoMetas: { proteina: '95 g/dia', fibras: '28 g/dia', agua: '2,6 L/dia' },
    metasPersonalizadas: [
      { id: 'm_musc', nome: 'Musculação com carga', freqDesejada: '3x/semana', meta: 3, realizado: 3, unidade: 'treinos', desc: 'Estímulo piezoelétrico ósseo' },
      { id: 'm_ar_livre', nome: 'Tempo ao ar livre', freqDesejada: '4x/semana', meta: 4, realizado: 4, unidade: 'dias', desc: 'Sol matinal e caminhada' }
    ],
    diarioHoje: {
      preenchido: true,
      data: "29/09/2026",
      horario: "08:40",
      movimento: { musculacao: 'sim', cardio: 'nao_programado' },
      nutricao: { proteina: 'atingi', fibras: 'atingi', agua: 'atingi' },
      sono: { dormiu: '22:15', acordou: '06:30', duracao: '8h15', despertares: '0', qualidade: 9 },
      bemEstar: { energia: 9, estresse: 1 },
      metas: { m_musc: 'sim', m_ar_livre: 'sim' },
      sintomas40: { fogachos: 1, ressecamento: 1, irritabilidade: 1, nevoa: 1, libido: 7 },
      observacoes: "Completando 1 ano de Método Lapidar! Mudança de vida impressionante."
    },
    medicamentos: [
      { nome:"Estradiol transdérmico", tipo:"Medicamento", dose:"50mcg", freq:"Adesivo 2x/sem", inicio:"10/01/2026", motivo:"TRH menopausa", fim:"", receita:"receita_patricia.pdf" },
      { nome:"Cálcio MCHA + Vitamina D3 + K2", tipo:"Suplemento", dose:"1000mg + 2000UI", freq:"1x/dia", inicio:"10/01/2026", motivo:"Suporte ósseo", fim:"" },
      { nome:"Peptídeos de Colágeno Fortibone", tipo:"Suplemento", dose:"5g", freq:"1x/dia", inicio:"10/01/2026", motivo:"Saúde da matriz óssea", fim:"" }
    ],
    arquivos: [
      { id: 1, titulo: "Laudo Densitometria Óssea DEXA", tipo: "Exames", data: "10/09/2026", origem: "Recebido", tamanho: "2.4 MB", icon: "🔬", desc: "Coluna lombar e fêmur — massa estável" },
      { id: 2, titulo: "Receita — TRH e Nutracêuticos", tipo: "Receitas", data: "22/09/2026", origem: "Enviado", tamanho: "220 KB", icon: "📄", desc: "Renovação semestral" }
    ],
    timeline: [
      { tipo:"Consulta", data:"22/09/2026", icone:"🩺", titulo:"6ª Consulta de Fechamento de Ciclo", desc:"Densitometria estável. Transição para plano de Manutenção Trimestral." }
    ],
  },
];

try {
  const savedPatients = JSON.parse(localStorage.getItem('lapidar-pacientes'));
  if (Array.isArray(savedPatients) && savedPatients.length) {
    PACIENTES.splice(0, PACIENTES.length, ...savedPatients);
  }
} catch(e) {}

const CONSULTAS = [
  { id:1, data: dateOffset(0), horario:"09:00", paciente:"Ana Paula Ferreira", tipo:"Retorno", protocolo:"Lapidar 40+", status:"agendada" },
  { id:2, data: dateOffset(0), horario:"10:30", paciente:"Beatriz Lima", tipo:"Retorno", protocolo:"Lapidar SOP", status:"agendada" },
  { id:3, data: dateOffset(0), horario:"14:00", paciente:"Carla Mendes", tipo:"Bioimpedância", protocolo:"Lapidar 40+", status:"agendada" },
  { id:4, data: dateOffset(1), horario:"08:30", paciente:"Daniela Rocha", tipo:"Retorno", protocolo:"Lapidar Fertilidade", status:"agendada" },
  { id:5, data: dateOffset(1), horario:"10:00", paciente:"Fernanda Alves", tipo:"Retorno", protocolo:"Pocket", status:"agendada" },
  { id:6, data: dateOffset(1), horario:"11:30", paciente:"Gabriela Torres", tipo:"Primeira consulta", protocolo:"Lapidar SOP", status:"agendada" },
  { id:7, data: dateOffset(2), horario:"09:00", paciente:"Letícia Santos", tipo:"Exames", protocolo:"Lapidar 40+", status:"agendada" },
  { id:8, data: dateOffset(2), horario:"14:00", paciente:"Patricia Souza", tipo:"Retorno", protocolo:"Lapidar 40+", status:"agendada" },
  { id:9, data: dateOffset(5), horario:"10:00", paciente:"Ana Paula Ferreira", tipo:"Bioimpedância", protocolo:"Lapidar 40+", status:"agendada" },
  { id:10,data: dateOffset(7), horario:"09:00", paciente:"Beatriz Lima", tipo:"Retorno", protocolo:"Lapidar SOP", status:"agendada" },
  { id:11,data: dateOffset(7), horario:"11:00", paciente:"Carla Mendes", tipo:"Retorno", protocolo:"Lapidar 40+", status:"agendada" },
  { id:12,data: dateOffset(14),horario:"08:00", paciente:"Fernanda Alves", tipo:"Retorno", protocolo:"Pocket", status:"agendada" },
];

const ALERTAS = [
  { paciente:"Carla Mendes",   protocolo:"Lapidar 40+",       tipo:"LDL acima da meta" },
  { paciente:"Fernanda Alves", protocolo:"Pocket",             tipo:"LDL acima da meta" },
  { paciente:"Beatriz Lima",   protocolo:"Lapidar SOP",        tipo:"Vitamina D baixa" },
  { paciente:"Gabriela Torres",protocolo:"Lapidar SOP",        tipo:"Bioimpedância pendente" },
  { paciente:"Daniela Rocha",  protocolo:"Lapidar Fertilidade",tipo:"Exames pendentes" },
  { paciente:"Patricia Souza", protocolo:"Lapidar 40+",        tipo:"Exames pendentes" },
  { paciente:"Fernanda Alves", protocolo:"Pocket",             tipo:"Sem atividade física" },
];

const PROXIMOS_CONTATOS = [
  { paciente:"Ana Paula Ferreira", horario:"09:00", motivo:"Retorno 30 dias · Avaliação TRH" },
  { paciente:"Beatriz Lima",       horario:"10:30", motivo:"Acompanhamento de ciclo menstrual" },
  { paciente:"Carla Mendes",       horario:"14:00", motivo:"Discussão de novo lipidograma" },
  { paciente:"Fernanda Alves",     horario:"15:30", motivo:"Check-in diário e motivação" },
];

const TRANSACOES = [
  { data:"01/09/2026", paciente:"Ana Paula Ferreira", plano:"Lapidar 40+", valor:850, parcelas:"1/3",  status:"pago" },
  { data:"05/09/2026", paciente:"Beatriz Lima",       plano:"Lapidar SOP", valor:750, parcelas:"1/3",  status:"pago" },
  { data:"08/09/2026", paciente:"Carla Mendes",       plano:"Lapidar 40+", valor:850, parcelas:"3/3",  status:"pago" },
  { data:"10/09/2026", paciente:"Daniela Rocha",      plano:"Lapidar Fertilidade", valor:920, parcelas:"1/2", status:"pago" },
  { data:"12/09/2026", paciente:"Fernanda Alves",     plano:"Pocket",      valor:480, parcelas:"1/1",  status:"pago" },
  { data:"15/09/2026", paciente:"Gabriela Torres",    plano:"Lapidar SOP", valor:750, parcelas:"1/3",  status:"pendente" },
  { data:"18/09/2026", paciente:"Letícia Santos",     plano:"Lapidar 40+", valor:850, parcelas:"2/3",  status:"pago" },
  { data:"20/09/2026", paciente:"Patricia Souza",     plano:"Lapidar 40+", valor:850, parcelas:"1/6",  status:"pendente" },
  { data:"22/09/2026", paciente:"Ana Paula Ferreira", plano:"Lapidar 40+", valor:850, parcelas:"2/3",  status:"pago" },
  { data:"25/09/2026", paciente:"Beatriz Lima",       plano:"Lapidar SOP", valor:750, parcelas:"2/3",  status:"pago" },
];

TRANSACOES.forEach((transaction, index) => {
  transaction.tipo = 'Receita';
  transaction.origem = 'Paciente';
  transaction.destino = 'Clínica Lapidar';
  transaction.usuario = index % 2 === 0 ? 'Dra. Andressa Gomide' : 'Secretaria';
});

TRANSACOES.push(
  { data:"04/09/2026", paciente:"Clínica Lapidar", plano:"Despesas operacionais", valor:420, parcelas:"—", status:"pago", tipo:"Despesa", origem:"Clínica Lapidar", destino:"Laboratório parceiro", usuario:"Secretaria" },
  { data:"19/09/2026", paciente:"Clínica Lapidar", plano:"Materiais clínicos", valor:280, parcelas:"—", status:"pendente", tipo:"Despesa", origem:"Clínica Lapidar", destino:"Fornecedor", usuario:"Dra. Andressa Gomide" }
);

const PROTO_DIST = (() => {
  const protocolColors = {
    "Lapidar 40+": "#5B2333",
    "Lapidar SOP": "#C6A15B",
    "Lapidar Fertilidade": "#66724A",
    Pocket: "#7A3047",
  };
  const fallbackColors = ["#3F6B73", "#A84A35", "#786A9B"];
  const protocolNames = [...new Set(PACIENTES.map(patient => patient.protocolo).filter(Boolean))];
  return protocolNames.map((nome, index) => ({
    nome,
    valor: PACIENTES.filter(patient => patient.protocolo === nome).length,
    cor: protocolColors[nome] || fallbackColors[index % fallbackColors.length],
  }));
})();

const CONSULTAS_SEMANA = (() => {
  const weekdays = ["Seg", "Ter", "Qua", "Qui", "Sex"];
  const currentDate = new Date();
  const daysToMonday = currentDate.getDay() === 0 ? 1 : 1 - currentDate.getDay();
  const monday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + daysToMonday);
  return weekdays.map((dia, index) => {
    const weekday = new Date(monday);
    weekday.setDate(monday.getDate() + index);
    const date = `${weekday.getFullYear()}-${String(weekday.getMonth() + 1).padStart(2, "0")}-${String(weekday.getDate()).padStart(2, "0")}`;
    return {
      dia,
      n: CONSULTAS.filter(consultation => consultation.data === date && consultation.status === "agendada").length,
    };
  });
})();

function dateOffset(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function formatDate(isoDate) {
  if (!isoDate) return '';
  const [y,m,d] = isoDate.split('-');
  return `${d}/${m}/${y}`;
}
