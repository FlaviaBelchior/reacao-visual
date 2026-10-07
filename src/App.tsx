import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { Home } from './pages/Home';
import { LibrasHub } from './pages/LibrasHub';
import { LibrasGame } from './pages/LibrasGame';
import { Explore } from './pages/Explore';
import { Detective } from './pages/Detective';
import { Lab } from './pages/Lab';
import { Builder } from './pages/Builder';
import { Glossary } from './pages/Glossary';
import { Missions } from './pages/Missions';
import { Achievements } from './pages/Achievements';
import { About } from './pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'libras', element: <LibrasHub /> },
      { path: 'libras/jogo-ph', element: <LibrasGame /> },
      { path: 'explorar', element: <Explore /> },
      { path: 'detetive', element: <Detective /> },
      { path: 'laboratorio', element: <Lab /> },
      { path: 'construtor', element: <Builder /> },
      { path: 'glossario', element: <Glossary /> },
      { path: 'missoes', element: <Missions /> },
      { path: 'conquistas', element: <Achievements /> },
      { path: 'sobre', element: <About /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
