import "../Styles/HeaderLogado.css";
import rpglogo from "../Imagens/rpglogo.jpg";
import User from "../Imagens/perfilsemfoto.png";

import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header>
        <Link className='ImgDoHeader' to="/inicio">
          <img src={rpglogo} alt="Logo do RPG" />
          <h2>RPG Maker</h2>
        </Link>
        <nav>
          <div className="dropdown-profile">
            <button className="dropbtn1-profile">Monte sua Ficha!</button>
            <div className="dropdown-content-profile">
              <Link to="/DungeonsDragons" className="link-profile">
                Dungeons and Dragons
              </Link>
              <Link to="/CallCthulhu" className="link-profile">
                Call of Cthulhu
              </Link>
            </div>
          </div>
        </nav>
        <nav>
          <div className="dropdown-profile">
            <img src={User} className="dropbtn-profile" />
            <div className="dropdown-content-profile">
              <Link to="/setting" className="link-profile">
                Settings
              </Link>
              <Link to="/" className="link-profile">
                Logout
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main></main>
    </>
  );
}
