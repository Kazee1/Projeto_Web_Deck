import Footer from "../Inicio/Footer";
import HeaderLogado from "./HeaderLogado";
import CTHULHUFICHA from '../Imagens/CTHULHUFicha'
import DragonsFicha from '../Imagens/DragonsFicha'


import "../Styles/PaginaInicialLogado.css";

import { useEffect, useState } from "react";
import axios from "axios";

const tipoFichaImagens = {
  1: CTHULHUFICHA,
  2: DragonsFicha,
};

export default function PaginaInicialLogado({ idUsuarioLogado }) {
  const [fichasUsuario, setFichasUsuario] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [fichasFiltradas, setFichasFiltradas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(``);
        setFichasUsuario(response.data);
        setFichasFiltradas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [idUsuarioLogado]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultados = fichasUsuario.filter((item) =>
      item.NomeFicha.toLowerCase().includes(filtro.toLowerCase())
    );
    setFichasFiltradas(resultados);
  };

  const handleInputChange = (e) => {
    setFiltro(e.target.value);
  };

  const handleDivClick = (ficha) => {
    // Lógica a ser executada quando a div for clicada
    console.log(`Div clicada! Index: ${ficha}`);
  };

  return (
    <>
      <HeaderLogado />
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Pesquisar Ficha"
            value={filtro}
            onChange={handleInputChange}
          />
          <button type="submit">Pesquisar</button>
        </form>
        <div className="FichasContainer">
          {fichasFiltradas.map((ficha, index) => (
            <div
              key={index}
              className="MinhasFichas"
              onClick={() => handleDivClick(ficha.NomeFicha)}
            >
              <img
                src={tipoFichaImagens[ficha.TipoFicha]}
                alt={`Imagem ${ficha.TipoFicha}`}
              />
              <p>Ficha: {ficha.NomeFicha}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
