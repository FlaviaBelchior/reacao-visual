import { Link } from 'react-router-dom';
import { VerifiedLibrasVideo } from '../components/VerifiedLibrasVideo';

const BASE_SIGN = { kind: 'youtube' as const, id: 'Vb9eRbjJAZ4' };

export function Home() {
  return (
    <section className="visual-only-page">
      <div className="visual-only-hero">
        <div className="visual-only-symbols" aria-hidden>
          <span>🤟</span><span>＋</span><span>⚗️</span><span>＝</span><span>🧠</span>
        </div>

        <div className="visual-only-card">
          <VerifiedLibrasVideo source={BASE_SIGN} ariaLabel="Sinal de Química em Libras" />
          <div className="visual-only-card-footer" aria-hidden>🤟</div>
        </div>

        <div className="visual-only-flow" aria-hidden>
          <span>👀</span><span>→</span><span>🤟</span><span>→</span><span>🧪</span><span>→</span><span>🎯</span>
        </div>

        <Link to="/libras" className="visual-only-start" aria-label="Continuar" style={{ display: 'grid', placeItems: 'center' }}>
          ▶
        </Link>
      </div>
    </section>
  );
}
