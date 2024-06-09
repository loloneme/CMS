import { useState } from "react"
import React from "react"
import style from "../styles/MovieCard.module.css"
import { motion } from "framer-motion"
import { convertToRussianDate } from "../utils/utils"
import { Link } from "react-router-dom"
import { useUser } from "../utils/UserContext"


const MovieCard = ({ movie, isOpen, onOpen, onClose, setMovieInfo, onEdit }) => {
    const {user} = useUser()

    const handleClick = () => {
        setMovieInfo(movie)
        onEdit()
    }

    return (
        <motion.div className={style.container}
            animate={{ width: isOpen ? '1200px' : '600px' }}
            transition={{ duration: 0.5 }}>
            <motion.div className={style.image}
                style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 78.397%, rgb(0, 0, 0) 100%), url(data:image/png;base64,${movie.movie_image})` }}
                onClick={isOpen ? onClose : onOpen}>
                <div className={style.title}>
                    {
                        (isOpen && user.role === 'INFO_SERVICE') ? (
                            <Link className={style.link} to={`/repertoire/${movie.movie_id}`} state={{ movieName: movie.movie_name }}>Где посмотреть?</Link>
                        ) :
                            (
                                <>
                                    <div className={style.genres}>
                                        {movie.genres.map((item) => item.genre_name).join(", ")}
                                    </div>
                                    <div>{movie.movie_name}</div>
                                </>
                            )
                    }
                </div>

            </motion.div>
            {isOpen && (
                <motion.div className={style.info}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}>
                    <div className={style.header}>О фильме:</div>
                    {
                        user.role === 'INFO_SERVICE' && <button className={style.edit_button} onClick={handleClick}>Редактировать</button>
                    }
                    <div className={style.description}>
                        Год производства: {movie.year}
                        <div>Страны: {movie.countries.map((item) => item.country_name).join(", ")}</div>
                        <div>Режиссер: {movie.director}</div>
                        <div>Оператор: {movie.operator}</div>
                        <div>Премьера: {convertToRussianDate(movie.premiere)}</div>
                        <div>Возрастной рейтинг: {movie.rating}</div>
                        <div>Продолжительность: {movie.duration} мин.</div>
                        <div>Киностудии: {movie.studios.map((item) => item.studio_name).join(", ")}</div>
                        <div>В ролях: {movie.actors.map((item) => item.actor_name).join(", ")}</div>
                        <div>Описание:</div>
                        <div className={style.plot}>{movie.description}</div>
                    </div>
                </motion.div>
            )}

        </motion.div>
    )
}

export default MovieCard