# personal-site

Root 的個人品牌網站：履歷 + 作品集 + 部落格（Notion 當內容源）。

## 狀態（2026-07-30）

✅ 開發完成，可本地跑起來（部落格用假資料，等 Root 提供 Notion token）。待 Root 部署到 Railway。

## 技術棧

Next.js 14（App Router）+ TypeScript；`@notionhq/client` + `notion-to-md` 串接 Notion；vitest 測試。

## 關鍵檔案

```
src/app/page.tsx              ← 首頁（履歷摘要）
src/app/portfolio/page.tsx    ← 作品集頁
src/app/blog/page.tsx         ← 部落格列表（讀 Notion，無 token 時退回假資料）
src/app/blog/[slug]/page.tsx  ← 單篇文章頁
src/lib/notion.ts             ← Notion API client（讀 NOTION_TOKEN / NOTION_DATABASE_ID）
src/lib/mock-posts.ts         ← 開發用假資料
src/lib/projects.ts           ← 作品集資料（來源：resume/PORTFOLIO.md）
.env.example                  ← 環境變數範本
railway.json                  ← Railway 部署設定
DEPLOY-STEPS.md               ← 給 Root 的上線步驟
```

## 常用指令

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm test
```

## 下一步

- [ ] Root 建立 Notion integration + database，填入 .env.local
- [ ] Root 接 Railway 部署（見 DEPLOY-STEPS.md）
