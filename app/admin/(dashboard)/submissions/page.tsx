import Link from "next/link";
import { getAllSubmissions } from "@/lib/admin-data";
import { MarkReadButton } from "./MarkReadButton";

export default async function AdminSubmissionsPage() {
  const submissions = await getAllSubmissions();
  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Submissions</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Contact and quote form submissions from your site.
            {unreadCount > 0 && (
              <span className="ml-1 font-medium text-primary-600">{unreadCount} unread</span>
            )}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        {submissions.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="mt-4 text-zinc-600 font-medium">No submissions yet</p>
            <p className="mt-1 text-sm text-zinc-400">
              When visitors use your contact or quote form, they will appear here.
            </p>
            <Link
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 transition"
            >
              View contact form on site
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {submissions.map((s) => (
              <div
                key={s.id}
                className={`px-6 py-5 hover:bg-zinc-50/50 transition ${!s.read ? "bg-primary-50/20" : ""}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-zinc-900">{s.name}</span>
                      {!s.read && (
                        <span className="inline-flex rounded-full bg-primary-500 px-2.5 py-0.5 text-xs font-medium text-white">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-600">
                      <a href={`mailto:${s.email}`} className="hover:text-primary-600 underline">
                        {s.email}
                      </a>
                    </p>
                    {s.phone && (
                      <p className="text-sm text-zinc-600">
                        <a href={`tel:${s.phone}`} className="hover:text-primary-600">
                          {s.phone}
                        </a>
                      </p>
                    )}
                    {s.projectType && (
                      <p className="text-sm text-zinc-500">
                        <span className="font-medium">Project type:</span> {s.projectType}
                      </p>
                    )}
                    {s.source && (
                      <p className="text-sm text-zinc-500">
                        <span className="font-medium">Source:</span> {s.source}
                      </p>
                    )}
                    {s.message && (
                      <div className="mt-3 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700 border border-zinc-100">
                        {s.message}
                      </div>
                    )}
                    <p className="text-xs text-zinc-400 mt-2">
                      {new Date(s.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <MarkReadButton submissionId={s.id} read={s.read} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
