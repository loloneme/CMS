import React, { useState, useEffect } from "react"
import Nav from "../components/Nav"
import Select from "react-select"
import { useNavigate } from "react-router-dom"

import style from "../styles/RepertoirePage.module.css"
import AddButton from "../components/AddButton"
import { getAllCinemaNames, getAllMoviesBriefInfo, getSession } from "../utils/DataFetching"
import { convertToISO, getTodayDate } from "../utils/utils"
import CinemaRepertoire from "../components/CinemaRepertoire"
import CustomStyles from "../styles/CustomStylesCinemasSelect"
import SessionModal from "../components/SessionModal"
import Modal from "../components/Modal"
import { useUser } from "../utils/UserContext"


const RepertoirePage = () => {
    const {user} = useUser()
    const navigate = useNavigate()


    const [cinemas, setCinemas] = useState([])
    const [movies, setMovies] = useState([])

    const [selectedCinema, setSelectedCinema] = useState()
    const [isEditMode, setIsEditMode] = useState(false)
    const [sessionModalIsOpen, setSessionModalIsOpen] = useState(false)
    const [sessionInfo, setSessionInfo] = useState({})
    const [selectedDate, setSelectedDate] = useState(getTodayDate())

    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const data = await getAllCinemaNames();
                setCinemas(data.map((item) => ({
                    value: item.cinema_id,
                    label: item.cinema_name
                })));

                if (user && user.role === 'CINEMA_WORKER') {
                    const cinema = data.find(item => item.cinema_id === user.cinemaId);
                    if (cinema) {
                        setSelectedCinema({
                            value: cinema.cinema_id,
                            label: cinema.cinema_name
                        });
                    }
                } else {
                    setSelectedCinema(cinemas[0]); 
                }
            } catch (error) {
                console.error('Error fetching cinema names:', error);
            }
        };

        const fetchMovies = async () => {
            try {
                const data = await getAllMoviesBriefInfo();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        if (user && user.role !== "CINEMA_WORKER" && user.role !== "INFO_SERVICE") {
            navigate("/forbidden");
        }

        fetchCinemas();
        fetchMovies();
    }, [user, navigate])



    const handleOpen = async (session) => {
            setSessionInfo(session);
            setSessionModalIsOpen(true)
            setIsEditMode(true)
    }

    return (
        <div className={style.back}>
            <div className={style.container}>
                <Nav />
                <div className={style.filter}>
                    <div className={style.cinema_select}>
                    Репертуар кинотеатра
                        <div style={{ width: "250px" }}>
                            {
                                cinemas.length > 0 && (
                                    <Select
                                        value={selectedCinema}
                                        options={cinemas}
                                        onChange={(newValue) => setSelectedCinema(newValue)}
                                        placeholder="Выбрать"
                                        styles={CustomStyles}
                                        isDisabled={user.role === 'CINEMA_WORKER' ? true:false}
                                    />
                                )
                            }
                        </div>
                    </div>

                    <div className={style.date_select}>  
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
                </div>

                <div className={style.repertoire}>
                    {selectedCinema && <CinemaRepertoire movies={movies} cinema={selectedCinema.value} date={selectedDate} onClick={handleOpen}/>}

                </div>

            </div>
            <div style={{ marginTop: "10px" }}>
                {
                    user && user.role === 'CINEMA_WORKER' && 
                    <AddButton onClick={() => {
                        setIsEditMode(false)
                        setSessionModalIsOpen(true)
                    }}/>
    
                }

                <Modal
                    isOpen={sessionModalIsOpen}
                    onClose={() => {
                        setSessionModalIsOpen(false)
                        setIsEditMode(false)
                        setSessionInfo(null)
                    }}
                    style={{backgroundColor: "rgb(131 66 36)"}}>
                    <SessionModal sessionInfo={sessionInfo} setSessionModalIsOpen={setSessionModalIsOpen} isEditMode={isEditMode} movies={movies}/>

                </Modal>
            </div>
        </div>
    )
}

export default RepertoirePage