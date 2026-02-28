import { getServices, getPublishedProjects, getTestimonials } from "@/lib/data";
import { getSiteSetting } from "@/lib/site-settings";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutSnippet } from "@/components/sections/AboutSnippet";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { EstimateFormSection } from "@/components/sections/EstimateFormSection";
import { GuaranteesSection } from "@/components/sections/GuaranteesSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactStrip } from "@/components/sections/ContactStrip";
import { OfferStrip } from "@/components/sections/OfferStrip";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [services, projects, testimonials, headline, subline, ctaText, phone, yearsExperience] = await Promise.all([
    getServices(),
    getPublishedProjects(10),
    getTestimonials(),
    getSiteSetting("hero_headline"),
    getSiteSetting("hero_subline"),
    getSiteSetting("cta_text"),
    getSiteSetting("phone"),
    getSiteSetting("years_experience"),
  ]);

  const headlineVal = headline || "Elevate Your Space. Realize Your Vision.";
  const sublineVal = subline || "Custom renovations that fit how you live. Free estimate, no obligation.";
  const ctaVal = ctaText || "Get a Free Estimate";
  const phoneVal = phone || "(561) 247-3693";
  const yearsVal = yearsExperience || "45";

  return (
    <>
      <Hero
        headline={headlineVal}
        subline={sublineVal}
        ctaText={ctaVal}
        phone={phoneVal}
        happyCustomersCount="500+"
      />
      <TrustBar yearsExperience={yearsVal} />
      <OfferStrip />
      <AboutSnippet />
      <StatsSection years={yearsVal} />
      <ServicesSection
        services={services.map((s) => ({
          slug: s.slug,
          name: s.name,
          shortDescription: s.shortDescription,
        }))}
      />
      <ProcessSection />
      <EstimateFormSection />
      <GuaranteesSection />
      <CtaSection />
      <ProjectsPreview
        projects={projects.map((p) => ({
          slug: p.slug,
          title: p.title,
          shortDescription: p.shortDescription,
          category: p.category,
          featuredImageUrl: p.featuredImageUrl ?? p.images[0]?.url ?? null,
        }))}
      />
      <TestimonialsSection
        testimonials={testimonials.map((t) => ({
          quote: t.quote,
          authorName: t.authorName,
          authorLocation: t.authorLocation ?? null,
          serviceType: t.serviceType ?? null,
          rating: t.rating ?? null,
        }))}
      />
      <ContactStrip />
    </>
  );
}
