import React from "react"
import style from "../styles/CinemaRepertoire.module.css"


const Sessions = ({sessions, onClick}) =>{
    const sortedSessions = sessions.sort((a, b) => {
        const timeA = new Date(a.session_date).getTime();
        const timeB = new Date(b.session_date).getTime();
        return timeA - timeB;
    })

    return (
        <> 
            {
                sortedSessions.map((s) => {
                    const time = new Date(s.session_date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

                    return (
                        <div className={style.session} onClick={() => onClick(s)}>
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