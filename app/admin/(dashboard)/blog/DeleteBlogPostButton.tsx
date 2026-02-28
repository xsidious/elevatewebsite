"use client";

import { useTransition } from "react";
import { deleteBlogPost } from "./actions";

export function DeleteBlogPostButton({ postId, postTitle }: { postId: string; postTitle: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => {
        if (!confirm(`Delete "${postTitle}"?`)) return;
        startTransition(() => deleteBlogPost(postId));
      }}
      disabled={pending}
      className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
