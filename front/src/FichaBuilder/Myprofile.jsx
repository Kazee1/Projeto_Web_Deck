import "../Styles/Myprofile.css";
import Header from "./HeaderLogado";
import Footer from "../Inicio/Footer";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Myprofile() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditEnable, setIsEditEnable] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

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
          `http://localhost:3000/profile`,
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

  async function dados(){
    
      try {
        const response = await axios.get('http://localhost:3000/profile2');
        console.log("oioi");
        const dados = await response.json();
        document.getElementById('user').value = dados.username;
        document.getElementById('email').value = dados.email;
      } catch (error) {
        console.error('Erro ao obter mensagem do servidor:', error);
      }
    
  }

  const handleSaveClick = () => {
    setIsEditMode(false);
    setIsEditEnable(true);
    setIsSaveEnabled(false);
  };

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
        <div className="CenteredContainers">
          <div className="ContainerMyprofiles">
            <div className="LayoutGerals">
              <p>My Profile</p>
              <div className="FullNameLayout">
                <label>Full Name:</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setIsSaveEnabled(true);
                  }}
                  disabled={!isEditMode}
                />
              </div>
              <div className="UsernameLayout">
                <label>Username:</label>
                <input id= "user" type="text" value={username} disabled />
              </div>
              <div className="EmailLayout">
                <label >Email:</label>
                <input id= "email" type="email" value={email} disabled />
              </div>
              <div className="ButtonsWrappers">
                <button
                  className="Button11"
                  onClick={handleEditClick}
                  disabled={!isEditEnable}
                >
                  Editar
                </button>
                <button
                  className="Button12"
                  onClick={handleSaveClick}
                  disabled={!isSaveEnabled}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </main>
      <Footer />
    </>
  dados();
  );
  
}
