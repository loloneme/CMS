import React, { useState, useEffect } from "react"
import { getRepertoiresByCinemaAndMovie } from "../utils/DataFetching"
import style from "../styles/CinemaRepertoire.module.css"


const CinemaSessions = ({ cinema, sessions, onClick }) => {
    return (
        <>
                {
                    (sessions !== null && sessions.length !== 0) &&
                    <div className={style.cinema}>
                        <div className={style.cinema_name}>
                            {cinema}

                        </div>
                        <div className={style.sessions}>
                            {sessions.map((s) => {
                                const time = new Date(s.session_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                                return (
                                    <div className={style.session} onClick={() => onClick(s)}>
                                        <div className={style.time}>
                                            {time}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                }
        </>
    )
}

export default CinemaSessions