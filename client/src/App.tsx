import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UsuarioAutenticacao from './pages/usuarioAutenticacao';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  return (
    <>
      <ToastContainer
        autoClose={2000}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/usuario/autenticacao/login" replace />} />

          <Route path="/usuario/autenticacao/:tipoAutenticacao" element={<UsuarioAutenticacao />} />

          <Route path='/dashboard/:nomeUsuario' element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
