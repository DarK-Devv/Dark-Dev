/**
 * Original abstract glyph system — small angular marks used decoratively
 * across nav, panels, section markers, and HUD readouts. Built from raw
 * geometric primitives (no existing alphabet, iconography, or franchise
 * marks referenced). Each variant is a self-contained 24x24 viewBox.
 */
const GLYPHS = {
  a1: <path d="M12 2 L20 8 L17 20 L7 20 L4 8 Z M12 2 L12 8 M4 8 L20 8" />,
  a2: <path d="M4 4 L14 4 L14 10 L20 10 L20 20 L10 20 L10 14 L4 14 Z" />,
  a3: <path d="M12 3 L21 12 L12 21 L3 12 Z M12 8 L16 12 L12 16 L8 12 Z" />,
  a4: <path d="M3 12 L11 4 L11 10 L21 10 M21 12 L13 20 L13 14 L3 14" />,
  a5: <path d="M4 4 L20 4 M4 4 L4 20 M4 20 L20 20 M16 12 L20 12 M16 12 L16 20" />,
  a6: <path d="M12 2 L12 22 M6 6 L18 6 M8 12 L16 12 M6 18 L18 18" />,
  a7: <path d="M6 3 L18 3 L21 12 L18 21 L6 21 L3 12 Z M9 12 L15 12" />,
  a8: <path d="M12 4 L12 20 M4 8 L20 8 L20 16 L4 16 M4 8 L4 16" />,
  a9: <path d="M3 6 L11 6 L11 18 L3 18 M13 6 L21 6 L17 18 Z" />,
  a10: <path d="M12 2 L18 6 L18 14 L12 22 L6 14 L6 6 Z M6 6 L18 14 M18 6 L6 14" />,
  a11: <path d="M4 20 L4 4 L20 4 M20 8 L12 8 L12 20 M16 12 L16 20" />,
  a12: <path d="M12 3 L12 9 M5 12 L19 12 M12 15 L12 21 M8 6 L16 6 M8 18 L16 18" />,
};

const KEYS = Object.keys(GLYPHS);

export default function AlienGlyph({ variant = 'a1', size = 16, className = '', style, title }) {
  const key = GLYPHS[variant] ? variant : KEYS[0];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {GLYPHS[key]}
    </svg>
  );
}

