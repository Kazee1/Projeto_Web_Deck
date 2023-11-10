import "../Styles/PaginaInicial.css";
import DeckCraftify from '../Imagens/DeckCraftify.png'

export default function PaginaInicial() {
  return (
    <>
      <header>
        <img src={DeckCraftify}></img>
        <h2>DECKCRAFTIFY</h2>
        <nav>
          <div className="dropdown">
            <button className="dropbtn">&#9776;</button>
            <div className="dropdown-content">
              <a href="#">Login</a>
              <a href="#">Cadastrar</a>
            </div>
          </div>
        </nav>
      </header>
      <main></main>
    </>
  );
}
