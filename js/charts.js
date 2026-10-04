/* ============================================================
   LAPIDAR — Gráficos com Canvas 2D API
   ============================================================ */

/**
 * Desenha um gráfico de barras verticais
 * @param {HTMLCanvasElement} canvas
 * @param {Array<{label:string, value:number}>} data
 * @param {Object} opts
 */
function drawBarChart(canvas, data, opts = {}) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const color   = opts.color   || '#591B1C';
  const padding = { top: 16, right: 8, bottom: 32, left: 32 };

  const chartW = W - padding.left - padding.right;
  const chartH = H - padding.top  - padding.bottom;

  const maxVal = Math.max(...data.map(d => d.value), 1);
  const barW   = (chartW / data.length) * 0.6;
  const gap    = (chartW / data.length) * 0.4;

  ctx.clearRect(0, 0, W, H);

  // Grid lines
  const gridLines = 4;
  ctx.strokeStyle = '#E3D8C8';
  ctx.lineWidth = 1;
  for (let i = 0; i <= gridLines; i++) {
    const y = padding.top + (chartH / gridLines) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + chartW, y);
    ctx.stroke();

    // Y labels
    const val = Math.round(maxVal - (maxVal / gridLines) * i);
    ctx.fillStyle = '#78685A';
    ctx.font = `500 11px Montserrat, sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText(val, padding.left - 4, y + 4);
  }

  data.forEach((d, i) => {
    const x = padding.left + i * (chartW / data.length) + gap / 2;
    const barH = (d.value / maxVal) * chartH;
    const y = padding.top + chartH - barH;

    // Bar with gradient
    const grad = ctx.createLinearGradient(0, y, 0, y + barH);
    grad.addColorStop(0, color);
    grad.addColorStop(1, color + '99');

    ctx.beginPath();
    ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
    ctx.fillStyle = grad;
    ctx.fill();

    // X label
    ctx.fillStyle = '#78685A';
    ctx.font = `500 12px Montserrat, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(d.label, x + barW / 2, H - padding.bottom + 14);

    // Value on top
    ctx.fillStyle = color;
    ctx.font = `600 12px Montserrat, sans-serif`;
    ctx.fillText(d.value, x + barW / 2, y - 4);
  });
}

/**
 * Desenha um gráfico de rosca (donut)
 * @param {HTMLCanvasElement} canvas
 * @param {Array<{label:string, value:number, color:string}>} data
 */
