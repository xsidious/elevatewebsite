"use client";

import { useTransition } from "react";
import { deleteProject } from "./actions";

export function DeleteProjectButton({ projectId, projectTitle }: { projectId: string; projectTitle: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => {
        if (!confirm(`Delete "${projectTitle}"?`)) return;
        startTransition(() => deleteProject(projectId));
      }}
      disabled={pending}
      className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
