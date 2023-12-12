import HeaderLogado from "../HeaderLogado";
import Footer from "../../Inicio/Footer";
import "../../Styles/Fichas/DungeonsDragons.css";
import "../../Styles/Fichas/Dados.css";

import {set, useForm} from 'react-hook-form';
import axios, * as others from 'axios';

import Imagem1 from "../../Imagens/Fichas/DungeonsDragons_Ficha_5E_page1.jpg";
import Imagem2 from "../../Imagens/Fichas/DungeonsDragons_Ficha_5E_page2.jpg";
import Imagem3 from "../../Imagens/Fichas/DungeonsDragons_Ficha_5E_page3.jpg";
import Dado from "../../Imagens/d20.png";

import React, { useState, useEffect } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


export default function DungeonsDragons() {
  const [numDados, setNumDados] = useState(0);

  const [msg, setMsg] = useState();
  const [fichaCriado,setFichaCriado] = useState(false);
  const form = useForm();

  const { register, control, handleSubmit, formState } = form;

  const {errors} = formState;

  const submit = async (data) => {
        
    try {
        const response = await axios.post('http://localhost:3000/DungeonsDragons', data);
        setMsg(response.data);
        if(response.data.includes('sucesso'))
          setFichaCriado(true);
    } catch (error) {
        setMsg(error.response.data);
    }   
}


  useEffect(() => {
    mostrarDados();
  }, [numDados]);

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
        <form onSubmit={handleSubmit(submit)} noValidate className="DungeonsDragonsFicha">
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
                <input type="text" className="NomePerso" {...register('NomePerso')}/>
                <input type="text" className="Class_Nivel" {...register('Class_Nivel')}/>
                <input type="text" className="Antecedente" {...register('Antecedente')}/>
                <input type="text" className="NomeDoJogador" {...register('NomeDoJogador')}/>
                <input type="text" className="Raca" {...register('Raca')}/>
                <input type="text" className="Tendencia" {...register('Tendencia')}/>
                <input type="text" className="Experiencia" {...register('Experiencia')}/>
              </div>
              <div className="status">
                <input type="text" className="Forca" {...register('Forca')}/>
                <input type="text" className="ForcaBonus" {...register('ForcaBonus')}/>
                <input type="text" className="Destreza" {...register('Destreza')}/>
                <input type="text" className="DestrezaBonus" {...register('DestrezaBonus')}/>
                <input type="text" className="Constituicao" {...register('Constituicao')}/>
                <input type="text" className="ConstituicaoBonus" {...register('ConstituicaoBonus')}/>
                <input type="text" className="Inteligencia" {...register('Inteligencia')}/>
                <input type="text" className="InteligenciaBonus" {...register('InteligenciaBonus')}/>
                <input type="text" className="Sabedoria" {...register('Sabedoria')}/>
                <input type="text" className="SabedoriaBonus" {...register('SabedoriaBonus')}/>
                <input type="text" className="Carisma" {...register('Carisma')}/>
                <input type="text" className="CarismaBonus" {...register('CarismaBonus')}/>
              </div>
              <div className="Substatus">
                <input type="text" className="Inspiracao" {...register('Inspiracao')}/>
                <input type="text" className="Proficiencia" {...register('Proficiencia')}/>
                <input type="radio" className="radioForca" {...register('radioForca')}/>
                <input type="text" className="SubForca" {...register('SubForca')}/>
                <input type="radio" className="radioDestreza" {...register('radioDestreza')}/>
                <input type="text" className="SubDestreza" {...register('SubDestreza')}/>
                <input type="radio" className="radioConstituicao" {...register('radioConstituicao')}/>
                <input type="text" className="SubConstituicao" {...register('SubConstituicao')}/>
                <input type="radio" className="radioInteligencia" {...register('radioInteligencia')}/>
                <input type="text" className="SubInteligencia" {...register('SubInteligencia')}/>
                <input type="radio" className="radioSabedoria" {...register('radioSabedoria')}/>
                <input type="text" className="SubSabedoria" {...register('SubSabedoria')}/>
                <input type="radio" className="radioCarisma" {...register('radioCarisma')}/>
                <input type="text" className="SubCarisma" {...register('SubCarisma')}/>
                <input type="radio" className="radioAcrobacia" {...register('radioAcrobacia')}/>
                <input type="text" className="SubAcrobacia" {...register('SubAcrobacia')}/>
                <input type="radio" className="radioArcanismo" {...register('radioArcanismo')}/>
                <input type="text" className="SubArcanismo" {...register('SubArcanismo')}/>
                <input type="radio" className="radioAtletismo" {...register('radioAtletismo')}/>
                <input type="text" className="SubAtletismo" {...register('SubAtletismo')}/>
                <input type="radio" className="radioAtuacao" {...register('radioAtuacao')}/>
                <input type="text" className="SubAtuacao" {...register('SubAtuacao')}/>
                <input type="radio" className="radioEnganacao" {...register('radioEnganacao')}/>
                <input type="text" className="SubEnganacao" {...register('SubEnganacao')}/>
                <input type="radio" className="radioFurtividade" {...register('radioFurtividade')}/>
                <input type="text" className="SubFurtividade" {...register('SubFurtividade')}/>
                <input type="radio" className="radioHistoria" {...register('radioHistoria')}/>
                <input type="text" className="SubHistoria" {...register('SubHistoria')}/>
                <input type="radio" className="radioIntimidacao" {...register('radioIntimidacao')}/>
                <input type="text" className="SubIntimidacao" {...register('SubIntimidacao')}/>
                <input type="radio" className="radioIntuicao" {...register('radioIntuicao')}/>
                <input type="text" className="SubIntuicao" {...register('SubIntuicao')}/>
                <input type="radio" className="radioInvestigacao" {...register('radioInvestigacao')}/>
                <input type="text" className="SubInvestigacao" {...register('SubInvestigacao')}/>
                <input type="radio" className="radioAnimais" {...register('radioAnimais')}/>
                <input type="text" className="SubAnimais" {...register('SubAnimais')}/>
                <input type="radio" className="radioMedicina" {...register('radioMedicina')}/>
                <input type="text" className="SubMedicina" {...register('SubMedicina')}/>
                <input type="radio" className="radioNatureza" {...register('radioNatureza')}/>
                <input type="text" className="SubNatureza" {...register('SubNatureza')}/>
                <input type="radio" className="radioPercepcao" {...register('radioPercepcao')}/>
                <input type="text" className="SubPercepcao" {...register('SubPercepcao')}/>
                <input type="radio" className="radioPersuasao" {...register('radioPersuasao')}/>
                <input type="text" className="SubPersuasao" {...register('SubPersuasao')}/>
                <input type="radio" className="radioPrestigio" {...register('radioPrestigio')}/>
                <input type="text" className="SubPrestigio" {...register('SubPrestigio')}/>
                <input type="radio" className="radioReligiao" {...register('radioReligiao')}/>
                <input type="text" className="SubReligiao" {...register('SubReligiao')}/>
                <input type="radio" className="radioSobrevivencia" {...register('radioSobrevivencia')}/>
                <input type="text" className="SubSobrevivencia" {...register('SubSobrevivencia')}/>
              </div>
              <div className="Vida">
                <input type="text" className="Armadura" {...register('Armadura')}/>
                <input type="text" className="Iniciativa" {...register('Iniciativa')}/>
                <input type="text" className="Deslocamento" {...register('Deslocamento')}/>
                <input type="text" className="VidaMaxima" {...register('VidaMaxima')}/>
                <input type="text" className="VidaAtual" {...register('VidaAtual')}/>
                <input type="text" className="VidaTemporaria" {...register('VidaTemporaria')}/>
                <input type="text" className="DadosVidaTotal" {...register('DadosVidaTotal')}/>
                <input type="text" className="DadosVida" {...register('DadosVida')}/>
                <input type="radio" className="Sucesso1" {...register('Sucesso1')}/>
                <input type="radio" className="Sucesso2" {...register('Sucesso2')}/>
                <input type="radio" className="Sucesso3" {...register('Sucesso3')}/>
                <input type="radio" className="Fracasso1" {...register('Fracasso1')}/>
                <input type="radio" className="Fracasso2" {...register('Fracasso2')}/>
                <input type="radio" className="Fracasso3" {...register('Fracasso3')}/>
              </div>
              <div className="AtaquesMagias">
                <input type="text" className="NomeAtaque1" {...register('NomeAtaque1')}/>
                <input type="text" className="BonusAtaque1" {...register('BonusAtaque1')}/>
                <input type="text" className="DTAtaque1" {...register('DTAtaque1')}/>
                <input type="text" className="NomeAtaque2" {...register('NomeAtaque2')}/>
                <input type="text" className="BonusAtaque2" {...register('BonusAtaque2')}/>
                <input type="text" className="DTAtaque2" {...register('DTAtaque2')}/>
                <input type="text" className="NomeAtaque3" {...register('NomeAtaque3')}/>
                <input type="text" className="BonusAtaque3" {...register('BonusAtaque3')}/>
                <input type="text" className="DTAtaque3" {...register('DTAtaque3')}/>
                <textarea className="Magias" {...register('Magias')}/>
              </div>
              <div className="Idioma">
                <input type="text" className="SabedoriaPassiva" {...register('SabedoriaPassiva')}/>
                <textarea className="Idiomas" {...register('Idiomas')}/>
              </div>
              <div className="Aparencia">
                <textarea className="Personalidade" {...register('Personalidade')}/>
                <textarea className="Ideias" {...register('Ideias')}/>
                <textarea className="Ligacoes" {...register('Ligacoes')}/>
                <textarea className="Defeitos" {...register('Defeitos')}/>
              </div>
              <div className="Talentos">
                <textarea className="Caracteristicas" {...register('Caracteristicas')}/>
              </div>
              <div className="Inventario">
                <input type="text" className="PC" {...register('PC')}/>
                <input type="text" className="PP" {...register('PP')}/>
                {/* <input type="text" className="PC" {...register('PC')}/> */}
                <input type="text" className="PE" {...register('PE')}/>
                <input type="text" className="PO" {...register('PO')}/>
                <input type="text" className="PL" {...register('PL')}/>
                <textarea className="Equipamento" {...register('Equipamento')}/>
              </div>
            </div>
            <div className="Page2" id="Page2">
              <img src={Imagem2} className="Imagem2" />
              <div className="Cabeca">
                <input type="text" className="NomePerso1" {...register('NomePerso1')}/>
                <input type="text" className="Idade" {...register('Idade')}/>
                <input type="text" className="Altura" {...register('Altura')}/>
                <input type="text" className="Peso" {...register('Peso')}/>
                <input type="text" className="Olhos" {...register('Olhos')}/>
                <input type="text" className="Pele" {...register('Pele')}/>
                <input type="text" className="Cabelo" {...register('Cabelo')}/>
              </div>
              <div className="Aliados">
                <textarea className="Orgs" {...register('Orgs')}/>
                <input type="text" className="Guilda" {...register('Guilda')}/>
                <textarea className="TalentosAdicionais" {...register('TalentosAdicionais')}/>
                <textarea className="Tesouros" {...register('Tesouros')}/>
              </div>
              <div className="HistoriaPerso">
                <textarea className="HistoriaPersonagem" {...register('HistoriaPersonagem')}/>
              </div>
            </div>
            <div className="Page3" id="Page3">
              <img src={Imagem3} className="Imagem3" />
              <div className="cabeca">
                <input type="text" className="ClasseConjurador" {...register('ClasseConjurador')}/>
                <input type="text" className="HabilidadeChave" {...register('HabilidadeChave')}/>
                <input type="text" className="CD" {...register('CD')}/>
                <input type="text" className="ModificadorAtaque" {...register('ModificadorAtaque')}/>
              </div>
              <div className="MinhasMagias">
                <input type="text" className="Truque1" {...register('Truque1')}/>
                <input type="text" className="Truque2" {...register('Truque2')}/>
                <input type="text" className="Truque3" {...register('Truque3')}/>
                <input type="text" className="Truque4" {...register('Truque4')}/>
                <input type="text" className="Truque5" {...register('Truque5')}/>
                <input type="text" className="Truque6" {...register('Truque6')}/>
                <input type="text" className="Truque7" {...register('Truque7')}/>
                <input type="text" className="Truque8" {...register('Truque8')}/>

                <input type="text" className="EspacoTotal1" {...register('EspacoTotal1')}/>
                <input type="text" className="EspacoUtilizado1" {...register('EspacoUtilizado1')}/>
                <input type="radio" className="CheckNivel1_1" {...register('CheckNivel1_1')}/>
                <input type="text" className="SlotNivel1_1" {...register('SlotNivel1_1')}/>
                <input type="radio" className="CheckNivel1_2" {...register('CheckNivel1_2')}/>
                <input type="text" className="SlotNivel1_2" {...register('SlotNivel1_2')}/>
                <input type="radio" className="CheckNivel1_3" {...register('CheckNivel1_3')}/>
                <input type="text" className="SlotNivel1_3" {...register('SlotNivel1_3')}/>
                <input type="radio" className="CheckNivel1_4" {...register('CheckNivel1_4')}/>
                <input type="text" className="SlotNivel1_4" {...register('SlotNivel1_4')}/>
                <input type="radio" className="CheckNivel1_5" {...register('CheckNivel1_5')}/>
                <input type="text" className="SlotNivel1_5" {...register('SlotNivel1_5')}/>
                <input type="radio" className="CheckNivel1_6" {...register('CheckNivel1_6')}/>
                <input type="text" className="SlotNivel1_6" {...register('SlotNivel1_6')}/>
                <input type="radio" className="CheckNivel1_7" {...register('CheckNivel1_7')}/>
                <input type="text" className="SlotNivel1_7" {...register('SlotNivel1_7')}/>
                <input type="radio" className="CheckNivel1_8" {...register('CheckNivel1_8')}/>
                <input type="text" className="SlotNivel1_8" {...register('SlotNivel1_8')}/>
                <input type="radio" className="CheckNivel1_9" {...register('CheckNivel1_9')}/>
                <input type="text" className="SlotNivel1_9" {...register('SlotNivel1_9')}/>
                <input type="radio" className="CheckNivel1_10" {...register('CheckNivel1_10')}/>
                <input type="text" className="SlotNivel1_10" {...register('SlotNivel1_10')}/>
                <input type="radio" className="CheckNivel1_11" {...register('CheckNivel1_11')}/>
                <input type="text" className="SlotNivel1_11" {...register('SlotNivel1_11')}/>
                <input type="radio" className="CheckNivel1_12" {...register('CheckNivel1_12')}/>
                <input type="text" className="SlotNivel1_12" {...register('SlotNivel1_12')}/>
                <input type="radio" className="CheckNivel1_13" {...register('CheckNivel1_13')}/>
                <input type="text" className="SlotNivel1_13" {...register('SlotNivel1_13')}/>

                <input type="text" className="EspacoTotal2" {...register('EspacoTotal2')}/>
                <input type="text" className="EspacoUtilizado2" {...register('EspacoUtilizado2')}/>
                <input type="radio" className="CheckNivel2_1" {...register('CheckNivel2_1')}/>
                <input type="text" className="SlotNivel2_1" {...register('SlotNivel2_1')}/>
                <input type="radio" className="CheckNivel2_2" {...register('CheckNivel2_2')}/>
                <input type="text" className="SlotNivel2_2" {...register('SlotNivel2_2')}/>
                <input type="radio" className="CheckNivel2_3" {...register('CheckNivel2_3')}/>
                <input type="text" className="SlotNivel2_3" {...register('SlotNivel2_3')}/>
                <input type="radio" className="CheckNivel2_4" {...register('CheckNivel2_4')}/>
                <input type="text" className="SlotNivel2_4" {...register('SlotNivel2_4')}/>
                <input type="radio" className="CheckNivel2_5" {...register('CheckNivel2_5')}/>
                <input type="text" className="SlotNivel2_5" {...register('SlotNivel2_5')}/>
                <input type="radio" className="CheckNivel2_6" {...register('CheckNivel2_6')}/>
                <input type="text" className="SlotNivel2_6" {...register('SlotNivel2_6')}/>
                <input type="radio" className="CheckNivel2_7" {...register('CheckNivel2_7')}/> 
                <input type="text" className="SlotNivel2_7" {...register('SlotNivel2_7')}/>
                <input type="radio" className="CheckNivel2_8" {...register('CheckNivel2_8')}/>
                <input type="text" className="SlotNivel2_8" {...register('SlotNivel2_8')}/>
                <input type="radio" className="CheckNivel2_9" {...register('CheckNivel2_9')}/>
                <input type="text" className="SlotNivel2_9" {...register('SlotNivel2_9')}/>
                <input type="radio" className="CheckNivel2_10" {...register('CheckNivel2_10')}/>
                <input type="text" className="SlotNivel2_10" {...register('SlotNivel2_10')}/>
                <input type="radio" className="CheckNivel2_11" {...register('CheckNivel2_11')}/>
                <input type="text" className="SlotNivel2_11" {...register('SlotNivel2_11')}/>
                <input type="radio" className="CheckNivel2_12" {...register('CheckNivel2_12')}/>
                <input type="text" className="SlotNivel2_12" {...register('SlotNivel2_12')}/>
                <input type="radio" className="CheckNivel2_13" {...register('CheckNivel2_13')}/>
                <input type="text" className="SlotNivel2_13" {...register('SlotNivel2_13')}/>

                <input type="text" className="EspacoTotal3" {...register('EspacoTotal3')}/>
                <input type="text" className="EspacoUtilizado3" {...register('EspacoUtilizado3')}/>
                <input type="radio" className="CheckNivel3_1" {...register('CheckNivel3_1')}/>
                <input type="text" className="SlotNivel3_1" {...register('SlotNivel3_1')}/>
                <input type="radio" className="CheckNivel3_2" {...register('CheckNivel3_2')}/>
                <input type="text" className="SlotNivel3_2" {...register('SlotNivel3_2')}/>
                <input type="radio" className="CheckNivel3_3" {...register('CheckNivel3_3')}/>
                <input type="text" className="SlotNivel3_3" {...register('SlotNivel3_3')}/>
                <input type="radio" className="CheckNivel3_4" {...register('CheckNivel3_4')}/>
                <input type="text" className="SlotNivel3_4" {...register('SlotNivel3_4')}/>
                <input type="radio" className="CheckNivel3_5" {...register('CheckNivel3_5')}/>
                <input type="text" className="SlotNivel3_5" {...register('SlotNivel3_5')}/>
                <input type="radio" className="CheckNivel3_6" {...register('CheckNivel3_6')}/>
                <input type="text" className="SlotNivel3_6" {...register('SlotNivel3_6')}/>
                <input type="radio" className="CheckNivel3_7" {...register('CheckNivel3_7')}/>
                <input type="text" className="SlotNivel3_7" {...register('SlotNivel3_7')}/>
                <input type="radio" className="CheckNivel3_8" {...register('CheckNivel3_8')}/>
                <input type="text" className="SlotNivel3_8" {...register('SlotNivel3_8')}/>
                <input type="radio" className="CheckNivel3_9" {...register('CheckNivel3_9')}/>
                <input type="text" className="SlotNivel3_9" {...register('SlotNivel3_9')}/>
                <input type="radio" className="CheckNivel3_10" {...register('CheckNivel3_10')}/>
                <input type="text" className="SlotNivel3_10" {...register('SlotNivel3_10')}/>
                <input type="radio" className="CheckNivel3_11" {...register('CheckNivel3_11')}/>
                <input type="text" className="SlotNivel3_11" {...register('SlotNivel3_11')}/>
                <input type="radio" className="CheckNivel3_12" {...register('CheckNivel3_12')}/>
                <input type="text" className="SlotNivel3_12" {...register('SlotNivel3_12')}/>
                <input type="radio" className="CheckNivel3_13" {...register('CheckNivel3_13')}/>
                <input type="text" className="SlotNivel3_13" {...register('SlotNivel3_13')}/>

                <input type="text" className="EspacoTotal4" {...register('EspacoTotal4')}/>
                <input type="text" className="EspacoUtilizado4" {...register('EspacoUtilizado4')}/>
                <input type="radio" className="CheckNivel4_1" {...register('CheckNivel4_1')}/>
                <input type="text" className="SlotNivel4_1" {...register('SlotNivel4_1')}/>
                <input type="radio" className="CheckNivel4_2" {...register('CheckNivel4_2')}/>
                <input type="text" className="SlotNivel4_2" {...register('SlotNivel4_2')}/>
                <input type="radio" className="CheckNivel4_3" {...register('CheckNivel4_3')}/>
                <input type="text" className="SlotNivel4_3" {...register('SlotNivel4_3')}/>
                <input type="radio" className="CheckNivel4_4" {...register('CheckNivel4_4')}/>
                <input type="text" className="SlotNivel4_4" {...register('SlotNivel4_4')}/>
                <input type="radio" className="CheckNivel4_5" {...register('CheckNivel4_5')}/>
                <input type="text" className="SlotNivel4_5" {...register('SlotNivel4_5')}/>
                <input type="radio" className="CheckNivel4_6" {...register('CheckNivel4_6')}/>
                <input type="text" className="SlotNivel4_6" {...register('SlotNivel4_6')}/>
                <input type="radio" className="CheckNivel4_7" {...register('CheckNivel4_7')}/>
                <input type="text" className="SlotNivel4_7" {...register('SlotNivel4_7')}/>
                <input type="radio" className="CheckNivel4_8" {...register('CheckNivel4_8')}/>
                <input type="text" className="SlotNivel4_8" {...register('SlotNivel4_8')}/>
                <input type="radio" className="CheckNivel4_9" {...register('CheckNivel4_9')}/>
                <input type="text" className="SlotNivel4_9" {...register('SlotNivel4_9')}/>
                <input type="radio" className="CheckNivel4_10" {...register('CheckNivel4_10')}/>
                <input type="text" className="SlotNivel4_10" {...register('SlotNivel4_10')}/>
                <input type="radio" className="CheckNivel4_11" {...register('CheckNivel4_11')}/>
                <input type="text" className="SlotNivel4_11" {...register('SlotNivel4_11')}/>
                <input type="radio" className="CheckNivel4_12" {...register('CheckNivel4_12')}/>
                <input type="text" className="SlotNivel4_12" {...register('SlotNivel4_12')}/>
                <input type="radio" className="CheckNivel4_13" {...register('CheckNivel4_13')}/>
                <input type="text" className="SlotNivel4_13" {...register('SlotNivel4_13')}/>

                <input type="text" className="EspacoTotal5" {...register('EspacoTotal5')}/>
                <input type="text" className="EspacoUtilizado5" {...register('EspacoUtilizado5')}/>
                <input type="radio" className="CheckNivel5_1" {...register('CheckNivel5_1')}/>
                <input type="text" className="SlotNivel5_1" {...register('SlotNivel5_1')}/>
                <input type="radio" className="CheckNivel5_2" {...register('CheckNivel5_2')}/>
                <input type="text" className="SlotNivel5_2" {...register('SlotNivel5_2')}/>
                <input type="radio" className="CheckNivel5_3" {...register('CheckNivel5_3')}/>
                <input type="text" className="SlotNivel5_3" {...register('SlotNivel5_3')}/>
                <input type="radio" className="CheckNivel5_4" {...register('CheckNivel5_4')}/>
                <input type="text" className="SlotNivel5_4" {...register('SlotNivel5_4')}/>
                <input type="radio" className="CheckNivel5_5" {...register('CheckNivel5_5')}/>
                <input type="text" className="SlotNivel5_5" {...register('SlotNivel5_5')}/>
                <input type="radio" className="CheckNivel5_6" {...register('CheckNivel5_6')}/>
                <input type="text" className="SlotNivel5_6" {...register('SlotNivel5_6')}/>
                <input type="radio" className="CheckNivel5_7" {...register('CheckNivel5_7')}/>
                <input type="text" className="SlotNivel5_7" {...register('SlotNivel5_7')}/>
                <input type="radio" className="CheckNivel5_8" {...register('CheckNivel5_8')}/>
                <input type="text" className="SlotNivel5_8" {...register('SlotNivel5_8')}/>
                <input type="radio" className="CheckNivel5_9" {...register('CheckNivel5_9')}/>
                <input type="text" className="SlotNivel5_9" {...register('SlotNivel5_9')}/>

                <input type="text" className="EspacoTotal6" {...register('EspacoTotal6')}/>
                <input type="text" className="EspacoUtilizado6" {...register('EspacoUtilizado6')}/>
                <input type="radio" className="CheckNivel6_1" {...register('CheckNivel6_1')}/>
                <input type="text" className="SlotNivel6_1" {...register('SlotNivel6_1')}/>
                <input type="radio" className="CheckNivel6_2" {...register('CheckNivel6_2')}/>
                <input type="text" className="SlotNivel6_2" {...register('SlotNivel6_2')}/>
                <input type="radio" className="CheckNivel6_3" {...register('CheckNivel6_3')}/>
                <input type="text" className="SlotNivel6_3" {...register('SlotNivel6_3')}/>
                <input type="radio" className="CheckNivel6_4" {...register('CheckNivel6_4')}/>
                <input type="text" className="SlotNivel6_4" {...register('SlotNivel6_4')}/>
                <input type="radio" className="CheckNivel6_5" {...register('CheckNivel6_5')}/>
                <input type="text" className="SlotNivel6_5" {...register('SlotNivel6_5')}/>
                <input type="radio" className="CheckNivel6_6" {...register('CheckNivel6_6')}/>
                <input type="text" className="SlotNivel6_6" {...register('SlotNivel6_6')}/>
                <input type="radio" className="CheckNivel6_7" {...register('CheckNivel6_7')}/>
                <input type="text" className="SlotNivel6_7" {...register('SlotNivel6_7')}/>
                <input type="radio" className="CheckNivel6_8" {...register('CheckNivel6_8')}/>
                <input type="text" className="SlotNivel6_8" {...register('SlotNivel6_8')}/>
                <input type="radio" className="CheckNivel6_9" {...register('CheckNivel6_9')}/>
                <input type="text" className="SlotNivel6_9" {...register('SlotNivel6_9')}/>

                <input type="text" className="EspacoTotal7" {...register('EspacoTotal7')}/>
                <input type="text" className="EspacoUtilizado7" {...register('EspacoUtilizado7')}/>
                <input type="radio" className="CheckNivel7_1" {...register('CheckNivel7_1')}/>
                <input type="text" className="SlotNivel7_1" {...register('SlotNivel7_1')}/>
                <input type="radio" className="CheckNivel7_2" {...register('CheckNivel7_2')}/>
                <input type="text" className="SlotNivel7_2" {...register('SlotNivel7_2')}/>
                <input type="radio" className="CheckNivel7_3" {...register('CheckNivel7_3')}/>
                <input type="text" className="SlotNivel7_3" {...register('SlotNivel7_3')}/>
                <input type="radio" className="CheckNivel7_4" {...register('CheckNivel7_4')}/>
                <input type="text" className="SlotNivel7_4" {...register('SlotNivel7_4')}/>
                <input type="radio" className="CheckNivel7_5" {...register('CheckNivel7_5')}/>
                <input type="text" className="SlotNivel7_5" {...register('SlotNivel7_5')}/>
                <input type="radio" className="CheckNivel7_6" {...register('CheckNivel7_6')}/>
                <input type="text" className="SlotNivel7_6" {...register('SlotNivel7_6')}/>
                <input type="radio" className="CheckNivel7_7" {...register('CheckNivel7_7')}/>
                <input type="text" className="SlotNivel7_7" {...register('SlotNivel7_7')}/>
                <input type="radio" className="CheckNivel7_8" {...register('CheckNivel7_8')}/>
                <input type="text" className="SlotNivel7_8" {...register('SlotNivel7_8')}/>
                <input type="radio" className="CheckNivel7_9" {...register('CheckNivel7_9')}/>
                <input type="text" className="SlotNivel7_9" {...register('SlotNivel7_9')}/>

                <input type="text" className="EspacoTotal8" {...register('EspacoTotal8')}/>
                <input type="text" className="EspacoUtilizado8" {...register('EspacoUtilizado8')}/>
                <input type="radio" className="CheckNivel8_1" {...register('CheckNivel8_1')}/>
                <input type="text" className="SlotNivel8_1" {...register('SlotNivel8_1')}/>
                <input type="radio" className="CheckNivel8_2" {...register('CheckNivel8_2')}/>
                <input type="text" className="SlotNivel8_2" {...register('SlotNivel8_2')}/>
                <input type="radio" className="CheckNivel8_3" {...register('CheckNivel8_3')}/>
                <input type="text" className="SlotNivel8_3" {...register('SlotNivel8_3')}/>
                <input type="radio" className="CheckNivel8_4" {...register('CheckNivel8_4')}/>
                <input type="text" className="SlotNivel8_4" {...register('SlotNivel8_4')}/>
                <input type="radio" className="CheckNivel8_5" {...register('CheckNivel8_5')}/>
                <input type="text" className="SlotNivel8_5" {...register('SlotNivel8_5')}/>
                <input type="radio" className="CheckNivel8_6" {...register('CheckNivel8_6')}/>
                <input type="text" className="SlotNivel8_6" {...register('SlotNivel8_6')}/>
                <input type="radio" className="CheckNivel8_7" {...register('CheckNivel8_7')}/>
                <input type="text" className="SlotNivel8_7" {...register('SlotNivel8_7')}/>

                <input type="text" className="EspacoTotal9" {...register('EspacoTotal9')}/>
                <input type="text" className="EspacoUtilizado9" {...register('EspacoUtilizado9')}/>
                <input type="radio" className="CheckNivel9_1" {...register('CheckNivel9_1')}/>
                <input type="text" className="SlotNivel9_1" {...register('SlotNivel9_1')}/>
                <input type="radio" className="CheckNivel9_2" {...register('CheckNivel9_2')}/>
                <input type="text" className="SlotNivel9_2" {...register('SlotNivel9_2')}/>
                <input type="radio" className="CheckNivel9_3" {...register('CheckNivel9_3')}/>
                <input type="text" className="SlotNivel9_3" {...register('SlotNivel9_3')}/>
                <input type="radio" className="CheckNivel9_4" {...register('CheckNivel9_4')}/>
                <input type="text" className="SlotNivel9_4" {...register('SlotNivel9_4')}/>
                <input type="radio" className="CheckNivel9_5" {...register('CheckNivel9_5')}/>
                <input type="text" className="SlotNivel9_5" {...register('SlotNivel9_5')}/>
                <input type="radio" className="CheckNivel9_6" {...register('CheckNivel9_6')}/>
                <input type="text" className="SlotNivel9_6" {...register('SlotNivel9_6')}/>
                <input type="radio" className="CheckNivel9_7" {...register('CheckNivel9_7')}/>
                <input type="text" className="SlotNivel9_7" {...register('SlotNivel9_7')}/>
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
