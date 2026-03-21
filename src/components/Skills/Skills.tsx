import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { skillCategories } from '../../data/skills';
import './Skills.css';

export default function Skills() {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="section" id="skills">
      <div className="container">
        <div className={`animate-section${visible ? ' visible' : ''}`} ref={ref}>
          <span className="section-label">what I work with</span>
          <h2 className="section-heading">
            Tools & <em>Technologies</em>
          </h2>

          <div className="skills__grid">
            {skillCategories.map((cat) => (
              <div className="skills__category" key={cat.label}>
                <span className="skills__category-label">{cat.label}</span>
                <div className="skills__tags">
                  {cat.skills.map((skill) => (
                    <span className="skill-tag" key={skill.name}>
                      <span className="skill-tag__icon">{skill.icon}</span>
                      {skill.name}
                    </span>
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
