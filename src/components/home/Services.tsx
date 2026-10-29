import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { revealDelay } from "@/lib/style";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section sy-services">
      <div className="container-site">
        <div className="sy-section-head">
          <SectionHeading
            id="services-title"
            badge="What we help with"
            title={<>Practical help.<br /><span className="sy-muted">Personal clarity.</span></>}
            lead="Support with Indian consular and administrative processes — from understanding requirements to preparing your next step."
            align="left"
          />
          <div className="sy-section-side" data-reveal><span>EXPLORE OUR SERVICES</span><span>01 — 06</span></div>
        </div>
        <div className="sy-service-grid">
          {services.map((service, i) => (
            <div key={service.slug} className="sy-service-item" data-reveal style={revealDelay((i % 3) * 70)}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
        <div className="sy-services-footer" data-reveal>
          <p>Not sure which service fits your situation?</p>
          <WhatsAppButton topic="general">Ask Us on WhatsApp</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
