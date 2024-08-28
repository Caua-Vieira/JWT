import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/dashboard/dashboard';
import AlterarSenha from './pages/dashboard/components/alterarSenha';


function App() {
  return (
    <>
      <ToastContainer
        autoClose={2000}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path='/dashboard/:nomeUsuario' element={<Dashboard />} />

          <Route path='/alterar/senha' element={<AlterarSenha />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
