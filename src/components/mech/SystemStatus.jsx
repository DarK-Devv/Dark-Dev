const TONES = {
  online: 'text-signal-bright',
  scanning: 'text-signal-bright',
  standby: 'text-steel/60',
  alert: 'text-alert-bright',
};

/**
 * Status-line readout: blinking indicator dot + label. Used in Loader
 * stages, Navbar, and Contact's shutdown sequence.
 */
export default function SystemStatus({ label = 'ONLINE', tone = 'online', className = '' }) {
  const color = TONES[tone] || TONES.online;
  const blinking = tone === 'scanning' || tone === 'alert';
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest ${color} ${className}`}>
      <span
        className={`w-1.5 h-1.5 rounded-full ${blinking ? 'animate-blink' : ''}`}
        style={{ background: 'currentColor', boxShadow: '0 0 6px currentColor' }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
