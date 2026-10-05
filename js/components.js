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
  home:      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
};

const ROLE_LABELS = {
  doctor:    'Dra. Andressa Gomide',
  secretary: 'Gabi',
  patient:   'Paciente',
  admin:     'Administrador',
};

const ROLE_MENU = {
  doctor: [
    { page:'dashboard', label:'Dashboard', icon:'dashboard' },
    { page:'patients',  label:'Pacientes', icon:'patients' },
    { page:'contents',  label:'Conteúdos', icon:'contents' },
    { page:'agenda',    label:'Agenda',    icon:'agenda' },
    { page:'consultations', label:'Consultas', icon:'agenda' },
    { page:'journey',   label:'Jornada', icon:'agenda' },
    { page:'financial', label:'Financeiro',icon:'financial' },
    { page:'settings',  label:'Configurações', icon:'settings' },
    { page:'profile',   label:'Meu perfil', icon:'portal' },
  ],
  secretary: [
    { page:'patients',  label:'Pacientes', icon:'patients' },
    { page:'agenda',    label:'Agenda',    icon:'agenda' },
    { page:'journey',   label:'Jornada',   icon:'agenda' },
    { page:'contents',  label:'Conteúdos', icon:'contents' },
    { page:'financial', label:'Financeiro',icon:'financial' },
    { page:'settings',  label:'Configurações', icon:'settings' },
    { page:'profile',   label:'Meu perfil', icon:'portal' },
  ],
  admin: [
    { page:'dashboard', label:'Dashboard', icon:'dashboard' },
    { page:'patients', label:'Pacientes', icon:'patients' },
    { page:'contents', label:'Conteúdos', icon:'contents' },
    { page:'agenda', label:'Agenda', icon:'agenda' },
    { page:'financial', label:'Financeiro', icon:'financial' },
    { page:'settings', label:'Configurações', icon:'settings' },
    { page:'profile', label:'Meu perfil', icon:'portal' },
  ],
  patient: [
    { page:'patient-detail', label:'Minha Ficha', icon:'portal' },
    { page:'habits',    label:'Diário Lapidar', icon:'dashboard' },
    { page:'contents',  label:'Conteúdos', icon:'contents' },
    { page:'agenda',    label:'Consultas',      icon:'agenda' },
    { page:'settings',  label:'Configurações', icon:'settings' },
    { page:'profile',   label:'Meu perfil', icon:'portal' },
  ],
};

function renderTopbar() {
  const role = Router.getRole();
  const notifCount = 3;
  return `
  <header class="topbar">
    <div style="display:flex;align-items:center;gap:12px;">
      <button class="hamburger-btn" id="hamburger-btn" aria-label="Abrir menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <div class="topbar-logo" onclick="Router.navigate(Router.getRole()==='patient'?'patient-detail':'dashboard')" style="cursor:pointer;display:flex;align-items:center;gap:8px;">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:var(--vinho);">
        <img src="../assets/logo_lapidar_tp.png" alt="" style="height:24px;width:24px;object-fit:contain;filter:brightness(0) invert(1);" onerror="this.style.display='none';this.nextElementSibling.style.display='inline-block';">
        <svg style="display:none;" width="24" height="24" viewBox="0 0 40 40" fill="none">
          <polygon points="20,4 36,32 4,32" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
          <circle cx="20" cy="20" r="3" fill="#FFFFFF"/>
        </svg>
        </span>
        Lapidar
      </div>
    </div>
    <div class="topbar-right">
      <div class="topbar-role-select">
        <span>Perfil:</span>
        <select id="role-select" aria-label="Perfil de demonstração">
          <option value="doctor"    ${role==='doctor'   ?'selected':''}>Médica</option>
          <option value="secretary" ${role==='secretary'?'selected':''}>Secretaria</option>
          <option value="admin"     ${role==='admin'    ?'selected':''}>Administrador</option>
          <option value="patient"   ${role==='patient'  ?'selected':''}>Paciente</option>
        </select>
      </div>
      <div style="position:relative;">
        <button class="topbar-icon-btn" id="notif-btn" aria-label="Notificações">
          ${Icons.bell}
          ${notifCount > 0 ? `<span class="notif-badge">${notifCount}</span>` : ''}
        </button>
        <div class="notif-dropdown" id="notif-dropdown">
          <div class="notif-header">
            <h4>Notificações</h4>
            <button id="mark-all-read">Marcar todas como lidas</button>
          </div>
          ${[
            { text:'Carla Mendes — LDL acima da meta', detail:'Resultado de 128 mg/dL. A meta configurada para o acompanhamento é inferior a 100 mg/dL.', time:'há 5 min', unread:true },
            { text:'Beatriz Lima — Vitamina D baixa (18 ng/mL)', detail:'O exame foi registrado abaixo do valor de referência do protocolo.', time:'há 22 min', unread:true },
            { text:'4 bioimpedâncias pendentes esta semana', detail:'Ana Paula, Carla, Fernanda e Letícia ainda precisam registrar medidas nesta semana.', time:'há 1h', unread:true },
            { text:'Próxima consulta: Ana Paula — amanhã 09:00', detail:'Consulta de acompanhamento Lapidar 40+ às 09:00.', time:'há 2h', unread:false },
          ].map(n => `
            <details class="notif-item ${n.unread ? 'unread' : ''}">
              <summary><span class="notif-dot"></span><span><span class="notif-text">${n.text}</span><span class="notif-time">${n.time}</span></span></summary>
              <p class="notif-detail">${n.detail}</p>
            </details>
          `).join('')}
        </div>
      </div>
    </div>
  </header>`;
}

