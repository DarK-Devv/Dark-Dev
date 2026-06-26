export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const lerp = (a, b, t) => a + (b - a) * t;

export function pad(n, len = 2) {
  return Math.max(0, Math.floor(n)).toString().padStart(len, '0');
}

/** progress [0..1] -> "uptime" clock "HH:MM:SS" across a virtual session */
const SESSION_SECONDS = 3600; // the runtime "uptime" we scrub through
export function toUptime(p) {
  const s = clamp(p) * SESSION_SECONDS;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}

/** deterministic pseudo-random in [0,1) from an integer seed */
export function rand(seed) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** hex memory-address-style string for a progress value */
export function toHexAddr(p) {
  const v = Math.floor(clamp(p) * 0xffffff);
  return '0x' + v.toString(16).toUpperCase().padStart(6, '0');
}
