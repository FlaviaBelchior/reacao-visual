import { useState } from 'react';
import { ExpressionChoice } from '../components/ExpressionChoice';
import { MascotGuide } from '../components/MascotGuide';
import { MediaPanel } from '../components/MediaPanel';

export function Builder() {
  const [h2, setH2] = useState(1);
  const [o2, setO2] = useState(1);
  const [h2o, setH2o] = useState(1);

  const leftH = 2 * h2;
  const leftO = 2 * o2;
  const rightH = 2 * h2o;
  const rightO = h2o;
  const ok = leftH === rightH && leftO === rightO;

  const ctl = (value: number, setValue: (n: number) => void) => (
    <span className="counter">
      <button type="button" onClick={() => setValue(Math.max(1, value - 1))}>−</button>
      <strong>{value}</strong>
      <button type="button" onClick={() => setValue(value + 1)}>+</button>
    </span>
  );

  return (
    <section className="page">
      <MascotGuide
        title="Jogo: Equação em equilíbrio"
        intro="Ajuste os coeficientes até ficar a mesma quantidade de cada átomo nos dois lados."
        supportText="A mascote explica a ideia de conservação dos átomos. O estudante testa números até equilibrar a equação."
        steps={['Observe a equação.', 'Ajuste os coeficientes.', 'Compare os átomos dos dois lados.', 'Verifique se ficou equilibrado.']}
        actions={['Aumentar', 'Diminuir', 'Comparar']}
      />

      <div className="two-column">
        <MediaPanel title="Balanceamento visual" variant="balance" alt="Animação sobre balanceamento de equações" />
        <div className="summary-card">
          <h2>Missão</h2>
          <p>Deixe a quantidade de H e O igual nos dois lados.</p>
          {ok ? <p className="success">✅ Equação equilibrada!</p> : <p>Continue ajustando os coeficientes.</p>}
        </div>
      </div>

      <div className="equation builder">{ctl(h2, setH2)} H₂ + {ctl(o2, setO2)} O₂ → {ctl(h2o, setH2o)} H₂O</div>

      <div className="atom-table">
        <p>H: esquerda <strong>{leftH}</strong> | direita <strong>{rightH}</strong></p>
        <p>O: esquerda <strong>{leftO}</strong> | direita <strong>{rightO}</strong></p>
      </div>

      {ok && <div className="success">Agora a mesma quantidade de cada átomo aparece dos dois lados.</div>}

      <ExpressionChoice title="Mostre em Libras, texto ou desenho por que essa equação ficou equilibrada." />
    </section>
  );
}