function renderSidebar(activePage) {
  const role = Router.getRole();
  const menu = ROLE_MENU[role] || ROLE_MENU.doctor;
  let userName = ROLE_LABELS[role] || 'Perfil Lapidar';
  let avatarUrl = '';
  try {
    const profile = JSON.parse(localStorage.getItem('lapidar-profile-' + role) || 'null');
    if (profile && typeof profile === 'object') {
      userName = profile.displayName || profile.name || userName;
      avatarUrl = typeof profile.avatar === 'string' ? profile.avatar : '';
    }
  } catch (error) {
    console.error('Não foi possível carregar o resumo do perfil.', error);
  }
  const safeUserName = String(userName).replace(/[&<>"']/g, character => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;',
  }[character]));
  const safeAvatarUrl = /^data:image\/(png|jpeg);base64,/i.test(avatarUrl) ? avatarUrl : '';
  const avatarLetter = safeUserName.charAt(0) || 'L';
  const userDetails = {
    doctor: 'CRM 12345/MG · Medicina Integrativa',
    secretary: 'Secretária · Clínica Lapidar',
    patient: 'Paciente · Acompanhamento Lapidar',
    admin: 'Administração · Clínica Lapidar',
  }[role] || 'Perfil Lapidar';

  return `
  <div class="sidebar-overlay" id="sidebar-overlay"></div>
  <nav class="sidebar" id="sidebar">
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
      <div class="sidebar-profile">
        <button class="sidebar-user sidebar-profile-trigger" id="profile-trigger" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="profile-card">
          <span class="avatar">${safeAvatarUrl ? `<img src="${safeAvatarUrl}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">` : avatarLetter}</span>
          <span class="sidebar-user-info">
            <span class="sidebar-user-name">${safeUserName}</span>
            <span class="sidebar-user-role">${role === 'doctor' ? 'Médica' : role === 'secretary' ? 'Secretária' : role === 'admin' ? 'Administrador' : 'Paciente'}</span>
          </span>
          <span class="sidebar-profile-chevron" aria-hidden="true">⌃</span>
        </button>
        <div class="sidebar-profile-card" id="profile-card" role="group" aria-label="Perfil de ${safeUserName}" hidden>
          <span class="avatar avatar-lg">${safeAvatarUrl ? `<img src="${safeAvatarUrl}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">` : avatarLetter}</span>
          <div class="sidebar-profile-card-name">${safeUserName}</div>
          <div class="sidebar-profile-card-role">${userDetails}</div>
          <div class="sidebar-profile-card-note">Perfil de demonstração</div>
        </div>
      </div>
      <button class="btn btn-subtle btn-sm btn-full" style="margin-top:12px;" id="logout-btn">
        ${Icons.logout} Sair
      </button>
    </div>
  </nav>`;
}

