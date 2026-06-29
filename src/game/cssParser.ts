function getNums(str: string): number[] {
  return [...str.matchAll(/(-?\d+(?:\.\d+)?)/g)].map(m => parseFloat(m[1]));
}

function marginPadDelta(vals: number[]): { dx: number; dy: number } {
  if (vals.length === 0) return { dx: 0, dy: 0 };
  const [a, b, c, d] = [vals[0], vals[1] ?? vals[0], vals[2] ?? vals[0], vals[3] ?? vals[1] ?? vals[0]];
  // top = a, right = b, bottom = c, left = d
  return {
    dy: a / 100 - c / 100,
    dx: d / 100 - b / 100,
  };
}

export function parseCSS(cssCode: string) {
  const clean = cssCode.replace(/\/\*[\s\S]*?\*\//g, '');
  const lines = clean.split(/[;\n]/);

  let dx = 0, dy = 0, scale = 1, rotation = 0, transitionTime = 400;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line === '}' || line === '{') continue;

    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const prop = line.slice(0, colonIdx).trim().toLowerCase();
    const valueStr = line.slice(colonIdx + 1).trim();
    if (!prop || !valueStr) continue;

    // ── margin / padding (multi-value shorthand) ──
    if (prop === 'margin' || prop === 'padding') {
      const vals = getNums(valueStr);
      if (vals.length === 1) {
        // 1-value: treat like margin-top (dy+) — user-friendly
        dy += vals[0] / 100;
      } else if (vals.length === 2) {
        // top/bottom = a, left/right = b → net 0
        // do nothing
      } else {
        const d = marginPadDelta(vals);
        dx += d.dx;
        dy += d.dy;
      }
      continue;
    }

    // ── individual margin/padding sides ──
    if (prop === 'margin-top' || prop === 'padding-top') {
      const v = getNums(valueStr)[0];
      if (v) dy += v / 100;
    } else if (prop === 'margin-bottom' || prop === 'padding-bottom') {
      const v = getNums(valueStr)[0];
      if (v) dy -= v / 100;
    } else if (prop === 'margin-left' || prop === 'padding-left') {
      const v = getNums(valueStr)[0];
      if (v) dx += v / 100;
    } else if (prop === 'margin-right' || prop === 'padding-right') {
      const v = getNums(valueStr)[0];
      if (v) dx -= v / 100;

    // ── top / bottom / left / right ──
    } else if (prop === 'top') {
      const v = getNums(valueStr)[0];
      if (v) dy += v / 100;
    } else if (prop === 'bottom') {
      const v = getNums(valueStr)[0];
      if (v) dy -= v / 100;
    } else if (prop === 'left') {
      const v = getNums(valueStr)[0];
      if (v) dx += v / 100;
    } else if (prop === 'right') {
      const v = getNums(valueStr)[0];
      if (v) dx -= v / 100;

    // ── transition ──
    } else if (prop === 'transition') {
      const ms = valueStr.match(/(\d+)\s*ms/);
      if (ms) transitionTime = parseInt(ms[1], 10);
      else {
        const s = valueStr.match(/(\d+(?:\.\d+)?)\s*s/);
        if (s) transitionTime = parseFloat(s[1]) * 1000;
      }

    // ── transform ──
    } else if (prop === 'transform') {
      const tx = valueStr.match(/translateX\s*\(\s*(-?\d+(?:\.\d+)?)\s*(?:px)?\s*\)/i);
      if (tx) dx += parseFloat(tx[1]) / 100;
      const ty = valueStr.match(/translateY\s*\(\s*(-?\d+(?:\.\d+)?)\s*(?:px)?\s*\)/i);
      if (ty) dy += parseFloat(ty[1]) / 100;
      const txy = valueStr.match(/translate\s*\(\s*(-?\d+(?:\.\d+)?)\s*(?:px)?\s*,\s*(-?\d+(?:\.\d+)?)\s*(?:px)?\s*\)/i);
      if (txy) { dx += parseFloat(txy[1]) / 100; dy += parseFloat(txy[2]) / 100; }
      const sc = valueStr.match(/scale\s*\(\s*([0-9.]+)\s*\)/i);
      if (sc) scale = parseFloat(sc[1]);
      const rot = valueStr.match(/rotate\s*\(\s*(-?\d+)\s*deg\s*\)/i);
      if (rot) rotation = parseInt(rot[1], 10);
    }
  }

  return { dx, dy, scale, rotation, transitionTime };
}
