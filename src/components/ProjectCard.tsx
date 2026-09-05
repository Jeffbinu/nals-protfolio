import Link from "next/link";
import { ArrowUpRight, ScanLine, BrainCircuit, Cpu, Network, Layers, Sparkles } from "lucide-react";
import type { Project } from "@/lib/data";

function getProjectVisualIcon(tags: string[]) {
  const str = tags.join(" ").toLowerCase();
  if (str.includes("ocr") || str.includes("opencv")) return <ScanLine size={32} className="text-pink-400 group-hover:scale-110 transition-transform duration-500" />;
  if (str.includes("fine-tuning") || str.includes("gemma")) return <Cpu size={32} className="text-rose-400 group-hover:scale-110 transition-transform duration-500" />;
  if (str.includes("rag") || str.includes("qdrant")) return <Network size={32} className="text-fuchsia-400 group-hover:scale-110 transition-transform duration-500" />;
  if (str.includes("grok") || str.includes("sentiment")) return <BrainCircuit size={32} className="text-pink-300 group-hover:scale-110 transition-transform duration-500" />;
  return <Layers size={32} className="text-pink-400" />;
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isOdd = index % 2 !== 0;
  const num = String(index + 1).padStart(2, "0");
  const icon = getProjectVisualIcon(project.tags);

  return (
    <div className={`group cursor-pointer transition-all duration-500 ${isOdd ? "md:mt-24" : ""}`}>
      <Link href={`/projects/${project.slug}`} id={project.slug} className="block">
        {/* Card Canvas Visual with Barbiecore Pink Ambient Glow */}
        <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-6 bg-[#130617] border border-pink-500/15 flex flex-col justify-between p-6 transition-all duration-700 group-hover:border-pink-500/45 group-hover:shadow-[0_0_40px_rgba(255,45,117,0.22)] group-hover:bg-[#18081f]">
          {/* Subtle Barbie grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #ff2d75 1px, transparent 1px),
                linear-gradient(to bottom, #ff2d75 1px, transparent 1px)
              `,
              backgroundSize: "28px 28px",
            }}
          />

          {/* Ambient soft pink glow blob */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-pink-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-pink-500/20 transition-all duration-700" />

          {/* Top telemetry row */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-pink-300/70">
            <span className="flex items-center gap-1.5 uppercase tracking-wider text-pink-300">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulse" />
              {num} // PRODUCTION_ML
            </span>
            <span className="text-[10px] tracking-widest text-neutral-500">{project.period}</span>
          </div>

          {/* Center Graphic Icon Space */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto py-6">
            <div className="p-5 rounded-2xl border border-pink-500/20 bg-pink-500/5 backdrop-blur-md group-hover:border-pink-500/40 group-hover:bg-pink-500/15 group-hover:shadow-[0_0_30px_rgba(255,45,117,0.3)] transition-all duration-500">
              {icon}
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-1.5 max-w-xs">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-300/90 border border-pink-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Hover center floating arrow button */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 pointer-events-none backdrop-blur-[2px]">
            <div className="bg-pink-500 text-white p-4 rounded-full border border-pink-300 scale-50 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_25px_rgba(255,45,117,0.8)]">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>

          {/* Bottom telemetry detail */}
          <div className="relative z-10 flex items-center justify-between border-t border-pink-500/10 pt-3 font-mono text-[10px] text-neutral-400">
            <span>ROLE: {project.role}</span>
            <span className="text-pink-400 font-semibold group-hover:translate-x-1 transition-transform">
              EXPLORE CASE STUDY →
            </span>
          </div>
        </div>

        {/* Bottom meta info matching reference site */}
        <div className="flex justify-between items-baseline border-t border-pink-500/15 pt-5">
          <div className="pr-4">
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight text-white mb-2 group-hover:text-pink-400 transition-colors uppercase">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-neutral-400 leading-relaxed max-w-lg">
              {project.summary}
            </p>
          </div>
          <span className="font-mono text-xs text-pink-400 font-semibold shrink-0 uppercase tracking-wider">
            {project.tags[0]}
          </span>
        </div>
      </Link>
    </div>
  );
}
