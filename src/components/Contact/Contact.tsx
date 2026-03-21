import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Contact.css';

const email = import.meta.env.VITE_EMAIL as string;
const githubUrl = import.meta.env.VITE_GITHUB_URL as string;
const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL as string;
const leetcodeUrl = import.meta.env.VITE_LEETCODE_URL as string;

const SOCIALS = [
  { label: 'GitHub', url: githubUrl, icon: '⌥' },
  { label: 'LinkedIn', url: linkedinUrl, icon: '◈' },
  { label: 'LeetCode', url: leetcodeUrl, icon: '◉' },
];

export default function Contact() {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>();

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className={`animate-section${visible ? ' visible' : ''}`} ref={ref}>
          <div className="contact__inner">
            <span className="section-label">get in touch</span>
            <h2 className="section-heading">
              Let's build something
              <br />
              <em>great together</em>
            </h2>
            <p className="contact__tagline">
              Whether you have a project in mind, an opportunity to share,
              or just want to say hello — my inbox is always open.
            </p>
            <a className="contact__email-btn" href={`mailto:${email}`}>
              Say Hello →
            </a>
            <div className="contact__socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  className="contact__social-link"
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
