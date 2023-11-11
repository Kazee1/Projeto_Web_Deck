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
            <h4>Sign out</h4>
            <form action="" method="post">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input type="email" id="Email" name="Email" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required/>
                </div>
                <button className="btn" type="submit">Login</button>
            </form>
            <div className="links">
                <p>Already have an account? <Link to='/Login' className='link'>Sign in</Link></p>
            </div>
        </div>
        </main>
        <Footer/>
        </>
    )
}