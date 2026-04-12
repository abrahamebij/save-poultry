/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useEffect, useRef, useState, useCallback } from "react";
import { useSpring } from "@react-spring/web";
import { RiCloseLine } from "react-icons/ri";

const markers = [
  {
    location: [33.75, -84.39] as [number, number],
    size: 0.07,
    name: "Atlanta, USA",
    disease: "Highly Pathogenic Avian Influenza (HPAI)",
    severity: "Very High",
  },
  {
    location: [-23.55, -46.63] as [number, number],
    size: 0.08,
    name: "São Paulo, Brazil",
    disease: "Highly Pathogenic Avian Influenza (HPAI)",
    severity: "High",
  },
  {
    location: [51.92, 4.48] as [number, number],
    size: 0.06,
    name: "Rotterdam, Netherlands",
    disease: "Newcastle Disease",
    severity: "Medium",
  },
  {
    location: [6.52, 3.38] as [number, number],
    size: 0.085,
    name: "Lagos, Nigeria",
    disease: "Newcastle Disease (ND)",
    severity: "Very High",
  },
  {
    location: [24.71, 46.68] as [number, number],
    size: 0.055,
    name: "Riyadh, Saudi Arabia",
    disease: "Newcastle Disease",
    severity: "High",
  },
  {
    location: [28.61, 77.21] as [number, number],
    size: 0.065,
    name: "Delhi, India",
    disease: "Newcastle Disease (ND)",
    severity: "Very High",
  },
  {
    location: [39.9, 116.41] as [number, number],
    size: 0.07,
    name: "Beijing, China",
    disease: "Highly Pathogenic Avian Influenza (HPAI)",
    severity: "High",
  },
  {
    location: [13.76, 100.5] as [number, number],
    size: 0.06,
    name: "Bangkok, Thailand",
    disease: "Newcastle Disease",
    severity: "High",
  },
  {
    location: [-33.87, 151.21] as [number, number],
    size: 0.05,
    name: "Sydney, Australia",
    disease: "Avian Influenza",
    severity: "Medium",
  },
  {
    location: [55.76, 37.62] as [number, number],
    size: 0.055,
    name: "Moscow, Russia",
    disease: "Newcastle Disease",
    severity: "Medium-High",
  },
  {
    location: [19.43, -99.13] as [number, number],
    size: 0.05,
    name: "Mexico City, Mexico",
    disease: "Newcastle Disease",
    severity: "High",
  },
  {
    location: [-1.29, 36.82] as [number, number],
    size: 0.045,
    name: "Nairobi, Kenya",
    disease: "Newcastle Disease (ND)",
    severity: "Very High",
  },
  {
    location: [41.01, 28.98] as [number, number],
    size: 0.05,
    name: "Istanbul, Turkey",
    disease: "Highly Pathogenic Avian Influenza (HPAI)",
    severity: "High",
  },
];

const severityColor: Record<string, string> = {
  "Very High": "text-red-600 bg-red-50 border-red-200",
  High: "text-amber-600 bg-amber-50 border-amber-200",
  "Medium-High": "text-orange-600 bg-orange-50 border-orange-200",
  Medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
};

interface Tooltip {
  x: number;
  y: number;
  marker: (typeof markers)[0];
}

function projectToCanvas(
  lat: number,
  lng: number,
  phi: number,
  theta: number,
  canvasSize: number,
): { x: number; y: number; visible: boolean } {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  const x0 = Math.cos(latRad) * Math.cos(lngRad);
  const y0 = Math.sin(latRad);
  const z0 = Math.cos(latRad) * Math.sin(lngRad);

  // Rotate around Y by phi
  const x1 = x0 * Math.cos(phi) + z0 * Math.sin(phi);
  const z1 = -x0 * Math.sin(phi) + z0 * Math.cos(phi);

  // Rotate around X by theta
  const y1 = y0 * Math.cos(theta) - z1 * Math.sin(theta);
  const z2 = y0 * Math.sin(theta) + z1 * Math.cos(theta);

  const radius = canvasSize / 2;

  return {
    x: radius + x1 * radius * 0.98,
    y: radius - y1 * radius * 0.98,
    visible: z2 > 0,
  };
}

