"use client";

import { useMutation } from "convex/react";
import React, { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GameData } from "@/app/types";

export default function AddGame() {
  const addGameMutation = useMutation(api.game.addGame);
  const router = useRouter();

  const [gameData, setGameData] = useState<GameData>({
    title: "",
    description: "",
    status: "played",
    difficulties: [""],
    hoursPlayed: 0,
    platform: [""],
  });

  const addGame = async () => {
    await addGameMutation(gameData);
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full md:max-w-2xl lg:max-w-3xl">
        <CardHeader>
          <CardTitle>Add a game</CardTitle>
          <CardDescription>
            You are currently creating a new game.
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
              onChange={(e) =>
                setGameData((prev) => ({
                  ...prev,
                  status: e.target.value as GameData["status"],
                }))
              }
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

        <CardFooter>
          <Button onClick={addGame} className="w-full" type="submit">
            Add Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
