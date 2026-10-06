import { useMemo, useState } from 'react';
import { ExpressionChoice } from '../components/ExpressionChoice';
import { MascotGuide } from '../components/MascotGuide';
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

  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  const result = useMemo(() => {
    const right = clues.filter((c) => c.type === 'evidence').map((c) => c.id);
    const rightHits = selected.filter((item) => right.includes(item)).length;
    const wrongHits = selected.filter((item) => !right.includes(item)).length;
    return { rightHits, wrongHits, complete: rightHits === right.length && wrongHits === 0 };
  }, [selected]);

  return (
    <section className="page">
      <MascotGuide
        title="Jogo: Detetive das Reações"
        intro="Escolha apenas as pistas que podem indicar reação química. Lembre: uma pista sozinha não prova nada, mas ajuda a investigar."
        supportText="O objetivo é selecionar evidências possíveis e descartar elementos que não bastam para afirmar que houve reação química."
        steps={['Observe as pistas.', 'Marque somente o que pode indicar reação.', 'Explique por que escolheu essas pistas.']}
        actions={['Encontrar pistas', 'Selecionar', 'Explicar']}
      />

      <div className="two-column">
        <MediaPanel title="Pistas visuais" variant="evidence" alt="Animação de evidências de reação" />
        <div className="summary-card">
          <h2>Missão atual</h2>
          <p>Selecione as pistas químicas.</p>
          <p>Acertos parciais: <strong>{result.rightHits}</strong></p>
          <p>Seleções inadequadas: <strong>{result.wrongHits}</strong></p>
          {result.complete && <p className="success">✅ Excelente! Você marcou apenas pistas que podem indicar reação.</p>}
        </div>
      </div>

      <div className="detective-grid">
        {clues.map((clue) => {
          const active = selected.includes(clue.id);
          return (
            <button type="button" key={clue.id} className={active ? 'detective-card active' : 'detective-card'} onClick={() => toggle(clue.id)}>
              <span className="module-icon">{clue.icon}</span>
              <div>
                <h3>{clue.title}</h3>
                <p>{active ? 'Selecionado para investigação.' : 'Clique para marcar esta pista.'}</p>
              </div>
            </button>
          );
        })}
      </div>

      <ExpressionChoice title="Explique: por que uma pista não basta sozinha para provar uma reação química?" />
    </section>
  );
}