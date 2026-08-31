/**
 * Small decorative mono-font readout block (sector / core-temp / sync%).
 * Purely flavor — never carries meaning that would need a screen reader.
 */
export default function SystemHUD({ items = [], className = '' }) {
  if (!items.length) return null;
  return (
    <div className={`flex flex-col gap-1 font-mono text-[10px] tracking-widest uppercase text-steel/50 ${className}`} aria-hidden="true">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-2">
          <span className="text-signal-bright/60">{it.label}</span>
          <span className="text-steel/70">{it.value}</span>
        </div>
      ))}
    </div>
  );
}
