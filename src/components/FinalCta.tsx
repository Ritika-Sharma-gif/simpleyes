import { site } from "@/content/site";
import { Badge } from "@/components/ui/Badge";
import { WhatsAppButton } from "@/components/ui/Button";

/** High-contrast, accessible call to action. Never implies official status. */
export function FinalCta({
  title = "Need help with your next step?",
  lead = "Tell us what you need assistance with, and start a conversation with Simplyes.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section aria-labelledby="final-cta-title" className="section sy-final-section">
      <div className="container-site">
        <div className="sy-final-panel" data-reveal>
          <div className="relative flex flex-col items-center gap-6">
            <Badge>Let's make it simpler</Badge>
            <h2 id="final-cta-title" className="type-h2 max-w-[16ch]">{title}</h2>
            <p className="type-lead max-w-[43ch]">{lead}</p>
            <WhatsAppButton topic="general" className="mt-3">Chat With Us on WhatsApp</WhatsAppButton>
            <p className="sy-final-contact text-[0.8125rem]">
              WhatsApp {site.whatsapp.display} · {site.coverageStatement}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
