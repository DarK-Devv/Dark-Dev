import { useEffect, useRef, useState } from 'react';
import './TargetCursor.css';

/**
 * Desktop-only reticle cursor: a subtle "+" mark that becomes a glyph over
 * interactive elements ([data-cursor="glyph"]) and a "TARGET LOCK" readout
 * over project/system elements ([data-cursor="lock"]). Gated on fine
 * pointers so it never mounts on touch. rAF-throttled, direct style writes
 * (no React state per pointer move) to stay cheap.
 */
export default function TargetCursor() {
  const rootRef = useRef(null);
  // resolved once at first render (client-only app, no SSR)
  const [enabled] = useState(() => window.matchMedia('(pointer: fine)').matches);
  const [mode, setMode] = useState('default'); // 'default' | 'glyph' | 'lock'

  useEffect(() => {
    if (!enabled) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pos = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (reduce) {
        pos.x = target.x;
        pos.y = target.y;
        applyTransform();
      }
    };

    function applyTransform() {
      if (rootRef.current) {
        rootRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }
    }

    function loop() {
      pos.x += (target.x - pos.x) * 0.35;
      pos.y += (target.y - pos.y) * 0.35;
      applyTransform();
      raf = requestAnimationFrame(loop);
    }
    if (!reduce) raf = requestAnimationFrame(loop);

    const onOver = (e) => {
      const el = e.target.closest('[data-cursor]');
      setMode(el ? el.getAttribute('data-cursor') : 'default');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={`tcursor ${mode === 'lock' ? 'is-lock' : ''}`} ref={rootRef} aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 22 22" className="tcursor__mark">
        {mode === 'glyph' ? (
          <path d="M11 3 L17 7 L15 17 L7 17 L5 7 Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
        ) : (
          <path d="M11 2 L11 8 M11 14 L11 20 M2 11 L8 11 M14 11 L20 11" stroke="currentColor" strokeWidth="1.3" />
        )}
      </svg>
      <span className="tcursor__lock">TARGET LOCK</span>
    </div>
  );
}
