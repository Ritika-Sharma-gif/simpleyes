"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  CalendarClock,
  ClipboardList,
  FileCheck2,
  Image as ImageIcon,
  MessageCircleMore,
  Route,
  type LucideIcon,
} from "lucide-react";
import { services, type IllustrationKind } from "@/content/services";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import styles from "./AssistanceFinder.module.css";

const icons: Record<IllustrationKind, LucideIcon> = {
  documents: FileCheck2,
  form: ClipboardList,
  photo: ImageIcon,
  appointment: CalendarClock,
  process: Route,
  personal: MessageCircleMore,
};

/**
 * Lightweight, accessible topic selector. No account, personal information,
 * network request or automated eligibility decision is involved.
 */
export function AssistanceFinder() {
  const [selectedSlug, setSelectedSlug] = useState(services[0]?.slug ?? "");
  const selected = services.find((service) => service.slug === selectedSlug) ?? services[0];

  if (!selected) return null;

  return (
    <section id="find-assistance" aria-labelledby="assistance-finder-heading" className={"section " + styles.section}>
      <div className="container-site">
        <div className={styles.heading}>
          <div>
            <Badge>Find your next step</Badge>
            <h2 id="assistance-finder-heading" className={"type-h2 " + styles.title}>
              What can we help you with?
            </h2>
          </div>
          <p className={styles.intro}>
            Select the topic closest to your question. See relevant guidance and choose how to get help —
            no account, documents, or forms required.
          </p>
        </div>

        <div className="frame">
          <div className="frame-inner">
            <div className={styles.inner}>
              <fieldset className={styles.choices}>
                <legend className={styles.legend}>Choose a type of assistance</legend>
                <div className={styles.grid}>
                  {services.map((service, index) => {
                    const Icon = icons[service.illustration];
                    const isSelected = selectedSlug === service.slug;
                    return (
                      <label
                        key={service.slug}
                        className={[styles.choice, isSelected ? styles.isSelected : ""].filter(Boolean).join(" ")}
                      >
                        <input
                          className={styles.input}
                          type="radio"
                          name="assistance-topic"
                          value={service.slug}
                          checked={isSelected}
                          onChange={() => setSelectedSlug(service.slug)}
                        />
                        <span className={styles.icon} aria-hidden="true">
                          <Icon size={22} strokeWidth={1.6} />
                        </span>
                        <span className={styles.choiceText}>
                          <span className={styles.choiceNumber} aria-hidden="true">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className={styles.choiceLabel}>{service.title}</span>
                        </span>
                        <ArrowUpRight className={styles.choiceArrow} size={17} aria-hidden="true" />
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className={styles.result}>
                <div className={styles.resultCopy}>
                  <div role="status" aria-live="polite" aria-atomic="true">
                    <p className={styles.resultEyebrow}>Your selected topic</p>
                    <h3 className={styles.resultTitle}>{selected.title}</h3>
                    <p className={styles.resultDescription}>{selected.summary}</p>
                    <div className={styles.helpDetails}>
                      <p className={styles.helpLabel}>What this includes</p>
                      <ul className={styles.helpList}>
                        {selected.helpsWith.slice(0, 2).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className={styles.disclaimer}>
                    Simplyes offers independent preparation and guidance, not official decisions or guaranteed outcomes.
                  </p>
                </div>
                <div className={styles.actions}>
                  <WhatsAppButton topic={selected.whatsappTopic} size="sm">
                    Ask us on WhatsApp
                  </WhatsAppButton>
                  <ButtonLink href={"/services/" + selected.slug + "/"} variant="light" size="sm">
                    View service details
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
