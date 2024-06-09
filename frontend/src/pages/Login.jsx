import React, { useState } from 'react'
import { signIn } from '../utils/DataFetching'
import { useNavigate } from 'react-router-dom'
import style from "../styles/LoginPage.module.css"
import {jwtDecode} from 'jwt-decode';
import { useUser } from '../utils/UserContext';
import axios from 'axios';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    let navigate = useNavigate();
    const {user, setUser} = useUser();


    const logIn = async (email, password) => { 
        try{
            const data = await signIn({
                email: email,
                password: password
            })

            localStorage.setItem("token", data.access_token)

            const decodedToken = jwtDecode(data.access_token);
            setUser({
                cinemaId: decodedToken.cinema,
                role: decodedToken.role,
              });

            if (user.role === "ADMIN"){
                navigate('/users', { replace: true })
            } else {
                navigate('/cinemas', { replace: true })

            }


        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    setPasswordError('Неверный пароль и/или адрес эл. почты');
                } else {
                    console.error(error);
                }
            } else {
                console.error(error);
            }
        }
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };


    const submitLogin = (e) => {
        e.preventDefault();

        if ('' === email) {
            setEmailError('Пожалуйста, введите адрес Вашей эл. почты')
            return
        }

        if (!isValidEmail(email)) {
            setEmailError('Пожалуйста, введите корректный адрес эл. почты')
            return
        }

        if ('' === password) {
            setPasswordError('Пожалуйста, введите пароль')
            return
        }

        if (password.length < 7) {
            setPasswordError('Длина пароля должна быть больше 8 символов')
            return
        }

        logIn(email, password)
    }

    return (
        <div className={style.back}>
            <div className={style.container}>
                <div className={style.header}>
                    CMS - Cinema Management System
                </div>
            <form onSubmit={submitLogin} className={style.form}>
                <p style={{fontSize: "30px"}}>Пожалуйста, войдите</p>
                <input
                    type="email"
                    value={email}
                    placeholder='Ваш адрес эл. почты'
                    onChange={(ev) => setEmail(ev.target.value)}
                    required className={style.input_field} />
                <label >{emailError}</label>


                <input type="password"
                    value={password}
                    placeholder='Пароль'
                    onChange={(ev) => setPassword(ev.target.value)}
                    required className={style.input_field} />
                <label>{passwordError}</label>

                <button type="submit" className={style.button}>Войти</button>
            </form>
            </div>

        </div>
    )
}

export default Login
