import { useMemo, useState } from 'react';
import { ExpressionChoice } from '../components/ExpressionChoice';
import { MascotGuide } from '../components/MascotGuide';
import { MediaPanel } from '../components/MediaPanel';

const cases = [
  ['🧊', 'Gelo derretendo', 'mudança física'],
  ['🔥', 'Madeira queimando', 'reação química'],
  ['🍎', 'Maçã escurecendo', 'reação química'],
  ['✂️', 'Papel cortado', 'mudança física'],
  ['🥖', 'Pão crescendo', 'reação química'],
  ['💊', 'Comprimido efervescente', 'reação química'],
] as const;

export function Explore() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const totalDone = Object.keys(answers).length;
  const score = useMemo(
    () => cases.reduce((acc, current, index) => acc + (answers[index] === current[2] ? 1 : 0), 0),
    [answers],
  );

  return (
    <section className="page">
      <MascotGuide
        title="Jogo: o que é uma reação química?"
        intro="Observe cada situação, pense na transformação e escolha sua hipótese. Depois eu mostro a referência científica."
        supportText="Este jogo apresenta situações do cotidiano. O estudante compara fenômenos e decide se houve mudança física ou reação química."
        steps={[
          'Observe a imagem ou a situação.',
          'Escolha: mudança física ou reação química.',
          'Confira a referência e explique sua decisão.',
        ]}
        actions={['Observar', 'Escolher', 'Conferir feedback']}
      />

      <div className="two-column">
        <MediaPanel title="Animação de apoio" variant="reaction" alt="Animação sobre reação química" />
        <div className="summary-card">
          <h2>Seu avanço</h2>
          <p>Itens respondidos: <strong>{totalDone}</strong> / {cases.length}</p>
          <p>Acertos até agora: <strong>{score}</strong></p>
          <p>A ideia principal do jogo é comparar, investigar e justificar — não apenas acertar.</p>
        </div>
      </div>

      <div className="case-list">
        {cases.map((item, index) => (
          <article className="case-card" key={item[1]}>
            <div className="case-title">
              <span>{item[0]}</span>
              <h2>{item[1]}</h2>
            </div>
            <div className="choice-row">
              {['mudança física', 'reação química', 'quero investigar mais'].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={answers[index] === option ? 'choice active' : 'choice'}
                  onClick={() => setAnswers({ ...answers, [index]: option })}
                >
                  {option}
                </button>
              ))}
            </div>
            {answers[index] && (
              <p className="feedback">
                Você escolheu: <strong>{answers[index]}</strong>. Referência científica: <strong>{item[2]}</strong>.
              </p>
            )}
          </article>
        ))}
      </div>

      <ExpressionChoice title="Agora explique em Libras, texto ou desenho: como você reconhece uma reação química?" />
    </section>
  );
}