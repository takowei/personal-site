import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { mockPosts } from "@/lib/mock-posts";
import { getPostBySlug } from "@/lib/notion";

async function loadPost(slug: string) {
  try {
    return { post: await getPostBySlug(slug), isMock: false };
  } catch {
    return { post: mockPosts[slug] ?? null, isMock: true };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { post, isMock } = await loadPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      {isMock ? (
        <p style={{ background: "#fff3cd", padding: "0.5rem 1rem" }}>
          ⚠️ Notion 尚未設定，目前顯示假資料。
        </p>
      ) : null}
      <h1>{post.title}</h1>
      <p style={{ color: "#666" }}>{post.date}</p>
      <ReactMarkdown>{post.markdown}</ReactMarkdown>
    </article>
  );
}
