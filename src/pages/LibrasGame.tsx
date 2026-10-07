import { useMemo, useState } from 'react';
import '../styles/libras-game.css';

type Answer = 'acid' | 'base';
type Stage = 'learn' | 'play' | 'feedback' | 'finish';

type Round = {
  icon: string;
  ph: number;
  answer: Answer;
};

const SIGN = {
  acid: 'IKjm5u7yNbE',
  base: 'tlvoIMnOIUE',
  correct: 'ZXA_pJr_1bs',
  wrong: 'h2RY7NlG_5A',
  celebrate: 'HjQt_xgK-g8',
};

const rounds: Round[] = [
  { icon: '🍋', ph: 2, answer: 'acid' },
  { icon: '🧼', ph: 10, answer: 'base' },
  { icon: '🍊', ph: 3, answer: 'acid' },
  { icon: '🧂', ph: 8.3, answer: 'base' },
];

function SignClip({ id, label }: { id: string; label: string }) {
  const src = useMemo(
    () => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&playsinline=1&fs=0&disablekb=1`,
    [id],
  );

  return (
    <div className="libras-sign-clip">
      <iframe
        src={src}
        title={label}
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

function PhScale({ ph }: { ph: number }) {
  const left = Math.min(100, Math.max(0, (ph / 14) * 100));

  return (
    <div className="libras-game-scale" aria-label={`pH ${ph}`}>
      <span className="libras-game-scale-pointer" style={{ left: `${left}%` }} />
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
  const [correct, setCorrect] = useState(false);

  const current = rounds[round];

  const start = () => {
    setRound(0);
    setScore(0);
    setCorrect(false);
    setStage('play');
  };

  const choose = (answer: Answer) => {
    const hit = answer === current.answer;
    setCorrect(hit);
    if (hit) setScore((value) => value + 1);
    setStage('feedback');
  };

  const advance = () => {
    if (!correct) {
      setStage('play');
      return;
    }
    if (round === rounds.length - 1) {
      setStage('finish');
      return;
    }
    setRound((value) => value + 1);
    setCorrect(false);
    setStage('play');
  };

  return (
    <section className="libras-game-page">
      <div className="libras-game">
        <div className="libras-game-top" aria-hidden>
          <div className="libras-game-mark"><span>🤟</span><span>🧪</span></div>
          <div className="libras-game-progress">
            {rounds.map((_, index) => (
              <i
                key={index}
                className={index < round || stage === 'finish' ? 'done' : index === round && stage !== 'learn' ? 'active' : ''}
              />
            ))}
          </div>
        </div>

        <div className="libras-game-panel">
          {stage === 'learn' && (
            <div className="libras-game-stage libras-game-intro">
              <PhScale ph={7} />
              <div className="libras-sign-grid">
                <div className="libras-sign-card acid">
                  <SignClip id={SIGN.acid} label="LIBRAS" />
                  <div className="libras-sign-select" aria-hidden>🤟</div>
                </div>
                <div className="libras-sign-card base">
                  <SignClip id={SIGN.base} label="LIBRAS" />
                  <div className="libras-sign-select" aria-hidden>🤟</div>
                </div>
              </div>
              <div className="libras-game-flow" aria-hidden><span>👀</span><span>→</span><span>🧠</span><span>→</span><span>🎯</span></div>
              <button type="button" className="libras-game-action" onClick={start} aria-label="Iniciar">
                ▶
              </button>
            </div>
          )}

          {stage === 'play' && (
            <div className="libras-game-stage">
              <div className="libras-game-substance" aria-label={`pH ${current.ph}`}>
                <span className="object" aria-hidden>{current.icon}</span>
                <span className="ph">pH {current.ph}</span>
              </div>

              <PhScale ph={current.ph} />

              <div className="libras-game-flow" aria-hidden><span>👀</span><span>→</span><span>🤟</span></div>

              <div className="libras-sign-grid">
                <div className="libras-sign-card acid">
                  <SignClip id={SIGN.acid} label="LIBRAS" />
                  <button type="button" className="libras-sign-select" onClick={() => choose('acid')} aria-label="Selecionar primeiro sinal">
                    👆
                  </button>
                </div>
                <div className="libras-sign-card base">
                  <SignClip id={SIGN.base} label="LIBRAS" />
                  <button type="button" className="libras-sign-select" onClick={() => choose('base')} aria-label="Selecionar segundo sinal">
                    👆
                  </button>
                </div>
              </div>
            </div>
          )}

          {stage === 'feedback' && (
            <div className={`libras-game-stage libras-game-feedback ${correct ? 'correct' : 'wrong'}`}>
              <div className="libras-game-feedback-icon" aria-hidden>{correct ? '✓' : '✕'}</div>
              <div className="libras-feedback-video">
                <SignClip id={correct ? SIGN.correct : SIGN.wrong} label="LIBRAS" />
              </div>
              <button
                type="button"
                className={`libras-game-action ${correct ? 'success' : 'retry'}`}
                onClick={advance}
                aria-label={correct ? 'Continuar' : 'Tentar novamente'}
              >
                {correct ? '→' : '↻'}
              </button>
            </div>
          )}

          {stage === 'finish' && (
            <div className="libras-game-stage libras-game-feedback correct">
              <div className="libras-game-feedback-icon" aria-hidden>🏆</div>
              <div className="libras-feedback-video">
                <SignClip id={SIGN.celebrate} label="LIBRAS" />
              </div>
              <div className="libras-game-score" aria-label={`${score} de ${rounds.length}`}>
                <span>{score}</span><small>/ {rounds.length}</small>
              </div>
              <button type="button" className="libras-game-action secondary" onClick={() => setStage('learn')} aria-label="Reiniciar">
                ↻
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
