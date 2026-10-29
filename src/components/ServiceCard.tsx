import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { ServiceArt } from "@/components/illustrations/ServiceArt";

/** The entire card is a single accessible link. Decorative artwork is not interactive. */
export function ServiceCard({
  service,
  headingLevel = "h3",
  artUid,
}: {
  service: Service;
  headingLevel?: "h2" | "h3";
  artUid?: string;
}) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/services/${service.slug}/`}
      className="sy-service-card card-link group"
      data-spotlight
    >
      <div className="sy-service-art" aria-hidden="true">
        <ServiceArt kind={service.illustration} uid={artUid} className="absolute inset-0 h-full w-full" />
      </div>
      <div className="sy-service-content">
        <span className="sy-service-label">GUIDANCE / SIMPLYES</span>
        <Heading className="sy-service-title">{service.title}</Heading>
        <p className="sy-service-description">{service.summary}</p>
        <span className="sy-service-link" aria-hidden="true">Explore service <ArrowUpRight size={19} strokeWidth={1.7}/></span>
      </div>
      <span className="sy-service-orbit" aria-hidden="true"/>
    </Link>
  );
}
