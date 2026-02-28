import Link from "next/link";
import { TestimonialForm } from "../TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/testimonials" className="text-sm text-primary-600 hover:underline mb-4 inline-block">
          ← Testimonials
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Add testimonial</h1>
        <p className="mt-1 text-sm text-zinc-500">New customer review for the site.</p>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm max-w-2xl">
        <TestimonialForm />
      </div>
    </div>
  );
}
