import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Magic.css';

// ── GitHub types ──────────────────────────────────────────────────────────
interface GhCommit  { sha: string; message: string }
interface GhEvent   {
  id: string;
  type: string;
  repo: { name: string };
  payload: { commits?: GhCommit[] };
  created_at: string;
}
interface CommitRow { id: string; repo: string; message: string; time: string }

function timeAgo(iso: string): string {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (secs < 60)    return `${secs}s ago`;
  if (secs < 3600)  return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  return `${Math.floor(secs / 86400)}d ago`;
}

// ── GitHub activity feed ──────────────────────────────────────────────────
function GitHubFeed({ username }: { username: string }) {
  const [rows,   setRows]   = useState<CommitRow[]>([]);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    if (!username) { setStatus('error'); return; }

    fetch(`https://api.github.com/users/${username}/events/public?per_page=30`)
      .then((r) => {
        if (!r.ok) throw new Error('API error');
        return r.json() as Promise<GhEvent[]>;
      })
      .then((events) => {
        const items: CommitRow[] = [];
        for (const ev of events) {
          if (ev.type !== 'PushEvent') continue;
          for (const c of ev.payload.commits ?? []) {
            if (items.length >= 9) break;
            items.push({
              id:      c.sha,
              repo:    ev.repo.name.replace(`${username}/`, ''),
              message: (c.message ?? '').split('\n')[0].slice(0, 70),
              time:    timeAgo(ev.created_at),
            });
          }
          if (items.length >= 9) break;
        }
        setRows(items);
        setStatus('ok');
      })
      .catch(() => setStatus('error'));
  }, [username]);

  if (status === 'loading') {
    return (
      <div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="github-feed__skeleton" />
        ))}
      </div>
    );
  }

  if (status === 'error' || rows.length === 0) {
    return (
      <p className="github-feed__error">
        {status === 'error' ? 'Could not fetch activity.' : 'No recent public commits.'}
      </p>
    );
  }

  return (
    <ul className="github-feed__list">
      {rows.map((row) => (
        <li key={row.id} className="github-feed__item">
          <div className="github-feed__dot" />
          <div className="github-feed__body">
            <span className="github-feed__repo">{row.repo}</span>
            <span className="github-feed__msg">{row.message}</span>
          </div>
          <span className="github-feed__time">{row.time}</span>
        </li>
      ))}
    </ul>
  );
}

// ── Feature cards data ────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: '⌘',
    title: 'Command Palette',
    desc:  'Press ⌘K to open a searchable command palette — navigate sections, toggle theme, copy email, or jump to any link.',
    hint:  <><kbd>⌘K</kbd> to open</>,
  },
  {
    icon: '📖',
    title: 'Reading Progress',
    desc:  'A 2px accent bar at the very top of the page fills as you scroll — so you always know where you are.',
    hint:  null,
    bar:   true,
  },
  {
    icon: '🌾',
    title: 'Film Grain',
    desc:  'A subtle animated noise texture is overlaid at 4% opacity — adds depth and that analogue, premium feel.',
    hint:  <>Look closely at any surface</>,
  },
  {
    icon: '🖱️',
    title: 'Cursor Glow',
    desc:  'The system cursor is replaced with a two-layer follower — a sharp dot and a lagging ring that expands on hover.',
    hint:  <>Move your mouse around</>,
  },
];

// ── Main section ──────────────────────────────────────────────────────────
export default function Magic() {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.08 });

  const githubUrl  = import.meta.env.VITE_GITHUB as string ?? '';
  const username   = githubUrl.replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '');

  return (
    <section className="section" id="magic">
      <div className="container">
        <div className={`animate-section${visible ? ' visible' : ''}`} ref={ref}>
          <span className="section-label">the details matter</span>
          <h2 className="section-heading">Hidden <em>Magic</em></h2>
          <p style={{ color: 'var(--c-muted)', fontSize: '1rem', marginTop: '4px', maxWidth: '560px' }}>
            This portfolio ships with a few invisible features built for the experience — not just the content.
          </p>

          <div className="magic__grid">
            {/* Left: feature cards */}
            <div className="magic__features">
              {FEATURES.map((f) => (
                <div className="magic-card" key={f.title}>
                  <span className="magic-card__icon">{f.icon}</span>
                  <span className="magic-card__title">{f.title}</span>
                  <p className="magic-card__desc">{f.desc}</p>
                  {f.bar && (
                    <div className="magic-card__bar-demo">
                      <div className="magic-card__bar-fill" />
                    </div>
                  )}
                  {f.hint && (
                    <span className="magic-card__hint">{f.hint}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Right: live GitHub feed */}
            <div className="magic__github">
              <div className="github-feed__header">
                <span className="github-feed__header-icon">🐙</span>
                <span className="github-feed__header-title">Live Commits · {username}</span>
                <span className="github-feed__live">
                  <span className="github-feed__live-dot" />
                  live
                </span>
              </div>
              <GitHubFeed username={username} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
