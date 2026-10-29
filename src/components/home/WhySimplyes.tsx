import { benefits } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardFrame } from "@/components/ui/CardFrame";
import { WhatsAppButton } from "@/components/ui/Button";
import { BenefitArt } from "@/components/illustrations/BenefitArt";
import { revealDelay } from "@/lib/style";

/** Reference "Benefits": bento rows alternating narrow/wide, illustration on top, copy below. */
export function WhySimplyes() {
  const rows = [benefits.slice(0, 2), benefits.slice(2, 4), benefits.slice(4, 6)];
  return (
    <section id="why-simplyes" aria-labelledby="why-title" className="section sy-benefits bg-canvas">
      <div className="container-site">
        <SectionHeading
          id="why-title"
          badge="Why Simplyes"
          title="Support that keeps things simple"
          align="left"
          lead="Clear, honest help for the Indian community across Germany."
        />

        <div className="sy-benefits-rows mt-12 flex flex-col gap-6 lg:mt-16">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${
                row[0]?.wide
                  ? "lg:grid-cols-[minmax(0,1.88fr)_minmax(0,1fr)]"
                  : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.88fr)]"
              }`}
            >
              {row.map((benefit, i) => (
                <div key={benefit.title} className="sy-benefit-item min-w-0" data-reveal style={revealDelay(i * 90)}>
                  <CardFrame className="sy-benefit-frame h-full" cardClassName="sy-benefit-card flex h-full flex-col gap-4">
                    <div aria-hidden="true" className="sy-benefit-art h-[180px] overflow-hidden sm:h-[200px]">
                      <BenefitArt kind={benefit.art} />
                    </div>
                    <h3 className="type-card-title sy-benefit-title">{benefit.title}</h3>
                    <p className="type-body max-w-[48ch]">{benefit.body}</p>
                  </CardFrame>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center" data-reveal>
          <div className="cta-strip">
            <p className="text-sm text-ink-2">Ready to understand your next step?</p>
            <WhatsAppButton topic="general">Start on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
