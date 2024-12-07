import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("feed").order("desc").collect();
  },
});

export const getLatestTwo = query({
  handler: async (ctx) => {
    return await ctx.db.query("feed").order("desc").take(2);
  },
});

export const getFeedPost = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, { slug }) => {
    const feedPost = await ctx.db
      .query("feed")
      .filter((q) => q.eq(q.field("slug"), slug))
      .first();

    return feedPost;
  },
});

export const addFeedPost = mutation({
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

    const feedPost = await ctx.db.insert("feed", {
      content,
      slug,
      tags,
      title,
      image,
    });

    return feedPost;
  },
});

export const updateFeedPost = mutation({
  args: {
    _id: v.string(),
    title: v.string(),
    content: v.array(v.string()),
    tags: v.array(v.string()),
    image: v.string(),
  },
  handler: async (ctx, { _id, title, content, tags, image }) => {
    const feedPost = await ctx.db
      .query("feed")
      .filter((q) => q.eq(q.field("_id"), _id))
      .first();
    if (!feedPost) throw new ConvexError("Post not found");

    title ? (feedPost.title = title) : (feedPost.title = feedPost.title);
    (feedPost.slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "")
      .replace(/ /g, "-")),
      content
        ? (feedPost.content = content)
        : (feedPost.content = feedPost.content);
    tags ? (feedPost.tags = tags) : (feedPost.tags = feedPost.tags);
    image ? (feedPost.image = image) : (feedPost.image = feedPost.image);

    content = content[0].split("\n");
    tags = tags[0].split(",");

    return await ctx.db.replace(feedPost._id, feedPost);
  },
});

export const deleteFeedPost = mutation({
  args: {
    _id: v.string(),
  },
  handler: async (ctx, { _id }) => {
    const feedPost = await ctx.db
      .query("feed")
      .filter((q) => q.eq(q.field("_id"), _id))
      .first();
    if (!feedPost) throw new ConvexError("Post not found");

    return await ctx.db.delete(feedPost._id);
  },
});
