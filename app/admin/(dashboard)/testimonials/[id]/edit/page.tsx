import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "../../TestimonialForm";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/testimonials" className="text-sm text-primary-600 hover:underline mb-4 inline-block">
          ← Testimonials
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Edit testimonial</h1>
        <p className="mt-1 text-sm text-zinc-500">By {testimonial.authorName}</p>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm max-w-2xl">
        <TestimonialForm
          initial={{
            id: testimonial.id,
            quote: testimonial.quote,
            authorName: testimonial.authorName,
            authorLocation: testimonial.authorLocation,
            serviceType: testimonial.serviceType,
            rating: testimonial.rating,
            sortOrder: testimonial.sortOrder,
            featured: testimonial.featured,
          }}
        />
      </div>
    </div>
  );
}
