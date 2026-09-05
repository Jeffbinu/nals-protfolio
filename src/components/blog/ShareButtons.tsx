"use client";

import { useState } from "react";
import { Link2, Check, Share2 } from "lucide-react";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : `/blog/${slug}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`"${title}" by Nalini Baddireddi`);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex items-center gap-2 pt-2">
      <button
        onClick={copyToClipboard}
        className="px-3 py-1.5 rounded-lg border border-pink-500/20 bg-pink-500/10 hover:bg-pink-500/20 hover:border-pink-500/40 text-pink-200 text-xs font-mono transition-all flex items-center gap-1.5"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check size={13} className="text-emerald-400" />
            <span className="text-emerald-300">Link Copied!</span>
          </>
        ) : (
          <>
            <Link2 size={13} className="text-pink-400" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <button
        onClick={shareToTwitter}
        className="px-3 py-1.5 rounded-lg border border-pink-500/20 bg-pink-500/5 hover:bg-pink-500/15 hover:border-pink-500/40 text-neutral-300 hover:text-white text-xs font-mono transition-all"
        title="Share to X"
      >
        X / Twitter
      </button>

      <button
        onClick={shareToLinkedIn}
        className="px-3 py-1.5 rounded-lg border border-pink-500/20 bg-pink-500/5 hover:bg-pink-500/15 hover:border-pink-500/40 text-neutral-300 hover:text-white text-xs font-mono transition-all"
        title="Share to LinkedIn"
      >
        LinkedIn
      </button>
    </div>
  );
}
