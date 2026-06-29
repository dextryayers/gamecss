const val = (s: string | undefined) => {
  if (!s) return 0;
  return parseInt(s, 10);
};

export function parseCSS(cssCode: string) {
  const code = cssCode.replace(/\/\*[\s\S]*?\*\//g, '').trim();

  let dx = 0;
  let dy = 0;
  let scale = 1;
  let rotation = 0;
  let transitionTime = 400;

  // -------------------------------------------------------
  // 1. SHORTHAND: margin / padding (1, 2, 3, 4 values)
  //    Each value may have optional `px` (hail Mary for `0`)
  //    px-less numbers are matched as is.  The pattern demands
  //    at least one digit so `0` alone is matched.
  // -------------------------------------------------------
  const v4 = /(margin|padding)\s*:\s*(-?\d+)(?:px)?\s+(-?\d+)(?:px)?\s+(-?\d+)(?:px)?\s+(-?\d+)(?:px)?\s*;?/gi;
  const v3 = /(margin|padding)\s*:\s*(-?\d+)(?:px)?\s+(-?\d+)(?:px)?\s+(-?\d+)(?:px)?(?:\s*;|[^-\d])/gi;
  const v2 = /(margin|padding)\s*:\s*(-?\d+)(?:px)?\s+(-?\d+)(?:px)?(?:\s*;|[^-\d])/gi;
  const v1 = /(margin|padding)\s*:\s*(-?\d+)(?:px)?\s*;?/gi;

  // 4-value: top right bottom left → dy += top, dx -= right, dy -= bottom, dx += left
  let m;
  while ((m = v4.exec(code)) !== null) {
    const prop = m[1].toLowerCase();
    const [t, r, b, l] = [val(m[2]), val(m[3]), val(m[4]), val(m[5])];
    if (prop === 'margin' || prop === 'padding') {
      dy += t / 100; dx -= r / 100; dy -= b / 100; dx += l / 100;
    }
  }

  // 3-value: top left/right bottom → dy += top, dx -= left/right, dx += left/right, dy -= bottom
  while ((m = v3.exec(code)) !== null) {
    const prop = m[1].toLowerCase();
    const [t, x, b] = [val(m[2]), val(m[3]), val(m[4])];
    if (prop === 'margin' || prop === 'padding') {
      dy += t / 100; dx -= x / 100; dx += x / 100; dy -= b / 100;
    }
  }

  // 2-value: top/bottom left/right → dy += top, dy -= bottom, dx -= left/right, dx += left/right
  while ((m = v2.exec(code)) !== null) {
    const prop = m[1].toLowerCase();
    const [y, x] = [val(m[2]), val(m[3])];
    if (prop === 'margin' || prop === 'padding') {
      dy += y / 100; dy -= y / 100; dx -= x / 100; dx += x / 100;
    }
  }

  // 1-value: all sides → cancels to zero net (unless we special-case it)
  // Actually we just eat it so it can't be double-parsed by the individual rule below.
  while ((m = v1.exec(code)) !== null) {
    /* already handled by more specific matchers above */
  }

  // -------------------------------------------------------
  // 2. INDIVIDUAL margin-* / padding-* properties
  //    px is optional.  Values are always single numbers.
  // -------------------------------------------------------
  const marginPadRe = /(margin|padding)-(top|bottom|left|right)\s*:\s*(-?\d+)(?:px)?\s*;?/gi;
  while ((m = marginPadRe.exec(code)) !== null) {
    const [prop, dir] = [m[1].toLowerCase(), m[2].toLowerCase()];
    const v = val(m[3]) / 100;
    if (prop === 'margin' || prop === 'padding') {
      if (dir === 'top')    dy += v;
      if (dir === 'bottom') dy -= v;
      if (dir === 'left')   dx += v;
      if (dir === 'right')  dx -= v;
    }
  }

  // -------------------------------------------------------
  // 3. top / bottom / left / right (standalone, NOT margin‑top etc.)
  //    Use negative lookbehind to avoid matching inside margin‑top etc.
  // -------------------------------------------------------
  // Need individual regex because lookbehind syntax varies
  const reTop = /(?<![\w-])\btop\b\s*:\s*(-?\d+)(?:px)?\s*;?/gi;
  while ((m = reTop.exec(code)) !== null) dy += val(m[1]) / 100;

  const reBottom = /(?<![\w-])\bbottom\b\s*:\s*(-?\d+)(?:px)?\s*;?/gi;
  while ((m = reBottom.exec(code)) !== null) dy -= val(m[1]) / 100;

  const reLeft = /(?<![\w-])\bleft\b\s*:\s*(-?\d+)(?:px)?\s*;?/gi;
  while ((m = reLeft.exec(code)) !== null) dx += val(m[1]) / 100;

  const reRight = /(?<![\w-])\bright\b\s*:\s*(-?\d+)(?:px)?\s*;?/gi;
  while ((m = reRight.exec(code)) !== null) dx -= val(m[1]) / 100;

  // -------------------------------------------------------
  // 4. TRANSFORM (single‑line, inside `transform:` or standalone)
  // -------------------------------------------------------
  const parseTransform = (re: RegExp, isScale = false) => {
    const t = code.match(re);
    if (t) return isScale ? parseFloat(t[1]) : parseInt(t[1], 10);
    return null;
  };

  // Inside `transform: ...` property
  const transBlock = code.match(/transform\s*:\s*([^;}]+)/i);
  if (transBlock) {
    const block = transBlock[1];
    const tx = block.match(/translateX\s*\(\s*(-?\d+)(?:px)?\s*\)/i);
    if (tx) dx += parseInt(tx[1], 10) / 100;
    const ty = block.match(/translateY\s*\(\s*(-?\d+)(?:px)?\s*\)/i);
    if (ty) dy += parseInt(ty[1], 10) / 100;
    const txy = block.match(/translate\s*\(\s*(-?\d+)(?:px)?\s*,\s*(-?\d+)(?:px)?\s*\)/i);
    if (txy) { dx += parseInt(txy[1], 10) / 100; dy += parseInt(txy[2], 10) / 100; }
    const sc = block.match(/scale\s*\(\s*([0-9.]+)\s*\)/i);
    if (sc) scale = parseFloat(sc[1]);
    const rot = block.match(/rotate\s*\(\s*(-?\d+)\s*deg\s*\)/i);
    if (rot) rotation = parseInt(rot[1], 10);
  }

  // Standalone translateX/translateY (outside of transform property)
  const stx = code.match(/(?:^|[\s;{])translateX\s*\(\s*(-?\d+)(?:px)?\s*\)/i);
  if (stx) dx += parseInt(stx[1], 10) / 100;
  const sty = code.match(/(?:^|[\s;{])translateY\s*\(\s*(-?\d+)(?:px)?\s*\)/i);
  if (sty) dy += parseInt(sty[1], 10) / 100;

  // -------------------------------------------------------
  // 5. TRANSITION
  // -------------------------------------------------------
  const transMs = code.match(/transition\s*:.*?(\d+)\s*ms/i);
  if (transMs) transitionTime = parseInt(transMs[1], 10);
  else {
    const transS = code.match(/transition\s*:.*?(\d+(?:\.\d+)?)\s*s/i);
    if (transS) transitionTime = parseFloat(transS[1]) * 1000;
  }

  return { dx, dy, scale, rotation, transitionTime };
}
