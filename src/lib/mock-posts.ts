import type { BlogPost, BlogPostSummary } from "./notion";

// 開發時的假資料：NOTION_TOKEN / NOTION_DATABASE_ID 未設定時，部落格頁改用這份資料
// 讓畫面可以先跑起來。正式串接 Notion 後這份資料不會被使用。
export const mockSummaries: BlogPostSummary[] = [
  {
    id: "mock-1",
    slug: "hello-world",
    title: "Hello World（假資料）",
    summary: "這是尚未串接 Notion 前的示範文章摘要。",
    date: "2026-07-30",
    published: true,
  },
  {
    id: "mock-2",
    slug: "building-this-site",
    title: "這個網站是怎麼做出來的（假資料）",
    summary: "Next.js + Notion CMS + Railway 部署的簡短紀錄。",
    date: "2026-07-29",
    published: true,
  },
];

export const mockPosts: Record<string, BlogPost> = {
  "hello-world": {
    ...mockSummaries[0]!,
    markdown:
      "# Hello World\n\n這是假資料內容，等 Notion 串接好之後會被真實文章取代。",
  },
  "building-this-site": {
    ...mockSummaries[1]!,
    markdown:
      "# 這個網站是怎麼做出來的\n\n用 Next.js 蓋前台，Notion 當內容來源，Railway 一鍵部署。",
  },
};
