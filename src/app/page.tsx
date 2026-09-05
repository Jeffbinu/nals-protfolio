import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ScanLine, BrainCircuit, Cpu, Network, Sparkles, CheckCircle2, Zap, Layers } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";
import { profile, projects } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";
import { MotionSection, MotionDiv } from "@/components/MotionSection";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: `${profile.name} — Data Scientist & ML Engineer | Production Systems`,
  description: profile.tagline,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const featuredProjects = projects.slice(0, 4);
  const recentPosts = getAllPosts().slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "#person",
        name: profile.name,
        jobTitle: profile.role,
        description: profile.tagline,
        email: `mailto:${profile.email}`,
        telephone: profile.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location,
          addressCountry: "IN",
        },
        sameAs: [
          profile.linkedin,
          profile.github,
        ],
        knowsAbout: [
          "Machine Learning",
          "Computer Vision",
          "Optical Character Recognition (OCR)",
          "Large Language Models (LLMs)",
          "Retrieval-Augmented Generation (RAG)",
          "Deep Learning",
          "PyTorch",
          "FastAPI",
          "Qdrant Vector Search",
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "SRKR Engineering College",
        },
        worksFor: {
          "@type": "Organization",
          name: "Populus Empowerment Network",
        },
      },
      {
        "@type": "WebSite",
        "@id": "#website",
        name: `${profile.name} — ${profile.role}`,
        description: profile.tagline,
        publisher: {
          "@id": "#person",
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <div className="text-white min-h-screen selection:bg-pink-500 selection:text-white relative bg-transparent">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ============================================================ */}
      {/* HERO SECTION — Staged Opening Entrance Animation             */}
      {/* Stage 1: Only the Name displays first                        */}
      {/* Stage 2: ~1s later, description and CTAs glide in gracefully  */}
      {/* ============================================================ */}
      <section className="min-h-screen w-full flex flex-col justify-center items-center text-center px-6 pt-28 pb-20 relative z-10 overflow-hidden">
        <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center">
          {/* Stage 1: Hero Name Displays First with Dramatic Reveal */}
          <h1
            className="anim-hero-name text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.7rem] 2xl:text-[6.5rem] font-heading font-extrabold tracking-tight leading-[0.92] mb-6 sm:mb-8 text-white uppercase select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)]"
            style={{ letterSpacing: "-0.035em" }}
          >
            Nalini <br />
            <span className="italic font-serif normal-case font-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-pink-200">
              Baddireddi
            </span>
          </h1>

          {/* Stage 2: In ~1 second, Description glides in */}
          <div className="anim-hero-delayed-1 flex flex-col md:flex-row items-center gap-6 md:gap-14 text-sm sm:text-base lg:text-lg font-light text-neutral-300/90 max-w-3xl mx-auto">
            <p className="md:text-right flex-1 leading-relaxed">
              Engineering production ML systems that turn messy scans, unstructured text, and news streams into reliable real-time answers.
            </p>
            <div className="w-px h-14 bg-gradient-to-b from-pink-500/50 via-pink-400/20 to-transparent hidden md:block shrink-0" />
            <p className="md:text-left flex-1 leading-relaxed">
              Data Scientist · LLMs &amp; Computer Vision. Based in Chennai, shipping distributed systems globally.
            </p>
          </div>

          {/* Stage 2: Action CTAs glide in */}
          <div className="anim-hero-delayed-2 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/work"
              className="border border-pink-400 bg-pink-500 text-white px-9 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest font-semibold hover:bg-pink-600 hover:shadow-[0_0_35px_rgba(255,45,117,0.6)] transition-all duration-300 flex items-center gap-2"
            >
              Explore Architecture <ArrowUpRight size={14} />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="border border-pink-500/35 bg-pink-500/10 backdrop-blur-sm px-9 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest text-pink-200 hover:bg-pink-500/25 hover:border-pink-400 hover:text-white transition-all duration-300"
            >
              Direct Email
            </a>
          </div>
        </div>

        {/* Scroll Indicator — Fades in last */}
        <div className="anim-hero-delayed-3 absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-pink-300/70">
            Scroll Down
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-pink-500/40 to-transparent relative overflow-hidden">
            <div
              className="w-full h-1/2 bg-gradient-to-b from-transparent via-pink-400 to-transparent shadow-[0_0_8px_#ff2d75]"
              style={{ animation: "scroll-slide 2s linear infinite" }}
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SUBSEQUENT SECTIONS — Translucent Backdrop over Fixed BG     */}
      {/* Background stays visible across every section as you scroll  */}
      {/* ============================================================ */}
      <div className="relative z-10">
        {/* ============================================================ */}
        {/* 01: SELECTED WORK — Wide Staggered 2-Column Grid            */}
        {/* ============================================================ */}
        <MotionSection className="py-32 sm:py-40 relative bg-transparent border-t border-pink-500/15 overflow-hidden">
          <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 2xl:px-24">
            {/* Section Header */}
            <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
              <SectionHeading
                number="01"
                eyebrow="Selected Work"
                title="Curated"
                italicSubtitle="Innovations"
                description="High-throughput neural architectures and production vision pipelines built for real-world enterprise scale — transforming noisy inputs into deterministic answers."
                className="!mb-0"
              />
              <div className="mb-2">
                <Link
                  href="/projects"
                  className="text-xs font-mono uppercase tracking-[0.25em] border-b border-pink-500/40 pb-2 text-pink-300 hover:text-white hover:border-pink-400 transition-all inline-flex items-center gap-1.5"
                >
                  View All 4 Projects <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            {/* Staggered 2-Column Grid with Expansive Width */}
            <div className="grid md:grid-cols-2 gap-10 md:gap-x-16 md:gap-y-36">
              {featuredProjects.map((project, index) => (
                <MotionDiv key={project.slug} delay={index * 0.12} direction="up">
                  <ProjectCard project={project} index={index} />
                </MotionDiv>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* ============================================================ */}
        {/* 02: CAPABILITIES & SERVICES — Elevated Architecture Cards    */}
        {/* ============================================================ */}
        <MotionSection className="py-32 sm:py-40 relative bg-transparent border-t border-pink-500/15 overflow-hidden">
          <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 2xl:px-24">
            <SectionHeading
              number="02"
              eyebrow="Capabilities"
              title="Engineering"
              italicSubtitle="Specialization"
              description="End-to-end technical mastery across computer vision, fine-tuned transformer architectures, and distributed real-time microservices."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
              {/* Specialization 01 */}
              <MotionDiv delay={0.05} direction="up" className="h-full">
                <div className="h-full border border-pink-500/20 rounded-2xl p-8 sm:p-10 bg-[#130617]/85 backdrop-blur-md flex flex-col justify-between hover:border-pink-500/50 hover:shadow-[0_0_40px_rgba(255,45,117,0.22)] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-colors pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between pb-6 mb-6 border-b border-pink-500/15 font-mono text-[11px] text-pink-300/80 uppercase tracking-wider">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
                        SPECIALIZATION // 01
                      </span>
                      <span className="text-[10px] text-neutral-400">CV &amp; ENSEMBLE OCR</span>
                    </div>

                    <div className="p-4 rounded-2xl border border-pink-500/30 bg-pink-500/10 w-fit mb-6 text-pink-400 group-hover:scale-110 group-hover:bg-pink-500/20 group-hover:shadow-[0_0_25px_rgba(255,45,117,0.4)] transition-all duration-500">
                      <ScanLine size={28} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white uppercase tracking-tight mb-4 group-hover:text-pink-300 transition-colors">
                      Document AI &amp; Vision Pipelines
                    </h3>
                    <p className="text-sm sm:text-base font-light text-neutral-300/85 leading-relaxed mb-6">
                      Ensemble OCR architectures pairing Tesseract, Surya, and PaddleOCR with customized OpenCV morphology preprocessing, de-skewing, and layout analysis to salvage low-resolution, noisy photocopies.
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {["OpenCV", "Tesseract", "PaddleOCR", "Surya OCR", "YOLO", "Deskew Filters"].map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-200 border border-pink-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-pink-500/15 flex items-center justify-between font-mono text-xs text-pink-300">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                      <Zap size={13} className="text-pink-400" /> 60M+ Records
                    </span>
                    <span className="text-[11px] text-neutral-400 uppercase tracking-widest">
                      100K / 90 Min
                    </span>
                  </div>
                </div>
              </MotionDiv>

              {/* Specialization 02 */}
              <MotionDiv delay={0.15} direction="up" className="h-full">
                <div className="h-full border border-pink-500/20 rounded-2xl p-8 sm:p-10 bg-[#130617]/85 backdrop-blur-md flex flex-col justify-between hover:border-pink-500/50 hover:shadow-[0_0_40px_rgba(255,45,117,0.22)] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-colors pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between pb-6 mb-6 border-b border-pink-500/15 font-mono text-[11px] text-pink-300/80 uppercase tracking-wider">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
                        SPECIALIZATION // 02
                      </span>
                      <span className="text-[10px] text-neutral-400">SYNTHETIC INSTRUCTION</span>
                    </div>

                    <div className="p-4 rounded-2xl border border-pink-500/30 bg-pink-500/10 w-fit mb-6 text-rose-400 group-hover:scale-110 group-hover:bg-pink-500/20 group-hover:shadow-[0_0_25px_rgba(255,45,117,0.4)] transition-all duration-500">
                      <Cpu size={28} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white uppercase tracking-tight mb-4 group-hover:text-pink-300 transition-colors">
                      Domain LLM Fine-Tuning
                    </h3>
                    <p className="text-sm sm:text-base font-light text-neutral-300/85 leading-relaxed mb-6">
                      Synthetic data synthesis pipelines leveraging GPT APIs to construct clean instruction-tuning datasets from internal enterprise schemas, powering fine-tuned Gemma 12B models deployed for private Q&amp;A.
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {["Gemma 12B", "PyTorch", "HuggingFace", "LoRA / QLoRA", "Synthetic Data", "LangChain"].map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-200 border border-pink-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-pink-500/15 flex items-center justify-between font-mono text-xs text-rose-300">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                      <Zap size={13} className="text-rose-400" /> 12B Parameters
                    </span>
                    <span className="text-[11px] text-neutral-400 uppercase tracking-widest">
                      4-Bit Quantized
                    </span>
                  </div>
                </div>
              </MotionDiv>

              {/* Specialization 03 */}
              <MotionDiv delay={0.25} direction="up" className="h-full">
                <div className="h-full border border-pink-500/20 rounded-2xl p-8 sm:p-10 bg-[#130617]/85 backdrop-blur-md flex flex-col justify-between hover:border-pink-500/50 hover:shadow-[0_0_40px_rgba(255,45,117,0.22)] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-fuchsia-500/10 rounded-full blur-2xl group-hover:bg-fuchsia-500/20 transition-colors pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between pb-6 mb-6 border-b border-pink-500/15 font-mono text-[11px] text-pink-300/80 uppercase tracking-wider">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
                        SPECIALIZATION // 03
                      </span>
                      <span className="text-[10px] text-neutral-400">VECTOR RETRIEVAL</span>
                    </div>

                    <div className="p-4 rounded-2xl border border-pink-500/30 bg-pink-500/10 w-fit mb-6 text-pink-300 group-hover:scale-110 group-hover:bg-pink-500/20 group-hover:shadow-[0_0_25px_rgba(255,45,117,0.4)] transition-all duration-500">
                      <Network size={28} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white uppercase tracking-tight mb-4 group-hover:text-pink-300 transition-colors">
                      Multimodal RAG &amp; Microservices
                    </h3>
                    <p className="text-sm sm:text-base font-light text-neutral-300/85 leading-relaxed mb-6">
                      Cross-source neural retrieval indexing Tamil daily newspapers, web articles, and Whisper speech-to-text transcripts with Qdrant vector database (HNSW indexing) and asynchronous FastAPI microservices.
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {["Qdrant", "Whisper", "FastAPI", "Docker", "Docker-Compose", "Neo4j"].map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-200 border border-pink-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-pink-500/15 flex items-center justify-between font-mono text-xs text-pink-300">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                      <Zap size={13} className="text-pink-400" /> &lt; 50ms Latency
                    </span>
                    <span className="text-[11px] text-neutral-400 uppercase tracking-widest">
                      Async Microservices
                    </span>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </MotionSection>

        {/* ============================================================ */}
        {/* 03: THE ENGINEER / PHILOSOPHY & IMPACT — Full-Width Showcase  */}
        {/* ============================================================ */}
        <MotionSection id="about" className="py-32 sm:py-40 relative bg-transparent border-t border-pink-500/15 overflow-hidden">
          <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 2xl:px-24">
            <SectionHeading
              number="03"
              eyebrow="The Engineer &amp; Scientist"
              title="Turning noise"
              italicSubtitle="into clarity."
              className="!mb-14"
            />

            {/* Haute Couture Pull-Quote Card */}
            <MotionDiv direction="scale" delay={0.1}>
              <div className="relative rounded-2xl border border-pink-500/25 bg-[#130617]/85 backdrop-blur-md p-8 sm:p-14 lg:p-16 shadow-[0_0_50px_rgba(255,45,117,0.16)] overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                  <span className="text-6xl sm:text-8xl font-serif text-pink-500/35 select-none leading-none -mt-4">
                    &ldquo;
                  </span>
                  <div className="space-y-4">
                    <blockquote className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-white leading-snug tracking-tight">
                      Production machine learning is never just training a model in a notebook. It is mastering dirty data, salvaging broken pixels, tuning OCR ensembles to cut latency from hours to minutes, and deploying resilient systems that deliver under real-world pressure.
                    </blockquote>
                    <p className="font-mono text-xs uppercase tracking-widest text-pink-400 pt-2 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulse" />
                      Nalini Baddireddi // Lead Architecture Philosophy
                    </p>
                  </div>
                </div>
              </div>
            </MotionDiv>

            {/* Deep Narrative Storytelling Grid */}
            <div className="mt-12 grid md:grid-cols-2 gap-8 text-base sm:text-lg font-light text-neutral-300/90 leading-relaxed">
              <p>
                With over four years of deploying machine learning systems in high-stakes environments, my focus is bridging the gap between cutting-edge research models and resilient enterprise microservices. When training data is corrupted or documents are poorly scanned, conventional architectures break down. My systems are architected to anticipate entropy.
              </p>
              <p>
                From fine-tuning open-source Gemma 12B models for private enterprise inference to architecting sub-50ms cross-source vector search across millions of records, I design software where mathematical precision meets bulletproof production reliability.
              </p>
            </div>

            {/* 4-Grid Glowing Metric Highlight Cards */}
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-pink-500/15">
              {[
                { value: "60M+", label: "Records", detail: "Processed at scale", badge: "HIGH THROUGHPUT" },
                { value: "90 min", label: "Extraction", detail: "Per 100K records", badge: "20X SPEEDUP" },
                { value: "04", label: "Years", detail: "Production ML", badge: "END-TO-END" },
                { value: "100%", label: "Reliability", detail: "Mission-critical uptime", badge: "ZERO DOWNTIME" },
              ].map((stat, i) => (
                <MotionDiv key={stat.label} delay={i * 0.08} direction="up">
                  <div className="p-6 sm:p-8 rounded-xl border border-pink-500/15 bg-[#130617]/50 backdrop-blur-sm hover:border-pink-500/40 hover:shadow-[0_0_25px_rgba(255,45,117,0.18)] transition-all duration-500 group">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-pink-400/80 px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20 inline-block mb-3">
                      {stat.badge}
                    </span>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-pink-400 group-hover:from-pink-300 group-hover:to-pink-500 transition-all duration-300">
                      {stat.value}
                    </p>
                    <p className="font-mono text-xs uppercase tracking-widest text-pink-300 mt-2">
                      {stat.label}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      {stat.detail}
                    </p>
                  </div>
                </MotionDiv>
              ))}
            </div>

            {/* 3 Core Architectural Pillars */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {[
                {
                  code: "01 // INGESTION & HYGIENE",
                  title: "Dirty Data Mastery",
                  desc: "Real enterprise data is dirty, compressed, and fragmented. I build custom contour segmenters, deskew filters, and synthetic augmentations that turn broken inputs into pristine training and inference payloads.",
                },
                {
                  code: "02 // INFERENCE AT SCALE",
                  title: "Sub-50ms Serving",
                  desc: "Models are only as good as their latency. Utilizing 4-bit/8-bit quantization, Qdrant HNSW indexing, and asynchronous FastAPI microservices, I ship endpoints built for continuous enterprise loads.",
                },
                {
                  code: "03 // RESILIENT DEPLOYMENT",
                  title: "Deterministic Outputs",
                  desc: "Generative systems require guardrails. I engineer structured JSON schemas, hallucination verifiers, and multi-step sanity checks to ensure mission-critical decision support.",
                },
              ].map((pillar, pIdx) => (
                <MotionDiv key={pillar.code} delay={pIdx * 0.1} direction="up">
                  <div className="p-8 sm:p-10 rounded-xl border border-pink-500/15 bg-[#130617]/40 backdrop-blur-sm hover:border-pink-500/35 transition-colors h-full">
                    <div className="font-mono text-xs text-pink-400 font-bold uppercase tracking-widest mb-3">
                      {pillar.code}
                    </div>
                    <h4 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 uppercase">
                      {pillar.title}
                    </h4>
                    <p className="text-sm font-light text-neutral-300/80 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* ============================================================ */}
        {/* 04: FIELD NOTES / WRITING & ESSAYS                           */}
        {/* ============================================================ */}
        <MotionSection className="py-32 sm:py-40 relative bg-transparent border-t border-pink-500/15 overflow-hidden">
          <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 2xl:px-24">
            <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
              <SectionHeading
                number="04"
                eyebrow="Writing"
                title="Field Notes &amp;"
                italicSubtitle="Architecture"
                description="Technical deep-dives into LLM fine-tuning, OCR pipeline performance, and real-world vector database latency optimization."
                className="!mb-0"
              />
              <Link
                href="/blog"
                className="text-xs font-mono uppercase tracking-[0.25em] border-b border-pink-500/40 pb-2 text-pink-300 hover:text-white hover:border-pink-400 transition-all inline-flex items-center gap-1.5 mb-2"
              >
                All Articles <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="space-y-4">
              {recentPosts.map((post, pIdx) => (
                <MotionDiv key={post.slug} delay={pIdx * 0.1} direction="up">
                  <BlogCard post={post} />
                </MotionDiv>
              ))}
            </div>
          </div>
        </MotionSection>
      </div>

      {/* Floating Scroll to Top Pill */}
      <ScrollToTop />
    </div>
  );
}
