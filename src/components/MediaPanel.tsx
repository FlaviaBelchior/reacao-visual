type MediaPanelProps = {
  title: string;
  variant: 'welcome' | 'reaction' | 'evidence' | 'experiment' | 'balance';
  alt: string;
};

export function MediaPanel({ title, variant, alt }: MediaPanelProps) {
  return (
    <figure className="media-panel chemistry-media" aria-label={alt}>
      <div className={`chem-animation ${variant}`} role="img" aria-label={alt}>
        {variant === 'welcome' && (
          <>
            <div className="welcome-hand">🤟</div>
            <div className="welcome-dots"><i/><i/><i/></div>
            <div className="visual-caption">Libras → observar → investigar → explicar</div>
          </>
        )}

        {variant === 'reaction' && (
          <>
            <div className="particle group-left"><span className="h">H</span><span className="o">O</span></div>
            <div className="reaction-arrow">→</div>
            <div className="particle group-right"><span className="h">H</span><span className="o">O</span><span className="h">H</span></div>
            <div className="visual-caption">Átomos se reorganizam</div>
          </>
        )}

        {variant === 'evidence' && (
          <>
            <div className="evidence-chip c1">🫧 gás</div>
            <div className="evidence-chip c2">🎨 cor</div>
            <div className="evidence-chip c3">⬇ precipitado</div>
            <div className="evidence-chip c4">🌡 energia</div>
            <div className="visual-caption">Pistas precisam de contexto</div>
          </>
        )}

        {variant === 'experiment' && (
          <>
            <div className="flask-shape"><div className="flask-neck"/><div className="flask-liquid"/><i/><i/><i/></div>
            <div className="balloon-shape"/>
            <div className="visual-caption">CO₂ infla o balão</div>
          </>
        )}

        {variant === 'balance' && (
          <>
            <div className="balance-eq"><b>2H₂</b><span>+</span><b>O₂</b><span>→</span><b>2H₂O</b></div>
            <div className="atom-counts"><span>H: 4 = 4</span><span>O: 2 = 2</span></div>
            <div className="visual-caption">Mesma quantidade de átomos</div>
          </>
        )}
      </div>
      <figcaption>
        <strong>{title}</strong>
        <span>Animação visual de apoio para a explicação em Libras.</span>
      </figcaption>
    </figure>
  );
}