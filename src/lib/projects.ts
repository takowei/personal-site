export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: string;
  repoUrl: string;
  liveUrl?: string;
}

// 內容來源：resume/PORTFOLIO.md 與各專案 README，不含未驗證或私有數字。
export const projects: Project[] = [
  {
    slug: "pricewatch",
    name: "PriceWatch",
    tagline: "多使用者價格警示 SaaS 後端",
    description:
      "把個人特價爬蟲腳本重寫成多使用者 SaaS：FastAPI 三層架構（router/service/repository）、" +
      "自刻 JWT access/refresh 認證、達標/降價偵測純函式、APScheduler 排程、Docker 容器化。" +
      "前端為 React + TypeScript + Vite 單頁應用。60 個 pytest 測試 + GitHub Actions CI。",
    stack: [
      "Python",
      "FastAPI",
      "SQLModel",
      "PostgreSQL",
      "Alembic",
      "JWT",
      "Docker",
      "React",
      "TypeScript",
      "Vite",
    ],
    status: "全端完成，容器化與 CI 就緒",
    repoUrl: "https://github.com/takowei/pricewatch",
  },
  {
    slug: "repovet",
    name: "repovet",
    tagline: "GitHub repo / 套件信任體檢 CLI",
    description:
      "開發者選型前的一鍵信任體檢：輸入 GitHub repo 或 npm/PyPI 套件，輸出假 star、殭屍維護、" +
      "幻覺依賴、AI-slop 特徵四項訊號評分，每分皆附可驗證證據，核心是可重跑的統計規則而非 LLM 黑箱。" +
      "103 個測試全綠，已公開發布並附每日掃描排行榜。",
    stack: [
      "Python",
      "GitHub REST/GraphQL",
      "npm registry API",
      "PyPI JSON API",
      "SQLite",
    ],
    status: "引擎完工並已公開發布",
    repoUrl: "https://github.com/takowei/repovet",
    liveUrl: "https://takowei.github.io/repovet/",
  },
  {
    slug: "pylsm",
    name: "pylsm",
    tagline: "手刻 LSM-tree 鍵值儲存引擎",
    description:
      "從零手刻 LSM-tree 鍵值儲存引擎（mini LevelDB / RocksDB 核心）：skiplist memtable、" +
      "WAL 崩潰復原、手刻 SSTable 磁碟格式、Bloom filter（double-hashing）、leveled compaction。" +
      "零第三方執行期相依，純 Python 標準庫，105/105 測試全綠。",
    stack: ["Python 標準庫", "pytest", "ruff", "GitHub Actions CI"],
    status: "五階段全完成",
    repoUrl: "https://github.com/takowei/pylsm",
  },
  {
    slug: "sale-tracker",
    name: "Sale Tracker",
    tagline: "服飾特價追蹤與價格警示（PriceWatch 前身）",
    description:
      "每日自動爬取品牌特價、追蹤商品價格歷史，對關注商品達標或降價主動推播 Telegram。" +
      "涵蓋爬蟲、價格歷史管線、React 前端到雲端自動化部署的完整全端小系統。",
    stack: [
      "Python",
      "requests",
      "BeautifulSoup4",
      "React",
      "Telegram Bot API",
      "cron",
    ],
    status: "生產中，已實際爬取並推播",
    repoUrl: "https://github.com/takowei/sale-tracker",
  },
];
