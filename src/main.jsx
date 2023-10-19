import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import Disponiveis from './pages/Disponiveis';
import Users from './pages/Usuarios.jsx';
import CriarUsuarios from './pages/CriarUsuarios.jsx';
import Clientes from './pages/Clientes.jsx';
import CriarClientes from './pages/CriarClientes.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Disponiveis />,
      },
      {
        path: "/create",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/createUsers",
        element: <CriarUsuarios />,
      },
      {
        path: "/clients",
        element: <Clientes />,
      },
      {
        path: "/addClients",
        element: <CriarClientes />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
