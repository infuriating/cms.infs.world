import { preloadQuery } from "convex/nextjs";
import Home from "./components/Home";
import { api } from "../../../../convex/_generated/api";

export default async function WorkWrapper() {
  const preloadedProjects = await preloadQuery(api.project.getAll);
  const preloadedBlogPosts = await preloadQuery(api.blog.getAll);
  const preloadedGames = await preloadQuery(api.game.getAll);

  return (
    <Home
      preloadedProjects={preloadedProjects}
      preloadedBlogPosts={preloadedBlogPosts}
      preloadedGames={preloadedGames}
    />
  );
}
