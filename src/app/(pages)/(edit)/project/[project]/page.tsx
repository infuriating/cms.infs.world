import { preloadQuery } from "convex/nextjs";
import React from "react";
import { api } from "../../../../../../convex/_generated/api";
import Project from "./components/Project";

export default async function ProjectPage({
  params,
}: {
  params: { project: string };
}) {
  const preloadedProject = await preloadQuery(api.project.getProject, {
    slug: params.project,
  });
  return <Project preloadedProject={preloadedProject} />;
}
