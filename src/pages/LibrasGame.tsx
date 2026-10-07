import { useMemo, useState, type ReactNode } from 'react';
import { VerifiedLibrasVideo } from '../components/VerifiedLibrasVideo';
import { sinquiStages, type SinquiTerm } from '../data/sinquiTerms';
import '../styles/libras-only.css';

type Mode = 'map' | 'play' | 'review';

function Visual({ id }: { id: string }) {
  const notation = (html: ReactNode, cls='notation-choice') => <span className={`choice-visual ${cls}`}>{html}</span>;

  switch (id) {
    case 'atom': return <span className="choice-visual emoji-choice">⚛️</span>;
    case 'electron': return notation(<span>e<sup>−</sup></span>);
    case 'electrosphere': return <span className="concept-orbit"><i/><i/><i/><b>•</b></span>;
    case 'nucleus': return <span className="concept-nucleus"><b>＋</b><b>○</b><b>＋</b></span>;
    case 'proton': return notation(<span>p<sup>+</sup></span>);
    case 'neutron': return notation(<span>n<sup>0</sup></span>);
    case 'element': return <span className="choice-periodic"><small>26</small><strong>Fe</strong></span>;
    case 'cation': return notation(<span>Na<sup>+</sup></span>);
    case 'anion': return notation(<span>Cl<sup>−</sup></span>);
    case 'ion': return <span className="choice-visual ion-choice"><span>＋</span><span>⚛️</span><span>−</span></span>;
    case 'covalent': return notation(<span>H—H</span>, 'bond-choice');
    case 'ionic': return notation(<span>Na<sup>+</sup> ··· Cl<sup>−</sup></span>, 'bond-choice');
    case 'simple-substance': return notation(<span>O<sub>2</sub></span>);
    case 'compound-substance': return notation(<span>H<sub>2</sub>O</span>);
    case 'molecule': return notation(<span>H—O—H</span>, 'bond-choice');
    case 'homogeneous': return <span className="mixture-cup homogeneous-cup"><i/></span>;
    case 'heterogeneous': return <span className="mixture-cup heterogeneous-cup"><i/><i/></span>;
    case 'solid': return <span className="choice-visual emoji-choice">🧊</span>;
    case 'liquid': return <span className="choice-visual emoji-choice">💧</span>;
    case 'gas': return <span className="choice-visual emoji-choice">☁️</span>;
    case 'fusion': return <span className="transition-choice"><span>🧊</span><b>→</b><span>💧</span></span>;
    case 'vaporization': return <span className="transition-choice"><span>💧</span><b>→</b><span>☁️</span></span>;
    case 'solidification': return <span className="transition-choice"><span>💧</span><b>→</b><span>🧊</span></span>;
    case 'condensation': return <span className="transition-choice"><span>☁️</span><b>→</b><span>💧</span></span>;
    case 'sublimation': return <span className="transition-choice"><span>🧊</span><b>→</b><span>☁️</span></span>;
    case 'physical-phenomenon': return <span className="transition-choice"><span>🧊</span><b>→</b><span>💧</span></span>;
    case 'chemical-phenomenon': return <span className="transition-choice"><span>🕯️</span><b>→</b><span>🔥</span></span>;
    case 'chemical-reaction': return <span className="choice-visual reaction-choice"><span className="particle-blue">●</span><span>＋</span><span className="particle-red">▲</span><span>→</span><span className="particle-mix">●▲</span></span>;
    case 'endothermic': return <span className="energy-flow"><span>🔥</span><b>→</b><span>🧪</span></span>;
    case 'exothermic': return <span className="energy-flow"><span>🧪</span><b>→</b><span>🔥</span></span>;
    case 'energy': return <span className="choice-visual emoji-choice">⚡</span>;
    case 'electrical-energy': return <span className="energy-flow"><span>🔌</span><span>⚡</span></span>;
    case 'chemical-energy': return <span className="energy-flow"><span>🔋</span><span>🧪</span></span>;
    case 'heat': return <span className="choice-visual emoji-choice">♨️</span>;
    case 'thermal-energy': return <span className="energy-flow"><span>🌡️</span><span>🔥</span></span>;
    case 'light-energy': return <span className="choice-visual emoji-choice">💡</span>;
    case 'sound-energy': return <span className="choice-visual emoji-choice">🔊</span>;
    case 'rutherford': return <span className="scientist-model rutherford-model"><span>🎯</span><span>⚛️</span></span>;
    case 'thomson': return <span className="plum-model"><i/><i/><i/><i/></span>;
    case 'dalton': return <span className="dalton-model">●</span>;
    case 'mendeleev': return <span className="periodic-grid">{Array.from({length:18}).map((_,i)=><i key={i}/>)}</span>;
    case 'bohr': return <span className="bohr-model"><i/><i/><b>●</b></span>;
    default: return <span className="choice-visual emoji-choice">🧪</span>;
  }
}

