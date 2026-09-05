import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { profile, projects } from "@/lib/data";

import { MotionDiv } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: `Production Projects & Architecture Case Studies — ${profile.name}`,
  description:
    "End-to-end production systems: 60M+ record OCR pipelines, fine-tuned Gemma 12B domain models, and real-time distributed news intelligence.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Machine Learning Projects & Case Studies — ${profile.name}`,
    description:
      "End-to-end production systems: 60M+ record OCR pipelines, fine-tuned Gemma 12B domain models, and real-time distributed news intelligence.",
    type: "website",
    siteName: `${profile.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Machine Learning Projects & Case Studies — ${profile.name}`,
    description:
      "End-to-end production systems: 60M+ record OCR pipelines, fine-tuned Gemma 12B domain models, and real-time distributed news intelligence.",
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Production Machine Learning Projects — ${profile.name}`,
    description:
      "Architectural deep dives into production ML systems engineered by Nalini Baddireddi.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `/projects/${p.slug}`,
        name: p.title,
        description: p.summary,
      })),
    },
  };

  return (
    <div className="bg-transparent text-white min-h-screen pt-36 pb-32 relative overflow-hidden">
      {/* Schema.org CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 2xl:px-24 relative z-10">
        {/* Header matching reference */}
        <div className="mb-20">
          <Link
            href="/"
            className="text-xs font-mono uppercase tracking-[0.25em] text-pink-400/80 hover:text-pink-300 transition-colors mb-10 inline-flex items-center gap-2"
          >
            <ArrowLeft size={13} /> Back to Home
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[0.96] uppercase">
            Archive <br />
            <span className="italic font-serif normal-case font-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-pink-200">
              2022—2024
            </span>
          </h1>

          <p className="mt-8 text-base sm:text-lg font-light text-neutral-300/90 max-w-2xl leading-relaxed">
            Systems engineered to handle real, messy data at scale — from 60-million-record voter roll OCR pipelines to fine-tuning domain LLMs and cross-source RAG.
          </p>
        </div>

        {/* 2-Column Staggered Grid matching reference */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-28">
          {projects.map((project, index) => (
            <MotionDiv key={project.slug} delay={index * 0.1} direction="up">
              <ProjectCard project={project} index={index} />
            </MotionDiv>
          ))}
        </div>
      </div>
    </div>
  );
}
