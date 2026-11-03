import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

const TAU = Math.PI * 2;
const REST_THETA = 0.25;

// Globe rotation that brings [lat, lng] to face the viewer.
const toAngles = ([lat, lng]) => [Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

// Dark globe with gold lights that switch on one after another, then gently pulse.
// It turns slowly on its own; `focus` ([lat, lng]) swings it round to face a point, and it can be dragged.
export default function FootprintGlobe({ markers, focus = null, interactive = true, className = '' }) {
  const canvasRef = useRef(null);
  const focusRef = useRef(focus);
  const seekingRef = useRef(false);

  useEffect(() => {
    focusRef.current = focus;
    seekingRef.current = Boolean(focus);
  }, [focus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let size = canvas.offsetWidth || 500;
    // Start already facing the focus point, if there is one.
    const initial = focusRef.current ? toAngles(focusRef.current) : [0.4, REST_THETA];
    let phi = initial[0];
    let theta = clamp(initial[1], -0.8, 0.8);
    let drag = null;
    let visible = true;
    let frame = 0;
    const start = performance.now();

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: size,
      height: size,
      phi,
      theta,
      dark: 1,
      diffuse: 1.6,
      mapSamples: 20000,
      mapBrightness: 7,
      mapBaseBrightness: 0.02,
      baseColor: [0.5, 0.38, 0.58],
      markerColor: [1, 0.78, 0.4],
      glowColor: [0.62, 0.45, 0.7],
      markerElevation: 0.01,
      markers: []
    });

    const markersAt = (t) =>
      markers
        .map((m, i) => {
          if (reduceMotion) return m;
          const appear = clamp((t - 0.6 - i * 0.22) / 0.5, 0, 1);
          const pulse = 1 + 0.18 * Math.sin(t * 2.2 + i * 1.3);
          return { ...m, size: m.size * appear * pulse };
        })
        .filter((m) => m.size > 0);

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      if (!visible) return;

      const target = focusRef.current;
      if (!drag && target && seekingRef.current) {
        const [fPhi, fTheta] = toAngles(target);
        const ahead = (fPhi - phi + TAU) % TAU;
        const behind = (phi - fPhi + TAU) % TAU;
        phi += ahead < behind ? ahead * 0.07 : -behind * 0.07;
        theta += (clamp(fTheta, -0.8, 0.8) - theta) * 0.07;
        if (Math.min(ahead, behind) < 0.002) seekingRef.current = false;
      } else if (!drag && !target && !reduceMotion) {
        phi += 0.0022;
        theta += (REST_THETA - theta) * 0.04;
      }

      globe.update({ phi, theta, width: size, height: size, markers: markersAt((now - start) / 1000) });
    };
    frame = requestAnimationFrame(tick);

    // Only animate while on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      size = canvas.offsetWidth || size;
    });
    ro.observe(canvas);

    const onDown = (e) => {
      drag = { x: e.clientX, y: e.clientY, phi, theta };
      seekingRef.current = false;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!drag) return;
      phi = drag.phi + ((e.clientX - drag.x) / size) * Math.PI;
      theta = clamp(drag.theta + ((e.clientY - drag.y) / size) * Math.PI * 0.5, -0.8, 0.8);
    };
    const onUp = () => {
      drag = null;
    };
    if (interactive) {
      canvas.addEventListener('pointerdown', onDown);
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerup', onUp);
      canvas.addEventListener('pointercancel', onUp);
    }

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      globe.destroy();
    };
  }, [markers, interactive]);

  return (
    <div className={`mm-globe ${interactive ? 'is-interactive' : ''} ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
