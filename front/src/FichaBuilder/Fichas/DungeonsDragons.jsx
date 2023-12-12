import HeaderLogado from "../HeaderLogado";
import Footer from "../../Inicio/Footer";
import "../../Styles/Fichas/DungeonsDragons.css";
import "../../Styles/Fichas/Dados.css";

import Imagem1 from "../../Imagens/Fichas/DungeonsDragons_Ficha_5E_page1.jpg";
import Imagem2 from "../../Imagens/Fichas/DungeonsDragons_Ficha_5E_page2.jpg";
import Imagem3 from "../../Imagens/Fichas/DungeonsDragons_Ficha_5E_page3.jpg";
import Dado from "../../Imagens/d20.png";

import React, { useState, useEffect } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from "axios";


export default function DungeonsDragons() {
  const [numDados, setNumDados] = useState(0);
  const [validado, setValidado] = useState(false);
  const config = {headers:{'Authorization' : 'Bearer '.concat(sessionStorage.getItem('token'))}}
   
  useEffect(() => {
    async function valida(){
      try{
        const resposta = await axios.get(`http://localhost:3000/DungeonsDragons`,config);
        console.log(resposta);
        if(resposta.status === 200)
        { 
          console.log("validado")
          setValidado(true);
        }
      }catch(error){
        setValidado(false);
        }
    }
    valida();
  },[]);

  useEffect(() => {
    if (validado) {
      mostrarDados();
    }
  }, [validado, numDados]);

  function mostrarDados() {
    const dadosContainer = document.getElementById("dados");
    dadosContainer.innerHTML = "";

    for (let i = 0; i < numDados; i++) {
      const dadoContainer = document.createElement("div");
      dadoContainer.className = "dado-container";

      const dado = document.createElement("img");
      dado.className = "dado";
      dado.src = Dado;
      dado.setAttribute("alt", "D20");

      const numero = document.createElement("p");
      numero.className = "numero";

      dadoContainer.appendChild(dado);
      dadoContainer.appendChild(numero);
      dadosContainer.appendChild(dadoContainer);
    }
  }

  function handleSelectChange(event) {
    const value = parseInt(event.target.value);
    setNumDados(value);
  }

  function sortearNovosNumeros() {
    const dados = document.querySelectorAll(".dado");

    dados.forEach((dado) => {
      const numero = dado.nextElementSibling;
      const numeroSorteado = Math.floor(Math.random() * 20) + 1;

      numero.innerText = "";
      dado.style.animation = "shake 0.5s ease-in-out";
      dado.style.transform = "rotate(360deg)";

      setTimeout(function () {
        dado.style.animation = "";
        dado.style.transform = "";
      }, 1500);

      setTimeout(function () {
        numero.innerText = numeroSorteado;
        numero.style.display = "block";
      }, 1500);
    });
  }

  const [fileName, setFileName] = useState('');

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const downloadPdf = () => {
    const finalFileName = fileName.trim() || 'Dungeons_And_Dragons';

    const input1 = document.getElementById('Page1');
    const input2 = document.getElementById('Page2');
    const input3 = document.getElementById('Page3');
    console.log("oi");

    const pdf = new jsPDF('p', 'mm', 'a4');

    html2canvas(input1).then((canvas1) => {
      const imgData1 = canvas1.toDataURL('image/png');
      pdf.addImage(imgData1, 'PNG', 0, 0, 210, 297);  

      html2canvas(input2).then((canvas2) => {
        const imgData2 = canvas2.toDataURL('image/png');
        pdf.addPage();
        pdf.addImage(imgData2, 'PNG', 0, 0, 210, 297);

        html2canvas(input3).then((canvas3) =>{
          const imgData3 = canvas3.toDataURL('image/png');
          pdf.addPage();
          pdf.addImage(imgData3, 'PNG', 0, 0, 210, 297); 
          pdf.save(`${finalFileName}.pdf`);
        });
      });
    });
  };

  if(!validado)
  {
    console.log("Token Inválido")
    return <p>Token Inválido</p>
  }

  return (
    <>
      <HeaderLogado />
      <main>
        <div className="DadosRoleta">
          <div className="SelectDados">
            <p>Jogar Dados: </p>
            <select value={numDados} onChange={handleSelectChange}>
              <option value="0">0 dados</option>
              <option value="1">1 dado</option>
              <option value="2">2 dados</option>
              <option value="3">3 dados</option>
              <option value="4">4 dados</option>
              <option value="5">5 dados</option>
            </select>
            <button className="Botaoroleta" onClick={sortearNovosNumeros}>Jogar</button>
            <button className="DownloadFicha" onClick={downloadPdf}>&#x25BC; Download</button>
          </div>
          <div id="dados"></div>
        </div>
        <form action="GET/POST" className="DungeonsDragonsFicha">
          <div className="Save">
            <input
              type="name"
              name="NomeDD"
              placeholder="Nome Da Ficha"
              className="NomeDD"
              value={fileName}
              onChange={handleFileNameChange}
            />
          </div>
          <div className="Ficha">
            <div className="Page1" id="Page1">
              <img src={Imagem1} className="Imagem1" alt="page1" />
              <div className="cabeca">
                <input type="text" className="NomePerso" />
                <input type="text" className="Class_Nivel" />
                <input type="text" className="Antecedente" />
                <input type="text" className="NomeDoJogador" />
                <input type="text" className="Raca" />
                <input type="text" className="Tendencia" />
                <input type="text" className="Experiencia" />
              </div>
              <div className="status">
                <input type="text" className="Forca" />
                <input type="text" className="ForcaBonus" />
                <input type="text" className="Destreza" />
                <input type="text" className="DestrezaBonus" />
                <input type="text" className="Constituicao" />
                <input type="text" className="ConstituicaoBonus" />
                <input type="text" className="Inteligencia" />
                <input type="text" className="InteligenciaBonus" />
                <input type="text" className="Sabedoria" />
                <input type="text" className="SabedoriaBonus" />
                <input type="text" className="Carisma" />
                <input type="text" className="CarismaBonus" />
              </div>
              <div className="Substatus">
                <input type="text" className="Inspiracao" />
                <input type="text" className="Proficiencia" />
                <input type="radio" className="radioForca" />
                <input type="text" className="SubForca" />
                <input type="radio" className="radioDestreza" />
                <input type="text" className="SubDestreza" />
                <input type="radio" className="radioConstituicao" />
                <input type="text" className="SubConstituicao" />
                <input type="radio" className="radioInteligencia" />
                <input type="text" className="SubInteligencia" />
                <input type="radio" className="radioSabedoria" />
                <input type="text" className="SubSabedoria" />
                <input type="radio" className="radioCarisma" />
                <input type="text" className="SubCarisma" />
                <input type="radio" className="radioAcrobacia" />
                <input type="text" className="SubAcrobacia" />
                <input type="radio" className="radioArcanismo" />
                <input type="text" className="SubArcanismo" />
                <input type="radio" className="radioAtletismo" />
                <input type="text" className="SubAtletismo" />
                <input type="radio" className="radioAtuacao" />
                <input type="text" className="SubAtuacao" />
                <input type="radio" className="radioEnganacao" />
                <input type="text" className="SubEnganacao" />
                <input type="radio" className="radioFurtividade" />
                <input type="text" className="SubFurtividade" />
                <input type="radio" className="radioHistoria" />
                <input type="text" className="SubHistoria" />
                <input type="radio" className="radioIntimidacao" />
                <input type="text" className="SubIntimidacao" />
                <input type="radio" className="radioIntuicao" />
                <input type="text" className="SubIntuicao" />
                <input type="radio" className="radioInvestigacao" />
                <input type="text" className="SubInvestigacao" />
                <input type="radio" className="radioAnimais" />
                <input type="text" className="SubAnimais" />
                <input type="radio" className="radioMedicina" />
                <input type="text" className="SubMedicina" />
                <input type="radio" className="radioNatureza" />
                <input type="text" className="SubNatureza" />
                <input type="radio" className="radioPercepcao" />
                <input type="text" className="SubPercepcao" />
                <input type="radio" className="radioPersuasao" />
                <input type="text" className="SubPersuasao" />
                <input type="radio" className="radioPrestigio" />
                <input type="text" className="SubPrestigio" />
                <input type="radio" className="radioReligiao" />
                <input type="text" className="SubReligiao" />
                <input type="radio" className="radioSobrevivencia" />
                <input type="text" className="SubSobrevivencia" />
              </div>
              <div className="Vida">
                <input type="text" className="Armadura" />
                <input type="text" className="Iniciativa" />
                <input type="text" className="Deslocamento" />
                <input type="text" className="VidaMaxima" />
                <input type="text" className="VidaAtual" />
                <input type="text" className="VidaTemporaria" />
                <input type="text" className="DadosVidaTotal" />
                <input type="text" className="DadosVida" />
                <input type="radio" className="Sucesso1" />
                <input type="radio" className="Sucesso2" />
                <input type="radio" className="Sucesso3" />
                <input type="radio" className="Fracasso1" />
                <input type="radio" className="Fracasso2" />
                <input type="radio" className="Fracasso3" />
              </div>
              <div className="AtaquesMagias">
                <input type="text" className="NomeAtaque1" />
                <input type="text" className="BonusAtaque1" />
                <input type="text" className="DTAtaque1" />
                <input type="text" className="NomeAtaque2" />
                <input type="text" className="BonusAtaque2" />
                <input type="text" className="DTAtaque2" />
                <input type="text" className="NomeAtaque3" />
                <input type="text" className="BonusAtaque3" />
                <input type="text" className="DTAtaque3" />
                <textarea className="Magias" />
              </div>
              <div className="Idioma">
                <input type="text" className="SabedoriaPassiva" />
                <textarea className="Idiomas" />
              </div>
              <div className="Aparencia">
                <textarea className="Personalidade" />
                <textarea className="Ideias" />
                <textarea className="Ligacoes" />
                <textarea className="Defeitos" />
              </div>
              <div className="Talentos">
                <textarea className="Caracteristicas" />
              </div>
              <div className="Inventario">
                <input type="text" className="PC" />
                <input type="text" className="PP" />
                <input type="text" className="PC" />
                <input type="text" className="PE" />
                <input type="text" className="PO" />
                <input type="text" className="PL" />
                <textarea className="Equipamento" />
              </div>
            </div>
            <div className="Page2" id="Page2">
              <img src={Imagem2} className="Imagem2" />
              <div className="Cabeca">
                <input type="text" className="NomePerso1" />
                <input type="text" className="Idade" />
                <input type="text" className="Altura" />
                <input type="text" className="Peso" />
                <input type="text" className="Olhos" />
                <input type="text" className="Pele" />
                <input type="text" className="Cabelo" />
              </div>
              <div className="Aliados">
                <textarea className="Orgs" />
                <input type="text" className="Guilda" />
                <textarea className="TalentosAdicionais" />
                <textarea className="Tesouros" />
              </div>
              <div className="HistoriaPerso">
                <textarea className="HistoriaPersonagem" />
              </div>
            </div>
            <div className="Page3" id="Page3">
              <img src={Imagem3} className="Imagem3" />
              <div className="cabeca">
                <input type="text" className="ClasseConjurador" />
                <input type="text" className="HabilidadeChave" />
                <input type="text" className="CD" />
                <input type="text" className="ModificadorAtaque" />
              </div>
              <div className="MinhasMagias">
                <input type="text" className="Truque1" />
                <input type="text" className="Truque2" />
                <input type="text" className="Truque3" />
                <input type="text" className="Truque4" />
                <input type="text" className="Truque5" />
                <input type="text" className="Truque6" />
                <input type="text" className="Truque7" />
                <input type="text" className="Truque8" />

                <input type="text" className="EspacoTotal1" />
                <input type="text" className="EspacoUtilizado1" />
                <input type="radio" className="CheckNivel1-1" />
                <input type="text" className="SlotNivel1-1" />
                <input type="radio" className="CheckNivel1-2" />
                <input type="text" className="SlotNivel1-2" />
                <input type="radio" className="CheckNivel1-3" />
                <input type="text" className="SlotNivel1-3" />
                <input type="radio" className="CheckNivel1-4" />
                <input type="text" className="SlotNivel1-4" />
                <input type="radio" className="CheckNivel1-5" />
                <input type="text" className="SlotNivel1-5" />
                <input type="radio" className="CheckNivel1-6" />
                <input type="text" className="SlotNivel1-6" />
                <input type="radio" className="CheckNivel1-7" />
                <input type="text" className="SlotNivel1-7" />
                <input type="radio" className="CheckNivel1-8" />
                <input type="text" className="SlotNivel1-8" />
                <input type="radio" className="CheckNivel1-9" />
                <input type="text" className="SlotNivel1-9" />
                <input type="radio" className="CheckNivel1-10" />
                <input type="text" className="SlotNivel1-10" />
                <input type="radio" className="CheckNivel1-11" />
                <input type="text" className="SlotNivel1-11" />
                <input type="radio" className="CheckNivel1-12" />
                <input type="text" className="SlotNivel1-12" />
                <input type="radio" className="CheckNivel1-13" />
                <input type="text" className="SlotNivel1-13" />

                <input type="text" className="EspacoTotal2" />
                <input type="text" className="EspacoUtilizado2" />
                <input type="radio" className="CheckNivel2-1" />
                <input type="text" className="SlotNivel2-1" />
                <input type="radio" className="CheckNivel2-2" />
                <input type="text" className="SlotNivel2-2" />
                <input type="radio" className="CheckNivel2-3" />
                <input type="text" className="SlotNivel2-3" />
                <input type="radio" className="CheckNivel2-4" />
                <input type="text" className="SlotNivel2-4" />
                <input type="radio" className="CheckNivel2-5" />
                <input type="text" className="SlotNivel2-5" />
                <input type="radio" className="CheckNivel2-6" />
                <input type="text" className="SlotNivel2-6" />
                <input type="radio" className="CheckNivel2-7" />
                <input type="text" className="SlotNivel2-7" />
                <input type="radio" className="CheckNivel2-8" />
                <input type="text" className="SlotNivel2-8" />
                <input type="radio" className="CheckNivel2-9" />
                <input type="text" className="SlotNivel2-9" />
                <input type="radio" className="CheckNivel2-10" />
                <input type="text" className="SlotNivel2-10" />
                <input type="radio" className="CheckNivel2-11" />
                <input type="text" className="SlotNivel2-11" />
                <input type="radio" className="CheckNivel2-12" />
                <input type="text" className="SlotNivel2-12" />
                <input type="radio" className="CheckNivel2-13" />
                <input type="text" className="SlotNivel2-13" />

                <input type="text" className="EspacoTotal3" />
                <input type="text" className="EspacoUtilizado3" />
                <input type="radio" className="CheckNivel3-1" />
                <input type="text" className="SlotNivel3-1" />
                <input type="radio" className="CheckNivel3-2" />
                <input type="text" className="SlotNivel3-2" />
                <input type="radio" className="CheckNivel3-3" />
                <input type="text" className="SlotNivel3-3" />
                <input type="radio" className="CheckNivel3-4" />
                <input type="text" className="SlotNivel3-4" />
                <input type="radio" className="CheckNivel3-5" />
                <input type="text" className="SlotNivel3-5" />
                <input type="radio" className="CheckNivel3-6" />
                <input type="text" className="SlotNivel3-6" />
                <input type="radio" className="CheckNivel3-7" />
                <input type="text" className="SlotNivel3-7" />
                <input type="radio" className="CheckNivel3-8" />
                <input type="text" className="SlotNivel3-8" />
                <input type="radio" className="CheckNivel3-9" />
                <input type="text" className="SlotNivel3-9" />
                <input type="radio" className="CheckNivel3-10" />
                <input type="text" className="SlotNivel3-10" />
                <input type="radio" className="CheckNivel3-11" />
                <input type="text" className="SlotNivel3-11" />
                <input type="radio" className="CheckNivel3-12" />
                <input type="text" className="SlotNivel3-12" />
                <input type="radio" className="CheckNivel3-13" />
                <input type="text" className="SlotNivel3-13" />

                <input type="text" className="EspacoTotal4" />
                <input type="text" className="EspacoUtilizado4" />
                <input type="radio" className="CheckNivel4-1" />
                <input type="text" className="SlotNivel4-1" />
                <input type="radio" className="CheckNivel4-2" />
                <input type="text" className="SlotNivel4-2" />
                <input type="radio" className="CheckNivel4-3" />
                <input type="text" className="SlotNivel4-3" />
                <input type="radio" className="CheckNivel4-4" />
                <input type="text" className="SlotNivel4-4" />
                <input type="radio" className="CheckNivel4-5" />
                <input type="text" className="SlotNivel4-5" />
                <input type="radio" className="CheckNivel4-6" />
                <input type="text" className="SlotNivel4-6" />
                <input type="radio" className="CheckNivel4-7" />
                <input type="text" className="SlotNivel4-7" />
                <input type="radio" className="CheckNivel4-8" />
                <input type="text" className="SlotNivel4-8" />
                <input type="radio" className="CheckNivel4-9" />
                <input type="text" className="SlotNivel4-9" />
                <input type="radio" className="CheckNivel4-10" />
                <input type="text" className="SlotNivel4-10" />
                <input type="radio" className="CheckNivel4-11" />
                <input type="text" className="SlotNivel4-11" />
                <input type="radio" className="CheckNivel4-12" />
                <input type="text" className="SlotNivel4-12" />
                <input type="radio" className="CheckNivel4-13" />
                <input type="text" className="SlotNivel4-13" />

                <input type="text" className="EspacoTotal5" />
                <input type="text" className="EspacoUtilizado5" />
                <input type="radio" className="CheckNivel5-1" />
                <input type="text" className="SlotNivel5-1" />
                <input type="radio" className="CheckNivel5-2" />
                <input type="text" className="SlotNivel5-2" />
                <input type="radio" className="CheckNivel5-3" />
                <input type="text" className="SlotNivel5-3" />
                <input type="radio" className="CheckNivel5-4" />
                <input type="text" className="SlotNivel5-4" />
                <input type="radio" className="CheckNivel5-5" />
                <input type="text" className="SlotNivel5-5" />
                <input type="radio" className="CheckNivel5-6" />
                <input type="text" className="SlotNivel5-6" />
                <input type="radio" className="CheckNivel5-7" />
                <input type="text" className="SlotNivel5-7" />
                <input type="radio" className="CheckNivel5-8" />
                <input type="text" className="SlotNivel5-8" />
                <input type="radio" className="CheckNivel5-9" />
                <input type="text" className="SlotNivel5-9" />

                <input type="text" className="EspacoTotal6" />
                <input type="text" className="EspacoUtilizado6" />
                <input type="radio" className="CheckNivel6-1" />
                <input type="text" className="SlotNivel6-1" />
                <input type="radio" className="CheckNivel6-2" />
                <input type="text" className="SlotNivel6-2" />
                <input type="radio" className="CheckNivel6-3" />
                <input type="text" className="SlotNivel6-3" />
                <input type="radio" className="CheckNivel6-4" />
                <input type="text" className="SlotNivel6-4" />
                <input type="radio" className="CheckNivel6-5" />
                <input type="text" className="SlotNivel6-5" />
                <input type="radio" className="CheckNivel6-6" />
                <input type="text" className="SlotNivel6-6" />
                <input type="radio" className="CheckNivel6-7" />
                <input type="text" className="SlotNivel6-7" />
                <input type="radio" className="CheckNivel6-8" />
                <input type="text" className="SlotNivel6-8" />
                <input type="radio" className="CheckNivel6-9" />
                <input type="text" className="SlotNivel6-9" />

                <input type="text" className="EspacoTotal7" />
                <input type="text" className="EspacoUtilizado7" />
                <input type="radio" className="CheckNivel7-1" />
                <input type="text" className="SlotNivel7-1" />
                <input type="radio" className="CheckNivel7-2" />
                <input type="text" className="SlotNivel7-2" />
                <input type="radio" className="CheckNivel7-3" />
                <input type="text" className="SlotNivel7-3" />
                <input type="radio" className="CheckNivel7-4" />
                <input type="text" className="SlotNivel7-4" />
                <input type="radio" className="CheckNivel7-5" />
                <input type="text" className="SlotNivel7-5" />
                <input type="radio" className="CheckNivel7-6" />
                <input type="text" className="SlotNivel7-6" />
                <input type="radio" className="CheckNivel7-7" />
                <input type="text" className="SlotNivel7-7" />
                <input type="radio" className="CheckNivel7-8" />
                <input type="text" className="SlotNivel7-8" />
                <input type="radio" className="CheckNivel7-9" />
                <input type="text" className="SlotNivel7-9" />

                <input type="text" className="EspacoTotal8" />
                <input type="text" className="EspacoUtilizado8" />
                <input type="radio" className="CheckNivel8-1" />
                <input type="text" className="SlotNivel8-1" />
                <input type="radio" className="CheckNivel8-2" />
                <input type="text" className="SlotNivel8-2" />
                <input type="radio" className="CheckNivel8-3" />
                <input type="text" className="SlotNivel8-3" />
                <input type="radio" className="CheckNivel8-4" />
                <input type="text" className="SlotNivel8-4" />
                <input type="radio" className="CheckNivel8-5" />
                <input type="text" className="SlotNivel8-5" />
                <input type="radio" className="CheckNivel8-6" />
                <input type="text" className="SlotNivel8-6" />
                <input type="radio" className="CheckNivel8-7" />
                <input type="text" className="SlotNivel8-7" />

                <input type="text" className="EspacoTotal9" />
                <input type="text" className="EspacoUtilizado9" />
                <input type="radio" className="CheckNivel9-1" />
                <input type="text" className="SlotNivel9-1" />
                <input type="radio" className="CheckNivel9-2" />
                <input type="text" className="SlotNivel9-2" />
                <input type="radio" className="CheckNivel9-3" />
                <input type="text" className="SlotNivel9-3" />
                <input type="radio" className="CheckNivel9-4" />
                <input type="text" className="SlotNivel9-4" />
                <input type="radio" className="CheckNivel9-5" />
                <input type="text" className="SlotNivel9-5" />
                <input type="radio" className="CheckNivel9-6" />
                <input type="text" className="SlotNivel9-6" />
                <input type="radio" className="CheckNivel9-7" />
                <input type="text" className="SlotNivel9-7" />
              </div>
            </div>
          </div>
          <div className="BotaoSalvar">
            <button className="SalvarFicha">Salvar</button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
