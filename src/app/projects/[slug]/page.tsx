import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Calendar,
  Briefcase,
  Terminal,
} from "lucide-react";
import {
  projects,
  profile,
  getProjectBySlug,
  getAllProjectSlugs,
  getAdjacentProjects,
} from "@/lib/data";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const url = `/projects/${slug}`;

  return {
    title: `${project.title} — Case Study | ${profile.name}`,
    description: project.summary,
    keywords: [...project.tags, "Production ML", "Case Study", profile.name],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} — Case Study | ${profile.name}`,
      description: project.summary,
      type: "website",
      siteName: `${profile.name} Portfolio`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study | ${profile.name}`,
      description: project.summary,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev: prevProject, next: nextProject } = getAdjacentProjects(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    author: {
      "@type": "Person",
      name: profile.name,
    },
    keywords: project.tags.join(", "),
    url: `/projects/${slug}`,
  };

  return (
    <article className="bg-transparent text-white min-h-screen pt-32 pb-32 relative">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 2xl:px-24 relative z-10">
        {/* Breadcrumb Bar */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-400 mb-10 pb-4 border-b border-pink-500/15">
          <Link href="/" className="hover:text-pink-300 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-pink-300 transition-colors">
            Projects Archive
          </Link>
          <span>/</span>
          <span className="text-pink-300 truncate max-w-xs sm:max-w-md">
            {project.title}
          </span>
        </div>

        {/* Hero Header */}
        <header className="max-w-4xl mb-16">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-pink-300/80 mb-6">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Briefcase size={13} className="text-pink-400" />
              {project.role}
            </span>
            <span className="h-1 w-1 rounded-full bg-pink-500/50" />
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Calendar size={13} className="text-pink-400" />
              {project.period}
            </span>
            <span className="h-1 w-1 rounded-full bg-pink-500/50" />
            <span className="text-pink-400 uppercase tracking-widest font-semibold">
              PRODUCTION_CASE_STUDY
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-[1.08] text-white uppercase mb-6">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl font-light text-neutral-300/90 leading-relaxed max-w-3xl mb-8">
            {project.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-pink-500/15">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-pink-500/10 text-pink-200 border border-pink-500/25"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Telemetry Metric Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-20">
          <div className="p-6 rounded-xl border border-pink-500/15 bg-[#130617]/70 backdrop-blur-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              Role
            </span>
            <span className="font-heading font-bold text-white text-base sm:text-lg">
              {project.role}
            </span>
          </div>
          <div className="p-6 rounded-xl border border-pink-500/15 bg-[#130617]/70 backdrop-blur-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              Timeline
            </span>
            <span className="font-heading font-bold text-pink-300 text-base sm:text-lg">
              {project.period}
            </span>
          </div>
          <div className="p-6 rounded-xl border border-pink-500/15 bg-[#130617]/70 backdrop-blur-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              Architecture
            </span>
            <span className="font-heading font-bold text-emerald-400 text-base sm:text-lg">
              Distributed ML
            </span>
          </div>
          <div className="p-6 rounded-xl border border-pink-500/15 bg-[#130617]/70 backdrop-blur-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              Status
            </span>
            <span className="font-heading font-bold text-white text-base sm:text-lg flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
              Deployed
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Challenge & Architecture Breakdown */}
          <div className="space-y-16">
            {/* 01: The Challenge */}
            <div className="p-8 sm:p-10 rounded-2xl border border-pink-500/20 bg-[#130617]/70 backdrop-blur-md relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-pink-400 font-bold block mb-3">
                01 // THE PROBLEM CONTEXT
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white uppercase tracking-tight mb-4">
                The Engineering Challenge
              </h2>
              <p className="text-base sm:text-lg font-light text-neutral-300/90 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* 02: Architecture & Key Initiatives */}
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-pink-400 font-bold block mb-3">
                02 // SYSTEM ARCHITECTURE &amp; INITIATIVES
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white uppercase tracking-tight mb-6">
                Key Engineering Decisions
              </h2>
              <div className="space-y-4">
                {project.bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-pink-500/15 bg-[#130617]/50 backdrop-blur-sm flex items-start gap-4 hover:border-pink-500/35 transition-colors"
                  >
                    <span className="font-mono text-xs font-bold text-pink-400 mt-1 shrink-0 px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20">
                      0{idx + 1}
                    </span>
                    <p className="text-sm sm:text-base font-light text-neutral-200/90 leading-relaxed">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 03: Production Scale Impact */}
            <div className="p-8 rounded-2xl border border-pink-500/20 bg-[#130617]/60 backdrop-blur-sm">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-pink-400 font-bold block mb-2">
                03 // PRODUCTION OUTCOMES
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white uppercase tracking-tight mb-4">
                Scalability &amp; Reliability In Practice
              </h3>
              <p className="text-sm sm:text-base font-light text-neutral-300/85 leading-relaxed">
                Designed to run without manual intervention under sustained throughput. The system handles raw data variances, network hiccups, and format shifts gracefully through defensive typing, structured outputs, and automated fallbacks.
              </p>
            </div>
          </div>

          {/* Right Column: Tech Matrix & Action Card */}
          <div className="space-y-8 lg:sticky lg:top-28">
            {/* Tech Stack Matrix */}
            <div className="p-6 sm:p-8 rounded-2xl border border-pink-500/20 bg-[#130617]/85 backdrop-blur-md">
              <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold block mb-4 flex items-center gap-2">
                <Terminal size={14} /> Technology Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg bg-pink-500/10 text-neutral-200 border border-pink-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-pink-500/15 space-y-3 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span>Author</span>
                  <span className="text-white">{profile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Organization</span>
                  <span className="text-white">PEN Chennai</span>
                </div>
                <div className="flex justify-between">
                  <span>Deployment</span>
                  <span className="text-pink-300 font-semibold">Docker Microservices</span>
                </div>
              </div>
            </div>

            {/* Conversation CTA */}
            <div className="p-6 sm:p-8 rounded-2xl border border-pink-500/25 bg-gradient-to-b from-[#180820] to-[#130617] backdrop-blur-md">
              <h4 className="text-lg font-heading font-bold text-white uppercase mb-2">
                Have a Similar Challenge?
              </h4>
              <p className="text-xs font-light text-neutral-300/85 leading-relaxed mb-6">
                Available to discuss architecture, high-throughput OCR pipelines, and domain model fine-tuning.
              </p>
              <a
                href={`mailto:${profile.email}?subject=Inquiry regarding ${project.title}`}
                className="w-full text-center block px-5 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-[0_0_20px_rgba(255,45,117,0.4)]"
              >
                Discuss This Project →
              </a>
            </div>
          </div>
        </div>

        {/* Adjacent Previous / Next Project Navigation */}
        <div className="mt-20 pt-10 border-t border-pink-500/15 grid sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group p-5 rounded-xl border border-pink-500/15 bg-[#130617]/50 hover:border-pink-500/35 hover:bg-[#180820] transition-all flex flex-col justify-between"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 flex items-center gap-1.5 mb-2 group-hover:text-pink-300 transition-colors">
                <ArrowLeft size={12} /> Previous Case Study
              </span>
              <h4 className="text-sm font-heading font-bold text-white uppercase group-hover:text-pink-300 transition-colors line-clamp-2">
                {prevProject.title}
              </h4>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group p-5 rounded-xl border border-pink-500/15 bg-[#130617]/50 hover:border-pink-500/35 hover:bg-[#180820] transition-all flex flex-col justify-between text-right"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 flex items-center justify-end gap-1.5 mb-2 group-hover:text-pink-300 transition-colors">
                Next Case Study <ArrowRight size={12} />
              </span>
              <h4 className="text-sm font-heading font-bold text-white uppercase group-hover:text-pink-300 transition-colors line-clamp-2">
                {nextProject.title}
              </h4>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </article>
  );
}
