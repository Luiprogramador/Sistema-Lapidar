/* Additional screens shared by the static prototype. */
const EXTRA_STORAGE = {
  events: 'lapidar-events',
  templates: 'lapidar-form-templates',
  submissions: 'lapidar-form-submissions',
};

function extraReadArray(key, fallback = []) {
  const value = localStorage.getItem(key);
  if (value === null) return fallback;
  const parsed = JSON.parse(value);
  if (!Array.isArray(parsed)) throw new TypeError(`Os dados locais "${key}" estão inválidos.`);
  return parsed;
}

function extraSaveArray(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function extraText(value) {
  return escapePatientCardText(value == null ? '' : String(value));
}

function extraDate(value, options = { day: '2-digit', month: '2-digit', year: 'numeric' }) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Data não informada' : new Intl.DateTimeFormat('pt-BR', options).format(date);
}

function extraToast(message) {
  const output = document.getElementById('extra-feedback');
  if (output) output.textContent = message;
}

function initExtraPage(page) {
  if (page === 'events') renderEventsPage();
  if (page === 'forms') renderFormsPage();
  if (page === 'contacts') renderContactsPage();
  if (page === 'notifications') renderNotificationsPage();
}

function renderEventsPage() {
  const source = window.LAPIDAR_DEMO_DATA?.eventos?.eventos;
  if (!Array.isArray(source)) throw new Error('Os eventos da demonstração não estão disponíveis.');
  const manager = Router.can('manageEvents');
  let month = new Date();
  month = new Date(month.getFullYear(), month.getMonth(), 1);
  let selected = new Date();
  selected.setHours(0, 0, 0, 0);
  let mobileView = 'list';
  let events = extraReadArray(EXTRA_STORAGE.events, source);

  const profileId = Router.getProfileId();
  const visibleEvents = () => events.filter(event => manager || event.situacao !== 'rascunho');
  const monthLabel = date => new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date);
  const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const isPast = (event, now = new Date()) => {
    const start = new Date(event.inicio);
    const end = event.fim ? new Date(event.fim) : new Date(start.getTime() + 2 * 60 * 60 * 1000);
    return end < now;
  };
  const localRegistrations = () => extraReadArray('lapidar-event-registrations', [])
    .map(item => typeof item === 'string' ? { eventId: item, userId: profileId } : item);
  const registrationsFor = event => {
    const stored = Array.isArray(event.inscricoes) ? event.inscricoes : [];
    const ids = new Set(stored.map(item => typeof item === 'string' ? item : item.usuarioId || item.userId).filter(Boolean));
    for (const item of localRegistrations()) {
      if (item.eventId === event.id && item.userId) ids.add(item.userId);
    }
    return ids;
  };
  const isRegistered = event => registrationsFor(event).has(profileId);
  const eventDateBlock = (event, onDark = false, size = '') => {
    const date = new Date(event.inicio);
    return `<div class="event-date ${onDark ? 'on-dark' : ''} ${size}"><span>${extraText(new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(date).replace('.', '').toUpperCase())}</span><strong>${extraText(new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(date))}</strong><span>${extraText(new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date).replace('.', '').toUpperCase())}</span></div>`;
  };
  const eventCountdown = event => {
    const days = Math.ceil((new Date(event.inicio).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000);
    return days <= 0 ? 'HOJE' : days === 1 ? 'AMANHÃ' : `EM ${days} DIAS`;
  };
  const eventPlace = event => event.local || (event.link ? 'Transmissão online' : 'A definir');
  const eventCapacity = event => {
    const count = registrationsFor(event).size;
    if (!event.vagas) return `${count} inscritas(os)`;
    return `${Math.max(0, event.vagas - count)} vaga${event.vagas - count === 1 ? '' : 's'} restante${event.vagas - count === 1 ? '' : 's'} de ${event.vagas}`;
  };
  const featuredMarkup = event => `
    <article class="event-featured">
      ${eventDateBlock(event, true, 'event-date-featured')}
      <div class="event-featured-copy">
        <span class="event-featured-kicker">PRÓXIMO EVENTO · ${extraText(eventCountdown(event))}</span>
        <h2>${extraText(event.titulo)}</h2>
        <div class="event-featured-meta"><span>◷ ${extraText(extraDate(event.inicio, { hour: '2-digit', minute: '2-digit' }))}</span><span>⌖ ${extraText(eventPlace(event))}</span></div>
        ${event.descricao ? `<p>${extraText(event.descricao)}</p>` : ''}
        ${event.vagas ? `<div class="event-featured-capacity">♧ ${extraText(eventCapacity(event))}<span class="event-capacity-track"><i style="width:${Math.min(100, registrationsFor(event).size / event.vagas * 100)}%"></i></span></div>` : ''}
        <button type="button" class="btn btn-event-featured" data-event-detail="${extraText(event.id)}">${isRegistered(event) ? '✓ Você está inscrita(o)' : '→ Ver detalhes'}</button>
      </div>
    </article>`;
  const render = () => {
    events = extraReadArray(EXTRA_STORAGE.events, source);
    const now = new Date();
    const visible = visibleEvents().sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
    const start = new Date(month.getFullYear(), month.getMonth(), 1);
    const mondayOffset = (start.getDay() + 6) % 7;
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const eventDays = new Set(visible.filter(event => {
      const date = new Date(event.inicio);
      return date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth();
    }).map(event => new Date(event.inicio).getDate()));
    const cells = Array.from({ length: Math.ceil((mondayOffset + daysInMonth) / 7) * 7 }, (_, index) => {
      const day = index - mondayOffset + 1;
      if (day < 1 || day > daysInMonth) return '<span class="calendar-day empty"></span>';
      const date = new Date(month.getFullYear(), month.getMonth(), day);
      return `<button type="button" class="calendar-day ${sameDay(date, selected) ? 'selected' : ''} ${eventDays.has(day) ? 'has-event' : ''}" data-event-day="${day}" aria-label="${day}${eventDays.has(day) ? ', há evento' : ''}">${day}</button>`;
    }).join('');
    const dayEvents = visible.filter(event => sameDay(new Date(event.inicio), selected));
    const upcoming = visible.filter(event => !isPast(event, now) && event.situacao !== 'cancelado');
    const past = visible.filter(event => isPast(event, now)).reverse();
    const featured = upcoming.find(event => event.situacao === 'publicado');
    const published = upcoming.filter(event => event.situacao === 'publicado');
    const mine = upcoming.filter(isRegistered);
    const openSpots = published.filter(event => !event.vagas || registrationsFor(event).size < event.vagas).length;
    const totalSpots = published.filter(event => event.vagas && registrationsFor(event).size < event.vagas)
      .reduce((sum, event) => sum + event.vagas - registrationsFor(event).size, 0);
    const selectedMarkup = dayEvents.length ? dayEvents.map(event => eventCard(event)).join('') : '<div class="extra-empty">Nenhum evento neste dia.</div>';
    const upcomingMarkup = upcoming.length ? upcoming.map(event => eventCard(event)).join('') : `<div class="extra-empty">${manager ? 'Use “Novo evento” para cadastrar o primeiro.' : 'Quando a clínica divulgar um novo evento, ele aparece aqui.'}</div>`;
    const pastMarkup = past.length ? past.slice(0, 6).map(event => eventCard(event)).join('') : '';
    document.getElementById('events-summary').innerHTML = `
      <article class="card extra-stat"><span class="event-stat-icon">✧</span><div><strong>${upcoming.length}</strong><b>Próximos eventos</b><small>${featured ? `O primeiro é “${extraText(featured.titulo)}”, ${extraText(eventCountdown(featured).toLowerCase())}` : 'Nenhum evento marcado'}</small></div></article>
      <article class="card extra-stat"><span class="event-stat-icon">♙</span><div><strong>${mine.length}</strong><b>${mine.length === 1 ? 'Minha inscrição' : 'Minhas inscrições'}</b><small>${manager ? `Somando os ${upcoming.length} eventos que ainda vão acontecer` : mine.length ? `Você participa de ${mine.length} dos ${upcoming.length} eventos à frente` : 'Você ainda não se inscreveu em nenhum evento'}</small></div></article>
      <article class="card extra-stat"><span class="event-stat-icon">♧</span><div><strong>${openSpots}</strong><b>${openSpots === 1 ? 'Aberto a inscrição' : 'Abertos a inscrição'}</b><small>${totalSpots ? `${totalSpots} vagas livres no total` : openSpots ? 'Eventos com vagas ilimitadas' : 'Nenhum evento com vaga no momento'}</small></div></article>`;
    document.getElementById('events-featured').innerHTML = featured ? featuredMarkup(featured) : '';
    document.getElementById('upcoming-events-count').textContent = upcoming.length ? `${upcoming.length} evento${upcoming.length === 1 ? '' : 's'} à frente` : '';
    document.getElementById('events-calendar').innerHTML = `
      <div class="extra-month"><button class="btn btn-ghost btn-sm" type="button" data-month="-1" aria-label="Mês anterior">‹</button><strong>${extraText(monthLabel(month))}</strong><button class="btn btn-ghost btn-sm" type="button" data-month="1" aria-label="Próximo mês">›</button></div>
      <div class="calendar-weekdays">${['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map(day => `<span>${day}</span>`).join('')}</div>
      <div class="calendar-grid">${cells}</div>`;
    document.getElementById('selected-day-title').textContent = extraDate(selected, { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById('selected-day-events').innerHTML = selectedMarkup;
    document.getElementById('upcoming-events').innerHTML = upcomingMarkup;
    document.getElementById('past-events').innerHTML = pastMarkup;
    document.getElementById('past-events-section').hidden = past.length === 0;
    document.getElementById('events-content').dataset.view = mobileView;
    document.querySelectorAll('[data-events-view]').forEach(button => {
      button.classList.toggle('active', button.dataset.eventsView === mobileView);
      button.setAttribute('aria-pressed', String(button.dataset.eventsView === mobileView));
    });
    document.querySelectorAll('[data-event-day]').forEach(button => button.addEventListener('click', () => {
      selected = new Date(month.getFullYear(), month.getMonth(), Number(button.dataset.eventDay));
      render();
    }));
    document.querySelectorAll('[data-month]').forEach(button => button.addEventListener('click', () => {
      month = new Date(month.getFullYear(), month.getMonth() + Number(button.dataset.month), 1);
      selected = new Date(month.getFullYear(), month.getMonth(), 1);
      render();
    }));
    document.querySelectorAll('[data-event-detail]').forEach(button => button.addEventListener('click', () => showEventDetail(button.dataset.eventDetail)));
    document.querySelectorAll('[data-event-remove]').forEach(button => button.addEventListener('click', () => {
      events = events.filter(event => event.id !== button.dataset.eventRemove);
      extraSaveArray(EXTRA_STORAGE.events, events);
      render();
    }));
  };
  const eventCard = event => {
    const date = new Date(event.inicio);
    const joined = isRegistered(event);
    const count = registrationsFor(event).size;
    const full = event.vagas > 0 && count >= event.vagas;
    const status = event.situacao === 'rascunho' ? 'Rascunho' : event.situacao === 'cancelado' ? 'Cancelado' : joined ? 'Inscrita(o)' : full && !isPast(event) ? 'Esgotado' : '';
    return `<article class="card event-card">
      ${eventDateBlock(event)}
      <div class="event-copy"><span class="eyebrow">${extraText(event.tipo)}${event.nivel === 'plus' ? ' · Society Plus' : ''}</span><h3>${extraText(event.titulo)}</h3>
      <div class="event-meta">${extraText(extraDate(event.inicio, { hour: '2-digit', minute: '2-digit' }))} · ${extraText(eventCountdown(event).toLowerCase())}</div>
      ${event.local ? `<p class="event-location">${extraText(eventPlace(event))}</p>` : ''}
      <div class="event-card-footer">${status ? `<span class="event-status ${status === 'Rascunho' ? 'warning' : status === 'Inscrita(o)' ? 'success' : ''}">${extraText(status)}</span>` : ''}${event.nivel === 'plus' ? '<span class="event-status">PLUS</span>' : ''}${event.link ? '<span class="event-status">Online</span>' : ''}<span>${extraText(eventCapacity(event))}</span></div>
      <button type="button" class="btn btn-outline btn-sm" data-event-detail="${extraText(event.id)}">Ver detalhes</button></div></article>`;
  };
  const detailDialog = document.getElementById('event-detail-dialog');
  const showEventDetail = id => {
    const event = events.find(item => item.id === id);
    if (!event) return;
    const joined = isRegistered(event);
    const count = registrationsFor(event).size;
    const full = event.vagas > 0 && count >= event.vagas;
    document.getElementById('event-detail-content').innerHTML = `
      <div class="extra-dialog-form"><header><h2>${extraText(event.titulo)}</h2><button type="button" class="btn btn-ghost" data-event-detail-close aria-label="Fechar">×</button></header>
        <div class="extra-dialog-body">${eventDateBlock(event)}<p>${extraText(event.descricao || 'Sem descrição informada.')}</p><p>${extraText(extraDate(event.inicio, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }))} · ${extraText(eventPlace(event))}</p><p>${extraText(eventCapacity(event))}</p>${event.link ? `<a href="${extraText(event.link)}" target="_blank" rel="noopener noreferrer">Acessar evento</a>` : ''}</div>
        <footer>${manager ? `<button type="button" class="btn btn-outline btn-sm" data-event-remove="${extraText(event.id)}">Remover evento</button>` : `<button type="button" class="btn ${joined ? 'btn-outline' : 'btn-primary'}" data-event-register="${extraText(event.id)}" ${full && !joined ? 'disabled' : ''}>${joined ? 'Cancelar inscrição' : full ? 'Esgotado' : 'Inscrever-se'}</button>`}</footer>
      </div>`;
    detailDialog.showModal();
    document.querySelector('[data-event-detail-close]')?.addEventListener('click', () => detailDialog.close());
    document.querySelector('[data-event-remove]')?.addEventListener('click', buttonEvent => {
      events = events.filter(item => item.id !== buttonEvent.currentTarget.dataset.eventRemove);
      extraSaveArray(EXTRA_STORAGE.events, events);
      detailDialog.close();
      render();
    });
  };
  detailDialog.addEventListener('click', event => {
    const button = event.target.closest('[data-event-register]');
    if (!button) return;
    const id = button.dataset.eventRegister;
    const values = localRegistrations();
    const joined = values.some(item => item.eventId === id && item.userId === profileId);
    extraSaveArray('lapidar-event-registrations', joined
      ? values.filter(item => !(item.eventId === id && item.userId === profileId))
      : [...values, { eventId: id, userId: profileId }]);
    const isOpen = detailDialog.open;
    render();
    if (isOpen) showEventDetail(id);
  });
  detailDialog.addEventListener('click', event => {
    if (event.target === detailDialog) detailDialog.close();
  });
  document.querySelectorAll('[data-events-view]').forEach(button => button.addEventListener('click', () => {
    mobileView = button.dataset.eventsView;
    render();
  }));
  const dialog = document.getElementById('event-dialog');
  document.getElementById('new-event-button')?.addEventListener('click', () => dialog.showModal());
  document.getElementById('event-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get('title') || '').trim();
    const startDate = String(data.get('start') || '');
    if (!title || !startDate) return;
    events.push({
      id: `ev-local-${Date.now()}`, titulo: title, descricao: String(data.get('description') || '').trim(),
      tipo: String(data.get('type') || 'encontro'), inicio: new Date(startDate).toISOString(),
      fim: new Date(new Date(startDate).getTime() + 60 * 60 * 1000).toISOString(),
      local: String(data.get('location') || '').trim(), link: '', vagas: Number(data.get('capacity') || 0),
      nivel: 'inicial', situacao: 'publicado', inscricoes: [],
    });
    extraSaveArray(EXTRA_STORAGE.events, events);
    dialog.close();
    event.currentTarget.reset();
    render();
  });
  document.querySelectorAll('[data-dialog-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
  document.getElementById('events-manager-actions').hidden = !manager;
  render();
}

function renderFormsPage() {
  const fixture = window.LAPIDAR_DEMO_DATA?.formularios;
  if (!fixture || !Array.isArray(fixture.modelos)) throw new Error('Os formulários da demonstração não estão disponíveis.');
  const canManage = Router.can('manageForms');
  const patientId = `p${Router.getSelectedPatient()?.id || 1}`;
  let templates = extraReadArray(EXTRA_STORAGE.templates, fixture.modelos);
  let submissions = extraReadArray(EXTRA_STORAGE.submissions, fixture.envios || []);
  let query = '';
  let waitingOnly = false;
  let page = 0;
  const pageSize = 6;
  const dialog = document.getElementById('forms-dialog');
  const persist = () => {
    extraSaveArray(EXTRA_STORAGE.templates, templates);
    extraSaveArray(EXTRA_STORAGE.submissions, submissions);
  };
  const render = () => {
    templates = extraReadArray(EXTRA_STORAGE.templates, fixture.modelos);
    submissions = extraReadArray(EXTRA_STORAGE.submissions, fixture.envios || []);
    const ownSubmissions = submissions.filter(item => canManage || item.pacienteId === patientId);
    const recipientId = Router.getProfileId();
    const received = submissions.filter(item => canManage
      ? (item.recipientId || item.destinatarioId) === recipientId
      : item.pacienteId === patientId);
    const pendingReceived = received.filter(item => !item.respondido);
    const completedReceived = received.filter(item => item.respondido);
    const filtered = ownSubmissions.filter(item =>
      (!waitingOnly || !item.respondido) &&
      `${item.titulo} ${item.pacienteNome || ''} ${item.enviadoPor || ''}`.toLowerCase().includes(query));
    const waiting = ownSubmissions.filter(item => !item.respondido).length;
    document.getElementById('new-template-button').hidden = !canManage;
    document.getElementById('forms-received-content').innerHTML = `
      <article class="card forms-received-card"><h2 class="form-subsection-title">Para responder</h2><div id="forms-to-answer" class="form-list">${pendingReceived.length ? pendingReceived.map(submission => `
        <article class="form-received-row"><div><h3>${extraText(submission.titulo)}</h3><p>De: ${extraText(submission.enviadoPor || 'Equipe Lapidar')} · enviado em ${extraText(extraDate(submission.enviadoEm))}</p><span class="event-status">${(submission.perguntas || []).length} pergunta${(submission.perguntas || []).length === 1 ? '' : 's'}</span></div><button type="button" class="btn btn-primary btn-sm" data-answer-submission="${extraText(submission.id)}">Responder</button></article>`).join('') : '<div class="extra-empty"><strong>Tudo em dia</strong><p>Quando a equipe enviar um formulário, ele aparece aqui.</p></div>'}</div></article>
      ${completedReceived.length ? `<article class="card forms-received-card"><h2 class="form-subsection-title">Já respondidos</h2><div id="forms-completed" class="form-list">${completedReceived.map(submission => `
        <article class="form-received-row"><div><h3>${extraText(submission.titulo)}</h3><p>De: ${extraText(submission.enviadoPor || 'Equipe Lapidar')} · enviado em ${extraText(extraDate(submission.enviadoEm))}</p><span class="event-status success">Respondido em ${extraText(extraDate(submission.respondidoEm))}</span></div><div class="event-actions"><button type="button" class="btn btn-outline btn-sm" data-edit-answer="${extraText(submission.id)}">Editar respostas</button><button type="button" class="btn btn-ghost btn-sm" data-view-patient-answer="${extraText(submission.id)}">Ver respostas</button></div></article>`).join('')}</div></article>` : ''}`;
    document.getElementById('forms-staff-content').hidden = !canManage;
    if (canManage) {
      document.getElementById('forms-summary').innerHTML = `
        <article class="card extra-stat"><span>MODELOS</span><strong>${templates.length}</strong><small>Criados pela clínica</small></article>
        <article class="card extra-stat"><span>ENVIADOS</span><strong>${ownSubmissions.length}</strong><small>Para pacientes</small></article>
        <article class="card extra-stat"><span>AGUARDANDO</span><strong>${waiting}</strong><small>Sem resposta ainda</small></article>
        <article class="card extra-stat"><span>RESPONDIDOS</span><strong>${ownSubmissions.length - waiting}</strong><small>Prontos para ler</small></article>`;
      document.getElementById('form-templates').innerHTML = templates.length ? templates.map(template => `
        <article class="card form-template">
          <div><span class="eyebrow">MODELO · ${(template.perguntas || []).length} perguntas</span><h3>${extraText(template.titulo)}</h3><p>${extraText(template.descricao)}</p><span class="event-status">Criado por ${extraText(template.criadoPor || getProfileLabel())}</span></div>
          <div class="event-actions"><button type="button" class="btn btn-primary btn-sm" data-send-template="${extraText(template.id)}">Enviar para...</button><button type="button" class="btn btn-outline btn-sm" data-edit-template="${extraText(template.id)}">Editar</button><button type="button" class="btn btn-ghost btn-sm" data-view-template="${extraText(template.id)}">Prévia</button><button type="button" class="btn btn-ghost btn-sm" data-delete-template="${extraText(template.id)}">Excluir</button></div>
        </article>`).join('') : '<div class="extra-empty">Nenhum formulário criado. Use “Novo formulário” para montar o primeiro modelo.</div>';
      const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
      page = Math.min(page, pageCount - 1);
      const shown = filtered.slice(page * pageSize, (page + 1) * pageSize);
      document.getElementById('staff-form-submissions').innerHTML = shown.length ? shown.map(submission => `
        <article class="card submission-card"><div><span class="eyebrow">${submission.respondido ? 'RESPONDIDO' : 'AGUARDANDO'} · ${extraText(extraDate(submission.enviadoEm))}</span><h3>${extraText(submission.titulo)}</h3><p>${extraText(submission.pacienteNome || submission.pacienteId)} · ${extraText(submission.enviadoPor || 'Equipe Lapidar')}</p></div>${submission.respondido ? `<button type="button" class="btn btn-outline btn-sm" data-view-answer="${extraText(submission.id)}">Ler respostas</button>` : ''}</article>`).join('') : '<div class="extra-empty">Nenhum formulário enviado encontrado.</div>';
      document.getElementById('forms-pagination').innerHTML = pageCount > 1 ? `<button type="button" class="btn btn-outline btn-sm" data-form-page="-1" ${page === 0 ? 'disabled' : ''}>Anterior</button><span>Página ${page + 1} de ${pageCount}</span><button type="button" class="btn btn-outline btn-sm" data-form-page="1" ${page >= pageCount - 1 ? 'disabled' : ''}>Próxima</button>` : '';
      document.getElementById('forms-waiting-filter').setAttribute('aria-pressed', String(waitingOnly));
      document.getElementById('forms-query').value = query;
    }
  };
  const openModal = (title, body, submitLabel, onSubmit) => {
    dialog.innerHTML = `<form method="dialog" class="extra-dialog-form"><header><h2>${extraText(title)}</h2><button type="button" class="btn btn-ghost" data-modal-close aria-label="Fechar">×</button></header><div class="extra-dialog-body">${body}</div><footer><button type="button" class="btn btn-outline" data-modal-close>Cancelar</button><button type="submit" class="btn btn-primary">${extraText(submitLabel)}</button></footer></form>`;
    dialog.showModal();
    dialog.querySelectorAll('[data-modal-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      onSubmit(new FormData(event.currentTarget));
    });
  };
  const openTemplateDialog = existing => {
    const questions = existing?.perguntas?.length ? existing.perguntas : [{}];
    const questionRows = questions.map(question => `<div class="form-question-row" data-question-row data-question-id="${extraText(question.id || '')}">
      <label class="form-group"><span class="form-label">Pergunta</span><input class="form-input" name="question" required maxlength="240" value="${extraText(question.pergunta || '')}"></label>
      <label class="form-group"><span class="form-label">Tipo de resposta</span><select class="form-select" name="question-type"><option value="longText" ${question.tipo === 'longText' || question.tipo === 'text' ? 'selected' : ''}>Texto livre</option><option value="yesNo" ${question.tipo === 'yesNo' ? 'selected' : ''}>Sim / Não</option><option value="choice" ${question.tipo === 'choice' ? 'selected' : ''}>Escolha</option></select></label>
      <label class="form-group"><span class="form-label">Opções (separadas por vírgula)</span><input class="form-input" name="question-options" placeholder="Baixo, Médio, Alto" value="${extraText((question.opcoes || []).join(', '))}"></label>
      <label class="extra-check"><input name="question-required" type="checkbox" ${question.obrigatoria !== false ? 'checked' : ''}> Resposta obrigatória</label>
    </div>`).join('');
    openModal(existing ? 'Editar formulário' : 'Novo formulário', `
      <label class="form-group"><span class="form-label">Título</span><input class="form-input" name="title" required maxlength="100" value="${extraText(existing?.titulo || '')}"></label>
      <label class="form-group"><span class="form-label">Descrição</span><textarea class="form-textarea" name="description" rows="3" maxlength="400">${extraText(existing?.descricao || '')}</textarea></label>
      <section id="new-form-questions">${questionRows}</section>
      <button type="button" class="btn btn-outline btn-sm" data-add-question>＋ Adicionar pergunta</button>`, existing ? 'Salvar alterações' : 'Criar modelo', data => {
      const title = String(data.get('title') || '').trim();
      if (!title) {
        extraToast('Informe um título para o formulário.');
        return;
      }
      const questions = [...dialog.querySelectorAll('[data-question-row]')].map(row => ({
        id: row.dataset.questionId || `q-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        pergunta: row.querySelector('[name="question"]').value.trim(),
        tipo: row.querySelector('[name="question-type"]').value,
        opcoes: row.querySelector('[name="question-options"]').value.split(',').map(value => value.trim()).filter(Boolean),
        obrigatoria: row.querySelector('[name="question-required"]').checked,
      })).filter(question => question.pergunta);
      if (!questions.length) {
        extraToast('Inclua ao menos uma pergunta no formulário.');
        return;
      }
      const template = {
        ...(existing || {}),
        id: existing?.id || `form-${Date.now()}`,
        titulo: title,
        descricao: String(data.get('description') || '').trim(),
        perguntas: questions,
        criadoPor: existing?.criadoPor || getProfileLabel(),
        criadoEm: existing?.criadoEm || new Date().toISOString(),
      };
      if (existing) templates = templates.map(item => item.id === existing.id ? template : item);
      else templates.push(template);
      persist();
      dialog.close();
      render();
    });
  };
  document.getElementById('new-template-button')?.addEventListener('click', () => openTemplateDialog(null));
  document.getElementById('forms-dialog').addEventListener('click', event => {
    if (!event.target.closest('[data-add-question]')) return;
    const row = dialog.querySelector('[data-question-row]').cloneNode(true);
    row.dataset.questionId = '';
    row.querySelectorAll('input').forEach(input => {
      if (input.type === 'checkbox') input.checked = false;
      else input.value = '';
    });
    dialog.querySelector('#new-form-questions').append(row);
  });
  document.getElementById('forms-query')?.addEventListener('input', event => { query = event.currentTarget.value.trim().toLowerCase(); page = 0; render(); });
  document.getElementById('forms-waiting-filter')?.addEventListener('click', () => { waitingOnly = !waitingOnly; page = 0; render(); });
  document.getElementById('forms-pagination')?.addEventListener('click', event => {
    const button = event.target.closest('[data-form-page]');
    if (button) { page += Number(button.dataset.formPage); render(); }
  });
  document.getElementById('forms-staff-content').addEventListener('click', event => {
    const sendButton = event.target.closest('[data-send-template]');
    const viewButton = event.target.closest('[data-view-template]');
    const editButton = event.target.closest('[data-edit-template]');
    const deleteButton = event.target.closest('[data-delete-template]');
    const answerButton = event.target.closest('[data-view-answer]');
    if (editButton) {
      const template = templates.find(item => item.id === editButton.dataset.editTemplate);
      if (template) openTemplateDialog(template);
    } else if (deleteButton) {
      const template = templates.find(item => item.id === deleteButton.dataset.deleteTemplate);
      if (template && window.confirm(`Excluir o modelo “${template.titulo}”?`)) {
        templates = templates.filter(item => item.id !== template.id);
        persist();
        render();
      }
    } else if (sendButton) {
      const template = templates.find(item => item.id === sendButton.dataset.sendTemplate);
      if (!template) return;
      openModal(`Enviar “${template.titulo}”`, `<label class="form-group"><span class="form-label">Paciente</span><select class="form-select" name="patient" required>${PACIENTES.map(patient => `<option value="${patient.id}">${extraText(patient.nome)}</option>`).join('')}</select></label>`, 'Enviar formulário', data => {
        const patient = PACIENTES.find(item => String(item.id) === String(data.get('patient')));
        if (!patient) return;
        submissions.unshift({ id: `submission-${Date.now()}`, templateId: template.id, titulo: template.titulo, descricao: template.descricao, perguntas: template.perguntas || [], pacienteId: `p${patient.id}`, pacienteNome: patient.nome, enviadoPor: getProfileLabel(), enviadoEm: new Date().toISOString(), respondido: false, respostas: [] });
        persist();
        dialog.close();
        render();
      });
    } else if (viewButton) {
      const template = templates.find(item => item.id === viewButton.dataset.viewTemplate);
      if (template) openModal(template.titulo, `<p>${extraText(template.descricao)}</p>${(template.perguntas || []).map((item, index) => `<p><strong>${index + 1}. ${extraText(item.pergunta)}</strong></p>`).join('') || '<p>Este modelo ainda não tem perguntas.</p>'}`, 'Fechar', () => dialog.close());
    } else if (answerButton) {
      const submission = submissions.find(item => item.id === answerButton.dataset.viewAnswer);
      if (submission) openModal(submission.titulo, (submission.perguntas || []).map((item, index) => `<p><strong>${index + 1}. ${extraText(item.pergunta)}</strong></p><p>${extraText(submission.respostas?.[index] || 'Sem resposta')}</p>`).join(''), 'Fechar', () => dialog.close());
    }
  });
  document.getElementById('forms-received-content').addEventListener('click', event => {
    const viewButton = event.target.closest('[data-view-patient-answer]');
    if (viewButton) {
      const submission = submissions.find(item => item.id === viewButton.dataset.viewPatientAnswer);
      if (submission) {
        const answerMarkup = (submission.perguntas || []).map((question, index) => `<p><strong>${index + 1}. ${extraText(question.pergunta)}</strong></p><p>${extraText(submission.respostas?.[index] || 'Sem resposta')}</p>`).join('') || '<p>Nenhuma resposta registrada.</p>';
        openModal(submission.titulo, answerMarkup, 'Fechar', () => dialog.close());
      }
      return;
    }
    const button = event.target.closest('[data-answer-submission], [data-edit-answer]');
    if (!button) return;
    const submissionId = button.dataset.answerSubmission || button.dataset.editAnswer;
    const submission = submissions.find(item => item.id === submissionId);
    if (!submission) return;
    const questions = submission.perguntas || [];
    const questionMarkup = questions.length ? questions.map((question, index) => {
      const required = question.obrigatoria ? 'required' : '';
      const answer = submission.respostas?.[index] || '';
      if (question.tipo === 'yesNo') return `<label class="form-group"><span class="form-label">${extraText(question.pergunta)}</span><select class="form-select" name="answer-${index}" ${required}><option value="">Selecione</option><option ${answer === 'Sim' ? 'selected' : ''}>Sim</option><option ${answer === 'Não' ? 'selected' : ''}>Não</option></select></label>`;
      if (question.tipo === 'choice') return `<label class="form-group"><span class="form-label">${extraText(question.pergunta)}</span><select class="form-select" name="answer-${index}" ${required}><option value="">Selecione</option>${(question.opcoes || []).map(option => `<option ${answer === option ? 'selected' : ''}>${extraText(option)}</option>`).join('')}</select></label>`;
      return `<label class="form-group"><span class="form-label">${extraText(question.pergunta)}</span><textarea class="form-textarea" name="answer-${index}" rows="3" ${required}>${extraText(answer)}</textarea></label>`;
    }).join('') : '<p>Este formulário não contém perguntas. Envie para registrar sua resposta.</p>';
    openModal(submission.respondido ? 'Editar respostas' : submission.titulo, questionMarkup, submission.respondido ? 'Salvar respostas' : 'Enviar respostas', data => {
      submission.respostas = questions.map((_, index) => String(data.get(`answer-${index}`) || '').trim());
      submission.respondido = true;
      submission.respondidoEm = new Date().toISOString();
      persist();
      dialog.close();
      render();
    });
  });
  render();
}

function renderContactsPage() {
  const fixture = window.LAPIDAR_DEMO_DATA;
  const staff = fixture?.equipe_clinica?.funcionarios;
  if (!Array.isArray(staff)) throw new Error('Os contatos da equipe não estão disponíveis.');
  const roleLabels = { medica: 'Médica', secretaria: 'Secretaria', desenvolvedor: 'Desenvolvedor', adminSistema: 'Admin do sistema', gestorConteudo: 'Gestor de conteúdo', gestorFinanceiro: 'Gestor financeiro' };
  const patientRole = Router.getRole() === 'patient';
  const records = [];
  staff.filter(member => member.situacao === 'ativo').forEach(member => {
    if (patientRole && !['medica', 'secretaria'].includes(member.cargo)) return;
    records.push({ id: member.id, name: member.nome, functions: (member.funcoes || [member.cargo]).map(value => roleLabels[value] || value), email: member.email || '', phone: member.telefone || '', kind: 'staff' });
  });
  if (Router.can('seePatients')) PACIENTES.forEach(patient => records.push({ id: patient.id, name: patient.nome, functions: ['Paciente'], email: '', phone: '', kind: 'patient' }));
  let query = '';
  let selectedFunction = '';
  const render = () => {
    const functions = [...new Set(records.flatMap(record => record.functions))].sort();
    const filtered = records.filter(record => record.name.toLowerCase().includes(query) && (!selectedFunction || record.functions.includes(selectedFunction)));
    document.getElementById('contact-filters').innerHTML = ['Todas as funções', ...functions].map(label => {
      const value = label === 'Todas as funções' ? '' : label;
      return `<button type="button" class="btn btn-sm ${selectedFunction === value ? 'btn-primary' : 'btn-outline'}" data-contact-function="${extraText(value)}">${extraText(label)}</button>`;
    }).join('');
    document.getElementById('contacts-results').textContent = `${filtered.length} contato${filtered.length === 1 ? '' : 's'}`;
    document.getElementById('contacts-grid').innerHTML = filtered.length ? filtered.map(record => `
      <article class="card contact-card"><div class="contact-avatar">${extraText(record.name.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase())}</div><div class="contact-copy"><h3>${extraText(record.name)}</h3><p>${record.functions.map(extraText).join(' · ')}</p>${record.kind === 'staff' && record.email ? `<p class="contact-email">${extraText(record.email)}</p>` : ''}<button type="button" class="btn btn-outline btn-sm" data-contact-profile="${extraText(record.id)}" data-contact-kind="${record.kind}">Ver perfil</button></div></article>`).join('') : '<div class="extra-empty">Nenhum contato encontrado.</div>';
  };
  document.getElementById('contacts-search').addEventListener('input', event => { query = event.currentTarget.value.trim().toLowerCase(); render(); });
  document.getElementById('contact-filters').addEventListener('click', event => {
    const button = event.target.closest('[data-contact-function]');
    if (button) { selectedFunction = button.dataset.contactFunction; render(); }
  });
  document.getElementById('contacts-grid').addEventListener('click', event => {
    const button = event.target.closest('[data-contact-profile]');
    if (!button) return;
    if (button.dataset.contactKind === 'patient' && Router.can('seeClinicalData')) {
      Router.navigate('patient-detail', { patientId: Number(button.dataset.contactProfile) });
      return;
    }
    const person = records.find(record => String(record.id) === button.dataset.contactProfile);
    if (person) {
      const dialog = document.getElementById('contact-dialog');
      dialog.querySelector('[data-contact-dialog-name]').textContent = person.name;
      dialog.querySelector('[data-contact-dialog-role]').textContent = person.functions.join(' · ');
      dialog.querySelector('[data-contact-dialog-email]').textContent = person.email || 'E-mail não compartilhado';
      dialog.showModal();
    }
  });
  document.querySelectorAll('[data-contact-dialog-close]').forEach(button => button.addEventListener('click', () => document.getElementById('contact-dialog').close()));
  render();
}

function renderNotificationsPage() {
  const fixture = window.LAPIDAR_DEMO_DATA?.mensagens_notificacoes;
  if (!fixture || !Array.isArray(fixture.notificacoes)) throw new Error('As notificações da demonstração não estão disponíveis.');
  const key = `lapidar-notifications-${Router.getProfileId()}`;
  let items = extraReadArray(key, fixture.notificacoes);
  let query = '';
  let onlyUnread = false;
  let target = '';
  let page = 0;
  const pageSize = 6;
  const render = () => {
    items = extraReadArray(key, fixture.notificacoes);
    const filtered = items.filter(item =>
      (!onlyUnread || !item.lida) &&
      (!target || item.destino === target) &&
      `${item.titulo || ''} ${item.detalhe || ''} ${item.origem || ''} ${item.destino || ''}`.toLowerCase().includes(query));
    const unread = items.filter(item => !item.lida).length;
    document.getElementById('notifications-summary').innerHTML = `
      <article class="card extra-stat"><span>NÃO LIDAS</span><strong>${unread}</strong><small>Aguardando você</small></article>
      <article class="card extra-stat"><span>LIDAS</span><strong>${items.length - unread}</strong><small>Já vistas</small></article>
      <article class="card extra-stat"><span>TOTAL</span><strong>${items.length}</strong><small>No histórico</small></article>`;
    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
    page = Math.min(page, pageCount - 1);
    const shown = filtered.slice(page * pageSize, (page + 1) * pageSize);
    document.getElementById('notifications-list').innerHTML = shown.length ? shown.map(item => `
      <details class="card notification-card ${item.lida ? '' : 'unread'}" data-notification-id="${extraText(item.id)}">
        <summary><span class="notification-icon">${item.lida ? '◉' : '●'}</span><span><strong>${extraText(item.titulo || 'Notificação')}</strong><small>${item.lida ? '' : 'Nova · '}${extraText(extraDate(item.data || item.criadoEm))} · ${extraText(item.origem || 'Sistema')}</small></span></summary>
        <div class="notification-detail"><p>${extraText(item.detalhe || item.texto || '')}</p>${item.destino ? `<button type="button" class="btn btn-outline btn-sm" data-notification-open="${extraText(item.destino)}">Abrir ${extraText(item.destino)}</button>` : ''}</div>
      </details>`).join('') : '<div class="extra-empty"><strong>Nenhuma notificação por aqui</strong><p>Avisos de consultas, formulários, exames e atualizações aparecem nesta lista.</p></div>';
    document.getElementById('notifications-pagination').innerHTML = pageCount > 1 ? `<button type="button" class="btn btn-outline btn-sm" data-notification-page="-1" ${page === 0 ? 'disabled' : ''}>Anterior</button><span>Página ${page + 1} de ${pageCount}</span><button type="button" class="btn btn-outline btn-sm" data-notification-page="1" ${page >= pageCount - 1 ? 'disabled' : ''}>Próxima</button>` : '';
    document.getElementById('mark-all-notifications').disabled = unread === 0;
    document.querySelectorAll('[data-notification-id]').forEach(detail => detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      const item = items.find(record => String(record.id) === detail.dataset.notificationId);
      if (item && !item.lida) { item.lida = true; extraSaveArray(key, items); render(); }
    }));
  };
  document.getElementById('notifications-search').addEventListener('input', event => { query = event.currentTarget.value.trim().toLowerCase(); page = 0; render(); });
  document.getElementById('notifications-unread').addEventListener('click', event => { onlyUnread = !onlyUnread; page = 0; event.currentTarget.setAttribute('aria-pressed', String(onlyUnread)); render(); });
  document.getElementById('notifications-filters').addEventListener('click', event => {
    const button = event.target.closest('[data-notification-target]');
    if (button) { target = button.dataset.notificationTarget; page = 0; document.querySelectorAll('[data-notification-target]').forEach(item => { item.classList.toggle('btn-primary', item === button); item.classList.toggle('btn-outline', item !== button); }); render(); }
  });
  document.getElementById('notifications-pagination').addEventListener('click', event => {
    const button = event.target.closest('[data-notification-page]');
    if (button) { page += Number(button.dataset.notificationPage); render(); }
  });
  document.getElementById('mark-all-notifications').addEventListener('click', () => { items = items.map(item => ({ ...item, lida: true })); extraSaveArray(key, items); render(); });
  document.getElementById('notifications-list').addEventListener('click', event => {
    const button = event.target.closest('[data-notification-open]');
    if (!button) return;
    const destination = button.dataset.notificationOpen.toLowerCase();
    const page = destination.includes('diário') ? 'habits' : destination.includes('ficha') ? 'patient-detail' : destination.includes('form') ? 'forms' : 'consultations';
    Router.navigate(page);
  });
  render();
}
