/* Enhancements shared by prototype pages; demo-only, no backend integration. */
(function () {
  'use strict';
  const digits = value => (value || '').replace(/\D/g, '');
  function formatCPF(value) {
    const d = digits(value).slice(0, 11);
    return d.replace(/(\d{3})(\d)/, '$1-$2').replace(/(\d{3})(\d)/, '$1-$2').replace(/(\d{3})(\d{1,2})$/, '$1.$2');
  }
  function formatPhone(value) {
    const d = digits(value).slice(0, 11);
    if (d.length <= 2) return d ? '(' + d : '';
    if (d.length <= 2) return d ? '(' + d : '';
    if (d.length <= 3) return '(' + d.slice(0,2) + ') ' + d.slice(2);
    if (d.length <= 7) return '(' + d.slice(0,2) + ') ' + d.slice(2);
    return '(' + d.slice(0,2) + ') ' + d.slice(2,3) + ' ' + d.slice(3,7) + '-' + d.slice(7);
  }
  function bindMask(input, kind) {
    if (input.dataset.parityMaskBound) return;
    input.dataset.parityMaskBound = '1';
    input.addEventListener('input', () => {
      const start = input.selectionStart;
      const old = input.value;
      const next = kind === 'cpf' ? formatCPF(old) : kind === 'phone' ? formatPhone(old) : old.replace(/[^\d,.-]/g, '').replace('.', ',');
      if (next !== old) {
        input.value = next;
        try { const delta = next.length - old.length; input.setSelectionRange(Math.max(0, (start || next.length) + delta), Math.max(0, (start || next.length) + delta)); } catch (_) {}
      }
    });
    input.setAttribute('inputmode', kind === 'weight' ? 'decimal' : 'numeric');
  }
  function enhanceFields() {
    document.querySelectorAll('input,textarea').forEach(input => {
      const meta = [input.name, input.id, input.placeholder, input.getAttribute('aria-label'), input.labels && Array.from(input.labels).map(l => l.textContent).join(' ')].filter(Boolean).join(' ').toLowerCase();
      if (/\bcpf\b/.test(meta)) bindMask(input, 'cpf');
      else if (/telefone|celular|phone/.test(meta)) bindMask(input, 'phone');
      else if (/peso/.test(meta) && input.type !== 'hidden') bindMask(input, 'weight');
      if (!input.getAttribute('aria-label') && !input.labels?.length && input.placeholder) input.setAttribute('aria-label', input.placeholder);
    });
    document.querySelectorAll('[title]').forEach(el => { if (!el.getAttribute('aria-label') && el.matches('button,a')) el.setAttribute('aria-label', el.getAttribute('title')); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhanceFields);
  else enhanceFields();
  // Re-apply to dynamically rendered modal forms without polling/timers.
  const observer = new MutationObserver(records => { if (records.some(r => r.addedNodes.length)) enhanceFields(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
