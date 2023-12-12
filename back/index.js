require("dotenv").config();
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Necessário para extrair os dados de Forms vindos de uma requisição POST
app.use(express.json());
app.use(cors());


app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});


app.post('/Cadastro', async (req,res) =>{
    const {username, email, password} = req.body;
    //console.log("testeasfd");
    const banco = path.join(__dirname, '.', 'db', 'banco_dados_usuario.json');
    const usuarios = JSON.parse(fs.readFileSync(banco, { encoding: 'utf8', flag: 'r' }));
    for (let usurario of usuarios){
         if(usurario.email === email){
             return res.status(409).send(`Usuario com email ${email} já existe.`);
         }
         if(usurario.username===username)
         {
            return res.status(409).send(`Usuario com email ${email} já existe.`);
         }   
    }
    
    const id = usuarios.length + 1;
    
    const salt = await bcrypt.genSalt(10);
    const passwordCrypt = await bcrypt.hash(password,salt);

    const Usuario = { "id": id, "username" : username, "email" : email, "password" : passwordCrypt};
    usuarios.push(Usuario);
    fs.writeFileSync(banco,JSON.stringify(usuarios,null,2));
    res.send(`Tudo certo usuario criado com sucesso.`);
    
})

app.post('/Login', async (req,res) => {
    //extraindo os dados do formulário para criacao do usuario
    const {username, password} = req.body; 
    const banco = path.join(__dirname, '.', 'db', 'banco_dados_usuario.json');
    const usuarios = JSON.parse(fs.readFileSync(banco, { encoding: 'utf8', flag: 'r' }));
    console.log(username);
    console.log(password);

    for (let user of usuarios){
         if(user.username === username){
             const passwordValidado = await bcrypt.compare(password, user.password);
             if(passwordValidado){          
                   const token = jwt.sign(user, process.env.TOKEN);
                    console.log("foi");
                    return res.json({ "token" : token});      
             }
             else
                 return res.status(422).send(`Usuario ou senhas incorretas.`);
         }  
     }
    
    // //Nesse ponto não existe usuario com usuario informado.
    return res.status(409).send(`${username} não existe. Considere criar uma conta!`);

})

