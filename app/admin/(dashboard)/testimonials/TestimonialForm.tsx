"use client";

import Link from "next/link";
import { createTestimonial, updateTestimonial } from "./actions";

type Initial = {
  id: string;
  quote: string;
  authorName: string;
  authorLocation: string | null;
  serviceType: string | null;
  rating: number | null;
  sortOrder: number;
  featured: boolean;
} | null;

type Props = { initial?: Initial };

export function TestimonialForm({ initial }: Props) {
  const isEdit = !!initial;
  const action = isEdit
    ? (fd: FormData) => updateTestimonial(initial!.id, fd)
    : createTestimonial;

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="quote" className="block text-sm font-medium text-zinc-700 mb-1">
          Quote *
        </label>
        <textarea
          id="quote"
          name="quote"
          required
          rows={4}
          defaultValue={initial?.quote ?? ""}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="authorName" className="block text-sm font-medium text-zinc-700 mb-1">
            Author name *
          </label>
          <input
            id="authorName"
            name="authorName"
            type="text"
            required
            defaultValue={initial?.authorName ?? ""}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="authorLocation" className="block text-sm font-medium text-zinc-700 mb-1">
            Location (optional)
          </label>
          <input
            id="authorLocation"
            name="authorLocation"
            type="text"
            defaultValue={initial?.authorLocation ?? ""}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-zinc-700 mb-1">
            Service type (e.g. Bathroom Renovation)
          </label>
          <input
            id="serviceType"
            name="serviceType"
            type="text"
            defaultValue={initial?.serviceType ?? ""}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-zinc-700 mb-1">
            Rating (1–5)
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            min={1}
            max={5}
            defaultValue={initial?.rating ?? 5}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-zinc-700 mb-1">
            Sort order
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={initial?.sortOrder ?? 0}
            className="w-24 rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={initial?.featured ?? true}
            className="h-4 w-4 rounded border-zinc-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="featured" className="text-sm font-medium text-zinc-700">
            Featured on site
          </label>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition"
        >
          {isEdit ? "Save changes" : "Add testimonial"}
        </button>
        <Link
          href="/admin/testimonials"
          className="rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
