import Footer from "../Inicio/Footer";
import HeaderLogado from "./HeaderLogado";
// import CTHULHUFICHA from '../Imagens/CTHULHUFicha'
import DragonsFicha from "../Imagens/DragonsFicha.png";
import CTHULHUFICHA from "../Imagens/CTHULHUFicha.png";

import "../Styles/PaginaInicialLogado.css";

import { useEffect, useState } from "react";
import axios from "axios";

const tipoFichaImagens = {
  CallCthulhu: CTHULHUFICHA,
  DungeonsDragons: DragonsFicha,
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
  //Trava por Token

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
        console.log(response.data.userId); // ou faça o que for necessário com os dados recebidos
        setUserId(response.data.userId);
      } catch (error) {
        // Trate os erros, se necessário
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
          console.log(response.data);
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
    // Aqui você pode adicionar lógica para lidar com o envio do formulário
    // por exemplo, enviar a solicitação de pesquisa para o backend
    console.log('Pesquisar:', filtro);
    // Adicione aqui a lógica para enviar a pesquisa ao backend
  };

  const handleInputChange = (e) => {
    setFiltro(e.target.value);
    console.log(filtro);
  };

  const handleDivClick = (nomeFicha, tipoFicha) => {
    // Lógica a ser executada quando a div for clicada
    console.log(`Div clicada! Index: ${nomeFicha} ${userId} ${tipoFicha}`);
    window.location.href = `http://localhost:5173/${tipoFicha}/${userId}/${nomeFicha}`
  };

  const handleExcluirFicha = (index) => {
    /// const novasFichas = [...fichasUsuario];
    //novasFichas.splice(index, 1);
    //setFichasFiltradas(novasFichas);
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
                <div
                  key={index}
                  className="MinhasFichass"
                >
                  <div className="MinhasFichas"
                    onClick={() => handleDivClick(nomeFicha, fichasFiltradas.tipoFichas[index])}
                  >
                  <img
                    src={tipoFichaImagens[fichasFiltradas.tipoFichas[index]]}
                    alt={`Imagem ${fichasFiltradas.tipoFichas[index]}`}
                  />
                  <p>Ficha: {nomeFicha}</p>
                  </div>
                  <button  className='excluiAlgo' onClick={() => handleExcluirFicha(index)}>
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
