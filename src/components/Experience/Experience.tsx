import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { experiences } from '../../data/experience';
import './Experience.css';

export default function Experience() {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section className="section section--surface" id="experience">
      <div className="container">
        <div className={`animate-section${visible ? ' visible' : ''}`} ref={ref}>
          <span className="section-label">where I've worked</span>
          <h2 className="section-heading">
            Work <em>Experience</em>
          </h2>

          <div className="experience__timeline">
            {experiences.map((entry) => (
              <div className="timeline-entry" key={`${entry.company}-${entry.duration}`}>
                <div className="timeline-entry__header">
                  <h3 className="timeline-entry__role">{entry.role}</h3>
                  <div className="timeline-entry__meta">
                    <span className="timeline-entry__company">{entry.company}</span>
                    <span className="timeline-entry__sep">·</span>
                    <span className="timeline-entry__duration">{entry.duration}</span>
                    <span className="timeline-entry__sep">·</span>
                    <span className="timeline-entry__location">{entry.location}</span>
                  </div>
                </div>
                <ul className="timeline-entry__bullets">
                  {entry.bullets.map((b, i) => (
                    <li className="timeline-entry__bullet" key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
