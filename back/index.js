require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());
let IdUser;

app.listen(3000, () => {
  console.log("Servidor na porta 3000");
});


app.post("/Cadastro", async (req, res) => {
  const { username, email, password } = req.body;
  const banco = path.join(__dirname, ".", "db", "banco_dados_usuario.json");
  const usuarios = JSON.parse(
    fs.readFileSync(banco, { encoding: "utf8", flag: "r" })
  );
  for (let usurario of usuarios) {
    if (usurario.email === email) {
      return res.status(409).send(`Usuario com email ${email} já existe.`);
    }
    if (usurario.username === username) {
      return res.status(409).send(`Usuario com email ${email} já existe.`);
    }
  }

  const id = usuarios.length + 1;

  const salt = await bcrypt.genSalt(10);
  const passwordCrypt = await bcrypt.hash(password, salt);

  const Usuario = {
    id: id,
    username: username,
    email: email,
    password: passwordCrypt,
  };
  usuarios.push(Usuario);
  fs.writeFileSync(banco, JSON.stringify(usuarios, null, 2));
  res.send(`Tudo certo usuario criado com sucesso.`);
});

app.post("/Login", async (req, res) => {
  const { username, password } = req.body;
  const banco = path.join(__dirname, ".", "db", "banco_dados_usuario.json");
  const usuarios = JSON.parse(
    fs.readFileSync(banco, { encoding: "utf8", flag: "r" })
  );

  for (let user of usuarios) {
    if (user.username === username) {
      const passwordValidado = await bcrypt.compare(password, user.password);
      if (passwordValidado) {
        const token = jwt.sign({ id: user.id }, process.env.TOKEN);
        return res.json({ token: token });
      } else return res.status(422).send(`Usuario ou senhas incorretas.`);
    }
  }


  return res
    .status(409)
    .send(`${username} não existe. Considere criar uma conta!`);
});

app.post("/setting", async (req, res) => {
  const {
    PasswordLayout,
    NewUsernameLayout,
    NewPasswordLayout,
    ConfirmPasswordLayout,
    NewEmailLayout,
  } = req.body;

  const banco = path.join(__dirname, ".", "db", "banco_dados_usuario.json");
  const usuarios = JSON.parse(
    fs.readFileSync(banco, { encoding: "utf8", flag: "r" })
  );
  for (let user of usuarios) {
    if (user.id === IdUser) {
      const passwordValidado = await bcrypt.compare(
        PasswordLayout,
        user.password
      );
      if (passwordValidado) {
        if (NewPasswordLayout !== undefined) {
          const salt = await bcrypt.genSalt(10);
          const passwordCrypt = await bcrypt.hash(NewPasswordLayout, salt);
          user.password = passwordCrypt;
        }
        if (NewUsernameLayout !== undefined) {
          user.username = NewUsernameLayout;
        }
        if (NewEmailLayout !== undefined) {
          user.email = NewEmailLayout;
        }
        console.log("altereados");
      } else {
        console.log("senha incorreta");
        return res.status(422).send(`Senha incorreta!`);
      }
    }
  }
  fs.writeFileSync(banco, JSON.stringify(usuarios, null, 2));
  res.send(`Tudo certo alterações feita com sucesso.`);
});
app.post("/setting", async (req, res) => {
  const {
    PasswordLayout,
    NewUsernameLayout,
    NewPasswordLayout,
    ConfirmPasswordLayout,
    NewEmailLayout,
  } = req.body;

  const banco = path.join(__dirname, ".", "db", "banco_dados_usuario.json");
  const usuarios = JSON.parse(
    fs.readFileSync(banco, { encoding: "utf8", flag: "r" })
  );
  for (let user of usuarios) {
    if (user.id === IdUser) {
      const passwordValidado = await bcrypt.compare(
        PasswordLayout,
        user.password
      );
      if (passwordValidado) {
        if (NewPasswordLayout !== undefined) {
          const salt = await bcrypt.genSalt(10);
          const passwordCrypt = await bcrypt.hash(NewPasswordLayout, salt);
          user.password = passwordCrypt;
        }
        if (NewUsernameLayout !== undefined) {
          user.username = NewUsernameLayout;
        }
        if (NewEmailLayout !== undefined) {
          user.email = NewEmailLayout;
        }
        console.log("altereados");
      } else {
        console.log("senha incorreta");
        return res.status(422).send(`Senha incorreta!`);
      }
    }
  }
  fs.writeFileSync(banco, JSON.stringify(usuarios, null, 2));
  res.send(`Tudo certo alterações feita com sucesso.`);
});

