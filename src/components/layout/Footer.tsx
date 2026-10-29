import Link from "next/link";
import type { ReactNode } from "react";
import { footerNav, legalNav, site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { Wordmark } from "@/components/ui/Wordmark";

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="border-b border-dashed border-black/15 pb-3 font-sans text-sm font-medium uppercase tracking-[0.02em] text-ink-2">
      {children}
    </h2>
  );
}

const linkClass =
  "inline-flex min-h-8 items-center text-[0.9375rem] text-ink underline-offset-4 decoration-black/30 hover:underline";

/** Reference footer: oversized display line (with glass pill), three columns, dotted rules. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="sy-footer relative overflow-hidden bg-canvas" aria-labelledby="footer-title">
      <div aria-hidden="true" className="hero-orb !top-[22%] opacity-70" />
      <div className="container-site relative pb-10 pt-[clamp(96px,12vw,160px)]">
        <p id="footer-title" className="type-display flex flex-wrap items-center gap-x-[0.18em] text-ink" data-reveal>
          <span>SIMPLY</span>
          <span className="glass-word">YES</span>
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Wordmark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-2">
              Independent assistance for Indians living in Germany with Indian consular and administrative
              processes. {site.coverageStatement}
            </p>
          </div>

          <nav aria-label="Footer">
            <ColumnTitle>Navigation</ColumnTitle>
            <ul className="mt-4 space-y-1.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnTitle>Contact</ColumnTitle>
            <ul className="mt-4 space-y-1.5">
              <li>
                <a
                  href={whatsappHref("general")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="whatsapp"
                  data-topic="general"
                  className={linkClass}
                >
                  WhatsApp: {site.whatsapp.display}
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </a>
              </li>
              <li>
                <Link href="/contact/" className={linkClass}>
                  Contact page
                </Link>
              </li>
              <li className="pt-1 text-sm text-ink-2">Serving customers across Germany</li>
            </ul>
          </div>

          <div>
            <ColumnTitle>Legal</ColumnTitle>
            <ul className="mt-4 space-y-1.5">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={site.official.embassy.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Official: {site.official.embassy.label}
                  <span className="sr-only"> (external website, opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 rounded-[14px] bg-canvas-alt px-5 py-4 text-[0.8125rem] leading-relaxed text-ink-2">
          <strong className="font-medium text-ink">Independent service disclosure:</strong> {site.disclosure}
        </p>

        <div className="mt-8 flex flex-col gap-3 text-sm text-ink-2 sm:flex-row sm:items-center sm:gap-6">
          <p className="shrink-0">
            © {year} {site.name}. {site.tagline}.
          </p>
          <hr aria-hidden="true" className="divider-dashed hidden flex-1 sm:block" />
        </div>
      </div>
    </footer>
  );
}
