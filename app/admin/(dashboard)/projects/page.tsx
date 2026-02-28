import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { DeleteProjectButton } from "./DeleteProjectButton";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    include: { images: { take: 1 } },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Projects</h1>
          <p className="mt-1 text-sm text-zinc-500">Manage your portfolio and renovation projects.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 transition shrink-0"
        >
          Add project
        </Link>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        {projects.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-zinc-500">No projects yet.</p>
            <Link href="/admin/projects/new" className="mt-3 inline-flex text-sm font-medium text-primary-600 hover:underline">
              Add your first project →
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {projects.map((p) => (
              <li key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-50/50 transition">
                <div className="h-14 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100">
                  {p.featuredImageUrl ? (
                    <Image
                      src={p.featuredImageUrl}
                      alt=""
                      width={80}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-zinc-400 text-xs">No img</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/admin/projects/${p.id}/edit`} className="font-medium text-zinc-900 hover:text-primary-600 truncate block">
                    {p.title}
                  </Link>
                  <p className="text-sm text-zinc-500">{p.category}</p>
                </div>
                <span className={`shrink-0 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${p.published ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600"}`}>
                  {p.published ? "Published" : "Draft"}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/projects/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/projects/${p.id}/edit`}
                    className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
                  >
                    Edit
                  </Link>
                  <DeleteProjectButton projectId={p.id} projectTitle={p.title} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
