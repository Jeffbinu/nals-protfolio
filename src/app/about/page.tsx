import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MapPin, Mail, Phone, Sparkles } from "lucide-react";
import { Container } from "@/components/Container";
import { profile, techStack, education } from "@/lib/data";

export const metadata: Metadata = {
  title: `Profile & Engineering Biography — ${profile.name}`,
  description:
    "Data Scientist & ML Engineer with 2+ years of experience engineering high-throughput OCR systems, fine-tuning LLMs, and deploying resilient RAG pipelines.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About ${profile.name} — Data Scientist & ML Engineer`,
    description: profile.summary,
    type: "profile",
    siteName: `${profile.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${profile.name} — Data Scientist & ML Engineer`,
    description: profile.summary,
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
      description: profile.summary,
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "SRKR Engineering College",
      },
      knowsAbout: techStack.flatMap((cat) => cat.items),
    },
  };

  return (
    <div className="bg-transparent text-white min-h-screen pt-36 pb-32 relative overflow-hidden">
      {/* Schema.org ProfilePage */}
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
            Profile <br />
            <span className="italic font-serif normal-case font-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-pink-200">
              Data Scientist &amp; ML Engineer
            </span>
          </h1>

          <p className="mt-8 text-base sm:text-lg font-light text-neutral-300/90 max-w-2xl leading-relaxed">
            Specializing in end-to-end delivery of LLM systems, computer vision OCR pipelines, and real-time data infrastructure.
          </p>
        </div>

        {/* 2-Column Content */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24 items-start border-t border-pink-500/15 pt-16">
          {/* Left Column: Biography & Background */}
          <div className="space-y-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-pink-400 font-bold block mb-3">
                BIOGRAPHY
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white uppercase tracking-tight mb-6">
                From Rough Data to Production Service
              </h2>
              <div className="space-y-6 text-base sm:text-lg font-light text-neutral-300/85 leading-relaxed">
                <p>
                  {profile.summary}
                </p>
                <p>
                  Over 4 years of shipping production systems, I have owned the full lifecycle of data-intensive software: designing resilient document extraction pipelines for noisy scans, architecting multi-database ecosystems (MongoDB, Qdrant, Neo4j, MySQL), fine-tuning transformer models on synthetic instruction datasets, and packaging everything into containerized microservices behind FastAPI.
                </p>
              </div>
            </div>

            {/* Contact details */}
            <div className="pt-8 border-t border-pink-500/15 space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-pink-400/80 block mb-4">
                CONTACT DETAILS
              </span>
              <div className="flex flex-wrap gap-6 text-sm font-mono text-neutral-300">
                <span className="flex items-center gap-2 text-white">
                  <MapPin size={15} className="text-pink-400" /> {profile.location}
                </span>
                <a href={`mailto:${profile.email}`} className="hover:text-pink-300 transition-colors">
                  {profile.email}
                </a>
                <a href={`tel:${profile.phone}`} className="hover:text-pink-300 transition-colors">
                  {profile.phone}
                </a>
              </div>
            </div>

            {/* Education */}
            <div className="pt-8 border-t border-pink-500/15 space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-pink-400/80 block mb-4">
                EDUCATION
              </span>
              {education.map((edu) => (
                <div key={edu.degree}>
                  <h3 className="text-lg font-heading font-bold text-white uppercase">
                    {edu.degree}
                  </h3>
                  <p className="font-mono text-xs text-neutral-400 mt-1">
                    {edu.school} · {edu.start} — {edu.end}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {edu.coursework.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-pink-500/20 bg-pink-500/10 px-2.5 py-0.5 text-xs font-mono text-pink-300/90"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Tech Stack Matrix */}
          <div className="space-y-8">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-pink-400 font-bold block mb-2">
              TECHNICAL MATRIX
            </span>

            {techStack.map((group) => (
              <div
                key={group.category}
                className="p-6 rounded-xl border border-pink-500/15 bg-[#130617]/50 backdrop-blur-sm hover:border-pink-500/35 transition-colors"
              >
                <h3 className="font-mono text-xs uppercase tracking-widest text-pink-300 mb-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulse" />
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-sm border border-pink-500/15 bg-pink-500/5 px-3 py-1 font-mono text-xs text-neutral-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
