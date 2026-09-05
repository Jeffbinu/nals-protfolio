import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Mail,
  Bookmark,
  Share2,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllSlugs,
  getPostBySlug,
  getAdjacentPosts,
  getRelatedPosts,
} from "@/lib/blog";
import { profile } from "@/lib/data";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { PointsNavigation, MobilePointsNavigation } from "@/components/blog/PointsNavigation";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { BlogCard } from "@/components/BlogCard";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

async function resolvePost(slug: string) {
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return post;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `/blog/${slug}`;

  return {
    title: `${post.title} — ${profile.name}`,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} — ${profile.name}`,
      description: post.description,
      siteName: `${profile.name} Engineering Notes`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      section: post.tags[0] || "Machine Learning",
      authors: [profile.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — ${profile.name}`,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await resolvePost(slug);
  const { prev: prevPost, next: nextPost } = getAdjacentPosts(slug);
  const relatedPosts = getRelatedPosts(slug, post.tags, 2);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.tags[0] || "Machine Learning",
    timeRequired: post.readingTime,
    wordCount: post.content.split(/\s+/).length,
    author: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
    },
    keywords: post.tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/blog/${slug}`,
    },
    inLanguage: "en-US",
  };

  // Custom MDX Components that inject anchor IDs for the points navigation
  const mdxComponents = {
    h2: ({ children, ...props }: any) => {
      const text = typeof children === "string" ? children : String(children);
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h2 id={id} className="scroll-mt-28 group relative flex items-baseline justify-between" {...props}>
          <span>{children}</span>
          <a
            href={`#${id}`}
            className="opacity-0 group-hover:opacity-100 text-pink-400/70 hover:text-pink-300 ml-3 transition-opacity font-mono text-sm font-normal"
            aria-label={`Link to section ${text}`}
          >
            #
          </a>
        </h2>
      );
    },
    h3: ({ children, ...props }: any) => {
      const text = typeof children === "string" ? children : String(children);
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h3 id={id} className="scroll-mt-28 group relative flex items-baseline justify-between" {...props}>
          <span>{children}</span>
          <a
            href={`#${id}`}
            className="opacity-0 group-hover:opacity-100 text-pink-400/70 hover:text-pink-300 ml-3 transition-opacity font-mono text-xs font-normal"
            aria-label={`Link to subsection ${text}`}
          >
            #
          </a>
        </h3>
      );
    },
  };

  return (
    <article className="bg-transparent text-white min-h-screen pt-32 pb-32 relative">
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Schema.org JSON-LD */}
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
          <Link href="/blog" className="hover:text-pink-300 transition-colors">
            Field Notes
          </Link>
          <span>/</span>
          <span className="text-pink-300 truncate max-w-xs sm:max-w-md">
            {post.tags[0] || "Article"}
          </span>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mb-16">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-pink-300/80 mb-6">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Calendar size={13} className="text-pink-400" />
              {formattedDate}
            </span>
            <span className="h-1 w-1 rounded-full bg-pink-500/50" />
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Clock size={13} className="text-pink-400" />
              {post.readingTime}
            </span>
            <span className="h-1 w-1 rounded-full bg-pink-500/50" />
            <span className="text-pink-400 uppercase tracking-widest font-semibold">
              {post.headings.length} Key Points
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-[1.08] text-white uppercase mb-6">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl font-light text-neutral-300/90 leading-relaxed max-w-3xl mb-8">
            {post.description}
          </p>

          {/* Tags & Author Pill */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-pink-500/15">
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-pink-500/10 text-pink-200 border border-pink-500/25"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-neutral-300">
              <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-[0_0_12px_rgba(255,45,117,0.5)]">
                NB
              </div>
              <div>
                <p className="text-white font-semibold">{profile.name}</p>
                <p className="text-[10px] text-pink-300/70">{profile.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* 2-Column Editorial Grid: Content + Points Navigation Sidebar */}
        <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">
          {/* Main Article Content */}
          <main className="min-w-0 max-w-3xl">
            {/* Mobile Points Navigation Toggle (hidden on lg screens) */}
            <MobilePointsNavigation headings={post.headings} />

            {/* Prose Content */}
            <div className="prose-portfolio">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* Share and Feedback Bar */}
            <div className="mt-16 pt-8 border-t border-pink-500/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold mb-1">
                    Share This Engineering Note
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Help other ML engineers build reliable production systems.
                  </p>
                </div>
                <ShareButtons title={post.title} slug={post.slug} />
              </div>
            </div>

            {/* Author Card */}
            <div className="mt-12 p-8 rounded-2xl border border-pink-500/20 bg-[#130617]/70 backdrop-blur-md relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-300 text-white flex items-center justify-center font-heading text-xl font-extrabold shrink-0 shadow-[0_0_25px_rgba(255,45,117,0.5)]">
                  NB
                </div>
                <div className="flex-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-pink-400 font-semibold block mb-1">
                    WRITTEN BY
                  </span>
                  <h3 className="text-lg font-heading font-bold text-white uppercase">
                    {profile.name}
                  </h3>
                  <p className="text-xs font-mono text-pink-300/80 mt-0.5">
                    {profile.role} · {profile.location}
                  </p>
                  <p className="text-sm font-light text-neutral-300/85 mt-2 leading-relaxed">
                    Building production ML systems at enterprise scale. Specializing in computer vision OCR, domain LLM fine-tuning, and low-latency microservices.
                  </p>
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="px-4 py-2.5 rounded-full border border-pink-400 bg-pink-500 text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-pink-600 transition-all shrink-0 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,45,117,0.4)]"
                >
                  <Mail size={13} />
                  Contact
                </a>
              </div>
            </div>

            {/* Adjacent Previous / Next Posts Navigation */}
            <div className="mt-12 pt-8 border-t border-pink-500/15 grid sm:grid-cols-2 gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group p-5 rounded-xl border border-pink-500/15 bg-[#130617]/50 hover:border-pink-500/35 hover:bg-[#180820] transition-all flex flex-col justify-between"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 flex items-center gap-1.5 mb-2 group-hover:text-pink-300 transition-colors">
                    <ArrowLeft size={12} /> Previous Essay
                  </span>
                  <h4 className="text-sm font-heading font-bold text-white uppercase group-hover:text-pink-300 transition-colors line-clamp-2">
                    {prevPost.title}
                  </h4>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group p-5 rounded-xl border border-pink-500/15 bg-[#130617]/50 hover:border-pink-500/35 hover:bg-[#180820] transition-all flex flex-col justify-between text-right sm:text-right"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 flex items-center justify-end gap-1.5 mb-2 group-hover:text-pink-300 transition-colors">
                    Next Essay <ArrowRight size={12} />
                  </span>
                  <h4 className="text-sm font-heading font-bold text-white uppercase group-hover:text-pink-300 transition-colors line-clamp-2">
                    {nextPost.title}
                  </h4>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </main>

          {/* Desktop Sticky Points Navigation Sidebar */}
          <aside className="hidden lg:block space-y-6 sticky top-28">
            <PointsNavigation headings={post.headings} />

            {/* Share & Meta Card */}
            <div className="p-6 rounded-2xl border border-pink-500/15 bg-[#130617]/80 backdrop-blur-md">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-3">
                Article Actions
              </span>
              <ShareButtons title={post.title} slug={post.slug} />

              <div className="mt-5 pt-4 border-t border-pink-500/15 space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span>Word Count</span>
                  <span className="text-white">{post.content.split(/\s+/).length} words</span>
                </div>
                <div className="flex justify-between">
                  <span>Reading Speed</span>
                  <span className="text-white">{post.readingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Topic</span>
                  <span className="text-pink-300 font-semibold">{post.tags[0]}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Field Notes Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-28 pt-16 border-t border-pink-500/20">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-pink-400 font-bold block mb-2">
                  CONTINUE READING
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white uppercase tracking-tight">
                  Related Field Notes
                </h3>
              </div>
              <Link
                href="/blog"
                className="text-xs font-mono uppercase tracking-widest text-pink-300 hover:text-white transition-colors"
              >
                View All Essays →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} post={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
