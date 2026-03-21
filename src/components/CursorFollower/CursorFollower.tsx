import { useEffect, useRef } from 'react';
import './CursorFollower.css';

const LERP = 0.1;
const INTERACTIVE = 'a, button, [role="button"], input, textarea, label, select';

export default function CursorFollower() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on fine-pointer devices (mouse, not touch)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let rafId: number;

    const moveDot = (x: number, y: number) => {
      if (!dotRef.current) return;
      dotRef.current.style.left = `${x}px`;
      dotRef.current.style.top  = `${y}px`;
    };

    const moveRing = (x: number, y: number) => {
      if (!ringRef.current) return;
      ringRef.current.style.left = `${x}px`;
      ringRef.current.style.top  = `${y}px`;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      moveDot(mx, my);
      dotRef.current?.classList.remove('cursor-dot--hidden');
    };

    const tick = () => {
      rx += (mx - rx) * LERP;
      ry += (my - ry) * LERP;
      moveRing(rx, ry);
      rafId = requestAnimationFrame(tick);
    };

    const expand   = () => ringRef.current?.classList.add('cursor-ring--active');
    const collapse = () => ringRef.current?.classList.remove('cursor-ring--active');

    // Bind hover listeners to all interactive elements
    const bindHovers = () =>
      document.querySelectorAll<Element>(INTERACTIVE).forEach((el) => {
        el.removeEventListener('mouseenter', expand);
        el.removeEventListener('mouseleave', collapse);
        el.addEventListener('mouseenter', expand);
        el.addEventListener('mouseleave', collapse);
      });

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);
    bindHovers();

    // Re-bind when new elements mount (e.g. command palette)
    const mo = new MutationObserver(bindHovers);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot cursor-dot--hidden" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring"                   aria-hidden="true" />
    </>
  );
}
