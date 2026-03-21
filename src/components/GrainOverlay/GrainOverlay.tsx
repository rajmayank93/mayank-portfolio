import { useEffect, useRef } from 'react';
import './GrainOverlay.css';

// Animate feTurbulence seed every ~80ms for authentic film-grain flicker
// Cost: one attribute write per frame on a hidden SVG — essentially free
const TICK_MS = 80;

export default function GrainOverlay() {
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    let seed = 0;
    const id = setInterval(() => {
      seed = (seed + 1) % 1000;
      turbRef.current?.setAttribute('seed', String(seed));
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  return (
    // SVG is sized 0×0 — the filter is applied via CSS class on a separate div
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="linearRGB">
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            seed="0"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
