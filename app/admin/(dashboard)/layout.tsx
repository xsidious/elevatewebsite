import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { getUnreadSubmissionCount } from "@/lib/admin-data";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }
  const unreadSubmissions = await getUnreadSubmissionCount();

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 w-64 bg-zinc-900 flex flex-col">
        <div className="flex h-16 items-center px-6 border-b border-zinc-800">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-white font-semibold text-lg tracking-tight">ELEVATE</span>
            <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Admin</span>
          </Link>
        </div>
        <AdminNav unreadSubmissions={unreadSubmissions} />
        <div className="p-3 border-t border-zinc-800 space-y-0.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors text-sm font-medium"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View site
          </a>
          <a
            href="/api/auth/signout"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors text-sm font-medium"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 backdrop-blur-sm px-8">
          <div className="h-6 w-px" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-500">{session.user?.email}</span>
            <span className="h-8 w-px bg-zinc-200" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-200 text-gray-900 text-sm font-semibold">
              {(session.user?.email ?? "A").charAt(0).toUpperCase()}
            </span>
          </div>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
