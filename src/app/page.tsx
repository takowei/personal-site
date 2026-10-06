import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>邱哲偉 Che-Wei Chiu</h1>
      <p>資訊工程學系學生</p>
      <p>
        我在意的是同一件事，在不同題目上反覆做：一個結論在被驗證之前，不算數。
      </p>
      <p>
        GitHub:{" "}
        <a href="https://github.com/takowei" target="_blank" rel="noreferrer">
          github.com/takowei
        </a>
        　｜　地點: 台灣（可遠端）
      </p>

      <section style={{ marginTop: "2rem" }}>
        <h2>關於我</h2>
        <p>
          最早的起點是量化交易。剛入門時犯過一個很典型的錯——策略回測數字很漂亮，後來才發現程式讀到了未來才會出現的資料，
          整個績效是假的。這件事讓我對「一個結論到底能不能信」變得敏感，後來每接一個新題目，第一個問題都是這個結果有沒有
          可能是自己騙自己。這幾年這個習慣延伸到不同領域：量化策略要用統計檢定戳破假訊號，寫資料庫要用
          property-based test 對拍驗證正確性，審 GitHub repo
          要用可重跑的校準集，審 LLM agent 的評測分數要先校正 winner&apos;s
          curse。 目前的畢業專題研究 LLM agent
          的建議是真推理還是複述訓練語料，也是同一條線上的問題。國立東華大學資訊工程學系
          在學中，預計 2028 年畢業。
        </p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>技術技能</h2>
        <p>
          Python（主力）、TypeScript、Bash、SQL；統計檢定與驗證方法論（假設檢定、樣本外驗證、預先登記）；
          FastAPI、pandas/numpy、事件驅動資料管線；React/TypeScript
          前端；Git、pytest、CI/CD。
        </p>
      </section>

      <section style={{ marginTop: "2rem", display: "flex", gap: "1.5rem" }}>
        <Link href="/portfolio">→ 查看完整作品集（研究方法論 + 系統工程）</Link>
        <Link href="/blog">→ 查看部落格</Link>
      </section>
    </div>
  );
}
