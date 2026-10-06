import { NavLink, Outlet } from 'react-router-dom';

const links = [
  ['/', 'Início'],
  ['/libras', 'Central em Libras'],
  ['/explorar', 'Jogos'],
  ['/laboratorio', 'Laboratório'],
  ['/glossario', 'Glossário'],
  ['/sobre', 'Sobre'],
] as const;

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <NavLink to="/" className="brand-lockup" aria-label="ReAção Visual — início">
            <span className="brand-symbol">RV</span>
            <span className="brand-copy">
              <strong>ReAção Visual</strong>
              <small>Libras primeiro • Química interativa</small>
            </span>
          </NavLink>

          <nav className="desktop-nav" aria-label="Navegação principal">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>
            ))}
          </nav>

          <span className="topbar-badge">🤟 Comunicação em Libras</span>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <nav className="bottom-nav" aria-label="Navegação móvel">
        {links.slice(0, 5).map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>
        ))}
      </nav>

      <footer className="site-footer">
        <div>
          <strong>ReAção Visual</strong>
          <span>Produto educacional • Química • Libras • Pedagogia Visual • DUA</span>
        </div>
        <span>IFCE • Semana de Integração Científica</span>
      </footer>
    </div>
  );
}