import { projects } from "@/lib/projects";

export default function PortfolioPage() {
  return (
    <div>
      <h1>作品集</h1>
      {projects.map((project) => (
        <article key={project.slug} style={{ marginTop: "2rem" }}>
          <h2>{project.name}</h2>
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
        </article>
      ))}
    </div>
  );
}
