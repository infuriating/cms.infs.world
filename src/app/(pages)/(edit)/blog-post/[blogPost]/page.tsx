import { preloadQuery } from "convex/nextjs";
import React from "react";
import { api } from "../../../../../../convex/_generated/api";
import BlogPost from "./components/BlogPost";

export default async function BlogPostPage({
  params,
}: {
  params: { blogPost: string };
}) {
  const preloadedBlogPost = await preloadQuery(api.blog.getBlogPost, {
    slug: params.blogPost,
  });
  return <BlogPost preloadedBlogPost={preloadedBlogPost} />;
}
