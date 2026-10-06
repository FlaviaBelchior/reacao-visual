import { useState } from 'react';

type ExpressionChoiceProps = {
  title: string;
};

export function ExpressionChoice({ title }: ExpressionChoiceProps) {
  const [mode, setMode] = useState<'libras' | 'texto' | 'visual' | ''>('');

  return (
    <section className="expression-box">
      <p className="guide-label">FORMA DE RESPOSTA</p>
      <h3>{title}</h3>
      <div className="expression-grid">
        <button type="button" className={mode === 'libras' ? 'expression-card active' : 'expression-card'} onClick={() => setMode('libras')}>
          <span>🤟</span>
          <strong>Responder em Libras</strong>
          <small>Gravação ou apresentação sinalizada</small>
        </button>
        <button type="button" className={mode === 'texto' ? 'expression-card active' : 'expression-card'} onClick={() => setMode('texto')}>
          <span>✍️</span>
          <strong>Responder por texto</strong>
          <small>Português escrito de apoio</small>
        </button>
        <button type="button" className={mode === 'visual' ? 'expression-card active' : 'expression-card'} onClick={() => setMode('visual')}>
          <span>🧩</span>
          <strong>Responder visualmente</strong>
          <small>Desenho, esquema ou organização</small>
        </button>
      </div>

      {mode === 'libras' && (
        <div className="expression-result placeholder">
          <strong>Área preparada para resposta em Libras.</strong>
          <p>Quando você tiver o vídeo real, esta área pode receber webcam, upload ou player.</p>
        </div>
      )}

      {mode === 'texto' && (
        <div className="expression-result">
          <textarea placeholder="Escreva sua resposta aqui…" aria-label="Responder por texto" />
        </div>
      )}

      {mode === 'visual' && (
        <div className="expression-result placeholder">
          <strong>Área preparada para resposta visual.</strong>
          <p>Use este espaço para desenho, arraste de partículas, mapa visual ou imagem.</p>
        </div>
      )}
    </section>
  );
}