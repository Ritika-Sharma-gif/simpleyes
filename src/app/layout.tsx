import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import "./experience.css";
import "./three-experience.css";
import { isProductionBuild, site } from "@/content/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { ExperienceMotion } from "@/components/ExperienceMotion";
import { JsonLd } from "@/components/ui/JsonLd";

/** Display face measured on the reference. Self-hosted (Fontshare, ITF Free Font License — see src/app/fonts/). */
const satoshi = localFont({
  src: [{ path: "./fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" }],
  variable: "--font-satoshi",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true,
});

/** Body face measured on the reference. Downloaded at build time and self-hosted by next/font (no Google requests at runtime). */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Consular assistance for Indians in Germany`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  robots: isProductionBuild ? { index: true, follow: true } : { index: false, follow: false },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#f7f7f2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal animations only when JS runs; content stays visible otherwise. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <ExperienceMotion />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
