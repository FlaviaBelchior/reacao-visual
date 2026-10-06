import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MascotGuide } from '../components/MascotGuide';
import { modules as localModules } from '../data/modules';
import { loadModules, type ModuleCard } from '../lib/content';
import { track } from '../lib/analytics';

export function Home() {
  const [modules, setModules] = useState<ModuleCard[]>(localModules);

  useEffect(() => {
    loadModules().then(setModules).catch(() => setModules(localModules));
  }, []);

  return (
    <section className="page">
      <div className="priority-banner">
        <strong>🤟 Libras é a linguagem central da plataforma.</strong>
        <span>O português escrito serve como apoio de leitura e registro.</span>
      </div>

      <MascotGuide
        title="A mascote ensina cada etapa do projeto"
        intro="Olá! Eu vou guiar você em Libras. Primeiro observamos, depois investigamos e por fim explicamos o que aprendemos."
        supportText="Nesta tela inicial, a mascote apresenta o propósito da plataforma e mostra os caminhos principais: central em Libras, jogos, laboratório, glossário e missões."
        steps={[
          'Olá! Vamos começar pela Libras.',
          'Escolha uma trilha: jogos, laboratório ou glossário.',
          'Observe, jogue, experimente e depois responda.',
        ]}
        actions={['Começar', 'Abrir jogo', 'Ver glossário', 'Ir ao laboratório']}
        state="welcome"
        message="Olá! Eu vou acompanhar você durante toda a experiência. Escolha uma atividade para começarmos."
      />

      <section className="hero-box professional-hero">
        <div className="hero-main">
          <p className="eyebrow">Produto educacional bilíngue para estudantes surdos</p>
          <h1>Química ensinada por Libras, visualidade e interação.</h1>
          <p className="hero-copy">
            O foco do ReAção Visual é ensinar reações químicas por meio de Libras. A mascote conduz as explicações, apresenta jogos, acompanha os experimentos e orienta a resposta do estudante.
          </p>
          <div className="learning-flow" aria-label="Ciclo de aprendizagem">
            <span>🤟 Libras primeiro</span>
            <span>👀 Observe</span>
            <span>🧪 Investigue</span>
            <span>🧩 Jogue</span>
            <span>💬 Explique</span>
          </div>
          <div className="cta-row">
            <Link to="/libras" className="primary-link">Entrar na Central em Libras</Link>
            <Link to="/detetive" className="secondary-link">Abrir primeiro jogo</Link>
          </div>

          <div className="project-metrics" aria-label="Destaques do projeto">
            <div><strong>100%</strong><span>experiência sem áudio obrigatório</span></div>
            <div><strong>3</strong><span>formas de resposta do estudante</span></div>
            <div><strong>6+</strong><span>trilhas interativas de Química</span></div>
          </div>
        </div>
        <div className="hero-card-grid professional-cards">
          <article>
            <strong>Avatar-guia</strong>
            <p>Ensina cada tela e depois pode ser substituído por vídeo real em Libras.</p>
          </article>
          <article>
            <strong>Jogos interativos</strong>
            <p>Classificar, descobrir pistas, equilibrar e responder visualmente.</p>
          </article>
          <article>
            <strong>Experimento guiado</strong>
            <p>Segurança, observação e relação entre evidência, partículas e equação.</p>
          </article>
        </div>
      </section>

      <section>
        <h2>Escolha como aprender</h2>
        <div className="module-grid">
          {modules.map((m) => (
            <Link
              className="module-card"
              key={m.to}
              to={m.to}
              onClick={() => track('module_started', { module_path: m.to, module_title: m.title })}
            >
              <span className="module-icon" aria-hidden>{m.icon}</span>
              <div>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}