app.post("/DungeonsDragons", async (req, res) => {
  const {
    NomeDD,
    NomePerso,
    Class_Nivel,
    Antecedente,
    NomeDoJogador,
    Raca,
    Tendencia,
    Experiencia,
    Forca,
    ForcaBonus,
    Destreza,
    DestrezaBonus,
    Constituicao,
    ConstituicaoBonus,
    Inteligencia,
    InteligenciaBonus,
    Sabedoria,
    SabedoriaBonus,
    Carisma,
    CarismaBonus,
    Inspiracao,
    Proficiencia,
    radioForca,
    SubForca,
    radioDestreza,
    SubDestreza,
    radioConstituicao,
    SubConstituicao,
    radioInteligencia,
    SubInteligencia,
    radioSabedoria,
    SubSabedoria,
    radioCarisma,
    SubCarisma,
    radioAcrobacia,
    SubAcrobacia,
    radioArcanismo,
    SubArcanismo,
    radioAtletismo,
    SubAtletismo,
    radioAtuacao,
    SubAtuacao,
    radioEnganacao,
    SubEnganacao,
    radioFurtividade,
    SubFurtividade,
    radioHistoria,
    SubHistoria,
    radioIntimidacao,
    SubIntimidacao,
    radioIntuicao,
    SubIntuicao,
    radioInvestigacao,
    SubInvestigacao,
    radioAnimais,
    SubAnimais,
    radioMedicina,
    SubMedicina,
    radioNatureza,
    SubNatureza,
    radioPercepcao,
    SubPercepcao,
    radioPersuasao,
    SubPersuasao,
    radioPrestigio,
    SubPrestigio,
    radioReligiao,
    SubReligiao,
    radioSobrevivencia,
    SubSobrevivencia,
    Armadura,
    Iniciativa,
    Deslocamento,
    VidaMaxima,
    VidaAtual,
    VidaTemporaria,
    DadosVidaTotal,
    DadosVida,
    Sucesso1,
    Sucesso2,
    Sucesso3,
    Fracasso1,
    Fracasso2,
    Fracasso3,
    NomeAtaque1,
    BonusAtaque1,
    DTAtaque1,
    NomeAtaque2,
    BonusAtaque2,
    DTAtaque2,
    NomeAtaque3,
    BonusAtaque3,
    DTAtaque3,
    Magias,
    SabedoriaPassiva,
    Idiomas,
    Personalidade,
    Ideias,
    Ligacoes,
    Defeitos,
    Caracteristicas,
    PC,
    PP,
    PE,
    PO,
    PL,
    Equipamento,
    NomePerso1,
    Idade,
    Altura,
    Peso,
    Olhos,
    Pele,
    Cabelo,
    Orgs,
    Guilda,
    TalentosAdicionais,
    Tesouros,
    HistoriaPersonagem,
    ClasseConjurador,
    HabilidadeChave,
    CD,
    ModificadorAtaque,
    Truque1,
    Truque2,
    Truque3,
    Truque4,
    Truque5,
    Truque6,
    Truque7,
    Truque8,
    EspacoTotal1,
    EspacoUtilizado1,
    CheckNivel1_1,
    SlotNivel1_1,
    CheckNivel1_2,
    SlotNivel1_2,
    CheckNivel1_3,
    SlotNivel1_3,
    CheckNivel1_4,
    SlotNivel1_4,
    CheckNivel1_5,
    SlotNivel1_5,
    CheckNivel1_6,
    SlotNivel1_6,
    CheckNivel1_7,
    SlotNivel1_7,
    CheckNivel1_8,
    SlotNivel1_8,
    CheckNivel1_9,
    SlotNivel1_9,
    CheckNivel1_10,
    SlotNivel1_10,
    CheckNivel1_11,
    SlotNivel1_11,
    CheckNivel1_12,
    SlotNivel1_12,
    CheckNivel1_13,
    SlotNivel1_13,
    EspacoTotal2,
    EspacoUtilizado2,
    CheckNivel2_1,
    SlotNivel2_1,
    CheckNivel2_2,
    SlotNivel2_2,
    CheckNivel2_3,
    SlotNivel2_3,
    CheckNivel2_4,
    SlotNivel2_4,
    CheckNivel2_5,
    SlotNivel2_5,
    CheckNivel2_6,
    SlotNivel2_6,
    CheckNivel2_7,
    SlotNivel2_7,
    CheckNivel2_8,
    SlotNivel2_8,
    CheckNivel2_9,
    SlotNivel2_9,
    CheckNivel2_10,
    SlotNivel2_10,
    CheckNivel2_11,
    SlotNivel2_11,
    CheckNivel2_12,
    SlotNivel2_12,
    CheckNivel2_13,
    SlotNivel2_13,
    EspacoTotal3,
    EspacoUtilizado3,
    CheckNivel3_1,
    SlotNivel3_1,
    CheckNivel3_2,
    SlotNivel3_2,
    CheckNivel3_3,
    SlotNivel3_3,
    CheckNivel3_4,
    SlotNivel3_4,
    CheckNivel3_5,
    SlotNivel3_5,
    CheckNivel3_6,
    SlotNivel3_6,
    CheckNivel3_7,
    SlotNivel3_7,
    CheckNivel3_8,
    SlotNivel3_8,
    CheckNivel3_9,
    SlotNivel3_9,
    CheckNivel3_10,
    SlotNivel3_10,
    CheckNivel3_11,
    SlotNivel3_11,
    CheckNivel3_12,
    SlotNivel3_12,
    CheckNivel3_13,
    SlotNivel3_13,
    EspacoTotal4,
    EspacoUtilizado4,
    CheckNivel4_1,
    SlotNivel4_1,
    CheckNivel4_2,
    SlotNivel4_2,
    CheckNivel4_3,
    SlotNivel4_3,
    CheckNivel4_4,
    SlotNivel4_4,
    CheckNivel4_5,
    SlotNivel4_5,
    CheckNivel4_6,
    SlotNivel4_6,
    CheckNivel4_7,
    SlotNivel4_7,
    CheckNivel4_8,
    SlotNivel4_8,
    CheckNivel4_9,
    SlotNivel4_9,
    CheckNivel4_10,
    SlotNivel4_10,
    CheckNivel4_11,
    SlotNivel4_11,
    CheckNivel4_12,
    SlotNivel4_12,
    CheckNivel4_13,
    SlotNivel4_13,
    EspacoTotal5,
    EspacoUtilizado5,
    CheckNivel5_1,
    SlotNivel5_1,
    CheckNivel5_2,
    SlotNivel5_2,
    CheckNivel5_3,
    SlotNivel5_3,
    CheckNivel5_4,
    SlotNivel5_4,
    CheckNivel5_5,
    SlotNivel5_5,
    CheckNivel5_6,
    SlotNivel5_6,
    CheckNivel5_7,
    SlotNivel5_7,
    CheckNivel5_8,
    SlotNivel5_8,
    CheckNivel5_9,
    SlotNivel5_9,
    EspacoTotal6,
    EspacoUtilizado6,
    CheckNivel6_1,
    SlotNivel6_1,
    CheckNivel6_2,
    SlotNivel6_2,
    CheckNivel6_3,
    SlotNivel6_3,
    CheckNivel6_4,
    SlotNivel6_4,
    CheckNivel6_5,
    SlotNivel6_5,
    CheckNivel6_6,
    SlotNivel6_6,
    CheckNivel6_7,
    SlotNivel6_7,
    CheckNivel6_8,
    SlotNivel6_8,
    CheckNivel6_9,
    SlotNivel6_9,
    EspacoTotal7,
    EspacoUtilizado7,
    CheckNivel7_1,
    SlotNivel7_1,
    CheckNivel7_2,
    SlotNivel7_2,
    CheckNivel7_3,
    SlotNivel7_3,
    CheckNivel7_4,
    SlotNivel7_4,
    CheckNivel7_5,
    SlotNivel7_5,
    CheckNivel7_6,
    SlotNivel7_6,
    CheckNivel7_7,
    SlotNivel7_7,
    CheckNivel7_8,
    SlotNivel7_8,
    CheckNivel7_9,
    SlotNivel7_9,
    EspacoTotal8,
    EspacoUtilizado8,
    CheckNivel8_1,
    SlotNivel8_1,
    CheckNivel8_2,
    SlotNivel8_2,
    CheckNivel8_3,
    SlotNivel8_3,
    CheckNivel8_4,
    SlotNivel8_4,
    CheckNivel8_5,
    SlotNivel8_5,
    CheckNivel8_6,
    SlotNivel8_6,
    CheckNivel8_7,
    SlotNivel8_7,
    EspacoTota9,
    EspacoUtilizado9,
    CheckNive9_1,
    SlotNive9_1,
    CheckNive9_2,
    SlotNive9_2,
    CheckNive9_3,
    SlotNive9_3,
    CheckNive9_4,
    SlotNive9_4,
    CheckNive9_5,
    SlotNive9_5,
    CheckNive9_6,
    SlotNive9_6,
    CheckNive9_7,
    SlotNive9_7,
  } = req.body;

  const banco = path.join(__dirname, ".", "db", "banco_dados_fichas.json");
  const fichas = JSON.parse(
    fs.readFileSync(banco, { encoding: "utf8", flag: "r" })
  );
  const id = fichas.length + 1;

  const ficha = {
    idUsuario: IdUser,
    id: id,
    tipo: "fichaDungeons",
    NomeFicha: NomeDD,
    NomePerso: NomePerso,
    Class_Nivel: Class_Nivel,
    Antecedente: Antecedente,
    NomeDoJogador: NomeDoJogador,
    Raca: Raca,
    Tendencia: Tendencia,
    Experiencia: Experiencia,
    Forca: Forca,
    ForcaBonus: ForcaBonus,
    Destreza: Destreza,
    DestrezaBonus: DestrezaBonus,
    Constituicao: Constituicao,
    ConstituicaoBonus: ConstituicaoBonus,
    Inteligencia: Inteligencia,
    InteligenciaBonus: InteligenciaBonus,
    Sabedoria: Sabedoria,
    SabedoriaBonus: SabedoriaBonus,
    Carisma: Carisma,
    CarismaBonus: CarismaBonus,
    Inspiracao: Inspiracao,
    Proficiencia: Proficiencia,
    radioForca: radioForca,
    SubForca: SubForca,
    radioDestreza: radioDestreza,
    SubDestreza: SubDestreza,
    radioConstituicao: radioConstituicao,
    SubConstituicao: SubConstituicao,
    radioInteligencia: radioInteligencia,
    SubInteligencia: SubInteligencia,
    radioSabedoria: radioSabedoria,
    SubSabedoria: SubSabedoria,
    radioCarisma: radioCarisma,
    SubCarisma: SubCarisma,
    radioAcrobacia: radioAcrobacia,
    SubAcrobacia: SubAcrobacia,
    radioArcanismo: radioArcanismo,
    SubArcanismo: SubArcanismo,
    radioAtletismo: radioAtletismo,
    SubAtletismo: SubAtletismo,
    radioAtuacao: radioAtuacao,
    SubAtuacao: SubAtuacao,
    radioEnganacao: radioEnganacao,
    SubEnganacao: SubEnganacao,
    radioFurtividade: radioFurtividade,
    SubFurtividade: SubFurtividade,
    radioHistoria: radioHistoria,
    SubHistoria: SubHistoria,
    radioIntimidacao: radioIntimidacao,
    SubIntimidacao: SubIntimidacao,
    radioIntuicao: radioIntuicao,
    SubIntuicao: SubIntuicao,
    radioInvestigacao: radioInvestigacao,
    SubInvestigacao: SubInvestigacao,
    radioAnimais: radioAnimais,
    SubAnimais: SubAnimais,
    radioMedicina: radioMedicina,
    SubMedicina: SubMedicina,
    radioNatureza: radioNatureza,
    SubNatureza: SubNatureza,
    radioPercepcao: radioPercepcao,
    SubPercepcao: SubPercepcao,
    radioPersuasao: radioPersuasao,
    SubPersuasao: SubPersuasao,
    radioPrestigio: radioPrestigio,
    SubPrestigio: SubPrestigio,
    radioReligiao: radioReligiao,
    SubReligiao: SubReligiao,
    radioSobrevivencia: radioSobrevivencia,
    SubSobrevivencia: SubSobrevivencia,
    Armadura: Armadura,
    Iniciativa: Iniciativa,
    Deslocamento: Deslocamento,
    VidaMaxima: VidaMaxima,
    VidaAtual: VidaAtual,
    VidaTemporaria: VidaTemporaria,
    DadosVidaTotal: DadosVidaTotal,
    DadosVida: DadosVida,
    Sucesso1: Sucesso1,
    Sucesso2: Sucesso2,
    Sucesso3: Sucesso3,
    Fracasso1: Fracasso1,
    Fracasso2: Fracasso2,
    Fracasso3: Fracasso3,
    NomeAtaque1: NomeAtaque1,
    BonusAtaque1: BonusAtaque1,
    DTAtaque1: DTAtaque1,
    NomeAtaque2: NomeAtaque2,
    BonusAtaque2: BonusAtaque2,
    DTAtaque2: DTAtaque2,
    NomeAtaque3: NomeAtaque3,
    BonusAtaque3: BonusAtaque3,
    DTAtaque3: DTAtaque3,
    Magias: Magias,
    SabedoriaPassiva: SabedoriaPassiva,
    Idiomas: Idiomas,
    Personalidade: Personalidade,
    Ideias: Ideias,
    Ligacoes: Ligacoes,
    Defeitos: Defeitos,
    Caracteristicas: Caracteristicas,
    PC: PC,
    PP: PP,
    PE: PE,
    PO: PO,
    PL: PL,
    Equipamento: Equipamento,
    NomePerso1: NomePerso1,
    Idade: Idade,
    Altura: Altura,
    Peso: Peso,
    Olhos: Olhos,
    Pele: Pele,
    Cabelo: Cabelo,
    Orgs: Orgs,
    Guilda: Guilda,
    TalentosAdicionais: TalentosAdicionais,
    Tesouros: Tesouros,
    HistoriaPersonagem: HistoriaPersonagem,
    ClasseConjurador: ClasseConjurador,
    HabilidadeChave: HabilidadeChave,
    CD: CD,
    ModificadorAtaque: ModificadorAtaque,
    Truque1: Truque1,
    Truque2: Truque2,
    Truque3: Truque3,
    Truque4: Truque4,
    Truque5: Truque5,
    Truque6: Truque6,
    Truque7: Truque7,
    Truque8: Truque8,
    EspacoTotal1: EspacoTotal1,
    EspacoUtilizado1: EspacoUtilizado1,
    CheckNivel1_1: CheckNivel1_1,
    SlotNivel1_1: SlotNivel1_1,
    CheckNivel1_2: CheckNivel1_2,
    SlotNivel1_2: SlotNivel1_2,
    CheckNivel1_3: CheckNivel1_3,
    SlotNivel1_3: SlotNivel1_3,
    CheckNivel1_4: CheckNivel1_4,
    SlotNivel1_4: SlotNivel1_4,
    CheckNivel1_5: CheckNivel1_5,
    SlotNivel1_5: SlotNivel1_5,
    CheckNivel1_6: CheckNivel1_6,
    SlotNivel1_6: SlotNivel1_6,
    CheckNivel1_7: CheckNivel1_7,
    SlotNivel1_7: SlotNivel1_7,
    CheckNivel1_8: CheckNivel1_8,
    SlotNivel1_8: SlotNivel1_8,
    CheckNivel1_9: CheckNivel1_9,
    SlotNivel1_9: SlotNivel1_9,
    CheckNivel1_10: CheckNivel1_10,
    SlotNivel1_10: SlotNivel1_10,
    CheckNivel1_11: CheckNivel1_11,
    SlotNivel1_11: SlotNivel1_11,
    CheckNivel1_12: CheckNivel1_12,
    SlotNivel1_12: SlotNivel1_12,
    CheckNivel1_13: CheckNivel1_13,
    SlotNivel1_13: SlotNivel1_13,
    EspacoTotal2: EspacoTotal2,
    EspacoUtilizado2: EspacoUtilizado2,
    CheckNivel2_1: CheckNivel2_1,
    SlotNivel2_1: SlotNivel2_1,
    CheckNivel2_2: CheckNivel2_2,
    SlotNivel2_2: SlotNivel2_2,
    CheckNivel2_3: CheckNivel2_3,
    SlotNivel2_3: SlotNivel2_3,
    CheckNivel2_4: CheckNivel2_4,
    SlotNivel2_4: SlotNivel2_4,
    CheckNivel2_5: CheckNivel2_5,
    SlotNivel2_5: SlotNivel2_5,
    CheckNivel2_6: CheckNivel2_6,
    SlotNivel2_6: SlotNivel2_6,
    CheckNivel2_7: CheckNivel2_7,
    SlotNivel2_7: SlotNivel2_7,
    CheckNivel2_8: CheckNivel2_8,
    SlotNivel2_8: SlotNivel2_8,
    CheckNivel2_9: CheckNivel2_9,
    SlotNivel2_9: SlotNivel2_9,
    CheckNivel2_10: CheckNivel2_10,
    SlotNivel2_10: SlotNivel2_10,
    CheckNivel2_11: CheckNivel2_11,
    SlotNivel2_11: SlotNivel2_11,
    CheckNivel2_12: CheckNivel2_12,
    SlotNivel2_12: SlotNivel2_12,
    CheckNivel2_13: CheckNivel2_13,
    SlotNivel2_13: SlotNivel2_13,
    EspacoTotal3: EspacoTotal3,
    EspacoUtilizado3: EspacoUtilizado3,
    CheckNivel3_1: CheckNivel3_1,
    SlotNivel3_1: SlotNivel3_1,
    CheckNivel3_2: CheckNivel3_2,
    SlotNivel3_2: SlotNivel3_2,
    CheckNivel3_3: CheckNivel3_3,
    SlotNivel3_3: SlotNivel3_3,
    CheckNivel3_4: CheckNivel3_4,
    SlotNivel3_4: SlotNivel3_4,
    CheckNivel3_5: CheckNivel3_5,
    SlotNivel3_5: SlotNivel3_5,
    CheckNivel3_6: CheckNivel3_6,
    SlotNivel3_6: SlotNivel3_6,
    CheckNivel3_7: CheckNivel3_7,
    SlotNivel3_7: SlotNivel3_7,
    CheckNivel3_8: CheckNivel3_8,
    SlotNivel3_8: SlotNivel3_8,
    CheckNivel3_9: CheckNivel3_9,
    SlotNivel3_9: SlotNivel3_9,
    CheckNivel3_10: CheckNivel3_10,
    SlotNivel3_10: SlotNivel3_10,
    CheckNivel3_11: CheckNivel3_11,
    SlotNivel3_11: SlotNivel3_11,
    CheckNivel3_12: CheckNivel3_12,
    SlotNivel3_12: SlotNivel3_12,
    CheckNivel3_13: CheckNivel3_13,
    SlotNivel3_13: SlotNivel3_13,
    EspacoTotal4: EspacoTotal4,
    EspacoUtilizado4: EspacoUtilizado4,
    CheckNivel4_1: CheckNivel4_1,
    SlotNivel4_1: SlotNivel4_1,
    CheckNivel4_2: CheckNivel4_2,
    SlotNivel4_2: SlotNivel4_2,
    CheckNivel4_3: CheckNivel4_3,
    SlotNivel4_3: SlotNivel4_3,
    CheckNivel4_4: CheckNivel4_4,
    SlotNivel4_4: SlotNivel4_4,
    CheckNivel4_5: CheckNivel4_5,
    SlotNivel4_5: SlotNivel4_5,
    CheckNivel4_6: CheckNivel4_6,
    SlotNivel4_6: SlotNivel4_6,
    CheckNivel4_7: CheckNivel4_7,
    SlotNivel4_7: SlotNivel4_7,
    CheckNivel4_8: CheckNivel4_8,
    SlotNivel4_8: SlotNivel4_8,
    CheckNivel4_9: CheckNivel4_9,
    SlotNivel4_9: SlotNivel4_9,
    CheckNivel4_10: CheckNivel4_10,
    SlotNivel4_10: SlotNivel4_10,
    CheckNivel4_11: CheckNivel4_11,
    SlotNivel4_11: SlotNivel4_11,
    CheckNivel4_12: CheckNivel4_12,
    SlotNivel4_12: SlotNivel4_12,
    CheckNivel4_13: CheckNivel4_13,
    SlotNivel4_13: SlotNivel4_13,
    EspacoTotal5: EspacoTotal5,
    EspacoUtilizado5: EspacoUtilizado5,
    CheckNivel5_1: CheckNivel5_1,
    SlotNivel5_1: SlotNivel5_1,
    CheckNivel5_2: CheckNivel5_2,
    SlotNivel5_2: SlotNivel5_2,
    CheckNivel5_3: CheckNivel5_3,
    SlotNivel5_3: SlotNivel5_3,
    CheckNivel5_4: CheckNivel5_4,
    SlotNivel5_4: SlotNivel5_4,
    CheckNivel5_5: CheckNivel5_5,
    SlotNivel5_5: SlotNivel5_5,
    CheckNivel5_6: CheckNivel5_6,
    SlotNivel5_6: SlotNivel5_6,
    CheckNivel5_7: CheckNivel5_7,
    SlotNivel5_7: SlotNivel5_7,
    CheckNivel5_8: CheckNivel5_8,
    SlotNivel5_8: SlotNivel5_8,
    CheckNivel5_9: CheckNivel5_9,
    SlotNivel5_9: SlotNivel5_9,
    EspacoTotal6: EspacoTotal6,
    EspacoUtilizado6: EspacoUtilizado6,
    CheckNivel6_1: CheckNivel6_1,
    SlotNivel6_1: SlotNivel6_1,
    CheckNivel6_2: CheckNivel6_2,
    SlotNivel6_2: SlotNivel6_2,
    CheckNivel6_3: CheckNivel6_3,
    SlotNivel6_3: SlotNivel6_3,
    CheckNivel6_4: CheckNivel6_4,
    SlotNivel6_4: SlotNivel6_4,
    CheckNivel6_5: CheckNivel6_5,
    SlotNivel6_5: SlotNivel6_5,
    CheckNivel6_6: CheckNivel6_6,
    SlotNivel6_6: SlotNivel6_6,
    CheckNivel6_7: CheckNivel6_7,
    SlotNivel6_7: SlotNivel6_7,
    CheckNivel6_8: CheckNivel6_8,
    SlotNivel6_8: SlotNivel6_8,
    CheckNivel6_9: CheckNivel6_9,
    SlotNivel6_9: SlotNivel6_9,
    EspacoTotal7: EspacoTotal7,
    EspacoUtilizado7: EspacoUtilizado7,
    CheckNivel7_1: CheckNivel7_1,
    SlotNivel7_1: SlotNivel7_1,
    CheckNivel7_2: CheckNivel7_2,
    SlotNivel7_2: SlotNivel7_2,
    CheckNivel7_3: CheckNivel7_3,
    SlotNivel7_3: SlotNivel7_3,
    CheckNivel7_4: CheckNivel7_4,
    SlotNivel7_4: SlotNivel7_4,
    CheckNivel7_5: CheckNivel7_5,
    SlotNivel7_5: SlotNivel7_5,
    CheckNivel7_6: CheckNivel7_6,
    SlotNivel7_6: SlotNivel7_6,
    CheckNivel7_7: CheckNivel7_7,
    SlotNivel7_7: SlotNivel7_7,
    CheckNivel7_8: CheckNivel7_8,
    SlotNivel7_8: SlotNivel7_8,
    CheckNivel7_9: CheckNivel7_9,
    SlotNivel7_9: SlotNivel7_9,
    EspacoTotal8: EspacoTotal8,
    EspacoUtilizado8: EspacoUtilizado8,
    CheckNivel8_1: CheckNivel8_1,
    SlotNivel8_1: SlotNivel8_1,
    CheckNivel8_2: CheckNivel8_2,
    SlotNivel8_2: SlotNivel8_2,
    CheckNivel8_3: CheckNivel8_3,
    SlotNivel8_3: SlotNivel8_3,
    CheckNivel8_4: CheckNivel8_4,
    SlotNivel8_4: SlotNivel8_4,
    CheckNivel8_5: CheckNivel8_5,
    SlotNivel8_5: SlotNivel8_5,
    CheckNivel8_6: CheckNivel8_6,
    SlotNivel8_6: SlotNivel8_6,
    CheckNivel8_7: CheckNivel8_7,
    SlotNivel8_7: SlotNivel8_7,
    EspacoTota9: EspacoTota9,
    EspacoUtilizado9: EspacoUtilizado9,
    CheckNive9_1: CheckNive9_1,
    SlotNive9_1: SlotNive9_1,
    CheckNive9_2: CheckNive9_2,
    SlotNive9_2: SlotNive9_2,
    CheckNive9_3: CheckNive9_3,
    SlotNive9_3: SlotNive9_3,
    CheckNive9_4: CheckNive9_4,
    SlotNive9_4: SlotNive9_4,
    CheckNive9_5: CheckNive9_5,
    SlotNive9_5: SlotNive9_5,
    CheckNive9_6: CheckNive9_6,
    SlotNive9_6: SlotNive9_6,
    CheckNive9_7: CheckNive9_7,
    SlotNive9_7: SlotNive9_7,
  };

  fichas.push(ficha);
  fs.writeFileSync(banco, JSON.stringify(fichas, null, 2));
  res.send(`Tudo certo usuario criado com sucesso.`);
});

