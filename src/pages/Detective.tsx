import { useMemo, useState } from 'react';
import { ExpressionChoice } from '../components/ExpressionChoice';
import { MascotGuide, type MascotState } from '../components/MascotGuide';
import { MediaPanel } from '../components/MediaPanel';

const clues = [
  { id: 'gas', icon: '🫧', title: 'Formação de bolhas', type: 'evidence' },
  { id: 'color', icon: '🎨', title: 'Mudança de cor', type: 'evidence' },
  { id: 'precipitate', icon: '⬇️', title: 'Formação de precipitado', type: 'evidence' },
  { id: 'energy', icon: '🌡️', title: 'Variação de energia', type: 'evidence' },
  { id: 'cut', icon: '✂️', title: 'Objeto cortado', type: 'not' },
  { id: 'shape', icon: '📦', title: 'Mudança de forma', type: 'not' },
] as const;

export function Detective() {
  const [selected, setSelected] = useState<string[]>([]);
  const [mascot, setMascot] = useState<{ state: MascotState; message: string }>({
    state: 'ask',
    message: 'Encontre uma pista que possa indicar reação química.',
  });

  const result = useMemo(() => {
    const right = new Set<string>(clues.filter((c) => c.type === 'evidence').map((c) => c.id));
    const rightHits = selected.filter((item) => right.has(item)).length;
    const wrongHits = selected.filter((item) => !right.has(item)).length;
    return { rightHits, wrongHits, complete: rightHits === right.size && wrongHits === 0 };
  }, [selected]);

  const toggle = (id: string) => {
    const clue = clues.find((item) => item.id === id)!;
    setSelected((current) => {
      const removing = current.includes(id);
      const next = removing ? current.filter((item) => item !== id) : [...current, id];
      const right = new Set<string>(clues.filter((c) => c.type === 'evidence').map((c) => c.id));
      const rightHits = next.filter((item) => right.has(item)).length;
      const wrongHits = next.filter((item) => !right.has(item)).length;
      const complete = rightHits === right.size && wrongHits === 0;

      if (complete) {
        setMascot({ state: 'celebrate', message: 'Excelente! Você encontrou todas as pistas químicas sem selecionar pistas inadequadas.' });
      } else if (removing) {
        setMascot({ state: 'wait', message: 'Tudo bem. Continue observando e ajuste suas escolhas.' });
      } else if (clue.type === 'evidence') {
        setMascot({ state: 'success', message: `Boa pista: ${clue.title}. Agora procure outra evidência possível.` });
      } else {
        setMascot({ state: 'retry', message: `${clue.title} não basta para indicar reação química. Observe as outras opções.` });
      }
      return next;
    });
  };

  return (
    <section className="page">
      <MascotGuide
        title="Jogo: Detetive das Reações"
        intro="Escolha apenas as pistas que podem indicar reação química."
        supportText="A mascote responde imediatamente às escolhas: confirma pistas adequadas, orienta quando a pista não é suficiente e comemora a missão concluída."
        steps={['Observe as pistas.', 'Marque o que pode indicar reação.', 'Corrija se necessário.', 'Explique sua investigação.']}
        actions={['Encontrar pistas', 'Selecionar', 'Receber feedback']}
        state={mascot.state}
        message={mascot.message}
      />

      <div className="two-column">
        <MediaPanel title="Pistas visuais" variant="evidence" alt="Animação de evidências de reação" />
        <div className="summary-card">
          <h2>Missão atual</h2>
          <p>Acertos parciais: <strong>{result.rightHits}</strong></p>
          <p>Seleções inadequadas: <strong>{result.wrongHits}</strong></p>
          {result.complete && <p className="success">✅ Missão concluída!</p>}
        </div>
      </div>

      <div className="detective-grid">
        {clues.map((clue) => {
          const active = selected.includes(clue.id);
          return (
            <button type="button" key={clue.id} className={active ? 'detective-card active' : 'detective-card'} onClick={() => toggle(clue.id)}>
              <span className="module-icon">{clue.icon}</span>
              <div><h3>{clue.title}</h3><p>{active ? 'Selecionado para investigação.' : 'Clique para marcar esta pista.'}</p></div>
            </button>
          );
        })}
      </div>

      <ExpressionChoice title="Explique: por que uma pista não basta sozinha para provar uma reação química?" />
    </section>
  );
}