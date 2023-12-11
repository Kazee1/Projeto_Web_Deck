import "../Styles/login.css"
import Footer from "./Footer"
import Header from "./Header"
import {useForm} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Login(){
    const form = useForm();
    // const schema = yup.object({
    //     email: yup.string().email('Email inválido').required('Email obrigatório'),
    //     password: yup.string().min(2,'Campo Senha Obrigatório').required(),
    // });

    const [msg, setMsg] = useState(' ');

    // const form = useForm({
    //     resolver: yupResolver(schema)
    // });

    const { register,control, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/login', data);
            //Extrair o token
            const token = response.data.token;
            sessionStorage.setItem('token', token);
            if(token)
                setMsg('Autenticado');
        } catch (error) {
            setMsg(error.response.data);
        }   
    }

    if(msg.toLowerCase().includes('autenticado')){
        return <Navigate to='/inicio' />
    }

    return (
        <>
        <Header/>
        <main className="login">
        <div className="container-login">
            <h3 className="sign">SIGN IN</h3>
            <form onSubmit={handleSubmit(submit)} noValidate>
                <div className="form-group-login">
                    <label htmlFor="username" >Username</label>
                    <input type="text" id="username" {...register('username')}/>
                </div>
                <div className="form-group-login">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" {...register('password')}/>
                </div>
                <button className="btn">Sign in</button>
            </form>
            <p className='server-response'>{msg}</p>
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