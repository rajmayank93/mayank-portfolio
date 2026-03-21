import { useEffect, useMemo, useState } from 'react';
import './CodeTypewriter.css';

// ── Types ─────────────────────────────────────────────────────────────────
type Token    = { text: string; cls?: string };
type Line     = Token[];
interface Snippet { filename: string; lines: Line[] }

// ── Snippet data ──────────────────────────────────────────────────────────
// Three real patterns from Juspay work: SSE streaming, IndexedDB cache, JAF agent
const SNIPPETS: Snippet[] = [
  {
    filename: 'useStreamingChat.ts',
    lines: [
      [{ text: '// SSE hook — latency ↓ 40%', cls: 't-comment' }],
      [
        { text: 'const ', cls: 't-keyword' },
        { text: 'useStreamingChat', cls: 't-fn' },
        { text: ' = (' },
        { text: 'url', cls: 't-param' },
        { text: ': ' },
        { text: 'string', cls: 't-type' },
        { text: ') => {' },
      ],
      [
        { text: '  ' },
        { text: 'const ', cls: 't-keyword' },
        { text: '[' },
        { text: 'chunks', cls: 't-param' },
        { text: ', ' },
        { text: 'setChunks', cls: 't-fn' },
        { text: '] = ' },
        { text: 'useState', cls: 't-fn' },
        { text: '<' },
        { text: 'string[]', cls: 't-type' },
        { text: '>([]);' },
      ],
      [{ text: '' }],
      [
        { text: '  ' },
        { text: 'const ', cls: 't-keyword' },
        { text: 'connect', cls: 't-fn' },
        { text: ' = () => {' },
      ],
      [
        { text: '    ' },
        { text: 'const ', cls: 't-keyword' },
        { text: 'sse', cls: 't-param' },
        { text: ' = ' },
        { text: 'new ', cls: 't-keyword' },
        { text: 'EventSource', cls: 't-fn' },
        { text: '(' },
        { text: 'url', cls: 't-param' },
        { text: ');' },
      ],
      [
        { text: '    ' },
        { text: 'sse', cls: 't-param' },
        { text: '.' },
        { text: 'onmessage', cls: 't-method' },
        { text: ' = ({ ' },
        { text: 'data', cls: 't-param' },
        { text: ' }) => {' },
      ],
      [
        { text: '      ' },
        { text: 'setChunks', cls: 't-fn' },
        { text: '(' },
        { text: 'prev', cls: 't-param' },
        { text: ' => [...' },
        { text: 'prev', cls: 't-param' },
        { text: ', ' },
        { text: 'data', cls: 't-param' },
        { text: ']);' },
      ],
      [{ text: '    };' }],
      [{ text: '  };' }],
      [{ text: '' }],
      [
        { text: '  ' },
        { text: 'return', cls: 't-keyword' },
        { text: ' { ' },
        { text: 'chunks', cls: 't-param' },
        { text: ', ' },
        { text: 'connect', cls: 't-param' },
        { text: ' };' },
      ],
      [{ text: '};' }],
    ],
  },
  {
    filename: 'usePersistentStore.ts',
    lines: [
      [{ text: '// IndexedDB cache — load perf ↑ 25%', cls: 't-comment' }],
      [
        { text: 'const ', cls: 't-keyword' },
        { text: 'usePersistentStore', cls: 't-fn' },
        { text: ' = (' },
        { text: 'key', cls: 't-param' },
        { text: ': ' },
        { text: 'string', cls: 't-type' },
        { text: ') => {' },
      ],
      [
        { text: '  ' },
        { text: 'const ', cls: 't-keyword' },
        { text: 'db', cls: 't-param' },
        { text: ' = ' },
        { text: 'useRef', cls: 't-fn' },
        { text: '<' },
        { text: 'IDBDatabase', cls: 't-type' },
        { text: ' | ' },
        { text: 'null', cls: 't-keyword' },
        { text: '>(null);' },
      ],
      [{ text: '' }],
      [
        { text: '  ' },
        { text: 'const ', cls: 't-keyword' },
        { text: 'save', cls: 't-fn' },
        { text: ' = ' },
        { text: 'async', cls: 't-keyword' },
        { text: ' (' },
        { text: 'msg', cls: 't-param' },
        { text: ': ' },
        { text: 'Message', cls: 't-type' },
        { text: ') => {' },
      ],
      [
        { text: '    ' },
        { text: 'const ', cls: 't-keyword' },
        { text: 'tx', cls: 't-param' },
        { text: ' = ' },
        { text: 'db', cls: 't-param' },
        { text: '.current!.' },
        { text: 'transaction', cls: 't-method' },
        { text: '(' },
        { text: "'chats'", cls: 't-string' },
        { text: ', ' },
        { text: "'readwrite'", cls: 't-string' },
        { text: ');' },
      ],
      [
        { text: '    ' },
        { text: 'await ', cls: 't-keyword' },
        { text: 'tx', cls: 't-param' },
        { text: '.' },
        { text: 'objectStore', cls: 't-method' },
        { text: '(' },
        { text: "'chats'", cls: 't-string' },
        { text: ').' },
        { text: 'put', cls: 't-method' },
        { text: '(' },
        { text: 'msg', cls: 't-param' },
        { text: ');' },
      ],
      [{ text: '  };' }],
      [{ text: '' }],
      [
        { text: '  ' },
        { text: 'return', cls: 't-keyword' },
        { text: ' { ' },
        { text: 'save', cls: 't-param' },
        { text: ' };' },
      ],
      [{ text: '};' }],
    ],
  },
  {
    filename: 'ticketAgent.ts',
    lines: [
      [{ text: '// JAF agent — Xyne platform (Kimi K2)', cls: 't-comment' }],
      [
        { text: 'const ', cls: 't-keyword' },
        { text: 'ticketAgent', cls: 't-param' },
        { text: ' = ' },
        { text: 'createAgent', cls: 't-fn' },
        { text: '({' },
      ],
      [
        { text: '  name: ' },
        { text: "'TicketSummarizer'", cls: 't-string' },
        { text: ',' },
      ],
      [
        { text: '  model: ' },
        { text: "'kimi-k2'", cls: 't-string' },
        { text: ',' },
      ],
      [
        { text: '  tools: [' },
        { text: 'searchTool', cls: 't-param' },
        { text: ', ' },
        { text: 'writeTool', cls: 't-param' },
        { text: '],' },
      ],
      [
        { text: '  ' },
        { text: 'async ', cls: 't-keyword' },
        { text: 'run', cls: 't-fn' },
        { text: '(' },
        { text: 'desc', cls: 't-param' },
        { text: ': ' },
        { text: 'string', cls: 't-type' },
        { text: ') {' },
      ],
      [
        { text: '    ' },
        { text: 'const ', cls: 't-keyword' },
        { text: 'title', cls: 't-param' },
        { text: ' = ' },
        { text: 'await ', cls: 't-keyword' },
        { text: 'llm', cls: 't-param' },
        { text: '.' },
        { text: 'complete', cls: 't-method' },
        { text: '(' },
      ],
      [
        { text: '      `Summarise in 8 words: ', cls: 't-string' },
        { text: '${', cls: 't-punc' },
        { text: 'desc', cls: 't-param' },
        { text: '}', cls: 't-punc' },
        { text: '`', cls: 't-string' },
        { text: ',' },
      ],
      [{ text: '    );' }],
      [
        { text: '    ' },
        { text: 'return', cls: 't-keyword' },
        { text: ' { ' },
        { text: 'title', cls: 't-param' },
        { text: ' };' },
      ],
      [{ text: '  },' }],
      [{ text: '});' }],
    ],
  },
];

