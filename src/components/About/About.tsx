import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './About.css';

const VALUES = [
  {
    icon: '✦',
    title: 'Clean Code',
    desc: 'Readable, well-structured components that other engineers enjoy working with. Consistency over cleverness.',
  },
  {
    icon: '⚡',
    title: 'Performance First',
    desc: 'Every millisecond matters. I obsess over bundle sizes, LCP, and render cycles to deliver fast, snappy UIs.',
  },
  {
    icon: '◈',
    title: 'Pixel Perfect',
    desc: 'Faithful implementation of designs with attention to spacing, typography, and motion details.',
  },
];

export default function About() {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>();

  return (
    <section className="section section--off-white" id="about">
      <div className="container">
        <div className={`animate-section${visible ? ' visible' : ''}`} ref={ref}>
          <span className="section-label">a little about me</span>
          <h2 className="section-heading">
            Crafting interfaces that
            <br />
            <em>feel as good</em> as they look
          </h2>

          <div className="about__grid" style={{ marginTop: '48px' }}>
            {/* Left — paragraph */}
            <div className="about__text">
              <p>
                I'm a <strong>Software Development Engineer</strong> based in Bangalore with a passion
                for building frontend systems that are fast, maintainable, and genuinely delightful to use.
              </p>
              <p>
                Over the past two years I've shipped production features for <strong>5000+ merchants</strong> at
                Juspay — from real-time chatbot SDKs and SSE-based streaming UIs to offline-first dashboards
                backed by IndexedDB.
              </p>
              <p>
                Outside work, I enjoy competitive programming (LeetCode Knight, 1000+ problems) and
                exploring AI agent frameworks. I believe great software emerges at the intersection of
                <strong> engineering rigour</strong> and <strong>design empathy</strong>.
              </p>
            </div>

            {/* Right — value cards */}
            <div className="about__cards">
              {VALUES.map((v) => (
                <div className="about__card" key={v.title}>
                  <div className="about__card-icon">{v.icon}</div>
                  <div className="about__card-title">{v.title}</div>
                  <div className="about__card-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
