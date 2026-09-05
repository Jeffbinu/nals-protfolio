import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="py-24 sm:py-32 bg-transparent text-white border-t border-pink-500/15 relative overflow-hidden z-10">
      <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 2xl:px-24 relative z-10">
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-16 lg:gap-24 mb-24">
          {/* Left Column: Huge CTA & Direct Email */}
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif italic text-lg text-pink-400">05</span>
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-pink-300/70">
                    Get In Touch
                  </span>
                </div>
                <div className="h-px w-32 bg-gradient-to-r from-pink-500/50 via-pink-400/20 to-transparent" />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[0.96] uppercase">
                Let&apos;s Build <br />
                <span className="italic font-serif normal-case font-normal text-pink-300/90">
                  Reliable ML.
                </span>
              </h2>
            </div>

            {/* Interactive conversation launcher */}
            <div className="space-y-8">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-6 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center group-hover:scale-105 group-hover:bg-pink-600 transition-all duration-500 shadow-[0_0_35px_rgba(255,45,117,0.5)] group-hover:shadow-[0_0_50px_rgba(255,45,117,0.85)]">
                  <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-heading font-bold tracking-tight text-white group-hover:text-pink-300 transition-colors duration-300 uppercase">
                    Start a Conversation
                  </span>
                  <span className="block text-xs font-mono uppercase tracking-widest text-pink-300/70 mt-1">
                    Available for Senior &amp; Staff Roles
                  </span>
                </div>
              </a>

              <div>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-3 text-base sm:text-lg font-mono text-neutral-400 hover:text-pink-300 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_8px_#ff2d75]" />
                  {profile.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Socials & Sitemap matching reference */}
          <div className="flex flex-col justify-end gap-12">
            <div className="grid grid-cols-2 gap-10 sm:gap-16">
              {/* Socials */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-6">
                  Connect
                </h4>
                <ul className="space-y-4">
                  {[
                    { label: "LinkedIn", href: profile.linkedin },
                    { label: "GitHub", href: profile.github },
                    { label: "Email Direct", href: `mailto:${profile.email}` },
                    { label: "Phone", href: `tel:${profile.phone}` },
                  ].map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm sm:text-base font-light text-neutral-400 hover:text-white transition-colors group"
                      >
                        {item.label}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-white" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sitemap */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-6">
                  Sitemap
                </h4>
                <ul className="space-y-4">
                  {[
                    { label: "Home", href: "/" },
                    { label: "Selected Work", href: "/work" },
                    { label: "Projects Archive", href: "/projects" },
                    { label: "About Nalini", href: "/about" },
                    { label: "Field Notes & Blog", href: "/blog" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm sm:text-base font-light text-neutral-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-4 font-mono text-xs uppercase tracking-widest text-neutral-600">
          <p>© {year} {profile.name}. All systems operational.</p>
          <p>Production ML · LLM Systems · Computer Vision</p>
        </div>
      </div>
    </footer>
  );
}
