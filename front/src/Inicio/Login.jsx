import "../Styles/login.css"
import Footer from "./Footer"
import Header from "./Header"

import { Link } from 'react-router-dom'

export default function Login(){
    return (
        <>
        <Header/>
        <main>
        <div className="container">
            <h4>Sign in</h4>
            <form action="" method="post">
                <div className="form-group">
                    <label htmlFor="username">Username or Email</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <button className="btn" type="submit">Sign in</button>
            </form>
            <div className="links">
                <p><Link to="/EsqueceuSenha" className="link">Forgot password?</Link></p>
                <p>Don&apost have an account? <Link to='/Cadastrar' className="link">Sign Up</Link></p>
            </div>
        </div>
        </main>
        <Footer/>
        </>
    )
}