import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getAll = query({
  handler: async (ctx) => {
    const games = await ctx.db.query("games").collect();
    games.sort((a, b) => a.title.localeCompare(b.title));

    return games;
  },
});

export const getGame = query({
  args: {
    _id: v.string(),
  },
  handler: async (ctx, { _id }) => {
    const game = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("_id"), _id))
      .first();

    return game;
  },
});

export const addGame = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("played"),
      v.literal("currentlyPlaying"),
      v.literal("completed")
    ),
    difficulties: v.optional(v.array(v.string())),
    hoursPlayed: v.optional(v.number()),
    platform: v.array(v.string()),
  },
  handler: async (
    ctx,
    { title, description, status, difficulties, hoursPlayed, platform }
  ) => {
    difficulties && (difficulties = difficulties[0].split(","));
    platform && (platform = platform[0].split(","));

    const game = await ctx.db.insert("games", {
      title,
      description,
      status,
      difficulties,
      hoursPlayed,
      platform,
    });

    return game;
  },
});

export const updateGame = mutation({
  args: {
    _id: v.string(),
    title: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("played"),
      v.literal("currentlyPlaying"),
      v.literal("completed")
    ),
    difficulties: v.optional(v.array(v.string())),
    hoursPlayed: v.optional(v.number()),
    platform: v.array(v.string()),
  },
  handler: async (
    ctx,
    { _id, title, description, status, difficulties, hoursPlayed, platform }
  ) => {
    const game = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("_id"), _id))
      .first();
    if (!game) throw new ConvexError("Project not found");

    title ? (game.title = title) : (game.title = game.title);
    description
      ? (game.description = description)
      : (game.description = game.description);
    status ? (game.status = status) : (game.status = game.status);
    difficulties
      ? (game.difficulties = difficulties)
      : (game.difficulties = game.difficulties);
    hoursPlayed
      ? (game.hoursPlayed = hoursPlayed)
      : (game.hoursPlayed = game.hoursPlayed);
    platform ? (game.platform = platform) : (game.platform = game.platform);

    difficulties && (game.difficulties = difficulties[0].split(","));
    platform && (game.platform = platform[0].split(","));

    return await ctx.db.replace(game._id, game);
  },
});

export const deleteGame = mutation({
  args: {
    _id: v.string(),
  },
  handler: async (ctx, { _id }) => {
    const game = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("_id"), _id))
      .first();
    if (!game) throw new ConvexError("Game not found");

    return await ctx.db.delete(game._id);
  },
});
