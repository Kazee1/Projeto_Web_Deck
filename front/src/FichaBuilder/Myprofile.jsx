import "../Styles/Myprofile.css";
import Header from "./HeaderLogado";
import Footer from "../Inicio/Footer";

import React, { useState, useEffect } from "react";

export default function Myprofile() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setIsSaveEnabled(true);
                  }}
                  disabled={!isEditMode}
                />
              </div>
              <div className="EmailLayout">
                <label>Email:</label>
                <input type="email" value={email} disabled />
              </div>
              <div className="ButtonsWrappers">
                <button className='Button11' onClick={handleEditClick} disabled={!isEditEnable}>Editar</button>
                <button className='Button12' onClick={handleSaveClick} disabled={!isSaveEnabled}>
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
