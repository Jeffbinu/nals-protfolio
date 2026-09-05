// Central content store for the site — derived from Nalini Baddireddi's résumé.
// Editing this file updates the Home, About, Work, and Projects pages.

export const profile = {
  name: "Nalini Baddireddi",
  role: "Data Scientist — LLM Systems & Computer Vision",
  tagline:
    "I build production ML systems that turn messy real-world data — scanned documents, news streams, unstructured text — into reliable, real-time answers.",
  location: "Chennai, India",
  email: "nalini.baddireddi@gmail.com",
  phone: "+91 9059928806",
  linkedin: "https://linkedin.com/in/nalini-baddireddi-a57914108",
  github: "https://github.com/",
  yearsExperience: 4,
  summary:
    "Data Scientist with 4 years of production experience building LLM-powered and computer vision systems. I specialize in end-to-end delivery — data ingestion and preprocessing, embedding model selection, LangChain agent orchestration, FastAPI deployment, and real-time dashboards — and I ship independently across the full ML stack, from a rough dataset to a service running in front of real users.",
  highlights: [
    { label: "Records processed", value: "60M+", detail: "voter roll OCR pipeline" },
    { label: "Extraction speed", value: "90 min", detail: "per 100K records, optimized" },
    { label: "Production years", value: "4", detail: "shipping ML end-to-end" },
    { label: "LLM to CV", value: "Full stack", detail: "RAG, fine-tuning, OCR, vision" },
  ],
};

export type TechCategory = {
  category: string;
  items: string[];
};

export const techStack: TechCategory[] = [
  {
    category: "Languages & Databases",
    items: ["Python", "SQL", "MongoDB", "Neo4j (Cypher)", "Qdrant (Vector DB)", "MySQL"],
  },
  {
    category: "AI / ML",
    items: ["LLMs", "LangChain", "RAG", "PyTorch", "Fine-tuning", "Prompt Engineering"],
  },
  {
    category: "Backend & APIs",
    items: ["FastAPI", "MCP (Model Context Protocol)", "n8n", "REST APIs"],
  },
  {
    category: "Computer Vision",
    items: ["OpenCV", "OCR (Tesseract, Surya, PaddleOCR)", "YOLO", "HuggingFace"],
  },
  {
    category: "DevOps & Infra",
    items: ["Docker", "Git", "Microservices", "Plotly Dash"],
  },
];

export type Initiative = {
  title: string;
  bullets: string[];
};

export type Role = {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  initiatives: Initiative[];
};

export const experience: Role[] = [
  {
    title: "Associate Data Scientist",
    company: "Populus Empowerment Network",
    location: "Chennai, India",
    start: "Aug 2024",
    end: "Present",
    current: true,
    summary:
      "Own end-to-end delivery across large-scale OCR pipelines, LLM classification systems, and domain-specific model fine-tuning.",
    initiatives: [
      {
        title: "Voter Roll Parsing Pipeline",
        bullets: [
          "Architected and deployed large-scale voter data extraction pipelines processing 60+ million records, forming the data backbone for downstream analytics.",
          "Improved extraction accuracy for Tamil text by combining Tesseract, Surya OCR, and Paddle OCR engines with OpenCV-based image preprocessing (de-skewing, noise removal, contrast enhancement).",
          "Containerized the pipeline using Docker microservices to enable parallelized, distributed processing, and built an adaptive OCR selection strategy to optimize accuracy vs. speed across varying document formats.",
          "Optimized code to perform extraction of 1 lakh (100,000) records in 90 minutes.",
        ],
      },
      {
        title: "News Sentiment & Classification Engine",
        bullets: [
          "Built an LLM-powered news classification pipeline using the Grok API to determine sentiment — favourable, neutral, or critical — toward specific categories.",
          "Designed a dual-classification system that simultaneously categorizes articles by topic and leaning, enabling multi-dimensional content analysis at scale.",
          "Implemented named entity recognition (NER) to detect categories and affiliated organizations before passing content to the LLM classifier, improving classification precision.",
          "Stored classification results in MongoDB with source metadata, enabling longitudinal trend analysis on media coverage over time.",
        ],
      },
      {
        title: "Domain-Specific LLM Fine-Tuning",
        bullets: [
          "Built a synthetic data generation pipeline using GPT APIs to create instruction–response datasets from structured data through prompt engineering.",
          "Fine-tuned an open-source Gemma 12B LLM on the generated instruction dataset for domain-specific question answering, benchmarking its responses against the base model.",
          "Developed preprocessing and dataset validation pipelines to improve the quality and consistency of instruction-tuning data prior to fine-tuning.",
          "Deployed the fine-tuned model through a FastAPI inference service for interactive question answering.",
        ],
      },
    ],
  },
  {
    title: "Junior Data Scientist",
    company: "Populus Empowerment Network",
    location: "Chennai, India",
    start: "Aug 2022",
    end: "Jul 2024",
    summary:
      "Built multilingual RAG systems and the data infrastructure behind real-time analytics dashboards.",
    initiatives: [
      {
        title: "Multi-Source Multilingual News RAG System",
        bullets: [
          "Built a document layout analysis pipeline using YOLO for multilingual newspaper article detection and evaluation.",
          "Integrated Tamil Whisper ASR with automatic audio segmentation to transcribe and index social media news videos.",
          "Developed a RAG pipeline using Qdrant and OpenAI text-embedding-3-large to enable cross-source semantic retrieval across newspapers, blogs, and videos.",
          "Built a FastAPI backend with metadata filtering, semantic search, LLM-generated summaries, and article recommendations.",
        ],
      },
      {
        title: "Data Dashboards & Backend Infrastructure",
        bullets: [
          "Built interactive, real-time data dashboards using Plotly Dash with dynamic charts, drill-down filters, and responsive layouts.",
          "Architected a multi-database ecosystem: relational schemas in MySQL, flexible document models in MongoDB, and graph-structured schemas in Neo4j using Cypher queries.",
          "Designed end-to-end ETL pipelines connecting backend databases to Dash frontend components, handling data transformation, query optimization, and error management.",
        ],
      },
    ],
  },
];

