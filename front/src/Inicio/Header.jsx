import "../Styles/Header.css";
import DeckCraftify from '../Imagens/DeckCraftify.png'

import { Link, Navigate } from 'react-router-dom'

export default function Header(){
    return (
        <>
        <header>
        <img src={DeckCraftify}></img>
        <h2>DECKCRAFTIFY</h2>
        <nav>
          <div className="dropdown">
            <button className="dropbtn">&#9776;</button>
            <div className="dropdown-content">
              <Link to="/Cadastro" className="link">Sign up</Link>
              <Link to="/Login" className="link">Sing in</Link>
            </div>
          </div>
        </nav>
      </header>
        </>
    )
}