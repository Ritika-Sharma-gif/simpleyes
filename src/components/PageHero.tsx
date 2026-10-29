import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { revealDelay } from "@/lib/style";

type Crumb = { name: string; path: string };

/** Sub-page hero: breadcrumb, label pill, display heading, lead — same orb backdrop as the home hero. */
export function PageHero({
  badge,
  title,
  lead,
  crumbs,
  children,
}: {
  badge: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="sy-page-hero relative isolate overflow-hidden pb-[clamp(48px,6vw,88px)] pt-[clamp(112px,11vw,168px)]">
      <div aria-hidden="true" className="hero-rings -z-10" />
      <div aria-hidden="true" className="hero-orb -z-10 !top-[38%] opacity-80" />
      <div className="container-site sy-page-hero-content flex flex-col items-center text-center">
        <nav aria-label="Breadcrumb" className="hero-intro mb-6">
          <ol className="flex flex-wrap items-center justify-center gap-1 text-[0.8125rem] text-ink-2">
            <li>
              <Link href="/" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded px-1 underline-offset-4 hover:underline">
                Home
              </Link>
            </li>
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-1">
                  <ChevronRight aria-hidden="true" className="size-3.5 text-ink-3" />
                  {last ? (
                    <span aria-current="page" className="px-1 text-ink">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded px-1 underline-offset-4 hover:underline">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="hero-intro">
          <Badge>{badge}</Badge>
        </div>
        <h1
          className="hero-intro mt-6 max-w-[18ch] font-display text-[clamp(2.375rem,1.3rem+4.2vw,4.5rem)] leading-[1.1] tracking-[-0.035em]"
          style={revealDelay(60)}
        >
          {title}
        </h1>
        {lead && (
          <p className="type-lead hero-intro mt-6 max-w-[44rem] sm:text-[1.0625rem]" style={revealDelay(120)}>
            {lead}
          </p>
        )}
        {children && (
          <div className="hero-intro mt-8 flex flex-wrap items-center justify-center gap-3" style={revealDelay(180)}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
