(function () {
  const svg = document.getElementById('footer-node-svg');
  if (!svg) return;

  const NS = 'http://www.w3.org/2000/svg';
  const CX = 150;
  const CY = 150;
  const NODE_COUNT = 14;

  const PALETTE = ['#06B6D4', '#06B6D4', '#06B6D4', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.7)', 'rgba(99,102,241,0.6)', 'rgba(99,102,241,0.6)', 'rgba(99,102,241,0.6)', '#06B6D4', 'rgba(255,255,255,0.7)', 'rgba(99,102,241,0.6)', '#06B6D4', 'rgba(255,255,255,0.7)'];

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  const satellites = Array.from({ length: NODE_COUNT }, function (_, i) {
    const angle = (i / NODE_COUNT) * Math.PI * 2 + rand(-0.2, 0.2);
    const dist = rand(80, 130);
    return {
      baseX: CX + Math.cos(angle) * dist,
      baseY: CY + Math.sin(angle) * dist,
      r: rand(5, 10),
      color: PALETTE[i],
      ampX: rand(12, 20),
      ampY: rand(12, 20),
      period: rand(3000, 6000),
      phase: rand(0, Math.PI * 2),
      phaseY: rand(0, Math.PI * 2),
    };
  });

  const centralEl = document.createElementNS(NS, 'circle');
  centralEl.setAttribute('cx', CX);
  centralEl.setAttribute('cy', CY);
  centralEl.setAttribute('r', 36);
  centralEl.setAttribute('fill', '#6366F1');
  centralEl.classList.add('footer-central-node');
  svg.appendChild(centralEl);

  const paths = satellites.map(function () {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'rgba(255,255,255,0.15)');
    p.setAttribute('stroke-width', '1.2');
    svg.appendChild(p);
    return p;
  });

  const circles = satellites.map(function (s) {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('r', s.r);
    c.setAttribute('fill', s.color);
    c.style.transition = 'transform 0.2s ease, filter 0.2s ease';
    c.style.transformBox = 'fill-box';
    c.style.transformOrigin = 'center';
    c.style.cursor = 'pointer';

    c.addEventListener('mouseenter', function () {
      c.style.transform = 'scale(1.4)';
      c.style.filter = 'brightness(1.6)';
    });

    c.addEventListener('mouseleave', function () {
      c.style.transform = 'scale(1)';
      c.style.filter = 'brightness(1)';
    });

    svg.appendChild(c);
    return c;
  });

  function tick(now) {
    satellites.forEach(function (s, i) {
      const t = now / s.period;
      const x = s.baseX + Math.cos(t * Math.PI * 2 + s.phase) * s.ampX;
      const y = s.baseY + Math.sin(t * Math.PI * 2 + s.phaseY) * s.ampY;

      circles[i].setAttribute('cx', x);
      circles[i].setAttribute('cy', y);

      const dx = x - CX;
      const dy = y - CY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const cp1x = CX + dx * 0.35 + (-dy / dist) * rand(20, 40);
      const cp1y = CY + dy * 0.35 + (dx / dist) * rand(20, 40);
      const cp2x = x - dx * 0.25 + (-dy / dist) * rand(10, 30);
      const cp2y = y - dy * 0.25 + (dx / dist) * rand(10, 30);

      paths[i].setAttribute('d', `M ${CX} ${CY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`);
    });

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
