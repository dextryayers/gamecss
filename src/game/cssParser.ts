function delta(dx: number, dy: number, rotation: number, scale: number, transitionTime: number) {
  return { dx, dy, scale, rotation, transitionTime };
}

function getNums(str: string): number[] {
  return [...str.matchAll(/(-?\d+(?:\.\d+)?)/g)].map(m => parseFloat(m[1]));
}

function marginPadDelta(vals: number[]): { dx: number; dy: number } {
  if (vals.length === 0) return { dx: 0, dy: 0 };
  const [a, b, c, d] = [vals[0], vals[1] ?? vals[0], vals[2] ?? vals[0], vals[3] ?? vals[1] ?? vals[0]];
  return {
    dy: a / 100 - c / 100,
    dx: d / 100 - b / 100,
  };
}

export function parseCSS(cssCode: string) {
  const clean = cssCode.replace(/\/\*[\s\S]*?\*\//g, '');

  let dx = 0, dy = 0, scale = 1, rotation = 0, transitionTime = 400;

  // Cari semua "properti: nilai" — tanpa peduli baris/braces/koma
  const re = /([\w-]+)\s*:\s*([^;{}]+?)\s*(?:[;}]|$)/gi;
  let m;
  while ((m = re.exec(clean)) !== null) {
    const prop = m[1].trim().toLowerCase();
    const valueStr = m[2].trim();
    if (!prop || !valueStr) continue;

    // Skip non-movement properties (opt-out, biar gak perlu list semua)
    if (['margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right',
         'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
         'top', 'bottom', 'left', 'right',
         'transform', 'translate-x', 'translate-y', 'translate', 'translateX', 'translateY',
         'transition'].indexOf(prop) === -1) continue;

    // ─── margin / padding (multi-value) ───
    if (prop === 'margin' || prop === 'padding') {
      const vals = getNums(valueStr);
      if (vals.length === 1) {
        dy += vals[0] / 100;       // treat as margin-top
      } else if (vals.length > 2) {
        const d = marginPadDelta(vals);
        dx += d.dx; dy += d.dy;
      }
      // 2-value = net 0, skip
      continue;
    }

    // ─── individual margin/padding sides ───
    if (prop === 'margin-top' || prop === 'padding-top') {
      const v = getNums(valueStr)[0]; if (v) dy += v / 100;
    } else if (prop === 'margin-bottom' || prop === 'padding-bottom') {
      const v = getNums(valueStr)[0]; if (v) dy -= v / 100;
    } else if (prop === 'margin-left' || prop === 'padding-left') {
      const v = getNums(valueStr)[0]; if (v) dx += v / 100;
    } else if (prop === 'margin-right' || prop === 'padding-right') {
      const v = getNums(valueStr)[0]; if (v) dx -= v / 100;

    // ─── top / bottom / left / right ───
    } else if (prop === 'top')    { const v = getNums(valueStr)[0]; if (v) dy += v / 100; }
    else if (prop === 'bottom')   { const v = getNums(valueStr)[0]; if (v) dy -= v / 100; }
    else if (prop === 'left')     { const v = getNums(valueStr)[0]; if (v) dx += v / 100; }
    else if (prop === 'right')    { const v = getNums(valueStr)[0]; if (v) dx -= v / 100; }

    // ─── transform ───
    else if (prop === 'transform') {
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

    // ─── standalone translateX / translateY ───
    else if (/^(?:translateX|translate-x)$/i.test(prop)) {
      const v = getNums(valueStr)[0]; if (v) dx += v / 100;
    } else if (/^(?:translateY|translate-y)$/i.test(prop)) {
      const v = getNums(valueStr)[0]; if (v) dy += v / 100;
    }

    // ─── transition ───
    else if (prop === 'transition') {
      const ms = valueStr.match(/(\d+)\s*ms/);
      if (ms) transitionTime = parseInt(ms[1], 10);
      else {
        const s = valueStr.match(/(\d+(?:\.\d+)?)\s*s/);
        if (s) transitionTime = parseFloat(s[1]) * 1000;
      }
    }
  }

  return delta(dx, dy, rotation, scale, transitionTime);
}