// ── Flatten snippet into char array ───────────────────────────────────────
type FlatChar = { char: string; cls: string };

function flatten(lines: Line[]): FlatChar[] {
  const out: FlatChar[] = [];
  lines.forEach((line, li) => {
    line.forEach((tok) => {
      for (const char of tok.text) {
        out.push({ char, cls: tok.cls ?? '' });
      }
    });
    if (li < lines.length - 1) {
      out.push({ char: '\n', cls: '' });
    }
  });
  return out;
}

// ── Build renderable lines from flat chars[0..count] ─────────────────────
type Span = { cls: string; text: string };

function buildDisplay(flat: FlatChar[], count: number): Span[][] {
  const displayLines: Span[][] = [[]];
  for (let i = 0; i < count; i++) {
    const { char, cls } = flat[i];
    if (char === '\n') {
      displayLines.push([]);
      continue;
    }
    const cur = displayLines[displayLines.length - 1];
    const last = cur[cur.length - 1];
    if (last && last.cls === cls) {
      last.text += char;
    } else {
      cur.push({ cls, text: char });
    }
  }
  return displayLines;
}

// ── Timing constants ──────────────────────────────────────────────────────
const TYPE_MS  = 28;   // ms per char typed
const ERASE_MS = 10;   // ms per char erased (faster)
const HOLD_MS  = 2600; // pause after fully typed
const GAP_MS   = 380;  // pause before next snippet

type Phase = 'typing' | 'hold' | 'erasing' | 'gap';

// ── Component ─────────────────────────────────────────────────────────────
export default function CodeTypewriter() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [count, setCount]           = useState(0);
  const [phase, setPhase]           = useState<Phase>('typing');

  const snippet = SNIPPETS[snippetIdx];
  const flat    = useMemo(() => flatten(snippet.lines), [snippet]);
  const total   = flat.length;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    switch (phase) {
      case 'typing':
        if (count < total) {
          timer = setTimeout(() => setCount((c) => c + 1), TYPE_MS);
        } else {
          setPhase('hold');
        }
        break;

      case 'hold':
        timer = setTimeout(() => setPhase('erasing'), HOLD_MS);
        break;

      case 'erasing':
        if (count > 0) {
          timer = setTimeout(() => setCount((c) => c - 1), ERASE_MS);
        } else {
          setPhase('gap');
        }
        break;

      case 'gap':
        timer = setTimeout(() => {
          setSnippetIdx((i) => (i + 1) % SNIPPETS.length);
          setPhase('typing');
        }, GAP_MS);
        break;
    }

    return () => clearTimeout(timer);
  }, [phase, count, total]);

  const displayLines = buildDisplay(flat, count);

  return (
    <div className="code-card">
      {/* Window chrome */}
      <div className="code-card__bar">
        <div className="code-card__dots">
          <span className="code-card__dot code-card__dot--red"    />
          <span className="code-card__dot code-card__dot--yellow" />
          <span className="code-card__dot code-card__dot--green"  />
        </div>
        <span className="code-card__filename">{snippet.filename}</span>
      </div>

      {/* Code body */}
      <div className="code-card__body">
        {displayLines.map((line, li) => (
          <div className="code-line" key={li}>
            <span className="code-ln">{li + 1}</span>
            <span className="code-text">
              {line.map((span, si) =>
                span.cls
                  ? <span key={si} className={span.cls}>{span.text}</span>
                  : <span key={si}>{span.text}</span>
              )}
              {/* Cursor on last visible line */}
              {li === displayLines.length - 1 && (
                <span className="code-cursor" />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
