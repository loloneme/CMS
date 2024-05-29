import React, { useState } from 'react'
import { signIn } from '../utils/DataFetching'
import axios from "axios"
import { redirect, useNavigate } from 'react-router-dom'
import style from "../styles/LoginPage.module.css"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    let navigate = useNavigate();

    const logIn = async (email, password) => {
        try{
            const data = await signIn({
                email: email,
                password: password
            })

            localStorage.setItem("token", data.access_token)
            navigate('/cinemas', { replace: true })

        } catch (error) {
            console.log(error)
        }
    }



    const submitLogin = (e) => {
        e.preventDefault();

        if ('' === email) {
            setEmailError('Пожалуйста, введите адрес Вашей эл. почты')
            return
        }

        // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        //     setEmailError('Please enter a valid email')
        //     return
        // }

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
