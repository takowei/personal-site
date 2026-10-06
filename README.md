# personal-site

My personal site: a short résumé, a portfolio page, and a blog that reads posts from a Notion database.

Built with Next.js 14 (App Router) and TypeScript. Blog posts come from Notion through `@notionhq/client` and `notion-to-md`; without Notion credentials the blog falls back to local sample posts, so the site runs with no setup.

## Pages

- `/`: résumé summary
- `/portfolio`: research and engineering projects (data in `src/lib/projects.ts`)
- `/blog` and `/blog/[slug]`: posts from Notion

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # vitest
npm run build
```

To read real posts, copy `.env.example` to `.env.local` and fill in `NOTION_TOKEN` and `NOTION_DATABASE_ID`.

## Deploy

`railway.json` holds the Railway config; the steps are in [`DEPLOY-STEPS.md`](DEPLOY-STEPS.md). The site is not deployed yet.

## License

MIT
