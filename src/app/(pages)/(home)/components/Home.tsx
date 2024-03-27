"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";

export default function Home(params: {
  preloadedProjects: Preloaded<typeof api.project.getAll>;
  preloadedBlogPosts: Preloaded<typeof api.blog.getAll>;
}) {
  const projects = usePreloadedQuery(params.preloadedProjects);
  const blogPosts = usePreloadedQuery(params.preloadedBlogPosts);

  return (
    <div className="px-4 md:px-12 lg:px-24 py-12">
      <div className="text-3xl lg:text-5xl bg-clip-text text-transparent font-bold bg-gradient-to-r w-max from-cyan-500 to-fuchsia-500">
        infs.world
      </div>
      <div className="grid lg:grid-cols-2 gap-6 py-4 lg:py-12">
        <div>
          <div className="w-max py-2 space-y-1.5">
            <h2 className="text-4xl font-bold">Projects</h2>
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
            <h2 className="text-4xl font-bold">Blog Posts</h2>
            <Link
              href={"/add-blog-post"}
              className={buttonVariants({
                variant: "link",
                className: "px-0",
              })}
            >
              &rarr; Add Blog Post
            </Link>
            <Separator className="bg-neutral-100/35" />
          </div>
          <ul>
            {blogPosts.map((blogPost) => (
              <Link href={`/blog-post/${blogPost.slug}`} key={blogPost._id}>
                <li>{blogPost.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
