import Link from "next/link";
import { ProjectForm } from "../ProjectForm";
import { createProject } from "../actions";

const CATEGORIES = [
  "Kitchen",
  "Bathroom",
  "Full Renovation",
  "Home Renovation",
  "Interior Remodel",
  "Restoration",
  "Other",
];

export default function NewProjectPage() {
  return (
    <div>
      <Link href="/admin/projects" className="text-sm text-primary-600 hover:underline mb-4 inline-block">
        ← Back to projects
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Add project</h1>
      <ProjectForm action={createProject} categories={CATEGORIES} />
    </div>
  );
}
