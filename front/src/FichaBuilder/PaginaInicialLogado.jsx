import Footer from "../Inicio/Footer";
import HeaderLogado from "./HeaderLogado";
import DragonsFicha from "../Imagens/DragonsFicha.png";
import CTHULHUFICHA from "../Imagens/CTHULHUFicha.png";

import "../Styles/PaginaInicialLogado.css";

import { useEffect, useState } from "react";
import axios from "axios";

const tipoFichaImagens = {
  fichaCall: CTHULHUFICHA,
  fichaDungeons: DragonsFicha,
};

export default function PaginaInicialLogado() {
  const [fichasUsuario, setFichasUsuario] = useState({
    nomeFichas: [],
    tipoFichas: [],
  });
  const [fichasFiltradas, setFichasFiltradas] = useState({
    nomeFichas: [],
    tipoFichas: [],
  });
  const [filtro, setFiltro] = useState("");

  const [userId, setUserId] = useState(null);
  const [validado, setValidado] = useState(false);
  const config = {
    headers: {
      Authorization: "Bearer ".concat(sessionStorage.getItem("token")),
    },
  };

  useEffect(() => {
    async function valida() {
      try {
        const response = await axios.get(
          `http://localhost:3000/inicio`,
          config
        );
        setValidado(true);
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
        setValidado(false);
      }
    }
    valida();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (validado) {
          const response = await axios.get(`http://localhost:3000/inicio2`);

          const { nomeFichas, tipoFichas } = response.data;
          setFichasUsuario({ nomeFichas, tipoFichas });
          setFichasFiltradas({ nomeFichas, tipoFichas });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId, validado]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFiltro(value);

    const fichasFiltradas = fichasUsuario.nomeFichas.filter((nomeFicha) =>
      nomeFicha.toLowerCase().startsWith(value.toLowerCase())
    );

    const tipoFichasFiltradas = fichasUsuario.tipoFichas.filter(
      (tipoFicha, index) =>
        fichasFiltradas.includes(fichasUsuario.nomeFichas[index])
    );

    setFichasFiltradas({
      nomeFichas: fichasFiltradas,
      tipoFichas: tipoFichasFiltradas,
    });
  };

  const handleDivClick = (nomeFicha, tipoFicha) => {
    console.log(`Div clicada! Index: ${nomeFicha} ${userId} ${tipoFicha}`);
    window.location.href = `http://localhost:5173/${tipoFicha}/${userId}/${nomeFicha}`;
  };

  const handleExcluirFicha = async (index) => {
    try {
      const nomeDaFicha = fichasFiltradas.nomeFichas[index];
      
      await axios.delete(`http://localhost:3000/ficha/${nomeDaFicha}`);
      
      const novasNomeFichas = [...fichasFiltradas.nomeFichas];
      const novosTipoFichas = [...fichasFiltradas.tipoFichas];
  
      novasNomeFichas.splice(index, 1);
      novosTipoFichas.splice(index, 1);
  
      setFichasFiltradas({
        nomeFichas: novasNomeFichas,
        tipoFichas: novosTipoFichas,
      });
    } catch (error) {
      console.error('Erro ao excluir ficha:', error);
    }
  };
  

  if (!validado) {
    console.log("Token Inválido");
    return <p>Token Inválido</p>;
  } else {
    return (
      <>
        <HeaderLogado />
        <main>
          <form onSubmit={handleSubmit}>
            <div className="PesquisarFicha">
              <input
                type="text"
                placeholder="Pesquisar Ficha"
                value={filtro}
                onChange={handleInputChange}
              />
              <button type="submit">Pesquisar</button>
            </div>
          </form>
          <div className="FichasContainer">
            {fichasFiltradas.nomeFichas &&
            fichasFiltradas.nomeFichas.length > 0 ? (
              fichasFiltradas.nomeFichas.map((nomeFicha, index) => (
                <div key={index} className="MinhasFichass">
                  <div
                    className="MinhasFichas"
                    onClick={() =>
                      handleDivClick(
                        nomeFicha,
                        fichasFiltradas.tipoFichas[index]
                      )
                    }
                  >
                    <img
                      src={tipoFichaImagens[fichasFiltradas.tipoFichas[index]]}
                      alt={`Imagem ${fichasFiltradas.tipoFichas[index]}`}
                    />
                    <p>Ficha: {nomeFicha}</p>
                  </div>
                  <button
                    className="excluiAlgo"
                    onClick={() => handleExcluirFicha(index)}
                  >
                    Excluir
                  </button>
                </div>
              ))
            ) : (
              <p>Nenhuma ficha encontrada.</p>
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
