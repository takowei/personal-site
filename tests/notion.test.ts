import { beforeEach, describe, expect, it, vi } from "vitest";

const queryMock = vi.fn();
const pageToMarkdownMock = vi.fn();
const toMarkdownStringMock = vi.fn();

vi.mock("@notionhq/client", () => ({
  Client: vi.fn().mockImplementation(() => ({
    databases: { query: queryMock },
  })),
}));

vi.mock("notion-to-md", () => ({
  NotionToMarkdown: vi.fn().mockImplementation(() => ({
    pageToMarkdown: pageToMarkdownMock,
    toMarkdownString: toMarkdownStringMock,
  })),
}));

const samplePage = {
  id: "page-1",
  properties: {
    Title: { type: "title", title: [{ plain_text: "Hello Notion" }] },
    Slug: { type: "rich_text", rich_text: [{ plain_text: "hello-notion" }] },
    Summary: { type: "rich_text", rich_text: [{ plain_text: "A summary" }] },
    Date: { type: "date", date: { start: "2026-07-30" } },
    Published: { type: "checkbox", checkbox: true },
  },
};

describe("notion client", () => {
  beforeEach(() => {
    vi.resetModules();
    queryMock.mockReset();
    pageToMarkdownMock.mockReset();
    toMarkdownStringMock.mockReset();
    process.env.NOTION_TOKEN = "test-token";
    process.env.NOTION_DATABASE_ID = "test-db-id";
  });

  it("throws a clear error when NOTION_TOKEN is missing", async () => {
    delete process.env.NOTION_TOKEN;
    const { listPublishedPosts } = await import("../src/lib/notion");
    await expect(listPublishedPosts()).rejects.toThrow("NOTION_TOKEN");
  });

  it("throws a clear error when NOTION_DATABASE_ID is missing", async () => {
    delete process.env.NOTION_DATABASE_ID;
    const { listPublishedPosts } = await import("../src/lib/notion");
    await expect(listPublishedPosts()).rejects.toThrow("NOTION_DATABASE_ID");
  });

  it("maps a database query result into post summaries", async () => {
    queryMock.mockResolvedValue({ results: [samplePage] });
    const { listPublishedPosts } = await import("../src/lib/notion");

    const posts = await listPublishedPosts();

    expect(posts).toEqual([
      {
        id: "page-1",
        slug: "hello-notion",
        title: "Hello Notion",
        summary: "A summary",
        date: "2026-07-30",
        published: true,
      },
    ]);
    expect(queryMock).toHaveBeenCalledWith(
      expect.objectContaining({ database_id: "test-db-id" }),
    );
  });

  it("returns null when no page matches the slug", async () => {
    queryMock.mockResolvedValue({ results: [] });
    const { getPostBySlug } = await import("../src/lib/notion");

    const post = await getPostBySlug("missing-slug");

    expect(post).toBeNull();
  });

  it("converts the matched page body to markdown", async () => {
    queryMock.mockResolvedValue({ results: [samplePage] });
    pageToMarkdownMock.mockResolvedValue([{ block: "fake" }]);
    toMarkdownStringMock.mockReturnValue({
      parent: "# Hello Notion\n\nBody text.",
    });
    const { getPostBySlug } = await import("../src/lib/notion");

    const post = await getPostBySlug("hello-notion");

    expect(post).toEqual(
      expect.objectContaining({
        slug: "hello-notion",
        title: "Hello Notion",
        markdown: "# Hello Notion\n\nBody text.",
      }),
    );
  });
});