app.post('/DungeonsDragons',async (req,res) => {
    const {NomePerso, Class_Nivel,Antecedente,NomeDoJogador,Raca,Tendencia,Experiencia,Forca,ForcaBonus,Destreza,DestrezaBonus,Constituicao,ConstituicaoBonus,Inteligencia,InteligenciaBonus,Sabedoria,SabedoriaBonus,Carisma,CarismaBonus,Inspiracao,Proficiencia,radioForca,SubForca,radioDestreza,SubDestreza,radioConstituicao,SubConstituicao,radioInteligencia,SubInteligencia,radioSabedoria,SubSabedoria,radioCarisma,SubCarisma,radioAcrobacia,SubAcrobacia,radioArcanismo,SubArcanismo,radioAtletismo,SubAtletismo,radioAtuacao,SubAtuacao,radioEnganacao,SubEnganacao,radioFurtividade,SubFurtividade,radioHistoria,SubHistoria,radioIntimidacao,SubIntimidacao,radioIntuicao,SubIntuicao,radioInvestigacao,SubInvestigacao,radioAnimais,SubAnimais,radioMedicina,SubMedicina,radioNatureza,SubNatureza,radioPercepcao,SubPercepcao,radioPersuasao,SubPersuasao,radioPrestigio,SubPrestigio,radioReligiao,SubReligiao,radioSobrevivencia,SubSobrevivencia,Armadura,Iniciativa,Deslocamento,VidaMaxima,VidaAtual,VidaTemporaria,DadosVidaTotal,DadosVida,Sucesso1,Sucesso2,Sucesso3,Fracasso1,Fracasso2,Fracasso3,NomeAtaque1,BonusAtaque1,DTAtaque1,NomeAtaque2,BonusAtaque2,DTAtaque2,NomeAtaque3,BonusAtaque3,DTAtaque3,Magias,SabedoriaPassiva,Idiomas,Personalidade,Ideias,Ligacoes,Defeitos,Caracteristicas,PC,PP,PE,PO,PL,Equipamento,NomePerso1,Idade,Altura,Peso,Olhos,Pele,Cabelo,Orgs,Guilda,TalentosAdicionais,Tesouros,HistoriaPersonagem,ClasseConjurador,HabilidadeChave,CD,ModificadorAtaque,Truque1,Truque2,Truque3,Truque4,Truque5,Truque6,Truque7,Truque8,EspacoTotal1,EspacoUtilizado1,CheckNivel1_1,SlotNivel1_1,CheckNivel1_2,SlotNivel1_2,CheckNivel1_3,SlotNivel1_3,CheckNivel1_4,SlotNivel1_4,CheckNivel1_5,SlotNivel1_5,CheckNivel1_6,SlotNivel1_6,CheckNivel1_7,SlotNivel1_7,CheckNivel1_8,SlotNivel1_8,CheckNivel1_9,SlotNivel1_9,CheckNivel1_10,SlotNivel1_10,CheckNivel1_11,SlotNivel1_11,CheckNivel1_12,SlotNivel1_12,CheckNivel1_13,SlotNivel1_13,EspacoTotal2,EspacoUtilizado2,CheckNivel2_1,SlotNivel2_1,CheckNivel2_2,SlotNivel2_2,CheckNivel2_3,SlotNivel2_3,CheckNivel2_4,SlotNivel2_4,CheckNivel2_5,SlotNivel2_5,CheckNivel2_6,SlotNivel2_6,CheckNivel2_7,SlotNivel2_7,CheckNivel2_8,SlotNivel2_8,CheckNivel2_9,SlotNivel2_9,CheckNivel2_10,SlotNivel2_10,CheckNivel2_11,SlotNivel2_11,CheckNivel2_12,SlotNivel2_12,CheckNivel2_13,SlotNivel2_13,EspacoTotal3,EspacoUtilizado3,CheckNivel3_1,SlotNivel3_1,CheckNivel3_2,SlotNivel3_2,CheckNivel3_3,SlotNivel3_3,CheckNivel3_4,SlotNivel3_4,CheckNivel3_5,SlotNivel3_5,CheckNivel3_6,SlotNivel3_6,CheckNivel3_7,SlotNivel3_7,CheckNivel3_8,SlotNivel3_8,CheckNivel3_9,SlotNivel3_9,CheckNivel3_10,SlotNivel3_10,CheckNivel3_11,SlotNivel3_11,CheckNivel3_12,SlotNivel3_12,CheckNivel3_13,SlotNivel3_13,EspacoTotal4,EspacoUtilizado4,CheckNivel4_1,SlotNivel4_1,CheckNivel4_2,SlotNivel4_2,CheckNivel4_3,SlotNivel4_3,CheckNivel4_4,SlotNivel4_4,CheckNivel4_5,SlotNivel4_5,CheckNivel4_6,SlotNivel4_6,CheckNivel4_7,SlotNivel4_7,CheckNivel4_8,SlotNivel4_8,CheckNivel4_9,SlotNivel4_9,CheckNivel4_10,SlotNivel4_10,CheckNivel4_11,SlotNivel4_11,CheckNivel4_12,SlotNivel4_12,CheckNivel4_13,SlotNivel4_13,EspacoTotal5,EspacoUtilizado5,CheckNivel5_1,SlotNivel5_1,CheckNivel5_2,SlotNivel5_2,CheckNivel5_3,SlotNivel5_3,CheckNivel5_4,SlotNivel5_4,CheckNivel5_5,SlotNivel5_5,CheckNivel5_6,SlotNivel5_6,CheckNivel5_7,SlotNivel5_7,CheckNivel5_8,SlotNivel5_8,CheckNivel5_9,SlotNivel5_9,EspacoTotal6,EspacoUtilizado6,CheckNivel6_1,SlotNivel6_1,CheckNivel6_2,SlotNivel6_2,CheckNivel6_3,SlotNivel6_3,CheckNivel6_4,SlotNivel6_4,CheckNivel6_5,SlotNivel6_5,CheckNivel6_6,SlotNivel6_6,CheckNivel6_7,SlotNivel6_7,CheckNivel6_8,SlotNivel6_8,CheckNivel6_9,SlotNivel6_9,EspacoTotal7,EspacoUtilizado7,CheckNivel7_1,SlotNivel7_1,CheckNivel7_2,SlotNivel7_2,CheckNivel7_3,SlotNivel7_3,CheckNivel7_4,SlotNivel7_4,CheckNivel7_5,SlotNivel7_5,CheckNivel7_6,SlotNivel7_6,CheckNivel7_7,SlotNivel7_7,CheckNivel7_8,SlotNivel7_8,CheckNivel7_9,SlotNivel7_9,EspacoTotal8,EspacoUtilizado8,CheckNivel8_1,SlotNivel8_1,CheckNivel8_2,SlotNivel8_2,CheckNivel8_3,SlotNivel8_3,CheckNivel8_4,SlotNivel8_4,CheckNivel8_5,SlotNivel8_5,CheckNivel8_6,SlotNivel8_6,CheckNivel8_7,SlotNivel8_7,EspacoTota9,EspacoUtilizado9,CheckNive9_1,SlotNive9_1,CheckNive9_2,SlotNive9_2,CheckNive9_3,SlotNive9_3,CheckNive9_4,SlotNive9_4,CheckNive9_5,SlotNive9_5,CheckNive9_6,SlotNive9_6,CheckNive9_7,SlotNive9_7} = req.body;


    const banco = path.join(__dirname, '.', 'db', 'banco_dados_fichas.json');
    const fichas = JSON.parse(fs.readFileSync(banco, { encoding: 'utf8', flag: 'r' }));
    console.log(NomeAtaque3);
    console.log(DTAtaque3);
    console.log(BonusAtaque3);
    console.log(Magias);
    const id = fichas.length + 1;

    const ficha = { "id": id, "NomePerso" : NomePerso, "Class_Nivel": Class_Nivel, "Antecedente": Antecedente,"NomeDoJogador":NomeDoJogador,"Raca":Raca,"Tendencia":Tendencia,"Experiencia":Experiencia,"Forca":Forca,"ForcaBonus":ForcaBonus,"Destreza":Destreza,"DestrezaBonus":DestrezaBonus,"Constituicao":Constituicao,"ConstituicaoBonus":ConstituicaoBonus,"Inteligencia":Inteligencia,"InteligenciaBonus":InteligenciaBonus,"Sabedoria":Sabedoria,"SabedoriaBonus":SabedoriaBonus,"Carisma":Carisma,"CarismaBonus":CarismaBonus,"Inspiracao":Inspiracao,"Proficiencia":Proficiencia,"radioForca":radioForca,"SubForca":SubForca,"radioDestreza":radioDestreza,"SubDestreza":SubDestreza,"radioConstituicao":radioConstituicao,"SubConstituicao":SubConstituicao,"radioInteligencia":radioInteligencia,"SubInteligencia":SubInteligencia,"radioSabedoria":radioSabedoria,"SubSabedoria":SubSabedoria,"radioCarisma":radioCarisma,"SubCarisma":SubCarisma,"radioAcrobacia":radioAcrobacia,"SubAcrobacia":SubAcrobacia,"radioArcanismo":radioArcanismo,"SubArcanismo":SubArcanismo,"radioAtletismo":radioAtletismo,"SubAtletismo":SubAtletismo,"radioAtuacao":radioAtuacao,"SubAtuacao":SubAtuacao,"radioEnganacao":radioEnganacao,"SubEnganacao":SubEnganacao,"radioFurtividade":radioFurtividade,"SubFurtividade":SubFurtividade,"radioHistoria":radioHistoria,"SubHistoria":SubHistoria,"radioIntimidacao":radioIntimidacao,"SubIntimidacao":SubIntimidacao,"radioIntuicao":radioIntuicao,"SubIntuicao":SubIntuicao,"radioInvestigacao":radioInvestigacao,"SubInvestigacao":SubInvestigacao,"radioAnimais":radioAnimais,"SubAnimais":SubAnimais,"radioMedicina":radioMedicina,"SubMedicina":SubMedicina,"radioNatureza":radioNatureza,"SubNatureza":SubNatureza,"radioPercepcao":radioPercepcao,"SubPercepcao":SubPercepcao,"radioPersuasao":radioPersuasao,"SubPersuasao":SubPersuasao,"radioPrestigio":radioPrestigio,"SubPrestigio":SubPrestigio,"radioReligiao":radioReligiao,"SubReligiao":SubReligiao,"radioSobrevivencia":radioSobrevivencia,"SubSobrevivencia":SubSobrevivencia,"Armadura":Armadura,"Iniciativa":Iniciativa,"Deslocamento":Deslocamento,"VidaMaxima":VidaMaxima,"VidaAtual":VidaAtual,"VidaTemporaria":VidaTemporaria,"DadosVidaTotal":DadosVidaTotal,"DadosVida":DadosVida,"Sucesso1":Sucesso1,"Sucesso2":Sucesso2,"Sucesso3":Sucesso3,"Fracasso1":Fracasso1,"Fracasso2":Fracasso2,"Fracasso3":Fracasso3,"NomeAtaque1":NomeAtaque1,"BonusAtaque1":BonusAtaque1,"DTAtaque1":DTAtaque1,"NomeAtaque2":NomeAtaque2,"BonusAtaque2":BonusAtaque2,"DTAtaque2":DTAtaque2,"NomeAtaque3":NomeAtaque3,"BonusAtaque3":BonusAtaque3,"DTAtaque3":DTAtaque3,"Magias":Magias,"SabedoriaPassiva":SabedoriaPassiva,"Idiomas":Idiomas,"Personalidade":Personalidade,"Ideias":Ideias,"Ligacoes":Ligacoes,"Defeitos":Defeitos,"Caracteristicas":Caracteristicas,"PC":PC,"PP":PP,"PE":PE,"PO":PO,"PL":PL,"Equipamento":Equipamento,"NomePerso1":NomePerso1,"Idade":Idade,"Altura":Altura,"Peso":Peso,"Olhos":Olhos,"Pele":Pele,"Cabelo":Cabelo,"Orgs":Orgs,"Guilda":Guilda,"TalentosAdicionais":TalentosAdicionais,"Tesouros":Tesouros,"HistoriaPersonagem":HistoriaPersonagem,"ClasseConjurador":ClasseConjurador,"HabilidadeChave":HabilidadeChave,"CD":CD,"ModificadorAtaque":ModificadorAtaque,"Truque1":Truque1,"Truque2":Truque2,"Truque3":Truque3,"Truque4":Truque4,"Truque5":Truque5,"Truque6":Truque6,"Truque7":Truque7,"Truque8":Truque8,"EspacoTotal1":EspacoTotal1,"EspacoUtilizado1":EspacoUtilizado1,"CheckNivel1_1":CheckNivel1_1,"SlotNivel1_1":SlotNivel1_1,"CheckNivel1_2":CheckNivel1_2,"SlotNivel1_2":SlotNivel1_2,"CheckNivel1_3":CheckNivel1_3,"SlotNivel1_3":SlotNivel1_3,"CheckNivel1_4":CheckNivel1_4,"SlotNivel1_4":SlotNivel1_4,"CheckNivel1_5":CheckNivel1_5,"SlotNivel1_5":SlotNivel1_5,"CheckNivel1_6":CheckNivel1_6,"SlotNivel1_6":SlotNivel1_6,"CheckNivel1_7":CheckNivel1_7,"SlotNivel1_7":SlotNivel1_7,"CheckNivel1_8":CheckNivel1_8,"SlotNivel1_8":SlotNivel1_8,"CheckNivel1_9":CheckNivel1_9,"SlotNivel1_9":SlotNivel1_9,"CheckNivel1_10":CheckNivel1_10,"SlotNivel1_10":SlotNivel1_10,"CheckNivel1_11":CheckNivel1_11,"SlotNivel1_11":SlotNivel1_11,"CheckNivel1_12":CheckNivel1_12,"SlotNivel1_12":SlotNivel1_12,"CheckNivel1_13":CheckNivel1_13,"SlotNivel1_13":SlotNivel1_13,"EspacoTotal2":EspacoTotal2,"EspacoUtilizado2":EspacoUtilizado2,"CheckNivel2_1":CheckNivel2_1,"SlotNivel2_1":SlotNivel2_1,"CheckNivel2_2":CheckNivel2_2,"SlotNivel2_2":SlotNivel2_2,"CheckNivel2_3":CheckNivel2_3,"SlotNivel2_3":SlotNivel2_3,"CheckNivel2_4":CheckNivel2_4,"SlotNivel2_4":SlotNivel2_4,"CheckNivel2_5":CheckNivel2_5,"SlotNivel2_5":SlotNivel2_5,"CheckNivel2_6":CheckNivel2_6,"SlotNivel2_6":SlotNivel2_6,"CheckNivel2_7":CheckNivel2_7,"SlotNivel2_7":SlotNivel2_7,"CheckNivel2_8":CheckNivel2_8,"SlotNivel2_8":SlotNivel2_8,"CheckNivel2_9":CheckNivel2_9,"SlotNivel2_9":SlotNivel2_9,"CheckNivel2_10":CheckNivel2_10,"SlotNivel2_10":SlotNivel2_10,"CheckNivel2_11":CheckNivel2_11,"SlotNivel2_11":SlotNivel2_11,"CheckNivel2_12":CheckNivel2_12,"SlotNivel2_12":SlotNivel2_12,"CheckNivel2_13":CheckNivel2_13,"SlotNivel2_13":SlotNivel2_13,"EspacoTotal3":EspacoTotal3,"EspacoUtilizado3":EspacoUtilizado3,"CheckNivel3_1":CheckNivel3_1,"SlotNivel3_1":SlotNivel3_1,"CheckNivel3_2":CheckNivel3_2,"SlotNivel3_2":SlotNivel3_2,"CheckNivel3_3":CheckNivel3_3,"SlotNivel3_3":SlotNivel3_3,"CheckNivel3_4":CheckNivel3_4,"SlotNivel3_4":SlotNivel3_4,"CheckNivel3_5":CheckNivel3_5,"SlotNivel3_5":SlotNivel3_5,"CheckNivel3_6":CheckNivel3_6,"SlotNivel3_6":SlotNivel3_6,"CheckNivel3_7":CheckNivel3_7,"SlotNivel3_7":SlotNivel3_7,"CheckNivel3_8":CheckNivel3_8,"SlotNivel3_8":SlotNivel3_8,"CheckNivel3_9":CheckNivel3_9,"SlotNivel3_9":SlotNivel3_9,"CheckNivel3_10":CheckNivel3_10,"SlotNivel3_10":SlotNivel3_10,"CheckNivel3_11":CheckNivel3_11,"SlotNivel3_11":SlotNivel3_11,"CheckNivel3_12":CheckNivel3_12,"SlotNivel3_12":SlotNivel3_12,"CheckNivel3_13":CheckNivel3_13,"SlotNivel3_13":SlotNivel3_13,"EspacoTotal4":EspacoTotal4,"EspacoUtilizado4":EspacoUtilizado4,"CheckNivel4_1":CheckNivel4_1,"SlotNivel4_1":SlotNivel4_1,"CheckNivel4_2":CheckNivel4_2,"SlotNivel4_2":SlotNivel4_2,"CheckNivel4_3":CheckNivel4_3,"SlotNivel4_3":SlotNivel4_3,"CheckNivel4_4":CheckNivel4_4,"SlotNivel4_4":SlotNivel4_4,"CheckNivel4_5":CheckNivel4_5,"SlotNivel4_5":SlotNivel4_5,"CheckNivel4_6":CheckNivel4_6,"SlotNivel4_6":SlotNivel4_6,"CheckNivel4_7":CheckNivel4_7,"SlotNivel4_7":SlotNivel4_7,"CheckNivel4_8":CheckNivel4_8,"SlotNivel4_8":SlotNivel4_8,"CheckNivel4_9":CheckNivel4_9,"SlotNivel4_9":SlotNivel4_9,"CheckNivel4_10":CheckNivel4_10,"SlotNivel4_10":SlotNivel4_10,"CheckNivel4_11":CheckNivel4_11,"SlotNivel4_11":SlotNivel4_11,"CheckNivel4_12":CheckNivel4_12,"SlotNivel4_12":SlotNivel4_12,"CheckNivel4_13":CheckNivel4_13,"SlotNivel4_13":SlotNivel4_13,"EspacoTotal5":EspacoTotal5,"EspacoUtilizado5":EspacoUtilizado5,"CheckNivel5_1":CheckNivel5_1,"SlotNivel5_1":SlotNivel5_1,"CheckNivel5_2":CheckNivel5_2,"SlotNivel5_2":SlotNivel5_2,"CheckNivel5_3":CheckNivel5_3,"SlotNivel5_3":SlotNivel5_3,"CheckNivel5_4":CheckNivel5_4,"SlotNivel5_4":SlotNivel5_4,"CheckNivel5_5":CheckNivel5_5,"SlotNivel5_5":SlotNivel5_5,"CheckNivel5_6":CheckNivel5_6,"SlotNivel5_6":SlotNivel5_6,"CheckNivel5_7":CheckNivel5_7,"SlotNivel5_7":SlotNivel5_7,"CheckNivel5_8":CheckNivel5_8,"SlotNivel5_8":SlotNivel5_8,"CheckNivel5_9":CheckNivel5_9,"SlotNivel5_9":SlotNivel5_9,"EspacoTotal6":EspacoTotal6,"EspacoUtilizado6":EspacoUtilizado6,"CheckNivel6_1":CheckNivel6_1,"SlotNivel6_1":SlotNivel6_1,"CheckNivel6_2":CheckNivel6_2,"SlotNivel6_2":SlotNivel6_2,"CheckNivel6_3":CheckNivel6_3,"SlotNivel6_3":SlotNivel6_3,"CheckNivel6_4":CheckNivel6_4,"SlotNivel6_4":SlotNivel6_4,"CheckNivel6_5":CheckNivel6_5,"SlotNivel6_5":SlotNivel6_5,"CheckNivel6_6":CheckNivel6_6,"SlotNivel6_6":SlotNivel6_6,"CheckNivel6_7":CheckNivel6_7,"SlotNivel6_7":SlotNivel6_7,"CheckNivel6_8":CheckNivel6_8,"SlotNivel6_8":SlotNivel6_8,"CheckNivel6_9":CheckNivel6_9,"SlotNivel6_9":SlotNivel6_9,"EspacoTotal7":EspacoTotal7,"EspacoUtilizado7":EspacoUtilizado7,"CheckNivel7_1":CheckNivel7_1,"SlotNivel7_1":SlotNivel7_1,"CheckNivel7_2":CheckNivel7_2,"SlotNivel7_2":SlotNivel7_2,"CheckNivel7_3":CheckNivel7_3,"SlotNivel7_3":SlotNivel7_3,"CheckNivel7_4":CheckNivel7_4,"SlotNivel7_4":SlotNivel7_4,"CheckNivel7_5":CheckNivel7_5,"SlotNivel7_5":SlotNivel7_5,"CheckNivel7_6":CheckNivel7_6,"SlotNivel7_6":SlotNivel7_6,"CheckNivel7_7":CheckNivel7_7,"SlotNivel7_7":SlotNivel7_7,"CheckNivel7_8":CheckNivel7_8,"SlotNivel7_8":SlotNivel7_8,"CheckNivel7_9":CheckNivel7_9,"SlotNivel7_9":SlotNivel7_9,"EspacoTotal8":EspacoTotal8,"EspacoUtilizado8":EspacoUtilizado8,"CheckNivel8_1":CheckNivel8_1,"SlotNivel8_1":SlotNivel8_1,"CheckNivel8_2":CheckNivel8_2,"SlotNivel8_2":SlotNivel8_2,"CheckNivel8_3":CheckNivel8_3,"SlotNivel8_3":SlotNivel8_3,"CheckNivel8_4":CheckNivel8_4,"SlotNivel8_4":SlotNivel8_4,"CheckNivel8_5":CheckNivel8_5,"SlotNivel8_5":SlotNivel8_5,"CheckNivel8_6":CheckNivel8_6,"SlotNivel8_6":SlotNivel8_6,"CheckNivel8_7":CheckNivel8_7,"SlotNivel8_7":SlotNivel8_7,"EspacoTota9":EspacoTota9,"EspacoUtilizado9":EspacoUtilizado9,"CheckNive9_1":CheckNive9_1,"SlotNive9_1":SlotNive9_1,"CheckNive9_2":CheckNive9_2,"SlotNive9_2":SlotNive9_2,"CheckNive9_3":CheckNive9_3,"SlotNive9_3":SlotNive9_3,"CheckNive9_4":CheckNive9_4,"SlotNive9_4":SlotNive9_4,"CheckNive9_5":CheckNive9_5,"SlotNive9_5":SlotNive9_5,"CheckNive9_6":CheckNive9_6,"SlotNive9_6":SlotNive9_6,"CheckNive9_7":CheckNive9_7,"SlotNive9_7":SlotNive9_7};

    fichas.push(ficha);
    fs.writeFileSync(banco,JSON.stringify(fichas,null,2));
    res.send(`Tudo certo usuario criado com sucesso.`);

})

