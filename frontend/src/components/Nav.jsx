import React from "react"
import { NavLink } from "react-router-dom"
import style from "../styles/Nav.module.css"

const Nav = () => {

    const logout = () =>{
        localStorage.removeItem("token")
    }

    return (
        <div className={style.main_container}>

            <div className={style.position}>
                <div className={style.container}>
                    <div className={style.link_area}>
                        <NavLink className={({ isActive }) => isActive ? style.active_link : style.link} to="/cinemas">Кинотеатры</NavLink>
                    </div>
                    <div className={style.link_area}>
                        <NavLink className={({ isActive }) => isActive ? style.active_link : style.link} to="/movies">Фильмы</NavLink>
                    </div>
                    <div className={style.link_area}>
                        <NavLink className={({ isActive }) => isActive ? style.active_link : style.link} to="/repertoire">Репертуар</NavLink>
                    </div>
                </div>
                <div className={style.logout}>
                    <NavLink className={style.logout_link} to="/login" onClick={logout}>Выйти</NavLink>
                </div>
            </div>

        </div>

    )
}

export default Nav