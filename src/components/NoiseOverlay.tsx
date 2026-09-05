"use client";

import React from "react";

/**
 * High-performance SVG film-grain noise texture overlay.
 * Adds tactile analog depth and eliminates flat "AI template" appearance.
 */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 select-none overflow-hidden opacity-[0.045] mix-blend-overlay"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="site-film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#site-film-grain)" />
      </svg>
    </div>
  );
}
