import { ArrowDownRight, ShieldCheck } from "lucide-react";
import { marqueeItems } from "@/content/home";
import { site } from "@/content/site";
import { revealDelay } from "@/lib/style";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { HeroAtmosphere } from "./HeroAtmosphere";

/** Reference hero: centered pill label, oversized two-line headline with a glass word, two CTAs, marquee. */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-[clamp(56px,7vw,100px)] pt-[clamp(120px,11vw,160px)]"
    >
      <div aria-hidden="true" className="hero-rings -z-10" />
      <div aria-hidden="true" className="hero-orb -z-10" />
      <HeroAtmosphere />

      <div className="container-site flex flex-col items-center text-center">
        <p className="badge hero-intro">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-ink" />
          {site.tagline}
        </p>

        <h1 id="hero-title" className="type-hero hero-intro mt-7 max-w-[1000px]" style={revealDelay(60)}>
          <span className="block">Consular assistance,</span>
          <span className="mt-[0.06em] inline-block">
            <span className="glass-word">made simpler.</span>
          </span>
        </h1>

        <p
          className="type-lead hero-intro mt-6 max-w-[34rem] text-[0.9375rem] sm:text-base"
          style={revealDelay(140)}
        >
          Helping Indians across Germany navigate documents, applications, and consular procedures with clarity and
          confidence.
        </p>

        <div
          className="hero-intro mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          style={revealDelay(200)}
        >
          <ButtonLink href="/services/" variant="light">
            Explore Our Services
          </ButtonLink>
          <WhatsAppButton topic="general">Get Help on WhatsApp</WhatsAppButton>
        </div>

        <a
          href="#find-assistance"
          className="hero-intro group mt-5 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-accent-700 underline-offset-4 transition-colors hover:text-accent-900 hover:underline focus-visible:outline-offset-2"
          style={revealDelay(235)}
        >
          Not sure where to begin? Find your service
          <ArrowDownRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 motion-reduce:transition-none" />
        </a>

        <p className="hero-intro mt-6 max-w-[34ch] text-[0.8125rem] text-ink-2 sm:max-w-none" style={revealDelay(240)}>
          <ShieldCheck
            aria-hidden="true"
            className="mr-1.5 inline-block size-4 align-[-3px] text-accent-700"
            strokeWidth={1.75}
          />
          Independent private service — not a government authority
        </p>
      </div>

      <div className="marquee mx-auto mt-[clamp(40px,5vw,64px)] max-w-[900px] overflow-hidden" aria-hidden="true">
        <div className="marquee-track gap-10 pr-10">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-2.5 font-display text-lg font-medium tracking-[-0.01em] text-ink/45">
              <span className="size-2 rounded-full bg-accent-500/70" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
