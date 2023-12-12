import "../Styles/Mysetting.css";
import Header from "./HeaderLogado";
import Footer from "../Inicio/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {set, useForm} from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Myprofile() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditEnable, setIsEditEnable] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [msg, setMsg] = useState();
  const [userId, setUserId] = useState(null);
  const [validado, setValidado] = useState(false);
  
  const schema = yup.object({
    username: yup.string().required("Digite o Usuário"),
    email: yup.string().email('Email inválido').required("Digite o seu email"),
    password: yup.string().min(4,'Minimo de 4 caracteres').required('Digite sua senha atual'),
    newPassword: yup.string().min(4,'Minimo de 4 caracteres').required("Qual sua nova senha?"),
    newPasswordConf: yup.string().oneOf([yup.ref('newPassword')], 'As senhas devem coincidir!').required("")
  });
  const form = useForm({
    resolver: yupResolver(schema)
  });

  const { register, control, handleSubmit, formState } = form;
  const {errors} = formState;

  const config = {
    headers: {
      Authorization: "Bearer ".concat(sessionStorage.getItem("token")),
    },
  };

  useEffect(() => {
    async function valida() {
      try {
        const response = await axios.get(
          `http://localhost:3000/setting`,
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
  const submit = async (data) => { 
    setIsEditMode(false);
    setIsEditEnable(true);
    setIsSaveEnabled(false);
    try {
      const response = await axios.post('http://localhost:3000/setting', data);
      //setMsg(response.data);
      //if(response.data.includes('sucesso'))
       // setFichaCriado(true);
  } catch (error) {
      //setMsg(error.response.data);
  }  

  };
  // const handleSaveClick = () => {
 
  // };

  const handleEditClick = () => {
    setIsEditMode(true);
    setIsEditEnable(false);
    setIsSaveEnabled(true);
  };

  if (!validado) {
    console.log("Token Inválido");
    return <p>Token Inválido</p>;
  }

  return (
    <>
      <Header />
      <main>
        <div className="CenteredContainer">
          <div className="ContainerMyprofile">
            <div className="LayoutGeral">
              <form onSubmit={handleSubmit(submit)} noValidate> 
              <p>Alterar Infos</p>
              <div className="PasswordLayout">
                <label>Senha Atual:</label>
                <input
                  type="password"
                  value={password}
                  {...register('PasswordLayout')}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!isEditMode}
                />
                <p className='erro'>{errors.password?.message}</p>
              </div>
              <div className="NewUsernameLayout">
                <label>Username:</label>
                <input
                  type="text"
                  value={newUsername}
                  {...register('NewUsernameLayout')}
                  onChange={(e) => setNewUsername(e.target.value)}
                  disabled={!isEditMode}
                />
                <p className='erro'>{errors.username?.message}</p>
              </div>
              <div className="NewPasswordLayout">
                <label>Nova Senha:</label>
                <input
                  type="password"
                  value={newPassword}
                  {...register('NewPasswordLayout')}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={!isEditMode}
                />
                <p className='erro'>{errors.newPassword?.message}</p>
              </div>
              <div className="ConfirmPasswordLayout">
                <label>Confirmar Senha:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  {...register('ConfirmPasswordLayout')}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={!isEditMode}
                />
                <p className='erro'>{errors.newPasswordConf?.message}</p>
              </div>
              <div className="NewEmailLayout">
                <label>Mudar Email:</label>
                <input
                  type="text"
                  value={newEmail}
                  {...register('NewEmailLayout')}
                  onChange={(e) => setNewEmail(e.target.value)}
                  disabled={!isEditMode}
                />
                <p className='erro'>{errors.email?.message}</p>
              </div>
            <div className="ButtonsWrapper">   
                <button
                  className="Button2"
                  //onClick={handleSaveClick}
                  disabled={!isSaveEnabled}
                >
                  Salvar
                </button>
              </div>
              </form>
              <div className="ButtonsWrapper">
                <button
                  className="Button1"
                  onClick={handleEditClick}
                  disabled={!isEditEnable}
                >
                  Editar
                </button>
                </div>
            </div>
          </div>  
        </div>
        </main>
      <Footer />
    </>
  );
}
