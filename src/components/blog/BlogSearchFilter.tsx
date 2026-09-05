"use client";

import { useState, useMemo } from "react";
import { Search, X, Filter } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { BlogCard } from "@/components/BlogCard";

export function BlogSearchFilter({
  posts,
  allTags,
}: {
  posts: PostMeta[];
  allTags: string[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag =
        selectedTag === "All" || (post.tags && post.tags.includes(selectedTag));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags?.some((t) => t.toLowerCase().includes(query));

      return matchesTag && matchesSearch;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="space-y-10">
      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-8 border-b border-pink-500/15">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-400/80 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search field notes, OCR, LLMs, RAG..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-[#130617]/80 border border-pink-500/20 rounded-xl text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="font-mono text-xs text-pink-300/80 flex items-center gap-2 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulse" />
          <span>Showing {filteredPosts.length} of {posts.length} Essays</span>
        </div>
      </div>

      {/* Tag Pills Row */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 mr-2 flex items-center gap-1.5">
          <Filter size={12} className="text-pink-400" /> Topics:
        </span>
        <button
          onClick={() => setSelectedTag("All")}
          className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
            selectedTag === "All"
              ? "bg-pink-500 text-white shadow-[0_0_15px_rgba(255,45,117,0.4)] border border-pink-400 font-semibold"
              : "bg-pink-500/5 border border-pink-500/15 text-neutral-300 hover:text-white hover:border-pink-500/35 hover:bg-pink-500/10"
          }`}
        >
          All Topics
        </button>
        {allTags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                isSelected
                  ? "bg-pink-500 text-white shadow-[0_0_15px_rgba(255,45,117,0.4)] border border-pink-400 font-semibold"
                  : "bg-pink-500/5 border border-pink-500/15 text-neutral-300 hover:text-white hover:border-pink-500/35 hover:bg-pink-500/10"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Posts List */}
      {filteredPosts.length > 0 ? (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border border-pink-500/15 rounded-2xl bg-[#130617]/50 backdrop-blur-sm">
          <p className="font-mono text-sm text-neutral-400 mb-4">
            No engineering notes found matching &ldquo;{searchQuery || selectedTag}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("All");
            }}
            className="px-4 py-2 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-300 font-mono text-xs hover:bg-pink-500/20 hover:text-white transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
