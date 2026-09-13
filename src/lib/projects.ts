export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: string;
  repoUrl?: string;
  liveUrl?: string;
}

// 內容來源：resume/PORTFOLIO.md 與各專案 README，不含未驗證或私有數字。
// 研究性質專案（畢業專題／evalcheck／RoCo／量化引擎）沒有公開原始碼，repoUrl 留空。
export const researchProjects: Project[] = [
  {
    slug: "capstone",
    name: "畢業專題 — LLM Agent 記憶 vs 推理鑑別",
    tagline: "東華大學資工系，指導教授雍忠",
    description:
      "用中華職棒逐球公開資料研究捕手配球策略對打席結果的影響，延伸出一個問題：讓 LLM agent 做配球建議時，" +
      "它的答案有多少是真推理、多少是複述訓練語料裡看過的內容。自建依變數（xwOBAcon-CPBL）用兩條獨立路徑對帳，" +
      "跟野球革命官方 RE288 API 比對後 Pearson r=0.999，確認統計權重可信。把「不能先看結果再回頭調規則」做成" +
      "程式碼層級的機制而非自律：資料一旦鎖定就無法再存取，存取會直接丟例外。最近一次覆核靠這套機制抓到自己的錯——" +
      "依變數的計算方式讓驗證集偷看到自己要驗證的資料，已在正式分析前修正。",
    stack: ["Python", "pandas", "統計檢定", "預先登記機制"],
    status: "研究進行中，校內畢業專題，原始碼未公開",
  },
  {
    slug: "evalcheck",
    name: "evalcheck",
    tagline: "AI agent 評測的統計嚴謹性校正工具",
    description:
      "多數 agent 評測報告的做法是「跑 N 個版本、挑最好的分數對外講」，但這個做法本身會系統性高估（winner's curse）。" +
      "第一版借用量化金融的 Deflated Sharpe Ratio 硬套過來，後來重新查了一輪 LLM 評測領域文獻，找到更貼題的方法（SIREN，" +
      "2026 年論文），就把已經寫好、能跑的舊版本換掉。蒙地卡羅驗證：沒校正前的假陽性率 65.3%，校正後降到 0.27%，" +
      "樂觀偏誤縮減 98.3%。",
    stack: ["Python", "統計方法", "Monte Carlo 驗證"],
    status: "工具已完工，17 tests，原始碼未公開",
  },
  {
    slug: "roco-compute",
    name: "RoCo compute-fairness 重現",
    tagline: "算力公平性評測環境",
    description:
      "重現一篇探討不同運算資源配置下比較是否公平的論文，自建 TSP+ACO 評估環境與 provider-agnostic 用量計量器。" +
      "一支只打了 3 次真實模型呼叫的探針，抓到一個會讓整場正式實驗當場崩潰的 bug：底層類別新增了一個參數，" +
      "但一個子類別的方法簽名沒跟著改，結果是 306 個單元測試全綠，卻在第一次真實呼叫就丟 TypeError。" +
      "單元測試全綠不代表那條真實路徑真的走得通。",
    stack: ["Python", "評測環境設計"],
    status: "prereg 已鎖定，全量實驗執行中，原始碼未公開",
  },
  {
    slug: "quant-validation-engine",
    name: "量化策略驗證框架",
    tagline: "跨市場回測引擎（前述習慣的源頭）",
    description:
      "自建跨市場（加密貨幣/美股/台股）量化策略回測引擎。核心設計來自一次真實教訓：早期做量化交易犯過典型錯誤——" +
      "策略回測數字很漂亮，後來才發現程式在某處讀到了未來才會出現的資料，整個績效是假的。這個引擎把時間落後做成" +
      "引擎層級強制執行、不信任策略自己遵守規則，並用逐位元的 parity 回歸測試證明重寫前後結果完全一致（Δ=0）。" +
      "上面疊了 Monte Carlo 排列檢定、Walk-Forward 樣本外驗證、Deflated Sharpe 多重檢定校正，實際用這套流程篩掉過" +
      "幾個看起來像真訊號、其實是 regime 前瞻或視窗偏差撐出來的假策略。",
    stack: ["Python", "pandas/numpy/pyarrow", "事件驅動回測", "統計檢定"],
    status: "生產中，原始碼未公開（含私有策略參數）",
  },
];

export const systemsProjects: Project[] = [
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
