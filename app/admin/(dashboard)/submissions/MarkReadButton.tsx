"use client";

import { useRouter } from "next/navigation";

export function MarkReadButton({
  submissionId,
  read,
}: {
  submissionId: string;
  read: boolean;
}) {
  const router = useRouter();

  async function handleClick() {
    await fetch(`/api/admin/submissions/${submissionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !read }),
    });
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
    >
      {read ? "Mark unread" : "Mark read"}
    </button>
  );
}
