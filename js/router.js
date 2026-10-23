/* ============================================================
   LAPIDAR — Router (Navegação via localStorage)
   ============================================================ */

const STORAGE_KEY = 'lapidar_proto_state';

const Router = {
  getState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch { return {}; }
  },

  setState(patch) {
    const current = this.getState();
    const next = { ...current, ...patch };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  },

  getRole() {
    const role = this.getState().role || 'doctor';
    if (role === 'admin') return 'secretary';
    return ['doctor', 'secretary', 'patient', 'developer', 'society'].includes(role) ? role : 'doctor';
  },

  // Espelha AppUser.isAdmin do Flutter: o administrador não é um perfil
  // separado, e sim uma flag da médica ou da secretária.
  isAdmin() {
    const state = this.getState();
    if (state.role === 'patient' || state.role === 'developer' || state.role === 'society') return false;
    if (typeof state.isAdmin === 'boolean') return state.isAdmin;
    return (state.role || 'doctor') !== 'secretary';
  },

  getProfileId() {
    const role = this.getRole();
    if (role === 'patient') return 'patient';
    if (role === 'society') return 'society';
    return role + (this.isAdmin() ? '-admin' : '');
  },

  setProfile(profileId, account = null) {
    const [role, admin] = String(profileId).split('-');
    if (!['doctor', 'secretary', 'patient', 'developer', 'society'].includes(role)) {
      throw new TypeError(`Perfil de demonstração inválido: ${profileId}`);
    }
    const isAdmin = role !== 'patient' && admin === 'admin';
    this.setState({
      role,
      isAdmin: role === 'patient' || role === 'developer' || role === 'society' ? false : isAdmin,
      patientId: role === 'patient' ? (Number(account?.patientId) || 1) : null,
      demoUserId: account?.id || null,
      demoUserName: account?.name || null,
      demoUserDescription: account?.description || null,
      demoUserInitials: account?.initials || null,
    });
  },

  setRole(role) {
    this.setProfile(role === 'admin' ? 'secretary-admin' : role === 'doctor' ? 'doctor-admin' : role);
  },

  // Permissões equivalentes a AuthSession (lib/features/auth/data/auth_session.dart).
  can(permission) {
    const role = this.getRole();
    const admin = this.isAdmin();
    const clinical = role === 'doctor' || role === 'secretary';
    switch (permission) {
      case 'manageContent':     return role === 'doctor' && admin;
      case 'editChart':         return role === 'doctor' && admin;
      case 'seeFinance':        return clinical;
      case 'seeClinicFinance':  return clinical && admin;
      case 'customizeSystem':   return clinical && admin;
      case 'seeAgenda':         return clinical;
      case 'scheduleConsultations': return clinical;
      case 'seeConsultations':  return role !== 'secretary';
      case 'contactDataOnly':   return role === 'secretary';
      case 'seePatients':       return clinical;
      case 'seeClinicalData':   return role === 'doctor' || role === 'patient';
      case 'manageTeam':        return (role === 'doctor' || role === 'secretary') && admin;
      case 'manageForms':       return clinical || role === 'developer';
      case 'manageEvents':      return role === 'developer' || ((role === 'doctor' || role === 'secretary') && admin);
      case 'seeLogs':           return role === 'developer';
      default: return false;
    }
  },

  getHomePage() {
    return this.getRole() === 'patient' ? 'habits' : this.getRole() === 'developer' ? 'logs' : this.getRole() === 'society' ? 'contents' : 'dashboard';
  },

  getActivePage() {
    return this.getState().page || 'dashboard';
  },

  getSelectedPatient() {
    const state = this.getState();
    const patientId = this.getRole() === 'patient' ? (Number(state.patientId) || 1) : state.patientId;
    if (!patientId) return null;
    return PACIENTES.find(p => p.id === patientId) || null;
  },

  resolveNavigation(page, params = {}) {
    const role = this.getRole();
    if (page === 'portal') page = role === 'patient' ? 'patient-detail' : 'dashboard';
    if (role === 'society') {
      const allowedPages = ['contents', 'events', 'habits', 'profile'];
      return { page: allowedPages.includes(page) ? page : 'contents', params };
    }
    if (role === 'developer') {
      const allowedPages = ['logs', 'settings', 'forms', 'events', 'contacts', 'notifications', 'profile'];
      return { page: allowedPages.includes(page) ? page : 'logs', params };
    }
    if (role === 'patient') {
      if (page === 'dashboard') page = 'habits';
      const allowedPages = ['login', 'patient-detail', 'patient-profile', 'habits', 'consultations', 'consultation', 'messages', 'contents', 'settings', 'profile', 'forms', 'events', 'contacts', 'notifications'];
      return {
        page: allowedPages.includes(page) ? page : 'habits',
        params: { ...params, patientId: this.getSelectedPatient()?.id || 1 },
      };
    }
    if (role === 'secretary') {
      if (page === 'consultation' || page === 'consultations' || page === 'patient-detail' || page === 'patient-profile') page = 'agenda';
      const allowedPages = ['login', 'dashboard', 'patients', 'patient-registration', 'agenda', 'messages', 'financial', 'journey', 'contents', 'settings', 'profile', 'forms', 'events', 'contacts', 'notifications'];
      if (!allowedPages.includes(page)) page = 'dashboard';
    }
    const allowedPages = ['login', 'dashboard', 'patients', 'patient-registration', 'agenda', 'consultations', 'patient-detail', 'patient-profile', 'consultation', 'messages', 'financial', 'contents', 'journey', 'settings', 'habits', 'profile', 'logs', 'forms', 'events', 'contacts', 'notifications'];
    if (!allowedPages.includes(page)) page = this.getHomePage();
    return { page, params };
  },

  navigate(page, params = {}, options = {}) {
    const navigation = this.resolveNavigation(page, params);
    page = navigation.page;
    params = navigation.params;
    const current = this.getState();
    const history = Array.isArray(current.navigationHistory) ? current.navigationHistory : [];
    if (!options.skipHistory && current.page && current.page !== page) {
      history.push({
        page: current.page,
        params: {
          patientId: current.patientId,
          consultationId: current.consultationId,
        },
      });
    }
    this.setState({
      page,
      ...navigation.params,
      navigationHistory: history.slice(-30),
    });
    const pageFiles = {
      login:            '../pages/login.html',
      dashboard:        '../pages/dashboard.html',
      patients:         '../pages/patients.html',
      consultations:    '../pages/consultations.html',
      'patient-detail': '../pages/patient-detail.html',
      'patient-profile': '../pages/patient-profile.html',
      'patient-registration': '../pages/patient-registration.html',
      agenda:           '../pages/agenda.html',
      financial:        '../pages/financial.html',
      portal:           '../pages/portal.html',
      consultation:     '../pages/consultation.html',
      contents:          '../pages/contents.html',
      journey:          '../pages/journey.html',
      settings:         '../pages/settings.html',
      habits:           '../pages/habits.html',
      profile:          '../pages/profile.html',
      messages:         '../pages/messages.html',
      logs:             '../pages/logs.html',
      forms:            '../pages/forms.html',
      events:           '../pages/events.html',
      contacts:         '../pages/contacts.html',
      notifications:    '../pages/notifications.html',
    };
    const target = pageFiles[page];
    if (target) {
      window.location.href = target;
    }
  },

  goBack(fallbackPage, fallbackParams = {}) {
    const state = this.getState();
    const history = Array.isArray(state.navigationHistory) ? [...state.navigationHistory] : [];
    while (history.length) {
      const previous = history.pop();
      const resolved = this.resolveNavigation(previous.page, previous.params);
      if (resolved.page === previous.page) {
        this.setState({ navigationHistory: history });
        this.navigate(previous.page, previous.params, { skipHistory: true });
        return;
      }
    }
    this.setState({ navigationHistory: history });
    this.navigate(fallbackPage, fallbackParams, { skipHistory: true });
  },

  // Navegação relativa a partir de qualquer pasta
  navigateRelative(page, params = {}, options = {}) {
    const navigation = this.resolveNavigation(page, params);
    page = navigation.page;
    params = navigation.params;
    const current = this.getState();
    const history = Array.isArray(current.navigationHistory) ? current.navigationHistory : [];
    if (!options.skipHistory && current.page && current.page !== page) {
      history.push({
        page: current.page,
        params: {
          patientId: current.patientId,
          consultationId: current.consultationId,
        },
      });
    }
    this.setState({
      page,
      ...navigation.params,
      navigationHistory: history.slice(-30),
    });
    const pageFiles = {
      login:            'login.html',
      dashboard:        'dashboard.html',
      patients:         'patients.html',
      consultations:    'consultations.html',
      'patient-detail': 'patient-detail.html',
      'patient-profile': 'patient-profile.html',
      'patient-registration': 'patient-registration.html',
      agenda:           'agenda.html',
      financial:        'financial.html',
      portal:           'portal.html',
      consultation:     'consultation.html',
      contents:         'contents.html',
      journey:          'journey.html',
      settings:         'settings.html',
      habits:           'habits.html',
      profile:          'profile.html',
      messages:         'messages.html',
      logs:             'logs.html',
      forms:            'forms.html',
      events:           'events.html',
      contacts:         'contacts.html',
      notifications:    'notifications.html',
    };
    const inPagesDirectory = /\/pages\/[^/]*$/i.test(window.location.pathname);
    const target = pageFiles[page] && `${inPagesDirectory ? '' : 'pages/'}${pageFiles[page]}`;
    if (target) {
      window.location.href = target;
    }
  },
};
