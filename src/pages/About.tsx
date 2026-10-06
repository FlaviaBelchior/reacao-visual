export function About() {
  return (
    <section className="page">
      <h1>Sobre o ReAção Visual</h1>
      <p>
        Esta versão do projeto foi reorganizada para colocar Libras no centro da comunicação. A mascote funciona como professora-guia, abre os módulos, explica os jogos, acompanha o experimento e orienta a forma de resposta do estudante.
      </p>

      <div className="principles">
        <article>
          <h2>🤟 Libras primeiro</h2>
          <p>A explicação principal começa em Libras; o texto em português aparece depois como apoio.</p>
        </article>
        <article>
          <h2>👁️ Pedagogia visual</h2>
          <p>Imagens, GIFs, cores, equações e organização espacial ajudam a construir o conceito científico.</p>
        </article>
        <article>
          <h2>🧩 Interatividade</h2>
          <p>Há jogos de classificação, pistas químicas, balanceamento e missões do cotidiano.</p>
        </article>
        <article>
          <h2>🌈 DUA</h2>
          <p>O estudante pode responder em Libras, texto ou representação visual.</p>
        </article>
      </div>

      <div className="warning-box">
        <strong>Importante</strong>
        <p>
          O avatar e a mascote já deixam a arquitetura pronta para o vídeo real em Libras. Quando você tiver o material validado, basta substituir os blocos da mascote pelos vídeos finais.
        </p>
      </div>
    </section>
  );
}