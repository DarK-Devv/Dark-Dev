import { lazy, Suspense, useState } from 'react';
import AssemblyBadge from './AssemblyBadge';

const MechCoreScene = lazy(() => import('./MechCoreScene'));

/** pick the render mode once, at first render (client-only app, no SSR) */
function resolveMode() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return '2d';
  const narrow = window.innerWidth < 860;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  return narrow && coarse ? 'mobile3d' : '3d';
}

/**
 * Hero's procedural mechanical core: armor plates that fly in and lock into
 * a faceted shell. Lazily loads the Three.js scene so the r3f/three bundle
 * never blocks first paint or the loader's boot sequence. Falls back to a
 * static, already-locked AssemblyBadge under reduced-motion (no WebGL, no
 * animation at all — the correct reading of "reduced motion", not just
 * "less" motion) and to a lighter 3D scene on narrow/coarse-pointer
 * viewports, matching Stack.jsx's existing 860px breakpoint convention.
 */
export default function MechCore({ className = '', progressRef }) {
  const [mode] = useState(resolveMode); // '3d' | 'mobile3d' | '2d'

  if (mode === '2d') {
    return <AssemblyBadge className={className} initialProgress={1} />;
  }

  const mobile = mode === 'mobile3d';

  return (
    <div className={className}>
      <Suspense fallback={null}>
        <MechCoreScene
          progressRef={progressRef}
          interactive={!mobile}
          fragmentCount={mobile ? 9 : 18}
          dpr={mobile ? [1, 1.4] : [1, 2]}
        />
      </Suspense>
    </div>
  );
}
