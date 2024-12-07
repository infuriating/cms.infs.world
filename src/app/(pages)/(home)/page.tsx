import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";

export default async function WorkWrapper() {
  const projects = await fetchQuery(api.project.getAll);
  const feed = await fetchQuery(api.feed.getAll);

  return (
    <div className="px-4 md:px-12 lg:px-24 py-12">
      <div className="text-3xl lg:text-5xl bg-clip-text text-transparent font-bold bg-gradient-to-r w-max from-cyan-500 to-fuchsia-500">
        infs.world
      </div>
      <div className="grid lg:grid-cols-3 gap-6 py-4 lg:py-12">
        <div>
          <div className="w-max py-2 space-y-1.5">
            <h2 className="text-4xl font-bold">Projects</h2>
            <p className="text-sm">
              There {projects.length === 1 ? "is" : "are"} {projects.length}{" "}
              project{projects.length === 1 ? "" : "s"}.
            </p>
            <Link
              href={"/add-project"}
              className={buttonVariants({
                variant: "link",
                className: "px-0",
              })}
            >
              &rarr; Add Project
            </Link>
            <Separator className="bg-neutral-100/35" />
          </div>
          <ul>
            {projects.map((project) => (
              <Link href={`/project/${project.slug}`} key={project._id}>
                <li>{project.title}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <div className="w-max py-2 space-y-1.5">
            <h2 className="text-4xl font-bold">Feed</h2>
            <p className="text-sm">
              There {feed.length === 1 ? "is" : "are"} {feed.length} feed post
              {feed.length === 1 ? "" : "s"}.
            </p>
            <Link
              href={"/add-feed-post"}
              className={buttonVariants({
                variant: "link",
                className: "px-0",
              })}
            >
              &rarr; Add Feed Post
            </Link>
            <Separator className="bg-neutral-100/35" />
          </div>
          <ul>
            {feed.map((feedPost: Doc<"feed">) => (
              <Link href={`/feed-post/${feedPost.slug}`} key={feedPost._id}>
                <li>{feedPost.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
