"use client";

import NoProjectFound from "@/components/NoProjectFound";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../../../../../convex/_generated/api";
import { Doc } from "../../../../../../../convex/_generated/dataModel";

export default function Project({ project }: { project: Doc<"projects"> }) {
  const router = useRouter();
  const updateProject = useMutation(api.project.updateProject);
  const deleteProject = useMutation(api.project.deleteProject);

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [projectData, setProjectData] = useState({
    _id: project?._id,
    title: project?.title,
    description: project?.description,
    images: project?.images,
    technologies: project?.technologies,
    tags: project?.tags,
    github: project?.github,
    website: project?.website,
    collaborators: project?.collaborators,
    inDevelopment: project?.inDevelopment,
  });

  if (!project) return <NoProjectFound />;

  const update = async () => {
    // @ts-ignore
    await updateProject(projectData);
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full md:max-w-2xl lg:max-w-3xl">
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>
            You are currently editing this project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="title">Title</Label>
            <Input
              value={projectData.title}
              onChange={(e) =>
                setProjectData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="description">Description</Label>
            <Input
              value={projectData.description}
              onChange={(e) =>
                setProjectData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="images">Images</Label>
            <Input
              value={projectData.images}
              onChange={(e) =>
                setProjectData((prev) => ({
                  ...prev,
                  images: [e.target.value],
                }))
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="technologies">Technologies</Label>
            <Input
              value={projectData.technologies.map((t) => t.name).join(", ")}
              onChange={(e) =>
                setProjectData((prev) => ({
                  ...prev,
                  technologies: e.target.value
                    .split(",")
                    .map((t) => ({
                      name: t.trim(),
                      url: "",
                    }))
                    .filter((t) => t.name),
                }))
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="tags">Tags</Label>
            <Input
              value={projectData.tags}
              onChange={(e) =>
                setProjectData((prev) => ({
                  ...prev,
                  tags: [e.target.value],
                }))
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="github">GitHub</Label>
            <Input
              value={projectData.github}
              onChange={(e) =>
                setProjectData((prev) => ({
                  ...prev,
                  github: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="website">Website</Label>
            <Input
              value={projectData.website}
              onChange={(e) =>
                setProjectData((prev) => ({
                  ...prev,
                  website: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="inDevelopment">In Development</Label>
            <Button
              variant={projectData.inDevelopment ? "default" : "secondary"}
              className="w-max"
              onClick={() =>
                setProjectData({
                  ...projectData,
                  inDevelopment: !projectData.inDevelopment,
                })
              }
            >
              {projectData.inDevelopment ? "True" : "False"}
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-y-1">
          <Button onClick={update} className="w-full" type="submit">
            Update Project
          </Button>
          {deleteConfirmation ? (
            <div className="flex w-full gap-x-2">
              <Button
                onClick={() => {
                  setDeleteConfirmation(false);
                }}
                className="w-full"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // @ts-ignore
                  deleteProject({ _id: project._id });
                  router.push("/");
                }}
                className="w-full"
                variant="destructive"
              >
                Delete Project
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => {
                setDeleteConfirmation(true);
              }}
              className="w-full"
              variant="destructive"
            >
              Delete Project
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
