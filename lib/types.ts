export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
}
