/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from "@react-spring/web";

const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<any>(null);
  const pointerRef = useRef<number | null>(null);
  const velocityRef = useRef(0); // ← New: tracks drag speed

  // Rotation spring - tuned for natural feel
  const [{ phi }, api] = useSpring(() => ({
    phi: 0,
    config: {
      mass: 1.2,
      tension: 80, // Lower tension = more momentum
      friction: 25, // Lower friction = longer deceleration
    },
  }));

  // Dragging handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerRef.current = e.clientX;
    velocityRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerRef.current === null) return;

    const delta = e.clientX - pointerRef.current;

    // Calculate velocity for inertia
    velocityRef.current = delta * 0.008;

    api.start({
      phi: phi.get() + delta * 0.006,
      immediate: true,
    });

    pointerRef.current = e.clientX;
  };

  const handlePointerUp = () => {
    if (pointerRef.current === null) return;

    // Apply inertia when releasing
    const currentPhi = phi.get();
    api.start({
      phi: currentPhi + velocityRef.current * 60, // momentum boost
      immediate: false,
    });

    pointerRef.current = null;
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const size = Math.min(window.innerWidth * 0.85, 620);

    const options: COBEOptions = {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.25,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.96, 0.96, 0.98],
      markerColor: [0.1, 0.65, 0.85],
      glowColor: [0.85, 0.95, 1],
      markers: [
        { location: [9.08, 7.4], size: 0.05 }, // Lagos
        { location: [37.78, -122.44], size: 0.03 },
      ],
    };

    globeRef.current = createGlobe(canvasRef.current, options);

    // Animation loop
    let rafId: number;
    function animate() {
      globeRef.current?.update({ phi: phi.get() });
      rafId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      globeRef.current?.destroy();
    };
  }, [phi]);

  // Responsive resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !globeRef.current) return;
      const size = Math.min(window.innerWidth * 0.85, 620);
      canvasRef.current.width = size * 2;
      canvasRef.current.height = size * 2;
      canvasRef.current.style.width = `${size}px`;
      canvasRef.current.style.height = `${size}px`;
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="cursor-grab active:cursor-grabbing rounded-full mx-auto"
        style={{ touchAction: "none" }}
      />
    </div>
  );
};

export default Globe;