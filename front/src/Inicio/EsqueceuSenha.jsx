import Footer from "./Footer";
import Header from "./Header";

import "../Styles/Esqueceusenha.css"

import { Link, Navigate } from 'react-router-dom'

export default function EsqueceuSenha(){
    return(
        <>
        <Header/>
        <main className="Esqueceusenha">
        <div className="container-reset-password">
        <div className="reset-password-form">
            <h1>Reset your password</h1>
            <form action="reset_password.html">
                <div className="form-group-reset">
                    <label htmlFor="email">Enter your user account's verified email address and we will send you password reset link</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email address" required/>
                </div>
                <button type="submit">Send password reset email</button>
            </form>
        </div>
    </div>
        </main>
        <Footer/>

        </>
    );
}