app.post("/CallCthulhu", async (req, res) => {
  const {
    NomeCall,
    NomeJogador,
    JogadorJogador,
    OcupacaoJogador,
    IdadeJogador,
    SexoJogador,
    ResidenciaJogador,
    NascimentoJogador,
    ForJogador,
    For1Jogador,
    For2Jogador,
    ConJogador,
    Con1Jogador,
    Con2Jogador,
    TamJogador,
    Tam1Jogador,
    Tam2Jogador,
    DesJogador,
    Des1Jogador,
    Des2Jogador,
    ApaJogador,
    Apa1Jogador,
    Apa2Jogador,
    IntJogador,
    Int1Jogador,
    Int2Jogador,
    PodJogador,
    Pod1Jogador,
    Pod2Jogador,
    EduJogador,
    Edu1Jogador,
    Edu2Jogador,
    TaxaMovJogador,
    TaxaMov1Jogador,
    TaxaMov2Jogador,
    LesaoGraveJogador,
    LesaoMaximoJogador,
    InsanidadeTempJogador,
    InsanidadeIndJogador,
    InsanidadeIniJogador,
    SorteJogador,
    PontosDeMagia,
    jAntropologia,
    jAntropologia1,
    jAntropologia2,
    jAntropologia3,
    jFogo1,
    jFogo2,
    jFogo3,
    jFogo4,
    jRifles1,
    jRifles2,
    jRifles3,
    jRifles4,
    jArqueologia1,
    jArqueologia2,
    jArqueologia3,
    jArqueologia4,
    jArremessar1,
    jArremessar2,
    jArremessar3,
    jArremessar4,
    jArte1,
    jArte2,
    jArte3,
    jArte4,
    jArte5,
    jVazio1,
    jVazio2,
    jVazio3,
    jVazio4,
    jVazio5,
    jVazio6,
    jVazio7,
    jVazio8,
    jVazio9,
    jVazio10,
    jVazio11,
    jVazio12,
    jVazio13,
    jVazio14,
    jVazio15,
    jAvaliacao1,
    jAvaliacao2,
    jAvaliacao3,
    jAvaliacao4,
    jCavalgar1,
    jCavalgar2,
    jCavalgar3,
    jCavalgar4,
    jCharme1,
    jCharme2,
    jCharme3,
    jCharme4,
    jChaveiro1,
    jChaveiro2,
    jChaveiro3,
    jChaveiro4,
    jCiencia1,
    jCiencia2,
    jCiencia3,
    jCiencia4,
    jVazio16,
    jVazio17,
    jVazio18,
    jVazio19,
    jVazio20,
    jVazio21,
    jVazio22,
    jVazio23,
    jVazio24,
    jVazio25,
    jVazio26,
    jVazio27,
    jVazio28,
    jVazio29,
    jVazio30,
    jEletrico1,
    jEletrico2,
    jEletrico3,
    jEletrico4,
    jMecanico1,
    jMecanico2,
    jMecanico3,
    jMecanico4,
    jContabilidade1,
    jContabilidade2,
    jContabilidade3,
    jContabilidade4,
    jDireito1,
    jDireito2,
    jDireito3,
    jDireito4,
    jDirigir1,
    jDirigir2,
    jDirigir3,
    jDirigir4,
    jDisfarce1,
    jDisfarce2,
    jDisfarce3,
    jDisfarce4,
    jEncontrar1,
    jEncontrar2,
    jEncontrar3,
    jEncontrar4,
    jEscutar1,
    jEscutar2,
    jEscutar3,
    jEscutar4,
    jEscalar1,
    jEscalar2,
    jEscalar3,
    jEscalar4,
    jEsquivar1,
    jEsquivar2,
    jEsquivar3,
    jEsquivar4,
    jLabia1,
    jLabia2,
    jLabia3,
    jLabia4,
    jIntimidacao1,
    jIntimidacao2,
    jIntimidacao3,
    jIntimidacao4,
    jHistoria1,
    jHistoria2,
    jHistoria3,
    jHistoria4,
    jFurtividade1,
    jFurtividade2,
    jFurtividade3,
    jFurtividade4,
    jLinguaN1,
    jLinguaN2,
    jLinguaN3,
    jLinguaN4,
    jLinguaN5,
    jLinguaNN1,
    jLinguaNN2,
    jLinguaNN3,
    jLinguaNN4,
    jLinguaNN5,
    jLingua1,
    jLingua2,
    jLingua3,
    jLingua4,
    jLingua5,
    jLingua6,
    jLingua7,
    jLingua8,
    jLingua9,
    jLingua10,
    jLingua11,
    jLingua12,
    jLingua13,
    jLingua14,
    jLingua15,
    jLingua16,
    jLingua17,
    jLingua18,
    jLingua19,
    jLingua20,
    jLutar1,
    jLutar2,
    jLutar3,
    jLutar4,
    jNada1,
    jNada2,
    jNada3,
    jNada4,
    jNada5,
    jMedicina1,
    jMedicina2,
    jMedicina3,
    jMedicina4,
    jMythos1,
    jMythos2,
    jMythos3,
    jMundo1,
    jMundo2,
    jMundo3,
    jMundo4,
    jNatacao1,
    jNatacao2,
    jNatacao3,
    jNatacao4,
    jNavegacao1,
    jNavegacao2,
    jNavegacao3,
    jNavegacao4,
    jCredito1,
    jCredito2,
    jCredito3,
    jOcultista1,
    jOcultista2,
    jOcultista3,
    jOcultista4,
    jOperar1,
    jOperar2,
    jOperar3,
    jOperar4,
    jPersuasao1,
    jPersuasao2,
    jPersuasao3,
    jPersuasao4,
    jPilotar1,
    jPilotar2,
    jPilotar3,
    jPilotar4,
    jAlgum1,
    jAlgum2,
    jAlgum3,
    jAlgum4,
    jAlgum5,
    jDigitacao1,
    jDigitacao2,
    jDigitacao3,
    jDigitacao4,
    jSocorro1,
    jSocorro2,
    jSocorro3,
    jSocorro4,
    jPsicana1,
    jPsicana2,
    jPsicana3,
    jPsicana4,
    jPsicologia1,
    jPsicologia2,
    jPsicologia3,
    jPsicologia4,
    jSaltar1,
    jSaltar2,
    jSaltar3,
    jSaltar4,
    jRastrear1,
    jRastrear2,
    jRastrear3,
    jRastrear4,
    jSobrevivencia1,
    jSobrevivencia2,
    jSobrevivencia3,
    jSobrevivencia4,
    jSobrevivencia5,
    jBiblioteca1,
    jBiblioteca2,
    jBiblioteca3,
    jBiblioteca4,
    jAdiciona1,
    jAdiciona2,
    jAdiciona3,
    jAdiciona4,
    jAdiciona5,
    jAdiciona6,
    jAdiciona7,
    jAdiciona8,
    jAdiciona9,
    jAdiciona10,
    jArmasDesarmada1,
    jArmasDesarmada2,
    jRegular1,
    jRegular2,
    jDificil1,
    jDificil2,
    jExtremo1,
    jExtremo2,
    jDanod1,
    jDanod2,
    jAlcanceTiro1,
    jAlcanceTiro2,
    jAtaquesa1,
    jAtaquesa2,
    jMunicao1,
    jMunicao2,
    jDefeitos1,
    jDefeitos2,
    jBonusDeDano,
    jCorpo,
    jEsquivador,
    jEsquivador1,
    jEsquivador2,
    jDescricao,
    jCaracteristicas,
    jIdeologias,
    jCicatrizes,
    jPessoas,
    jFobias,
    jLocais,
    jTomos,
    jPertencesQuerido,
    jEntidades,
    jEquipamento,
    jPertences,
    jNivelGasto,
    jDinheiro,
    jPatrimonio,
  } = req.body;
  const banco = path.join(__dirname, ".", "db", "banco_dados_fichas.json");
  const fichas = JSON.parse(
    fs.readFileSync(banco, { encoding: "utf8", flag: "r" })
  );

  const id = fichas.length + 1;
  const ficha = {
    idUsuario: IdUser,
    id: id,
    tipo: "fichaCall",
    NomeFicha: NomeCall,
    NomeJogador: NomeJogador,
    JogadorJogador: JogadorJogador,
    OcupacaoJogador: OcupacaoJogador,
    IdadeJogador: IdadeJogador,
    SexoJogador: SexoJogador,
    ResidenciaJogador: ResidenciaJogador,
    NascimentoJogador: NascimentoJogador,
    ForJogador: ForJogador,
    For1Jogador: For1Jogador,
    For2Jogador: For2Jogador,
    ConJogador: ConJogador,
    Con1Jogador: Con1Jogador,
    Con2Jogador: Con2Jogador,
    TamJogador: TamJogador,
    Tam1Jogador: Tam1Jogador,
    Tam2Jogador: Tam2Jogador,
    DesJogador: DesJogador,
    Des1Jogador: Des1Jogador,
    Des2Jogador: Des2Jogador,
    ApaJogador: ApaJogador,
    Apa1Jogador: Apa1Jogador,
    Apa2Jogador: Apa2Jogador,
    IntJogador: IntJogador,
    Int1Jogador: Int1Jogador,
    Int2Jogador: Int2Jogador,
    PodJogador: PodJogador,
    Pod1Jogador: Pod1Jogador,
    Pod2Jogador: Pod2Jogador,
    EduJogador: EduJogador,
    Edu1Jogador: Edu1Jogador,
    Edu2Jogador: Edu2Jogador,
    TaxaMovJogador: TaxaMovJogador,
    TaxaMov1Jogador: TaxaMov1Jogador,
    TaxaMov2Jogador: TaxaMov2Jogador,
    LesaoGraveJogador: LesaoGraveJogador,
    LesaoMaximoJogador: LesaoMaximoJogador,
    InsanidadeTempJogador: InsanidadeTempJogador,
    InsanidadeIndJogador: InsanidadeIndJogador,
    InsanidadeIniJogador: InsanidadeIniJogador,
    SorteJogador: SorteJogador,
    PontosDeMagia: PontosDeMagia,
    jAntropologia: jAntropologia,
    jAntropologia1: jAntropologia1,
    jAntropologia2: jAntropologia2,
    jAntropologia3: jAntropologia3,
    jFogo1: jFogo1,
    jFogo2: jFogo2,
    jFogo3: jFogo3,
    jFogo4: jFogo4,
    jRifles1: jRifles1,
    jRifles2: jRifles2,
    jRifles3: jRifles3,
    jRifles4: jRifles4,
    jArqueologia1: jArqueologia1,
    jArqueologia2: jArqueologia2,
    jArqueologia3: jArqueologia3,
    jArqueologia4: jArqueologia4,
    jArremessar1: jArremessar1,
    jArremessar2: jArremessar2,
    jArremessar3: jArremessar3,
    jArremessar4: jArremessar4,
    jArte1: jArte1,
    jArte2: jArte2,
    jArte3: jArte3,
    jArte4: jArte4,
    jArte5: jArte5,
    jVazio1: jVazio1,
    jVazio2: jVazio2,
    jVazio3: jVazio3,
    jVazio4: jVazio4,
    jVazio5: jVazio5,
    jVazio6: jVazio6,
    jVazio7: jVazio7,
    jVazio8: jVazio8,
    jVazio9: jVazio9,
    jVazio10: jVazio10,
    jVazio11: jVazio11,
    jVazio12: jVazio12,
    jVazio13: jVazio13,
    jVazio14: jVazio14,
    jVazio15: jVazio15,
    jAvaliacao1: jAvaliacao1,
    jAvaliacao2: jAvaliacao2,
    jAvaliacao3: jAvaliacao3,
    jAvaliacao4: jAvaliacao4,
    jCavalgar1: jCavalgar1,
    jCavalgar2: jCavalgar2,
    jCavalgar3: jCavalgar3,
    jCavalgar4: jCavalgar4,
    jCharme1: jCharme1,
    jCharme2: jCharme2,
    jCharme3: jCharme3,
    jCharme4: jCharme4,
    jChaveiro1: jChaveiro1,
    jChaveiro2: jChaveiro2,
    jChaveiro3: jChaveiro3,
    jChaveiro4: jChaveiro4,
    jCiencia1: jCiencia1,
    jCiencia2: jCiencia2,
    jCiencia3: jCiencia3,
    jCiencia4: jCiencia4,
    jVazio16: jVazio16,
    jVazio17: jVazio17,
    jVazio18: jVazio18,
    jVazio19: jVazio19,
    jVazio20: jVazio20,
    jVazio21: jVazio21,
    jVazio22: jVazio22,
    jVazio23: jVazio23,
    jVazio24: jVazio24,
    jVazio25: jVazio25,
    jVazio26: jVazio26,
    jVazio27: jVazio27,
    jVazio28: jVazio28,
    jVazio29: jVazio29,
    jVazio30: jVazio30,
    jEletrico1: jEletrico1,
    jEletrico2: jEletrico2,
    jEletrico3: jEletrico3,
    jEletrico4: jEletrico4,
    jMecanico1: jMecanico1,
    jMecanico2: jMecanico2,
    jMecanico3: jMecanico3,
    jMecanico4: jMecanico4,
    jContabilidade1: jContabilidade1,
    jContabilidade2: jContabilidade2,
    jContabilidade3: jContabilidade3,
    jContabilidade4: jContabilidade4,
    jDireito1: jDireito1,
    jDireito2: jDireito2,
    jDireito3: jDireito3,
    jDireito4: jDireito4,
    jDirigir1: jDirigir1,
    jDirigir2: jDirigir2,
    jDirigir3: jDirigir3,
    jDirigir4: jDirigir4,
    jDisfarce1: jDisfarce1,
    jDisfarce2: jDisfarce2,
    jDisfarce3: jDisfarce3,
    jDisfarce4: jDisfarce4,
    jEncontrar1: jEncontrar1,
    jEncontrar2: jEncontrar2,
    jEncontrar3: jEncontrar3,
    jEncontrar4: jEncontrar4,
    jEscutar1: jEscutar1,
    jEscutar2: jEscutar2,
    jEscutar3: jEscutar3,
    jEscutar4: jEscutar4,
    jEscalar1: jEscalar1,
    jEscalar2: jEscalar2,
    jEscalar3: jEscalar3,
    jEscalar4: jEscalar4,
    jEsquivar1: jEsquivar1,
    jEsquivar2: jEsquivar2,
    jEsquivar3: jEsquivar3,
    jEsquivar4: jEsquivar4,
    jLabia1: jLabia1,
    jLabia2: jLabia2,
    jLabia3: jLabia3,
    jLabia4: jLabia4,
    jIntimidacao1: jIntimidacao1,
    jIntimidacao2: jIntimidacao2,
    jIntimidacao3: jIntimidacao3,
    jIntimidacao4: jIntimidacao4,
    jHistoria1: jHistoria1,
    jHistoria2: jHistoria2,
    jHistoria3: jHistoria3,
    jHistoria4: jHistoria4,
    jFurtividade1: jFurtividade1,
    jFurtividade2: jFurtividade2,
    jFurtividade3: jFurtividade3,
    jFurtividade4: jFurtividade4,
    jLinguaN1: jLinguaN1,
    jLinguaN2: jLinguaN2,
    jLinguaN3: jLinguaN3,
    jLinguaN4: jLinguaN4,
    jLinguaN5: jLinguaN5,
    jLinguaNN1: jLinguaNN1,
    jLinguaNN2: jLinguaNN2,
    jLinguaNN3: jLinguaNN3,
    jLinguaNN4: jLinguaNN4,
    jLinguaNN5: jLinguaNN5,
    jLingua1: jLingua1,
    jLingua2: jLingua2,
    jLingua3: jLingua3,
    jLingua4: jLingua4,
    jLingua5: jLingua5,
    jLingua6: jLingua6,
    jLingua7: jLingua7,
    jLingua8: jLingua8,
    jLingua9: jLingua9,
    jLingua10: jLingua10,
    jLingua11: jLingua11,
    jLingua12: jLingua12,
    jLingua13: jLingua13,
    jLingua14: jLingua14,
    jLingua15: jLingua15,
    jLingua16: jLingua16,
    jLingua17: jLingua17,
    jLingua18: jLingua18,
    jLingua19: jLingua19,
    jLingua20: jLingua20,
    jLutar1: jLutar1,
    jLutar2: jLutar2,
    jLutar3: jLutar3,
    jLutar4: jLutar4,
    jNada1: jNada1,
    jNada2: jNada2,
    jNada3: jNada3,
    jNada4: jNada4,
    jNada5: jNada5,
    jMedicina1: jMedicina1,
    jMedicina2: jMedicina2,
    jMedicina3: jMedicina3,
    jMedicina4: jMedicina4,
    jMythos1: jMythos1,
    jMythos2: jMythos2,
    jMythos3: jMythos3,
    jMundo1: jMundo1,
    jMundo2: jMundo2,
    jMundo3: jMundo3,
    jMundo4: jMundo4,
    jNatacao1: jNatacao1,
    jNatacao2: jNatacao2,
    jNatacao3: jNatacao3,
    jNatacao4: jNatacao4,
    jNavegacao1: jNavegacao1,
    jNavegacao2: jNavegacao2,
    jNavegacao3: jNavegacao3,
    jNavegacao4: jNavegacao4,
    jCredito1: jCredito1,
    jCredito2: jCredito2,
    jCredito3: jCredito3,
    jOcultista1: jOcultista1,
    jOcultista2: jOcultista2,
    jOcultista3: jOcultista3,
    jOcultista4: jOcultista4,
    jOperar1: jOperar1,
    jOperar2: jOperar2,
    jOperar3: jOperar3,
    jOperar4: jOperar4,
    jPersuasao1: jPersuasao1,
    jPersuasao2: jPersuasao2,
    jPersuasao3: jPersuasao3,
    jPersuasao4: jPersuasao4,
    jPilotar1: jPilotar1,
    jPilotar2: jPilotar2,
    jPilotar3: jPilotar3,
    jPilotar4: jPilotar4,
    jAlgum1: jAlgum1,
    jAlgum2: jAlgum2,
    jAlgum3: jAlgum3,
    jAlgum4: jAlgum4,
    jAlgum5: jAlgum5,
    jDigitacao1: jDigitacao1,
    jDigitacao2: jDigitacao2,
    jDigitacao3: jDigitacao3,
    jDigitacao4: jDigitacao4,
    jSocorro1: jSocorro1,
    jSocorro2: jSocorro2,
    jSocorro3: jSocorro3,
    jSocorro4: jSocorro4,
    jPsicana1: jPsicana1,
    jPsicana2: jPsicana2,
    jPsicana3: jPsicana3,
    jPsicana4: jPsicana4,
    jPsicologia1: jPsicologia1,
    jPsicologia2: jPsicologia2,
    jPsicologia3: jPsicologia3,
    jPsicologia4: jPsicologia4,
    jSaltar1: jSaltar1,
    jSaltar2: jSaltar2,
    jSaltar3: jSaltar3,
    jSaltar4: jSaltar4,
    jRastrear1: jRastrear1,
    jRastrear2: jRastrear2,
    jRastrear3: jRastrear3,
    jRastrear4: jRastrear4,
    jSobrevivencia1: jSobrevivencia1,
    jSobrevivencia2: jSobrevivencia2,
    jSobrevivencia3: jSobrevivencia3,
    jSobrevivencia4: jSobrevivencia4,
    jSobrevivencia5: jSobrevivencia5,
    jBiblioteca1: jBiblioteca1,
    jBiblioteca2: jBiblioteca2,
    jBiblioteca3: jBiblioteca3,
    jBiblioteca4: jBiblioteca4,
    jAdiciona1: jAdiciona1,
    jAdiciona2: jAdiciona2,
    jAdiciona3: jAdiciona3,
    jAdiciona4: jAdiciona4,
    jAdiciona5: jAdiciona5,
    jAdiciona6: jAdiciona6,
    jAdiciona7: jAdiciona7,
    jAdiciona8: jAdiciona8,
    jAdiciona9: jAdiciona9,
    jAdiciona10: jAdiciona10,
    jArmasDesarmada1: jArmasDesarmada1,
    jArmasDesarmada2: jArmasDesarmada2,
    jRegular1: jRegular1,
    jRegular2: jRegular2,
    jDificil1: jDificil1,
    jDificil2: jDificil2,
    jExtremo1: jExtremo1,
    jExtremo2: jExtremo2,
    jDanod1: jDanod1,
    jDanod2: jDanod2,
    jAlcanceTiro1: jAlcanceTiro1,
    jAlcanceTiro2: jAlcanceTiro2,
    jAtaquesa1: jAtaquesa1,
    jAtaquesa2: jAtaquesa2,
    jMunicao1: jMunicao1,
    jMunicao2: jMunicao2,
    jDefeitos1: jDefeitos1,
    jDefeitos2: jDefeitos2,
    jBonusDeDano: jBonusDeDano,
    jCorpo: jCorpo,
    jEsquivador: jEsquivador,
    jEsquivador1: jEsquivador1,
    jEsquivador2: jEsquivador2,
    jDescricao: jDescricao,
    jCaracteristicas: jCaracteristicas,
    jIdeologias: jIdeologias,
    jCicatrizes: jCicatrizes,
    jPessoas: jPessoas,
    jFobias: jFobias,
    jLocais: jLocais,
    jTomos: jTomos,
    jPertencesQuerido: jPertencesQuerido,
    jEntidades: jEntidades,
    jEquipamento: jEquipamento,
    jPertences: jPertences,
    jNivelGasto: jNivelGasto,
    jDinheiro: jDinheiro,
    jPatrimonio: jPatrimonio,
  };

  fichas.push(ficha);
  fs.writeFileSync(banco, JSON.stringify(fichas, null, 2));
  res.send(`Tudo certo usuario criado com sucesso.`);
});

