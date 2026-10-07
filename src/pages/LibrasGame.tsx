import { useMemo, useState } from 'react';
import { VerifiedLibrasVideo } from '../components/VerifiedLibrasVideo';
import '../styles/libras-only.css';

type Stage = 'tutorial' | 'play' | 'finish';

type Option = {
  icon: string;
  ph: number;
  isBase: boolean;
};

type Round = {
  options: Option[];
};

const BASE_SIGN = { kind: 'youtube' as const, id: 'Vb9eRbjJAZ4' };

const rounds: Round[] = [
  {
    options: [
      { icon: '🍋', ph: 2, isBase: false },
      { icon: '🧼', ph: 10, isBase: true },
      { icon: '🍊', ph: 3, isBase: false },
    ],
  },
  {
    options: [
      { icon: '🥤', ph: 3, isBase: false },
      { icon: '🧂', ph: 8.3, isBase: true },
      { icon: '🍎', ph: 4, isBase: false },
    ],
  },
  {
    options: [
      { icon: '🍋', ph: 2.5, isBase: false },
      { icon: '🧴', ph: 11, isBase: true },
      { icon: '🍅', ph: 4.5, isBase: false },
    ],
  },
  {
    options: [
      { icon: '🍇', ph: 3.5, isBase: false },
      { icon: '🧽', ph: 9, isBase: true },
      { icon: '☕', ph: 5, isBase: false },
    ],
  },
];

function MiniScale({ ph }: { ph: number }) {
  const pos = Math.max(0, Math.min(100, (ph / 14) * 100));
  return (
    <div className="match-card-strip" aria-hidden>
      <span className="match-card-dot" style={{ left: `${pos}%` }} />
    </div>
  );
}

export function LibrasGame() {
  const [stage, setStage] = useState<Stage>('tutorial');
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  const current = rounds[roundIndex];
  const correctIndex = useMemo(
    () => current.options.findIndex((option) => option.isBase),
    [current],
  );

  const start = () => {
    setStage('play');
    setRoundIndex(0);
    setScore(0);
    setPicked(null);
    setLocked(false);
  };

  const choose = (index: number) => {
    if (locked) return;
    setPicked(index);

    if (index === correctIndex) {
      setLocked(true);
      setScore((value) => value + 1);

      window.setTimeout(() => {
        if (roundIndex === rounds.length - 1) {
          setStage('finish');
          return;
        }
        setRoundIndex((value) => value + 1);
        setPicked(null);
        setLocked(false);
      }, 900);
      return;
    }

    window.setTimeout(() => setPicked(null), 700);
  };

  return (
    <section className="visual-only-page">
      <div className="visual-round-indicator" aria-hidden>
        {rounds.map((_, index) => (
          <i
            key={index}
            className={
              stage === 'finish' || index < roundIndex
                ? 'done'
                : stage === 'play' && index === roundIndex
                  ? 'active'
                  : ''
            }
          />
        ))}
      </div>

      <div className="visual-only-game-shell match-game">
        {stage === 'tutorial' && (
          <div className="visual-only-game-stage match-tutorial">
            <div className="match-sign">
              <VerifiedLibrasVideo source={BASE_SIGN} ariaLabel="Sinal em Libras" />
            </div>

            <div className="match-rule">
              <div className="match-rule-hint" aria-hidden>
                <span>🤟</span><span>＝</span><span className="base-zone">pH › 7</span>
              </div>
            </div>

            <div className="match-demo" aria-hidden>
              <div className="match-card">
                <span className="match-card-icon">🍋</span>
                <span className="match-card-ph">pH 2</span>
                <MiniScale ph={2} />
              </div>

              <div className="match-card correct">
                <span className="match-card-result">✓</span>
                <span className="match-card-icon">🧼</span>
                <span className="match-card-ph">pH 10</span>
                <MiniScale ph={10} />
              </div>

              <div className="match-card">
                <span className="match-card-icon">🍊</span>
                <span className="match-card-ph">pH 3</span>
                <MiniScale ph={3} />
              </div>
            </div>

            <button type="button" className="visual-only-start" onClick={start} aria-label="Iniciar">
              ▶
            </button>
          </div>
        )}

        {stage === 'play' && (
          <div className="visual-only-game-stage">
            <div className="match-sign">
              <VerifiedLibrasVideo source={BASE_SIGN} ariaLabel="Sinal em Libras" />
            </div>

            <div className="match-rule-hint" aria-hidden>
              <span>👀</span><span>→</span><span>🎯</span>
            </div>

            <div className="match-cards">
              {current.options.map((option, index) => {
                const isPicked = picked === index;
                const isCorrect = index === correctIndex;
                const stateClass = isPicked ? (isCorrect ? 'correct' : 'wrong') : '';

                return (
                  <button
                    key={`${roundIndex}-${index}`}
                    type="button"
                    className={`match-card ${stateClass}`}
                    onClick={() => choose(index)}
                    disabled={locked}
                    aria-label={`pH ${option.ph}`}
                  >
                    {isPicked && (
                      <span className="match-card-result" aria-hidden>
                        {isCorrect ? '✓' : '✕'}
                      </span>
                    )}
                    <span className="match-card-icon" aria-hidden>{option.icon}</span>
                    <span className="match-card-ph">pH {option.ph}</span>
                    <MiniScale ph={option.ph} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {stage === 'finish' && (
          <div className="match-finish">
            <div className="match-finish-icons" aria-hidden>
              <span>🏆</span><span>🤟</span><span>👏</span>
            </div>

            <div className="visual-score" aria-label={`${score} de ${rounds.length}`}>
              <span>{score}</span><span>/ {rounds.length}</span>
            </div>

            <div className="match-feedback-sign">
              <VerifiedLibrasVideo source={BASE_SIGN} ariaLabel="Sinal em Libras" compact />
            </div>

            <button type="button" className="visual-only-start match-restart" onClick={start} aria-label="Reiniciar">
              ↻
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
