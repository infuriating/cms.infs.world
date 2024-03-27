import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("blogPosts").order("desc").collect();
  },
});

export const getLatestTwo = query({
  handler: async (ctx) => {
    return await ctx.db.query("blogPosts").order("desc").take(2);
  },
});

export const getBlogPost = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, { slug }) => {
    const project = await ctx.db
      .query("blogPosts")
      .filter((q) => q.eq(q.field("slug"), slug))
      .first();

    return project;
  },
});

export const addBlogPost = mutation({
  args: {
    title: v.string(),
    content: v.array(v.string()),
    tags: v.array(v.string()),
    image: v.string(),
  },
  handler: async (ctx, { title, content, tags, image }) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "")
      .replace(/ /g, "-");
    content = content[0].split("\n");
    tags = tags[0].split(",");

    const project = await ctx.db.insert("blogPosts", {
      content,
      slug,
      tags,
      title,
      image,
    });

    return project;
  },
});

export const updateBlogPost = mutation({
  args: {
    _id: v.string(),
    title: v.string(),
    content: v.array(v.string()),
    tags: v.array(v.string()),
    image: v.string(),
  },
  handler: async (ctx, { _id, title, content, tags, image }) => {
    const blogPost = await ctx.db
      .query("blogPosts")
      .filter((q) => q.eq(q.field("_id"), _id))
      .first();
    if (!blogPost) throw new ConvexError("Project not found");

    title ? (blogPost.title = title) : (blogPost.title = blogPost.title);
    (blogPost.slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "")
      .replace(/ /g, "-")),
      content
        ? (blogPost.content = content)
        : (blogPost.content = blogPost.content);
    tags ? (blogPost.tags = tags) : (blogPost.tags = blogPost.tags);
    image ? (blogPost.image = image) : (blogPost.image = blogPost.image);

    content = content[0].split("\n");
    tags = tags[0].split(",");

    return await ctx.db.replace(blogPost._id, blogPost);
  },
});

export const deleteBlogPost = mutation({
  args: {
    _id: v.string(),
  },
  handler: async (ctx, { _id }) => {
    const blogPost = await ctx.db
      .query("blogPosts")
      .filter((q) => q.eq(q.field("_id"), _id))
      .first();
    if (!blogPost) throw new ConvexError("Project not found");

    return await ctx.db.delete(blogPost._id);
  },
});
