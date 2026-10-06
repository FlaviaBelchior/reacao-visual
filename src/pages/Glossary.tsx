import { mascotData } from '../assets/mascot';
import { useEffect, useMemo, useState } from 'react';
import { loadGlossary, type GlossaryTerm } from '../lib/content';
import { MascotGuide } from '../components/MascotGuide';

export function Glossary() {
  const [q, setQ] = useState('');
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);

  useEffect(() => {
    loadGlossary().then(setTerms).catch(() => setTerms([]));
  }, []);

  const list = useMemo(
    () => terms.filter((t) => t.term.toLowerCase().includes(q.toLowerCase())),
    [q, terms],
  );

  return (
    <section className="page">
      <MascotGuide
        title="Glossário em Libras"
        intro="Neste glossário, o conceito deve aparecer em Libras como forma principal de comunicação."
        supportText="Os vídeos reais em Libras poderão substituir o avatar e ficar salvos termo por termo."
        steps={['Escolha um termo.', 'Veja a área principal de Libras.', 'Use o texto escrito apenas como apoio.']}
        actions={['Pesquisar termo', 'Abrir explicação', 'Comparar exemplo']}
        compact
      />

      <input
        className="search"
        aria-label="Pesquisar no glossário"
        placeholder="Pesquisar termo científico"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="glossary-list">
        {list.map((t) => (
          <article className="glossary-card enhanced" key={t.term}>
            <div className="glossary-libras-area">
              <img src={mascotData} alt="Mascote em Libras" className="mini-mascot" />
              <div>
                <span className="guide-action-pill">🤟 Libras principal</span>
                <h3>{t.term}</h3>
                <p>{t.librasStatus === 'validated' ? 'Vídeo validado disponível' : 'Substituir pela gravação real em Libras'}</p>
              </div>
            </div>
            <div>
              <span className="glossary-label">PORTUGUÊS DE APOIO</span>
              <p>{t.definition}</p>
              {t.example && <p><strong>Exemplo:</strong> {t.example}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}