import Link from "next/link";
import { mockSummaries } from "@/lib/mock-posts";
import { listPublishedPosts } from "@/lib/notion";

// Notion 尚未設定（無 NOTION_TOKEN / NOTION_DATABASE_ID）時，退回假資料，方便本地開發。
async function loadPosts() {
  try {
    return { posts: await listPublishedPosts(), isMock: false };
  } catch {
    return { posts: mockSummaries, isMock: true };
  }
}

export default async function BlogIndexPage() {
  const { posts, isMock } = await loadPosts();

  return (
    <div>
      <h1>部落格</h1>
      {isMock ? (
        <p style={{ background: "#fff3cd", padding: "0.5rem 1rem" }}>
          ⚠️ Notion 尚未設定，目前顯示假資料。設定 NOTION_TOKEN /
          NOTION_DATABASE_ID 後會改抓真實文章。
        </p>
      ) : null}
      {posts.length === 0 ? <p>目前還沒有文章。</p> : null}
      {posts.map((post) => (
        <article key={post.id} style={{ marginTop: "1.5rem" }}>
          <h2>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p style={{ color: "#666" }}>{post.date}</p>
          <p>{post.summary}</p>
        </article>
      ))}
    </div>
  );
}
