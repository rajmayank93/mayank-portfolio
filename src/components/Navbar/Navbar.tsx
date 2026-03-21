import { useEffect, useState } from 'react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Experience', href: 'experience' },
  { label: 'Projects',   href: 'projects'   },
  { label: 'About',      href: 'about'      },
  { label: 'Skills',     href: 'skills'     },
  { label: 'Magic',      href: 'magic'      },
  { label: 'Contact',    href: 'contact'    },
];

const name = import.meta.env.VITE_NAME as string;

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1"  x2="12" y2="3"  />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64"   />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1"  y1="12" x2="3"  y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

interface NavbarProps {
  onOpenPalette: () => void;
}

export default function Navbar({ onOpenPalette }: NavbarProps) {
  const direction          = useScrollDirection();
  const { theme, toggleTheme } = useTheme();
  const [active, setActive]    = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
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

  return (
    <>
      <nav className={`navbar${direction === 'down' ? ' navbar--hidden' : ''}`}>
        <div className="navbar__inner">
          <div className="navbar__logo" onClick={scrollToTop} role="button" tabIndex={0}>
            {name}.
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

          <div className="navbar__right">
            <button className="navbar__cmd-hint" onClick={onOpenPalette}>
              <span>Search commands</span>
              <kbd>⌘K</kbd>
            </button>

            <button
              className="navbar__theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>

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
