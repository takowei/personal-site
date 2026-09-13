import {
  researchProjects,
  systemsProjects,
  type Project,
} from "@/lib/projects";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article style={{ marginTop: "2rem" }}>
      <h3>{project.name}</h3>
      <p style={{ fontStyle: "italic" }}>{project.tagline}</p>
      <p>{project.description}</p>
      <p>
        <strong>技術棧：</strong>
        {project.stack.join("、")}
      </p>
      <p>
        <strong>狀態：</strong>
        {project.status}
      </p>
      {project.repoUrl ? (
        <p>
          <a href={project.repoUrl} target="_blank" rel="noreferrer">
            GitHub 原始碼
          </a>
          {project.liveUrl ? (
            <>
              {" "}
              ｜{" "}
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                線上 Demo
              </a>
            </>
          ) : null}
        </p>
      ) : null}
    </article>
  );
}

export default function PortfolioPage() {
  return (
    <div>
      <h1>作品集</h1>
      <p>
        這幾個專案表面上領域不同（棒球資料、AI agent
        評測、量化交易、系統開發），問的常是同一個問題：
        一個系統給出的結論，能不能在看到結果之前就被設計成沒有作弊空間。
      </p>

      <section style={{ marginTop: "2rem" }}>
        <h2>研究 / 方法論工作</h2>
        {researchProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>

      <section style={{ marginTop: "3rem" }}>
        <h2>系統 / 工程專案</h2>
        {systemsProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}
