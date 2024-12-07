import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

export const getLatestTwo = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").order("desc").take(2);
  },
});

export const getProject = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, { slug }) => {
    const project = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("slug"), slug))
      .first();

    return project;
  },
});

export const addProject = mutation({
  args: {
    title: v.string(),
    short_description: v.string(),
    description: v.optional(v.string()),
    images: v.array(v.string()),
    inDevelopment: v.boolean(),
    technologies: v.array(
      v.object({
        name: v.string(),
        url: v.string(),
      })
    ),
    collaborators: v.optional(
      v.array(
        v.object({
          name: v.string(),
          role: v.string(),
          github: v.optional(v.string()),
          linkedin: v.optional(v.string()),
          website: v.optional(v.string()),
        })
      )
    ),
    github: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const slug = args.title
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const processedImages =
      Array.isArray(args.images) && args.images.length > 0
        ? args.images[0].includes(",")
          ? args.images[0].split(",")
          : args.images
        : [];

    const processedTags =
      args.tags && Array.isArray(args.tags) && args.tags.length > 0
        ? args.tags[0].includes(",")
          ? args.tags[0].split(",")
          : args.tags
        : undefined;

    const projectData = {
      ...args,
      slug,
      images: processedImages,
      tags: processedTags,
    };

    const project = await ctx.db.insert("projects", projectData);
    return project;
  },
});

export const updateProject = mutation({
  args: {
    _id: v.string(),
    title: v.string(),
    short_description: v.string(),
    description: v.optional(v.string()),
    images: v.array(v.string()),
    inDevelopment: v.boolean(),
    technologies: v.array(
      v.object({
        name: v.string(),
        url: v.string(),
      })
    ),
    collaborators: v.optional(
      v.array(
        v.object({
          name: v.string(),
          role: v.string(),
          github: v.optional(v.string()),
          linkedin: v.optional(v.string()),
          website: v.optional(v.string()),
        })
      )
    ),
    github: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { _id, ...updateFields } = args;

    const project = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("_id"), _id))
      .first();
    if (!project) throw new ConvexError("Project not found");

    const processedImages =
      Array.isArray(updateFields.images) && updateFields.images.length > 0
        ? updateFields.images[0].includes(",")
          ? updateFields.images[0].split(",")
          : updateFields.images
        : project.images;

    const processedTags =
      updateFields.tags &&
      Array.isArray(updateFields.tags) &&
      updateFields.tags.length > 0
        ? updateFields.tags[0].includes(",")
          ? updateFields.tags[0].split(",")
          : updateFields.tags
        : project.tags || undefined;

    const slug = updateFields.title
      ? updateFields.title
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "")
      : project.slug;

    const updatedProject = {
      ...project,
      ...updateFields,
      images: processedImages,
      tags: processedTags,
      slug,
    };

    return await ctx.db.replace(project._id, updatedProject);
  },
});

export const deleteProject = mutation({
  args: {
    _id: v.string(),
  },
  handler: async (ctx, { _id }) => {
    const project = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("_id"), _id))
      .first();
    if (!project) throw new ConvexError("Project not found");

    await ctx.db.delete(project._id);
  },
});