const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const pointerDownXRef = useRef<number | null>(null);
  const pointerRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const phiRef = useRef(0);
  const sizeRef = useRef(620);

  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const [{ phi }, api] = useSpring(() => ({
    phi: 0,
    config: { mass: 1.2, tension: 80, friction: 25 },
    onChange: ({ value }: { value: { phi: number } }) => {
      phiRef.current = value.phi;
    },
  }));

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerRef.current = e.clientX;
    pointerDownXRef.current = e.clientX;
    velocityRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerRef.current === null) return;
    const delta = e.clientX - pointerRef.current;
    velocityRef.current = delta * 0.008;
    api.start({ phi: phi.get() + delta * 0.006, immediate: true });
    pointerRef.current = e.clientX;
  };

  const handleClick = useCallback(
    (e: React.PointerEvent) => {
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const size = sizeRef.current;
      const theta = 0.25;
      const hitRadius = 28;

      // clicking anywhere while tooltip is open closes it
      if (tooltip) {
        setTooltip(null);
        return;
      }

      let closest: {
        dist: number;
        marker: (typeof markers)[0];
        x: number;
        y: number;
      } | null = null;

      for (const marker of markers) {
        const { x, y, visible } = projectToCanvas(
          marker.location[0],
          marker.location[1],
          phiRef.current,
          theta,
          size,
        );

        if (!visible) continue;

        const dist = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2);
        if (dist < hitRadius && (!closest || dist < closest.dist)) {
          closest = { dist, marker, x: clickX, y: clickY };
        }
      }

      if (closest) {
        setTooltip({ x: closest.x, y: closest.y, marker: closest.marker });
      }
    },
    [tooltip],
  );

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerRef.current === null) return;

    const dragDistance = Math.abs(
      e.clientX - (pointerDownXRef.current ?? e.clientX),
    );

    if (dragDistance < 5) {
      handleClick(e);
    } else {
      api.start({
        phi: phi.get() + velocityRef.current * 60,
        immediate: false,
      });
    }

    pointerRef.current = null;
    pointerDownXRef.current = null;
  };

  const handlePointerLeave = () => {
    if (pointerRef.current !== null) {
      api.start({
        phi: phi.get() + velocityRef.current * 60,
        immediate: false,
      });
    }
    pointerRef.current = null;
    pointerDownXRef.current = null;
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const size = Math.min(window.innerWidth * 0.85, 620);
    sizeRef.current = size;

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
      markerColor: [0.18, 0.42, 0.31],
      glowColor: [0.85, 0.95, 0.88],
      markers: markers.map((m) => ({ location: m.location, size: m.size })),
    };

    globeRef.current = createGlobe(canvasRef.current, options);

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

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !globeRef.current) return;
      const size = Math.min(window.innerWidth * 0.85, 620);
      sizeRef.current = size;
      canvasRef.current.width = size * 2;
      canvasRef.current.height = size * 2;
      canvasRef.current.style.width = `${size}px`;
      canvasRef.current.style.height = `${size}px`;
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative flex items-center justify-center py-4"
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        className="cursor-grab active:cursor-grabbing rounded-full mx-auto"
        style={{ touchAction: "none" }}
      />

      {tooltip && (
        <div
          className="pointer-events-auto absolute z-20 w-56 rounded-xl border border-border bg-surface shadow-xl"
          style={{
            left: tooltip.x + 14,
            top: tooltip.y - 10,
            transform:
              tooltip.x > sizeRef.current * 0.7
                ? "translateX(-110%)"
                : undefined,
          }}
        >
          <div className="px-3.5 py-3 space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <p className="font-display text-sm font-700 text-text leading-tight">
                {tooltip.marker.name}
              </p>
              <button
                onClick={() => setTooltip(null)}
                className="shrink-0 text-subtle hover:text-text transition-colors"
              >
                <RiCloseLine size={14} />
              </button>
            </div>
            <p className="text-xs text-muted leading-snug">
              {tooltip.marker.disease}
            </p>
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-500 ${severityColor[tooltip.marker.severity] ?? "text-muted bg-surface-2 border-border"}`}
            >
              {tooltip.marker.severity} risk
            </span>
          </div>
        </div>
      )}

      {!tooltip && (
        <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-subtle pointer-events-none whitespace-nowrap">
          Click a marker to see outbreak details
        </p>
      )}
    </div>
  );
};

export default Globe;
