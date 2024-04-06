"use client";

import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import React, { useState } from "react";
import { api } from "../../../../../../../convex/_generated/api";
import NoProjectFound from "@/components/NoProjectFound";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { GameData } from "@/app/types";

export default function Game(params: {
  preloadedGame: Preloaded<typeof api.game.getGame>;
}) {
  const router = useRouter();
  const game = usePreloadedQuery(params.preloadedGame);
  const updateProject = useMutation(api.game.updateGame);
  const deleteGame = useMutation(api.game.deleteGame);

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [gameData, setGameData] = useState({
    _id: game?._id,
    title: game?.title,
    description: game?.description,
    status: game?.status,
    difficulties: game?.difficulties,
    hoursPlayed: game?.hoursPlayed,
    platform: game?.platform,
  });

  if (!game) return <NoProjectFound />;

  const update = async () => {
    // @ts-ignore
    await updateProject(gameData);
    router.push("/");
  };

  const checkStatus = (str: string) => {
    console.log(str);
    if (str !== "played" && str !== "currentlyPlaying" && str !== "completed")
      return false;
    return true;
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full md:max-w-2xl lg:max-w-3xl">
        <CardHeader>
          <CardTitle>{game.title}</CardTitle>
          <CardDescription>
            You are currently editing this project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="title">Title</Label>
            <Input
              value={gameData.title}
              onChange={(e) =>
                setGameData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="description">Description</Label>
            <Input
              value={gameData.description}
              onChange={(e) =>
                setGameData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="status">Status</Label>
            <Input
              value={gameData.status}
              onChange={(e) => {
                setGameData((prev) => ({
                  ...prev,
                  status: e.target.value as GameData["status"],
                }));

                // @ts-ignore
                checkStatus(gameData.status);
              }}
            />
          </div>
          {gameData.status === "completed" && (
            <div className="space-y-1 flex flex-col">
              <Label htmlFor="difficulties">Difficulties</Label>
              <Input
                value={gameData.difficulties}
                onChange={(e) =>
                  setGameData((prev) => ({
                    ...prev,
                    difficulties: [e.target.value],
                  }))
                }
              />
            </div>
          )}
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="hoursPlayed">Hours Played</Label>
            <Input
              value={gameData.hoursPlayed}
              onChange={(e) =>
                setGameData((prev) => ({
                  ...prev,
                  hoursPlayed: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="platform">Platform</Label>
            <Input
              value={gameData.platform}
              onChange={(e) =>
                setGameData((prev) => ({
                  ...prev,
                  platform: [e.target.value],
                }))
              }
            />
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-y-1">
          {gameData.status && !checkStatus(gameData.status) ? (
            <>
              <p className="text-red-500 text-sm">
                Please select a valid status before updating the game
              </p>
              <Button disabled className="w-full" type="submit">
                Update Game
              </Button>
            </>
          ) : (
            <Button onClick={update} className="w-full" type="submit">
              Update Game
            </Button>
          )}

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
                  deleteGame({ _id: game._id });
                  router.push("/");
                }}
                className="w-full"
                variant="destructive"
              >
                Delete Game
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
              Delete Game
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
