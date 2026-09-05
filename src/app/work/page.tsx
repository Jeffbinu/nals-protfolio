import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/Container";
import { profile, experience } from "@/lib/data";

export const metadata: Metadata = {
  title: `Work History & Experience — ${profile.name}`,
  description:
    "Professional trajectory of Nalini Baddireddi: Machine learning engineering at Populus Empowerment Network, building 60M+ record OCR engines and fine-tuning LLMs.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: `Work Experience — ${profile.name}`,
    description: `${profile.yearsExperience} years of production ML engineering: OCR pipelines, LLMs, and real-time data architectures.`,
    type: "website",
    siteName: `${profile.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Work Experience — ${profile.name}`,
    description: `${profile.yearsExperience} years of production ML engineering: OCR pipelines, LLMs, and real-time data architectures.`,
  },
};

export default function WorkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Work Experience — ${profile.name}`,
    itemListElement: experience.map((job, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "OrganizationRole",
        roleName: job.title,
        startDate: job.start,
        endDate: job.end,
        worksFor: {
          "@type": "Organization",
          name: job.company,
        },
      },
    })),
  };

  return (
    <div className="bg-transparent text-white min-h-screen pt-36 pb-32 relative overflow-hidden">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 2xl:px-24 relative z-10">
        {/* Header */}
        <div className="mb-20">
          <Link
            href="/"
            className="text-xs font-mono uppercase tracking-[0.25em] text-pink-400/80 hover:text-pink-300 transition-colors mb-10 inline-flex items-center gap-2"
          >
            <ArrowLeft size={13} /> Back to Home
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[0.96] uppercase">
            Experience <br />
            <span className="italic font-serif normal-case font-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-pink-200">
              4 Years Shipping ML
            </span>
          </h1>

          <p className="mt-8 text-base sm:text-lg font-light text-neutral-300/90 max-w-2xl leading-relaxed">
            Detailed breakdown of production initiatives — from architecting voter roll OCR at 60M+ record scale to fine-tuning domain models and shipping real-time inference microservices.
          </p>

          {/* Key proof metrics row */}
          <div className="mt-12 flex flex-wrap gap-8 pt-8 border-t border-pink-500/15">
            {[
              { value: "60M+", label: "Voter records processed" },
              { value: "90 min", label: "Per 100K batch extraction" },
              { value: "4 Yrs", label: "Production experience" },
              { value: "Gemma 12B", label: "Fine-tuned & deployed" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-pink-400 tracking-tight">
                  {stat.value}
                </p>
                <p className="font-mono text-xs uppercase tracking-widest text-pink-300/70 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Roles & Initiatives Breakdown */}
        <div className="space-y-24 border-t border-pink-500/15 pt-16">
          {experience.map((role, rIndex) => (
            <div key={role.title} className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
              {/* Left: Role Info */}
              <div className="lg:sticky lg:top-28">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-pink-400 font-bold block mb-2">
                  ROLE 0{rIndex + 1}
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white uppercase tracking-tight">
                  {role.title}
                </h2>
                <p className="font-mono text-sm text-pink-300/80 mt-1">
                  {role.company} · {role.location}
                </p>
                <p className="font-mono text-xs text-neutral-400 mt-1">
                  {role.start} — {role.end}
                </p>
                <p className="mt-4 text-sm font-light text-neutral-300/85 leading-relaxed max-w-sm">
                  {role.summary}
                </p>
              </div>

              {/* Right: Detailed Initiatives */}
              <div className="space-y-8">
                {role.initiatives.map((init) => (
                  <div
                    key={init.title}
                    className="p-8 rounded-xl border border-pink-500/15 bg-[#130617]/60 backdrop-blur-sm hover:border-pink-500/35 hover:shadow-[0_0_25px_rgba(255,45,117,0.15)] transition-all duration-300"
                  >
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-white uppercase tracking-tight mb-4 flex items-center justify-between">
                      <span>{init.title}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulse" />
                    </h3>
                    <ul className="space-y-3 font-light text-neutral-300/85 text-sm leading-relaxed">
                      {init.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 items-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-pink-400 mt-2 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
