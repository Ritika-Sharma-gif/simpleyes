import { primaryNav } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/**
 * Reference behaviour: fixed full-width translucent bar with a light blur on
 * desktop; a floating rounded card with a menu toggle below 1024px.
 */
export function Header() {
  return (
    <header className="sy-header fixed inset-x-0 top-0 z-50">\n      <span className="sy-scroll-progress" aria-hidden="true" />
      {/* Desktop */}
      <div className="sy-header-bar hidden h-[var(--header-h)] border-b lg:block">
        <div className="container-site flex h-full items-center justify-between gap-6">
          <Wordmark />
          <nav aria-label="Primary">
            <NavLinks items={primaryNav} />
          </nav>
          <WhatsAppButton topic="general" icon="none">
            Get Help on WhatsApp
          </WhatsAppButton>
        </div>
      </div>

      {/* Mobile & tablet */}
      <div className="px-2.5 pt-2.5 lg:hidden">
        <div
          data-menu-scope
          className="sy-mobile-shell relative mx-auto flex h-14 max-w-[720px] items-center justify-between pl-4 pr-1.5"
          // No backdrop-filter here: it would become the containing block of the fixed menu backdrop.
        >
          <Wordmark />
          <MobileMenu items={primaryNav} whatsappHref={whatsappHref("general")} />
        </div>
      </div>
    </header>
  );
}
