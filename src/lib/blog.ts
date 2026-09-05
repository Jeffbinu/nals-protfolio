import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO date string
  tags: string[];
  cover?: string;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTime: string;
};

export type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

export type Post = PostMeta & {
  content: string;
  headings: HeadingItem[];
};

export function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const rawText = match[2].trim();
    // Strip markdown formatting if any
    const text = rawText.replace(/[*_`]/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text, level });
  }
  return headings;
}

function getMdxFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
}

export function getAllPosts(): PostMeta[] {
  const files = getMdxFiles();

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as PostFrontmatter;

    return {
      ...frontmatter,
      slug,
      readingTime: readingTime(content).text,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  return {
    ...frontmatter,
    slug,
    readingTime: readingTime(content).text,
    content,
    headings: extractHeadings(content),
  };
}

export function getAllSlugs(): string[] {
  return getMdxFiles().map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags?.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    next: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
  };
}

export function getRelatedPosts(currentSlug: string, tags: string[] = [], limit = 2): PostMeta[] {
  const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug);
  if (!tags.length) return allPosts.slice(0, limit);

  return allPosts
    .map((p) => {
      const common = p.tags.filter((t) => tags.includes(t)).length;
      return { post: p, score: common };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}
