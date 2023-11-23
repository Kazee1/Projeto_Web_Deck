import "../Styles/PaginaInicial.css";
import Footer from "./Footer";
import Header from "./Header";

import ImagemRPG from '../Imagens/Dados_resized.png'
import ImagemDD from '../Imagens/Dungeons_resized.png'
import ImagemCALL from  '../Imagens/cthulhu.png'

export default function PaginaInicial() {
  return (
    <>
      <Header />
      <main>
        <div className="InfosRPG">
        <div className="CorVermelho">
          <img src={ImagemRPG}/>
        <div className="RPGMESA">
          <h2>RPG de Mesa:</h2>
          <p>
            Bem-vindo ao mundo da aventura e da imaginação sem limites! Os jogos
            de RPG de mesa são portais para universos infinitos, onde histórias
            extraordinárias ganham vida. Neles, cada jogador se torna um herói
            em uma narrativa épica, moldando destinos, enfrentando desafios e
            explorando cenários repletos de magia e mistério. Nossa comunidade
            abraça a criatividade, a estratégia e a colaboração, oferecendo um
            espaço onde as fronteiras entre realidade e fantasia se dissipam,
            dando lugar a experiências únicas e inesquecíveis. Prepare-se para
            se aventurar em terras desconhecidas, onde sua imaginação é o único
            limite.
          </p>
        </div>
        </div>
        <div className="CorAzul">
          <img src={ImagemDD}/>
        <div className="DungeonsAndDragonsRPG">
          <h2>Dungeons & Dragons 5E:</h2>
          <p>
            Adentre os reinos mágicos de Dungeons & Dragons, a quinta encarnação
            de um legado lendário. Aqui, os jogadores são arquitetos de suas
            próprias sagas, explorando mundos épicos, desvendando mistérios
            ancestrais e enfrentando desafios monumentais. O sistema D&D 5E é a
            porta de entrada para uma jornada inesquecível, combinando regras
            flexíveis com uma estrutura sólida que permite que suas histórias
            ganhem vida. Seja você um aventureiro experiente ou alguém que está
            descobrindo os caminhos dos heróis pela primeira vez, prepare-se
            para mergulhar em um universo onde a imaginação se torna realidade e
            as lendas são escritas a cada jogada de dados.
          </p>
        </div>
        </div>
        <div className="CorLaranja">
          <img src={ImagemCALL}/>
        <div className="CallOfCthulhuRPG">
          <h2>Call Of Cthulhu</h2>
          <p>
            Call of Cthulhu: Adentre os abismos sombrios de Call of Cthulhu,
            onde a linha entre a sanidade e o horror se dissipa. Neste mundo
            repleto de mistérios cósmicos e perigos indescritíveis, cada
            investigador se torna uma pequena luz na imensidão da escuridão
            cósmica. Os jogadores enfrentam o desconhecido, desvendando segredos
            antigos e ocultos que desafiam a compreensão humana. O sistema de
            Call of Cthulhu é como um tomo antigo, repleto de regras precisas
            que guiam os passos em direção ao desconhecido, ao mesmo tempo em
            que sussurra para os jogadores sobre os horrores além da compreensão
            humana. Prepare-se para adentrar um mundo onde a loucura espreita à
            sombra de cada descoberta e onde a sobrevivência depende não apenas
            da astúcia, mas também da preservação da própria sanidade.
          </p>
        </div>
        </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}
