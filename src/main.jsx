import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import CriarLicitação from './pages/CriarLicitação.jsx';
import Disponiveis from './pages/Disponiveis';
import CriarUsuarios from './pages/CriarUsuarios.jsx';
import Clientes from './pages/Clientes.jsx';
import CriarClientes from './pages/CriarClientes.jsx';
import Login from './pages/Login.jsx';
import { AuthProvider } from "./auth/AuthContext.jsx"
import Usuarios from './pages/Usuarios';
import RequireAuth from './auth/RequireAuth.jsx';
import IsAuth from './auth/IsAuth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<IsAuth />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/" element={<App />}>
              <Route path="/aveliable" element={<Disponiveis />} />
              <Route path="/create" element={<CriarLicitação />} />
              <Route path="/users" element={<Usuarios />} />
              <Route path="/createUsers" element={<CriarUsuarios />} />
              <Route path="/clients" element={<Clientes />} />
              <Route path="/addClients" element={<CriarClientes />} />
            </Route>
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
