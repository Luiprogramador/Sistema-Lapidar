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
  home:      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
};

const ROLE_LABELS = {
  doctor:    'Dra. Andressa Gomide',
  secretary: 'Gabi',
  patient:   'Paciente',
  developer: 'Desenvolvedor',
};

// Perfis de demonstração equivalentes ao seletor do Flutter (papel + isAdmin).
const DEMO_PROFILES = [
  { id:'doctor-admin',    label:'Médica administradora', description:'Acesso clínico completo, equipe e sistema' },
  { id:'doctor',          label:'Médica sem admin', description:'Consultas, agenda e ficha clínica sem administração' },
  { id:'secretary-admin', label:'Secretária administradora', description:'Operação, financeiro e cadastros do sistema' },
  { id:'secretary',       label:'Secretária sem admin', description:'Agenda, contatos e financeiro pessoal' },
  { id:'patient',         label:'Paciente', description:'Diário e informações da própria jornada' },
  { id:'developer',       label:'Desenvolvedor', description:'Logs e configurações do sistema' },
];

function getProfileLabel() {
  const profile = DEMO_PROFILES.find(item => item.id === Router.getProfileId());
  return profile ? profile.label : 'Perfil Lapidar';
}

function getUnreadMessagesCount() {
  try {
    const messages = loadMessages();
    if (Router.getRole() === 'patient') {
      return messages.filter(m => m.patientId === 1 && m.direction === 'enviada' && !m.read).length;
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
    { page:'contents',  label:'Conteúdos', icon:'contents' },
    { page:'settings',  label:'Configurações', icon:'settings' },
  ],
  secretary: [
    { page:'dashboard', label:'Dashboard', icon:'dashboard' },
    { page:'patients',  label:'Pacientes', icon:'patients' },
    { page:'agenda',    label:'Agenda',    icon:'agenda' },
    { page:'messages',  label:'Mensagens', icon:'message' },
    { page:'financial', label:'Financeiro',icon:'financial' },
    { page:'contents',  label:'Conteúdos', icon:'contents' },
    { page:'settings',  label:'Configurações', icon:'settings' },
  ],
  patient: [
    { page:'habits',    label:'Diário', icon:'diary' },
    { page:'patient-detail', label:'Minha ficha', icon:'portal' },
    { page:'consultations', label:'Consultas', icon:'consult' },
    { page:'contents',  label:'Conteúdos', icon:'contents' },
    { page:'settings',  label:'Configurações', icon:'settings' },
  ],
  developer: [
    { page:'logs', label:'Logs', icon:'dashboard' },
    { page:'settings', label:'Configurações', icon:'settings' },
  ],
};

function renderTopbar(activePage) {
  const role = Router.getRole();
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
  const unreadMessages = getUnreadMessagesCount();
  const profile = DEMO_PROFILES.find(item => item.id === Router.getProfileId()) || DEMO_PROFILES[0];
  const pageTitles = {
    dashboard:'Dashboard', patients:'Pacientes', agenda:'Agenda', consultations:'Consultas',
    'patient-detail':role === 'patient' ? 'Minha ficha' : 'Ficha da paciente',
    'patient-registration':'Cadastro de paciente', consultation:'Consulta', messages:'Mensagens',
    financial:'Financeiro', contents:'Conteúdos', settings:'Configurações', habits:'Diário Lapidar',
    journey:'Jornada operacional', logs:'Logs do sistema', profile:'Perfil',
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
      <span class="topbar-mobile-title">${escapePatientCardText(pageTitles[activePage] || 'Lapidar')}</span>
      <div class="topbar-date-summary"><strong>${escapePatientCardText(date)}</strong><span>${weekConsultations} consultas na semana${role === 'doctor' ? ` · ${ALERTAS.length} alertas` : ''}</span></div>
    </div>
    <div class="topbar-right">
      <div class="topbar-role-select">
        <label for="role-select">Ver como:</label>
        <select id="role-select" aria-label="Ver como outro perfil">
          ${DEMO_PROFILES.map(item => `<option value="${item.id}" title="${item.description}" ${item.id === Router.getProfileId() ? 'selected' : ''}>${item.label}</option>`).join('')}
        </select>
      </div>
      <div class="topbar-actions">
        <button class="topbar-icon-btn" id="messages-btn" aria-label="${role === 'developer' ? 'Logs do sistema' : 'Mensagens'}" title="${role === 'developer' ? 'Logs do sistema' : 'Mensagens'}">
          ${Icons.message}
          ${unreadMessages > 0 ? `<span class="notif-badge">${unreadMessages}</span>` : ''}
        </button>
        <div class="topbar-notifications">
          <button class="topbar-icon-btn" id="notif-btn" aria-label="Notificações">
            ${Icons.bell}
            ${notifCount > 0 ? `<span class="notif-badge">${notifCount}</span>` : ''}
          </button>
          <div class="notif-dropdown" id="notif-dropdown">
          <div class="notif-header">
            <div><h4>Notificações</h4><span class="notif-pending">${notifCount} pendência(s)</span></div>
            <button id="mark-all-read">Marcar todas como lidas</button>
          </div>
          ${notificationMarkup}
          </div>
        </div>
        <button class="topbar-icon-btn" id="settings-shortcut" aria-label="Configurações" title="Configurações">${Icons.settings}</button>
        <div class="topbar-user-menu">
          <button class="topbar-user-trigger" id="topbar-user-trigger" type="button" aria-expanded="false" aria-controls="topbar-user-dropdown">
            <span class="avatar">${escapePatientCardText(profile.label.slice(0, 1))}</span><span class="topbar-user-copy"><strong>${escapePatientCardText(profile.label)}</strong><small>${escapePatientCardText(role === 'doctor' ? 'Médica' : role === 'secretary' ? 'Secretária' : role === 'patient' ? 'Paciente' : 'Desenvolvedor')}</small></span><span aria-hidden="true">⌄</span>
          </button>
          <div class="topbar-user-dropdown" id="topbar-user-dropdown" hidden>
            <button type="button" data-user-action="profile">Perfil</button>
            <button type="button" data-user-action="settings">Configurações</button>
            <button type="button" data-user-action="logout">Sair</button>
          </div>
        </div>
      </div>
    </div>
  </header>`;
}

function renderSidebar(activePage) {
  const role = Router.getRole();
  const menu = ROLE_MENU[role] || ROLE_MENU.doctor;

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
      <button class="btn btn-subtle btn-sm btn-full" id="logout-btn">
        ${Icons.logout} Sair
      </button>
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
  const goals = Array.isArray(p.metas) ? p.metas : [];
  const completedGoals = Math.max(0, Math.min(Number(p.metasConcluidas) || 0, goals.length));
  const pct = goals.length ? Math.round((completedGoals / goals.length) * 100) : 0;
  const hasWeight = p.pesoAtual !== null && p.pesoAtual !== undefined && p.pesoAtual !== '' && Number.isFinite(Number(p.pesoAtual));
  const hasWeightStart = p.pesoInicial !== null && p.pesoInicial !== undefined && p.pesoInicial !== '' && Number.isFinite(Number(p.pesoInicial));
  const hasWeightGoal = p.meta !== null && p.meta !== undefined && p.meta !== '' && Number.isFinite(Number(p.meta));
  const allergyList = Array.isArray(p.alergias) ? p.alergias : [];
  const allergySummary = allergyList.length ? allergyList.join(', ') : 'Não informadas';
  const inactive = p.ativo === false || p.status === 'Inativa';
  const profileButton = Router.getRole() === 'secretary'
    ? `<button type="button" class="btn btn-subtle btn-sm" data-patient-profile="${p.id}" aria-label="Ver contatos de ${escapePatientCardText(p.nome)}">Ver contatos</button>`
    : `<button type="button" class="btn btn-subtle btn-sm" data-patient-profile="${p.id}" aria-label="Ver perfil de ${escapePatientCardText(p.nome)}">Ver perfil</button>`;
  if (Router.getRole() === 'secretary') {
    return `
    <div class="card-patient stagger-${Math.min(index+1, 6)}" data-patient-id="${p.id}" onclick="openPatient(${p.id})">
      <div class="card-patient-header">
        <div class="avatar avatar-lg">${escapePatientCardText(p.iniciais)}</div>
        <div style="flex:1;min-width:0;">
          <div class="card-patient-name">${escapePatientCardText(p.nome)}</div>
          <span class="badge ${inactive ? 'badge-gray' : 'badge-green'}">${inactive ? 'Inativa' : 'Ativa'}</span>
        </div>
      </div>
      <div style="font-size:12px;color:var(--text-secondary);">${escapePatientCardText(p.telefone)}</div>
      <div style="font-size:12px;color:var(--text-secondary);">${escapePatientCardText(p.email || 'E-mail não informado')}</div>
      <div style="display:flex;justify-content:flex-end;margin-top:4px;">${profileButton}</div>
    </div>`;
  }

  const pesoLoss = hasWeight && hasWeightStart ? (Number(p.pesoInicial) - Number(p.pesoAtual)).toFixed(1) : null;
  return `
  <div class="card-patient stagger-${Math.min(index+1, 6)}" data-patient-id="${p.id}" onclick="openPatient(${p.id})">
    <div class="card-patient-header">
      <div class="avatar avatar-lg">${escapePatientCardText(p.iniciais)}</div>
      <div style="flex:1;min-width:0;">
        <div class="card-patient-name">${escapePatientCardText(p.nome)}</div>
        <span class="badge ${inactive ? 'badge-gray' : 'badge-green'}">${inactive ? 'Inativa' : 'Ativa'}</span>
        <div class="card-patient-meta">${escapePatientCardText(p.idade)} anos · ${escapePatientCardText(p.consultaAtual)}</div>
        <div style="margin-top:4px;">${getProtocolBadge(p.protocolo)}</div>
      </div>
    </div>
    <div style="display:flex;gap:16px;font-size:12px;">
      <div>
        <div style="color:var(--text-muted);">Peso atual</div>
        <div style="font-weight:600;color:var(--vinho);">${hasWeight ? `${Number(p.pesoAtual)} kg` : 'Não informado'}</div>
      </div>
      <div>
        <div style="color:var(--text-muted);">Perda total</div>
        <div style="font-weight:600;color:var(--oliva);">${pesoLoss === null ? '—' : `${pesoLoss} kg`}</div>
      </div>
      <div>
        <div style="color:var(--text-muted);">Meta</div>
        <div style="font-weight:600;color:var(--text-secondary);">${hasWeightGoal ? `${Number(p.meta)} kg` : 'Sem meta de peso'}</div>
      </div>
    </div>
    <div>
      <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:4px;">
        <span>Metas atingidas</span>
        <span>${goals.length ? `${pct}%` : 'Sem metas definidas'}</span>
      </div>
      ${goals.length ? `<div class="progress-bar">
        <div class="progress-fill" style="width:${pct}%;"></div>
      </div>` : ''}
    </div>
    <div style="font-size:12px;color:var(--text-muted);">Alergias: ${escapePatientCardText(allergySummary)}</div>
    <div style="display:flex;justify-content:flex-end;margin-top:4px;">${profileButton}</div>
  </div>`;
}

/* ── Inicialização global do shell (topbar + sidebar) ── */
function initShell(activePage) {
  document.getElementById('topbar-container').innerHTML = renderTopbar(activePage);
  document.getElementById('sidebar-container').innerHTML = renderSidebar(activePage);

  // Role selector
  const roleSelect = document.getElementById('role-select');
  if (roleSelect) {
    roleSelect.addEventListener('change', e => {
      Router.setProfile(e.target.value);
      Router.navigate(Router.getHomePage());
    });
  }

  const messagesBtn = document.getElementById('messages-btn');
  if (messagesBtn) messagesBtn.addEventListener('click', () => Router.navigate(Router.getRole() === 'developer' ? 'logs' : 'messages'));

  const settingsShortcut = document.getElementById('settings-shortcut');
  if (settingsShortcut) settingsShortcut.addEventListener('click', () => Router.navigate('settings'));

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
      if (action === 'profile') Router.navigate('profile');
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
