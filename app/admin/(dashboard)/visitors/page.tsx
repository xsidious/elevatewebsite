import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  getSubmissionCount,
  getUnreadSubmissionCount,
  getRecentSubmissions,
  getRecentVisitorLogs,
  getVisitorLogCount,
  getVisitorsByCountry,
} from "@/lib/admin-data";
import { countryDisplay } from "@/lib/country-names";

export default async function AdminVisitorsPage() {
  const [
    submissionCount,
    unreadCount,
    projectCount,
    blogCount,
    recentSubmissions,
    visitorLogCount,
    recentVisitors,
    byCountry,
  ] = await Promise.all([
    getSubmissionCount(),
    getUnreadSubmissionCount(),
    prisma.project.count({ where: { published: true } }),
    prisma.blogPost.count({ where: { published: true } }),
    getRecentSubmissions(10),
    getVisitorLogCount(),
    getRecentVisitorLogs(50),
    getVisitorsByCountry(),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Visitors & activity</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Page views (with location from Vercel when deployed) and contact form activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">Page views</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 tabular-nums">{visitorLogCount}</p>
          <p className="mt-0.5 text-xs text-zinc-400">Tracked visits (with location on Vercel)</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">Total submissions</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 tabular-nums">{submissionCount}</p>
          <p className="mt-0.5 text-xs text-zinc-400">Contact / quote form</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">Unread</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 tabular-nums">{unreadCount}</p>
          <p className="mt-0.5 text-xs text-zinc-400">
            <Link href="/admin/submissions" className="text-primary-600 hover:underline font-medium">
              View submissions →
            </Link>
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">Public content</p>
          <p className="mt-2 text-xl font-bold text-zinc-900">
            {projectCount} projects · {blogCount} posts
          </p>
          <p className="mt-0.5 text-xs text-zinc-400">Live on site</p>
        </div>
      </div>

      {/* Visitors by location */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="font-semibold text-zinc-900">Visitors by location</h2>
          <p className="mt-0.5 text-sm text-zinc-500">
            Page views grouped by country (from Vercel geo headers when deployed).
          </p>
        </div>
        <div className="p-6">
          {byCountry.length === 0 ? (
            <p className="text-sm text-zinc-500 text-center py-8">
              No visitor data yet. Visit your site from different pages; locations appear after deployment on Vercel (geo headers are available on Pro/Enterprise).
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {byCountry.map(({ country, count }) => (
                <div
                  key={country ?? "unknown"}
                  className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5"
                >
                  <span className="text-lg font-bold text-zinc-900 tabular-nums">{count}</span>
                  <span className="text-sm font-medium text-zinc-700">
                    {countryDisplay(country)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent page views with location */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="font-semibold text-zinc-900">Recent page views</h2>
          <p className="mt-0.5 text-sm text-zinc-500">Path and location (city/region/country).</p>
        </div>
        <div className="overflow-x-auto">
          {recentVisitors.length === 0 ? (
            <p className="px-6 py-12 text-sm text-zinc-500 text-center">
              No page views logged yet. Data is recorded when visitors load your site (marketing pages).
            </p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/50">
                  <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Path</th>
                  <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentVisitors.map((v) => (
                  <tr key={v.id} className="border-b border-zinc-100 hover:bg-zinc-50/50 transition">
                    <td className="px-6 py-4 font-mono text-sm text-zinc-800">{v.path || "/"}</td>
                    <td className="px-6 py-4 text-sm text-zinc-600">
                      {[v.city, v.countryRegion, countryDisplay(v.country)].filter(Boolean).join(", ") || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500">
                      {new Date(v.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Recent contact submissions */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="font-semibold text-zinc-900">Recent contact activity</h2>
          <p className="mt-0.5 text-sm text-zinc-500">Latest form submissions from your site.</p>
        </div>
        <div className="overflow-x-auto">
          {recentSubmissions.length === 0 ? (
            <p className="px-6 py-12 text-sm text-zinc-500 text-center">
              No submissions yet. They will appear here when visitors use your contact or quote form.
            </p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/50">
                  <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider" />
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((s) => (
                  <tr key={s.id} className="border-b border-zinc-100 hover:bg-zinc-50/50 transition">
                    <td className="px-6 py-4">
                      <span className="font-medium text-zinc-900">{s.name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600">{s.email}</td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{s.source ?? "—"}</td>
                    <td className="px-6 py-4 text-sm text-zinc-500">
                      {new Date(s.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href="/admin/submissions"
                        className="text-sm font-medium text-primary-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
