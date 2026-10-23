/* ============================================================
   LAPIDAR — Componentes JS (geradores de HTML)
   ============================================================ */

const Icons = {
  dashboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  patients:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  contents:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  agenda:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  financial: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  settings:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  portal:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  logout:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  bell:      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  plus:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  search:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  close:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  chevronL:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevronR:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  message:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  consult:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>`,
  diary:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>`,
  events:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 15 2 2 4-4"/></svg>`,
  contacts:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1M17 11h4m-2-2v4M17 19h4"/></svg>`,
  help:      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 4.2 1.8c-1.1 1-1.8 1.4-1.8 3"/><path d="M12 17h.01"/></svg>`,
  flag:      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V5"/><path d="M5 5c5-4 9 4 14 0v10c-5 4-9-4-14 0"/></svg>`,
  medical:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="15" rx="2"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M12 10v7M8.5 13.5h7"/></svg>`,
  forms:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/></svg>`,
  home:      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
};

const ROLE_LABELS = {
  doctor:    'Dra. Andressa Gomide',
  secretary: 'Gabi',
  patient:   'Paciente',
  developer: 'Desenvolvedor',
  society:   'Assinante Lapidar Society',
};

// Perfis de demonstração equivalentes ao seletor do Flutter (papel + isAdmin).
const DEMO_PROFILES = [
  { id:'developer',       label:'Desenvolvedor', description:'Só logs do sistema e configurações' },
  { id:'doctor-admin',    label:'Médica', description:'Acesso completo: clínico, financeiro geral e sistema' },
  { id:'doctor',          label:'Médica (sem admin)', description:'Consultas e agenda; ficha só leitura; financeiro próprio' },
  { id:'secretary-admin', label:'Secretária (Admin)', description:'Agenda, contatos, financeiro geral e sistema' },
  { id:'secretary',       label:'Secretária', description:'Agenda, contatos e o próprio financeiro' },
  { id:'patient',         label:'Paciente', description:'Diário, ficha, consultas e conteúdos' },
  { id:'society',         label:'Assinante', description:'Conteúdos, eventos e diário Lapidar Society' },
];

function getDemoAccounts() {
  const initialsFor = name => name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toLocaleUpperCase('pt-BR');
  const staff = [
    { id:'doctor-andressa', profileId:'doctor-admin', group:'Médicas', name:'Dra. Andressa Gomide', description:'Ginecologista endócrina', initials:'DG' },
    { id:'doctor-helena', profileId:'doctor', group:'Médicas', name:'Dra. Helena Prado', description:'Médica (sem admin)', initials:'DP' },
    { id:'secretary-carla', profileId:'secretary', group:'Secretárias', name:'Carla Mendes', description:'Secretária', initials:'CM' },
    { id:'secretary-gabi', profileId:'secretary-admin', group:'Secretárias', name:'Gabi', description:'Secretária (admin)', initials:'G' },
    { id:'developer', profileId:'developer', group:'Desenvolvimento', name:'Desenvolvedor', description:'Desenvolvedor do sistema', initials:'D' },
  ];
  const patients = (Array.isArray(PACIENTES) ? PACIENTES : []).map(patient => ({
    id:`patient-${patient.id}`,
    profileId:'patient',
    group:'Pacientes',
    name:patient.nome,
    description:'Paciente',
    initials:patient.iniciais || initialsFor(patient.nome),
    patientId:patient.id,
  }));
  return [
    ...staff,
    ...patients,
    { id:'society-initial', profileId:'society', group:'Assinantes', name:'Camila Duarte', description:'Assinante — Society Inicial', initials:'CD' },
    { id:'society-plus', profileId:'society', group:'Assinantes', name:'Renata Albuquerque', description:'Assinante — Society Plus', initials:'RA' },
  ];
}

function getCurrentDemoAccount(accounts = getDemoAccounts()) {
  const state = Router.getState();
  const saved = accounts.find(account => account.id === state.demoUserId);
  if (saved) return saved;
  const defaultIds = {
    'doctor-admin':'doctor-andressa',
    doctor:'doctor-helena',
    'secretary-admin':'secretary-gabi',
    secretary:'secretary-carla',
    developer:'developer',
    patient:`patient-${Router.getSelectedPatient()?.id || 1}`,
    society:'society-initial',
  };
  return accounts.find(account => account.id === defaultIds[Router.getProfileId()]) || accounts[0];
}

function renderDemoAccountPicker(accounts, selectedAccount) {
  const groups = [...new Set(accounts.map(account => account.group))];
  return `
    <div class="modal-overlay account-picker-overlay" id="account-picker" role="dialog" aria-modal="true" aria-labelledby="account-picker-title">
      <section class="account-picker-dialog">
        <header class="account-picker-header">
          <span class="account-picker-heading-icon" aria-hidden="true">${Icons.portal}</span>
          <h2 id="account-picker-title">Entrar como</h2>
          <button class="account-picker-close" type="button" data-account-picker-close aria-label="Fechar">${Icons.close}</button>
        </header>
        <div class="account-picker-body">
          <label class="account-picker-search">
            ${Icons.search}
            <input id="account-picker-search" type="search" placeholder="Buscar por nome ou cargo" autocomplete="off">
          </label>
          <div class="account-picker-list">
            ${groups.map(group => `
              <section class="account-picker-group" data-account-group>
                <h3>${escapePatientCardText(group)}</h3>
                ${accounts.filter(account => account.group === group).map(account => `
                  <button class="demo-account-item ${account.id === selectedAccount.id ? 'selected' : ''}" type="button"
                    data-demo-account="${escapePatientCardText(account.id)}"
                    data-search-text="${escapePatientCardText(`${account.name} ${account.description} ${group}`.toLocaleLowerCase('pt-BR'))}"
                    aria-pressed="${account.id === selectedAccount.id}">
                    <span class="demo-account-avatar">${escapePatientCardText(account.initials)}</span>
                    <span class="demo-account-copy"><strong>${escapePatientCardText(account.name)}</strong><small>${escapePatientCardText(account.description)}</small></span>
                    <span class="demo-account-check" aria-hidden="true">${account.id === selectedAccount.id ? '✓' : ''}</span>
                  </button>`).join('')}
              </section>`).join('')}
          </div>
        </div>
        <footer class="account-picker-footer"><button type="button" data-account-picker-close>Fechar</button></footer>
      </section>
    </div>`;
}

function getProfileLabel() {
  const profile = DEMO_PROFILES.find(item => item.id === Router.getProfileId());
  return profile ? profile.label : 'Perfil Lapidar';
}

function getUnreadMessagesCount() {
  try {
    const messages = loadMessages();
    if (Router.getRole() === 'patient') {
      const patientId = Router.getSelectedPatient()?.id || 1;
      return messages.filter(m => m.patientId === patientId && m.direction === 'enviada' && !m.read).length;
    }
    return messages.filter(m => m.direction === 'recebida' && !m.read).length;
  } catch (error) {
    return 0;
  }
}

function appendSystemAudit({ usuario, acao, tabela, registroId, detalhes }) {
  const key = 'lapidar-auditoria';
  let entries = [];
  const stored = localStorage.getItem(key);
  if (stored) {
    entries = JSON.parse(stored);
    if (!Array.isArray(entries)) throw new TypeError('A tabela de auditoria local está inválida.');
  }
  const entry = {
    id:Date.now() + '-' + Math.random().toString(36).slice(2, 7),
    usuario:usuario || getProfileLabel(),
    acao:String(acao || 'edição'),
    tabela:String(tabela || 'sistema'),
    registroId:registroId == null ? '' : String(registroId),
    detalhes:String(detalhes || ''),
    data:new Date().toISOString(),
  };
  localStorage.setItem(key, JSON.stringify([entry, ...entries].slice(0, 2000)));
  return entry;
}

const ROLE_MENU = {
  doctor: [
    { page:'dashboard', label:'Dashboard', icon:'dashboard' },
    { page:'patients',  label:'Pacientes', icon:'patients' },
    { page:'agenda',    label:'Agenda',    icon:'agenda' },
    { page:'consultations', label:'Consultas', icon:'consult' },
    { page:'messages',  label:'Mensagens', icon:'message' },
    { page:'financial', label:'Financeiro',icon:'financial' },
    { page:'forms', label:'Formulários', icon:'forms' },
    { page:'contents',  label:'Conteúdos', icon:'contents' },
    { page:'events', label:'Eventos', icon:'events' },
    { page:'contacts', label:'Contatos', icon:'contacts' },
    { page:'notifications', label:'Notificações', icon:'bell' },
    { page:'settings',  label:'Configurações', icon:'settings' },
  ],
  secretary: [
    { page:'dashboard', label:'Dashboard', icon:'dashboard' },
    { page:'patients',  label:'Pacientes', icon:'patients' },
    { page:'agenda',    label:'Agenda',    icon:'agenda' },
    { page:'messages',  label:'Mensagens', icon:'message' },
    { page:'financial', label:'Financeiro',icon:'financial' },
    { page:'forms', label:'Formulários', icon:'forms' },
    { page:'contents',  label:'Conteúdos', icon:'contents' },
    { page:'events', label:'Eventos', icon:'events' },
    { page:'contacts', label:'Contatos', icon:'contacts' },
    { page:'notifications', label:'Notificações', icon:'bell' },
    { page:'settings',  label:'Configurações', icon:'settings' },
  ],
  patient: [
    { page:'habits', label:'Diário', icon:'diary' },
    { page:'consultations', label:'Consultas', icon:'consult' },
    { page:'patient-detail', label:'Minha ficha', icon:'portal' },
    { page:'forms', label:'Formulários', icon:'forms' },
    { page:'contents', label:'Conteúdos', icon:'contents' },
    { page:'events', label:'Eventos', icon:'events' },
    { page:'contacts', label:'Contatos', icon:'contacts' },
    { page:'notifications', label:'Notificações', icon:'bell' },
    { page:'patient-profile', label:'Perfil', icon:'portal' },
    { page:'settings', label:'Configurações', icon:'settings' },
  ],
  society: [
    { page:'contents', label:'Conteúdos', icon:'contents' },
    { page:'events', label:'Eventos', icon:'events' },
    { page:'habits', label:'Diário Lapidar', icon:'diary' },
  ],
  developer: [
    { page:'logs', label:'Logs', icon:'dashboard' },
    { page:'forms', label:'Formulários', icon:'forms' },
    { page:'events', label:'Eventos', icon:'events' },
    { page:'contacts', label:'Contatos', icon:'contacts' },
    { page:'notifications', label:'Notificações', icon:'bell' },
    { page:'settings', label:'Configurações', icon:'settings' },
  ],
};

function renderTopbar(activePage) {
  const role = Router.getRole();
  const menu = ROLE_MENU[role] || ROLE_MENU.doctor;
  const demoAccounts = getDemoAccounts();
  const activeDemoAccount = getCurrentDemoAccount(demoAccounts);
  const canOpenForms = menu.some(item => item.page === 'forms');
  const canOpenSettings = menu.some(item => item.page === 'settings');
  const patientId = role === 'patient' ? (Router.getSelectedPatient()?.id || 1) : null;
  const notificationKey = role === 'patient'
    ? 'lapidar-notification-feed-' + patientId
    : 'lapidar-notification-feed-' + Router.getProfileId();
  let notifications = [];
  try {
    const parsed = JSON.parse(localStorage.getItem(notificationKey) || '[]');
    if (Array.isArray(parsed)) notifications = parsed.filter(notification => notification && typeof notification === 'object');
  } catch (error) {
    console.error('Não foi possível carregar as notificações.', error);
  }
  const patient = patientId == null ? null : PACIENTES.find(item => item.id === patientId);
  if (role === 'patient' && patient) {
    const localNow = new Date();
    const todayKey = `${localNow.getFullYear()}-${String(localNow.getMonth() + 1).padStart(2, '0')}-${String(localNow.getDate()).padStart(2, '0')}`;
    let checkinComplete = false;
    try {
      checkinComplete = localStorage.getItem(`lapidar-diario-${patient.id}-${todayKey}`) !== null;
    } catch (error) {
      console.error('Não foi possível conferir o check-in de hoje.', error);
    }
    notifications = notifications.concat([
      { title:'Check-in de hoje', detail:checkinComplete ? 'Seu check-in de hoje está registrado.' : 'Registre o check-in de hoje no Diário Lapidar.', targetPage:'habits', unread:!checkinComplete },
      { title:'Minhas metas', detail:'Acompanhe suas metas e o progresso desta semana.', targetPage:'habits', unread:false },
      { title:'Consultas e exames', detail:'Consulte os próximos atendimentos e seus exames.', targetPage:'consultations', unread:false },
      { title:'Mensagens da clínica', detail:'Abra sua conversa com a equipe.', targetPage:'messages', unread:getUnreadMessagesCount() > 0 },
    ]);
  } else if (role === 'doctor') {
    const alerts = (Array.isArray(ALERTAS) ? ALERTAS : []).slice(0, 6);
    notifications = notifications.concat(alerts.map(alert => ({
      title:`${alert.paciente} — ${alert.tipo}`,
      detail:`Protocolo ${alert.protocolo || 'não informado'}. Abra a ficha para revisar este alerta.`,
      targetPage:'patient-detail',
      patientId:(PACIENTES.find(item => item.nome === alert.paciente) || {}).id,
      tab:alert.tipo === 'LDL acima da meta' ? 'risco' : alert.tipo === 'Sem atividade física' ? 'score' : 'painel',
      unread:true,
    })));
  }
  const notifCount = notifications.filter(notification => notification.unread === true).length;
  const formatBadgeCount = count => count > 9 ? '9+' : count;
  const profile = DEMO_PROFILES.find(item => item.id === Router.getProfileId()) || DEMO_PROFILES[0];
  const savedIdentity = Router.getState();
  const displayName = savedIdentity.demoUserName || activeDemoAccount?.name || ROLE_LABELS[role] || profile.label;
  const avatarInitials = savedIdentity.demoUserInitials || activeDemoAccount?.initials || 'L';
  const roleDescription = savedIdentity.demoUserDescription || activeDemoAccount?.description || profile.label;
  const mobileRoleLabel = role === 'doctor' ? 'Médica' : role === 'secretary' ? 'Secretaria' : role === 'patient' ? 'Paciente' : role === 'society' ? 'Assinante' : 'Desenvolvedor';
  const pageTitles = {
    dashboard:'Dashboard', patients:'Pacientes', agenda:'Agenda', consultations:'Consultas',
    'patient-detail':role === 'patient' ? 'Minha ficha' : 'Ficha da paciente',
    'patient-profile':role === 'patient' ? 'Meu perfil' : 'Perfil da paciente',
    'patient-registration':'Cadastro de paciente', consultation:'Consulta', messages:'Mensagens',
    financial:'Financeiro', contents:'Conteúdos', settings:'Configurações', habits:'Diário Lapidar',
    journey:'Jornada operacional', logs:'Logs do sistema', profile:'Perfil',
    forms:'Formulários', events:'Eventos', contacts:'Contatos', notifications:'Notificações',
  };
  const date = new Intl.DateTimeFormat('pt-BR', { weekday:'long', day:'numeric', month:'long' }).format(new Date());
  const monday = new Date();
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  const weekConsultations = (Array.isArray(CONSULTAS) ? CONSULTAS : []).filter(item => {
    const day = new Date(`${item.data}T12:00:00`);
    return day >= monday && day < new Date(monday.getTime() + 7 * 86400000);
  }).length;
  const notificationMarkup = notifications.map(notification => `
    <button type="button" class="notif-item ${notification.unread ? 'unread' : ''}" data-notification-page="${escapePatientCardText(notification.targetPage || (role === 'patient' ? 'consultations' : 'patients'))}" data-notification-patient="${Number(notification.patientId) || ''}" data-notification-tab="${escapePatientCardText(notification.tab || '')}">
      <span class="notif-dot"></span><span><span class="notif-text">${escapePatientCardText(notification.title || notification.text || 'Notificação')}</span><span class="notif-time">${escapePatientCardText(notification.time || '')}</span><span class="notif-detail">${escapePatientCardText(notification.detail || '')}</span></span>
    </button>
  `).join('') || '<p class="notif-empty">Nenhuma notificação no momento.</p>';
  return `
  <header class="topbar">
    <div class="topbar-brand">
      <button class="hamburger-btn" id="hamburger-btn" aria-label="Abrir menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <div class="topbar-logo" onclick="Router.navigate(Router.getHomePage())" style="cursor:pointer;display:flex;align-items:center;gap:8px;">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:var(--vinho);">
        <img src="../assets/logo_lapidar_tp.png" alt="" style="height:24px;width:24px;object-fit:contain;filter:brightness(0) invert(1);" onerror="this.style.display='none';this.nextElementSibling.style.display='inline-block';">
        <svg style="display:none;" width="24" height="24" viewBox="0 0 40 40" fill="none">
          <polygon points="20,4 36,32 4,32" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
          <circle cx="20" cy="20" r="3" fill="#FFFFFF"/>
        </svg>
        </span>
        Lapidar
      </div>
      <div class="topbar-mobile-heading">
        <span class="topbar-mobile-title">${escapePatientCardText(pageTitles[activePage] || 'Lapidar')}</span>
        <span class="topbar-mobile-subtitle">${escapePatientCardText(mobileRoleLabel)} · Lapidar</span>
      </div>
      <div class="topbar-date-summary"><strong>${escapePatientCardText(date)}</strong><span>${weekConsultations} consultas na semana${role === 'doctor' ? ` · ${ALERTAS.length} alertas` : ''}</span></div>
    </div>
    <div class="topbar-right">
      <div class="topbar-role-menu">
        <button class="topbar-role-trigger" id="role-menu-trigger" type="button" aria-label="Escolher usuário" aria-expanded="false" aria-controls="account-picker">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="10" r="2.5"/><path d="M7.5 17c.9-1.7 2.4-2.5 4.5-2.5s3.6.8 4.5 2.5"/>
          </svg>
          <span class="topbar-role-copy">Demonstração</span>
        </button>
      </div>
      <div class="topbar-actions">
        <button class="topbar-icon-btn" id="help-shortcut" type="button" aria-label="Abrir guia" title="Guia">${Icons.help}</button>
        <div class="topbar-notifications">
          <button class="topbar-icon-btn" id="notif-btn" aria-label="Notificações">
            ${Icons.bell}
            ${notifCount > 0 ? `<span class="notif-badge">${formatBadgeCount(notifCount)}</span>` : ''}
          </button>
          <div class="notif-dropdown" id="notif-dropdown">
          <div class="notif-header">
            <div><h4>Notificações</h4><span class="notif-pending">${notifCount} pendência(s)</span></div>
            <button id="mark-all-read">Marcar todas como lidas</button>
          </div>
          ${notificationMarkup}
          </div>
        </div>
        ${canOpenForms ? `<button class="topbar-icon-btn" id="forms-shortcut" type="button" aria-label="Formulários" title="Formulários">${Icons.forms}</button>` : ''}
        ${canOpenSettings ? `<button class="topbar-icon-btn" id="settings-shortcut" type="button" aria-label="Configurações" title="Configurações">${Icons.settings}</button>` : ''}
        <div class="topbar-user-menu">
          <button class="topbar-user-trigger" id="topbar-user-trigger" type="button" aria-expanded="false" aria-controls="topbar-user-dropdown">
            <span class="avatar">${escapePatientCardText(avatarInitials)}</span><span class="topbar-user-copy"><strong>${escapePatientCardText(displayName)}</strong><small>${escapePatientCardText(roleDescription)}</small></span><span aria-hidden="true">⌄</span>
          </button>
          <div class="topbar-user-dropdown" id="topbar-user-dropdown" hidden>
            ${role !== 'developer' ? `<button type="button" data-user-action="profile">Meu perfil</button>` : ''}
            <button type="button" data-user-action="settings">Configurações</button>
            <button type="button" data-user-action="logout">Sair</button>
          </div>
        </div>
      </div>
    </div>
  </header>
  ${renderDemoAccountPicker(demoAccounts, activeDemoAccount)}
  <div class="modal-overlay guide-overlay" id="lapidar-guide-modal" role="dialog" aria-modal="true" aria-labelledby="lapidar-guide-title">
    <section class="modal guide-modal">
      <header class="modal-header guide-header">
        <span class="guide-heading-icon" aria-hidden="true">${Icons.help}</span>
        <h2 class="modal-title" id="lapidar-guide-title">Guia</h2>
        <button class="modal-close" id="close-guide" type="button" aria-label="Fechar guia">${Icons.close}</button>
      </header>
      <div class="guide-content">
        <nav class="guide-nav" aria-label="Seções do guia">
          <button class="guide-nav-item active" type="button" data-guide-page="intro" aria-current="page">${Icons.flag}<span>Primeiros passos</span></button>
          ${menu.map(item => `<button class="guide-nav-item" type="button" data-guide-page="${escapePatientCardText(item.page)}">${Icons[item.icon] || Icons.dashboard}<span>${escapePatientCardText(item.label)}</span></button>`).join('')}
        </nav>
        <div class="guide-panel" aria-live="polite">
          <p class="guide-callout">${Icons.help}<span>Para rever este guia quando quiser, toque no ponto de interrogação (?) na barra superior.</span></p>
          <div class="guide-detail">
            <span class="guide-detail-icon" id="guide-detail-icon" aria-hidden="true">${Icons.flag}</span>
            <div>
              <h3 id="guide-section-title">Primeiros passos</h3>
              <p id="guide-section-description">Como andar pelo sistema: menu, barra superior e atalhos.</p>
            </div>
          </div>
          <div class="guide-preview" id="guide-preview" role="img" aria-label="Prévia do dashboard Lapidar">
            <div class="guide-preview-topbar">
              <span class="guide-preview-brand">Lapidar</span>
              <span class="guide-preview-topbar-actions">${Icons.help}${Icons.bell}${Icons.consult}<i>DG</i></span>
            </div>
            <div class="guide-preview-shell">
              <div class="guide-preview-sidebar">
                <span>${Icons.dashboard} Dashboard</span>
                <span>${Icons.agenda} Agenda</span>
                <span>${Icons.patients} Pacientes</span>
                <span>${Icons.consult} Consultas</span>
                <span>${Icons.forms} Formulários</span>
                <span>${Icons.contacts} Contatos</span>
              </div>
              <div class="guide-preview-dashboard">
                <strong>Dashboard</strong>
                <small>segunda-feira, 19 de outubro · visão geral da clínica</small>
                <div class="guide-preview-doctor">${Icons.medical}<span>Todos os médicos</span></div>
                <b>Resumo geral</b>
                <div class="guide-preview-stats">
                  <span><small>TOTAL DE PACIENTES</small><strong>26</strong></span>
                  <span><small>PACIENTES ATIVAS</small><strong>23</strong></span>
                  <span><small>CONSULTAS NA SEMANA</small><strong>3</strong></span>
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-primary guide-open-page" id="guide-open-page" type="button" hidden>Abrir tela</button>
        </div>
      </div>
      <footer class="modal-footer guide-footer">
        <button class="btn btn-primary" id="dismiss-guide" type="button">Entendi</button>
      </footer>
    </section>
  </div>`;
}

function renderSidebar(activePage) {
  const role = Router.getRole();
  const menu = ROLE_MENU[role] || ROLE_MENU.doctor;
  const activeAccount = getCurrentDemoAccount();
  const identity = Router.getState();
  const displayName = identity.demoUserName || activeAccount?.name || ROLE_LABELS[role] || 'Perfil Lapidar';
  const avatarInitials = identity.demoUserInitials || activeAccount?.initials || 'L';
  const roleDescription = identity.demoUserDescription || activeAccount?.description || getProfileLabel();

  return `
  <div class="sidebar-overlay" id="sidebar-overlay"></div>
  <nav class="sidebar" id="sidebar">
    <div class="sidebar-brand">
      <span class="sidebar-brand-mark">L</span>
      <span>Gestão Clínica</span>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-label">Menu</div>
      ${menu.map(item => `
        <button class="sidebar-nav-item ${activePage === item.page ? 'active' : ''}"
          data-page="${item.page}">
          ${Icons[item.icon]}
          ${item.label}
        </button>
      `).join('')}
    </div>
    <div class="sidebar-footer">
      <div class="sidebar-account">
        <span class="sidebar-account-avatar">${escapePatientCardText(avatarInitials)}</span>
        <span class="sidebar-account-copy"><strong>${escapePatientCardText(displayName)}</strong><small>${escapePatientCardText(roleDescription)}</small></span>
        <button class="sidebar-logout" id="logout-btn" type="button" aria-label="Sair" title="Sair">${Icons.logout}</button>
      </div>
    </div>
  </nav>`;
}

function getProtocolBadge(protocolo) {
  const map = {
    'Lapidar 40+':       'badge-protocolo-40',
    'Lapidar SOP':       'badge-protocolo-sop',
    'Lapidar Fertilidade': 'badge-protocolo-fert',
    'Pocket':            'badge-protocolo-poc',
  };
  return `<span class="badge ${map[protocolo] || 'badge-gray'}">${protocolo}</span>`;
}

function getAlertBadge(tipo) {
  const map = {
    'LDL acima da meta':    'badge-red',
    'Vitamina D baixa':     'badge-yellow',
    'Sem atividade física': 'badge-blue',
    'Exames pendentes':     'badge-purple',
    'Bioimpedância pendente':'badge-pink',
  };
  return `<span class="badge ${map[tipo] || 'badge-gray'}">${tipo}</span>`;
}

function getStatusBadge(status) {
  const map = { 'pago':'badge-green', 'pendente':'badge-yellow', 'cancelado':'badge-red' };
  return `<span class="badge ${map[status] || 'badge-gray'}">${status}</span>`;
}

function escapePatientCardText(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;',
  }[char]));
}

function renderPatientCard(p, index = 0) {
  const inactive = p.ativo === false || p.status === 'Inativa';
  const patientAlerts = [...new Set((Array.isArray(ALERTAS) ? ALERTAS : [])
    .filter(alert => alert.paciente === p.nome)
    .map(alert => alert.tipo === 'Bioimpedância pendente' ? 'Bioimpedâncias pendentes' : alert.tipo))];
  const ldlAboveTarget = Number.isFinite(Number(p.riscoCV?.ldl)) &&
    Number.isFinite(Number(p.riscoCV?.metaLdl)) &&
    Number(p.riscoCV.ldl) > Number(p.riscoCV.metaLdl);
  const lastBioimpedance = Array.isArray(p.bioimpedancia)
    ? p.bioimpedancia.map(entry => {
      const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(entry.data || '');
      return match ? new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1])) : null;
    }).filter(date => date && !Number.isNaN(date.getTime()))
      .sort((first, second) => second.getTime() - first.getTime())[0]
    : null;
  const bioimpedancePending = !lastBioimpedance ||
    (Date.now() - lastBioimpedance.getTime()) / 86400000 >= 60;
  const prioritizedAlerts = ldlAboveTarget && bioimpedancePending
    ? ['LDL acima da meta', 'Bioimpedâncias pendentes']
    : patientAlerts;
  const activeHabits = Array.isArray(p.metasPersonalizadas)
    ? p.metasPersonalizadas.filter(goal => goal.ativa !== false)
    : [];
  const goalTotals = { 'Lapidar SOP':8, 'Lapidar Fertilidade':10 };
  const goalTotal = Array.isArray(p.metas) && p.metas.length
    ? p.metas.length
    : goalTotals[p.protocolo] || 6;
  const completedGoals = Math.min(Number(p.metasConcluidas) || 0, goalTotal);
  const alertMarkup = prioritizedAlerts.length
    ? `${prioritizedAlerts.slice(0, 2).map(alert => `<span class="patient-tag patient-alert-tag">${escapePatientCardText(alert)}</span>`).join('')}${prioritizedAlerts.length > 2 ? `<span class="patient-tag patient-alert-tag">+${prioritizedAlerts.length - 2}</span>` : ''}`
    : '<span class="patient-tag patient-empty-tag">Nenhum alerta</span>';
  const profileButton = Router.getRole() === 'secretary'
    ? `<button type="button" class="btn btn-subtle btn-sm" data-patient-profile="${p.id}" aria-label="Ver contatos de ${escapePatientCardText(p.nome)}">Ver detalhes</button>`
    : `<button type="button" class="btn btn-subtle btn-sm" data-patient-profile="${p.id}" aria-label="Ver perfil de ${escapePatientCardText(p.nome)}">Perfil</button>`;
  if (Router.getRole() === 'secretary') {
    return `
    <div class="card-patient stagger-${Math.min(index+1, 6)}" data-patient-id="${p.id}" onclick="openPatient(${p.id})">
      ${renderPatientCardHeader(p, inactive)}
      <section class="patient-card-section"><h3>CONTATOS</h3><p>${escapePatientCardText(p.telefone)} · ${escapePatientCardText(p.email || 'E-mail não informado')}</p></section>
      <div class="patient-card-footer">${profileButton}</div>
    </div>`;
  }
  const messageButton = `<button type="button" class="patient-message-shortcut" data-patient-message="${p.id}" aria-label="Enviar mensagem para ${escapePatientCardText(p.nome)}" title="Enviar mensagem"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/><path d="M8 11h8M8 14h5"/></svg></button>`;
  const detailsButton = `<button type="button" class="btn btn-primary btn-sm" data-patient-details="${p.id}" aria-label="Ver detalhes de ${escapePatientCardText(p.nome)}">Ver detalhes</button>`;
  return `
  <div class="card-patient patient-reference-card stagger-${Math.min(index+1, 6)}" data-patient-id="${p.id}" onclick="openPatient(${p.id})">
    ${renderPatientCardHeader(p, inactive, messageButton)}
    <section class="patient-card-section">
      <h3>ALERTAS</h3><div class="patient-tag-list">${alertMarkup}</div>
    </section>
    <section class="patient-card-section">
      <p class="patient-card-objective"><strong>Objetivo</strong><span>${escapePatientCardText(p.objetivo || 'Objetivo não informado')}</span></p>
    </section>
    <section class="patient-card-section patient-card-split">
      <div><h3>METAS EM DIA</h3><strong class="patient-card-progress">${completedGoals} de ${goalTotal}</strong></div>
      <div><h3>HÁBITOS</h3><strong class="patient-card-progress">0 de ${activeHabits.length}</strong><span class="patient-card-progress-caption">em dia</span></div>
    </section>
    <div class="patient-card-footer">${profileButton}${detailsButton}</div>
  </div>`;
}

function renderPatientCardHeader(patient, inactive, trailing = '') {
  const staff = Array.isArray(window.LAPIDAR_DEMO_DATA?.equipe_clinica?.funcionarios)
    ? window.LAPIDAR_DEMO_DATA.equipe_clinica.funcionarios
    : [];
  const clinicianNames = (Array.isArray(patient.medicasIds) ? patient.medicasIds : [])
    .map(id => staff.find(member => member.id === id)?.nome)
    .filter(Boolean);
  return `
    <div class="patient-reference-header">
      <div class="avatar avatar-lg">${escapePatientCardText(patient.iniciais)}</div>
      <div class="patient-reference-copy">
        <div class="card-patient-name">${escapePatientCardText(patient.nome)}</div>
        <div class="card-patient-meta">${escapePatientCardText(patient.idade)} anos · ${escapePatientCardText(patient.protocolo || 'Sem protocolo')}</div>
        ${clinicianNames.length ? `<div class="patient-card-clinicians">${Icons.medical}<span>${clinicianNames.map(escapePatientCardText).join(', ')}</span></div>` : ''}
      </div>
      <div class="patient-reference-actions">
        <span class="badge ${inactive ? 'badge-gray' : 'badge-green'}">${inactive ? 'Inativa' : 'Ativa'}</span>
        ${trailing}
      </div>
    </div>`;
}

/* ── Inicialização global do shell (topbar + sidebar) ── */
function initShell(activePage) {
  const menu = ROLE_MENU[Router.getRole()] || ROLE_MENU.doctor;
  document.getElementById('topbar-container').innerHTML = renderTopbar(activePage);
  document.getElementById('sidebar-container').innerHTML = renderSidebar(activePage);

  // Demo account switcher
  const roleTrigger = document.getElementById('role-menu-trigger');
  const accountPicker = document.getElementById('account-picker');
  if (roleTrigger && accountPicker) {
    const closeAccountPicker = () => {
      accountPicker.classList.remove('open');
      roleTrigger.setAttribute('aria-expanded', 'false');
      roleTrigger.focus();
    };
    roleTrigger.addEventListener('click', event => {
      event.stopPropagation();
      accountPicker.classList.add('open');
      roleTrigger.setAttribute('aria-expanded', 'true');
      accountPicker.querySelector('#account-picker-search').focus();
    });
    accountPicker.addEventListener('click', event => {
      if (event.target === accountPicker || event.target.closest('[data-account-picker-close]')) {
        closeAccountPicker();
        return;
      }
      const option = event.target.closest('[data-demo-account]');
      if (!option) return;
      const account = getDemoAccounts().find(item => item.id === option.dataset.demoAccount);
      if (!account) throw new TypeError(`Conta de demonstração inválida: ${option.dataset.demoAccount}`);
      Router.setProfile(account.profileId, account);
      Router.navigate(Router.getHomePage());
    });
    const accountSearch = accountPicker.querySelector('#account-picker-search');
    accountSearch.addEventListener('input', () => {
      const query = accountSearch.value.trim().toLocaleLowerCase('pt-BR');
      accountPicker.querySelectorAll('[data-account-group]').forEach(group => {
        const options = [...group.querySelectorAll('[data-demo-account]')];
        let matches = 0;
        options.forEach(option => {
          const visible = option.dataset.searchText.includes(query);
          option.hidden = !visible;
          if (visible) matches++;
        });
        group.hidden = matches === 0;
      });
    });
    accountPicker.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        closeAccountPicker();
      }
    });
  }

  const formsShortcut = document.getElementById('forms-shortcut');
  if (formsShortcut) formsShortcut.addEventListener('click', () => Router.navigate('forms'));
  const settingsShortcut = document.getElementById('settings-shortcut');
  if (settingsShortcut) settingsShortcut.addEventListener('click', () => Router.navigate('settings'));

  const guideModal = document.getElementById('lapidar-guide-modal');
  const helpShortcut = document.getElementById('help-shortcut');
  if (guideModal && helpShortcut) {
    const guideDescriptions = {
      dashboard:'Acompanhe os indicadores da clínica, consultas da semana e pontos de atenção.',
      patients:'Encontre pacientes, consulte seus dados e acesse a ficha individual.',
      agenda:'Visualize a agenda, localize horários e acompanhe os atendimentos.',
      consultations:'Consulte os atendimentos agendados e abra o workspace de cada consulta.',
      'patient-detail':'Reúna o histórico clínico, a jornada e as informações compartilhadas da paciente.',
      messages:'Acompanhe as conversas com pacientes e a equipe.',
      financial:'Consulte lançamentos e informações financeiras disponíveis para seu perfil.',
      forms:'Gerencie modelos de formulários, envios e respostas.',
      contents:'Acesse materiais e conteúdos disponibilizados no sistema.',
      events:'Consulte eventos e acompanhe as inscrições.',
      contacts:'Pesquise pessoas e contatos da clínica.',
      notifications:'Revise avisos recentes e marque notificações como lidas.',
      settings:'Consulte as preferências e configurações disponíveis para seu perfil.',
      habits:'Registre o check-in diário e acompanhe suas metas.',
      'patient-profile':'Revise seus dados pessoais e autorizações de compartilhamento.',
      logs:'Consulte os registros demonstrativos do sistema.',
    };
    const guideTitle = document.getElementById('guide-section-title');
    const guideDescription = document.getElementById('guide-section-description');
    const guideDetailIcon = document.getElementById('guide-detail-icon');
    const guidePreview = document.getElementById('guide-preview');
    const guideOpenPage = document.getElementById('guide-open-page');
    const guideNavItems = [...guideModal.querySelectorAll('[data-guide-page]')];
    let selectedGuidePage = '';
    const closeGuide = () => {
      guideModal.classList.remove('open');
      helpShortcut.focus();
    };
    const openGuide = () => {
      guideModal.classList.add('open');
      guideNavItems[0].click();
      document.getElementById('close-guide').focus();
    };
    helpShortcut.addEventListener('click', openGuide);
    guideNavItems.forEach(button => {
      button.addEventListener('click', () => {
        selectedGuidePage = button.dataset.guidePage;
        guideNavItems.forEach(item => {
          const selected = item === button;
          item.classList.toggle('active', selected);
          if (selected) item.setAttribute('aria-current', 'page');
          else item.removeAttribute('aria-current');
        });
        if (selectedGuidePage === 'intro') {
          guideTitle.textContent = 'Primeiros passos';
          guideDescription.textContent = 'Como andar pelo sistema: menu, barra superior e atalhos.';
          guideDetailIcon.innerHTML = Icons.flag;
          guidePreview.hidden = false;
          guideOpenPage.hidden = true;
        } else {
          const menuItem = menu.find(item => item.page === selectedGuidePage);
          guideTitle.textContent = menuItem ? menuItem.label : 'Seção';
          guideDescription.textContent = guideDescriptions[selectedGuidePage] || 'Acesse esta área pelo menu lateral.';
          guideDetailIcon.innerHTML = menuItem ? (Icons[menuItem.icon] || Icons.dashboard) : Icons.dashboard;
          guidePreview.hidden = true;
          guideOpenPage.textContent = `Abrir ${menuItem ? menuItem.label : 'tela'}`;
          guideOpenPage.hidden = false;
        }
      });
    });
    guideOpenPage.addEventListener('click', () => {
      const page = selectedGuidePage;
      closeGuide();
      if (page) Router.navigate(page);
    });
    document.getElementById('close-guide').addEventListener('click', closeGuide);
    document.getElementById('dismiss-guide').addEventListener('click', closeGuide);
    guideModal.addEventListener('click', event => {
      if (event.target === guideModal) closeGuide();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && guideModal.classList.contains('open')) closeGuide();
      if (event.key !== 'Tab' || !guideModal.classList.contains('open')) return;
      const focusable = [...guideModal.querySelectorAll('button:not([hidden]):not(:disabled)')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    if (localStorage.getItem('lapidar-show-guide-after-login') === 'true') {
      localStorage.removeItem('lapidar-show-guide-after-login');
      openGuide();
    }
  }

  const userTrigger = document.getElementById('topbar-user-trigger');
  const userDropdown = document.getElementById('topbar-user-dropdown');
  if (userTrigger && userDropdown) {
    userTrigger.addEventListener('click', () => {
      const expanded = userTrigger.getAttribute('aria-expanded') === 'true';
      userTrigger.setAttribute('aria-expanded', String(!expanded));
      userDropdown.hidden = expanded;
    });
    userDropdown.addEventListener('click', event => {
      const action = event.target.closest('[data-user-action]')?.dataset.userAction;
      if (!action) return;
      userTrigger.setAttribute('aria-expanded', 'false');
      userDropdown.hidden = true;
      if (action === 'profile') {
        Router.navigate(Router.getRole() === 'patient' ? 'patient-profile' : 'profile');
      }
      if (action === 'settings') Router.navigate('settings');
      if (action === 'logout') Router.navigate('login');
    });
    document.addEventListener('click', event => {
      if (!userTrigger.contains(event.target) && !userDropdown.contains(event.target)) {
        userTrigger.setAttribute('aria-expanded', 'false');
        userDropdown.hidden = true;
      }
    });
  }

  document.querySelectorAll('[data-notification-page]').forEach(item => {
    item.addEventListener('click', () => {
      const params = {};
      const patientId = Number(item.dataset.notificationPatient);
      if (patientId) params.patientId = patientId;
      if (item.dataset.notificationTab) params.tab = item.dataset.notificationTab;
      Router.navigate(item.dataset.notificationPage, params);
    });
  });

  // Hamburger
  const hamburger = document.getElementById('hamburger-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (hamburger && sidebar && overlay) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // Sidebar navigation
  document.querySelectorAll('.sidebar-nav-item[data-page]').forEach(btn => {
    btn.addEventListener('click', () => Router.navigate(btn.dataset.page));
  });

  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => Router.navigate('login'));
  }

  // Notifications
  const notifBtn = document.getElementById('notif-btn');
  const notifDropdown = document.getElementById('notif-dropdown');
  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', e => {
      e.stopPropagation();
      notifDropdown.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (!notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
        notifDropdown.classList.remove('open');
      }
    });
  }

  // Mark all read
  const markAllBtn = document.getElementById('mark-all-read');
  if (markAllBtn) {
    markAllBtn.addEventListener('click', () => {
      const isPatient = Router.getRole() === 'patient';
      const key = isPatient
        ? 'lapidar-notification-feed-' + (Router.getSelectedPatient()?.id || 1)
        : 'lapidar-notification-feed-' + Router.getProfileId();
      try {
        const notifications = JSON.parse(localStorage.getItem(key) || '[]');
        if (!Array.isArray(notifications)) throw new Error('Formato de notificações inválido.');
        notifications.forEach(notification => { if (notification) notification.unread = false; });
        localStorage.setItem(key, JSON.stringify(notifications));
      } catch (error) {
        console.error('Não foi possível marcar as notificações como lidas.', error);
        alert('Não foi possível atualizar as notificações neste navegador.');
        return;
      }
      document.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));
      const badge = document.querySelector('#notif-btn .notif-badge');
      if (badge) badge.style.display = 'none';
      const pending = document.querySelector('.notif-pending');
      if (pending) pending.textContent = '0 pendência(s)';
    });
  }
}

function showPatientQuickModal(id) {
  const p = PACIENTES.find(x => x.id === id);
  if (!p) return;
  
  let modal = document.getElementById('patient-quick-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'patient-quick-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  if (Router.getRole() === 'secretary') {
    modal.innerHTML = `
      <div class="modal" style="max-width:540px;">
        <div class="modal-header" style="background:var(--vinho-xlight);border-bottom:1px solid var(--border);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div class="avatar avatar-lg" style="background:var(--vinho);color:var(--bege);font-family:var(--font-serif);font-size:18px;">${escapePatientCardText(p.iniciais)}</div>
            <div>
              <div style="font-family:var(--font-serif);font-size:18px;font-weight:600;color:var(--vinho);">${escapePatientCardText(p.nome)}</div>
              <div style="font-size:12px;color:var(--text-muted);">Perfil de contato</div>
            </div>
          </div>
          <button class="modal-close" onclick="closePatientQuickModal()">${Icons.close}</button>
        </div>
        <div class="modal-body" style="padding:20px;display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:12px;">
          <div><strong>Telefone:</strong> ${escapePatientCardText(p.telefone)}</div>
          <div><strong>E-mail:</strong> ${escapePatientCardText(p.email || 'Não informado')}</div>
          <div><strong>Nascimento:</strong> ${escapePatientCardText(p.nascimento || 'Não informado')}</div>
        </div>
        <div class="modal-footer" style="display:flex;gap:8px;justify-content:flex-end;">
          <button class="btn btn-subtle btn-sm" onclick="closePatientQuickModal()">Fechar</button>
          <button class="btn btn-primary btn-sm" onclick="closePatientQuickModal();Router.navigate('journey',{patientId:${Number(p.id)}})">Jornada operacional</button>
        </div>
      </div>`;
    modal.classList.add('open');
    return;
  }
  
  const pct = p.metas.length > 0 ? Math.round((p.metasConcluidas / p.metas.length) * 100) : 0;
  const loss = (p.pesoInicial - p.pesoAtual).toFixed(1);
  
  modal.innerHTML = `
    <div class="modal" style="max-width:540px;">
      <div class="modal-header" style="background:var(--vinho-xlight);border-bottom:1px solid var(--border);">
        <div style="display:flex;align-items:center;gap:12px;">
          <div class="avatar avatar-lg" style="background:var(--vinho);color:var(--bege);font-family:var(--font-serif);font-size:18px;">${p.iniciais}</div>
          <div>
            <div style="font-family:var(--font-serif);font-size:18px;font-weight:600;color:var(--vinho);">${p.nome}</div>
            <div style="font-size:12px;color:var(--text-muted);">${p.idade} anos (${p.nascimento}) · ${p.telefone}</div>
          </div>
        </div>
        <button class="modal-close" onclick="closePatientQuickModal()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="modal-body" style="padding:20px;display:flex;flex-direction:column;gap:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <div>${getProtocolBadge(p.protocolo)}</div>
          <span class="badge badge-gray" style="font-size:11px;">${p.consultaAtual}</span>
        </div>

        <div style="background:var(--bege);padding:12px;border-radius:var(--radius);font-size:13px;color:var(--text-secondary);">
          <strong style="color:var(--vinho);">Objetivo:</strong> ${p.objetivo}
        </div>

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center;">
          <div style="background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:10px;">
            <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;">Peso Inicial</div>
            <div style="font-family:var(--font-serif);font-size:18px;font-weight:600;color:var(--vinho);">${p.pesoInicial} kg</div>
          </div>
          <div style="background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:10px;">
            <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;">Peso Atual</div>
            <div style="font-family:var(--font-serif);font-size:18px;font-weight:600;color:var(--oliva);">${p.pesoAtual} kg</div>
            <div style="font-size:10px;color:var(--oliva);font-weight:600;">−${loss} kg</div>
          </div>
          <div style="background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:10px;">
            <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;">Meta Final</div>
            <div style="font-family:var(--font-serif);font-size:18px;font-weight:600;color:var(--dourado);">${p.meta} kg</div>
          </div>
        </div>

        <div>
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;">
            <span style="font-weight:600;color:var(--vinho);">Metas da Jornada (${p.metasConcluidas}/${p.metas.length})</span>
            <span style="font-weight:600;color:var(--oliva);">${pct}%</span>
          </div>
          <div class="progress-bar" style="height:8px;margin-bottom:10px;">
            <div class="progress-fill" style="width:${pct}%;background:linear-gradient(90deg,var(--vinho),var(--oliva));"></div>
          </div>
          <ul style="margin:0;padding-left:18px;font-size:12px;color:var(--text-secondary);display:flex;flex-direction:column;gap:4px;">
            ${p.metas.map((m, i) => `<li>${m} ${i < p.metasConcluidas ? '<span style="color:var(--oliva);font-weight:600;">✓</span>' : ''}</li>`).join('')}
          </ul>
        </div>

        <div style="display:flex;gap:12px;font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:12px;">
          <div><strong>Última consulta:</strong> ${p.ultimaConsulta}</div>
          <div><strong>Próxima:</strong> ${p.proximaConsulta}</div>
        </div>
      </div>
      <div class="modal-footer" style="display:flex;gap:8px;justify-content:flex-end;background:var(--white);border-top:1px solid var(--border);">
        <button class="btn btn-subtle btn-sm" onclick="closePatientQuickModal()">Fechar</button>
        <button class="btn btn-ghost btn-sm" onclick="closePatientQuickModal();Router.navigate('journey',{patientId:${p.id}})">Ver Jornada</button>
        <button class="btn btn-primary btn-sm" onclick="closePatientQuickModal();Router.navigate('patient-detail',{patientId:${p.id}})">
          Abrir Ficha Completa →
        </button>
      </div>
    </div>
  `;
  modal.classList.add('open');
}

function closePatientQuickModal() {
  const modal = document.getElementById('patient-quick-modal');
  if (modal) modal.classList.remove('open');
}

function openPatient(id) {
  const page = Router.getActivePage();
  if (page === 'patients' || window.location.pathname.includes('patients.html')) {
    showPatientQuickModal(id);
  } else {
    Router.navigate('patient-detail', { patientId: id });
  }
}
