import React, { useState, useEffect } from "react"
import { getRepertoiresByCinemaAndMovie } from "../utils/DataFetching"
import style from "../styles/CinemaRepertoire.module.css"


const Sessions = ({sessions}) =>{
    return (
        <> 
            {
                sessions !== null &&
                sessions.map((s) => {
                    const time = new Date(s.session_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                    return (
                        <div className={style.session}>
                            <div className={style.time}> 
                                {time}
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Sessions