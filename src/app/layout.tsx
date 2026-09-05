import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) }
    : {}),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description:
    "Production machine learning systems portfolio & engineering notes. Specializing in 60M+ OCR pipelines, LLM fine-tuning, and low-latency RAG architectures.",
  keywords: [
    "Nalini Baddireddi",
    "Data Scientist",
    "Machine Learning Engineer",
    "Computer Vision",
    "Production OCR",
    "Large Language Models",
    "LLM Fine-Tuning",
    "Gemma 12B",
    "Retrieval-Augmented Generation",
    "RAG Architecture",
    "Qdrant",
    "FastAPI",
    "PyTorch",
    "AI Engineer Portfolio",
    "Deep Learning Systems",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description:
      "Production machine learning systems: 60M+ record OCR pipelines, fine-tuned LLMs, and real-time RAG architectures.",
    siteName: `${profile.name} Portfolio & Field Notes`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description:
      "Production machine learning systems: 60M+ record OCR pipelines, fine-tuned LLMs, and real-time RAG architectures.",
  },
  category: "technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col relative bg-[#0a040d] text-white selection:bg-pink-500 selection:text-white">
        <AnimatedBackground />
        <NoiseOverlay />
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
