const badges = [
  ['🤟', 'Primeira explicação em Libras'],
  ['🕵️', 'Detetive Químico'],
  ['🧪', 'Experimento concluído'],
  ['⚛️', 'Equação equilibrada'],
  ['🌎', 'Missão do cotidiano resolvida'],
];

export function Achievements() {
  return (
    <section className="page">
      <h1>Minhas Conquistas</h1>
      <p>Sem ranking competitivo. O objetivo é valorizar progresso, autonomia e comunicação em Libras.</p>
      <div className="module-grid">
        {badges.map(([icon, label]) => (
          <article className="module-card static" key={label}>
            <span className="module-icon">{icon}</span>
            <div>
              <h2>{label}</h2>
              <p>Conquista desbloqueada à medida que você participa das trilhas.</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}