import { useEffect, useRef } from 'react';

/**
 * A self-contained canvas "ember reactor core": a glowing pulsing core with
 * particles orbiting on tilted rings, plus rising embers. Optional cursor
 * parallax. Drives its own rAF; honors prefers-reduced-motion.
 */
export default function EmberCore({ interactive = false, className = '', spin = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, cx = 0, cy = 0, dpr = 1;
    let raf = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    function resize() {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2; cy = H / 2;
    }
    resize();
    window.addEventListener('resize', resize);

    // particles defined in normalized radius so they scale with the canvas
    const rings = [
      { rf: 0.34, tilt: 0.32, count: 22, speed: 0.18, size: 1.6 },
      { rf: 0.52, tilt: 0.5, count: 30, speed: -0.12, size: 1.9 },
      { rf: 0.72, tilt: 0.24, count: 38, speed: 0.08, size: 1.4 },
    ];
    const particles = [];
    rings.forEach((ring, ri) => {
      for (let i = 0; i < ring.count; i++) {
        particles.push({
          ring: ri,
          a: (i / ring.count) * Math.PI * 2 + Math.random() * 0.2,
          rf: ring.rf + (Math.random() - 0.5) * 0.04,
          tilt: ring.tilt,
          speed: ring.speed * (0.8 + Math.random() * 0.4),
          size: ring.size * (0.7 + Math.random() * 0.8),
          alpha: 0.4 + Math.random() * 0.6,
        });
      }
    });

    const onMove = (e) => {
      if (!interactive) return;
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (interactive) window.addEventListener('pointermove', onMove);

    let t = 0;
    function frame() {
      t += 0.016 * spin;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      const px = pointer.x * Math.min(W, H) * 0.05;
      const py = pointer.y * Math.min(W, H) * 0.05;
      const ox = cx + px, oy = cy + py;
      const base = Math.min(W, H);

      ctx.clearRect(0, 0, W, H);

      // core glow
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.6);
      const coreR = base * (0.13 + 0.012 * pulse);
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, coreR * 2.4);
      g.addColorStop(0, `rgba(255,180,90,${0.95})`);
      g.addColorStop(0.25, `rgba(255,107,53,${0.7})`);
      g.addColorStop(0.6, `rgba(255,69,0,${0.18})`);
      g.addColorStop(1, 'rgba(255,69,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(ox, oy, coreR * 2.4, 0, Math.PI * 2);
      ctx.fill();

      // bright core
      ctx.fillStyle = `rgba(255,210,150,${0.85})`;
      ctx.beginPath();
      ctx.arc(ox, oy, coreR * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // orbiting particles
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particles) {
        p.a += p.speed * 0.016 * spin;
        const R = p.rf * base;
        const x = ox + Math.cos(p.a) * R;
        const y = oy + Math.sin(p.a) * R * p.tilt;
        const depth = (Math.sin(p.a) + 1) / 2; // front particles brighter
        const a = p.alpha * (0.35 + 0.65 * depth);
        ctx.fillStyle = `rgba(255,${120 + Math.floor(80 * depth)},${40 + Math.floor(40 * depth)},${a})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size * (0.6 + 0.6 * depth), 0, Math.PI * 2);
        ctx.fill();
      }

      // faint orbit rings
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = 'rgba(255,107,53,0.07)';
      ctx.lineWidth = 1;
      for (const ring of rings) {
        ctx.beginPath();
        ctx.ellipse(ox, oy, ring.rf * base, ring.rf * base * ring.tilt, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (!reduce) raf = requestAnimationFrame(frame);
    }

    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (interactive) window.removeEventListener('pointermove', onMove);
    };
  }, [interactive, spin]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
