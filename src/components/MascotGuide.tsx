import { mascotData } from '../assets/mascot';
import { useMemo, useState } from 'react';

type MascotGuideProps = {
  title: string;
  intro: string;
  supportText?: string;
  cue?: string;
  steps?: string[];
  actions?: string[];
  image?: string;
  compact?: boolean;
};

export function MascotGuide({
  title,
  intro,
  supportText,
  cue = 'Avatar guia em Libras • substitua depois pelo vídeo real',
  steps = [],
  actions = ['Repetir sinal', 'Próximo passo'],
  image = mascotData,
  compact = false,
}: MascotGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const active = useMemo(() => steps[currentStep] ?? intro, [steps, currentStep, intro]);

  return (
    <section className={compact ? 'mascot-guide compact' : 'mascot-guide'}>
      <div className="mascot-visual">
        <div className="mascot-stage">
          <img src={image} alt="Mascote guia do ReAção Visual" className="mascot-image" />
          <span className="stage-badge">🤟 LIBRAS PRIMEIRO</span>
        </div>
      </div>

      <div className="mascot-content">
        <p className="guide-label">CENTRAL DE COMUNICAÇÃO</p>
        <h2>{title}</h2>
        <p className="guide-cue">{cue}</p>

        <div className="gesture-card">
          <div>
            <span className="gesture-chip">Gesticulação / intenção atual</span>
            <strong>{active}</strong>
          </div>
          <div className="gesture-controls">
            {steps.length > 1 && (
              <>
                <button
                  type="button"
                  className="control-button"
                  onClick={() => setCurrentStep((s: number) => (s === 0 ? steps.length - 1 : s - 1))}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  className="control-button"
                  onClick={() => setCurrentStep((s: number) => (s + 1) % steps.length)}
                >
                  Próximo
                </button>
              </>
            )}
          </div>
        </div>

        {actions.length > 0 && (
          <div className="guide-actions" aria-label="Ações guiadas em Libras">
            {actions.map((action) => (
              <span key={action} className="guide-action-pill">{action}</span>
            ))}
          </div>
        )}

        <details className="support-copy">
          <summary>Português escrito de apoio</summary>
          <p>{supportText ?? intro}</p>
        </details>
      </div>
    </section>
  );
}