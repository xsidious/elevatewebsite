import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "../../ProjectForm";
import { updateProject } from "../../actions";

const CATEGORIES = [
  "Kitchen",
  "Bathroom",
  "Full Renovation",
  "Home Renovation",
  "Interior Remodel",
  "Restoration",
  "Other",
];

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
  if (!project) notFound();

  async function updateAction(formData: FormData) {
    "use server";
    return updateProject(id, formData);
  }

  return (
    <div>
      <Link href="/admin/projects" className="text-sm text-primary-600 hover:underline mb-4 inline-block">
        ← Back to projects
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit project</h1>
      <ProjectForm
        action={updateAction}
        categories={CATEGORIES}
        initial={{
          title: project.title,
          slug: project.slug,
          shortDescription: project.shortDescription ?? "",
          fullDescription: project.fullDescription ?? "",
          category: project.category,
          location: project.location ?? "",
          published: project.published,
          featuredImageUrl: project.featuredImageUrl,
          gallery: project.images,
        }}
      />
    </div>
  );
}
