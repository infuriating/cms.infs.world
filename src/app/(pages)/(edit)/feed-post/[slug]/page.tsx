import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import FeedPost from "./components/FeedPost";

export default async function FeedPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const feedPost = await fetchQuery(api.feed.getFeedPost, {
    slug: params.slug,
  });
  if (!feedPost) return <>not found</>;
  return <FeedPost feedPost={feedPost} />;
}