app.post("/fichaDungeons/:userId/:nomeFicha", async (req, res) => {
  const idAtual = req.params.userId;
  const userAtual = req.params.nomeFicha;
  const {
    NomeDD,
    NomePerso,
    Class_Nivel,
    Antecedente,
    NomeDoJogador,
    Raca,
    Tendencia,
    Experiencia,
    Forca,
    ForcaBonus,
    Destreza,
    DestrezaBonus,
    Constituicao,
    ConstituicaoBonus,
    Inteligencia,
    InteligenciaBonus,
    Sabedoria,
    SabedoriaBonus,
    Carisma,
    CarismaBonus,
    Inspiracao,
    Proficiencia,
    radioForca,
    SubForca,
    radioDestreza,
    SubDestreza,
    radioConstituicao,
    SubConstituicao,
    radioInteligencia,
    SubInteligencia,
    radioSabedoria,
    SubSabedoria,
    radioCarisma,
    SubCarisma,
    radioAcrobacia,
    SubAcrobacia,
    radioArcanismo,
    SubArcanismo,
    radioAtletismo,
    SubAtletismo,
    radioAtuacao,
    SubAtuacao,
    radioEnganacao,
    SubEnganacao,
    radioFurtividade,
    SubFurtividade,
    radioHistoria,
    SubHistoria,
    radioIntimidacao,
    SubIntimidacao,
    radioIntuicao,
    SubIntuicao,
    radioInvestigacao,
    SubInvestigacao,
    radioAnimais,
    SubAnimais,
    radioMedicina,
    SubMedicina,
    radioNatureza,
    SubNatureza,
    radioPercepcao,
    SubPercepcao,
    radioPersuasao,
    SubPersuasao,
    radioPrestigio,
    SubPrestigio,
    radioReligiao,
    SubReligiao,
    radioSobrevivencia,
    SubSobrevivencia,
    Armadura,
    Iniciativa,
    Deslocamento,
    VidaMaxima,
    VidaAtual,
    VidaTemporaria,
    DadosVidaTotal,
    DadosVida,
    Sucesso1,
    Sucesso2,
    Sucesso3,
    Fracasso1,
    Fracasso2,
    Fracasso3,
    NomeAtaque1,
    BonusAtaque1,
    DTAtaque1,
    NomeAtaque2,
    BonusAtaque2,
    DTAtaque2,
    NomeAtaque3,
    BonusAtaque3,
    DTAtaque3,
    Magias,
    SabedoriaPassiva,
    Idiomas,
    Personalidade,
    Ideias,
    Ligacoes,
    Defeitos,
    Caracteristicas,
    PC,
    PP,
    PE,
    PO,
    PL,
    Equipamento,
    NomePerso1,
    Idade,
    Altura,
    Peso,
    Olhos,
    Pele,
    Cabelo,
    Orgs,
    Guilda,
    TalentosAdicionais,
    Tesouros,
    HistoriaPersonagem,
    ClasseConjurador,
    HabilidadeChave,
    CD,
    ModificadorAtaque,
    Truque1,
    Truque2,
    Truque3,
    Truque4,
    Truque5,
    Truque6,
    Truque7,
    Truque8,
    EspacoTotal1,
    EspacoUtilizado1,
    CheckNivel1_1,
    SlotNivel1_1,
    CheckNivel1_2,
    SlotNivel1_2,
    CheckNivel1_3,
    SlotNivel1_3,
    CheckNivel1_4,
    SlotNivel1_4,
    CheckNivel1_5,
    SlotNivel1_5,
    CheckNivel1_6,
    SlotNivel1_6,
    CheckNivel1_7,
    SlotNivel1_7,
    CheckNivel1_8,
    SlotNivel1_8,
    CheckNivel1_9,
    SlotNivel1_9,
    CheckNivel1_10,
    SlotNivel1_10,
    CheckNivel1_11,
    SlotNivel1_11,
    CheckNivel1_12,
    SlotNivel1_12,
    CheckNivel1_13,
    SlotNivel1_13,
    EspacoTotal2,
    EspacoUtilizado2,
    CheckNivel2_1,
    SlotNivel2_1,
    CheckNivel2_2,
    SlotNivel2_2,
    CheckNivel2_3,
    SlotNivel2_3,
    CheckNivel2_4,
    SlotNivel2_4,
    CheckNivel2_5,
    SlotNivel2_5,
    CheckNivel2_6,
    SlotNivel2_6,
    CheckNivel2_7,
    SlotNivel2_7,
    CheckNivel2_8,
    SlotNivel2_8,
    CheckNivel2_9,
    SlotNivel2_9,
    CheckNivel2_10,
    SlotNivel2_10,
    CheckNivel2_11,
    SlotNivel2_11,
    CheckNivel2_12,
    SlotNivel2_12,
    CheckNivel2_13,
    SlotNivel2_13,
    EspacoTotal3,
    EspacoUtilizado3,
    CheckNivel3_1,
    SlotNivel3_1,
    CheckNivel3_2,
    SlotNivel3_2,
    CheckNivel3_3,
    SlotNivel3_3,
    CheckNivel3_4,
    SlotNivel3_4,
    CheckNivel3_5,
    SlotNivel3_5,
    CheckNivel3_6,
    SlotNivel3_6,
    CheckNivel3_7,
    SlotNivel3_7,
    CheckNivel3_8,
    SlotNivel3_8,
    CheckNivel3_9,
    SlotNivel3_9,
    CheckNivel3_10,
    SlotNivel3_10,
    CheckNivel3_11,
    SlotNivel3_11,
    CheckNivel3_12,
    SlotNivel3_12,
    CheckNivel3_13,
    SlotNivel3_13,
    EspacoTotal4,
    EspacoUtilizado4,
    CheckNivel4_1,
    SlotNivel4_1,
    CheckNivel4_2,
    SlotNivel4_2,
    CheckNivel4_3,
    SlotNivel4_3,
    CheckNivel4_4,
    SlotNivel4_4,
    CheckNivel4_5,
    SlotNivel4_5,
    CheckNivel4_6,
    SlotNivel4_6,
    CheckNivel4_7,
    SlotNivel4_7,
    CheckNivel4_8,
    SlotNivel4_8,
    CheckNivel4_9,
    SlotNivel4_9,
    CheckNivel4_10,
    SlotNivel4_10,
    CheckNivel4_11,
    SlotNivel4_11,
    CheckNivel4_12,
    SlotNivel4_12,
    CheckNivel4_13,
    SlotNivel4_13,
    EspacoTotal5,
    EspacoUtilizado5,
    CheckNivel5_1,
    SlotNivel5_1,
    CheckNivel5_2,
    SlotNivel5_2,
    CheckNivel5_3,
    SlotNivel5_3,
    CheckNivel5_4,
    SlotNivel5_4,
    CheckNivel5_5,
    SlotNivel5_5,
    CheckNivel5_6,
    SlotNivel5_6,
    CheckNivel5_7,
    SlotNivel5_7,
    CheckNivel5_8,
    SlotNivel5_8,
    CheckNivel5_9,
    SlotNivel5_9,
    EspacoTotal6,
    EspacoUtilizado6,
    CheckNivel6_1,
    SlotNivel6_1,
    CheckNivel6_2,
    SlotNivel6_2,
    CheckNivel6_3,
    SlotNivel6_3,
    CheckNivel6_4,
    SlotNivel6_4,
    CheckNivel6_5,
    SlotNivel6_5,
    CheckNivel6_6,
    SlotNivel6_6,
    CheckNivel6_7,
    SlotNivel6_7,
    CheckNivel6_8,
    SlotNivel6_8,
    CheckNivel6_9,
    SlotNivel6_9,
    EspacoTotal7,
    EspacoUtilizado7,
    CheckNivel7_1,
    SlotNivel7_1,
    CheckNivel7_2,
    SlotNivel7_2,
    CheckNivel7_3,
    SlotNivel7_3,
    CheckNivel7_4,
    SlotNivel7_4,
    CheckNivel7_5,
    SlotNivel7_5,
    CheckNivel7_6,
    SlotNivel7_6,
    CheckNivel7_7,
    SlotNivel7_7,
    CheckNivel7_8,
    SlotNivel7_8,
    CheckNivel7_9,
    SlotNivel7_9,
    EspacoTotal8,
    EspacoUtilizado8,
    CheckNivel8_1,
    SlotNivel8_1,
    CheckNivel8_2,
    SlotNivel8_2,
    CheckNivel8_3,
    SlotNivel8_3,
    CheckNivel8_4,
    SlotNivel8_4,
    CheckNivel8_5,
    SlotNivel8_5,
    CheckNivel8_6,
    SlotNivel8_6,
    CheckNivel8_7,
    SlotNivel8_7,
    EspacoTota9,
    EspacoUtilizado9,
    CheckNive9_1,
    SlotNive9_1,
    CheckNive9_2,
    SlotNive9_2,
    CheckNive9_3,
    SlotNive9_3,
    CheckNive9_4,
    SlotNive9_4,
    CheckNive9_5,
    SlotNive9_5,
    CheckNive9_6,
    SlotNive9_6,
    CheckNive9_7,
    SlotNive9_7,
  } = req.body;
  const banco = path.join(__dirname, ".", "db", "banco_dados_fichas.json");
  const fichas = JSON.parse(
    fs.readFileSync(banco, { encoding: "utf8", flag: "r" })
  );
  for (let ficha of fichas) {
    if (ficha.idUsuario == idAtual && ficha.NomeFicha == userAtual) {
      ficha.NomeFicha = NomeDD;
      ficha.NomePerso = NomePerso;
      ficha.Class_Nivel = Class_Nivel;
      ficha.Antecedente = Antecedente;
      ficha.NomeDoJogador = NomeDoJogador;
      ficha.Raca = Raca;
      ficha.Tendencia = Tendencia;
      ficha.Experiencia = Experiencia;
      ficha.Forca = Forca;
      ficha.ForcaBonus = ForcaBonus;
      ficha.Destreza = Destreza;
      ficha.DestrezaBonus = DestrezaBonus;
      ficha.Constituicao = Constituicao;
      ficha.ConstituicaoBonus = ConstituicaoBonus;
      ficha.Inteligencia = Inteligencia;
      ficha.InteligenciaBonus = InteligenciaBonus;
      ficha.Sabedoria = Sabedoria;
      ficha.SabedoriaBonus = SabedoriaBonus;
      ficha.Carisma = Carisma;
      ficha.CarismaBonus = CarismaBonus;
      ficha.Inspiracao = Inspiracao;
      ficha.Proficiencia = Proficiencia;
      ficha.radioForca = radioForca;
      ficha.SubForca = SubForca;
      ficha.radioDestreza = radioDestreza;
      ficha.SubDestreza = SubDestreza;
      ficha.radioConstituicao = radioConstituicao;
      ficha.SubConstituicao = SubConstituicao;
      ficha.radioInteligencia = radioInteligencia;
      ficha.SubInteligencia = SubInteligencia;
      ficha.radioSabedoria = radioSabedoria;
      ficha.SubSabedoria = SubSabedoria;
      ficha.radioCarisma = radioCarisma;
      ficha.SubCarisma = SubCarisma;
      ficha.radioAcrobacia = radioAcrobacia;
      ficha.SubAcrobacia = SubAcrobacia;
      ficha.radioArcanismo = radioArcanismo;
      ficha.SubArcanismo = SubArcanismo;
      ficha.radioAtletismo = radioAtletismo;
      ficha.SubAtletismo = SubAtletismo;
      ficha.radioAtuacao = radioAtuacao;
      ficha.SubAtuacao = SubAtuacao;
      ficha.radioEnganacao = radioEnganacao;
      ficha.SubEnganacao = SubEnganacao;
      ficha.radioFurtividade = radioFurtividade;
      ficha.SubFurtividade = SubFurtividade;
      ficha.radioHistoria = radioHistoria;
      ficha.SubHistoria = SubHistoria;
      ficha.radioIntimidacao = radioIntimidacao;
      ficha.SubIntimidacao = SubIntimidacao;
      ficha.radioIntuicao = radioIntuicao;
      ficha.SubIntuicao = SubIntuicao;
      ficha.radioInvestigacao = radioInvestigacao;
      ficha.SubInvestigacao = SubInvestigacao;
      ficha.radioAnimais = radioAnimais;
      ficha.SubAnimais = SubAnimais;
      ficha.radioMedicina = radioMedicina;
      ficha.SubMedicina = SubMedicina;
      ficha.radioNatureza = radioNatureza;
      ficha.SubNatureza = SubNatureza;
      ficha.radioPercepcao = radioPercepcao;
      ficha.SubPercepcao = SubPercepcao;
      ficha.radioPersuasao = radioPersuasao;
      ficha.SubPersuasao = SubPersuasao;
      ficha.radioPrestigio = radioPrestigio;
      ficha.SubPrestigio = SubPrestigio;
      ficha.radioReligiao = radioReligiao;
      ficha.SubReligiao = SubReligiao;
      ficha.radioSobrevivencia = radioSobrevivencia;
      ficha.SubSobrevivencia = SubSobrevivencia;
      ficha.Armadura = Armadura;
      ficha.Iniciativa = Iniciativa;
      ficha.Deslocamento = Deslocamento;
      ficha.VidaMaxima = VidaMaxima;
      ficha.VidaAtual = VidaAtual;
      ficha.VidaTemporaria = VidaTemporaria;
      ficha.DadosVidaTotal = DadosVidaTotal;
      ficha.DadosVida = DadosVida;
      ficha.Sucesso1 = Sucesso1;
      ficha.Sucesso2 = Sucesso2;
      ficha.Sucesso3 = Sucesso3;
      ficha.Fracasso1 = Fracasso1;
      ficha.Fracasso2 = Fracasso2;
      ficha.Fracasso3 = Fracasso3;
      ficha.NomeAtaque1 = NomeAtaque1;
      ficha.BonusAtaque1 = BonusAtaque1;
      ficha.DTAtaque1 = DTAtaque1;
      ficha.NomeAtaque2 = NomeAtaque2;
      ficha.BonusAtaque2 = BonusAtaque2;
      ficha.DTAtaque2 = DTAtaque2;
      ficha.NomeAtaque3 = NomeAtaque3;
      ficha.BonusAtaque3 = BonusAtaque3;
      ficha.DTAtaque3 = DTAtaque3;
      ficha.Magias = Magias;
      ficha.SabedoriaPassiva = SabedoriaPassiva;
      ficha.Idiomas = Idiomas;
      ficha.Personalidade = Personalidade;
      ficha.Ideias = Ideias;
      ficha.Ligacoes = Ligacoes;
      ficha.Defeitos = Defeitos;
      ficha.Caracteristicas = Caracteristicas;
      ficha.PC = PC;
      ficha.PP = PP;
      ficha.PE = PE;
      ficha.PO = PO;
      ficha.PL = PL;
      ficha.Equipamento = Equipamento;
      ficha.NomePerso1 = NomePerso1;
      ficha.Idade = Idade;
      ficha.Altura = Altura;
      ficha.Peso = Peso;
      ficha.Olhos = Olhos;
      ficha.Pele = Pele;
      ficha.Cabelo = Cabelo;
      ficha.Orgs = Orgs;
      ficha.Guilda = Guilda;
      ficha.TalentosAdicionais = TalentosAdicionais;
      ficha.Tesouros = Tesouros;
      ficha.HistoriaPersonagem = HistoriaPersonagem;
      ficha.ClasseConjurador = ClasseConjurador;
      ficha.HabilidadeChave = HabilidadeChave;
      ficha.CD = CD;
      ficha.ModificadorAtaque = ModificadorAtaque;
      ficha.Truque1 = Truque1;
      ficha.Truque2 = Truque2;
      ficha.Truque3 = Truque3;
      ficha.Truque4 = Truque4;
      ficha.Truque5 = Truque5;
      ficha.Truque6 = Truque6;
      ficha.Truque7 = Truque7;
      ficha.Truque8 = Truque8;
      ficha.EspacoTotal1 = EspacoTotal1;
      ficha.EspacoUtilizado1 = EspacoUtilizado1;
      ficha.CheckNivel1_1 = CheckNivel1_1;
      ficha.SlotNivel1_1 = SlotNivel1_1;
      ficha.CheckNivel1_2 = CheckNivel1_2;
      ficha.SlotNivel1_2 = SlotNivel1_2;
      ficha.CheckNivel1_3 = CheckNivel1_3;
      ficha.SlotNivel1_3 = SlotNivel1_3;
      ficha.CheckNivel1_4 = CheckNivel1_4;
      ficha.SlotNivel1_4 = SlotNivel1_4;
      ficha.CheckNivel1_5 = CheckNivel1_5;
      ficha.SlotNivel1_5 = SlotNivel1_5;
      ficha.CheckNivel1_6 = CheckNivel1_6;
      ficha.SlotNivel1_6 = SlotNivel1_6;
      ficha.CheckNivel1_7 = CheckNivel1_7;
      ficha.SlotNivel1_7 = SlotNivel1_7;
      ficha.CheckNivel1_8 = CheckNivel1_8;
      ficha.SlotNivel1_8 = SlotNivel1_8;
      ficha.CheckNivel1_9 = CheckNivel1_9;
      ficha.SlotNivel1_9 = SlotNivel1_9;
      ficha.CheckNivel1_10 = CheckNivel1_10;
      ficha.SlotNivel1_10 = SlotNivel1_10;
      ficha.CheckNivel1_11 = CheckNivel1_11;
      ficha.SlotNivel1_11 = SlotNivel1_11;
      ficha.CheckNivel1_12 = CheckNivel1_12;
      ficha.SlotNivel1_12 = SlotNivel1_12;
      ficha.CheckNivel1_13 = CheckNivel1_13;
      ficha.SlotNivel1_13 = SlotNivel1_13;
      ficha.EspacoTotal2 = EspacoTotal2;
      ficha.EspacoUtilizado2 = EspacoUtilizado2;
      ficha.CheckNivel2_1 = CheckNivel2_1;
      ficha.SlotNivel2_1 = SlotNivel2_1;
      ficha.CheckNivel2_2 = CheckNivel2_2;
      ficha.SlotNivel2_2 = SlotNivel2_2;
      ficha.CheckNivel2_3 = CheckNivel2_3;
      ficha.SlotNivel2_3 = SlotNivel2_3;
      ficha.CheckNivel2_4 = CheckNivel2_4;
      ficha.SlotNivel2_4 = SlotNivel2_4;
      ficha.CheckNivel2_5 = CheckNivel2_5;
      ficha.SlotNivel2_5 = SlotNivel2_5;
      ficha.CheckNivel2_6 = CheckNivel2_6;
      ficha.SlotNivel2_6 = SlotNivel2_6;
      ficha.CheckNivel2_7 = CheckNivel2_7;
      ficha.SlotNivel2_7 = SlotNivel2_7;
      ficha.CheckNivel2_8 = CheckNivel2_8;
      ficha.SlotNivel2_8 = SlotNivel2_8;
      ficha.CheckNivel2_9 = CheckNivel2_9;
      ficha.SlotNivel2_9 = SlotNivel2_9;
      ficha.CheckNivel2_10 = CheckNivel2_10;
      ficha.SlotNivel2_10 = SlotNivel2_10;
      ficha.CheckNivel2_11 = CheckNivel2_11;
      ficha.SlotNivel2_11 = SlotNivel2_11;
      ficha.CheckNivel2_12 = CheckNivel2_12;
      ficha.SlotNivel2_12 = SlotNivel2_12;
      ficha.CheckNivel2_13 = CheckNivel2_13;
      ficha.SlotNivel2_13 = SlotNivel2_13;
      ficha.EspacoTotal3 = EspacoTotal3;
      ficha.EspacoUtilizado3 = EspacoUtilizado3;
      ficha.CheckNivel3_1 = CheckNivel3_1;
      ficha.SlotNivel3_1 = SlotNivel3_1;
      ficha.CheckNivel3_2 = CheckNivel3_2;
      ficha.SlotNivel3_2 = SlotNivel3_2;
      ficha.CheckNivel3_3 = CheckNivel3_3;
      ficha.SlotNivel3_3 = SlotNivel3_3;
      ficha.CheckNivel3_4 = CheckNivel3_4;
      ficha.SlotNivel3_4 = SlotNivel3_4;
      ficha.CheckNivel3_5 = CheckNivel3_5;
      ficha.SlotNivel3_5 = SlotNivel3_5;
      ficha.CheckNivel3_6 = CheckNivel3_6;
      ficha.SlotNivel3_6 = SlotNivel3_6;
      ficha.CheckNivel3_7 = CheckNivel3_7;
      ficha.SlotNivel3_7 = SlotNivel3_7;
      ficha.CheckNivel3_8 = CheckNivel3_8;
      ficha.SlotNivel3_8 = SlotNivel3_8;
      ficha.CheckNivel3_9 = CheckNivel3_9;
      ficha.SlotNivel3_9 = SlotNivel3_9;
      ficha.CheckNivel3_10 = CheckNivel3_10;
      ficha.SlotNivel3_10 = SlotNivel3_10;
      ficha.CheckNivel3_11 = CheckNivel3_11;
      ficha.SlotNivel3_11 = SlotNivel3_11;
      ficha.CheckNivel3_12 = CheckNivel3_12;
      ficha.SlotNivel3_12 = SlotNivel3_12;
      ficha.CheckNivel3_13 = CheckNivel3_13;
      ficha.SlotNivel3_13 = SlotNivel3_13;
      ficha.EspacoTotal4 = EspacoTotal4;
      ficha.EspacoUtilizado4 = EspacoUtilizado4;
      ficha.CheckNivel4_1 = CheckNivel4_1;
      ficha.SlotNivel4_1 = SlotNivel4_1;
      ficha.CheckNivel4_2 = CheckNivel4_2;
      ficha.SlotNivel4_2 = SlotNivel4_2;
      ficha.CheckNivel4_3 = CheckNivel4_3;
      ficha.SlotNivel4_3 = SlotNivel4_3;
      ficha.CheckNivel4_4 = CheckNivel4_4;
      ficha.SlotNivel4_4 = SlotNivel4_4;
      ficha.CheckNivel4_5 = CheckNivel4_5;
      ficha.SlotNivel4_5 = SlotNivel4_5;
      ficha.CheckNivel4_6 = CheckNivel4_6;
      ficha.SlotNivel4_6 = SlotNivel4_6;
      ficha.CheckNivel4_7 = CheckNivel4_7;
      ficha.SlotNivel4_7 = SlotNivel4_7;
      ficha.CheckNivel4_8 = CheckNivel4_8;
      ficha.SlotNivel4_8 = SlotNivel4_8;
      ficha.CheckNivel4_9 = CheckNivel4_9;
      ficha.SlotNivel4_9 = SlotNivel4_9;
      ficha.CheckNivel4_10 = CheckNivel4_10;
      ficha.SlotNivel4_10 = SlotNivel4_10;
      ficha.CheckNivel4_11 = CheckNivel4_11;
      ficha.SlotNivel4_11 = SlotNivel4_11;
      ficha.CheckNivel4_12 = CheckNivel4_12;
      ficha.SlotNivel4_12 = SlotNivel4_12;
      ficha.CheckNivel4_13 = CheckNivel4_13;
      ficha.SlotNivel4_13 = SlotNivel4_13;
      ficha.EspacoTotal5 = EspacoTotal5;
      ficha.EspacoUtilizado5 = EspacoUtilizado5;
      ficha.CheckNivel5_1 = CheckNivel5_1;
      ficha.SlotNivel5_1 = SlotNivel5_1;
      ficha.CheckNivel5_2 = CheckNivel5_2;
      ficha.SlotNivel5_2 = SlotNivel5_2;
      ficha.CheckNivel5_3 = CheckNivel5_3;
      ficha.SlotNivel5_3 = SlotNivel5_3;
      ficha.CheckNivel5_4 = CheckNivel5_4;
      ficha.SlotNivel5_4 = SlotNivel5_4;
      ficha.CheckNivel5_5 = CheckNivel5_5;
      ficha.SlotNivel5_5 = SlotNivel5_5;
      ficha.CheckNivel5_6 = CheckNivel5_6;
      ficha.SlotNivel5_6 = SlotNivel5_6;
      ficha.CheckNivel5_7 = CheckNivel5_7;
      ficha.SlotNivel5_7 = SlotNivel5_7;
      ficha.CheckNivel5_8 = CheckNivel5_8;
      ficha.SlotNivel5_8 = SlotNivel5_8;
      ficha.CheckNivel5_9 = CheckNivel5_9;
      ficha.SlotNivel5_9 = SlotNivel5_9;
      ficha.EspacoTotal6 = EspacoTotal6;
      ficha.EspacoUtilizado6 = EspacoUtilizado6;
      ficha.CheckNivel6_1 = CheckNivel6_1;
      ficha.SlotNivel6_1 = SlotNivel6_1;
      ficha.CheckNivel6_2 = CheckNivel6_2;
      ficha.SlotNivel6_2 = SlotNivel6_2;
      ficha.CheckNivel6_3 = CheckNivel6_3;
      ficha.SlotNivel6_3 = SlotNivel6_3;
      ficha.CheckNivel6_4 = CheckNivel6_4;
      ficha.SlotNivel6_4 = SlotNivel6_4;
      ficha.CheckNivel6_5 = CheckNivel6_5;
      ficha.SlotNivel6_5 = SlotNivel6_5;
      ficha.CheckNivel6_6 = CheckNivel6_6;
      ficha.SlotNivel6_6 = SlotNivel6_6;
      ficha.CheckNivel6_7 = CheckNivel6_7;
      ficha.SlotNivel6_7 = SlotNivel6_7;
      ficha.CheckNivel6_8 = CheckNivel6_8;
      ficha.SlotNivel6_8 = SlotNivel6_8;
      ficha.CheckNivel6_9 = CheckNivel6_9;
      ficha.SlotNivel6_9 = SlotNivel6_9;
      ficha.EspacoTotal7 = EspacoTotal7;
      ficha.EspacoUtilizado7 = EspacoUtilizado7;
      ficha.CheckNivel7_1 = CheckNivel7_1;
      ficha.SlotNivel7_1 = SlotNivel7_1;
      ficha.CheckNivel7_2 = CheckNivel7_2;
      ficha.SlotNivel7_2 = SlotNivel7_2;
      ficha.CheckNivel7_3 = CheckNivel7_3;
      ficha.SlotNivel7_3 = SlotNivel7_3;
      ficha.CheckNivel7_4 = CheckNivel7_4;
      ficha.SlotNivel7_4 = SlotNivel7_4;
      ficha.CheckNivel7_5 = CheckNivel7_5;
      ficha.SlotNivel7_5 = SlotNivel7_5;
      ficha.CheckNivel7_6 = CheckNivel7_6;
      ficha.SlotNivel7_6 = SlotNivel7_6;
      ficha.CheckNivel7_7 = CheckNivel7_7;
      ficha.SlotNivel7_7 = SlotNivel7_7;
      ficha.CheckNivel7_8 = CheckNivel7_8;
      ficha.SlotNivel7_8 = SlotNivel7_8;
      ficha.CheckNivel7_9 = CheckNivel7_9;
      ficha.SlotNivel7_9 = SlotNivel7_9;
      ficha.EspacoTotal8 = EspacoTotal8;
      ficha.EspacoUtilizado8 = EspacoUtilizado8;
      ficha.CheckNivel8_1 = CheckNivel8_1;
      ficha.SlotNivel8_1 = SlotNivel8_1;
      ficha.CheckNivel8_2 = CheckNivel8_2;
      ficha.SlotNivel8_2 = SlotNivel8_2;
      ficha.CheckNivel8_3 = CheckNivel8_3;
      ficha.SlotNivel8_3 = SlotNivel8_3;
      ficha.CheckNivel8_4 = CheckNivel8_4;
      ficha.SlotNivel8_4 = SlotNivel8_4;
      ficha.CheckNivel8_5 = CheckNivel8_5;
      ficha.SlotNivel8_5 = SlotNivel8_5;
      ficha.CheckNivel8_6 = CheckNivel8_6;
      ficha.SlotNivel8_6 = SlotNivel8_6;
      ficha.CheckNivel8_7 = CheckNivel8_7;
      ficha.SlotNivel8_7 = SlotNivel8_7;
      ficha.EspacoTota9 = EspacoTota9;
      ficha.EspacoUtilizado9 = EspacoUtilizado9;
      ficha.CheckNive9_1 = CheckNive9_1;
      ficha.SlotNive9_1 = SlotNive9_1;
      ficha.CheckNive9_2 = CheckNive9_2;
      ficha.SlotNive9_2 = SlotNive9_2;
      ficha.CheckNive9_3 = CheckNive9_3;
      ficha.SlotNive9_3 = SlotNive9_3;
      ficha.CheckNive9_4 = CheckNive9_4;
      ficha.SlotNive9_4 = SlotNive9_4;
      ficha.CheckNive9_5 = CheckNive9_5;
      ficha.SlotNive9_5 = SlotNive9_5;
      ficha.CheckNive9_6 = CheckNive9_6;
      ficha.SlotNive9_6 = SlotNive9_6;
      ficha.CheckNive9_7 = CheckNive9_7;
      ficha.SlotNive9_7 = SlotNive9_7;
    }
  }

  fs.writeFileSync(banco, JSON.stringify(fichas, null, 2));
  res.send(`Tudo certo usuario criado com sucesso.`);
});

