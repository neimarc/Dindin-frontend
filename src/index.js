import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
    {/* Para ficar por volta de todas as rotas criadas no routes.js */}
    <MainRoutes />
    {/* Componente onde está todas as rotas */}
    </BrowserRouter>
  </React.StrictMode>
);


