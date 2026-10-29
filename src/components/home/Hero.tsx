import { DocumentExperience } from "@/components/three/DocumentExperience";
import { ArrowDownRight, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";

/** Editorial hero: meaningful content stays in server HTML; the scene is decorative. */
export function Hero() {
  return (
    <section className="sy-hero" aria-labelledby="hero-title">
      <div className="container-site sy-hero-grid">
        <div className="sy-hero-copy">
          <p className="sy-eyebrow"><span className="sy-eyebrow-dot" aria-hidden="true" />{site.tagline}</p>
          <h1 id="hero-title" className="sy-hero-title">
            Consular assistance,
            <span>made simpler<span className="sy-hero-period">.</span></span>
          </h1>
          <p className="sy-hero-lead">
            Helping Indians across Germany navigate documents, applications, and consular procedures with clarity and confidence.
          </p>
          <div className="sy-hero-actions">
            <WhatsAppButton topic="general">Get Help on WhatsApp</WhatsAppButton>
            <ButtonLink href="/services/" variant="light">Explore Our Services</ButtonLink>
          </div>
          <p className="sy-hero-disclosure">
            <ShieldCheck aria-hidden="true" size={17} strokeWidth={1.7} />
            Independent private service — not a government authority
          </p>
        </div>

        <div id="simplyes-hero-scene" className="sy-scene" aria-hidden="true">
          <DocumentExperience kind="hero" />
          <div className="sy-scene-grain" />
          <div className="sy-scene-orbit sy-scene-orbit-one" />
          <div className="sy-scene-orbit sy-scene-orbit-two" />
          <div className="sy-scene-glow" />
          <div className="sy-scene-star sy-scene-star-one" />
          <div className="sy-scene-star sy-scene-star-two" />
          <div className="sy-scene-paper sy-scene-paper-back">
            <span className="sy-paper-line sy-paper-line-long" /><span className="sy-paper-line" /><span className="sy-paper-line sy-paper-line-short" />
          </div>
          <div className="sy-scene-paper sy-scene-paper-front">
            <span className="sy-paper-overline">YOUR NEXT STEP, CLEARER</span>
            <span className="sy-paper-mark"><CheckCircle2 size={30} strokeWidth={1.45} /></span>
            <span className="sy-paper-title">A little clarity goes a long way.</span>
            <span className="sy-paper-line sy-paper-line-long" /><span className="sy-paper-line" /><span className="sy-paper-line sy-paper-line-short" />
            <span className="sy-paper-footer"><span>01 / 03</span><ArrowUpRight size={18} /></span>
          </div>
          <div className="sy-scene-float sy-scene-float-top"><span className="sy-scene-bullet"/> Made for your next step</div>
          <div className="sy-scene-float sy-scene-float-bottom"><ShieldCheck size={16}/> Clear. Independent. Human.</div>
          <span className="sy-scene-corner sy-scene-corner-tl" />
          <span className="sy-scene-corner sy-scene-corner-br" />
        </div>
      </div>
      <div className="container-site sy-hero-bottom">
        <span>Independent guidance, across Germany</span>
        <a href="#services" className="sy-scroll-cue">Discover our services <ArrowDownRight size={17} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
