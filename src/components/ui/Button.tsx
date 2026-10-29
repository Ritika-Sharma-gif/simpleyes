import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappHref, type WhatsappTopic } from "@/lib/whatsapp";

type Variant = "dark" | "light";
type Size = "md" | "sm";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: "arrow" | "chat" | "none";
  className?: string;
};

function classes(variant: Variant, size: Size, className?: string) {
  return ["btn", variant === "dark" ? "btn-dark" : "btn-light", size === "sm" ? "btn-sm" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
}

function Face({ children, icon }: { children: ReactNode; icon: CommonProps["icon"] }) {
  return (
    <span className="btn-face">
      {children}
      {icon === "arrow" && <ArrowRight aria-hidden="true" className="btn-icon size-4" strokeWidth={1.75} />}
      {icon === "chat" && <MessageCircle aria-hidden="true" className="btn-icon size-4" strokeWidth={1.75} />}
    </span>
  );
}

/** Internal navigation button (Next.js Link). */
export function ButtonLink({
  href,
  children,
  variant = "dark",
  size = "md",
  icon = "arrow",
  className,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={classes(variant, size, className)} data-magnetic>
      <Face icon={icon}>{children}</Face>
    </Link>
  );
}

/** WhatsApp conversion button. Opens only on click; message is non-sensitive. */
export function WhatsAppButton({
  topic = "general",
  children,
  variant = "dark",
  size = "md",
  icon = "chat",
  className,
}: CommonProps & { topic?: WhatsappTopic }) {
  return (
    <a
      href={whatsappHref(topic)}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      data-topic={topic}
      className={classes(variant, size, className)}
      data-magnetic
    >
      <Face icon={icon}>
        {children}
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
      </Face>
    </a>
  );
}
