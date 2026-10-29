import { DocumentExperience } from "@/components/three/DocumentExperience";
import { processSteps } from "@/content/home";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { CardFrame } from "@/components/ui/CardFrame";
import { revealDelay } from "@/lib/style";

export function StepCard({ step, index }: { step: (typeof processSteps)[number]; index: number }) {
  return (
    <div data-reveal style={revealDelay(index * 90)} className="sy-process-step h-full">
      <CardFrame className="h-full" cardClassName="sy-process-card flex h-full flex-col gap-6 !p-5 sm:!p-6">
        <div className="flex items-center justify-between">
          <span className="sy-process-number orb size-11 font-display text-base font-medium" aria-hidden="true">
            {step.number}
          </span>
          <span aria-hidden="true" className="flex gap-1">
            {[0, 1, 2].map((d) => (
              <span key={d} className="size-1.5 rounded-full bg-black/12" />
            ))}
          </span>
        </div>
        <hr className="divider-dashed" aria-hidden="true" />
        <div className="flex flex-col gap-2.5">
          <h3 className="type-card-title">
            <span className="sr-only">Step {index + 1}: </span>
            {step.title}
          </h3>
          <p className="type-body">{step.body}</p>
        </div>
      </CardFrame>
    </div>
  );
}

/** Reference "Process": left intro column (with closing quote) + 2×2 numbered step cards. */
export function Process() {
  return (
    <section id="how-it-works" aria-labelledby="process-title" className="section sy-process-section bg-canvas-alt">
      <div className="container-site sy-process-grid grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="sy-process-intro flex flex-col justify-between gap-12 lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:self-start lg:min-h-[560px]">
          <div className="flex flex-col items-start gap-5" data-reveal>
            <Badge>How it works</Badge>
            <h2 id="process-title" className="type-h2 max-w-[14ch]">
              Simple steps, clear guidance
            </h2>
            <p className="type-lead max-w-[40ch]">
              A straightforward way to understand your requirements and prepare for the official process.
            </p>
            <ButtonLink href="/how-it-works/" className="mt-2">
              See How It Works
            </ButtonLink>
          </div>
          <div className="sy-process-visual" data-reveal><DocumentExperience kind="process" /></div>
          <blockquote className="type-quote max-w-[24ch] text-ink" data-reveal>
            “We explain the requirements and help you prepare —{" "}
            <span className="text-ink-3">you stay in control of your application.</span>”
          </blockquote>
        </div>

        <ol className="sy-process-list grid gap-5">
          {processSteps.map((step, index) => (
            <li key={step.number} className="sy-process-item">
              <StepCard step={step} index={index} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
