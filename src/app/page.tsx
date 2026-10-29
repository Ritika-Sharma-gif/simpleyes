import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { Services } from "@/components/home/Services";
import { AssistanceFinder } from "@/components/home/AssistanceFinder";
import { Process } from "@/components/home/Process";
import { WhySimplyes } from "@/components/home/WhySimplyes";
import { Transparency } from "@/components/home/Transparency";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Consular assistance for Indians in Germany`,
  absoluteTitle: true,
  description:
    "Independent help for Indians in Germany with Indian consular processes: document guidance, form help, photo & signature formatting and clear next steps.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <AssistanceFinder />
      <Services />
      <Process />
      <WhySimplyes />
      <Transparency />
      <FaqSection />
      <FinalCta />
    </>
  );
}
