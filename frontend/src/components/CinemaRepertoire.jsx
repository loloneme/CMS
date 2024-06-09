import React, { useState, useEffect } from "react"
import Sessions from "./Sessions"
import { getRepertoiresByCinemaAndMovie } from "../utils/DataFetching"
import style from "../styles/CinemaRepertoire.module.css"
import { convertToISO } from "../utils/utils"


const CinemaRepertoire = ({ movies, cinema, date, onClick }) => {
    const [sessions, setSessions] = useState([])

    useEffect(() => {
        const fetchAllSessions = async () => {
            if (cinema && movies.length > 0) {
                try {
                    const allSessions = [];

                    for (const movie of movies) {
                        const data = await getRepertoiresByCinemaAndMovie(cinema, movie.movie_id);
                        if (data && data.length > 0) {
                            allSessions.push({ ...movie, sessions: data.filter((item) => convertToISO(item.session_date) === date) });
                        }
                    }
                    setSessions(allSessions);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchAllSessions();
    }, [cinema, movies, date]);

    return (
        <>  
            {sessions.map((item) => {
                return (
                    item.sessions.length != 0 &&
                    <div className={style.movie} style={{marginBottom: "10px"}}>
                        <img className={style.image} src={`data:image/png;base64,${item.movie_image}`}/>
                        <div className={style.info}>
                            <div className={style.movie_info}>
                                {item.movie_name} {item.rating}
                            </div>
                            <div className={style.sessions}>
                                <Sessions sessions={item.sessions} onClick={onClick}/>
                            </div>
                        </div>

                    </div>)
                }
            )}
        </>

    )
}

export default CinemaRepertoire