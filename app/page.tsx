import { getAllPostsMeta } from "@/lib/posts";
import SearchPosts from "./components/SearchPosts";

export default function Home() {
  const posts = getAllPostsMeta();

  return (
    <>
      <h1>Latest Posts</h1>
      <SearchPosts posts={posts} />
    </>
  );
}
