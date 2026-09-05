"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { Container } from "./Container";
import { profile } from "@/lib/data";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-neutral-950/85 backdrop-blur-md py-4 border-b border-white/5 shadow-2xl"
          : "py-7 bg-transparent"
      )}
    >
      <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 2xl:px-24 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-tighter text-white font-heading uppercase group cursor-pointer"
            onClick={(e) => {
              setOpen(false);
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <span>NALINI</span>
            <span className="text-pink-500 font-extrabold group-hover:text-pink-400 transition-colors">.DS</span>
          </Link>

        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              pathname?.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-xs font-mono uppercase tracking-[0.25em] transition-colors relative group py-1",
                  active ? "text-white" : "text-neutral-400 hover:text-pink-300"
                )}
              >
                {link.label}
                <span
                  className={clsx(
                    "absolute -bottom-0.5 left-0 h-[2px] bg-pink-500 shadow-[0_0_8px_#ff2d75] transition-all duration-300",
                    active ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="md:hidden z-50 text-neutral-400 hover:text-white transition-colors p-2"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={clsx(
                "h-0.5 w-full bg-white transition-all duration-300",
                open ? "rotate-45 translate-y-2" : ""
              )}
            />
            <span
              className={clsx(
                "h-0.5 w-full bg-white transition-all duration-300",
                open ? "opacity-0" : ""
              )}
            />
            <span
              className={clsx(
                "h-0.5 w-full bg-white transition-all duration-300",
                open ? "-rotate-45 -translate-y-2" : ""
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={clsx(
          "fixed inset-0 bg-neutral-950/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden transition-all duration-500 z-40",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-3xl font-heading font-light tracking-tight text-neutral-300 hover:text-white transition-colors uppercase"
          >
            {link.label}
          </Link>
        ))}
        <a
          href={`mailto:${profile.email}`}
          onClick={() => setOpen(false)}
          className="mt-4 border border-white/20 px-8 py-3 rounded-full text-xs font-mono tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all"
        >
          Get in Touch
        </a>
      </div>
    </header>
  );
}
