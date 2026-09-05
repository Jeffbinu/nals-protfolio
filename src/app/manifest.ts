import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nalini Baddireddi — Data Scientist & ML Engineer",
    short_name: "Nalini Baddireddi",
    description:
      "Production machine learning systems portfolio & field notes: 60M+ OCR pipelines, LLM fine-tuning, and RAG architectures.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a040d",
    theme_color: "#ff2d75",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
