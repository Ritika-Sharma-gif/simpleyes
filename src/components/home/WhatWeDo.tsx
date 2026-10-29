import { ArrowUpRight, Info, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { Badge } from "@/components/ui/Badge";

const facts = [
  { icon: MapPin, label: "Across Germany" },
  { icon: ShieldCheck, label: "Independent private service" },
  { icon: MessageCircle, label: "A conversation, not a complicated process" },
];

export function WhatWeDo() {
  return (
    <section aria-labelledby="what-we-do-title" className="section sy-story">
      <div className="container-site sy-story-grid">
        <div className="sy-story-aside" data-reveal>
          <Badge>What we do</Badge>
          <span className="sy-story-index">01 / THE SIMPLYES APPROACH</span>
          <ArrowUpRight className="sy-story-arrow" size={32} strokeWidth={1.1} aria-hidden="true" />
        </div>
        <div className="sy-story-main">
          <h2 id="what-we-do-title" className="sy-story-title" data-reveal>
            Less confusion.<br /><em>More clarity.</em><br />Better prepared.
          </h2>
          <p className="sy-story-copy" data-reveal>
            Indian consular and administrative processes can involve detailed requirements, documents and forms.
            <strong> Simplyes helps you understand what is needed and prepare for the next step.</strong>
          </p>
          <ul className="sy-story-facts" data-reveal>
            {facts.map(({ icon: Icon, label }) => (
              <li key={label}><Icon aria-hidden="true" size={18} strokeWidth={1.6}/>{label}</li>
            ))}
          </ul>
          <p className="sy-story-disclosure" data-reveal>
            <Info size={17} aria-hidden="true" strokeWidth={1.6}/>
            <span>{site.shortDisclosure}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
