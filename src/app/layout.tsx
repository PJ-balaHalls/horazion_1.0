import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

// ──────────────────────────────────────────────
// Tipografia premium – Geist para legibilidade e performance
// ──────────────────────────────────────────────
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ──────────────────────────────────────────────
// Viewport – Configuração de performance e tema
// ──────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#161616" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
};

// ──────────────────────────────────────────────
// Metadata – Arquitetura de SEO para Big Tech
// ──────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Horazion | Infraestrutura Viva de Orquestração de UI",
    template: "%s | Horazion",
  },
  description:
    "A primeira plataforma onde design e código vivem em sincronia perfeita através de um DNA digital centralizado. Geração de código puro com inteligência artificial, design canvas e engenharia de precisão. Elimine o handoff e escale sistemas de design automaticamente.",
  keywords: [
    "Orquestração de UI",
    "DNA Digital",
    "Design System",
    "Horazion Engine",
    "Horazion Bridge",
    "Infraestrutura Viva",
    "TypeScript UI",
    "React Engineering",
    "Sincronização Bidirecional",
    "Bridge Sync",
    "Código Puro",
    "Zero Lock-in",
    "Handoff Zero",
    "Atomic Design Tokens",
    "Design System Automático",
    "Arquitetura de DNA",
    "Horazion Studio",
    "Horazion Lab",
    "Horazion Hub",
    "Inteligência Coletiva",
    "Curadoria de Componentes",
    "Engenharia de Precisão",
    "Microinterações",
    "Performance 60fps",
    "Design de Interfaces",
    "Design System Platform",
    "Design Canvas",
    "Canvas de UI",
    "Ferramenta de Design",
    "Editor Visual de DNA",
    "Design Tokens",
    "Design Ops",
    "UI Design",
    "UX Design",
    "Design atômico",
    "Sistemas de Design Vivos",
    "Inteligência Artificial",
    "AI Design",
    "AI Code Generation",
    "Geração de Código com IA",
    "AI-Assisted UI",
    "Machine Learning Design",
    "AI-Powered Design System",
    "AI-Driven UI",
    "Design Inteligente",
    "Código TypeScript",
    "React Code",
    "Geração de Código Automática",
    "Código Limpo",
    "CSS Automático",
    "Design to Code",
    "Code Sync",
    "Code Generation Platform",
    "Frontend Code",
    "Tailwind CSS",
    "Next.js",
    "Acessibilidade Web",
    "Canvas de Design",
    "Canvas Interativo",
    "UI Canvas",
    "Digital Canvas",
    "Canvas de Componentes",
    "Design Surface",
    "Server-Side Rendering",
    "Web Performance",
    "Otimização de UI",
    "Latência Zero",
  ],
  authors: [{ name: "Horazion Lab", url: "https://horazion.com" }],
  creator: "Horazion Studio",
  publisher: "Horazion",
  alternates: {
    canonical: "https://horazion.com",
    languages: {
      "pt-BR": "https://horazion.com",
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#161616" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://horazion.com",
    siteName: "Horazion",
    title: "Horazion | DNA Digital para Interfaces com IA",
    description:
      "Elimine a discrepância entre design e código com tecnologia Bridge Sync. Código real, zero lock‑in, canvas de design inteligente e IA para geração automática de componentes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Horazion UI Orchestration – Design Canvas + IA + Código Puro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horazion | Live UI Orchestration + IA",
    description:
      "Design canvas, inteligência artificial e código puro unidos em um único DNA digital. Bridge Sync em tempo real.",
    images: ["/twitter-card.png"],
    creator: "@horazion_io",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "SEU_CODIGO_GOOGLE_VERIFICATION",
    yandex: "SEU_CODIGO_YANDEX",
    other: {
      "msvalidate.01": "SEU_CODIGO_BING",
    },
  },
  category: "technology",
  applicationName: "Horazion",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://horazion.com"),
};

// ──────────────────────────────────────────────
// JSON‑LD Estruturado – Organização Horazion
// ──────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Horazion",
  url: "https://horazion.com",
  logo: "https://horazion.com/logo.png",
  description:
    "Horazion é a Infraestrutura Viva de Orquestração de UI. Uma plataforma que converte design em código puro, sincronizado por um DNA digital centralizado, com canvas inteligente e IA para geração automática.",
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Horazion Studio",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "contato@horazion.com",
  },
  sameAs: [
    "https://twitter.com/horazion_io",
    "https://github.com/horazion",
    "https://linkedin.com/company/horazion",
  ],
  knowsAbout: [
    "Orquestração de UI",
    "DNA Digital",
    "Design System Automático",
    "Código Puro",
    "Bridge Sync",
    "Zero Handoff",
    "Design Canvas",
    "Inteligência Artificial para UI",
    "Geração de Código com IA",
    "Atomic Design Tokens",
    "Canvas de Design Interativo",
  ],
};

// ──────────────────────────────────────────────
// Layout Raiz – Camada viva de orquestração visual
// ──────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* As tags meta e links são geridas nativamente pelo Next.js */}
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--bg)] text-[var(--text-primary)]`}
      >
        {/* JSON‑LD estático movido para o body para evitar mismatch de hidratação com extensões do Chrome */}
        <script
          id="horazion-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Camada de Orquestração de Layout */}
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>

        {/* Analytics na borda do cliente */}
        <Analytics />
      </body>
    </html>
  );
}