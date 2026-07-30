import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>邱哲偉 Che-Wei Chiu</h1>
      <p>資訊工程學系學生｜後端 / 資料 / 量化系統開發</p>
      <p>
        📧 <a href="mailto:a0932097165@gmail.com">a0932097165@gmail.com</a>
        　｜　GitHub:{" "}
        <a href="https://github.com/takowei" target="_blank" rel="noreferrer">
          github.com/takowei
        </a>
        　｜　地點: 台灣（可遠端）
      </p>

      <section style={{ marginTop: "2rem" }}>
        <h2>關於我</h2>
        <p>
          國立東華大學資訊工程學系在學中，預計 2028
          年畢業。自學為主，習慣把一個想法做成「能跑、能部署、有測試」的完整系統，而不是停在
          demo。求職目標為軟體工程／後端／資料工程實習或新鮮人正職。
        </p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>技術技能</h2>
        <ul>
          <li>語言：Python（主力）、TypeScript / JavaScript、Bash、SQL</li>
          <li>
            後端 / 資料：FastAPI、pandas / numpy / pyarrow、事件驅動資料管線
          </li>
          <li>前端：React、TypeScript、Vite</li>
          <li>工程實踐：Git、pytest、GitHub Actions CI、單元測試 + 回歸測試</li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem", display: "flex", gap: "1.5rem" }}>
        <Link href="/portfolio">→ 查看完整作品集</Link>
        <Link href="/blog">→ 查看部落格</Link>
      </section>
    </div>
  );
}
