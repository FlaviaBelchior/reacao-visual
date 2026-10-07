import { NavLink, Outlet } from 'react-router-dom';
import '../styles/libras-only.css';

const links = [
  ['/', '🏠'],
  ['/libras', '🤟'],
  ['/libras/jogo-ph', '🧪'],
] as const;

export function AppShell() {
  return (
    <div className="visual-only-shell">
      <header className="visual-only-topbar">
        <div className="visual-only-topbar-inner">
          <NavLink to="/" className="visual-only-brand" aria-label="Início">🤟</NavLink>
          <nav className="visual-only-nav" aria-label="Navegação">
            {links.map(([to, icon]) => (
              <NavLink key={to} to={to} end={to === '/'} aria-label={to}>{icon}</NavLink>
            ))}
          </nav>
          <span aria-hidden style={{ fontSize: '1.7rem' }}>⚗️</span>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <nav className="visual-only-bottom" aria-label="Navegação">
        {links.map(([to, icon]) => (
          <NavLink key={to} to={to} end={to === '/'} aria-label={to}>{icon}</NavLink>
        ))}
      </nav>
    </div>
  );
}
