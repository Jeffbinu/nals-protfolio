"use client";

import { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const currentProgress = (totalScroll / windowHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-pink-500/10"
    >
      <div
        className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(255,45,117,0.7)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