export type Education = {
  degree: string;
  school: string;
  start: string;
  end: string;
  coursework: string[];
};

export const education: Education[] = [
  {
    degree: "Bachelor of Technology (B.Tech), Computer Science Engineering",
    school: "SRKR Engineering College",
    start: "Jun 2018",
    end: "May 2022",
    coursework: ["Machine Learning", "Data Structures & Algorithms", "Database Systems", "Statistics"],
  },
];

export type Project = {
  slug: string;
  title: string;
  period: string;
  role: string;
  summary: string;
  problem: string;
  bullets: string[];
  tags: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "voter-roll-parsing-pipeline",
    title: "Voter Roll Parsing Pipeline",
    period: "2024 — Present",
    role: "Associate Data Scientist",
    summary:
      "A distributed OCR pipeline that turns 60M+ scanned voter roll records into clean, structured data for downstream analytics.",
    problem:
      "Government voter rolls arrive as scanned, inconsistently formatted Tamil-language documents — no single OCR engine handled the variety of layouts and print quality reliably at scale.",
    bullets: [
      "Combined Tesseract, Surya OCR, and PaddleOCR behind an adaptive selection strategy that picks the best engine per document based on format and quality.",
      "Built OpenCV preprocessing (de-skewing, noise removal, contrast enhancement) to lift extraction accuracy on degraded scans.",
      "Containerized the full pipeline as Docker microservices for parallelized, distributed processing across 60+ million records.",
      "Tuned the pipeline to extract 100,000 records in 90 minutes — a step change over the original single-engine approach.",
    ],
    tags: ["OCR", "OpenCV", "Docker", "Tesseract", "Surya OCR", "PaddleOCR", "Python"],
    featured: true,
  },
  {
    slug: "news-sentiment-classification-engine",
    title: "News Sentiment & Classification Engine",
    period: "2024 — Present",
    role: "Associate Data Scientist",
    summary:
      "An LLM-powered pipeline that classifies news coverage by topic and sentiment, enabling longitudinal media trend analysis.",
    problem:
      "Stakeholders needed to understand not just what topics the news was covering, but how favourably specific categories and organizations were being portrayed — at a volume no manual process could sustain.",
    bullets: [
      "Designed a dual-classification system tagging articles simultaneously by topic and sentiment leaning (favourable / neutral / critical).",
      "Added a named entity recognition (NER) pre-pass to detect categories and organizations before LLM classification, improving precision.",
      "Built the classification pipeline on the Grok API with structured prompt design for consistent, parseable outputs.",
      "Persisted results in MongoDB with source metadata to support trend analysis over time.",
    ],
    tags: ["LLM", "NER", "MongoDB", "Prompt Engineering", "Grok API"],
    featured: true,
  },
  {
    slug: "domain-specific-llm-fine-tuning",
    title: "Domain-Specific LLM Fine-Tuning",
    period: "2024 — Present",
    role: "Associate Data Scientist",
    summary:
      "A synthetic-data-to-deployment pipeline that fine-tunes an open-source Gemma 12B model for domain-specific Q&A.",
    problem:
      "Off-the-shelf LLMs lacked the domain grounding needed for accurate question answering on internal structured data, and no labeled instruction dataset existed to fine-tune on.",
    bullets: [
      "Built a synthetic data generation pipeline using GPT APIs to create instruction–response pairs from structured data via prompt engineering.",
      "Fine-tuned an open-source Gemma 12B model on the generated dataset and benchmarked outputs against the base model.",
      "Built preprocessing and validation pipelines to keep instruction-tuning data clean and consistent.",
      "Shipped the fine-tuned model behind a FastAPI inference service for interactive Q&A.",
    ],
    tags: ["LLM Fine-Tuning", "Gemma", "FastAPI", "Synthetic Data", "PyTorch"],
    featured: true,
  },
  {
    slug: "multilingual-news-rag-system",
    title: "Multi-Source Multilingual News RAG System",
    period: "2022 — 2024",
    role: "Junior Data Scientist",
    summary:
      "A cross-source retrieval-augmented generation system unifying semantic search across newspapers, blogs, and video transcripts.",
    problem:
      "Relevant coverage of a story was scattered across print newspapers, blog posts, and social video — with no way to search across all three by meaning rather than keyword.",
    bullets: [
      "Built a YOLO-based document layout analysis pipeline for multilingual newspaper article detection.",
      "Integrated Tamil Whisper ASR with automatic audio segmentation to transcribe and index social media news videos.",
      "Built a RAG pipeline on Qdrant with OpenAI text-embedding-3-large for cross-source semantic retrieval.",
      "Shipped a FastAPI backend with metadata filtering, semantic search, LLM summaries, and recommendations.",
    ],
    tags: ["RAG", "Qdrant", "YOLO", "Whisper ASR", "FastAPI", "Embeddings"],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

export const socials = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "LinkedIn", href: profile.linkedin },
];
