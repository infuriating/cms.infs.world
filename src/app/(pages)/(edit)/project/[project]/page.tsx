import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import Project from "./components/Project";

export default async function ProjectPage(props: {
  params: Promise<{ project: string }>;
}) {
  const params = await props.params;
  const project = await fetchQuery(api.project.getProject, {
    slug: params.project,
  });
  if (!project) return <>not found</>;
  return <Project project={project} />;
}