app.post("/fichaCall/:userId/:nomeFicha", async (req, res) => {
  const idAtual = req.params.userId;
  const userAtual = req.params.nomeFicha;
  const {
    NomeCall,
    NomeJogador,
    JogadorJogador,
    OcupacaoJogador,
    IdadeJogador,
    SexoJogador,
    ResidenciaJogador,
    NascimentoJogador,
    ForJogador,
    For1Jogador,
    For2Jogador,
    ConJogador,
    Con1Jogador,
    Con2Jogador,
    TamJogador,
    Tam1Jogador,
    Tam2Jogador,
    DesJogador,
    Des1Jogador,
    Des2Jogador,
    ApaJogador,
    Apa1Jogador,
    Apa2Jogador,
    IntJogador,
    Int1Jogador,
    Int2Jogador,
    PodJogador,
    Pod1Jogador,
    Pod2Jogador,
    EduJogador,
    Edu1Jogador,
    Edu2Jogador,
    TaxaMovJogador,
    TaxaMov1Jogador,
    TaxaMov2Jogador,
    LesaoGraveJogador,
    LesaoMaximoJogador,
    InsanidadeTempJogador,
    InsanidadeIndJogador,
    InsanidadeIniJogador,
    SorteJogador,
    PontosDeMagia,
    jAntropologia,
    jAntropologia1,
    jAntropologia2,
    jAntropologia3,
    jFogo1,
    jFogo2,
    jFogo3,
    jFogo4,
    jRifles1,
    jRifles2,
    jRifles3,
    jRifles4,
    jArqueologia1,
    jArqueologia2,
    jArqueologia3,
    jArqueologia4,
    jArremessar1,
    jArremessar2,
    jArremessar3,
    jArremessar4,
    jArte1,
    jArte2,
    jArte3,
    jArte4,
    jArte5,
    jVazio1,
    jVazio2,
    jVazio3,
    jVazio4,
    jVazio5,
    jVazio6,
    jVazio7,
    jVazio8,
    jVazio9,
    jVazio10,
    jVazio11,
    jVazio12,
    jVazio13,
    jVazio14,
    jVazio15,
    jAvaliacao1,
    jAvaliacao2,
    jAvaliacao3,
    jAvaliacao4,
    jCavalgar1,
    jCavalgar2,
    jCavalgar3,
    jCavalgar4,
    jCharme1,
    jCharme2,
    jCharme3,
    jCharme4,
    jChaveiro1,
    jChaveiro2,
    jChaveiro3,
    jChaveiro4,
    jCiencia1,
    jCiencia2,
    jCiencia3,
    jCiencia4,
    jVazio16,
    jVazio17,
    jVazio18,
    jVazio19,
    jVazio20,
    jVazio21,
    jVazio22,
    jVazio23,
    jVazio24,
    jVazio25,
    jVazio26,
    jVazio27,
    jVazio28,
    jVazio29,
    jVazio30,
    jEletrico1,
    jEletrico2,
    jEletrico3,
    jEletrico4,
    jMecanico1,
    jMecanico2,
    jMecanico3,
    jMecanico4,
    jContabilidade1,
    jContabilidade2,
    jContabilidade3,
    jContabilidade4,
    jDireito1,
    jDireito2,
    jDireito3,
    jDireito4,
    jDirigir1,
    jDirigir2,
    jDirigir3,
    jDirigir4,
    jDisfarce1,
    jDisfarce2,
    jDisfarce3,
    jDisfarce4,
    jEncontrar1,
    jEncontrar2,
    jEncontrar3,
    jEncontrar4,
    jEscutar1,
    jEscutar2,
    jEscutar3,
    jEscutar4,
    jEscalar1,
    jEscalar2,
    jEscalar3,
    jEscalar4,
    jEsquivar1,
    jEsquivar2,
    jEsquivar3,
    jEsquivar4,
    jLabia1,
    jLabia2,
    jLabia3,
    jLabia4,
    jIntimidacao1,
    jIntimidacao2,
    jIntimidacao3,
    jIntimidacao4,
    jHistoria1,
    jHistoria2,
    jHistoria3,
    jHistoria4,
    jFurtividade1,
    jFurtividade2,
    jFurtividade3,
    jFurtividade4,
    jLinguaN1,
    jLinguaN2,
    jLinguaN3,
    jLinguaN4,
    jLinguaN5,
    jLinguaNN1,
    jLinguaNN2,
    jLinguaNN3,
    jLinguaNN4,
    jLinguaNN5,
    jLingua1,
    jLingua2,
    jLingua3,
    jLingua4,
    jLingua5,
    jLingua6,
    jLingua7,
    jLingua8,
    jLingua9,
    jLingua10,
    jLingua11,
    jLingua12,
    jLingua13,
    jLingua14,
    jLingua15,
    jLingua16,
    jLingua17,
    jLingua18,
    jLingua19,
    jLingua20,
    jLutar1,
    jLutar2,
    jLutar3,
    jLutar4,
    jNada1,
    jNada2,
    jNada3,
    jNada4,
    jNada5,
    jMedicina1,
    jMedicina2,
    jMedicina3,
    jMedicina4,
    jMythos1,
    jMythos2,
    jMythos3,
    jMundo1,
    jMundo2,
    jMundo3,
    jMundo4,
    jNatacao1,
    jNatacao2,
    jNatacao3,
    jNatacao4,
    jNavegacao1,
    jNavegacao2,
    jNavegacao3,
    jNavegacao4,
    jCredito1,
    jCredito2,
    jCredito3,
    jOcultista1,
    jOcultista2,
    jOcultista3,
    jOcultista4,
    jOperar1,
    jOperar2,
    jOperar3,
    jOperar4,
    jPersuasao1,
    jPersuasao2,
    jPersuasao3,
    jPersuasao4,
    jPilotar1,
    jPilotar2,
    jPilotar3,
    jPilotar4,
    jAlgum1,
    jAlgum2,
    jAlgum3,
    jAlgum4,
    jAlgum5,
    jDigitacao1,
    jDigitacao2,
    jDigitacao3,
    jDigitacao4,
    jSocorro1,
    jSocorro2,
    jSocorro3,
    jSocorro4,
    jPsicana1,
    jPsicana2,
    jPsicana3,
    jPsicana4,
    jPsicologia1,
    jPsicologia2,
    jPsicologia3,
    jPsicologia4,
    jSaltar1,
    jSaltar2,
    jSaltar3,
    jSaltar4,
    jRastrear1,
    jRastrear2,
    jRastrear3,
    jRastrear4,
    jSobrevivencia1,
    jSobrevivencia2,
    jSobrevivencia3,
    jSobrevivencia4,
    jSobrevivencia5,
    jBiblioteca1,
    jBiblioteca2,
    jBiblioteca3,
    jBiblioteca4,
    jAdiciona1,
    jAdiciona2,
    jAdiciona3,
    jAdiciona4,
    jAdiciona5,
    jAdiciona6,
    jAdiciona7,
    jAdiciona8,
    jAdiciona9,
    jAdiciona10,
    jArmasDesarmada1,
    jArmasDesarmada2,
    jRegular1,
    jRegular2,
    jDificil1,
    jDificil2,
    jExtremo1,
    jExtremo2,
    jDanod1,
    jDanod2,
    jAlcanceTiro1,
    jAlcanceTiro2,
    jAtaquesa1,
    jAtaquesa2,
    jMunicao1,
    jMunicao2,
    jDefeitos1,
    jDefeitos2,
    jBonusDeDano,
    jCorpo,
    jEsquivador,
    jEsquivador1,
    jEsquivador2,
    jDescricao,
    jCaracteristicas,
    jIdeologias,
    jCicatrizes,
    jPessoas,
    jFobias,
    jLocais,
    jTomos,
    jPertencesQuerido,
    jEntidades,
    jEquipamento,
    jPertences,
    jNivelGasto,
    jDinheiro,
    jPatrimonio,
  } = req.body;

  const banco = path.join(__dirname, ".", "db", "banco_dados_fichas.json");
  const fichas = JSON.parse(
    fs.readFileSync(banco, { encoding: "utf8", flag: "r" })
  );

  for (let ficha of fichas) {
    if (ficha.idUsuario == idAtual && ficha.NomeFicha == userAtual) {
      ficha.NomeFicha = NomeCall;
      ficha.NomeJogador = NomeJogador;
      ficha.JogadorJogador = JogadorJogador;
      ficha.OcupacaoJogador = OcupacaoJogador;
      ficha.IdadeJogador = IdadeJogador;
      ficha.SexoJogador = SexoJogador;
      ficha.ResidenciaJogador = ResidenciaJogador;
      ficha.NascimentoJogador = NascimentoJogador;
      ficha.ForJogador = ForJogador;
      ficha.For1Jogador = For1Jogador;
      ficha.For2Jogador = For2Jogador;
      ficha.ConJogador = ConJogador;
      ficha.Con1Jogador = Con1Jogador;
      ficha.Con2Jogador = Con2Jogador;
      ficha.TamJogador = TamJogador;
      ficha.Tam1Jogador = Tam1Jogador;
      ficha.Tam2Jogador = Tam2Jogador;
      ficha.DesJogador = DesJogador;
      ficha.Des1Jogador = Des1Jogador;
      ficha.Des2Jogador = Des2Jogador;
      ficha.ApaJogador = ApaJogador;
      ficha.Apa1Jogador = Apa1Jogador;
      ficha.Apa2Jogador = Apa2Jogador;
      ficha.IntJogador = IntJogador;
      ficha.Int1Jogador = Int1Jogador;
      ficha.Int2Jogador = Int2Jogador;
      ficha.PodJogador = PodJogador;
      ficha.Pod1Jogador = Pod1Jogador;
      ficha.Pod2Jogador = Pod2Jogador;
      ficha.EduJogador = EduJogador;
      ficha.Edu1Jogador = Edu1Jogador;
      ficha.Edu2Jogador = Edu2Jogador;
      ficha.TaxaMovJogador = TaxaMovJogador;
      ficha.TaxaMov1Jogador = TaxaMov1Jogador;
      ficha.TaxaMov2Jogador = TaxaMov2Jogador;
      ficha.LesaoGraveJogador = LesaoGraveJogador;
      ficha.LesaoMaximoJogador = LesaoMaximoJogador;
      ficha.InsanidadeTempJogador = InsanidadeTempJogador;
      ficha.InsanidadeIndJogador = InsanidadeIndJogador;
      ficha.InsanidadeIniJogador = InsanidadeIniJogador;
      ficha.SorteJogador = SorteJogador;
      ficha.PontosDeMagia = PontosDeMagia;
      ficha.jAntropologia = jAntropologia;
      ficha.jAntropologia1 = jAntropologia1;
      ficha.jAntropologia2 = jAntropologia2;
      ficha.jAntropologia3 = jAntropologia3;
      ficha.jFogo1 = jFogo1;
      ficha.jFogo2 = jFogo2;
      ficha.jFogo3 = jFogo3;
      ficha.jFogo4 = jFogo4;
      ficha.jRifles1 = jRifles1;
      ficha.jRifles2 = jRifles2;
      ficha.jRifles3 = jRifles3;
      ficha.jRifles4 = jRifles4;
      ficha.jArqueologia1 = jArqueologia1;
      ficha.jArqueologia2 = jArqueologia2;
      ficha.jArqueologia3 = jArqueologia3;
      ficha.jArqueologia4 = jArqueologia4;
      ficha.jArremessar1 = jArremessar1;
      ficha.jArremessar2 = jArremessar2;
      ficha.jArremessar3 = jArremessar3;
      ficha.jArremessar4 = jArremessar4;
      ficha.jArte1 = jArte1;
      ficha.jArte2 = jArte2;
      ficha.jArte3 = jArte3;
      ficha.jArte4 = jArte4;
      ficha.jArte5 = jArte5;
      ficha.jVazio1 = jVazio1;
      ficha.jVazio2 = jVazio2;
      ficha.jVazio3 = jVazio3;
      ficha.jVazio4 = jVazio4;
      ficha.jVazio5 = jVazio5;
      ficha.jVazio6 = jVazio6;
      ficha.jVazio7 = jVazio7;
      ficha.jVazio8 = jVazio8;
      ficha.jVazio9 = jVazio9;
      ficha.jVazio10 = jVazio10;
      ficha.jVazio11 = jVazio11;
      ficha.jVazio12 = jVazio12;
      ficha.jVazio13 = jVazio13;
      ficha.jVazio14 = jVazio14;
      ficha.jVazio15 = jVazio15;
      ficha.jAvaliacao1 = jAvaliacao1;
      ficha.jAvaliacao2 = jAvaliacao2;
      ficha.jAvaliacao3 = jAvaliacao3;
      ficha.jAvaliacao4 = jAvaliacao4;
      ficha.jCavalgar1 = jCavalgar1;
      ficha.jCavalgar2 = jCavalgar2;
      ficha.jCavalgar3 = jCavalgar3;
      ficha.jCavalgar4 = jCavalgar4;
      ficha.jCharme1 = jCharme1;
      ficha.jCharme2 = jCharme2;
      ficha.jCharme3 = jCharme3;
      ficha.jCharme4 = jCharme4;
      ficha.jChaveiro1 = jChaveiro1;
      ficha.jChaveiro2 = jChaveiro2;
      ficha.jChaveiro3 = jChaveiro3;
      ficha.jChaveiro4 = jChaveiro4;
      ficha.jCiencia1 = jCiencia1;
      ficha.jCiencia2 = jCiencia2;
      ficha.jCiencia3 = jCiencia3;
      ficha.jCiencia4 = jCiencia4;
      ficha.jVazio16 = jVazio16;
      ficha.jVazio17 = jVazio17;
      ficha.jVazio18 = jVazio18;
      ficha.jVazio19 = jVazio19;
      ficha.jVazio20 = jVazio20;
      ficha.jVazio21 = jVazio21;
      ficha.jVazio22 = jVazio22;
      ficha.jVazio23 = jVazio23;
      ficha.jVazio24 = jVazio24;
      ficha.jVazio25 = jVazio25;
      ficha.jVazio26 = jVazio26;
      ficha.jVazio27 = jVazio27;
      ficha.jVazio28 = jVazio28;
      ficha.jVazio29 = jVazio29;
      ficha.jVazio30 = jVazio30;
      ficha.jEletrico1 = jEletrico1;
      ficha.jEletrico2 = jEletrico2;
      ficha.jEletrico3 = jEletrico3;
      ficha.jEletrico4 = jEletrico4;
      ficha.jMecanico1 = jMecanico1;
      ficha.jMecanico2 = jMecanico2;
      ficha.jMecanico3 = jMecanico3;
      ficha.jMecanico4 = jMecanico4;
      ficha.jContabilidade1 = jContabilidade1;
      ficha.jContabilidade2 = jContabilidade2;
      ficha.jContabilidade3 = jContabilidade3;
      ficha.jContabilidade4 = jContabilidade4;
      ficha.jDireito1 = jDireito1;
      ficha.jDireito2 = jDireito2;
      ficha.jDireito3 = jDireito3;
      ficha.jDireito4 = jDireito4;
      ficha.jDirigir1 = jDirigir1;
      ficha.jDirigir2 = jDirigir2;
      ficha.jDirigir3 = jDirigir3;
      ficha.jDirigir4 = jDirigir4;
      ficha.jDisfarce1 = jDisfarce1;
      ficha.jDisfarce2 = jDisfarce2;
      ficha.jDisfarce3 = jDisfarce3;
      ficha.jDisfarce4 = jDisfarce4;
      ficha.jEncontrar1 = jEncontrar1;
      ficha.jEncontrar2 = jEncontrar2;
      ficha.jEncontrar3 = jEncontrar3;
      ficha.jEncontrar4 = jEncontrar4;
      ficha.jEscutar1 = jEscutar1;
      ficha.jEscutar2 = jEscutar2;
      ficha.jEscutar3 = jEscutar3;
      ficha.jEscutar4 = jEscutar4;
      ficha.jEscalar1 = jEscalar1;
      ficha.jEscalar2 = jEscalar2;
      ficha.jEscalar3 = jEscalar3;
      ficha.jEscalar4 = jEscalar4;
      ficha.jEsquivar1 = jEsquivar1;
      ficha.jEsquivar2 = jEsquivar2;
      ficha.jEsquivar3 = jEsquivar3;
      ficha.jEsquivar4 = jEsquivar4;
      ficha.jLabia1 = jLabia1;
      ficha.jLabia2 = jLabia2;
      ficha.jLabia3 = jLabia3;
      ficha.jLabia4 = jLabia4;
      ficha.jIntimidacao1 = jIntimidacao1;
      ficha.jIntimidacao2 = jIntimidacao2;
      ficha.jIntimidacao3 = jIntimidacao3;
      ficha.jIntimidacao4 = jIntimidacao4;
      ficha.jHistoria1 = jHistoria1;
      ficha.jHistoria2 = jHistoria2;
      ficha.jHistoria3 = jHistoria3;
      ficha.jHistoria4 = jHistoria4;
      ficha.jFurtividade1 = jFurtividade1;
      ficha.jFurtividade2 = jFurtividade2;
      ficha.jFurtividade3 = jFurtividade3;
      ficha.jFurtividade4 = jFurtividade4;
      ficha.jLinguaN1 = jLinguaN1;
      ficha.jLinguaN2 = jLinguaN2;
      ficha.jLinguaN3 = jLinguaN3;
      ficha.jLinguaN4 = jLinguaN4;
      ficha.jLinguaN5 = jLinguaN5;
      ficha.jLinguaNN1 = jLinguaNN1;
      ficha.jLinguaNN2 = jLinguaNN2;
      ficha.jLinguaNN3 = jLinguaNN3;
      ficha.jLinguaNN4 = jLinguaNN4;
      ficha.jLinguaNN5 = jLinguaNN5;
      ficha.jLingua1 = jLingua1;
      ficha.jLingua2 = jLingua2;
      ficha.jLingua3 = jLingua3;
      ficha.jLingua4 = jLingua4;
      ficha.jLingua5 = jLingua5;
      ficha.jLingua6 = jLingua6;
      ficha.jLingua7 = jLingua7;
      ficha.jLingua8 = jLingua8;
      ficha.jLingua9 = jLingua9;
      ficha.jLingua10 = jLingua10;
      ficha.jLingua11 = jLingua11;
      ficha.jLingua12 = jLingua12;
      ficha.jLingua13 = jLingua13;
      ficha.jLingua14 = jLingua14;
      ficha.jLingua15 = jLingua15;
      ficha.jLingua16 = jLingua16;
      ficha.jLingua17 = jLingua17;
      ficha.jLingua18 = jLingua18;
      ficha.jLingua19 = jLingua19;
      ficha.jLingua20 = jLingua20;
      ficha.jLutar1 = jLutar1;
      ficha.jLutar2 = jLutar2;
      ficha.jLutar3 = jLutar3;
      ficha.jLutar4 = jLutar4;
      ficha.jNada1 = jNada1;
      ficha.jNada2 = jNada2;
      ficha.jNada3 = jNada3;
      ficha.jNada4 = jNada4;
      ficha.jNada5 = jNada5;
      ficha.jMedicina1 = jMedicina1;
      ficha.jMedicina2 = jMedicina2;
      ficha.jMedicina3 = jMedicina3;
      ficha.jMedicina4 = jMedicina4;
      ficha.jMythos1 = jMythos1;
      ficha.jMythos2 = jMythos2;
      ficha.jMythos3 = jMythos3;
      ficha.jMundo1 = jMundo1;
      ficha.jMundo2 = jMundo2;
      ficha.jMundo3 = jMundo3;
      ficha.jMundo4 = jMundo4;
      ficha.jNatacao1 = jNatacao1;
      ficha.jNatacao2 = jNatacao2;
      ficha.jNatacao3 = jNatacao3;
      ficha.jNatacao4 = jNatacao4;
      ficha.jNavegacao1 = jNavegacao1;
      ficha.jNavegacao2 = jNavegacao2;
      ficha.jNavegacao3 = jNavegacao3;
      ficha.jNavegacao4 = jNavegacao4;
      ficha.jCredito1 = jCredito1;
      ficha.jCredito2 = jCredito2;
      ficha.jCredito3 = jCredito3;
      ficha.jOcultista1 = jOcultista1;
      ficha.jOcultista2 = jOcultista2;
      ficha.jOcultista3 = jOcultista3;
      ficha.jOcultista4 = jOcultista4;
      ficha.jOperar1 = jOperar1;
      ficha.jOperar2 = jOperar2;
      ficha.jOperar3 = jOperar3;
      ficha.jOperar4 = jOperar4;
      ficha.jPersuasao1 = jPersuasao1;
      ficha.jPersuasao2 = jPersuasao2;
      ficha.jPersuasao3 = jPersuasao3;
      ficha.jPersuasao4 = jPersuasao4;
      ficha.jPilotar1 = jPilotar1;
      ficha.jPilotar2 = jPilotar2;
      ficha.jPilotar3 = jPilotar3;
      ficha.jPilotar4 = jPilotar4;
      ficha.jAlgum1 = jAlgum1;
      ficha.jAlgum2 = jAlgum2;
      ficha.jAlgum3 = jAlgum3;
      ficha.jAlgum4 = jAlgum4;
      ficha.jAlgum5 = jAlgum5;
      ficha.jDigitacao1 = jDigitacao1;
      ficha.jDigitacao2 = jDigitacao2;
      ficha.jDigitacao3 = jDigitacao3;
      ficha.jDigitacao4 = jDigitacao4;
      ficha.jSocorro1 = jSocorro1;
      ficha.jSocorro2 = jSocorro2;
      ficha.jSocorro3 = jSocorro3;
      ficha.jSocorro4 = jSocorro4;
      ficha.jPsicana1 = jPsicana1;
      ficha.jPsicana2 = jPsicana2;
      ficha.jPsicana3 = jPsicana3;
      ficha.jPsicana4 = jPsicana4;
      ficha.jPsicologia1 = jPsicologia1;
      ficha.jPsicologia2 = jPsicologia2;
      ficha.jPsicologia3 = jPsicologia3;
      ficha.jPsicologia4 = jPsicologia4;
      ficha.jSaltar1 = jSaltar1;
      ficha.jSaltar2 = jSaltar2;
      ficha.jSaltar3 = jSaltar3;
      ficha.jSaltar4 = jSaltar4;
      ficha.jRastrear1 = jRastrear1;
      ficha.jRastrear2 = jRastrear2;
      ficha.jRastrear3 = jRastrear3;
      ficha.jRastrear4 = jRastrear4;
      ficha.jSobrevivencia1 = jSobrevivencia1;
      ficha.jSobrevivencia2 = jSobrevivencia2;
      ficha.jSobrevivencia3 = jSobrevivencia3;
      ficha.jSobrevivencia4 = jSobrevivencia4;
      ficha.jSobrevivencia5 = jSobrevivencia5;
      ficha.jBiblioteca1 = jBiblioteca1;
      ficha.jBiblioteca2 = jBiblioteca2;
      ficha.jBiblioteca3 = jBiblioteca3;
      ficha.jBiblioteca4 = jBiblioteca4;
      ficha.jAdiciona1 = jAdiciona1;
      ficha.jAdiciona2 = jAdiciona2;
      ficha.jAdiciona3 = jAdiciona3;
      ficha.jAdiciona4 = jAdiciona4;
      ficha.jAdiciona5 = jAdiciona5;
      ficha.jAdiciona6 = jAdiciona6;
      ficha.jAdiciona7 = jAdiciona7;
      ficha.jAdiciona8 = jAdiciona8;
      ficha.jAdiciona9 = jAdiciona9;
      ficha.jAdiciona10 = jAdiciona10;
      ficha.jArmasDesarmada1 = jArmasDesarmada1;
      ficha.jArmasDesarmada2 = jArmasDesarmada2;
      ficha.jRegular1 = jRegular1;
      ficha.jRegular2 = jRegular2;
      ficha.jDificil1 = jDificil1;
      ficha.jDificil2 = jDificil2;
      ficha.jExtremo1 = jExtremo1;
      ficha.jExtremo2 = jExtremo2;
      ficha.jDanod1 = jDanod1;
      ficha.jDanod2 = jDanod2;
      ficha.jAlcanceTiro1 = jAlcanceTiro1;
      ficha.jAlcanceTiro2 = jAlcanceTiro2;
      ficha.jAtaquesa1 = jAtaquesa1;
      ficha.jAtaquesa2 = jAtaquesa2;
      ficha.jMunicao1 = jMunicao1;
      ficha.jMunicao2 = jMunicao2;
      ficha.jDefeitos1 = jDefeitos1;
      ficha.jDefeitos2 = jDefeitos2;
      ficha.jBonusDeDano = jBonusDeDano;
      ficha.jCorpo = jCorpo;
      ficha.jEsquivador = jEsquivador;
      ficha.jEsquivador1 = jEsquivador1;
      ficha.jEsquivador2 = jEsquivador2;
      ficha.jDescricao = jDescricao;
      ficha.jCaracteristicas = jCaracteristicas;
      ficha.jIdeologias = jIdeologias;
      ficha.jCicatrizes = jCicatrizes;
      ficha.jPessoas = jPessoas;
      ficha.jFobias = jFobias;
      ficha.jLocais = jLocais;
      ficha.jTomos = jTomos;
      ficha.jPertencesQuerido = jPertencesQuerido;
      ficha.jEntidades = jEntidades;
      ficha.jEquipamento = jEquipamento;
      ficha.jPertences = jPertences;
      ficha.jNivelGasto = jNivelGasto;
      ficha.jDinheiro = jDinheiro;
      ficha.jPatrimonio = jPatrimonio;
    }
  }

  fs.writeFileSync(banco, JSON.stringify(fichas, null, 2));
  res.send(`Tudo certo usuario criado com sucesso.`);
});

