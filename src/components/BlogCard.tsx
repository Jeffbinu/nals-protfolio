import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, BookOpen } from "lucide-react";
import type { PostMeta } from "@/lib/blog";

export function BlogCard({ post }: { post: PostMeta }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block p-6 sm:p-8 rounded-2xl border border-pink-500/15 bg-[#130617]/70 backdrop-blur-md hover:border-pink-500/45 hover:shadow-[0_0_35px_rgba(255,45,117,0.2)] hover:bg-[#180820] transition-all duration-300 relative overflow-hidden"
    >
      {/* Subtle top-right ambient glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-colors pointer-events-none" />

      {/* Top telemetry bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-pink-500/10 font-mono text-xs text-pink-300/80">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-neutral-400">
            <Calendar size={13} className="text-pink-400" />
            {date}
          </span>
          <span className="h-1 w-1 rounded-full bg-pink-500/40" />
          <span className="flex items-center gap-1.5 text-neutral-400">
            <Clock size={13} className="text-pink-400" />
            {post.readingTime}
          </span>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-widest text-pink-400/90 font-semibold px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20">
          ENGINEERING_NOTE
        </span>
      </div>

      {/* Title & Arrow */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-white group-hover:text-pink-300 transition-colors uppercase tracking-tight leading-snug">
          {post.title}
        </h2>
        <div className="w-10 h-10 rounded-full border border-pink-500/25 bg-pink-500/10 text-pink-300 flex items-center justify-center shrink-0 group-hover:bg-pink-500 group-hover:text-white group-hover:border-pink-400 group-hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,45,117,0.2)]">
          <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base font-light text-neutral-300/85 leading-relaxed max-w-3xl mb-6">
        {post.description}
      </p>

      {/* Tags Row */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-200 border border-pink-500/20"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto text-xs font-mono text-pink-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Read Case Study →
          </span>
        </div>
      )}
    </Link>
  );
}
