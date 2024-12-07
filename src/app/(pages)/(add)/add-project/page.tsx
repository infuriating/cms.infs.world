"use client";

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
import { api } from "../../../../../convex/_generated/api";

export default function AddProject() {
  const addProjectMutation = useMutation(api.project.addProject);
  const router = useRouter();

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    images: [""],
    technologies: [""],
    tags: [""],
    github: "",
    website: "",
    collaborators: [],
    inDevelopment: false,
  });

  const addProject = async () => {
    await addProjectMutation(projectData);
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full md:max-w-2xl lg:max-w-3xl">
        <CardHeader>
          <CardTitle>Add a project</CardTitle>
          <CardDescription>
            You are currently creating a new project.
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
              value={projectData.technologies}
              onChange={(e) =>
                setProjectData((prev) => ({
                  ...prev,
                  technologies: [e.target.value],
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

        <CardFooter>
          <Button onClick={addProject} className="w-full" type="submit">
            Add Project
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
