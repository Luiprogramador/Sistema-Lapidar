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
    return this.getState().role || 'doctor';
  },

  setRole(role) {
    this.setState(role === 'patient' ? { role, patientId: 1 } : { role });
  },

  getActivePage() {
    return this.getState().page || 'dashboard';
  },

  getSelectedPatient() {
    const state = this.getState();
    const patientId = this.getRole() === 'patient' ? 1 : state.patientId;
    if (!patientId) return null;
    return PACIENTES.find(p => p.id === patientId) || null;
  },

  resolveNavigation(page, params = {}) {
    const role = this.getRole();
    if (role === 'patient') {
      if (page === 'portal') page = 'patient-detail';
      const allowedPages = ['login', 'patient-detail', 'habits', 'agenda', 'consultation', 'contents', 'settings', 'profile'];
      return {
        page: allowedPages.includes(page) ? page : 'patient-detail',
        params: { ...params, patientId: 1 },
      };
    }
    if (role === 'secretary') {
      if (page === 'patient-detail') page = 'patient-registration';
      const allowedPages = ['login', 'patients', 'patient-registration', 'agenda', 'financial', 'journey', 'contents', 'settings', 'profile'];
      if (!allowedPages.includes(page)) page = 'patients';
    }
    if (role === 'admin') {
      const allowedPages = ['login', 'dashboard', 'patients', 'agenda', 'financial', 'contents', 'settings', 'profile'];
      if (!allowedPages.includes(page)) page = 'dashboard';
    }
    return { page, params };
  },

  navigate(page, params = {}, options = {}) {
    const navigation = this.resolveNavigation(page, params);
    page = navigation.page;
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
      login:            'pages/login.html',
      dashboard:        'pages/dashboard.html',
      patients:         'pages/patients.html',
      consultations:    'pages/consultations.html',
      'patient-detail': 'pages/patient-detail.html',
      'patient-registration': 'pages/patient-registration.html',
      agenda:           'pages/agenda.html',
      financial:        'pages/financial.html',
      portal:           'pages/portal.html',
      consultation:     'pages/consultation.html',
      contents:          'pages/contents.html',
      journey:          'pages/journey.html',
      settings:         'pages/settings.html',
      habits:           'pages/habits.html',
      profile:          'pages/profile.html',
    };
    const target = pageFiles[page];
    if (target) {
      window.location.href = target;
    }
  },
};
