import { useMemo, useState } from 'react';
import { ExpressionChoice } from '../components/ExpressionChoice';
import { MascotGuide, type MascotState } from '../components/MascotGuide';
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
  const [mascot, setMascot] = useState<{ state: MascotState; message: string }>({
    state: 'ask',
    message: 'Observe a primeira situação e escolha sua hipótese.',
  });
  const totalDone = Object.keys(answers).length;
  const score = useMemo(
    () => cases.reduce((acc, current, index) => acc + (answers[index] === current[2] ? 1 : 0), 0),
    [answers],
  );

  const choose = (index: number, option: string) => {
    const item = cases[index];
    setAnswers((current) => ({ ...current, [index]: option }));

    if (option === 'quero investigar mais') {
      setMascot({ state: 'ask', message: `Boa decisão científica. O que você observaria em “${item[1]}” para investigar melhor?` });
    } else if (option === item[2]) {
      setMascot({ state: 'success', message: `Muito bem! “${item[1]}” foi classificado corretamente. Continue para a próxima situação.` });
    } else {
      setMascot({ state: 'retry', message: `Vamos observar novamente “${item[1]}”. Pense se novas substâncias foram formadas.` });
    }
  };

  return (
    <section className="page">
      <MascotGuide
        title="Jogo: o que é uma reação química?"
        intro="Observe cada situação, pense na transformação e escolha sua hipótese."
        supportText="A mascote reage à resposta: comemora acertos, orienta nova tentativa e faz perguntas quando o estudante escolhe investigar mais."
        steps={['Observe a situação.', 'Escolha sua hipótese.', 'Confira a reação da mascote.', 'Explique o motivo da sua escolha.']}
        actions={['Observar', 'Escolher', 'Receber feedback']}
        state={mascot.state}
        message={mascot.message}
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
            <div className="case-title"><span>{item[0]}</span><h2>{item[1]}</h2></div>
            <div className="choice-row">
              {['mudança física', 'reação química', 'quero investigar mais'].map((option) => (
                <button key={option} type="button" className={answers[index] === option ? 'choice active' : 'choice'} onClick={() => choose(index, option)}>
                  {option}
                </button>
              ))}
            </div>
            {answers[index] && <p className="feedback">Você escolheu: <strong>{answers[index]}</strong>. Referência científica: <strong>{item[2]}</strong>.</p>}
          </article>
        ))}
      </div>

      <ExpressionChoice title="Agora explique em Libras, texto ou desenho: como você reconhece uma reação química?" />
    </section>
  );
}