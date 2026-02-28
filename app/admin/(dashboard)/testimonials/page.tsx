import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteTestimonialButton } from "./DeleteTestimonialButton";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Testimonials</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Customer reviews shown on the homepage and across the site.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 transition shrink-0"
        >
          Add testimonial
        </Link>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        {testimonials.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-zinc-500">No testimonials yet.</p>
            <Link href="/admin/testimonials/new" className="mt-3 inline-flex text-sm font-medium text-primary-600 hover:underline">
              Add your first testimonial →
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {testimonials.map((t) => (
              <li key={t.id} className="flex items-start gap-4 px-6 py-4 hover:bg-zinc-50/50 transition">
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-900 line-clamp-2">{t.quote}</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    — {t.authorName}
                    {t.authorLocation && `, ${t.authorLocation}`}
                    {t.serviceType && ` · ${t.serviceType}`}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    {t.rating != null && (
                      <span className="text-amber-500 text-sm">
                        {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                      </span>
                    )}
                    {t.featured && (
                      <span className="inline-flex rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/testimonials/${t.id}/edit`}
                    className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
                  >
                    Edit
                  </Link>
                  <DeleteTestimonialButton testimonialId={t.id} authorName={t.authorName} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
