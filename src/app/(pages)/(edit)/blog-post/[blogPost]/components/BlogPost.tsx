"use client";

import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import React, { useState } from "react";
import { api } from "../../../../../../../convex/_generated/api";
import NoProjectFound from "@/components/NoProjectFound";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

import ReactMarkdown from "react-markdown";
import "./blogpost.css";
import { Separator } from "@/components/ui/separator";
import { SyntaxHighlighting } from "@/components/SyntaxHighlighting";

export default function BlogPost(params: {
  preloadedBlogPost: Preloaded<typeof api.blog.getBlogPost>;
}) {
  const router = useRouter();
  const blogPost = usePreloadedQuery(params.preloadedBlogPost);
  const updateBlogPost = useMutation(api.blog.updateBlogPost);
  const deleteBlogPost = useMutation(api.blog.deleteBlogPost);

  const [markdownPreview, setMarkdownPreview] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [blogPostData, setBlogPostData] = useState({
    title: blogPost?.title,
    content: blogPost?.content,
    tags: blogPost?.tags,
    image: blogPost?.image,
    _id: blogPost?._id,
  });

  if (!blogPost) return <NoProjectFound />;

  const saveBlogPost = async () => {
    // @ts-ignore
    await updateBlogPost(blogPostData);
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full md:max-w-2xl lg:max-w-3xl">
        <CardHeader>
          <CardTitle>{blogPost.title}</CardTitle>
          <CardDescription>
            You are currently editing this blog post.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="space-y-1 flex flex-col"></div>
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
          <div className="space-y-1 flex flex-col relative">
            {!markdownPreview ? (
              <>
                <Label htmlFor="content">
                  Content{" "}
                  <span className="text-xs">
                    (<i>Markdown</i>)
                  </span>
                </Label>
                <Textarea
                  className="h-96"
                  value={blogPostData.content?.join("\n")}
                  onChange={(e) =>
                    setBlogPostData((prev) => ({
                      ...prev,
                      content: [e.target.value],
                    }))
                  }
                />
              </>
            ) : (
              <>
                <Label htmlFor="content">
                  Content{" "}
                  <span className="text-xs">
                    (<i>Markdown</i>)
                  </span>
                </Label>
                <Separator />
                <ReactMarkdown
                  className={"react-markdown"}
                  // @ts-ignore
                  components={SyntaxHighlighting}
                >
                  {blogPostData.content?.join("\n")}
                </ReactMarkdown>
                <Separator />
              </>
            )}
            <Button
              className="absolute bottom-0 right-0"
              onClick={() => setMarkdownPreview(!markdownPreview)}
            >
              {markdownPreview ? "Edit" : "Preview"}
            </Button>
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="tags">Tags</Label>
            <Input
              // @ts-expect-error blogPostData.tags is possibly 'undefined'
              value={blogPostData.tags.join(", ")}
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

        <CardFooter className="flex-col gap-y-1">
          <Button onClick={saveBlogPost} className="w-full" type="submit">
            Update Blog Post
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
                  deleteBlogPost({ _id: blogPostData._id });
                  router.push("/");
                }}
                className="w-full"
                variant="destructive"
              >
                Delete Blog Post
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
              Delete Blog Post
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
