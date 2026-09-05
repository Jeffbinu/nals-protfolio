"use client";

import { useEffect, useState } from "react";
import type { HeadingItem } from "@/lib/blog";
import { ListFilter, ChevronDown, ChevronUp } from "lucide-react";

/** Mobile Sticky Points Toggle — only displays on small screens */
export function MobilePointsNavigation({ headings }: { headings: HeadingItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-90px 0% -60% 0%",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      setIsMobileOpen(false);
    }
  };

  return (
    <div className="lg:hidden mb-8 sticky top-20 z-30">
      <div className="bg-[#130617]/95 border border-pink-500/25 backdrop-blur-md rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-widest text-pink-300 font-semibold px-2 py-1"
          aria-expanded={isMobileOpen}
        >
          <span className="flex items-center gap-2">
            <ListFilter size={14} className="text-pink-400" />
            Article Points ({headings.length})
          </span>
          {isMobileOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {isMobileOpen && (
          <div className="mt-3 pt-3 border-t border-pink-500/15 space-y-1 max-h-60 overflow-y-auto">
            {headings.map((heading, index) => {
              const num = String(index + 1).padStart(2, "0");
              const isActive = activeId === heading.id;
              return (
                <button
                  key={heading.id}
                  onClick={() => scrollToSection(heading.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-start gap-2.5 ${
                    isActive
                      ? "bg-pink-500/20 text-pink-200 font-semibold border-l-2 border-pink-400"
                      : "text-neutral-400 hover:text-white hover:bg-pink-500/5"
                  }`}
                >
                  <span className="text-[10px] text-pink-400/80 shrink-0 mt-0.5">
                    {num}
                  </span>
                  <span className="truncate">{heading.text}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/** Desktop Sticky Sidebar Points Outline — only rendered once in the right sidebar */
export function PointsNavigation({ headings }: { headings: HeadingItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-90px 0% -60% 0%",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className="bg-[#130617]/85 border border-pink-500/20 backdrop-blur-md rounded-2xl p-6 shadow-[0_0_30px_rgba(255,45,117,0.12)]"
    >
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-pink-500/15">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-pink-400 font-bold flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulse" />
          POINTS // OUTLINE
        </span>
        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
          {headings.length} Sections
        </span>
      </div>

      <ul className="space-y-1.5">
        {headings.map((heading, index) => {
          const num = String(index + 1).padStart(2, "0");
          const isActive = activeId === heading.id;
          return (
            <li key={heading.id}>
              <button
                onClick={() => scrollToSection(heading.id)}
                className={`w-full text-left py-2 px-3 rounded-lg text-xs font-mono transition-all flex items-start gap-3 group ${
                  isActive
                    ? "bg-pink-500/15 text-pink-200 border-l-2 border-pink-400 shadow-[0_0_15px_rgba(255,45,117,0.2)] font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-pink-500/5"
                }`}
              >
                <span
                  className={`text-[10px] shrink-0 font-bold mt-0.5 transition-colors ${
                    isActive ? "text-pink-400" : "text-neutral-500 group-hover:text-pink-300"
                  }`}
                >
                  {num}
                </span>
                <span className="leading-snug line-clamp-2">{heading.text}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Quick jump to top */}
      <div className="mt-6 pt-4 border-t border-pink-500/15">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-full text-center text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-pink-300 transition-colors py-1.5 rounded-lg hover:bg-pink-500/5"
        >
          ↑ Return to Top
        </button>
      </div>
    </nav>
  );
}
