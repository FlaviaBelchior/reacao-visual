import { useState } from 'react';
import { VerifiedLibrasVideo } from '../components/VerifiedLibrasVideo';
import '../styles/libras-only.css';

type Pair = {
  id: string;
  driveId: string;
};

type MemoryCard = {
  uid: string;
  pairId: string;
  kind: 'symbol' | 'sign';
};

const pairs: Pair[] = [
  { id: 'atom', driveId: '1dr0kmFi0ukBUnirW8imVSo7RMPkJMmXs' },
  { id: 'electron', driveId: '1xjVra4cg-q8uOCguIS3al6aLio7XdBHv' },
  { id: 'proton', driveId: '1HUdjZ39lYCFQozl7q2WLh4b3Vk3NCcWp' },
  { id: 'molecule', driveId: '1moXvJmgD0JcjOb-jtyG9ATNm3LJTOzKK' },
  { id: 'reaction', driveId: '19VKFyRSarG6p1K82EX1nHAZ3RH3kTZCQ' },
  { id: 'element', driveId: '1XNtY-C0UwpUDMX8pqvyY1XhZnxXZ0Dh0' },
];

function createDeck(): MemoryCard[] {
  return pairs
    .flatMap((pair) => [
      { uid: `${pair.id}-symbol`, pairId: pair.id, kind: 'symbol' as const },
      { uid: `${pair.id}-sign`, pairId: pair.id, kind: 'sign' as const },
    ])
    .sort(() => Math.random() - 0.5);
}

function ChemistrySymbol({ id }: { id: string }) {
  if (id === 'atom') return <span className="memory-symbol emoji-symbol">⚛️</span>;
  if (id === 'electron') return <span className="memory-symbol chem-notation">e<sup>−</sup></span>;
  if (id === 'proton') return <span className="memory-symbol chem-notation">p<sup>+</sup></span>;
  if (id === 'molecule') return <span className="memory-symbol chem-notation molecule-symbol">H<sub>2</sub>O</span>;
  if (id === 'reaction') {
    return (
      <span className="memory-symbol reaction-symbol" aria-hidden>
        <span>●</span><span>＋</span><span>▲</span><span>→</span><span>●▲</span>
      </span>
    );
  }
  return (
    <span className="memory-periodic-tile" aria-hidden>
      <small>26</small>
      <strong>Fe</strong>
    </span>
  );
}

function SignThumbnail({ pair }: { pair: Pair }) {
  return (
    <div className="memory-sign-thumb" aria-hidden>
      <span className="memory-sign-fallback">🤟</span>
      <img
        src={`https://drive.google.com/thumbnail?id=${pair.driveId}&sz=w1000`}
        alt=""
        draggable={false}
        onError={(event) => {
          event.currentTarget.style.opacity = '0';
        }}
      />
      <span className="memory-hand-badge">🤟</span>
    </div>
  );
}

