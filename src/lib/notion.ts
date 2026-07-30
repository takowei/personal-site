import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  date: string;
  published: boolean;
}

export interface BlogPost extends BlogPostSummary {
  markdown: string;
}

/**
 * 期待的 Notion database schema（欄位名稱區分大小寫）：
 * - Title      (title)      文章標題
 * - Slug       (rich_text)  URL slug，例如 "hello-world"
 * - Summary    (rich_text)  列表頁摘要
 * - Date       (date)       發布日期
 * - Published  (checkbox)   是否公開
 */
function getClient(): Client {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    throw new Error("NOTION_TOKEN 未設定，請參考 .env.example 設定環境變數");
  }
  return new Client({ auth: token });
}

function getDatabaseId(): string {
  const id = process.env.NOTION_DATABASE_ID;
  if (!id) {
    throw new Error(
      "NOTION_DATABASE_ID 未設定，請參考 .env.example 設定環境變數",
    );
  }
  return id;
}

function toSummary(page: PageObjectResponse): BlogPostSummary {
  const props = page.properties;

  const title =
    props.Title?.type === "title"
      ? (props.Title.title[0]?.plain_text ?? "")
      : "";
  const slug =
    props.Slug?.type === "rich_text"
      ? (props.Slug.rich_text[0]?.plain_text ?? "")
      : "";
  const summary =
    props.Summary?.type === "rich_text"
      ? (props.Summary.rich_text[0]?.plain_text ?? "")
      : "";
  const date =
    props.Date?.type === "date" ? (props.Date.date?.start ?? "") : "";
  const published =
    props.Published?.type === "checkbox" ? props.Published.checkbox : false;

  return { id: page.id, slug, title, summary, date, published };
}

/** 取得所有已發布文章的摘要列表（依 Date 遞減排序），供部落格列表頁使用。 */
export async function listPublishedPosts(): Promise<BlogPostSummary[]> {
  const notion = getClient();
  const databaseId = getDatabaseId();

  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: databaseId,
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return response.results
    .filter((page): page is PageObjectResponse => "properties" in page)
    .map(toSummary);
}

/** 依 slug 找出單篇文章，並把 page body 轉成 markdown 供渲染。找不到回傳 null。 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const notion = getClient();
  const databaseId = getDatabaseId();

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        { property: "Slug", rich_text: { equals: slug } },
        { property: "Published", checkbox: { equals: true } },
      ],
    },
    page_size: 1,
  });

  const page = response.results[0];
  if (!page || !("properties" in page)) {
    return null;
  }

  const summary = toSummary(page as PageObjectResponse);
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const { parent: markdown } = n2m.toMarkdownString(mdBlocks);

  return { ...summary, markdown };
}
