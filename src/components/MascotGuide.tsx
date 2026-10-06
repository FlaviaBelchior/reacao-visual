import { useEffect, useMemo, useState } from 'react';

export type MascotState =
  | 'welcome'
  | 'teach'
  | 'ask'
  | 'wait'
  | 'success'
  | 'retry'
  | 'celebrate'
  | 'safety';

type MascotGuideProps = {
  title: string;
  intro: string;
  supportText?: string;
  cue?: string;
  steps?: string[];
  actions?: string[];
  compact?: boolean;
  state?: MascotState;
  message?: string;
};

const stateLabels: Record<MascotState, string> = {
  welcome: 'Saudação',
  teach: 'Explicação',
  ask: 'Pergunta',
  wait: 'Aguardando resposta',
  success: 'Resposta correta',
  retry: 'Nova tentativa',
  celebrate: 'Comemoração',
  safety: 'Orientação de segurança',
};

function AnimatedMascot({ state, playing, replayKey }: { state: MascotState; playing: boolean; replayKey: number }) {
  return (
    <div className={`animated-mascot avatar-state-${state} ${playing ? 'is-playing' : 'is-paused'}`} key={replayKey}>
      <svg viewBox="0 0 360 410" className="mascot-svg" role="img" aria-label={`Mascote em estado de ${stateLabels[state]}`}>
        <ellipse cx="180" cy="386" rx="82" ry="16" fill="rgba(15,23,42,.12)" />

        <g className="arm arm-left">
          <path d="M128 205 C102 220 86 246 78 286" fill="none" stroke="#f2b89f" strokeWidth="28" strokeLinecap="round" />
          <circle className="hand" cx="76" cy="292" r="18" fill="#f2b89f" />
          <path d="M64 292 l-9 -16 M72 286 l-3 -19 M80 286 l4 -18 M88 291 l10 -14" stroke="#d69276" strokeWidth="4" strokeLinecap="round" />
        </g>

        <g className="arm arm-right">
          <path d="M232 205 C258 220 274 246 282 286" fill="none" stroke="#f2b89f" strokeWidth="28" strokeLinecap="round" />
          <circle className="hand" cx="284" cy="292" r="18" fill="#f2b89f" />
          <path d="M272 292 l-9 -16 M280 286 l-3 -19 M288 286 l4 -18 M296 291 l10 -14" stroke="#d69276" strokeWidth="4" strokeLinecap="round" />
        </g>

        <g className="body-group">
          <path d="M128 188 Q180 164 232 188 L248 334 Q180 360 112 334 Z" fill="#ffffff" stroke="#dbe4f0" strokeWidth="3" />
          <path d="M151 202 L180 250 L209 202" fill="#2563eb" opacity=".92" />
          <path d="M176 244 h8 v84 h-8z" fill="#7c3aed" opacity=".22" />
          <circle cx="180" cy="274" r="18" fill="#eef2ff" />
          <path d="M168 274 h24 M180 262 v24" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
        </g>

        <g className="head-group">
          <path d="M119 113 Q128 51 180 44 Q234 52 243 113 Q231 80 213 70 Q180 49 147 70 Q128 82 119 113" fill="#3b2419" />
          <circle cx="180" cy="124" r="66" fill="#f3bea6" />
          <path d="M116 122 Q115 64 156 50 Q128 76 137 111" fill="#3b2419" />
          <path d="M244 122 Q244 64 204 50 Q232 76 223 111" fill="#3b2419" />
          <g className="glasses">
            <circle cx="155" cy="121" r="20" fill="none" stroke="#7c3aed" strokeWidth="6" />
            <circle cx="205" cy="121" r="20" fill="none" stroke="#7c3aed" strokeWidth="6" />
            <path d="M175 121 h10" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" />
          </g>
          <circle cx="156" cy="122" r="4.8" fill="#1f2937" />
          <circle cx="204" cy="122" r="4.8" fill="#1f2937" />
          <path className="mascot-mouth" d="M159 151 Q180 169 201 151" fill="none" stroke="#9f4d4d" strokeWidth="5" strokeLinecap="round" />
          <circle className="cheek cheek-left" cx="139" cy="147" r="7" fill="#f59e9e" opacity=".45" />
          <circle className="cheek cheek-right" cx="221" cy="147" r="7" fill="#f59e9e" opacity=".45" />
        </g>

        <g className="gesture-trails">
          <path className="trail trail-left" d="M55 255 Q26 230 52 202" fill="none" stroke="#a78bfa" strokeWidth="5" strokeLinecap="round" opacity=".7" />
          <path className="trail trail-right" d="M305 255 Q334 230 308 202" fill="none" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" opacity=".7" />
        </g>
      </svg>
      <span className="state-pill">{stateLabels[state]}</span>
    </div>
  );
}

export function MascotGuide({
  title,
  intro,
  supportText,
  cue = 'Gesticulação provisória do avatar • substitua depois pelo vídeo real de Libras validada',
  steps = [],
  actions = ['Repetir gesto', 'Próximo passo'],
  compact = false,
  state = 'teach',
  message,
}: MascotGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [replayKey, setReplayKey] = useState(0);

  const active = useMemo(() => message ?? steps[currentStep] ?? intro, [message, steps, currentStep, intro]);

  useEffect(() => {
    setPlaying(true);
    setReplayKey((value) => value + 1);
  }, [state, message]);

  const repeatGesture = () => {
    setPlaying(true);
    setReplayKey((value) => value + 1);
  };

  const nextStep = () => {
    if (!steps.length) return;
    setCurrentStep((value) => (value + 1) % steps.length);
    setPlaying(true);
    setReplayKey((value) => value + 1);
  };

  return (
    <section className={compact ? 'mascot-guide compact interactive-guide' : 'mascot-guide interactive-guide'}>
      <div className="mascot-visual">
        <div className="mascot-stage interactive-stage">
          <AnimatedMascot state={state} playing={playing} replayKey={replayKey} />
          <span className="stage-badge">🤟 MASCOTE INTERATIVA</span>
          <div className="speech-bubble" aria-live="polite">
            <span className="speech-label">Mensagem da mascote</span>
            <strong>{active}</strong>
          </div>
        </div>
      </div>

      <div className="mascot-content">
        <p className="guide-label">GUIA VISUAL INTERATIVA</p>
        <h2>{title}</h2>
        <p className="guide-cue">{cue}</p>

        <div className="gesture-card interactive-controls-card">
          <div>
            <span className="gesture-chip">Estado atual: {stateLabels[state]}</span>
            <strong>{active}</strong>
          </div>
          <div className="gesture-controls">
            <button type="button" className="control-button" onClick={repeatGesture}>↻ Repetir gesto</button>
            <button type="button" className="control-button" onClick={() => setPlaying((value) => !value)}>
              {playing ? 'Ⅱ Pausar' : '▶ Retomar'}
            </button>
            {steps.length > 1 && <button type="button" className="control-button primary-control" onClick={nextStep}>Próximo →</button>}
          </div>
        </div>

        {actions.length > 0 && (
          <div className="guide-actions" aria-label="Ações guiadas">
            {actions.map((action) => <span key={action} className="guide-action-pill">{action}</span>)}
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