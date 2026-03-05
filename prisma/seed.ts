import path from "node:path";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

// Load .env from project root (parent of prisma/) so seed always finds it when run via `npx prisma db seed`
config({ path: path.resolve(__dirname, "..", ".env") });
config({ path: path.resolve(__dirname, "..", ".env.local") });

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("Missing DATABASE_URL. Create a .env file in the project root with your real Neon URL.");
  process.exit(1);
}
// Only treat literal placeholder as invalid (not real Neon hosts like ep-lucky-smoke-...)
if (dbUrl.includes("ep-xxx") || dbUrl === "postgresql://...") {
  console.error(
    "DATABASE_URL looks like a placeholder. Replace it with your real connection string from Neon:\n" +
      "  https://console.neon.tech → your project → Connection string (pooled)"
  );
  process.exit(1);
}

const prisma = new PrismaClient();

const services = [
  {
    slug: "interior-painting",
    name: "Interior Painting",
    tagline: "Precision and style",
    shortDescription:
      "High-quality interior painting for homes and businesses—expert surface prep, color selection, and clean application that leaves every room looking brand new.",
    longDescription:
      "Transform your space with precision and style. Our team provides high-quality interior painting services for homes and businesses, with expert surface prep, color selection, and clean application that leaves every room looking brand new.",
    sortOrder: 1,
  },
  {
    slug: "exterior-painting",
    name: "Exterior Painting",
    tagline: "Curb appeal starts here",
    shortDescription:
      "Durable, weather-resistant paints and materials for long-lasting, professional exterior painting that stands up to the elements.",
    longDescription:
      "Curb appeal starts here. We use durable, weather-resistant paints and materials to provide long-lasting, professional exterior painting that stands up to the Midwest elements.",
    sortOrder: 2,
  },
  {
    slug: "kitchen-remodeling",
    name: "Kitchen Remodeling",
    tagline: "The kitchen you've always wanted",
    shortDescription:
      "From custom cabinetry to sleek layouts and modern surfaces, we design kitchens that are beautiful, efficient, and built to your taste.",
    longDescription:
      "Let's build the kitchen you've always wanted. From custom cabinetry to sleek layouts and modern surfaces, we design kitchens that are beautiful, efficient, and built to your taste.",
    sortOrder: 3,
  },
  {
    slug: "bathroom-renovation",
    name: "Bathroom Renovation",
    tagline: "Your own spa at home",
    shortDescription:
      "Custom tilework, vanities, lighting, and plumbing—combining luxury with daily function.",
    longDescription:
      "Create your own spa at home. Our bathroom remodeling includes custom tilework, vanities, lighting, and plumbing — combining luxury with daily function.",
    sortOrder: 4,
  },
  {
    slug: "basement-remodeling",
    name: "Basement Remodeling",
    tagline: "Make the most of your square footage",
    shortDescription:
      "Whether you're envisioning a media room, home gym, or extra bedroom, we turn basements into livable, inviting spaces.",
    longDescription:
      "Make the most of your square footage. Whether you're envisioning a media room, home gym, or extra bedroom, we turn basements into livable, inviting spaces.",
    sortOrder: 5,
  },
  {
    slug: "custom-deck-building",
    name: "Custom Deck Building",
    tagline: "Extend your living space outdoors",
    shortDescription:
      "Safe, stylish decks using top-grade materials and great craftsmanship—for entertaining or relaxing.",
    longDescription:
      "Extend your living space outdoors with a custom-built deck. Great for entertaining or relaxing, we build safe, stylish decks using top-grade materials and great craftsmanship.",
    sortOrder: 6,
  },
  {
    slug: "general-contracting",
    name: "General Contracting",
    tagline: "We handle it all",
    shortDescription:
      "From permits to project timelines—we manage every detail to keep your remodeling job smooth and on schedule.",
    longDescription:
      "We handle it all — from permits to project timelines. As your general contractor, we manage every detail to keep your remodeling job smooth and on schedule.",
    sortOrder: 7,
  },
  {
    slug: "interior-design-home-upgrades",
    name: "Interior Design & Home Upgrades",
    tagline: "Every project starts with a plan",
    shortDescription:
      "Our in-house interior designer helps you match colors, textures, furniture, and flow so the final result reflects your vision and lifestyle.",
    longDescription:
      "Every project starts with a plan. Our in-house interior designer helps you match colors, textures, furniture, and flow, so the final result reflects your vision and lifestyle.",
    sortOrder: 8,
  },
];

