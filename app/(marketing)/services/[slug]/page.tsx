import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} | ELEVATE`,
    description: service.shortDescription ?? undefined,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const serviceImages: Record<string, string> = {
    "home-renovation": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    "complete-interior-remodel": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
    "kitchen-redesign-remodel": "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1000&q=80",
    "bathroom-redesign-remodel": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80",
    "restoration-and-repairs": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80",
    "flooring-and-tile": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
  };
  const imageUrl = serviceImages[service.slug];

  return (
    <div className="bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <Link href="/services" className="text-sm font-medium text-primary-500 hover:text-primary-600 inline-flex items-center gap-1">
          ← All services
        </Link>
        <div className="mt-8 grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">{service.name}</h1>
            {service.tagline && (
              <p className="mt-2 text-lg font-medium text-primary-500">{service.tagline}</p>
            )}
            {service.shortDescription && (
              <p className="mt-4 text-lg text-gray-600">{service.shortDescription}</p>
            )}
            {service.longDescription && (
              <p className="mt-8 text-gray-600 leading-relaxed whitespace-pre-line">
                {service.longDescription}
              </p>
            )}
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition shadow-soft"
              >
                Get a free estimate
              </Link>
            </div>
          </div>
          {imageUrl && (
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] lg:min-h-[360px]">
              <Image
                src={imageUrl}
                alt={service.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
