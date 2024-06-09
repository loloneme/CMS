import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import Nav from "../components/Nav"
import CinemaSessions from "../components/CinemaSessions"
import Modal from "../components/Modal"
import SessionModal from "../components/SessionModal"
import { useNavigate } from "react-router-dom"



import { getTodayDate, convertToISO } from "../utils/utils"
import style from "../styles/RepertoirePage.module.css"
import { getAllCinemaNames, getSession, getRepertoiresByCinemaAndMovie } from "../utils/DataFetching"
import { useLocation } from "react-router-dom"
import { useUser } from "../utils/UserContext"


const MovieRepertoirePage = () => {
    const params = useParams();
    const navigate = useNavigate()
    const {user} = useUser()
    const movieId = parseInt(params.id);

    const location = useLocation();
    const { movieName } = location.state || {};
    const [selectedDate, setSelectedDate] = useState(getTodayDate())

    const [cinemas, setCinemas] = useState([])
    const [sessions, setSessions] = useState([])

    const [isEditMode, setIsEditMode] = useState(false)
    const [sessionModalIsOpen, setSessionModalIsOpen] = useState(false)
    const [sessionInfo, setSessionInfo] = useState({})

    const handleOpen = async (session) => {
            setSessionInfo(session);
            setSessionModalIsOpen(true)
            setIsEditMode(true)
    }

    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const data = await getAllCinemaNames();
                setCinemas(data)
            } catch (error) {
                console.error('Error fetching cinemas:', error);
            }
        };

        const fetchAllSessions = async () => {
            if (cinemas) {
                try {
                    const allSessions = [];

                    for (const cinema of cinemas) {
                        const data = await getRepertoiresByCinemaAndMovie(cinema.cinema_id, movieId);
                        if (data && data.length > 0) {
                            allSessions.push({ ...cinema, sessions: data });
                        }
                    }
                    setSessions(allSessions);
                    console.log(allSessions)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        if (user && user.role !== "INFO_SERVICE") {
            navigate("/forbidden");
        }


        fetchCinemas();
        fetchAllSessions();
    }, [user, navigate])

    useEffect(() => {
        const fetchAllSessions = async () => {
            if (cinemas) {
                try {
                    const allSessions = [];

                    for (const cinema of cinemas) {
                        const data = await getRepertoiresByCinemaAndMovie(cinema.cinema_id, movieId);
                        if (data && data.length > 0) {
                            allSessions.push({ ...cinema, sessions: data });
                        }
                    }
                    setSessions(allSessions);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchAllSessions();
    }, [cinemas])

    return (
        <div className={style.back}>
            <div className={style.container}>
                <Nav />
                <div className={style.movie_repertoire_filter}>
                    <div className={style.date_select} style={{justifySelf: 'start', marginLeft: "100px"}}>
                        Дата:
                        <div>
                            <input
                                type="date"
                                value={selectedDate}
                                min={getTodayDate()}
                                onChange={(ev) => setSelectedDate(convertToISO(ev.target.value))}
                                placeholder="Выберите дату"
                            />
                        </div>
                    </div>
                    <div className={style.movie_title}>
                        Фильм «{movieName}» показывают в:
                    </div>
                </div>

                <div className={style.repertoire} style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                    {sessions.map((item) => {
                        return (
                            item.sessions.length !== 0 &&
                            <CinemaSessions cinema={item.cinema_name} sessions={item.sessions.filter((item) => convertToISO(item.session_date) === selectedDate)} onClick={handleOpen}/>
                        )
                    })}

                </div>
                <Modal
                    isOpen={sessionModalIsOpen}
                    onClose={() => {
                        setSessionModalIsOpen(false)
                        setIsEditMode(false)
                        setSessionInfo(null)
                    }}
                    style={{backgroundColor: "rgb(131 66 36)"}}>
                    <SessionModal sessionInfo={sessionInfo} setSessionModalIsOpen={setSessionModalIsOpen} isEditMode={isEditMode} movies={[{movie_id: movieId, movie_name: movieName}]}/>

                </Modal>

            </div>
        </div>
    )
}

export default MovieRepertoirePage