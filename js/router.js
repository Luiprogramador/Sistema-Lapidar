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
      const allowedPages = ['login', 'patient-detail', 'habits', 'agenda', 'consultation'];
      return {
        page: allowedPages.includes(page) ? page : 'patient-detail',
        params: { ...params, patientId: 1 },
      };
    }
    if (role === 'secretary') {
      if (page === 'patient-detail') page = 'patient-registration';
      const allowedPages = ['login', 'patients', 'patient-registration', 'agenda', 'financial'];
      if (!allowedPages.includes(page)) page = 'patients';
    }
    return { page, params };
  },

  navigate(page, params = {}) {
    const navigation = this.resolveNavigation(page, params);
    page = navigation.page;
    this.setState({ page, ...navigation.params });
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
      journey:          '../pages/journey.html',
      settings:         '../pages/settings.html',
      habits:           '../pages/habits.html',
    };
    const target = pageFiles[page];
    if (target) {
      window.location.href = target;
    }
  },

  // Navegação relativa a partir de qualquer pasta
  navigateRelative(page, params = {}) {
    const navigation = this.resolveNavigation(page, params);
    page = navigation.page;
    this.setState({ page, ...navigation.params });
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
      journey:          'pages/journey.html',
      settings:         'pages/settings.html',
      habits:           'pages/habits.html',
    };
    const target = pageFiles[page];
    if (target) {
      window.location.href = target;
    }
  },
};