app.get("/inicio", verificaToken, async (req, res, next) => {
  IdUser = req.userId;
  res.status(200).json({ userId: req.userId });
});

app.get("/profile", verificaToken, async (req, res, next) => {
  res.status(200).json({ userId: req.userId });
});

app.get("/editarFicha", verificaToken, async (req, res, next) => {
  const oi = req.params;
  IdUser = req.userId;
  res.status(200).json({ userId: req.userId });
});

app.get("/fichaDungeons/:info/:infa2", async (req, res, next) => {
  const oi = req.params.info;
  const bla = req.params.infa2;
  IdUser = req.userId;
  const banco = path.join(__dirname, ".", "db", "banco_dados_fichas.json");
  const fichas = JSON.parse(
    fs.readFileSync(banco, { encoding: "utf8", flag: "r" })
  );
  for (let ficha of fichas) {
    if (ficha.idUsuario == oi && ficha.NomeFicha == bla) {
      res.json({
        NomeJogador: ficha.NomeJogador,
        JogadorJogador: ficha.JogadorJogador,
      });
      return;
    }
  }
});

app.get("/fichaCall/:info/:infa", verificaToken, async (req, res, next) => {
  IdUser = req.userId;
  res.status(200).json({ userId: req.userId });
});

app.get("/profile2", async (req, res, next) => {
  IdUser = req.userId;
  const banco = path.join(__dirname, ".", "db", "banco_dados_usuario.json");
  const usuarios = JSON.parse(
    fs.readFileSync(banco, { encoding: "utf8", flag: "r" })
  );
  for (let user of usuarios) {
    if (user.id === IdUser) {
      res.json({ username: user.username, email: user.email });
    }
  }
});

