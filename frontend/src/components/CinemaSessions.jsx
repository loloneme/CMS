import React, { useState, useEffect } from "react"
import { getRepertoiresByCinemaAndMovie } from "../utils/DataFetching"
import style from "../styles/CinemaRepertoire.module.css"


const CinemaSessions = ({ cinema, movieId }) => {
    const [sessions, setSessions] = useState([])

    useEffect(() => {
        const fetchAllSessions = async () => {
            try {
                const data = await getRepertoiresByCinemaAndMovie(cinema.cinema_id, movieId);
                setSessions(data);
                console.log(sessions)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllSessions();
    }, []);

    return (
        <>
        <div>
            {cinema.cinema_name}
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
        </div>

        </>
    )
}

export default CinemaSessions