import React, { useState, useEffect } from "react"
import Nav from "../components/Nav"
import Select from "react-select"
import Sessions from "../components/Sessions"

import style from "../styles/RepertoirePage.module.css"
import AddButton from "../components/AddButton"
import { getAllCinemaNames, getAllMoviesBriefInfo, getAllRepertoires } from "../utils/DataFetching"
import CinemaRepertoire from "../components/CinemaRepertoire"
import CustomStyles from "../styles/CustomStylesCinemasSelect"

const RepertoirePage = () => {
    const [cinemas, setCinemas] = useState([])
    const [movies, setMovies] = useState([])

    const [repertoires, setRepertoires] = useState([])

    const [selectedCinema, setSelectedCinema] = useState()

    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const data = await getAllCinemaNames();
                setCinemas(data.map((item) => ({
                    value: item.cinema_id,
                    label: item.cinema_name
                })));
                setSelectedCinema(cinemas[0])
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchMovies = async () => {
            try {
                const data = await getAllMoviesBriefInfo();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCinemas();
        fetchMovies();
    }, [])

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // const filteredRepertoires = repertoires.filter(rep => rep.cinema_id === selectedCinema.value)
    return (
        <div className={style.back}>
            <div className={style.container}>
                <Nav />
                    <div className={style.filter}>
                        Репертуар кинотеатра:
                        <div style={{width: "250px"}}>
                            {
                                cinemas.length > 0 && (
                                    <Select
                                    value={selectedCinema}
                                    options={cinemas}
                                    onChange={(newValue) => setSelectedCinema(newValue)}
                                    placeholder="Выбрать"
                                    styles={CustomStyles}
                                />
                                )
                            }
                        </div>
                    </div>

                    <div className={style.repertoire}>
                    {selectedCinema && <CinemaRepertoire movies={movies} cinema={selectedCinema.value}/>}

                    </div>

            </div>
            <div style={{ marginTop: "10px" }}>
                <AddButton />
            </div>
        </div>
    )
}

export default RepertoirePage