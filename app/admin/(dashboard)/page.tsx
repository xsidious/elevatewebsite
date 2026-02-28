import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSubmissionCount, getRecentSubmissions } from "@/lib/admin-data";

export default async function AdminDashboardPage() {
  const [projectCount, blogCount, submissionCount, testimonialCount, recentProjects, recentSubmissions] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count({ where: { published: true } }),
    getSubmissionCount(),
    prisma.testimonial.count(),
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, title: true, slug: true, published: true, updatedAt: true },
    }),
    getRecentSubmissions(5),
  ]);

  const statCards = [
    {
      href: "/admin/projects",
      label: "Projects",
      value: projectCount,
      sub: "Portfolio items",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      href: "/admin/submissions",
      label: "Submissions",
      value: submissionCount,
      sub: "Contact form leads",
      gradient: "from-primary-500 to-primary-700",
    },
    {
      href: "/admin/blog",
      label: "Blog posts",
      value: blogCount,
      sub: "Published articles",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      href: "/admin/testimonials",
      label: "Testimonials",
      value: testimonialCount,
      sub: "Customer reviews",
      gradient: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">Overview of your site and recent activity.</p>
      </div>

      {/* Stat cards - more visual */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm hover:shadow-lg hover:border-zinc-300 transition-all duration-200 overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-br ${card.gradient} opacity-10`} />
            <div className="relative">
              <div>
                <p className="text-sm font-medium text-zinc-500">{card.label}</p>
                <p className="mt-2 text-3xl font-bold text-zinc-900 tabular-nums">{card.value}</p>
                <p className="mt-0.5 text-xs text-zinc-400">{card.sub}</p>
              </div>
            </div>
            <p className="relative mt-4 text-xs font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
              View all →
            </p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-medium text-gray-900 shadow-sm hover:bg-primary-700 hover:shadow transition"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New project
          </Link>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            New post
          </Link>
          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m5 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            New testimonial
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Site settings
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent projects */}
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
            <h2 className="font-semibold text-zinc-900">Recent projects</h2>
            <Link href="/admin/projects" className="text-sm font-medium text-primary-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-zinc-100">
            {recentProjects.length === 0 ? (
              <p className="px-6 py-10 text-sm text-zinc-500 text-center">No projects yet. Add your first project.</p>
            ) : (
              recentProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/projects/${p.id}/edit`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50/80 transition"
                >
                  <div>
                    <p className="font-medium text-zinc-900">{p.title}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {new Date(p.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      p.published ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {p.published ? "Published" : "Draft"}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent submissions */}
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
            <h2 className="font-semibold text-zinc-900">Recent submissions</h2>
            <Link href="/admin/submissions" className="text-sm font-medium text-primary-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-zinc-100">
            {recentSubmissions.length === 0 ? (
              <p className="px-6 py-10 text-sm text-zinc-500 text-center">No contact form submissions yet.</p>
            ) : (
              recentSubmissions.map((s) => (
                <Link
                  key={s.id}
                  href="/admin/submissions"
                  className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50/80 transition"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-zinc-900 truncate">{s.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{s.email}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    {!s.read && (
                      <span className="h-2 w-2 rounded-full bg-primary-500" title="Unread" />
                    )}
                    <span className="text-xs text-zinc-500">
                      {new Date(s.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
