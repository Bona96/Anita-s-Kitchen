import React, { useRef, useEffect, useState, useCallback } from 'react';
import Tile from './Tile';
import { motion } from 'framer-motion';

type Variant = 'hero' | 'contact' | 'footer';

interface BackgroundLayerProps {
  variant?: Variant;
  cols?: number;
  rows?: number;
  className?: string;
}

const variantDefaults: Record<Variant, { cols: number; rows: number }> = {
  hero: { cols: 20, rows: 12 },
  contact: { cols: 12, rows: 6 },
  footer: { cols: 16, rows: 4 },
};

const DURATION = 1400;

const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ variant = 'hero', cols, rows, className }) => {
  const cfg = variantDefaults[variant];
  const c = cols ?? cfg.cols;
  const r = rows ?? cfg.rows;
  const total = c * r;

  const layerRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<Record<number, number>>({});
  const [activeMap, setActiveMap] = useState<Record<number, number>>({});

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const el = layerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

    const col = Math.min(c - 1, Math.max(0, Math.floor((x / rect.width) * c)));
    const row = Math.min(r - 1, Math.max(0, Math.floor((y / rect.height) * r)));
    const centerIndex = row * c + col;
    const now = Date.now();
    const neighbors = [0, -1, 1, -c, c];
    neighbors.forEach((offset) => {
      const idx = centerIndex + offset;
      if (idx >= 0 && idx < total) activeRef.current[idx] = now;
    });
  }, [c, r, total]);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const now = Date.now();
      const cur = activeRef.current;
      for (const k of Object.keys(cur)) {
        const idx = Number(k);
        if (now - cur[idx] > DURATION) {
          delete cur[idx];
        }
      }
      setActiveMap({ ...activeRef.current });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // variant renderer
  if (variant === 'hero') {
    return (
      <section
        ref={layerRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerMove}
        className={`w-full grid h-full grid-cols-${c} ${className ?? ''}`}
        style={{
          gridTemplateColumns: `repeat(${c}, minmax(0, 1fr))`,
          gridAutoRows: `minmax(0, 1fr)`,
          position: 'absolute',
          inset: 0,
        }}
      >
        {Array.from(Array(total), (_v, i) => (
          <Tile key={i} activeAt={activeMap[i]} />
        ))}
      </section>
    );
  }

  // contact/footer: simpler colored tiles with variant-specific styling using CSS variables
  const baseVar = variant === 'contact' ? '--color-maroon-50' : '--color-tan-50';

  return (
    <div
      ref={layerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerMove}
      className={`pointer-events-none absolute inset-0 grid ${className ?? ''}`}
      style={{
        gridTemplateColumns: `repeat(${c}, minmax(0, 1fr))`,
        gridAutoRows: `minmax(0, 1fr)`,
      }}
    >
      {Array.from(Array(total), (_v, i) => {
        const activeAt = activeMap[i];
        const age = activeAt ? Math.max(0, Date.now() - activeAt) : Infinity;
        const intensity = Math.max(0, 1 - age / DURATION);
        const style: React.CSSProperties = {
          opacity: 0.00 + 0.0 * intensity,
          transform: `scale(${1 + 0.08 * intensity})`,
          transition: 'opacity 0.9s ease-out, transform 0.9s ease-out',
          backgroundColor: `var(${baseVar})`,
        };
        return (
          <motion.div key={i} style={style} className={`w-full h-full border border-transparent`} />
        );
      })}
    </div>
  );
};

export default BackgroundLayer;
