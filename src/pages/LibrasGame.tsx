import { useMemo, useState } from 'react';
import { VerifiedLibrasVideo } from '../components/VerifiedLibrasVideo';
import '../styles/libras-only.css';

type Concept = {
  id: 'atom' | 'electron' | 'proton' | 'molecule' | 'reaction' | 'element';
  driveId: string;
};

const concepts: Concept[] = [
  { id: 'atom', driveId: '1dr0kmFi0ukBUnirW8imVSo7RMPkJMmXs' },
  { id: 'electron', driveId: '1xjVra4cg-q8uOCguIS3al6aLio7XdBHv' },
  { id: 'proton', driveId: '1HUdjZ39lYCFQozl7q2WLh4b3Vk3NCcWp' },
  { id: 'molecule', driveId: '1moXvJmgD0JcjOb-jtyG9ATNm3LJTOzKK' },
  { id: 'reaction', driveId: '19VKFyRSarG6p1K82EX1nHAZ3RH3kTZCQ' },
  { id: 'element', driveId: '1XNtY-C0UwpUDMX8pqvyY1XhZnxXZ0Dh0' },
];

const rounds: Array<{ answer: Concept['id']; options: Concept['id'][] }> = [
  { answer: 'atom', options: ['atom', 'molecule', 'element'] },
  { answer: 'electron', options: ['proton', 'electron', 'atom'] },
  { answer: 'proton', options: ['electron', 'element', 'proton'] },
  { answer: 'molecule', options: ['molecule', 'atom', 'reaction'] },
  { answer: 'reaction', options: ['element', 'reaction', 'molecule'] },
  { answer: 'element', options: ['atom', 'proton', 'element'] },
];

function ChemistryVisual({ id }: { id: Concept['id'] }) {
  if (id === 'atom') return <span className="choice-visual emoji-choice">⚛️</span>;
  if (id === 'electron') return <span className="choice-visual notation-choice">e<sup>−</sup></span>;
  if (id === 'proton') return <span className="choice-visual notation-choice">p<sup>+</sup></span>;
  if (id === 'molecule') return <span className="choice-visual notation-choice molecule-choice">H<sub>2</sub>O</span>;
  if (id === 'reaction') {
    return (
      <span className="choice-visual reaction-choice" aria-hidden>
        <span className="particle-blue">●</span>
        <span>＋</span>
        <span className="particle-red">▲</span>
        <span>→</span>
        <span className="particle-mix">●▲</span>
      </span>
    );
  }

  return (
    <span className="choice-periodic" aria-hidden>
      <small>26</small>
      <strong>Fe</strong>
    </span>
  );
}

export function LibrasGame() {
  const [started, setStarted] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [wrongPick, setWrongPick] = useState<Concept['id'] | null>(null);
  const [correctPick, setCorrectPick] = useState<Concept['id'] | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = rounds[roundIndex];
  const sign = useMemo(
    () => concepts.find((concept) => concept.id === current.answer)!,
    [current],
  );

  const start = () => {
    setStarted(true);
    setRoundIndex(0);
    setWrongPick(null);
    setCorrectPick(null);
    setScore(0);
    setFinished(false);
  };

  const choose = (id: Concept['id']) => {
    if (correctPick) return;

    if (id !== current.answer) {
      setWrongPick(id);
      window.setTimeout(() => setWrongPick(null), 650);
      return;
    }

    setCorrectPick(id);
    setScore((value) => value + 1);

    window.setTimeout(() => {
      if (roundIndex === rounds.length - 1) {
        setFinished(true);
        return;
      }

      setRoundIndex((value) => value + 1);
      setWrongPick(null);
      setCorrectPick(null);
    }, 850);
  };

  if (!started) {
    const demo = concepts[0];

    return (
      <section className="visual-only-page">
        <div className="choice-game-intro">
          <div className="choice-game-intro-icons" aria-hidden>
            <span>🤟</span><span>↓</span><span>👆</span><span>✅</span>
          </div>

          <div className="choice-sign-stage">
            <VerifiedLibrasVideo
              source={{ kind: 'drive', id: demo.driveId }}
              ariaLabel="Sinal em Libras"
            />
          </div>

          <div className="choice-intro-options" aria-hidden>
            <div className="choice-option demo-correct">
              <ChemistryVisual id="atom" />
              <span className="choice-feedback">✓</span>
            </div>
            <div className="choice-option"><ChemistryVisual id="molecule" /></div>
            <div className="choice-option"><ChemistryVisual id="element" /></div>
          </div>

          <button type="button" className="visual-only-start choice-start" onClick={start} aria-label="Iniciar">
            ▶
          </button>
        </div>
      </section>
    );
  }

  if (finished) {
    return (
      <section className="visual-only-page">
        <div className="choice-finish">
          <div className="choice-finish-icons" aria-hidden>
            <span>🏆</span><span>🤟</span><span>⚗️</span>
          </div>

          <div className="choice-finish-score" aria-hidden>
            <span>✅</span>
            <strong>{score}/{rounds.length}</strong>
          </div>

          <div className="choice-review">
            {concepts.map((concept) => (
              <div className="choice-review-item" key={concept.id}>
                <div className="choice-review-sign">
                  <VerifiedLibrasVideo
                    source={{ kind: 'drive', id: concept.driveId }}
                    ariaLabel="Sinal em Libras"
                    compact
                  />
                </div>
                <div className="choice-review-symbol">
                  <ChemistryVisual id={concept.id} />
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="visual-only-start choice-start" onClick={start} aria-label="Reiniciar">
            ↻
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="visual-only-page">
      <div className="choice-progress" aria-hidden>
        {rounds.map((_, index) => (
          <i
            key={index}
            className={
              index < roundIndex
                ? 'done'
                : index === roundIndex
                  ? 'active'
                  : ''
            }
          />
        ))}
      </div>

      <div className="choice-game">
        <div className="choice-sign-stage">
          <VerifiedLibrasVideo
            source={{ kind: 'drive', id: sign.driveId }}
            ariaLabel="Sinal em Libras"
          />
        </div>

        <div className="choice-down-arrow" aria-hidden>↓</div>

        <div className="choice-grid">
          {current.options.map((id) => {
            const isWrong = wrongPick === id;
            const isCorrect = correctPick === id;

            return (
              <button
                key={id}
                type="button"
                className={`choice-option ${isWrong ? 'wrong' : ''} ${isCorrect ? 'correct' : ''}`}
                onClick={() => choose(id)}
                disabled={Boolean(correctPick)}
                aria-label="Opção"
              >
                <ChemistryVisual id={id} />
                {(isWrong || isCorrect) && (
                  <span className="choice-feedback" aria-hidden>
                    {isCorrect ? '✓' : '✕'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
