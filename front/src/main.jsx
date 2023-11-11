import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//Configuracoes do React Router (npm install react-router-dom)
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
//Importando rotas
import Login from './Inicio/Login.jsx';
import Cadastro from './Inicio/Cadastro.jsx';
import EsqueceuSenha from './Inicio/EsqueceuSenha.jsx';
//Adicionando as rotas
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    
    children: [
      {
        path: '/Login',
        element: <Login/>
      },
      {
        path: '/Cadastrar',
        element: <Cadastro/>
      },
      {
        path: '/EsqueceuSenha',
        element: <EsqueceuSenha/>
      }   
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)