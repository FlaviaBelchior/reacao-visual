import { useState } from 'react';
import { VerifiedLibrasVideo } from '../components/VerifiedLibrasVideo';
import '../styles/libras-only.css';

type Stage = 'learn' | 'play' | 'feedback' | 'finish';

type Round = {
  icon: string;
  ph: number;
  isBase: boolean;
};

const BASE_SIGN = { kind: 'youtube' as const, id: 'Vb9eRbjJAZ4' };

const rounds: Round[] = [
  { icon: '🧼', ph: 10, isBase: true },
  { icon: '🍋', ph: 2, isBase: false },
  { icon: '🧂', ph: 8.3, isBase: true },
  { icon: '🍊', ph: 3, isBase: false },
];

function PhBar({ ph }: { ph: number }) {
  const pos = Math.max(0, Math.min(100, (ph / 14) * 100));
  return (
    <div className="libras-game-scale" aria-label={`pH ${ph}`}>
      <span className="libras-game-scale-pointer" style={{ left: `${pos}%` }} />
      <div className="libras-game-scale-track" />
      <div className="libras-game-scale-labels" aria-hidden>
        <span>0</span><span>7</span><span>14</span>
      </div>
    </div>
  );
}

export function LibrasGame() {
  const [stage, setStage] = useState<Stage>('learn');
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [lastCorrect, setLastCorrect] = useState(false);

  const current = rounds[round];

  const start = () => {
    setRound(0);
    setScore(0);
    setLastCorrect(false);
    setStage('play');
  };

  const answer = (choice: boolean) => {
    const ok = choice === current.isBase;
    setLastCorrect(ok);
    if (ok) setScore((s) => s + 1);
    setStage('feedback');
  };

  const next = () => {
    if (!lastCorrect) {
      setStage('play');
      return;
    }
    if (round >= rounds.length - 1) {
      setStage('finish');
      return;
    }
    setRound((r) => r + 1);
    setStage('play');
  };

  return (
    <section className="visual-only-page">
      <div className="visual-round-indicator" aria-hidden>
        {rounds.map((_, index) => (
          <i key={index} className={stage === 'finish' || index < round ? 'done' : index === round && stage !== 'learn' ? 'active' : ''} />
        ))}
      </div>

      <div className="visual-only-game-shell">
        {stage === 'learn' && (
          <div className="visual-only-game-stage">
            <VerifiedLibrasVideo source={BASE_SIGN} ariaLabel="Sinal de base em Libras" />
            <PhBar ph={9} />
            <div className="visual-only-flow" aria-hidden>
              <span>🤟</span><span>＝</span><span>pH</span><span>›</span><span>7</span>
            </div>
            <button type="button" className="visual-only-start" onClick={start} aria-label="Iniciar">▶</button>
          </div>
        )}

        {stage === 'play' && (
          <div className="visual-only-game-stage">
            <div className="visual-example" aria-hidden>{current.icon}</div>
            <PhBar ph={current.ph} />
            <div className="visual-only-flow" aria-hidden>
              <span>👀</span><span>→</span><span>pH {current.ph}</span><span>→</span><span>?</span>
            </div>

            <div className="visual-choice-grid">
              <button type="button" className="visual-choice" onClick={() => answer(true)} aria-label="Sim">
                <VerifiedLibrasVideo source={BASE_SIGN} ariaLabel="Sinal de base em Libras" compact />
                <span className="visual-choice-mark" aria-hidden>✓</span>
              </button>

              <button type="button" className="visual-choice" onClick={() => answer(false)} aria-label="Não">
                <div className="visual-example" style={{ minHeight: 0, aspectRatio: '4 / 3', border: 0, borderRadius: 0 }} aria-hidden>
                  <div className="sequence"><span>🤟</span><span style={{ color: '#ef4444' }}>✕</span></div>
                </div>
                <span className="visual-choice-mark" aria-hidden>✕</span>
              </button>
            </div>
          </div>
        )}

        {stage === 'feedback' && (
          <div className="visual-feedback">
            <div className="visual-feedback-symbol" aria-hidden>{lastCorrect ? '✅' : '❌'}</div>
            {lastCorrect && <VerifiedLibrasVideo source={BASE_SIGN} ariaLabel="Sinal de base em Libras" compact />}
            <button
              type="button"
              className="visual-only-start"
              onClick={next}
              aria-label={lastCorrect ? 'Continuar' : 'Tentar novamente'}
            >
              {lastCorrect ? '→' : '↻'}
            </button>
          </div>
        )}

        {stage === 'finish' && (
          <div className="visual-feedback">
            <div className="visual-feedback-symbol" aria-hidden>🏆</div>
            <div className="visual-score" aria-label={`${score} de ${rounds.length}`}>
              <span>{score}</span><span>/ {rounds.length}</span>
            </div>
            <div className="visual-only-symbols" aria-hidden><span>👏</span><span>🤟</span><span>👏</span></div>
            <button type="button" className="visual-only-start" onClick={() => setStage('learn')} aria-label="Reiniciar">↻</button>
          </div>
        )}
      </div>
    </section>
  );
}
