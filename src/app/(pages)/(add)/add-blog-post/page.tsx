"use client";

import { useMutation } from "convex/react";
import React, { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AddBlogPost() {
  const router = useRouter();
  const addBlogPostMutation = useMutation(api.blog.addBlogPost);
  const [blogPostData, setBlogPostData] = useState({
    title: "",
    content: [""],
    image: "",
    tags: [""],
  });

  const addBlogPost = async () => {
    await addBlogPostMutation(blogPostData);
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full md:max-w-2xl lg:max-w-3xl">
        <CardHeader>
          <CardTitle>Add a blog post</CardTitle>
          <CardDescription>
            You are currently creating a new blog post.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="title">Title</Label>
            <Input
              value={blogPostData.title}
              onChange={(e) =>
                setBlogPostData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="content">
              Content{" "}
              <span className="text-xs">
                (<i>Markdown</i>)
              </span>
            </Label>
            <Textarea
              className="h-96"
              value={blogPostData.content}
              onChange={(e) =>
                setBlogPostData((prev) => ({
                  ...prev,
                  content: [e.target.value],
                }))
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="tags">Tags</Label>
            <Input
              value={blogPostData.tags}
              onChange={(e) =>
                setBlogPostData((prev) => ({
                  ...prev,
                  tags: [e.target.value],
                }))
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="image">Image</Label>
            <Input
              value={blogPostData.image}
              onChange={(e) =>
                setBlogPostData((prev) => ({
                  ...prev,
                  image: e.target.value,
                }))
              }
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={addBlogPost} className="w-full" type="submit">
            Add Blog Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
