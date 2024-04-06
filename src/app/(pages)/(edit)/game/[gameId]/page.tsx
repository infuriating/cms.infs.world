import { preloadQuery } from "convex/nextjs";
import React from "react";
import { api } from "../../../../../../convex/_generated/api";
import Game from "./components/Game";

export default async function GamePage({
  params,
}: {
  params: { gameId: string };
}) {
  const preloadedGame = await preloadQuery(api.game.getGame, {
    _id: params.gameId,
  });
  return <Game preloadedGame={preloadedGame} />;
}
