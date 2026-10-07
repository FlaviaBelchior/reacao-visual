import { Link } from 'react-router-dom';
import { VerifiedLibrasVideo } from '../components/VerifiedLibrasVideo';

const BASE_SIGN = { kind: 'youtube' as const, id: 'Vb9eRbjJAZ4' };

export function LibrasHub() {
  return (
    <section className="visual-only-page">
      <div className="visual-only-symbols" aria-hidden>
        <span>🤟</span><span>🧪</span><span>pH</span>
      </div>

      <div className="visual-only-grid">
        <div className="visual-only-card">
          <VerifiedLibrasVideo source={BASE_SIGN} ariaLabel="Sinal de base em Libras" />
          <div className="visual-only-card-footer" aria-hidden>
            <span>pH</span><span style={{ marginInline: 8 }}>›</span><span>7</span>
          </div>
        </div>

        <Link to="/libras/jogo-ph" className="visual-only-card visual-only-card-link" aria-label="Jogo">
          <div className="visual-only-example" aria-hidden>
            <div className="sequence">
              <span>👀</span><span className="arrow">→</span><span>pH</span><span className="arrow">→</span><span>🤟</span>
            </div>
          </div>
          <div className="visual-only-card-footer" aria-hidden>🎯 ▶</div>
        </Link>
      </div>
    </section>
  );
}
