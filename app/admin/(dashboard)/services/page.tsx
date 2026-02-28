import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Services</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Edit service names, taglines, and descriptions shown on the site.
        </p>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        {services.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">
            No services in the database. Run the seed script to add default services.
          </div>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {services.map((s) => (
              <li key={s.id} className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-50/50 transition">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-zinc-900">{s.name}</p>
                  {s.tagline && (
                    <p className="text-sm text-primary-600">{s.tagline}</p>
                  )}
                  <p className="text-sm text-zinc-500 truncate mt-0.5">{s.slug}</p>
                </div>
                <Link
                  href={`/admin/services/${s.id}/edit`}
                  className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition shrink-0"
                >
                  Edit
                </Link>
                <Link
                  href={`/services/${s.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary-600 hover:underline shrink-0"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
