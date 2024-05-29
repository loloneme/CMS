import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import MovieCard from './MovieCard';

import Select from "react-select"
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import CustomStyles from '../styles/CustomStylesGenresSelect';
import "../styles/MovieSwiper.css"

const MoviesSwiper = ({ movies, genres, setMovieInfo, onEdit }) => {
    const [openCardIndex, setOpenCardIndex] = useState(null)
    const [selectedGenre, setSelectedGenre] = useState({value: 0, label: "Все"})

    const slideStyle = {
        width: "auto",
        background: "transparent",
        textAlign: "left",
        fontSize: "20px"
    };

    const filteredMovies = selectedGenre.label === 'Все'
    ? movies
    : movies.filter(movie =>
        movie.genres.some(genre => genre.genre_name === selectedGenre.label)
      );;


    return (
        <>
            <div className="genres">
                Жанр:
                <div className='genres_filter'>
                    <Select styles={CustomStyles}
                    options={genres}
                    onChange={(newValue) => setSelectedGenre(newValue)}
                    placeholder="Выбрать"
                    defaultValue={genres[0]}
                    />
                </div>

            </div>
            <Swiper
                slidesPerView="auto"
                spaceBetween={10}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                    el: '.custom-swiper-pagination'
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    filteredMovies.map((item, index) => {
                        return (<SwiperSlide style={slideStyle}>
                            <MovieCard
                                movie={item}
                                isOpen={openCardIndex === index}
                                onOpen={() => setOpenCardIndex(index)}
                                onClose={() => setOpenCardIndex(null)}
                                setMovieInfo={setMovieInfo}
                                onEdit={onEdit}
                            />
                        </SwiperSlide>)
                    })
                }
                <SwiperSlide style={slideStyle}><div></div></SwiperSlide>
            </Swiper>
            <div className="custom-swiper-pagination" style={{ position: 'absolute', bottom: '40px', left: '0', width: '100%', textAlign: 'center', zIndex: '10' }}></div>
        </>


    );
};

export default MoviesSwiper