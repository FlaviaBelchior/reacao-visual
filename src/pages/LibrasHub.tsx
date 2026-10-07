import { Link } from 'react-router-dom';
import { MascotGuide } from '../components/MascotGuide';
import { MediaPanel } from '../components/MediaPanel';

const lessons = [
  { title: 'Boas-vindas', description: 'Aprenda como navegar na plataforma com Libras no centro da experiência.', variant: 'welcome' as const },
  { title: 'Reação química', description: 'Entenda que novas substâncias surgem quando os átomos se reorganizam.', variant: 'reaction' as const },
  { title: 'Evidências', description: 'Identifique bolhas, cor, precipitado e energia como pistas.', variant: 'evidence' as const },
  { title: 'Experimento guiado', description: 'Siga a investigação do gás invisível com segurança.', variant: 'experiment' as const },
  { title: 'Balanceamento', description: 'Conserve a quantidade de átomos nos dois lados da equação.', variant: 'balance' as const },
];

export function LibrasHub() {
  return (
    <section className="page">
      <MascotGuide
        title="Central em Libras"
        intro="Aqui a mascote inicia o ensino em Libras, apresenta os conceitos e guia o estudante para cada jogo e experimento."
        supportText="Esta página funciona como ponto de entrada da comunicação em Libras. Depois você pode substituir a avatarização pelos vídeos reais."
        steps={[
          'Olá! Vamos aprender Química começando pela Libras.',
          'Escolha um conceito, observe a animação e depois interaja.',
          'Se precisar, abra o português escrito apenas como apoio.',
        ]}
        actions={['Começar em Libras', 'Escolher trilha', 'Abrir jogo']}
      />

      <Link to="/libras/jogo-ph" className="hero-box" style={{ display: 'grid', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span className="module-icon" aria-hidden>🤟</span>
          <span className="module-icon" aria-hidden>🧪</span>
          <span className="module-icon" aria-hidden>🎯</span>
        </div>
        <div className="learning-flow" aria-hidden>
          <span>👀</span><span>→</span><span>pH</span><span>→</span><span>🤟</span>
        </div>
        <div className="cta-row">
          <span className="primary-link" aria-hidden>▶</span>
        </div>
      </Link>

      <div className="hub-grid">
        {lessons.map((lesson) => (
          <article key={lesson.title} className="hub-card">
            <MediaPanel title={lesson.title} variant={lesson.variant} alt={lesson.title} />
            <div>
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
              <span className="guide-action-pill">🤟 Explicação principal em Libras</span>
            </div>
          </article>
        ))}
      </div>

      <div className="warning-box">
        <strong>⚠️ Regra de qualidade do projeto</strong>
        <p>
          A mascote e a estrutura já estão prontas para receber Libras real. Até lá, esta versão usa a avatarização como guia visual e deixa claro que os vídeos oficiais em Libras deverão substituir o avatar depois.
        </p>
      </div>
    </section>
  );
}