const testimonials = [
  {
    quote:
      "We had our master bathroom gutted and completely remodeled. The Tyler and the crew of ELEVATE were professional, helpful and knowledgeable in their craft. The craftsmanship and quality of their work is impressive. They made this whole experience as easy as possible. We will absolutely use them again for future projects!",
    authorName: "Krista Jabcuga",
    authorLocation: "",
    serviceType: "Bathroom Renovation",
    rating: 5,
    sortOrder: 1,
    featured: true,
  },
  {
    quote:
      "Tyler and his team are exceptional! They have completed work in Boyton Beach, Florida for my parents home. We are also working with them going forward on many more projects. I can't express how Tyler made my experience, as I am in NY mostly and needing to have things done very quickly. He is very responsive, extremely reliable, cost for everything is very very fair. This Company was referred to Us by others and I highly recommend Tyler Lawson for all services.",
    authorName: "Alyssa Jacobs",
    authorLocation: "",
    serviceType: "General Construction",
    rating: 5,
    sortOrder: 2,
    featured: true,
  },
  {
    quote:
      "We had our bathroom completely renovated. Right from the beginning we were impressed with Tyler. He was very knowledgeable and helpful in our planning. The quality of their work is excellent and timely. Everyone that came to our home was on time, polite and did an amazing job of cleaning up. Tyler is great at returning calls as soon as possible. I would HIGHLY recommend them and have done so to family and friends. We intend on having them do our next project. Thank you Tyler and everyone involved in our project",
    authorName: "Richard Solomon",
    authorLocation: "Lake Worth",
    serviceType: "Bathroom Renovation",
    rating: 5,
    sortOrder: 3,
    featured: true,
  },
  {
    quote:
      "Tyler and his crew did an OUTSTANDING job on a complete remodel of our master bathroom. His team stayed on budget and on schedule, and they kept the workspace clean. We are pretty picky in terms of our vision for this space as well as specific requests, and we found Tyler to be responsive, professional, and accommodating to our requests throughout the project. The end result is so much better than we could have hoped for! Thanks, ELEVATE! We will be asking for your help with our guest bathroom in the near future!!",
    authorName: "Steve Edens",
    authorLocation: "North Palm Beach",
    serviceType: "Bathroom Renovation",
    rating: 5,
    sortOrder: 4,
    featured: true,
  },
  {
    quote:
      "Tyler and his crew created a new kitchen for me in just a few weeks. He helped me with choices and made recommendations that were helpful. His crew are wonderful guys who really take pride in their work. I highly recommend ELEVATE. Tyler's work ethic and attention to detail make him a terrific choice for contractor. Each day they would clean up beautifully: Tyler even power washed the walkway because some grout spilled. And he has a sense of humor too! He's the best you can find.",
    authorName: "Clarita Zeppie",
    authorLocation: "Delray Beach",
    serviceType: "Kitchen Remodel",
    rating: 5,
    sortOrder: 5,
    featured: true,
  },
];

const siteSettings = [
  { key: "phone", value: "+1 312-483-6046" },
  { key: "email", value: "Mike@getelevated.us" },
  { key: "address", value: "Deerfield, IL" },
  { key: "hero_headline", value: "Professional Residential & Commercial Remodeling" },
  { key: "hero_subline", value: "Painting, kitchens, bathrooms, basements, decks, and more. Structured planning, reliable timelines, quality execution. Contact us for a consultation." },
  { key: "cta_text", value: "Contact Us" },
  { key: "years_experience", value: "45" },
];

