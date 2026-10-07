import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { Home } from './pages/Home';
import { LibrasHub } from './pages/LibrasHub';
import { LibrasGame } from './pages/LibrasGame';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'libras', element: <LibrasHub /> },
      { path: 'libras/desafio-visual', element: <LibrasGame /> },
      { path: 'libras/memoria-quimica', element: <Navigate to="/libras/desafio-visual" replace /> },
      { path: 'libras/jogo-ph', element: <Navigate to="/libras/desafio-visual" replace /> },
      { path: '*', element: <Navigate to="/libras" replace /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
