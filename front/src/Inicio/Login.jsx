import "../Styles/login.css"
import Footer from "./Footer"
import Header from "./Header"

import { Link, Navigate } from 'react-router-dom';

export default function Login(){
    return (
        <>
        <Header/>
        <main className="login">
        <div className="container-login">
            <h3 className="sign">SIGN IN</h3>
            <form action="post" method="post">
                <div className="form-group-login">
                    <label htmlFor="username">Username or Email</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div className="form-group-login">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <button className="btn" type="submit">Sign in</button>
            </form>
            <div className="links">
                <p><Link to="/EsqueceuSenha" className="link">Forgot password?</Link></p>
                <p>Don't have an account? <Link to='/Cadastro' className="link">Sign Up</Link></p>
            </div>
        </div>
        </main>
        <Footer/>
        </>
    )
}