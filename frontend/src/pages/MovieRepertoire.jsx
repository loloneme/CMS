import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import Nav from "../components/Nav"
import CinemaSessions from "../components/CinemaSessions"

import style from "../styles/RepertoirePage.module.css"
import AddButton from "../components/AddButton"
import { getAllCinemaNames, getAllMoviesBriefInfo, getAllRepertoires } from "../utils/DataFetching"

import CustomStyles from "../styles/CustomStylesCinemasSelect"

const MovieRepertoirePage = () => {
    const params = useParams();
    const movieId = parseInt(params.id);

    const [cinemas, setCinemas] = useState([])


    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const data = await getAllCinemaNames();
                setCinemas(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCinemas();
    }, [])

    return (
        <div className={style.back}>
            <div className={style.container}>
                <Nav />
                <div>
                    
                </div>
                <div className={style.repertoire}>
                    {cinemas.map((item) => {
                        return(
                            <CinemaSessions cinema={item} movieId={movieId}/>
                        )
                    })}

                    </div>

            </div>
        </div>
    )
}

export default MovieRepertoirePage