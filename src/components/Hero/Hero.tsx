import CodeTypewriter from './CodeTypewriter';
import './Hero.css';

const name      = (import.meta.env.VITE_NAME      as string) ?? '';
const role      = (import.meta.env.VITE_ROLE      as string) ?? '';
const resumeUrl = (import.meta.env.VITE_RESUME_URL as string) ?? '#';

const [firstName, ...rest] = name.split(' ');
const lastName = rest.join(' ');

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero__grid">

          {/* ── Left ── */}
          <div className="hero__left">
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              Open to Work
            </div>

            <h1 className="hero__name">
              {firstName}
              <br />
              <em>{lastName}</em>
            </h1>

            <p className="hero__role">{role} · Around 2 Years Experience</p>

            <p className="hero__bio">
              I build fast, accessible, and beautifully crafted frontend systems.
              Passionate about component architecture, real-time UI, and developer experience.
            </p>

            <div className="hero__ctas">
              <button className="hero__cta-primary" onClick={scrollToProjects}>
                View Projects →
              </button>
              <a className="hero__cta-secondary" href={resumeUrl} target="_blank" rel="noopener noreferrer">
                View Resume ↗
              </a>
            </div>
          </div>

          {/* ── Right — live typewriter code card ── */}
          <div className="hero__right">
            <CodeTypewriter />
          </div>

        </div>
      </div>
    </section>
  );
}
