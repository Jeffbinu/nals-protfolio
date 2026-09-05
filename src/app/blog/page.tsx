import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, BookOpen, Layers, Zap } from "lucide-react";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { profile } from "@/lib/data";
import { BlogSearchFilter } from "@/components/blog/BlogSearchFilter";

export const metadata: Metadata = {
  title: `Field Notes & Engineering Essays — ${profile.name}`,
  description:
    "Production machine learning write-ups: 60M+ record OCR pipelines, fine-tuning Gemma 12B on synthetic data, and cross-source RAG architectures.",
  keywords: [
    "Machine Learning Blog",
    "Production OCR",
    "Computer Vision",
    "LLM Fine-Tuning",
    "Gemma 12B",
    "RAG Architecture",
    "Qdrant",
    "FastAPI",
    "Nalini Baddireddi",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Field Notes & Engineering Essays — ${profile.name}`,
    description:
      "Production machine learning write-ups: 60M+ record OCR pipelines, fine-tuning Gemma 12B on synthetic data, and cross-source RAG architectures.",
    siteName: `${profile.name} Portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Field Notes & Engineering Essays — ${profile.name}`,
    description:
      "Production machine learning write-ups: 60M+ record OCR pipelines, fine-tuning Gemma 12B on synthetic data, and cross-source RAG architectures.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const allTags = getAllTags();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Field Notes & Engineering Essays — ${profile.name}`,
    description:
      "Deep-dive technical write-ups on production OCR at 60M+ scale, LLM fine-tuning on synthetic data, and multilingual RAG systems.",
    author: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `/blog/${post.slug}`,
      keywords: post.tags?.join(", "),
    })),
  };

  return (
    <div className="bg-transparent text-white min-h-screen pt-36 pb-32 relative overflow-hidden">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 2xl:px-24 relative z-10">
        {/* Navigation & Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="text-xs font-mono uppercase tracking-[0.25em] text-pink-400/80 hover:text-pink-300 transition-colors mb-8 inline-flex items-center gap-2 group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mt-4">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-pink-400 font-bold flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
                  KNOWLEDGE BASE // FIELD NOTES
                </span>
                <span className="h-px w-20 bg-gradient-to-r from-pink-500/50 to-transparent" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[0.96] uppercase">
                Field Notes <br />
                <span className="italic font-serif normal-case font-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-pink-200">
                  Engineering Essays
                </span>
              </h1>
            </div>

            {/* Editorial Telemetry Badges */}
            <div className="flex flex-wrap gap-4 pt-4 lg:pt-0 font-mono text-xs">
              <div className="px-4 py-2.5 rounded-xl border border-pink-500/20 bg-[#130617]/70 backdrop-blur-sm">
                <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Volume</span>
                <span className="text-white font-bold">{posts.length} Production Essays</span>
              </div>
              <div className="px-4 py-2.5 rounded-xl border border-pink-500/20 bg-[#130617]/70 backdrop-blur-sm">
                <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Focus</span>
                <span className="text-pink-300 font-bold">OCR · LLMs · RAG</span>
              </div>
              <div className="px-4 py-2.5 rounded-xl border border-pink-500/20 bg-[#130617]/70 backdrop-blur-sm">
                <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Tone</span>
                <span className="text-emerald-400 font-bold">No-Fluff Real Builds</span>
              </div>
            </div>
          </div>

          <p className="mt-8 text-base sm:text-lg font-light text-neutral-300/90 max-w-3xl leading-relaxed">
            Detailed technical write-ups from real production systems I have architected and deployed — dissecting dirty data recovery, OCR ensemble optimization, and synthetic fine-tuning loops.
          </p>
        </div>

        {/* Search, Filter & Posts Section */}
        <div className="border-t border-pink-500/15 pt-12">
          <BlogSearchFilter posts={posts} allTags={allTags} />
        </div>
      </div>
    </div>
  );
}
