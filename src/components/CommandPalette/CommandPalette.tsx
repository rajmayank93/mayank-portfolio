import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTheme } from '../../context/ThemeContext';
import './CommandPalette.css';

// ── Command definition ────────────────────────────────────────────────────
type CommandId = string;

interface Command {
  id: CommandId;
  group: 'Navigate' | 'Actions' | 'Links';
  label: string;
  sub?: string;
  icon: string;
  shortcut?: string;
  action: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

// ── Icons (SVG inline, kept minimal) ─────────────────────────────────────
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────
interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: Props) {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery]       = useState('');
  const [activeIdx, setActive]  = useState(0);
  const inputRef                = useRef<HTMLInputElement>(null);
  const listRef                 = useRef<HTMLDivElement>(null);

  const email    = import.meta.env.VITE_EMAIL    as string;
  const github   = import.meta.env.VITE_GITHUB   as string;
  const linkedin = import.meta.env.VITE_LINKEDIN as string;
  const leetcode = import.meta.env.VITE_LEETCODE as string;
  const resume   = import.meta.env.VITE_RESUME_URL as string;

  // ── All commands ────────────────────────────────────────────────────────
  const commands: Command[] = useMemo(() => [
    // Navigate
    {
      id: 'nav-experience', group: 'Navigate', label: 'Go to Experience',
      sub: 'Work history & timeline', icon: '💼',
      action: () => { scrollTo('experience'); onClose(); },
    },
    {
      id: 'nav-projects', group: 'Navigate', label: 'Go to Projects',
      sub: 'Things I have shipped', icon: '🚀',
      action: () => { scrollTo('projects'); onClose(); },
    },
    {
      id: 'nav-about', group: 'Navigate', label: 'Go to About',
      sub: 'A bit about me', icon: '👤',
      action: () => { scrollTo('about'); onClose(); },
    },
    {
      id: 'nav-skills', group: 'Navigate', label: 'Go to Skills',
      sub: 'Tools & technologies', icon: '⚡',
      action: () => { scrollTo('skills'); onClose(); },
    },
    {
      id: 'nav-magic', group: 'Navigate', label: 'Go to Magic',
      sub: 'Hidden features & live GitHub feed', icon: '✨',
      action: () => { scrollTo('magic'); onClose(); },
    },
    {
      id: 'nav-contact', group: 'Navigate', label: 'Go to Contact',
      sub: 'Get in touch', icon: '✉️',
      action: () => { scrollTo('contact'); onClose(); },
    },
    // Actions
    {
      id: 'toggle-theme', group: 'Actions',
      label: theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode',
      sub: 'Toggle colour theme', icon: theme === 'light' ? '🌙' : '☀️',
      shortcut: 'T',
      action: () => { toggleTheme(); onClose(); },
    },
    {
      id: 'copy-email', group: 'Actions', label: 'Copy Email Address',
      sub: email, icon: '📋',
      action: () => { copyToClipboard(email); onClose(); },
    },
    {
      id: 'download-resume', group: 'Actions', label: 'Download Resume',
      sub: 'PDF — latest version', icon: '📄',
      action: () => { window.open(resume, '_blank'); onClose(); },
    },
    // Links
    {
      id: 'link-github', group: 'Links', label: 'Open GitHub',
      sub: github, icon: '🐙',
      action: () => { window.open(github, '_blank'); onClose(); },
    },
    {
      id: 'link-linkedin', group: 'Links', label: 'Open LinkedIn',
      sub: linkedin, icon: '💼',
      action: () => { window.open(linkedin, '_blank'); onClose(); },
    },
    {
      id: 'link-leetcode', group: 'Links', label: 'Open LeetCode',
      sub: `Knight · 1877 rating · 1000+ problems`, icon: '🏆',
      action: () => { window.open(leetcode, '_blank'); onClose(); },
    },
  ], [theme, toggleTheme, onClose, email, github, linkedin, leetcode, resume]);

  // ── Fuzzy filter ────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.sub?.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q)
    );
  }, [query, commands]);

  // ── Group the filtered list ──────────────────────────────────────────────
  const grouped = useMemo(() => {
    const map = new Map<string, Command[]>();
    filtered.forEach((cmd) => {
      const arr = map.get(cmd.group) ?? [];
      arr.push(cmd);
      map.set(cmd.group, arr);
    });
    return map;
  }, [filtered]);

  // ── Flat index for keyboard nav ──────────────────────────────────────────
  const flat = filtered; // already ordered by original definition

  // ── Reset on open ───────────────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // ── Scroll active item into view ─────────────────────────────────────────
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>('.cmd-item--active');
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  // ── Keyboard handler ─────────────────────────────────────────────────────
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, flat.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        flat[activeIdx]?.action();
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [flat, activeIdx, onClose]
  );

  // Reset active when query changes
  useEffect(() => { setActive(0); }, [query]);

  if (!open) return null;

  return (
    <div className="cmd-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cmd-panel" role="dialog" aria-modal aria-label="Command palette">

        {/* Search */}
        <div className="cmd-search">
          <span className="cmd-search__icon"><SearchIcon /></span>
          <input
            ref={inputRef}
            className="cmd-search__input"
            placeholder="Type a command or search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="cmd-search__esc">esc</kbd>
        </div>

        {/* Results */}
        <div className="cmd-results" ref={listRef}>
          {flat.length === 0 ? (
            <p className="cmd-empty">No results for "{query}"</p>
          ) : (
            Array.from(grouped.entries()).map(([group, items]) => (
              <div key={group}>
                <p className="cmd-group-label">{group}</p>
                {items.map((cmd) => {
                  const idx = flat.indexOf(cmd);
                  return (
                    <button
                      key={cmd.id}
                      className={`cmd-item${idx === activeIdx ? ' cmd-item--active' : ''}`}
                      onMouseEnter={() => setActive(idx)}
                      onClick={cmd.action}
                    >
                      <span className="cmd-item__icon">{cmd.icon}</span>
                      <span className="cmd-item__body">
                        <span className="cmd-item__label">{cmd.label}</span>
                        {cmd.sub && <span className="cmd-item__sub">{cmd.sub}</span>}
                      </span>
                      {cmd.shortcut && (
                        <kbd className="cmd-item__shortcut">{cmd.shortcut}</kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="cmd-footer">
          <span className="cmd-footer__hint">
            <kbd className="cmd-footer__key">↑↓</kbd> navigate
          </span>
          <span className="cmd-footer__hint">
            <kbd className="cmd-footer__key">↵</kbd> select
          </span>
          <span className="cmd-footer__hint">
            <kbd className="cmd-footer__key">esc</kbd> close
          </span>
        </div>

      </div>
    </div>
  );
}
