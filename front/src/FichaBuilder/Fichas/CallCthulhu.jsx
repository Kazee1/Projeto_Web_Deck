import Imagem1 from "../../Imagens/Fichas/CallCthulhu_page-00001.jpg";
import Imagem2 from "../../Imagens/Fichas/CallCthulhu_page-00002.jpg";

import Header from "../HeaderLogado";
import Footer from "../../Inicio/Footer";

import "../../Styles/Fichas/CallCthulhu.css";

export default function Cyberpunk() {
  return (
    <>
      <Header />
      <main>
        <div className="Save"></div>
        <div className="Ficha1">
          <div className="CallPage1">
            <img src={Imagem1} className="CallImagem1" alt="page1" />
            <div className="Cabeca">
              <input type="text" className="NomeJogador" />
              <input type="text" className="JogadorJogador" />
              <input type="text" className="OcupacaoJogador" />
              <input type="text" className="IdadeJogador" />
              <input type="text" className="SexoJogador" />
              <input type="text" className="ResidenciaJogador" />
              <input type="text" className="NascimentoJogador" />
              <input type="text" className="ForJogador" />
              <input type="text" className="For1Jogador" />
              <input type="text" className="For2Jogador" />
              <input type="text" className="ConJogador" />
              <input type="text" className="Con1Jogador" />
              <input type="text" className="Con2Jogador" />
              <input type="text" className="TamJogador" />
              <input type="text" className="Tam1Jogador" />
              <input type="text" className="Tam2Jogador" />
              <input type="text" className="DesJogador" />
              <input type="text" className="Des1Jogador" />
              <input type="text" className="Des2Jogador" />
              <input type="text" className="ApaJogador" />
              <input type="text" className="Apa1Jogador" />
              <input type="text" className="Apa2Jogador" />
              <input type="text" className="IntJogador" />
              <input type="text" className="Int1Jogador" />
              <input type="text" className="Int2Jogador" />
              <input type="text" className="PodJogador" />
              <input type="text" className="Pod1Jogador" />
              <input type="text" className="Pod2Jogador" />
              <input type="text" className="EduJogador" />
              <input type="text" className="Edu1Jogador" />
              <input type="text" className="Edu2Jogador" />
              <input type="text" className="TaxaMovJogador" />
              <div className="square-wrapper">
                <input
                  type="radio"
                  className="TaxaMov1Jogador"
                  name="TaxaMov"
                />
                <input
                  type="radio"
                  className="TaxaMov2Jogador"
                  name="TaxaMov"
                />
              </div>
            </div>
            <div className="Meio">
              <input type="checkbox" className="LesaoGraveJogador" />
              <input type="text" className="LesaoMaximoJogador" />
              <input type="checkbox" className="InsanidadeTempJogador" />
              <input type="checkbox" className="InsanidadeIndJogador" />
              <input type="text" className="InsanidadeIniJogador" />
              <input type="text" className="SorteJogador" />
              <input type="text" className="PontosDeMagia" />
            </div>
            <div className="Investigador">
              <input type="checkbox" className="jAntropologia" />
              <input type="text" className="jAntropologia1" />
              <input type="text" className="jAntropologia2" />
              <input type="text" className="jAntropologia3" />

              <input type="checkbox" className="jFogo1" />
              <input type="text" className="jFogo2" />
              <input type="text" className="jFogo3" />
              <input type="text" className="jFogo4" />

              <input type="checkbox" className="jRifles1" />
              <input type="text" className="jRifles2" />
              <input type="text" className="jRifles3" />
              <input type="text" className="jRifles4" />

              <input type="checkbox" className="jArqueologia1" />
              <input type="text" className="jArqueologia2" />
              <input type="text" className="jArqueologia3" />
              <input type="text" className="jArqueologia4" />

              <input type="checkbox" className="jArremessar1" />
              <input type="text" className="jArremessar2" />
              <input type="text" className="jArremessar3" />
              <input type="text" className="jArremessar4" />

              <input type="checkbox" className="jArte1" />
              <input type="text" className="jArte2" />
              <input type="text" className="jArte3" />
              <input type="text" className="jArte4" />
              <input type="text" className="jArte5" />

              <input type="checkbox" className="jVazio1" />
              <input type="text" className="jVazio2" />
              <input type="text" className="jVazio3" />
              <input type="text" className="jVazio4" />
              <input type="text" className="jVazio5" />

              <input type="checkbox" className="jVazio6" />
              <input type="text" className="jVazio7" />
              <input type="text" className="jVazio8" />
              <input type="text" className="jVazio9" />
              <input type="text" className="jVazio10" />

              <input type="checkbox" className="jVazio11" />
              <input type="text" className="jVazio12" />
              <input type="text" className="jVazio13" />
              <input type="text" className="jVazio14" />
              <input type="text" className="jVazio15" />

              <input type="checkbox" className="jAvaliacao1" />
              <input type="text" className="jAvaliacao2" />
              <input type="text" className="jAvaliacao3" />
              <input type="text" className="jAvaliacao4" />

              <input type="checkbox" className="jCavalgar1" />
              <input type="text" className="jCavalgar2" />
              <input type="text" className="jCavalgar3" />
              <input type="text" className="jCavalgar4" />

              <input type="checkbox" className="jCharme1" />
              <input type="text" className="jCharme2" />
              <input type="text" className="jCharme3" />
              <input type="text" className="jCharme4" />

              <input type="checkbox" className="jChaveiro1" />
              <input type="text" className="jChaveiro2" />
              <input type="text" className="jChaveiro3" />
              <input type="text" className="jChaveiro4" />

              <input type="checkbox" className="jCiencia1" />
              <input type="text" className="jCiencia2" />
              <input type="text" className="jCiencia3" />
              <input type="text" className="jCiencia4" />

              <input type="checkbox" className="jVazio16" />
              <input type="text" className="jVazio17" />
              <input type="text" className="jVazio18" />
              <input type="text" className="jVazio19" />
              <input type="text" className="jVazio20" />

              <input type="checkbox" className="jVazio21" />
              <input type="text" className="jVazio22" />
              <input type="text" className="jVazio23" />
              <input type="text" className="jVazio24" />
              <input type="text" className="jVazio25" />

              <input type="checkbox" className="jVazio26" />
              <input type="text" className="jVazio27" />
              <input type="text" className="jVazio28" />
              <input type="text" className="jVazio29" />
              <input type="text" className="jVazio30" />

              <input type="checkbox" className="jEletrico1" />
              <input type="text" className="jEletrico2" />
              <input type="text" className="jEletrico3" />
              <input type="text" className="jEletrico4" />

              <input type="checkbox" className="jMecanico1" />
              <input type="text" className="jMecanico2" />
              <input type="text" className="jMecanico3" />
              <input type="text" className="jMecanico4" />

              <input type="checkbox" className="jContabilidade1" />
              <input type="text" className="jContabilidade2" />
              <input type="text" className="jContabilidade3" />
              <input type="text" className="jContabilidade4" />

              <input type="checkbox" className="jDireito1" />
              <input type="text" className="jDireito2" />
              <input type="text" className="jDireito3" />
              <input type="text" className="jDireito4" />

              <input type="checkbox" className="jDirigir1" />
              <input type="text" className="jDirigir2" />
              <input type="text" className="jDirigir3" />
              <input type="text" className="jDirigir4" />

              <input type="checkbox" className="jDisfarce1" />
              <input type="text" className="jDisfarce2" />
              <input type="text" className="jDisfarce3" />
              <input type="text" className="jDisfarce4" />

              <input type="checkbox" className="jEncontrar1" />
              <input type="text" className="jEncontrar2" />
              <input type="text" className="jEncontrar3" />
              <input type="text" className="jEncontrar4" />

              <input type="checkbox" className="jEscutar1" />
              <input type="text" className="jEscutar2" />
              <input type="text" className="jEscutar3" />
              <input type="text" className="jEscutar4" />

              <input type="checkbox" className="jEscalar1" />
              <input type="text" className="jEscalar2" />
              <input type="text" className="jEscalar3" />
              <input type="text" className="jEscalar4" />

              <input type="checkbox" className="jEsquivar1" />
              <input type="text" className="jEsquivar2" />
              <input type="text" className="jEsquivar3" />
              <input type="text" className="jEsquivar4" />

              <input type="checkbox" className="jLabia1" />
              <input type="text" className="jLabia2" />
              <input type="text" className="jLabia3" />
              <input type="text" className="jLabia4" />

              <input type="checkbox" className="jIntimidacao1" />
              <input type="text" className="jIntimidacao2" />
              <input type="text" className="jIntimidacao3" />
              <input type="text" className="jIntimidacao4" />

              <input type="checkbox" className="jHistoria1" />
              <input type="text" className="jHistoria2" />
              <input type="text" className="jHistoria3" />
              <input type="text" className="jHistoria4" />

              <input type="checkbox" className="jFurtividade1" />
              <input type="text" className="jFurtividade2" />
              <input type="text" className="jFurtividade3" />
              <input type="text" className="jFurtividade4" />

              <input type="checkbox" className="jLinguaN1" />
              <input type="text" className="jLinguaN2" />
              <input type="text" className="jLinguaN3" />
              <input type="text" className="jLinguaN4" />
              <input type="text" className="jLinguaN5" />

              <input type="checkbox" className="jLinguaNN1" />
              <input type="text" className="jLinguaNN2" />
              <input type="text" className="jLinguaNN3" />
              <input type="text" className="jLinguaNN4" />
              <input type="text" className="jLinguaNN5" />

              <input type="checkbox" className="jLingua1" />
              <input type="text" className="jLingua2" />
              <input type="text" className="jLingua3" />
              <input type="text" className="jLingua4" />
              <input type="text" className="jLingua5" />

              <input type="checkbox" className="jLingua6" />
              <input type="text" className="jLingua7" />
              <input type="text" className="jLingua8" />
              <input type="text" className="jLingua9" />
              <input type="text" className="jLingua10" />

              <input type="checkbox" className="jLingua11" />
              <input type="text" className="jLingua12" />
              <input type="text" className="jLingua13" />
              <input type="text" className="jLingua14" />
              <input type="text" className="jLingua15" />

              <input type="checkbox" className="jLingua16" />
              <input type="text" className="jLingua17" />
              <input type="text" className="jLingua18" />
              <input type="text" className="jLingua19" />
              <input type="text" className="jLingua20" />

              <input type="checkbox" className="jLutar1" />
              <input type="text" className="jLutar2" />
              <input type="text" className="jLutar3" />
              <input type="text" className="jLutar4" />

              <input type="checkbox" className="jNada1" />
              <input type="text" className="jNada2" />
              <input type="text" className="jNada3" />
              <input type="text" className="jNada4" />
              <input type="text" className="jNada5" />

              <input type="checkbox" className="jMedicina1" />
              <input type="text" className="jMedicina2" />
              <input type="text" className="jMedicina3" />
              <input type="text" className="jMedicina4" />

              <input type="text" className="jMythos1" />
              <input type="text" className="jMythos2" />
              <input type="text" className="jMythos3" />

              <input type="checkbox" className="jMundo1" />
              <input type="text" className="jMundo2" />
              <input type="text" className="jMundo3" />
              <input type="text" className="jMundo4" />

              <input type="checkbox" className="jNatacao1" />
              <input type="text" className="jNatacao2" />
              <input type="text" className="jNatacao3" />
              <input type="text" className="jNatacao4" />

              <input type="checkbox" className="jNavegacao1" />
              <input type="text" className="jNavegacao2" />
              <input type="text" className="jNavegacao3" />
              <input type="text" className="jNavegacao4" />

              <input type="text" className="jCredito1" />
              <input type="text" className="jCredito2" />
              <input type="text" className="jCredito3" />

              <input type="checkbox" className="jOcultista1" />
              <input type="text" className="jOcultista2" />
              <input type="text" className="jOcultista3" />
              <input type="text" className="jOcultista4" />

              <input type="checkbox" className="jOperar1" />
              <input type="text" className="jOperar2" />
              <input type="text" className="jOperar3" />
              <input type="text" className="jOperar4" />

              <input type="checkbox" className="jPersuasao1" />
              <input type="text" className="jPersuasao2" />
              <input type="text" className="jPersuasao3" />
              <input type="text" className="jPersuasao4" />

              <input type="checkbox" className="jPilotar1" />
              <input type="text" className="jPilotar2" />
              <input type="text" className="jPilotar3" />
              <input type="text" className="jPilotar4" />

              <input type="checkbox" className="jAlgum1" />
              <input type="text" className="jAlgum2" />
              <input type="text" className="jAlgum3" />
              <input type="text" className="jAlgum4" />
              <input type="text" className="jAlgum5" />

              <input type="checkbox" className="jDigitacao1" />
              <input type="text" className="jDigitacao2" />
              <input type="text" className="jDigitacao3" />
              <input type="text" className="jDigitacao4" />

              <input type="checkbox" className="jSocorro1" />
              <input type="text" className="jSocorro2" />
              <input type="text" className="jSocorro3" />
              <input type="text" className="jSocorro4" />

              <input type="checkbox" className="jPsicana1" />
              <input type="text" className="jPsicana2" />
              <input type="text" className="jPsicana3" />
              <input type="text" className="jPsicana4" />

              <input type="checkbox" className="jPsicologia1" />
              <input type="text" className="jPsicologia2" />
              <input type="text" className="jPsicologia3" />
              <input type="text" className="jPsicologia4" />

              <input type="checkbox" className="jSaltar1" />
              <input type="text" className="jSaltar2" />
              <input type="text" className="jSaltar3" />
              <input type="text" className="jSaltar4" />

              <input type="checkbox" className="jRastrear1" />
              <input type="text" className="jRastrear2" />
              <input type="text" className="jRastrear3" />
              <input type="text" className="jRastrear4" />

              <input type="checkbox" className="jSobrevivencia1" />
              <input type="text" className="jSobrevivencia2" />
              <input type="text" className="jSobrevivencia3" />
              <input type="text" className="jSobrevivencia4" />
              <input type="text" className="jSobrevivencia5" />

              <input type="checkbox" className="jBiblioteca1" />
              <input type="text" className="jBiblioteca2" />
              <input type="text" className="jBiblioteca3" />
              <input type="text" className="jBiblioteca4" />

              <input type="checkbox" className="jAdiciona1" />
              <input type="text" className="jAdiciona2" />
              <input type="text" className="jAdiciona3" />
              <input type="text" className="jAdiciona4" />
              <input type="text" className="jAdiciona5" />

              <input type="checkbox" className="jAdiciona6" />
              <input type="text" className="jAdiciona7" />
              <input type="text" className="jAdiciona8" />
              <input type="text" className="jAdiciona9" />
              <input type="text" className="jAdiciona10" />
            </div>
            <div className="ArmasCombate">
              <input type="text" className="jArmasDesarmada1" />
              <input type="text" className="jArmasDesarmada2" />

              <input type="text" className="jRegular1" />
              <input type="text" className="jRegular2" />

              <input type="text" className="jDificil1" />
              <input type="text" className="jDificil2" />

              <input type="text" className="jExtremo1" />
              <input type="text" className="jExtremo2" />

              <input type="text" className="jDanod1" />
              <input type="text" className="jDanod2" />

              <input type="text" className="jAlcanceTiro1" />
              <input type="text" className="jAlcanceTiro2" />

              <input type="text" className="jAtaquesa1" />
              <input type="text" className="jAtaquesa2" />

              <input type="text" className="jMunicao1" />
              <input type="text" className="jMunicao2" />

              <input type="text" className="jDefeitos1" />
              <input type="text" className="jDefeitos2" />

              <input type="text" className="jBonusDeDano" />
              <input type="text" className="jCorpo" />
              <input type="text" className="jEsquivador" />
              <input type="text" className="jEsquivador1" />
              <input type="text" className="jEsquivador2" />
            </div>
          </div>
          <div className="CallPage2">
            <img src={Imagem2} className="CallImagem2" alt="page2" />
            <div className="Tudo">
              <textarea className="jDescricao" />
              <textarea className="jCaracteristicas" />
              <textarea className="jIdeologias" />
              <textarea className="jCicatrizes" />
              <textarea className="jPessoas"/>
              <textarea className="jFobias"/>
              <textarea className="jLocais"/>
              <textarea className="jTomos"/>
              <textarea className="jPertencesQuerido"/>
              <textarea className="jEntidades"/>
              <textarea className="jEquipamento"/>
              <textarea className="jPertences"/>
              <input type="text" className="jNivelGasto"/>
              <input type="text" className="jDinheiro"/>
              <textarea className="jPatrimonio"/>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
