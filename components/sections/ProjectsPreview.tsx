import { ProjectsSlider } from "@/components/ProjectsSlider";

type Project = {
  slug: string;
  title: string;
  shortDescription: string | null;
  category: string;
  featuredImageUrl: string | null;
};

type ProjectsPreviewProps = { projects: Project[] };

export function ProjectsPreview({ projects }: ProjectsPreviewProps) {
  return <ProjectsSlider projects={projects} />;
}