app.get('/inicio',verificaToken ,async(req,res)=>{
    return res.send();
});

app.get("/profile",verificaToken, async(req,res)=>{
    return res.send()
});

app.get("/setting",verificaToken, async(req,res)=>{
    return res.send()
});

app.get("/DungeonsDragons",verificaToken, async(req,res)=>{
    return res.send()
});

app.get("/CallCthulhu",verificaToken, async(req,res)=>{
    return res.send()
});


// //Requisicao com POST publica para criar usuário
// app.post('/Cadastro', async (req,res) => {
//     //extraindo os dados do formulário para criacao do usuario
//     const {username, email, password} = req.body; 
    
//     const jsonPath = path.join(__dirname, '.', 'db', 'banco-dados-usuario.json');
//     const usuariosCadastrados = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

//     //verifica se já existe usuario com o email informado
    
//     for (let users of usuariosCadastrados){
//         if(users.email === email){
//             //usuario já existe. Impossivel criar outro
//             //Retornando o erro 409 para indicar conflito
//             return res.status(409).send(`Usuario com email ${email} já existe.`);
//         }   
//     }
//     //Deu certo. Vamos colocar o usuário no "banco"
//     //Gerar um id incremental baseado na qt de users
//     const id = usuariosCadastrados.length + 1;
    
//     //gerar uma senha cryptografada
//     const salt = await bcrypt.genSalt(10);
//     const passwordCrypt = await bcrypt.hash(password,salt);

//     //Criacao do user
//     const user = new User(id, username, email, passwordCrypt);

//     //Salva user no "banco"
//     usuariosCadastrados.push(user);
//     fs.writeFileSync(jsonPath,JSON.stringify(usuariosCadastrados,null,2));
//     res.send(`Tudo certo usuario criado com sucesso.`);
// });

function verificaToken(req,res,next)
{
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1]
    //Bearer token
    if(token == null) return res.status(401).send('Acesso Negado');
    jwt.verify(token, process.env.TOKEN, (err) => {
        if(err) return res.status(403).send('Token Inválido/Expirado');
        next();
    })
}

