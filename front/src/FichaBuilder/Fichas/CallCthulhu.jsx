import Imagem1 from "../../Imagens/Fichas/CallCthulhu_page-00001.jpg";
import Imagem2 from "../../Imagens/Fichas/CallCthulhu_page-00002.jpg";
import Dado from "../../Imagens/d20.png";

import Header from "../HeaderLogado";
import Footer from "../../Inicio/Footer";

import {set, useForm} from 'react-hook-form';

import "../../Styles/Fichas/CallCthulhu.css";
import "../../Styles/Fichas/Dados.css";

import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import axios from "axios";

export default function CallCthulhu() {
  const [numDados, setNumDados] = useState(0);
  const [validado, setValidado] = useState(false);
  const config = {
    headers: {
      Authorization: "Bearer ".concat(sessionStorage.getItem("token")),
    },
  };

  useEffect(() => {
    async function valida() {
      try {
        const resposta = await axios.get(
          `http://localhost:3000/CallCthulhu`,
          config
        );
        console.log(resposta);
        if (resposta.status === 200) {
          console.log("validado");
          setValidado(true);
        }
      } catch (error) {
        setValidado(false);
      }
    }
    valida();
  }, []);

  const [msg, setMsg] = useState();
  const [fichaCriado,setFichaCriado] = useState(false);
  const form = useForm();

  const { register, control, handleSubmit, formState } = form;

  const {errors} = formState;

  const submit = async (data) => {
        
    try {
        const response = await axios.post('http://localhost:3000/CallCthulhu', data);
        setMsg(response.data);
        if(response.data.includes('sucesso'))
          setFichaCriado(true);
    } catch (error) {
        setMsg(error.response.data);
    }   
}


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

  const [fileName, setFileName] = useState("");

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const downloadPdf = () => {
    const finalFileName = fileName.trim() || "Call_of_Cthulhu";

    const input1 = document.getElementById("CallPage1");
    const input2 = document.getElementById("CallPage2");

    const pdf = new jsPDF("p", "mm", "a4");

    html2canvas(input1).then((canvas1) => {
      const imgData1 = canvas1.toDataURL("image/png");
      pdf.addImage(imgData1, "PNG", 0, 0, 210, 297);

      html2canvas(input2).then((canvas2) => {
        const imgData2 = canvas2.toDataURL("image/png");
        pdf.addPage();
        pdf.addImage(imgData2, "PNG", 0, 0, 210, 297);

        pdf.save(`${finalFileName}.pdf`);
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
      <Header />
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
            <button className="Botaoroleta" onClick={sortearNovosNumeros}>
              Jogar
            </button>
            <button className="DownloadFicha" onClick={downloadPdf}>
              &#x25BC; Download
            </button>
          </div>
          <div id="dados"></div>
        </div>
        <form onSubmit={handleSubmit(submit)} noValidate className="CallCTHULHU">
          <div className="SaveCall">
            <input
              type="name"
              name="NomeCall"
              placeholder="Nome Da Ficha"
              className="NomeCall"
              value={fileName}
              {...register('NomeCall')}
              onChange={handleFileNameChange}
              
            />
          </div>
          <div className="FichaCall" id="FichaCall">
            <div className="CallPage1" id="CallPage1">
              <img src={Imagem1} className="CallImagem1" alt="page1" />
              <div className="Cabeca">
                <input type="text" className="NomeJogador" {...register('NomeJogador')}/>
                <input type="text" className="JogadorJogador" {...register('JogadorJogador')}/>
                <input type="text" className="OcupacaoJogador" {...register('OcupacaoJogador')}/>
                <input type="text" className="IdadeJogador" {...register('IdadeJogador')}/>
                <input type="text" className="SexoJogador" {...register('SexoJogador')}/>
                <input type="text" className="ResidenciaJogador" {...register('ResidenciaJogador')}/>
                <input type="text" className="NascimentoJogador" {...register('NascimentoJogador')}/>
                <input type="text" className="ForJogador" {...register('ForJogador')}/>
                <input type="text" className="For1Jogador" {...register('For1Jogador')}/>
                <input type="text" className="For2Jogador" {...register('For2Jogador')}/>
                <input type="text" className="ConJogador" {...register('ConJogador')}/>
                <input type="text" className="Con1Jogador" {...register('Con1Jogador')}/>
                <input type="text" className="Con2Jogador" {...register('Con2Jogador')}/>
                <input type="text" className="TamJogador" {...register('TamJogador')}/>
                <input type="text" className="Tam1Jogador" {...register('Tam1Jogador')}/>
                <input type="text" className="Tam2Jogador" {...register('Tam2Jogador')}/>
                <input type="text" className="DesJogador" {...register('DesJogador')}/>
                <input type="text" className="Des1Jogador" {...register('Des1Jogador')}/>
                <input type="text" className="Des2Jogador" {...register('Des2Jogador')}/>
                <input type="text" className="ApaJogador" {...register('ApaJogador')}/>
                <input type="text" className="Apa1Jogador" {...register('Apa1Jogador')}/>
                <input type="text" className="Apa2Jogador" {...register('Apa2Jogador')}/>
                <input type="text" className="IntJogador" {...register('IntJogador')}/>
                <input type="text" className="Int1Jogador" {...register('Int1Jogador')}/>
                <input type="text" className="Int2Jogador" {...register('Int2Jogador')}/>
                <input type="text" className="PodJogador" {...register('PodJogador')}/>
                <input type="text" className="Pod1Jogador" {...register('Pod1Jogador')}/>
                <input type="text" className="Pod2Jogador" {...register('Pod2Jogador')}/>
                <input type="text" className="EduJogador" {...register('EduJogador')}/>
                <input type="text" className="Edu1Jogador" {...register('Edu1Jogador')}/>
                <input type="text" className="Edu2Jogador" {...register('Edu2Jogador')}/>
                <input type="text" className="TaxaMovJogador" {...register('TaxaMovJogador')}/>
                <div className="square-wrapper">
                  <input
                    type="radio"
                    className="TaxaMov1Jogador"
                    name="TaxaMov"
                    {...register('TaxaMov1Jogador')}/>
                  <input
                    type="radio"
                    className="TaxaMov2Jogador"
                    name="TaxaMov"
                    {...register('TaxaMov2Jogador')} />
                </div>
              </div>
              <div className="Meio">
                <input type="checkbox" className="LesaoGraveJogador" {...register('LesaoGraveJogador')}/>
                <input type="text" className="LesaoMaximoJogador" {...register('LesaoMaximoJogador')}/>
                <input type="checkbox" className="InsanidadeTempJogador" {...register('InsanidadeTempJogador')}/>
                <input type="checkbox" className="InsanidadeIndJogador" {...register('InsanidadeIndJogador')}/>
                <input type="text" className="InsanidadeIniJogador" {...register('InsanidadeIniJogador')}/>
                <input type="text" className="SorteJogador" {...register('SorteJogador')}/>
                <input type="text" className="PontosDeMagia" {...register('PontosDeMagia')}/>
              </div>
              <div className="Investigador">
                <input type="checkbox" className="jAntropologia" {...register('jAntropologia')}/>
                <input type="text" className="jAntropologia1" {...register('jAntropologia1')}/>
                <input type="text" className="jAntropologia2" {...register('jAntropologia2')}/>
                <input type="text" className="jAntropologia3" {...register('jAntropologia3')}/>

                <input type="checkbox" className="jFogo1" {...register('jFogo1')}/>
                <input type="text" className="jFogo2" {...register('jFogo2')}/>
                <input type="text" className="jFogo3" {...register('jFogo3')}/>
                <input type="text" className="jFogo4" {...register('jFogo4')}/>

                <input type="checkbox" className="jRifles1" {...register('jRifles1')}/>
                <input type="text" className="jRifles2" {...register('jRifles2')}/>
                <input type="text" className="jRifles3" {...register('jRifles3')}/>
                <input type="text" className="jRifles4" {...register('jRifles4')}/>

                <input type="checkbox" className="jArqueologia1" {...register('jArqueologia1')}/>
                <input type="text" className="jArqueologia2" {...register('jArqueologia2')}/>
                <input type="text" className="jArqueologia3" {...register('jArqueologia3')}/>
                <input type="text" className="jArqueologia4" {...register('jArqueologia4')}/>

                <input type="checkbox" className="jArremessar1" {...register('jArremessar1')}/>
                <input type="text" className="jArremessar2" {...register('jArremessar2')}/>
                <input type="text" className="jArremessar3" {...register('jArremessar3')}/>
                <input type="text" className="jArremessar4" {...register('jArremessar4')}/>

                <input type="checkbox" className="jArte1" {...register('jArte1')}/>
                <input type="text" className="jArte2" {...register('jArte2')}/>
                <input type="text" className="jArte3" {...register('jArte3')}/>
                <input type="text" className="jArte4" {...register('jArte4')}/>
                <input type="text" className="jArte5" {...register('jArte5')}/>

                <input type="checkbox" className="jVazio1" {...register('jVazio1')}/>
                <input type="text" className="jVazio2" {...register('jVazio2')}/>
                <input type="text" className="jVazio3" {...register('jVazio3')}/>
                <input type="text" className="jVazio4" {...register('jVazio4')}/>
                <input type="text" className="jVazio5" {...register('jVazio5')}/>

                <input type="checkbox" className="jVazio6" {...register('jVazio6')}/>
                <input type="text" className="jVazio7" {...register('jVazio7')}/>
                <input type="text" className="jVazio8" {...register('jVazio8')}/>
                <input type="text" className="jVazio9" {...register('jVazio9')}/>
                <input type="text" className="jVazio10" {...register('jVazio10')}/>

                <input type="checkbox" className="jVazio11" {...register('jVazio11')}/>
                <input type="text" className="jVazio12" {...register('jVazio12')}/>
                <input type="text" className="jVazio13" {...register('jVazio13')}/>
                <input type="text" className="jVazio14" {...register('jVazio14')}/>
                <input type="text" className="jVazio15" {...register('jVazio15')}/>

                <input type="checkbox" className="jAvaliacao1" {...register('jAvaliacao1')}/>
                <input type="text" className="jAvaliacao2" {...register('jAvaliacao2')}/>
                <input type="text" className="jAvaliacao3" {...register('jAvaliacao3')}/>
                <input type="text" className="jAvaliacao4" {...register('jAvaliacao4')}/>

                <input type="checkbox" className="jCavalgar1" {...register('jCavalgar1')}/>
                <input type="text" className="jCavalgar2" {...register('jCavalgar2')}/>
                <input type="text" className="jCavalgar3" {...register('jCavalgar3')}/>
                <input type="text" className="jCavalgar4" {...register('jCavalgar4')}/>

                <input type="checkbox" className="jCharme1" {...register('jCharme1')}/>
                <input type="text" className="jCharme2" {...register('jCharme2')}/>
                <input type="text" className="jCharme3" {...register('jCharme3')}/>
                <input type="text" className="jCharme4" {...register('jCharme4')}/>

                <input type="checkbox" className="jChaveiro1" {...register('jChaveiro1')}/>
                <input type="text" className="jChaveiro2" {...register('jChaveiro2')}/>
                <input type="text" className="jChaveiro3" {...register('jChaveiro3')}/>
                <input type="text" className="jChaveiro4" {...register('jChaveiro4')}/>

                <input type="checkbox" className="jCiencia1" {...register('jCiencia1')}/>
                <input type="text" className="jCiencia2" {...register('jCiencia2')}/>
                <input type="text" className="jCiencia3" {...register('jCiencia3')}/>
                <input type="text" className="jCiencia4" {...register('jCiencia4')}/>

                <input type="checkbox" className="jVazio16" {...register('jVazio16')}/>
                <input type="text" className="jVazio17" {...register('jVazio17')}/>
                <input type="text" className="jVazio18" {...register('jVazio18')}/>
                <input type="text" className="jVazio19" {...register('jVazio19')}/>
                <input type="text" className="jVazio20" {...register('jVazio20')}/>

                <input type="checkbox" className="jVazio21" {...register('jVazio21')}/>
                <input type="text" className="jVazio22" {...register('jVazio22')}/>
                <input type="text" className="jVazio23" {...register('jVazio23')}/>
                <input type="text" className="jVazio24" {...register('jVazio24')}/>
                <input type="text" className="jVazio25" {...register('jVazio25')}/>

                <input type="checkbox" className="jVazio26" {...register('jVazio26')}/>
                <input type="text" className="jVazio27" {...register('jVazio27')}/>
                <input type="text" className="jVazio28" {...register('jVazio28')}/>
                <input type="text" className="jVazio29" {...register('jVazio29')}/>
                <input type="text" className="jVazio30" {...register('jVazio30')}/>

                <input type="checkbox" className="jEletrico1" {...register('jEletrico1')}/>
                <input type="text" className="jEletrico2" {...register('jEletrico2')}/>
                <input type="text" className="jEletrico3" {...register('jEletrico3')}/>
                <input type="text" className="jEletrico4" {...register('jEletrico4')}/>

                <input type="checkbox" className="jMecanico1" {...register('jMecanico1')}/>
                <input type="text" className="jMecanico2" {...register('jMecanico2')}/>
                <input type="text" className="jMecanico3" {...register('jMecanico3')}/>
                <input type="text" className="jMecanico4" {...register('jMecanico4')}/>

                <input type="checkbox" className="jContabilidade1" {...register('jContabilidade1')}/>
                <input type="text" className="jContabilidade2" {...register('jContabilidade2')}/>
                <input type="text" className="jContabilidade3" {...register('jContabilidade3')}/>
                <input type="text" className="jContabilidade4" {...register('jContabilidade4')}/>

                <input type="checkbox" className="jDireito1" {...register('jDireito1')}/>
                <input type="text" className="jDireito2" {...register('jDireito2')}/>
                <input type="text" className="jDireito3" {...register('jDireito3')}/>
                <input type="text" className="jDireito4" {...register('jDireito4')}/>

                <input type="checkbox" className="jDirigir1" {...register('jDirigir1')}/>
                <input type="text" className="jDirigir2" {...register('jDirigir2')}/>
                <input type="text" className="jDirigir3" {...register('jDirigir3')}/>
                <input type="text" className="jDirigir4" {...register('jDirigir4')}/>

                <input type="checkbox" className="jDisfarce1" {...register('jDisfarce1')}/>
                <input type="text" className="jDisfarce2" {...register('jDisfarce2')}/>
                <input type="text" className="jDisfarce3" {...register('jDisfarce3')}/>
                <input type="text" className="jDisfarce4" {...register('jDisfarce4')}/>

                <input type="checkbox" className="jEncontrar1" {...register('jEncontrar1')}/>
                <input type="text" className="jEncontrar2" {...register('jEncontrar2')}/>
                <input type="text" className="jEncontrar3" {...register('jEncontrar3')}/>
                <input type="text" className="jEncontrar4" {...register('jEncontrar4')}/>

                <input type="checkbox" className="jEscutar1" {...register('jEscutar1')}/>
                <input type="text" className="jEscutar2" {...register('jEscutar2')}/>
                <input type="text" className="jEscutar3" {...register('jEscutar3')}/>
                <input type="text" className="jEscutar4" {...register('jEscutar4')}/>

                <input type="checkbox" className="jEscalar1" {...register('jEscalar1')}/>
                <input type="text" className="jEscalar2" {...register('jEscalar2')}/>
                <input type="text" className="jEscalar3" {...register('jEscalar3')}/>
                <input type="text" className="jEscalar4" {...register('jEscalar4')}/>

                <input type="checkbox" className="jEsquivar1" {...register('jEsquivar1')}/>
                <input type="text" className="jEsquivar2" {...register('jEsquivar2')}/>
                <input type="text" className="jEsquivar3" {...register('jEsquivar3')}/>
                <input type="text" className="jEsquivar4" {...register('jEsquivar4')}/>

                <input type="checkbox" className="jLabia1" {...register('jLabia1')}/>
                <input type="text" className="jLabia2" {...register('jLabia2')}/>
                <input type="text" className="jLabia3" {...register('jLabia3')}/>
                <input type="text" className="jLabia4" {...register('jLabia4')}/>

                <input type="checkbox" className="jIntimidacao1" {...register('jIntimidacao1')}/>
                <input type="text" className="jIntimidacao2" {...register('jIntimidacao2')}/>
                <input type="text" className="jIntimidacao3" {...register('jIntimidacao3')}/>
                <input type="text" className="jIntimidacao4" {...register('jIntimidacao4')}/>

                <input type="checkbox" className="jHistoria1" {...register('jHistoria1')}/>
                <input type="text" className="jHistoria2" {...register('jHistoria2')}/>
                <input type="text" className="jHistoria3" {...register('jHistoria3')}/>
                <input type="text" className="jHistoria4" {...register('jHistoria4')}/>

                <input type="checkbox" className="jFurtividade1" {...register('jFurtividade1')}/>
                <input type="text" className="jFurtividade2" {...register('jFurtividade2')}/>
                <input type="text" className="jFurtividade3" {...register('jFurtividade3')}/>
                <input type="text" className="jFurtividade4" {...register('jFurtividade4')}/>

                <input type="checkbox" className="jLinguaN1" {...register('jLinguaN1')}/>
                <input type="text" className="jLinguaN2" {...register('jLinguaN2')}/>
                <input type="text" className="jLinguaN3" {...register('jLinguaN3')}/>
                <input type="text" className="jLinguaN4" {...register('jLinguaN4')}/>
                <input type="text" className="jLinguaN5" {...register('jLinguaN5')}/>

                <input type="checkbox" className="jLinguaNN1" {...register('jLinguaNN1')}/>
                <input type="text" className="jLinguaNN2" {...register('jLinguaNN2')}/>
                <input type="text" className="jLinguaNN3" {...register('jLinguaNN3')}/>
                <input type="text" className="jLinguaNN4" {...register('jLinguaNN4')}/>
                <input type="text" className="jLinguaNN5" {...register('jLinguaNN5')}/>

                <input type="checkbox" className="jLingua1" {...register('jLingua1')}/>
                <input type="text" className="jLingua2" {...register('jLingua2')}/>
                <input type="text" className="jLingua3" {...register('jLingua3')}/>
                <input type="text" className="jLingua4" {...register('jLingua4')}/>
                <input type="text" className="jLingua5" {...register('jLingua5')}/>

                <input type="checkbox" className="jLingua6" {...register('jLingua6')}/>
                <input type="text" className="jLingua7" {...register('jLingua7')}/>
                <input type="text" className="jLingua8" {...register('jLingua8')}/>
                <input type="text" className="jLingua9" {...register('jLingua9')}/>
                <input type="text" className="jLingua10" {...register('jLingua10')}/>

                <input type="checkbox" className="jLingua11" {...register('jLingua11')}/>
                <input type="text" className="jLingua12" {...register('jLingua12')}/>
                <input type="text" className="jLingua13" {...register('jLingua13')}/>
                <input type="text" className="jLingua14" {...register('jLingua14')}/>
                <input type="text" className="jLingua15" {...register('jLingua15')}/>

                <input type="checkbox" className="jLingua16" {...register('jLingua16')}/>
                <input type="text" className="jLingua17" {...register('jLingua17')}/>
                <input type="text" className="jLingua18" {...register('jLingua18')}/>
                <input type="text" className="jLingua19" {...register('jLingua19')}/>
                <input type="text" className="jLingua20" {...register('jLingua20')}/>

                <input type="checkbox" className="jLutar1" {...register('jLutar1')}/>
                <input type="text" className="jLutar2" {...register('jLutar2')}/>
                <input type="text" className="jLutar3" {...register('jLutar3')}/>
                <input type="text" className="jLutar4" {...register('jLutar4')}/>

                <input type="checkbox" className="jNada1" {...register('jNada1')}/>
                <input type="text" className="jNada2" {...register('jNada2')}/>
                <input type="text" className="jNada3" {...register('jNada3')}/>
                <input type="text" className="jNada4" {...register('jNada4')}/>
                <input type="text" className="jNada5" {...register('jNada5')}/>

                <input type="checkbox" className="jMedicina1" {...register('jMedicina1')}/>
                <input type="text" className="jMedicina2" {...register('jMedicina2')}/>
                <input type="text" className="jMedicina3" {...register('jMedicina3')}/>
                <input type="text" className="jMedicina4" {...register('jMedicina4')}/>

                <input type="text" className="jMythos1" {...register('jMythos1')}/>
                <input type="text" className="jMythos2" {...register('jMythos2')}/>
                <input type="text" className="jMythos3" {...register('jMythos3')}/>

                <input type="checkbox" className="jMundo1" {...register('jMundo1')}/>
                <input type="text" className="jMundo2" {...register('jMundo2')}/>
                <input type="text" className="jMundo3" {...register('jMundo3')}/>
                <input type="text" className="jMundo4" {...register('jMundo4')}/>

                <input type="checkbox" className="jNatacao1" {...register('jNatacao1')}/>
                <input type="text" className="jNatacao2" {...register('jNatacao2')}/>
                <input type="text" className="jNatacao3" {...register('jNatacao3')}/>
                <input type="text" className="jNatacao4" {...register('jNatacao4')}/>

                <input type="checkbox" className="jNavegacao1" {...register('jNavegacao1')}/>
                <input type="text" className="jNavegacao2" {...register('jNavegacao2')}/>
                <input type="text" className="jNavegacao3" {...register('jNavegacao3')}/>
                <input type="text" className="jNavegacao4" {...register('jNavegacao4')}/>

                <input type="text" className="jCredito1" {...register('jCredito1')}/>
                <input type="text" className="jCredito2" {...register('jCredito2')}/>
                <input type="text" className="jCredito3" {...register('jCredito3')}/>

                <input type="checkbox" className="jOcultista1" {...register('jOcultista1')}/>
                <input type="text" className="jOcultista2" {...register('jOcultista2')}/>
                <input type="text" className="jOcultista3" {...register('jOcultista3')}/>
                <input type="text" className="jOcultista4" {...register('jOcultista4')}/>

                <input type="checkbox" className="jOperar1" {...register('jOperar1')}/>
                <input type="text" className="jOperar2" {...register('jOperar2')}/>
                <input type="text" className="jOperar3" {...register('jOperar3')}/>
                <input type="text" className="jOperar4" {...register('jOperar4')}/>

                <input type="checkbox" className="jPersuasao1" {...register('jPersuasao1')}/>
                <input type="text" className="jPersuasao2" {...register('jPersuasao2')}/>
                <input type="text" className="jPersuasao3" {...register('jPersuasao3')}/>
                <input type="text" className="jPersuasao4" {...register('jPersuasao4')}/>

                <input type="checkbox" className="jPilotar1" {...register('jPilotar1')}/>
                <input type="text" className="jPilotar2" {...register('jPilotar2')}/>
                <input type="text" className="jPilotar3" {...register('jPilotar3')}/>
                <input type="text" className="jPilotar4" {...register('jPilotar4')}/>

                <input type="checkbox" className="jAlgum1" {...register('jAlgum1')}/>
                <input type="text" className="jAlgum2" {...register('jAlgum2')}/>
                <input type="text" className="jAlgum3" {...register('jAlgum3')}/>
                <input type="text" className="jAlgum4" {...register('jAlgum4')}/>
                <input type="text" className="jAlgum5" {...register('jAlgum5')}/>

                <input type="checkbox" className="jDigitacao1" {...register('jDigitacao1')}/>
                <input type="text" className="jDigitacao2" {...register('jDigitacao2')}/>
                <input type="text" className="jDigitacao3" {...register('jDigitacao3')}/>
                <input type="text" className="jDigitacao4" {...register('jDigitacao4')}/>

                <input type="checkbox" className="jSocorro1" {...register('jSocorro1')}/>
                <input type="text" className="jSocorro2" {...register('jSocorro2')}/>
                <input type="text" className="jSocorro3" {...register('jSocorro3')}/>
                <input type="text" className="jSocorro4" {...register('jSocorro4')}/>

                <input type="checkbox" className="jPsicana1" {...register('jPsicana1')}/>
                <input type="text" className="jPsicana2" {...register('jPsicana2')}/>
                <input type="text" className="jPsicana3" {...register('jPsicana3')}/>
                <input type="text" className="jPsicana4" {...register('jPsicana4')}/>

                <input type="checkbox" className="jPsicologia1" {...register('jPsicologia1')}/>
                <input type="text" className="jPsicologia2" {...register('jPsicologia2')}/>
                <input type="text" className="jPsicologia3" {...register('jPsicologia3')}/>
                <input type="text" className="jPsicologia4" {...register('jPsicologia4')}/>

                <input type="checkbox" className="jSaltar1" {...register('jSaltar1')}/>
                <input type="text" className="jSaltar2" {...register('jSaltar2')}/>
                <input type="text" className="jSaltar3" {...register('jSaltar3')}/>
                <input type="text" className="jSaltar4" {...register('jSaltar4')}/>

                <input type="checkbox" className="jRastrear1" {...register('jRastrear1')}/>
                <input type="text" className="jRastrear2" {...register('jRastrear2')}/>
                <input type="text" className="jRastrear3" {...register('jRastrear3')}/>
                <input type="text" className="jRastrear4" {...register('jRastrear4')}/>

                <input type="checkbox" className="jSobrevivencia1" {...register('jSobrevivencia1')}/>
                <input type="text" className="jSobrevivencia2" {...register('jSobrevivencia2')}/>
                <input type="text" className="jSobrevivencia3" {...register('jSobrevivencia3')}/>
                <input type="text" className="jSobrevivencia4" {...register('jSobrevivencia4')}/>
                <input type="text" className="jSobrevivencia5" {...register('jSobrevivencia5')}/>

                <input type="checkbox" className="jBiblioteca1" {...register('jBiblioteca1')}/>
                <input type="text" className="jBiblioteca2" {...register('jBiblioteca2')}/>
                <input type="text" className="jBiblioteca3" {...register('jBiblioteca3')}/>
                <input type="text" className="jBiblioteca4" {...register('jBiblioteca4')}/>

                <input type="checkbox" className="jAdiciona1" {...register('jAdiciona1')}/>
                <input type="text" className="jAdiciona2" {...register('jAdiciona2')}/>
                <input type="text" className="jAdiciona3" {...register('jAdiciona3')}/>
                <input type="text" className="jAdiciona4" {...register('jAdiciona4')}/>
                <input type="text" className="jAdiciona5" {...register('jAdiciona5')}/>

                <input type="checkbox" className="jAdiciona6" {...register('jAdiciona6')}/>
                <input type="text" className="jAdiciona7" {...register('jAdiciona7')}/>
                <input type="text" className="jAdiciona8" {...register('jAdiciona8')}/>
                <input type="text" className="jAdiciona9" {...register('jAdiciona9')}/>
                <input type="text" className="jAdiciona10" {...register('jAdiciona10')}/>
              </div>
              <div className="ArmasCombate">
                <input type="text" className="jArmasDesarmada1" {...register('jArmasDesarmada1')}/>
                <input type="text" className="jArmasDesarmada2" {...register('jArmasDesarmada2')}/>

                <input type="text" className="jRegular1" {...register('jRegular1')}/>
                <input type="text" className="jRegular2" {...register('jRegular2')}/>

                <input type="text" className="jDificil1" {...register('jDificil1')}/>
                <input type="text" className="jDificil2" {...register('jDificil2')}/>

                <input type="text" className="jExtremo1" {...register('jExtremo1')}/>
                <input type="text" className="jExtremo2" {...register('jExtremo2')}/>

                <input type="text" className="jDanod1" {...register('jDanod1')}/>
                <input type="text" className="jDanod2" {...register('jDanod2')}/>

                <input type="text" className="jAlcanceTiro1" {...register('jAlcanceTiro1')}/>
                <input type="text" className="jAlcanceTiro2" {...register('jAlcanceTiro2')}/>

                <input type="text" className="jAtaquesa1" {...register('jAtaquesa1')}/>
                <input type="text" className="jAtaquesa2" {...register('jAtaquesa2')}/>

                <input type="text" className="jMunicao1" {...register('jMunicao1')}/>
                <input type="text" className="jMunicao2" {...register('jMunicao2')}/>

                <input type="text" className="jDefeitos1" {...register('jDefeitos1')}/>
                <input type="text" className="jDefeitos2" {...register('jDefeitos2')}/>

                <input type="text" className="jBonusDeDano" {...register('jBonusDeDano')}/>
                <input type="text" className="jCorpo" {...register('jCorpo')}/>
                <input type="text" className="jEsquivador" {...register('jEsquivador')}/>
                <input type="text" className="jEsquivador1" {...register('jEsquivador1')}/>
                <input type="text" className="jEsquivador2" {...register('jEsquivador2')}/>
              </div>
            </div>
            <div className="CallPage2" id="CallPage2">
              <img src={Imagem2} className="CallImagem2" alt="page2" />
              <div className="Tudo">
                <textarea className="jDescricao" {...register('jDescricao')}/>
                <textarea className="jCaracteristicas" {...register('jCaracteristicas')}/>
                <textarea className="jIdeologias" {...register('jIdeologias')}/>
                <textarea className="jCicatrizes" {...register('jCicatrizes')}/>
                <textarea className="jPessoas" {...register('jPessoas')}/>
                <textarea className="jFobias" {...register('jFobias')}/>
                <textarea className="jLocais" {...register('jLocais')}/>
                <textarea className="jTomos" {...register('jTomos')}/>
                <textarea className="jPertencesQuerido" {...register('jPertencesQuerido')}/>
                <textarea className="jEntidades" {...register('jEntidades')}/>
                <textarea className="jEquipamento" {...register('jEquipamento')}/>
                <textarea className="jPertences" {...register('jPertences')}/>
                <input type="text" className="jNivelGasto" {...register('jNivelGasto')}/>
                <input type="text" className="jDinheiro" {...register('jDinheiro')}/>
                <textarea className="jPatrimonio" {...register('jPatrimonio')}/>
              </div>
            </div>
          </div>
          <div className="BotaoSalvarCall">
            <button className="SalvarFichaCall">Salvar</button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
