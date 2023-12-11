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
    const form = useForm();
    // const schema = yup.object().shape({
    //     username: yup.string().required('Usuário obrigatório'),
    //     email: yup.string().email('Email inválido').required('Email obrigatório'),
    //     password: yup.string().min(2, 'Senha com no mínimo 2 caracteres').required('Senha obrigatória'),
    //     passwordConf: yup.string()
    //       .oneOf([yup.ref('password')], 'As senhas devem coincidir')
    //       .required('Confirme a senha'),
    //   });
      
    //   const form = useForm({
    //     resolver: yupResolver(schema),
    //   });

    const { register, control, handleSubmit, formState } = form;
    // const { register, handleSubmit, formState } = form;
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
            <form onSubmit={handleSubmit(submit)} noValidate>
                <div className="form-group-login">
                    <label htmlFor="username" placeholder="username">Username</label>
                    <input type="text" id="username" {...register('username')}/>
                </div>
                <div className="form-group-login">
                    <label htmlFor="Email" placeholder="Email">Email</label>
                    <input type="text" id="Email" {...register('email')}/>
                </div>
                <div className="form-group-login">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" {...register('password')}/>
                </div>
                <div className="form-group-login">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" {...register('confirmPassword')}/>
                </div>
                <button className="btn">Loginaaaf</button>
            </form>
            <p className='server-response'>{msg}</p>
            <div className="links">
                <p>Already have an account? <Link to='/Login' className='link'>Sign in</Link></p>
            </div>
        </div>
        </main>
        <Footer/>
        </>
    )
}