export function LibrasGame() {
  const [started, setStarted] = useState(false);
  const [deck, setDeck] = useState<MemoryCard[]>(() => createDeck());
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [finished, setFinished] = useState(false);

  const reset = () => {
    setDeck(createDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setLocked(false);
    setFinished(false);
    setStarted(true);
  };

  const flipCard = (card: MemoryCard) => {
    if (
      locked ||
      matched.includes(card.pairId) ||
      flipped.includes(card.uid) ||
      flipped.length >= 2
    ) {
      return;
    }

    const next = [...flipped, card.uid];
    setFlipped(next);

    if (next.length !== 2) return;

    setMoves((value) => value + 1);
    const first = deck.find((item) => item.uid === next[0]);
    const second = deck.find((item) => item.uid === next[1]);

    if (first && second && first.pairId === second.pairId && first.kind !== second.kind) {
      setLocked(true);
      window.setTimeout(() => {
        setMatched((current) => {
          const updated = [...current, first.pairId];
          if (updated.length === pairs.length) {
            window.setTimeout(() => setFinished(true), 550);
          }
          return updated;
        });
        setFlipped([]);
        setLocked(false);
      }, 450);
      return;
    }

    setLocked(true);
    window.setTimeout(() => {
      setFlipped([]);
      setLocked(false);
    }, 900);
  };

  const example = pairs[0];

  if (!started) {
    return (
      <section className="visual-only-page">
        <div className="memory-intro">
          <div className="memory-intro-symbols" aria-hidden>
            <span>🧠</span><span>＋</span><span>🤟</span><span>＋</span><span>⚗️</span>
          </div>

          <div className="memory-demo-pair">
            <div className="memory-card memory-card-open demo-card" aria-hidden>
              <div className="memory-card-face memory-card-front symbol-face">
                <ChemistrySymbol id={example.id} />
              </div>
            </div>

            <span className="memory-demo-link" aria-hidden>↔</span>

            <div className="memory-card memory-card-open demo-card" aria-hidden>
              <div className="memory-card-face memory-card-front sign-face">
                <SignThumbnail pair={example} />
              </div>
            </div>
          </div>

          <div className="memory-intro-flow" aria-hidden>
            <span>👆</span><span>→</span><span>👆</span><span>→</span><span>✅</span>
          </div>

          <button type="button" className="visual-only-start memory-start" onClick={reset} aria-label="Iniciar">
            ▶
          </button>
        </div>
      </section>
    );
  }

  if (finished) {
    return (
      <section className="visual-only-page">
        <div className="memory-finish">
          <div className="memory-finish-icons" aria-hidden>
            <span>🏆</span><span>🤟</span><span>⚛️</span>
          </div>

          <div className="memory-scoreboard" aria-hidden>
            <span>✅ {matched.length}/{pairs.length}</span>
            <span>🔄 {moves}</span>
          </div>

          <div className="memory-review-grid">
            {pairs.map((pair) => (
              <div key={pair.id} className="memory-review-card">
                <div className="memory-review-symbol">
                  <ChemistrySymbol id={pair.id} />
                </div>
                <div className="memory-review-video">
                  <VerifiedLibrasVideo
                    source={{ kind: 'drive', id: pair.driveId }}
                    ariaLabel="Sinal em Libras"
                    compact
                  />
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="visual-only-start memory-restart" onClick={reset} aria-label="Reiniciar">
            ↻
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="visual-only-page">
      <div className="memory-status" aria-hidden>
        <span>✅ {matched.length}/{pairs.length}</span>
        <span>🔄 {moves}</span>
      </div>

      <div className="memory-board">
        {deck.map((card) => {
          const pair = pairs.find((item) => item.id === card.pairId)!;
          const isMatched = matched.includes(card.pairId);
          const isFlipped = flipped.includes(card.uid) || isMatched;

          return (
            <button
              key={card.uid}
              type="button"
              className={`memory-card ${isFlipped ? 'memory-card-open' : ''} ${isMatched ? 'memory-card-matched' : ''}`}
              onClick={() => flipCard(card)}
              disabled={locked && !isFlipped}
              aria-label="Carta"
            >
              <span className="memory-card-inner">
                <span className="memory-card-face memory-card-back" aria-hidden>
                  <span className="memory-back-hand">🤟</span>
                  <span className="memory-back-chem">⚗️</span>
                </span>

                <span className={`memory-card-face memory-card-front ${card.kind === 'symbol' ? 'symbol-face' : 'sign-face'}`}>
                  {card.kind === 'symbol' ? (
                    <ChemistrySymbol id={card.pairId} />
                  ) : isMatched ? (
                    <VerifiedLibrasVideo
                      source={{ kind: 'drive', id: pair.driveId }}
                      ariaLabel="Sinal em Libras"
                      compact
                    />
                  ) : (
                    <SignThumbnail pair={pair} />
                  )}

                  {isMatched && <span className="memory-match-check" aria-hidden>✓</span>}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
