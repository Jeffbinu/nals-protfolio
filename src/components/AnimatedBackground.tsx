import clsx from "clsx";

/** Fixed ambient background mesh — remains stationary across all scroll sections */
export function AnimatedBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={clsx("pointer-events-none fixed inset-0 overflow-hidden z-0", className)}
    >
      {/* Large hot pink glow — top-left: slow drifting orbit */}
      <div
        className="absolute -top-40 -left-40 h-[750px] w-[750px] rounded-full pointer-events-none filter blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,45,117,0.26) 0%, rgba(236,72,153,0.12) 45%, transparent 70%)",
          animation: "blob-float-1 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Rose & fuchsia glow — bottom-right: slow sweeping counter-orbit */}
      <div
        className="absolute -bottom-40 -right-32 h-[750px] w-[750px] rounded-full pointer-events-none filter blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244,114,182,0.24) 0%, rgba(217,70,239,0.11) 50%, transparent 70%)",
          animation: "blob-float-2 26s ease-in-out infinite reverse",
          willChange: "transform",
        }}
      />
      {/* Champagne sparkle accent glow — subtle warm gold, mid-right */}
      <div
        className="absolute top-1/3 right-1/4 h-[420px] w-[420px] rounded-full pointer-events-none filter blur-xl"
        style={{
          background:
            "radial-gradient(circle, rgba(253,224,71,0.14) 0%, rgba(251,191,36,0.06) 45%, transparent 68%)",
          animation: "blob-float-3 18s ease-in-out infinite 2s",
          willChange: "transform",
        }}
      />
      {/* Deep velvet plum/magenta center haze */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full pointer-events-none filter blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(217,70,239,0.14) 0%, rgba(255,45,117,0.08) 40%, transparent 70%)",
          animation: "blob-float-4 28s ease-in-out infinite 1s",
          willChange: "transform",
        }}
      />
      {/* Mid-left ambient rose glow for deep scroll coverage */}
      <div
        className="absolute top-2/3 -left-32 h-[550px] w-[550px] rounded-full pointer-events-none filter blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244,114,182,0.18) 0%, rgba(255,45,117,0.08) 45%, transparent 70%)",
          animation: "blob-float-1 24s ease-in-out infinite reverse 4s",
          willChange: "transform",
        }}
      />

      {/* Refined Barbie grid overlay — visibly subtle pink hairline */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,45,117,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,117,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent 95%)",
        }}
      />

      {/* Sparkle dots — hot pink and gold */}
      {[
        { top: "12%", left: "7%",  size: 3, delay: "0s" },
        { top: "28%", left: "91%", size: 2, delay: "1.8s" },
        { top: "68%", left: "4%",  size: 2, delay: "3.2s" },
        { top: "52%", left: "86%", size: 3, delay: "0.6s" },
        { top: "82%", left: "48%", size: 2, delay: "2.5s" },
        { top: "18%", left: "62%", size: 2, delay: "4.2s" },
        { top: "40%", left: "30%", size: 2, delay: "1.1s" },
        { top: "75%", left: "20%", size: 3, delay: "2.1s" },
        { top: "88%", left: "80%", size: 2, delay: "3.7s" },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            background: i % 3 === 0 ? "#fde047" : "#ff2d75",
            opacity: 0.65,
            boxShadow: i % 3 === 0 ? "0 0 12px #fde047" : "0 0 12px #ff2d75",
            animation: `pulse-glow 3.5s ease-in-out infinite ${dot.delay}`,
          }}
        />
      ))}
    </div>
  );
}

/** @keyframes for mesh-drift and beam-drift registered globally in globals.css */
