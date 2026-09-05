# Nalini Baddireddi — Portfolio Site

A Next.js (App Router) portfolio site for a data scientist / ML engineer, built around a résumé-style landing page, a detailed work/experience page, a projects page, and an MDX-powered blog.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** — theme tokens defined in `src/app/globals.css`
- **MDX blog** via `gray-matter` (frontmatter) + `next-mdx-remote/rsc` (rendering), content lives in `content/blog/*.mdx`
- Self-hosted fonts via `@fontsource` (Inter for body, Fraunces for display/headings) — no external font requests at build or runtime
- `lucide-react` for icons

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project structure

```
content/blog/*.mdx        — blog posts (frontmatter: title, description, date, tags)
src/app/                  — routes (page.tsx per route)
  page.tsx                — landing page
  about/page.tsx
  work/page.tsx
  projects/page.tsx
  blog/page.tsx            — blog index
  blog/[slug]/page.tsx      — individual post (statically generated)
src/components/           — shared UI (Header, Footer, cards, timeline, etc.)
src/lib/data.ts           — ALL résumé content: profile, tech stack, experience, projects, education
src/lib/blog.ts           — reads/parses MDX files from content/blog
```

## Editing content

- **Bio, experience, projects, tech stack, education** all live in one place: `src/lib/data.ts`. Edit the exported objects/arrays there — every page pulls from this file, so a change propagates everywhere it's used.
- **Blog posts**: add a new `.mdx` file to `content/blog/` with this frontmatter shape:

  ```mdx
  ---
  title: "Post title"
  description: "One-sentence summary shown on cards and in <meta>."
  date: "2026-09-04"
  tags: ["Tag One", "Tag Two"]
  ---

  Your MDX content here.
  ```

  The post is picked up automatically by the blog index and gets a static route at `/blog/<filename-without-extension>`.

## Theme

Colors, fonts, and the `prose-portfolio` (blog typography) styles are defined in `src/app/globals.css` as CSS custom properties, consumed via Tailwind v4's `@theme inline`. The palette is a warm, near-neutral base (off-white / deep plum) with a refined magenta-pink used as an accent — light and dark mode variants are both defined. To restyle, start there.

## Notes / next steps

- Replace the placeholder `linkedin`/`github` URLs and profile photo (none is included yet) in `src/lib/data.ts` / add an `<Image>` to the hero if desired.
- `metadataBase` in `src/app/layout.tsx` is a placeholder domain — update it once the site has a real domain, and add a matching Open Graph image.
- This is a frontend-only build (per the original brief) — no CMS or backend. Blog posts are managed as MDX files in git.
