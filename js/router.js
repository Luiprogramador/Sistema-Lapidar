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
    this.setState({ role });
  },

  getActivePage() {
    return this.getState().page || 'dashboard';
  },

  getSelectedPatient() {
    const state = this.getState();
    if (!state.patientId) return null;
    return PACIENTES.find(p => p.id === state.patientId) || null;
  },

  navigate(page, params = {}) {
    this.setState({ page, ...params });
    const pageFiles = {
      login:            '../pages/login.html',
      dashboard:        '../pages/dashboard.html',
      patients:         '../pages/patients.html',
      consultations:    '../pages/consultations.html',
      'patient-detail': '../pages/patient-detail.html',
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
    this.setState({ page, ...params });
    const pageFiles = {
      login:            'pages/login.html',
      dashboard:        'pages/dashboard.html',
      patients:         'pages/patients.html',
      consultations:    'pages/consultations.html',
      'patient-detail': 'pages/patient-detail.html',
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
