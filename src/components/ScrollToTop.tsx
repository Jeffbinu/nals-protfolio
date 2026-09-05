"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className="fixed bottom-8 right-8 z-40 group flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-pink-500/35 bg-[#130617]/90 backdrop-blur-md text-pink-300 hover:text-white hover:bg-pink-500 hover:border-pink-400 hover:shadow-[0_0_25px_rgba(255,45,117,0.65)] transition-all duration-300 shadow-[0_6px_25px_rgba(0,0,0,0.6)] cursor-pointer animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-300 group-hover:bg-white group-hover:text-pink-600 flex items-center justify-center transition-colors">
        <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
      </div>
      <span className="font-mono text-[11px] uppercase tracking-widest font-semibold pr-1">
        Top
      </span>
    </button>
  );
}
