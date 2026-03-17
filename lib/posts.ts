import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import type { Schema } from "hast-util-sanitize";
import type { PostFrontmatter, PostMeta, Post } from "./types";

// Extend the default schema to allow inline styles and data-* attributes
// produced by rehype-pretty-code for syntax highlighting.
const sanitizeSchema: Schema = {
  ...defaultSchema,
  clobberPrefix: "",
  attributes: {
    ...defaultSchema.attributes,
    "*": [...(defaultSchema.attributes?.["*"] ?? []), "style", "id"],
    a: [...(defaultSchema.attributes?.a ?? []), "data*"],
    code: [...(defaultSchema.attributes?.code ?? []), "data*"],
    pre: [...(defaultSchema.attributes?.pre ?? []), "data*", "tabIndex"],
    span: [...(defaultSchema.attributes?.span ?? []), "data*"],
  },
};

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPostsMeta(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostMeta(slug))
    .filter((post): post is PostMeta => post !== null && post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  return posts;
}

export function getPostMeta(slug: string): PostMeta | null {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;

  return {
    ...frontmatter,
    slug,
  };
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content: rawContent } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { clobberPrefix: "" })
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: true,
    })
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(rawContent);

  return {
    ...frontmatter,
    slug,
    content: processedContent.toString(),
  };
}