function drawDonutChart(canvas, data) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const cx = W / 2;
  const cy = H / 2;
  const outerR = Math.min(W, H) / 2 - 8;
  const innerR = outerR * 0.56;

  const total = data.reduce((s, d) => s + d.value, 0);
  let startAngle = -Math.PI / 2;
  const gapAngle = 0.025;

  ctx.clearRect(0, 0, W, H);

  data.forEach((d, i) => {
    const slice = (d.value / total) * 2 * Math.PI;
    const sliceStart = startAngle + gapAngle / 2;
    const sliceEnd = startAngle + slice - gapAngle / 2;

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, sliceStart, sliceEnd);
    ctx.arc(cx, cy, innerR, sliceEnd, sliceStart, true);
    ctx.closePath();
    ctx.fillStyle = d.color;
    ctx.fill();

    startAngle += slice;
  });

  // Donut hole
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, 2 * Math.PI);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  // Center label
  ctx.fillStyle = '#591B1C';
  ctx.font = `600 20px 'Playfair Display', serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(total, cx, cy - 6);
  ctx.font = `400 12px Montserrat, sans-serif`;
  ctx.fillStyle = '#78685A';
  ctx.fillText('pacientes', cx, cy + 10);
  ctx.textBaseline = 'alphabetic';
}

/**
 * Desenha um gráfico radar
 * @param {HTMLCanvasElement} canvas
 * @param {string[]} labels
 * @param {number[]} values   - 0 a 10
 * @param {number[]} [prev]   - valores anteriores (opcional)
 */
function drawRadarChart(canvas, labels, values, prev = null) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const cx = W / 2;
  const cy = H / 2;
  const R  = Math.min(W, H) / 2 - 28;
  const n  = labels.length;
  const max = 10;

  ctx.clearRect(0, 0, W, H);

  const angle = (i) => (i / n) * 2 * Math.PI - Math.PI / 2;
  const px = (i, r) => cx + Math.cos(angle(i)) * r;
  const py = (i, r) => cy + Math.sin(angle(i)) * r;

  // Grid circles
  [2, 4, 6, 8, 10].forEach(lvl => {
    const r = (lvl / max) * R;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      i === 0 ? ctx.moveTo(px(i, r), py(i, r))
              : ctx.lineTo(px(i, r), py(i, r));
    }
    ctx.closePath();
    ctx.strokeStyle = lvl === 10 ? '#E8E0D0' : '#F0EAE0';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Spokes
  for (let i = 0; i < n; i++) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px(i, R), py(i, R));
    ctx.strokeStyle = '#E8E0D0';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Previous data polygon
  if (prev) {
    ctx.beginPath();
    prev.forEach((v, i) => {
      const r = (v / max) * R;
      i === 0 ? ctx.moveTo(px(i, r), py(i, r))
              : ctx.lineTo(px(i, r), py(i, r));
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(198,161,91,0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(198,161,91,0.5)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Current data polygon
  ctx.beginPath();
  values.forEach((v, i) => {
    const r = (v / max) * R;
    i === 0 ? ctx.moveTo(px(i, r), py(i, r))
            : ctx.lineTo(px(i, r), py(i, r));
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(89,27,28,0.15)';
  ctx.fill();
  ctx.strokeStyle = '#591B1C';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Data points
  values.forEach((v, i) => {
    const r = (v / max) * R;
    ctx.beginPath();
    ctx.arc(px(i, r), py(i, r), 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#591B1C';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Labels
  ctx.fillStyle = '#5F4B42';
  ctx.font = `500 11px Montserrat, sans-serif`;
  ctx.textBaseline = 'middle';
  labels.forEach((lbl, i) => {
    const r = R + 14;
    const ax = px(i, r);
    const ay = py(i, r);
    ctx.textAlign = ax < cx - 10 ? 'right'
                  : ax > cx + 10 ? 'left'
                  : 'center';
    ctx.fillText(lbl, ax, ay);
  });
  ctx.textBaseline = 'alphabetic';
}

/**
 * Desenha uma sparkline (mini linha)
 * @param {HTMLCanvasElement} canvas
 * @param {number[]} values
 * @param {string} color
 */
function drawSparkline(canvas, values, color = '#591B1C') {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const pad = 4;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const px = (i) => pad + (i / (values.length - 1)) * (W - pad * 2);
  const py = (v) => H - pad - ((v - min) / range) * (H - pad * 2);

  ctx.clearRect(0, 0, W, H);

  // Fill gradient
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, color + '33');
  grad.addColorStop(1, color + '00');

  ctx.beginPath();
  ctx.moveTo(px(0), py(values[0]));
  values.forEach((v, i) => { if (i > 0) ctx.lineTo(px(i), py(v)); });
  ctx.lineTo(px(values.length - 1), H);
  ctx.lineTo(px(0), H);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(px(0), py(values[0]));
  values.forEach((v, i) => { if (i > 0) ctx.lineTo(px(i), py(v)); });
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Last point dot
  const lx = px(values.length - 1);
  const ly = py(values[values.length - 1]);
  ctx.beginPath();
  ctx.arc(lx, ly, 3, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

/**
 * Aguarda o canvas estar visível e o desenha
 */
function renderWhenVisible(canvas, drawFn) {
  if (!canvas) return;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      drawFn();
      obs.disconnect();
    }
  });
  obs.observe(canvas);
  // Fallback imediato se já visível
  requestAnimationFrame(drawFn);
}