function choicesFor(terms: SinquiTerm[], index: number) {
  const answer = terms[index];
  const a = terms[(index + 1) % terms.length];
  const b = terms[(index + Math.max(2, Math.floor(terms.length / 2))) % terms.length];
  const options = [answer, a, b];
  const shift = index % 3;
  return [...options.slice(shift), ...options.slice(0, shift)];
}

export function LibrasGame() {
  const [mode, setMode] = useState<Mode>('map');
  const [stageIndex, setStageIndex] = useState(0);
  const [round, setRound] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);
  const [right, setRight] = useState<string | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const [reviewTerm, setReviewTerm] = useState(0);

  const stage = sinquiStages[stageIndex];
  const term = stage.terms[round];
  const options = useMemo(() => choicesFor(stage.terms, round), [stage, round]);

  const openStage = (index: number) => {
    setStageIndex(index);
    setRound(0);
    setWrong(null);
    setRight(null);
    setMode('play');
  };

  const choose = (id: string) => {
    if (right) return;
    if (id !== term.id) {
      setWrong(id);
      window.setTimeout(() => setWrong(null), 650);
      return;
    }

    setRight(id);
    window.setTimeout(() => {
      if (round === stage.terms.length - 1) {
        setCompleted((value) => value.includes(stage.id) ? value : [...value, stage.id]);
        setReviewTerm(0);
        setMode('review');
      } else {
        setRound((value) => value + 1);
        setWrong(null);
        setRight(null);
      }
    }, 800);
  };

  if (mode === 'map') {
    const allDone = completed.length === sinquiStages.length;
    return (
      <section className="visual-only-page">
        <div className="sinqui-map-hero" aria-hidden>
          <span>🤟</span><span>＋</span><span>⚗️</span><span>＝</span><span>{allDone ? '🏆' : '🎯'}</span>
        </div>

        <div className="sinqui-stage-grid">
          {sinquiStages.map((item, index) => (
            <button key={item.id} type="button" className={`sinqui-stage-card ${completed.includes(item.id) ? 'done' : ''}`} onClick={() => openStage(index)} aria-label={`Fase ${item.id}`}>
              <span className="sinqui-stage-number">{item.id}</span>
              <span className="sinqui-stage-icon" aria-hidden>{item.icon}</span>
              <span className="sinqui-stage-count" aria-hidden>{item.terms.length}</span>
              <span className="sinqui-stage-dots" aria-hidden>
                {item.terms.map((_, i) => <i key={i}/>)}
              </span>
              {completed.includes(item.id) && <span className="sinqui-stage-check" aria-hidden>✓</span>}
            </button>
          ))}
        </div>

        <div className="sinqui-total" aria-hidden>
          <span>🤟</span><strong>42</strong><span>⚗️</span>
        </div>
      </section>
    );
  }

  if (mode === 'review') {
    const current = stage.terms[reviewTerm];
    return (
      <section className="visual-only-page">
        <div className="sinqui-review">
          <div className="sinqui-review-top" aria-hidden>
            <span>✅</span><span>{stage.icon}</span><span>{reviewTerm + 1}/{stage.terms.length}</span>
          </div>

          <div className="sinqui-review-pair">
            <div className="sinqui-review-video">
              <VerifiedLibrasVideo source={{kind:'youtube', id:current.videoId}} ariaLabel="Sinal em Libras" />
            </div>
            <div className="sinqui-review-visual">
              <Visual id={current.visual} />
            </div>
          </div>

          <div className="sinqui-review-controls">
            <button type="button" onClick={() => setReviewTerm((v) => (v - 1 + stage.terms.length) % stage.terms.length)} aria-label="Anterior">←</button>
            <button type="button" onClick={() => setMode('map')} aria-label="Mapa">⌂</button>
            <button type="button" onClick={() => setReviewTerm((v) => (v + 1) % stage.terms.length)} aria-label="Próximo">→</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="visual-only-page">
      <div className="sinqui-play-header" aria-hidden>
        <button type="button" onClick={() => setMode('map')} aria-label="Mapa">⌂</button>
        <div className="sinqui-progress">
          {stage.terms.map((_, index) => <i key={index} className={index < round ? 'done' : index === round ? 'active' : ''}/>)}
        </div>
        <span>{round + 1}/{stage.terms.length}</span>
      </div>

      <div className="choice-game">
        <div className="choice-sign-stage">
          <VerifiedLibrasVideo source={{ kind:'youtube', id:term.videoId }} ariaLabel="Sinal em Libras" />
        </div>

        <div className="choice-down-arrow" aria-hidden>↓</div>

        <div className="choice-grid">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`choice-option ${wrong === option.id ? 'wrong' : ''} ${right === option.id ? 'correct' : ''}`}
              onClick={() => choose(option.id)}
              disabled={Boolean(right)}
              aria-label="Opção visual"
            >
              <Visual id={option.visual} />
              {(wrong === option.id || right === option.id) && (
                <span className="choice-feedback" aria-hidden>{right === option.id ? '✓' : '✕'}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
