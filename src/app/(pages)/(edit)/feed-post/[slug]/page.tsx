import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import BlogPost from "./components/BlogPost";

export default async function BlogPostPage(props: {
  params: Promise<{ blogPost: string }>;
}) {
  const params = await props.params;
  const feedPost = await fetchQuery(api.feed.getFeedPost, {
    slug: params.blogPost,
  });
  if (!feedPost) return <>not found</>;
  return <BlogPost feedPost={feedPost} />;
}
