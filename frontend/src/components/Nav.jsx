import React from "react"
import { NavLink } from "react-router-dom"
import style from "../styles/Nav.module.css"

const Nav = () => {
    return (
        <div className={style.position}>
            <div className={style.container}>
                <div className={style.link_area}>
                    <NavLink className={({isActive}) => isActive ? style.active_link : style.link} to="/cinemas">Кинотеатры</NavLink>
                </div>
                <div className={style.link_area}>
                    <NavLink className={({isActive}) => isActive ? style.active_link : style.link} to="/movies">Фильмы</NavLink>
                </div>
                <div className={style.link_area}>
                    <NavLink className={({isActive}) => isActive ? style.active_link : style.link} to="/repertoire">Репертуар</NavLink>
                </div>
            </div>
        </div>

    )
}

export default Nav