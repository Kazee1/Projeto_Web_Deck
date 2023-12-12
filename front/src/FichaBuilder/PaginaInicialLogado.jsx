import Footer from "../Inicio/Footer";
import HeaderLogado from "./HeaderLogado";
// import CTHULHUFICHA from '../Imagens/CTHULHUFicha'
import DragonsFicha from '../Imagens/DragonsFicha.png'
import CTHULHUFICHA from '../Imagens/CTHULHUFicha.png'

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
  //Trava por Token

  const [userId, setUserId] = useState(null);
  const [validado, setValidado] = useState(false);
  const config = {headers:{'Authorization' : 'Bearer '.concat(sessionStorage.getItem('token'))}}
  
  useEffect(() => {
    async function valida() {
      try {
        const response = await axios.get(`http://localhost:3000/inicio`, config);
        setValidado(true);
        console.log(response.data.userId); // ou faça o que for necessário com os dados recebidos
        setUserId(response.data.userId);
        
      } catch (error) {
        // Trate os erros, se necessário
        console.error('Erro ao obter dados:', error);
        setValidado(false);
      }
    }
    valida();
  }, []);

  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/inicio`);
  //       setFichasUsuario(response.data);
  //       setFichasFiltradas(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [idUsuarioLogado]);

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

  const handleExcluirFicha = (index) => {
    const novasFichas = [...fichasUsuario];
    novasFichas.splice(index, 1);
    setFichasFiltradas(novasFichas);
  };
  if(!validado)
  {
    console.log("Token Inválido")
    return <p>Token Inválido</p>
  }
  else{
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
              <button onClick={() => handleExcluirFicha(index)}>Excluir</button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
}
