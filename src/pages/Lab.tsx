import { useMemo, useState } from 'react';
import { ExpressionChoice } from '../components/ExpressionChoice';
import { MascotGuide, type MascotState } from '../components/MascotGuide';
import { MediaPanel } from '../components/MediaPanel';

const steps = [
  'Separe vinagre, bicarbonato, balão, frasco e balança.',
  'Meça a massa do sistema antes do experimento.',
  'Misture os reagentes sem perder o gás.',
  'Observe o balão inflando e compare a massa final.',
];

export function Lab() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [checked, setChecked] = useState<number[]>([]);

  const diff = a && b ? (Number(b) - Number(a)).toFixed(2) : null;
  const completion = useMemo(() => Math.round((checked.length / steps.length) * 100), [checked]);

  const mascotState: MascotState = completion === 100 ? 'celebrate' : checked.length > 0 ? 'teach' : 'safety';
  const mascotMessage = completion === 100
    ? 'Excelente! Você concluiu todas as etapas. Agora compare as massas e explique o que aconteceu com o gás.'
    : checked.length > 0
      ? `Muito bem. Você concluiu ${checked.length} de ${steps.length} etapas. Próxima orientação: ${steps[Math.min(checked.length, steps.length - 1)]}`
      : 'Antes de começar, confira os materiais e siga as orientações de segurança.';

  const toggleStep = (index: number) => {
    setChecked((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  };

  return (
    <section className="page">
      <MascotGuide
        title="Experimento guiado"
        intro="Eu vou acompanhar cada etapa do experimento e reagir ao seu progresso."
        supportText="A mascote muda a gesticulação conforme o estudante avança e destaca segurança, próxima etapa e conclusão."
        steps={['Confira os materiais.', 'Observe a segurança.', 'Meça antes e depois.', 'Explique o resultado.']}
        actions={['Materiais', 'Segurança', 'Medição', 'Conclusão']}
        state={mascotState}
        message={mascotMessage}
      />

      <div className="two-column">
        <MediaPanel title="Animação do experimento" variant="experiment" alt="Experimento com bicarbonato e vinagre" />
        <div className="summary-card">
          <h2>Checklist do experimento</h2>
          <p>Etapas concluídas: <strong>{checked.length}</strong> / {steps.length}</p>
          <p>Progresso: <strong>{completion}%</strong></p>
          <div className="progress-bar"><span style={{ width: `${completion}%` }} /></div>
        </div>
      </div>

      <div className="safety">🟢 Segurança: experimento de baixo risco, com supervisão adequada. Não use recipiente rígido totalmente fechado.</div>

      <div className="checklist-box">
        {steps.map((step, index) => (
          <label key={step} className="check-item">
            <input type="checkbox" checked={checked.includes(index)} onChange={() => toggleStep(index)} />
            <span>{step}</span>
          </label>
        ))}
      </div>

      <div className="form-row">
        <label>Massa inicial (g)<input inputMode="decimal" value={a} onChange={(e) => setA(e.target.value)} /></label>
        <label>Massa final (g)<input inputMode="decimal" value={b} onChange={(e) => setB(e.target.value)} /></label>
      </div>

      {diff && <div className="result">Diferença observada: <strong>{diff} g</strong></div>}
      <div className="equation">NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂</div>

      <div className="principles">
        <article><h2>👀 Macroscópico</h2><p>Bolhas e balão inflando mostram formação de gás.</p></article>
        <article><h2>⚛️ Microscópico</h2><p>As partículas se reorganizam para formar novas substâncias.</p></article>
        <article><h2>∑ Simbólico</h2><p>A equação química representa a transformação.</p></article>
      </div>

      <ExpressionChoice title="Explique em Libras ou por outro modo: o que aconteceu com o gás e com a massa do sistema?" />
    </section>
  );
}