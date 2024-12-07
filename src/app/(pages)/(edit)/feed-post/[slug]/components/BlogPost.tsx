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
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../../../../../convex/_generated/api";

import { SyntaxHighlighting } from "@/components/SyntaxHighlighting";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import { Doc } from "../../../../../../../convex/_generated/dataModel";

export default function BlogPost({ feedPost }: { feedPost: Doc<"feed"> }) {
  const router = useRouter();
  const updateFeedPost = useMutation(api.feed.updateFeedPost);
  const deleteFeedPost = useMutation(api.feed.deleteFeedPost);

  const [markdownPreview, setMarkdownPreview] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [feedPostData, setFeedPostData] = useState({
    title: feedPost?.title,
    content: feedPost?.content,
    tags: feedPost?.tags,
    image: feedPost?.image,
    _id: feedPost?._id,
  });

  if (!feedPost) return <NoProjectFound />;

  const saveFeedPost = async () => {
    // @ts-ignore
    await updateFeedPost(feedPostData);
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full md:max-w-2xl lg:max-w-3xl">
        <CardHeader>
          <CardTitle>{feedPost.title}</CardTitle>
          <CardDescription>
            You are currently editing the feed post <i>{feedPost.title}</i>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="space-y-1 flex flex-col"></div>
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
              // @ts-expect-error blogPostData.tags is possibly 'undefined'
              value={blogPostData.tags.join(", ")}
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

        <CardFooter className="flex-col gap-y-1">
          <Button onClick={saveFeedPost} className="w-full" type="submit">
            Update Feed Post
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
                  deleteFeedPost({ _id: feedPostData._id });
                  router.push("/");
                }}
                className="w-full"
                variant="destructive"
              >
                Delete Feed Post
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
              Delete Feed Post
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
