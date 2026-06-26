const GLYPHS = '!<>-_\\/[]{}=+*^?#01';

/**
 * Decode `el` to `finalText` with a left-to-right scramble. Best on monospace
 * text so width stays stable. Returns a cleanup fn.
 */
export function scramble(el, finalText, { duration = 900, delay = 0 } = {}) {
  if (!el) return () => {};
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    el.textContent = finalText;
    return () => {};
  }

  const len = finalText.length;
  let raf = 0;
  let start = null;

  function run(ts) {
    if (start === null) start = ts;
    const t = ts - start - delay;
    if (t < 0) {
      raf = requestAnimationFrame(run);
      return;
    }
    const p = Math.min(1, t / duration);
    const revealed = p * len * 1.3;
    let out = '';
    for (let i = 0; i < len; i++) {
      const ch = finalText[i];
      if (ch === ' ') { out += ' '; continue; }
      if (i < revealed - 1) out += ch;
      else if (i < revealed) out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) raf = requestAnimationFrame(run);
    else el.textContent = finalText;
  }

  raf = requestAnimationFrame(run);
  return () => cancelAnimationFrame(raf);
}
