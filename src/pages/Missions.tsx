import { useState } from 'react';
import { ExpressionChoice } from '../components/ExpressionChoice';
import { MascotGuide } from '../components/MascotGuide';

const items = [
  { prompt: 'Por que o ferro enferruja?', answer: 'O ferro reage com o oxigênio e a umidade.' },
  { prompt: 'Por que o bolo cresce?', answer: 'O fermento libera gás, que faz a massa expandir.' },
  { prompt: 'Como funciona um comprimido efervescente?', answer: 'Os reagentes formam gás carbônico ao entrar em contato com a água.' },
  { prompt: 'De onde vem o CO₂ no experimento?', answer: 'Ele é um dos produtos da reação entre bicarbonato e vinagre.' },
  { prompt: 'Por que alimentos mudam no cozimento?', answer: 'Calor pode favorecer transformações químicas em seus componentes.' },
];

export function Missions() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="page">
      <MascotGuide
        title="Missões do cotidiano"
        intro="Agora vamos ligar a Química à vida real. Abra uma missão, pense e explique comigo."
        supportText="Cada missão parte de uma pergunta do cotidiano. O estudante observa o fenômeno e relaciona a reação química com a vida das pessoas."
        steps={['Abra uma missão.', 'Observe a situação.', 'Pense na reação química envolvida.', 'Explique com suas próprias palavras ou Libras.']}
        actions={['Escolher missão', 'Pensar', 'Explicar']}
      />

      <div className="case-list">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <article className="case-card" key={item.prompt}>
              <button type="button" className="mission-toggle" onClick={() => setOpenIndex(isOpen ? null : index)}>
                <strong>{index + 1}. {item.prompt}</strong>
                <span>{isOpen ? 'Fechar' : 'Abrir'}</span>
              </button>
              {isOpen && (
                <div className="mission-body">
                  <p><strong>Resposta-base:</strong> {item.answer}</p>
                  <p><strong>Reflexão:</strong> Para que esse conhecimento serve na vida das pessoas?</p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <ExpressionChoice title="Escolha uma missão e responda em Libras, texto ou representação visual." />
    </section>
  );
}