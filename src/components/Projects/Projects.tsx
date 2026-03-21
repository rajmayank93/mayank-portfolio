import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { projects } from '../../data/projects';
import './Projects.css';

const ICONS = ['◈', '⬡', '◉'];

export default function Projects() {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="section section--off-white" id="projects">
      <div className="container">
        <div className={`animate-section${visible ? ' visible' : ''}`} ref={ref}>
          <span className="section-label">things I've built</span>
          <h2 className="section-heading">
            Selected <em>Projects</em>
          </h2>

          <div className="projects__grid">
            {projects.map((project, i) => (
              <div className="project-card" key={project.title}>
                <div className="project-card__header">
                  <span className="project-card__icon">{ICONS[i % ICONS.length]}</span>
                  <div className="project-card__links">
                    <a
                      className="project-card__link"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live ↗
                    </a>
                    <a
                      className="project-card__link"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </div>
                </div>

                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__tags">
                  {project.tags.map((tag) => (
                    <span className="project-card__tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
