import Link from "next/link";
import { site } from "@/content/site";

/** Original Simplyes wordmark: a soft brand orb + lower-case name with a green full stop. */
export function Wordmark({ className, asLink = true }: { className?: string; asLink?: boolean }) {
  const mark = (
    <>
      <span
        aria-hidden="true"
        className="inline-block size-[18px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #ffffff 0%, #d7eba5 28%, #6b9872 65%, #244a3b 100%)",
          boxShadow: "0 2px 9px -2px rgb(36 74 59 / 0.4)",
        }}
      />
      <span className="font-display text-[1.375rem] font-medium leading-none tracking-[-0.03em] text-ink">
        {site.wordmark}
        <span className="text-accent-600">.</span>
      </span>
    </>
  );

  if (!asLink) {
    return <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>{mark}</span>;
  }

  return (
    <Link href="/" aria-label={`${site.name} — home`} className={`inline-flex min-h-11 items-center gap-2 rounded-md ${className ?? ""}`}>
      {mark}
    </Link>
  );
}
