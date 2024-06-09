import React, { useState, useEffect } from "react"
import Nav from "../components/Nav"
import CinemaComponent from "../components/CinemaComponent"
import AddButton from "../components/AddButton"
import style from "../styles/CinemaPage.module.css"
import AddCinemaModal from "../components/CinemaModal"
import Modal from "../components/Modal"
import { getAllCinemas, getCinema } from "../utils/DataFetching"
import { useUser } from "../utils/UserContext";
import { useNavigate } from "react-router-dom"


const CinemaPage = () => {
    const { user } = useUser()
    const navigate = useNavigate()

    const [cinemas, setCinemas] = useState([])
    const [addCinemaModalIsOpen, setAddCinemaModalIsOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false);
    const [cinemaInfo, setCinemaInfo] = useState(null)



    useEffect(() => {        
        const fetchCinemas = async () => {
            try {
                const data = await getAllCinemas();
                setCinemas(data);
            } catch (error) {
                console.error('Error fetching cinemas:', error);
            }
        };

        const fetchCinema = async () => {
            try {
                const data = await getCinema(user.cinemaId);
                setCinemas([data]);
                setCinemaInfo(data)
            } catch (error) {
                console.error('Error fetching cinemas:', error);
            }
        };

        if (user && user.role !== "CINEMA_WORKER" && user.role !== "INFO_SERVICE") {
            navigate("/forbidden");
        }

        if (user !==null && user.role === 'CINEMA_WORKER') {
            fetchCinema();
        } else if (user) {
            fetchCinemas();
        }


    }, [user, navigate])

    const handleOpen = async (cinemaId) => {
        try {
            const data = await getCinema(cinemaId);
            setCinemaInfo(data);
            setAddCinemaModalIsOpen(true)
            setIsEditMode(true)
        } catch (error) {
            console.error('Error fetching cinemas:', error);
        }
    }

    return (
        <div className={style.back}>
            <div className={style.container}>
                <Nav />
                <div className={style.grid_container}>
                    {
                        (cinemas && cinemas.map((item) => {
                            return <CinemaComponent key={item.cinema_id} props={item}
                                onClick={() => {
                                    handleOpen(item.cinema_id)
                                }} />
                        }))
                        
                    }

                </div>
            </div>

            {
                user && user.role === 'INFO_SERVICE' &&
                <AddButton onClick={() => {
                    setIsEditMode(false);
                    setAddCinemaModalIsOpen(true)
                }} />
            }

            <Modal
                isOpen={addCinemaModalIsOpen}
                onClose={() => {
                    setAddCinemaModalIsOpen(false)
                    setCinemaInfo(null)
                    setIsEditMode(false);
                }}
                style={{ backgroundColor: "rgb(113 39 84)" }}>
                <AddCinemaModal
                    setAddCinemaModalIsOpen={setAddCinemaModalIsOpen}
                    cinemaInfo={cinemaInfo}
                    isEditMode={isEditMode}
                />
            </Modal>



        </div>
    )
}

export default CinemaPage