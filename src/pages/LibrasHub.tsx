import { Link } from 'react-router-dom';
import { VerifiedLibrasVideo } from '../components/VerifiedLibrasVideo';

const ATOM_SIGN = { kind: 'drive' as const, id: '1dr0kmFi0ukBUnirW8imVSo7RMPkJMmXs' };

export function LibrasHub() {
  return (
    <section className="visual-only-page">
      <div className="visual-only-symbols" aria-hidden>
        <span>🤟</span><span>⚗️</span><span>🎯</span>
      </div>

      <div className="visual-only-card">
        <VerifiedLibrasVideo source={ATOM_SIGN} ariaLabel="Sinal em Libras" />
        <div className="visual-only-card-footer" aria-hidden>
          <span>🤟</span><span style={{ marginInline: 10 }}>↓</span><span>👆</span>
        </div>
      </div>

      <Link to="/libras/desafio-visual" className="visual-only-card visual-only-card-link" aria-label="Desafio visual">
        <div className="visual-only-example" aria-hidden>
          <div className="sequence">
            <span>⚛️</span>
            <span style={{ opacity: .45 }}>H₂O</span>
            <span style={{ opacity: .45 }}>Fe</span>
          </div>
        </div>
        <div className="visual-only-card-footer" aria-hidden>
          <span>👆</span><span style={{ marginInline: 10 }}>→</span><span>✅</span><span style={{ marginInline: 10 }}>→</span><span>▶</span>
        </div>
      </Link>
    </section>
  );
}
