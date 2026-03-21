import { useEffect, useState } from 'react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Experience', href: 'experience' },
  { label: 'Projects',   href: 'projects'   },
  { label: 'About',      href: 'about'      },
  { label: 'Skills',     href: 'skills'     },
  { label: 'Contact',    href: 'contact'    },
];

const name = import.meta.env.VITE_NAME as string;

export default function Navbar() {
  const direction = useScrollDirection();
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const initials = name

  return (
    <>
      <nav className={`navbar${direction === 'down' ? ' navbar--hidden' : ''}`}>
        <div className="navbar__inner">
          <div className="navbar__logo" onClick={scrollToTop} role="button" tabIndex={0}>
            {initials}.<em></em>
          </div>

          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  className={`navbar__link${active === link.href ? ' navbar__link--active' : ''}`}
                  onClick={() => scrollTo(link.href)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`navbar__mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <button
            key={link.href}
            className={`navbar__mobile-link${active === link.href ? ' navbar__mobile-link--active' : ''}`}
            onClick={() => scrollTo(link.href)}
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}