function renderBottomBar(activePage) {
  const role = Router.getRole();
  const menu = ROLE_MENU[role] || ROLE_MENU.doctor;
  // show max 4 items on bottom bar
  const items = menu.slice(0, 4);
  return `
  <div class="bottom-bar">
    ${items.map(item => `
      <button class="bottom-nav-item ${activePage === item.page ? 'active' : ''}" data-page="${item.page}">
        ${Icons[item.icon]}
        <span>${item.label}</span>
      </button>
    `).join('')}
  </div>`;
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

function renderPatientCard(p, index = 0) {
  if (Router.getRole() === 'secretary') {
    return `
    <div class="card-patient stagger-${Math.min(index+1, 6)}" data-patient-id="${p.id}" onclick="openPatient(${p.id})">
      <div class="card-patient-header">
        <div class="avatar avatar-lg">${p.iniciais}</div>
        <div style="flex:1;min-width:0;">
          <div class="card-patient-name">${p.nome}</div>
          <div class="card-patient-meta">${p.idade} anos · ${p.consultaAtual}</div>
          <div style="margin-top:4px;">${getProtocolBadge(p.protocolo)}</div>
        </div>
      </div>
      <div style="font-size:12px;color:var(--text-secondary);">${p.telefone}</div>
      <div style="font-size:12px;color:var(--text-muted);">Próxima consulta: ${p.proximaConsulta}</div>
    </div>`;
  }

  const pct = p.metas.length > 0 ? Math.round((p.metasConcluidas / p.metas.length) * 100) : 0;
  const pesoLoss = (p.pesoInicial - p.pesoAtual).toFixed(1);
  return `
  <div class="card-patient stagger-${Math.min(index+1, 6)}" data-patient-id="${p.id}" onclick="openPatient(${p.id})">
    <div class="card-patient-header">
      <div class="avatar avatar-lg">${p.iniciais}</div>
      <div style="flex:1;min-width:0;">
        <div class="card-patient-name">${p.nome}</div>
        <div class="card-patient-meta">${p.idade} anos · ${p.consultaAtual}</div>
        <div style="margin-top:4px;">${getProtocolBadge(p.protocolo)}</div>
      </div>
    </div>
    <div style="display:flex;gap:16px;font-size:12px;">
      <div>
        <div style="color:var(--text-muted);">Peso atual</div>
        <div style="font-weight:600;color:var(--vinho);">${p.pesoAtual} kg</div>
      </div>
      <div>
        <div style="color:var(--text-muted);">Perda total</div>
        <div style="font-weight:600;color:var(--oliva);">−${pesoLoss} kg</div>
      </div>
      <div>
        <div style="color:var(--text-muted);">Meta</div>
        <div style="font-weight:600;color:var(--text-secondary);">${p.meta} kg</div>
      </div>
    </div>
    <div>
      <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:4px;">
        <span>Metas atingidas</span>
        <span>${pct}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${pct}%;"></div>
      </div>
    </div>
  </div>`;
}

/* ── Inicialização global do shell (topbar + sidebar + bottombar) ── */
function initShell(activePage) {
  document.getElementById('topbar-container').innerHTML = renderTopbar();
  document.getElementById('sidebar-container').innerHTML = renderSidebar(activePage);
  document.getElementById('bottombar-container').innerHTML = renderBottomBar(activePage);

  // Role selector
  const roleSelect = document.getElementById('role-select');
  if (roleSelect) {
    roleSelect.addEventListener('change', e => {
      Router.setRole(e.target.value);
      Router.navigate(e.target.value === 'patient' ? 'patient-detail' : e.target.value === 'secretary' ? 'patients' : 'dashboard');
    });
  }

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

  // Bottom bar navigation
  document.querySelectorAll('.bottom-nav-item[data-page]').forEach(btn => {
    btn.addEventListener('click', () => Router.navigate(btn.dataset.page));
  });

  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => Router.navigate('login'));
  }

  // Profile card
  const profileTrigger = document.getElementById('profile-trigger');
  const profileCard = document.getElementById('profile-card');
  if (profileTrigger && profileCard) {
    profileTrigger.addEventListener('click', () => {
      const isOpen = profileTrigger.getAttribute('aria-expanded') === 'true';
      profileTrigger.setAttribute('aria-expanded', String(!isOpen));
      profileCard.hidden = isOpen;
    });
    document.addEventListener('click', e => {
      if (!profileTrigger.contains(e.target) && !profileCard.contains(e.target)) {
        profileTrigger.setAttribute('aria-expanded', 'false');
        profileCard.hidden = true;
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !profileCard.hidden) {
        profileTrigger.setAttribute('aria-expanded', 'false');
        profileCard.hidden = true;
        profileTrigger.focus();
      }
    });
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
      document.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));
      const badge = document.querySelector('.notif-badge');
      if (badge) badge.style.display = 'none';
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
            <div class="avatar avatar-lg" style="background:var(--vinho);color:var(--bege);font-family:var(--font-serif);font-size:18px;">${p.iniciais}</div>
            <div>
              <div style="font-family:var(--font-serif);font-size:18px;font-weight:600;color:var(--vinho);">${p.nome}</div>
              <div style="font-size:12px;color:var(--text-muted);">${p.idade} anos · ${p.nascimento}</div>
            </div>
          </div>
          <button class="modal-close" onclick="closePatientQuickModal()">${Icons.close}</button>
        </div>
        <div class="modal-body" style="padding:20px;display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:12px;">
          <div><strong>Telefone:</strong> ${p.telefone}</div>
          <div><strong>Protocolo:</strong> ${p.protocolo}</div>
          <div><strong>Consulta atual:</strong> ${p.consultaAtual}</div>
          <div><strong>Próxima consulta:</strong> ${p.proximaConsulta}</div>
          <div><strong>Peso inicial:</strong> ${p.pesoInicial} kg</div>
          <div><strong>Meta:</strong> ${p.meta} kg</div>
          <div><strong>TRH:</strong> ${p.trh}</div>
          <div><strong>Contraceptivo:</strong> ${p.contraceptivo}</div>
          <div style="grid-column:1/-1;"><strong>Objetivo:</strong> ${p.objetivo}</div>
          <div style="grid-column:1/-1;"><strong>Origem:</strong> ${p.origemLead || 'Não informada'}</div>
        </div>
        <div class="modal-footer" style="display:flex;gap:8px;justify-content:flex-end;">
          <button class="btn btn-subtle btn-sm" onclick="closePatientQuickModal()">Fechar</button>
          <button class="btn btn-subtle btn-sm" onclick="closePatientQuickModal();Router.navigate('journey',{patientId:${p.id}})">Jornada</button>
          <button class="btn btn-primary btn-sm" onclick="closePatientQuickModal();Router.navigate('patient-registration',{patientId:${p.id}})">Ficha cadastral</button>
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
