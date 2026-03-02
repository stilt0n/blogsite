"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/types";
import PostCard from "./PostCard";

interface SearchPostsProps {
  posts: PostMeta[];
}

export default function SearchPosts({ posts }: SearchPostsProps) {
  const [query, setQuery] = useState("");

  const searchText = query.toLowerCase();
  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchText) ||
      post.description.toLowerCase().includes(searchText) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchText))
    );
  });

  return (
    <div>
      <input
        type="search"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search posts"
      />
      <div>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p>No posts found matching your search.</p>
        )}
      </div>
    </div>
  );
}
