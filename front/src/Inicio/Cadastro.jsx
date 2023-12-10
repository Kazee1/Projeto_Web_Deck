import "../Styles/login.css"
import Footer from "./Footer"
import Header from "./Header"
import { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import {set, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { Link, Navigate } from 'react-router-dom'

export default function Login(){
    const [userCriado,setUserCriado] = useState(false);
    const [msg, setMsg] = useState();

    const schema = yup.object({
        username: yup.string().required('Usuário obrigatório'),
        email: yup.string().email('Email inválido').required('Email obrigatório'),
        password: yup.string().min(2,'Senha com no mínimo 2 caracteres').required(),
        passwordConf: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'As senhas devem coincidir!'),
    });
    
    const form = useForm({
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/Cadastro', data);
            setMsg(response.data);
            if(response.data.includes('sucesso'))
                setUserCriado(true);
        } catch (error) {
            setMsg(error.response.data);
        }   
    }


    return (
        <>
        <Header/>
        <main className="login">
        <div className="container-register">
            <h3>Sign out</h3>
            <form action="http://localhost:5173/Cadastro" method="post" onSubmit={handleSubmit(submit)}>
                <div className="form-group-login">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div className="form-group-login">
                    <label htmlFor="Email">Email</label>
                    <input type="email" id="Email" name="Email" required/>
                </div>
                <div className="form-group-login">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <div className="form-group-login">
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