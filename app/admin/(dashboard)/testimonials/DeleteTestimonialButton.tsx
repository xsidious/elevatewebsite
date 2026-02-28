"use client";

import { deleteTestimonial } from "./actions";

type Props = { testimonialId: string; authorName: string };

export function DeleteTestimonialButton({ testimonialId, authorName }: Props) {
  async function handleDelete() {
    if (!confirm(`Delete testimonial from ${authorName}?`)) return;
    await deleteTestimonial(testimonialId);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 transition"
    >
      Delete
    </button>
  );
}
