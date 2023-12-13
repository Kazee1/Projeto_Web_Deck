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
import PaginaInicial from './Inicio/PaginaInicial.jsx';
import PaginaInicialLogado from './FichaBuilder/PaginaInicialLogado.jsx';
import DungeonsDragons from './FichaBuilder/Fichas/DungeonsDragons.jsx';
import DungeonsDragonsEditar from './FichaBuilder/Fichas/DungeonsDragonsEditar.jsx';
import CallCthulhuEditar from './FichaBuilder/Fichas/CallCthulhuEditar.jsx';

import CallCthulhu from './FichaBuilder/Fichas/CallCthulhu.jsx';
import Myprofile from './FichaBuilder/Myprofile.jsx';
import MySetting from './FichaBuilder/MySetting.jsx';
//Adicionando as rotas
const router = createBrowserRouter([
  {
    path: '/', // Página inicial para fazer login
    element: <App />,
    children: [
      {
        path: '/',
        element: <PaginaInicial />
      },
      {
        path: 'Login',
        element: <Login />
      },
      {
        path: 'Cadastro',
        element: <Cadastro />
      },
      {
        path: 'EsqueceuSenha',
        element: <EsqueceuSenha />
      },
      {
        path: 'DungeonsDragons',
        element: <DungeonsDragons/>
      },
      {
        path: 'fichaDungeons/:userId/:nomeFicha', 
        //path: 'DungeonsDragons/:userId/:nomeFicha', 
        element: <DungeonsDragonsEditar />
      },
      {
        path: 'fichaCall/:userId/:nomeFicha', 
        //path: 'DungeonsDragons/:userId/:nomeFicha', 
        element: <CallCthulhu />
      },
      {
        path: 'CallCthulhu',
        element: <CallCthulhu/>
      },
      {
        path: 'profile',
        element: <Myprofile/>
      },
      {
        path: 'setting',
        element: <MySetting/>
      },
      {
        path: 'inicio',
        element: <PaginaInicialLogado/>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)