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
  if (rect.width <= 0 || rect.height <= 0) return;
  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const color = opts.color || '#5B2333';
  const padding = { top:18, right:6, bottom:48, left:38 };
  const chartW = Math.max(0, W - padding.left - padding.right);
  const chartH = Math.max(0, H - padding.top - padding.bottom);
  const maxDataValue = Math.max(...data.map(d => d.value), 0);
  const maxVal = Math.max(10, Math.ceil(maxDataValue / 5) * 5);
  const average = opts.average ?? (data.reduce((sum, d) => sum + d.value, 0) / Math.max(data.length, 1));
  const slotW = data.length ? chartW / data.length : chartW;
  const barW = Math.min(28, slotW * .56);
  const hoveredIndex = Number.isInteger(opts.hoveredIndex) ? opts.hoveredIndex : -1;
  ctx.clearRect(0, 0, W, H);

  for (let value = 0; value <= maxVal; value += 5) {
    const y = padding.top + chartH - (value / maxVal) * chartH;
    ctx.beginPath();
    ctx.setLineDash(value === 0 ? [] : [4, 6]);
    ctx.strokeStyle = '#D8C7B9';
    ctx.lineWidth = 1;
    ctx.moveTo(padding.left, Math.round(y) + .5);
    ctx.lineTo(W - padding.right, Math.round(y) + .5);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#55484A';
    ctx.font = `500 13px Montserrat, sans-serif`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(value), padding.left - 8, y);
  }

  data.forEach((d, i) => {
    const centerX = padding.left + slotW * (i + .5);
    const x = centerX - barW / 2;
    const barH = Math.max(0, (d.value / maxVal) * chartH);
    const y = padding.top + chartH - barH;
    const isToday = d.isToday === true;
    const barColor = isToday ? '#C6A15B' : color;

    ctx.beginPath();
    ctx.roundRect(centerX - barW / 2, padding.top, barW, chartH, [barW / 2, barW / 2, 0, 0]);
    ctx.fillStyle = '#F2EBE4';
    ctx.fill();

    if (barH > 0) {
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [barW / 2, barW / 2, 0, 0]);
      ctx.fillStyle = barColor;
      ctx.fill();
    }

    ctx.fillStyle = isToday ? '#806123' : '#473A3F';
    ctx.font = `${isToday ? 700 : 600} 13px Montserrat, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(d.shortLabel || d.label.slice(0, 3), centerX, H - 26);
    ctx.fillStyle = '#78685A';
    ctx.font = `400 11px Montserrat, sans-serif`;
    ctx.fillText(d.dateLabel || '', centerX, H - 8);

    if (i === hoveredIndex) {
      ctx.fillStyle = barColor;
      ctx.font = `700 13px Montserrat, sans-serif`;
      ctx.fillText(String(d.value), centerX, Math.max(padding.top + 13, y - 8));
    }
  });
  const averageY = padding.top + chartH - (Math.min(average, maxVal) / maxVal) * chartH;
  ctx.beginPath();
  ctx.setLineDash([6, 5]);
  ctx.strokeStyle = '#A77E7F';
  ctx.lineWidth = 1.5;
  ctx.moveTo(padding.left, averageY);
  ctx.lineTo(W - padding.right, averageY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.textBaseline = 'alphabetic';
  canvas.__barChartLayout = { left:padding.left, slotW, count:data.length };
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
  if (W <= 16 || H <= 16) {
    ctx.clearRect(0, 0, W, H);
    return;
  }
  const cx = W / 2;
  const cy = H / 2;
  const outerR = Math.min(W, H) / 2 - 8;
  const innerR = outerR * 0.56;

  const total = data.reduce((s, d) => s + d.value, 0);
  if (total <= 0) {
    ctx.clearRect(0, 0, W, H);
    return;
  }
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
  ctx.fillStyle = '#FFFDF9';
  ctx.fill();

  // Center label
  const centerFontSize = Math.max(24, Math.min(44, innerR * 0.56));
  ctx.fillStyle = '#5B2333';
  ctx.font = `600 ${centerFontSize}px 'Playfair Display', serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(total, cx, cy - centerFontSize * 0.18);
  ctx.font = `600 ${Math.max(12, Math.min(15, centerFontSize * 0.38))}px Montserrat, sans-serif`;
  ctx.fillStyle = '#78685A';
  ctx.fillText('PACIENTES', cx, cy + centerFontSize * 0.48);
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
  const R  = Math.min(W, H) / 2 - 60;
  const n  = labels.length;
  const max = 10;

  ctx.clearRect(0, 0, W, H);

  const angle = (i) => (i / n) * 2 * Math.PI - Math.PI / 2;
  const px = (i, r) => cx + Math.cos(angle(i)) * r;
  const py = (i, r) => cy + Math.sin(angle(i)) * r;

  // Grid circles
  [2.5, 5, 7.5, 10].forEach(lvl => {
    const r = (lvl / max) * R;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      i === 0 ? ctx.moveTo(px(i, r), py(i, r))
              : ctx.lineTo(px(i, r), py(i, r));
    }
    ctx.closePath();
    ctx.strokeStyle = lvl === 10 ? '#DCCBBB' : '#E9DED4';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#75696A';
    ctx.font = '500 9px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(lvl).replace('.', ','), cx - r * .23, cy - r * .23);
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
    ctx.fillStyle = 'rgba(79,65,68,0.06)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(79,65,68,0.78)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
    prev.forEach((v, i) => {
      const r = (v / max) * R;
      ctx.beginPath();
      ctx.arc(px(i, r), py(i, r), 2.5, 0, 2 * Math.PI);
      ctx.fillStyle = '#4F4144';
      ctx.fill();
    });
  }

  // Current data polygon
  ctx.beginPath();
  values.forEach((v, i) => {
    const r = (v / max) * R;
    i === 0 ? ctx.moveTo(px(i, r), py(i, r))
            : ctx.lineTo(px(i, r), py(i, r));
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(91,35,51,0.15)';
  ctx.fill();
  ctx.strokeStyle = '#5B2333';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Data points
  values.forEach((v, i) => {
    const r = (v / max) * R;
    ctx.beginPath();
    ctx.arc(px(i, r), py(i, r), 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#5B2333';
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
    const labelLines = lbl.length > 13 && lbl.includes(' ') ? lbl.split(' ') : [lbl];
    ctx.textAlign = ax < cx - 10 ? 'right'
                  : ax > cx + 10 ? 'left'
                  : 'center';
    labelLines.forEach((line, lineIndex) => {
      ctx.fillText(line, ax, ay + (lineIndex - (labelLines.length - 1) / 2) * 12);
    });
  });
  ctx.textBaseline = 'alphabetic';
}

/**
 * Desenha uma sparkline (mini linha)
 * @param {HTMLCanvasElement} canvas
 * @param {number[]} values
 * @param {string} color
 */
function drawSparkline(canvas, values, color = '#5B2333') {
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
