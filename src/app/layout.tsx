import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "邱哲偉 Che-Wei Chiu",
  description: "資訊工程學系學生｜後端 / 資料 / 量化系統開發",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <header
          style={{ borderBottom: "1px solid #eee", padding: "1rem 2rem" }}
        >
          <nav
            style={{
              display: "flex",
              gap: "1.5rem",
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            <Link href="/">首頁</Link>
            <Link href="/portfolio">作品集</Link>
            <Link href="/blog">部落格</Link>
          </nav>
        </header>
        <main style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
