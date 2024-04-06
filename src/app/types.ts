export type GameData = {
  title: string;
  description: string;
  status: "played" | "currentlyPlaying" | "completed";
  difficulties: string[];
  hoursPlayed: number;
  platform: string[];
};
