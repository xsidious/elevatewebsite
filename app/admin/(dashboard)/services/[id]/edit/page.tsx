import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "../../ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/services" className="text-sm text-primary-600 hover:underline mb-4 inline-block">
          ← Services
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Edit service</h1>
        <p className="mt-1 text-sm text-zinc-500">Slug: {service.slug} (used in URL)</p>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm max-w-2xl">
        <ServiceForm
          serviceId={service.id}
          initial={{
            name: service.name,
            tagline: service.tagline ?? "",
            shortDescription: service.shortDescription ?? "",
            longDescription: service.longDescription ?? "",
            sortOrder: service.sortOrder,
          }}
        />
      </div>
    </div>
  );
}
