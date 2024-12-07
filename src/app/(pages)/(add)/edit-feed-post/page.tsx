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
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";

import { SyntaxHighlighting } from "@/components/SyntaxHighlighting";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";

export default function AddFeedPost() {
  const router = useRouter();
  const addFeedPostMutation = useMutation(api.feed.addFeedPost);

  const [markdownPreview, setMarkdownPreview] = useState(false);
  const [feedPostData, setFeedPostData] = useState({
    title: "",
    content: [""],
    image: "",
    tags: [""],
  });

  const addFeedPost = async () => {
    await addFeedPostMutation(feedPostData);
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full md:max-w-2xl lg:max-w-3xl">
        <CardHeader>
          <CardTitle>Add a feed post</CardTitle>
          <CardDescription>
            You are currently creating a new feed post.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="title">Title</Label>
            <Input
              value={feedPostData.title}
              onChange={(e) =>
                setFeedPostData((prev) => ({
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
                  value={feedPostData.content?.join("\n")}
                  onChange={(e) =>
                    setFeedPostData((prev) => ({
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
                  className={
                    "prose prose-invert prose-h2:mt-2 prose-img:rounded-sm prose-img:shadow-md"
                  }
                  // @ts-ignore
                  components={SyntaxHighlighting}
                >
                  {feedPostData.content?.join("\n")}
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
              value={feedPostData.tags.join(", ")}
              onChange={(e) =>
                setFeedPostData((prev) => ({
                  ...prev,
                  tags: [e.target.value],
                }))
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="image">Image</Label>
            <Input
              value={feedPostData.image}
              onChange={(e) =>
                setFeedPostData((prev) => ({
                  ...prev,
                  image: e.target.value,
                }))
              }
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={addFeedPost} className="w-full" type="submit">
            Add Feed Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
