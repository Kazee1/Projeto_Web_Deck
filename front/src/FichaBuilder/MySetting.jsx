import "../Styles/Mysetting.css";
import Header from "./HeaderLogado";
import Footer from "../Inicio/Footer";
import React, { useState } from "react";

export default function Myprofile() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditEnable, setIsEditEnable] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

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

  return (
    <>
      <Header />
      <main>
        <div className="CenteredContainer">
          <div className="ContainerMyprofile">
            <div className="LayoutGeral">
              <p>Alterar Senha ou Email</p>
              <div className="PasswordLayout">
                <label>Senha Atual:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!isEditMode}
                />
              </div>
              <div className="NewPasswordLayout">
                <label>Nova Senha:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={!isEditMode}
                />
              </div>
              <div className="ConfirmPasswordLayout">
                <label>Confirmar Senha:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={!isEditMode}
                />
              </div>
              <div className="NewEmailLayout">
                  <label>Mudar Email:</label>
                  <input
                    type="text"
                    value={newEmail}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={!isEditMode}
                  />
                </div>
              <div className="ButtonsWrapper">
                <button
                  className="Button1"
                  onClick={handleEditClick}
                  disabled={!isEditEnable}
                >
                  Editar
                </button>
                <button
                  className="Button2"
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
  );
}