const sampleProjects = [
  {
    slug: "modern-kitchen-remodel-delray",
    title: "Modern Kitchen Remodel — Delray Beach",
    shortDescription: "Full kitchen renovation with custom cabinetry, quartz counters, and premium appliances.",
    fullDescription: "This Delray Beach home received a complete kitchen transformation. We opened the space to the living area, installed custom shaker cabinets, quartz countertops, a tile backsplash, and high-end stainless appliances. The result is a bright, functional kitchen that fits the family's lifestyle.",
    category: "Kitchen Remodel",
    location: "Delray Beach, FL",
    featuredImageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 100,
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    slug: "master-bathroom-renovation-lake-worth",
    title: "Master Bathroom Renovation — Lake Worth",
    shortDescription: "Spa-like master bath with double vanity, walk-in shower, and modern tile work.",
    fullDescription: "We transformed this master bathroom into a relaxing retreat. The project included a new double vanity with vessel sinks, a large walk-in shower with frameless glass and floor-to-ceiling tile, and updated lighting and fixtures throughout.",
    category: "Bathroom Remodel",
    location: "Lake Worth, FL",
    featuredImageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 99,
    images: [
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1604014237800-1c910a229730?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    slug: "full-home-interior-remodel-boca",
    title: "Full Home Interior Remodel — Boca Raton",
    shortDescription: "Whole-house refresh: new flooring, paint, and updated kitchen and baths.",
    fullDescription: "A comprehensive interior update for a Boca Raton family. We replaced flooring throughout, updated the kitchen and two bathrooms, refreshed trim and paint, and improved lighting. The home now feels cohesive and modern while respecting its existing layout.",
    category: "Complete Interior Remodel",
    location: "Boca Raton, FL",
    featuredImageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 98,
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    slug: "guest-bathroom-makeover-palm-beach",
    title: "Guest Bathroom Makeover — North Palm Beach",
    shortDescription: "Compact guest bath redesigned with new vanity, tile, and fixtures.",
    fullDescription: "We gave this guest bathroom a complete makeover in a tight footprint. New vanity, mirror, lighting, and floor-to-ceiling tile in the shower created a fresh, welcoming space for guests.",
    category: "Bathroom Remodel",
    location: "North Palm Beach, FL",
    featuredImageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 97,
    images: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    slug: "open-concept-kitchen-living-boynton",
    title: "Open-Concept Kitchen & Living — Boynton Beach",
    shortDescription: "Wall removal and kitchen expansion for an open, light-filled great room.",
    fullDescription: "The clients wanted a true open-concept main floor. We removed a non-load-bearing wall, expanded the kitchen with an island, and unified the flooring and paint. The space now flows from kitchen to living and dining, perfect for entertaining.",
    category: "Kitchen Remodel",
    location: "Boynton Beach, FL",
    featuredImageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 96,
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    slug: "restoration-and-repairs-west-palm",
    title: "Restoration & Repairs — West Palm Beach",
    shortDescription: "Historic home restoration: repairs, paint, and period-appropriate updates.",
    fullDescription: "This West Palm Beach home needed careful restoration work. We addressed structural and cosmetic repairs, restored trim and flooring where possible, and applied a fresh exterior and interior paint scheme that honored the home's character.",
    category: "Restoration & Repairs",
    location: "West Palm Beach, FL",
    featuredImageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 95,
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    slug: "luxury-master-suite-jupiter",
    title: "Luxury Master Suite — Jupiter",
    shortDescription: "Master bedroom and bathroom suite with walk-in closet and spa bath.",
    fullDescription: "A full master suite renovation including a spacious bedroom, custom walk-in closet, and a spa-like bathroom with freestanding tub, dual vanity, and large shower. Premium finishes and attention to detail throughout.",
    category: "Complete Interior Remodel",
    location: "Jupiter, FL",
    featuredImageUrl: "https://images.unsplash.com/photo-1604014237800-1c910a229730?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 94,
    images: [
      "https://images.unsplash.com/photo-1604014237800-1c910a229730?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    slug: "outdoor-kitchen-patio-delray",
    title: "Outdoor Kitchen & Patio — Delray Beach",
    shortDescription: "Covered patio with built-in grill, counter, and seating area.",
    fullDescription: "We built a covered outdoor living space with a full outdoor kitchen: built-in grill, countertops, sink, and bar seating. Paver patio and weather-resistant finishes for year-round use in South Florida.",
    category: "Home Renovation",
    location: "Delray Beach, FL",
    featuredImageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 93,
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    slug: "hardwood-flooring-boca",
    title: "Hardwood Flooring Throughout — Boca Raton",
    shortDescription: "New hardwood flooring installed across main living areas and bedrooms.",
    fullDescription: "We removed existing flooring and installed quality hardwood throughout the main level and bedrooms. Matching transitions, proper acclimation, and a durable finish suited to Florida's climate.",
    category: "Restoration & Repairs",
    location: "Boca Raton, FL",
    featuredImageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 92,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    slug: "powder-room-makeover-lake-worth",
    title: "Powder Room Makeover — Lake Worth",
    shortDescription: "Small powder room with new vanity, mirror, and tile.",
    fullDescription: "A quick but impactful powder room update: new vanity, mirror, lighting, and floor-to-ceiling tile. The small space now feels modern and cohesive with the rest of the home.",
    category: "Bathroom Remodel",
    location: "Lake Worth, FL",
    featuredImageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 91,
    images: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

const legacyServiceSlugs = [
  "commercial-interior",
  "office-remodeling",
  "commercial-exterior",
  "new-builds-additions",
  "industrial-warehouse",
  "tenant-improvement",
  "residential-remodeling",
  "home-renovation",
  "complete-interior-remodel",
  "kitchen-redesign-remodel",
  "bathroom-redesign-remodel",
  "restoration-and-repairs",
  "flooring-and-tile",
];

async function main() {
  await prisma.service.deleteMany({ where: { slug: { in: legacyServiceSlugs } } });
  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      create: s,
      update: s,
    });
  }
  console.log("Seeded services.");

  await prisma.testimonial.deleteMany({});
  await prisma.testimonial.createMany({ data: testimonials });
  console.log("Seeded testimonials.");

  for (const { key, value } of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  }
  console.log("Seeded site settings.");

  for (const p of sampleProjects) {
    const { images, ...projectData } = p;
    const project = await prisma.project.upsert({
      where: { slug: p.slug },
      create: {
        ...projectData,
        published: true,
        images: {
          create: images.map((url, i) => ({ url, alt: `${p.title} image ${i + 1}`, sortOrder: i })),
        },
      },
      update: { ...projectData, published: true },
    });
    const existingImages = await prisma.projectImage.count({ where: { projectId: project.id } });
    if (existingImages === 0) {
      for (let i = 0; i < images.length; i++) {
        await prisma.projectImage.create({
          data: { projectId: project.id, url: images[i]!, alt: `${p.title} image ${i + 1}`, sortOrder: i },
        });
      }
    }
  }
  console.log("Seeded sample projects.");

  const samplePost = {
    slug: "kitchen-remodel-cost-guide-south-florida",
    title: "Kitchen Remodel Cost Guide for South Florida Homeowners",
    excerpt: "What to expect when budgeting for a kitchen renovation in South Florida. From cosmetic updates to full remodels.",
    content: `## Planning Your Kitchen Remodel

A kitchen remodel is one of the best investments you can make in your South Florida home. Whether you're updating cabinets and counters or doing a full gut renovation, understanding typical cost ranges helps you plan.

### What Affects the Price?

- **Size and layout** – Larger kitchens and layout changes (e.g. moving plumbing) cost more.
- **Materials** – Cabinets, countertops, and flooring vary widely in price.
- **Appliances** – High-end appliances can add significantly to the total.
- **Labor** – Licensed, insured contractors like ELEVATE ensure quality and compliance.

### Typical Ranges (South Florida)

- **Cosmetic refresh**: New paint, hardware, maybe a new backsplash – often in the $5,000–$15,000 range.
- **Mid-range remodel**: New cabinets, countertops, flooring, and standard appliances – roughly $25,000–$55,000.
- **High-end or full renovation**: Custom cabinetry, premium materials, and layout changes – $60,000 and up.

Every project is different. The best next step is a **free estimate** so we can give you a detailed quote based on your vision and space.`,
    published: true,
    publishedAt: new Date(),
  };
  await prisma.blogPost.upsert({
    where: { slug: samplePost.slug },
    create: samplePost,
    update: { title: samplePost.title, excerpt: samplePost.excerpt, content: samplePost.content, published: samplePost.published, publishedAt: samplePost.publishedAt },
  });
  console.log("Seeded sample blog post.");

  // Default admin user (change password after first login in production)
  const adminEmail = "admin@tlhomepro.com";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || "admin123";
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Admin",
        passwordHash: await hash(adminPassword, 10),
      },
    });
    console.log("Seeded admin user:", adminEmail);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