app.get("/setting", verificaToken, async (req, res, next) => {
  IdUser = req.userId;
  res.status(200).json({ userId: req.userId });
});

app.get("/DungeonsDragons", verificaToken, async (req, res, next) => {
  IdUser = req.userId;
  const urlAtual = req.path;
  res.status(200).json({ userId: req.userId });
});

app.get("/CallCthulhu", verificaToken, async (req, res, next) => {
  IdUser = req.userId;
  res.status(200).json({ userId: req.userId });
});

app.get(
  "/fichaCall/:userId/:nomeFicha",
  verificaToken,
  async (req, res, next) => {
    IdUser = req.userId;
    res.status(200).json({ userId: req.userId });
  }
);

app.get("/inicio2", async (req, res) => {
  try {
    const data = fs.readFileSync("./db/banco_dados_fichas.json", "utf8");
    const fichas = JSON.parse(data);
    const nomeFichas = fichas
      .filter((ficha) => ficha.idUsuario === parseInt(IdUser))
      .map((ficha) => ficha.NomeFicha);
    const tipoFichas = fichas
      .filter((ficha) => ficha.idUsuario === parseInt(IdUser))
      .map((ficha) => ficha.tipo);

    res.status(200).json({ nomeFichas, tipoFichas });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar NomeFichas." });
  }
});

function reorganizarIDs(fichas) {
  for (let i = 0; i < fichas.length; i++) {
    fichas[i].id = i + 1; 
  }
}

app.delete("/ficha/:nomeDaFicha", (req, res) => {
  const nomeDaFicha = req.params.nomeDaFicha;
  try {
    const data = fs.readFileSync("./db/banco_dados_fichas.json", "utf8");
    const fichas = JSON.parse(data);

    const index = fichas.findIndex((ficha) => ficha.NomeFicha === nomeDaFicha);

    if (index !== -1) {
      fichas.splice(index, 1);
      reorganizarIDs(fichas);
      fs.writeFileSync(
        "./db/banco_dados_fichas.json",
        JSON.stringify(fichas, null, 2)
      );

      res
        .status(200)
        .json({ message: `Ficha ${nomeDaFicha} excluída com sucesso` });
    } else {
      res.status(404).json({ error: `Ficha ${nomeDaFicha} não encontrada` });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir ficha" });
  }
});

function verificaToken(req, res, next) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token == null) return res.status(401).send("Acesso Negado");
  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) return res.status(403).send("Token Inválido/Expirado");

    req.userId = decoded.id;
    next();
  });
}
