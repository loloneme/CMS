import React, { useEffect, useState } from "react"
import Nav from "../components/Nav"
import style from "../styles/MoviePage.module.css"
import AddButton from "../components/AddButton"
import MoviesSwiper from "../components/MoviesSwiper"
import Modal from "../components/Modal"
import AddMovieModal from "../components/MovieModal"
import { getAllGenres, getAllMovies } from "../utils/DataFetching"
import { useUser } from "../utils/UserContext";
import { useNavigate } from "react-router-dom"



const MoviePage = () => {
  const { user } = useUser()
  const navigate = useNavigate()

    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])

    const [addMovieModalIsOpen, setAddMovieModalIsOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false);
    const [movieInfo, setMovieInfo] = useState(null)


    useEffect(() => {
        const fetchMovies = async () => {
            try {
              const data = await getAllMovies();
              setMovies(data);
            } catch (error) {
              console.error('Error fetching movies:', error);
            }
          };

          const fetchGenres = async () => {
            try {
              const data = await getAllGenres();
              setGenres(["Все", ...data.map((item) => item.genre_name).sort((a, b) => a.localeCompare(b))].map((item, index) => ({
                value: index,
                label: item
            })))
            } catch (error) {
              console.error('Error fetching genres:', error);
            }
          };

          if (user && user.role !== "CINEMA_WORKER" && user.role !== "INFO_SERVICE") {
            navigate("/forbidden");
        }

      
          fetchMovies();
          fetchGenres();
    }, [user, navigate])


    return (
        <div className={style.back}>
            <div className={style.container}>
                <Nav />
                <div style={{fontSize: "25px", textAlign: "center", marginTop: "20px"}}>
                    Сейчас на экранах
                </div>
                <MoviesSwiper movies={movies} genres={genres} setMovieInfo={setMovieInfo} onEdit={() => {
                  setIsEditMode(true)
                  setAddMovieModalIsOpen(true)
                }}/>
            </div>
            <div style={{ marginTop: "10px" }}>
              { user && user.role === 'INFO_SERVICE' && <AddButton onClick={() => setAddMovieModalIsOpen(true)} />

              }
                <Modal 
                    isOpen={addMovieModalIsOpen}
                    onClose={() => {
                        setAddMovieModalIsOpen(false)
                        setMovieInfo(null)
                        setIsEditMode(false)
                    }}
                    style={{ backgroundColor: "rgb(65 91 103)"}}
                >

                    <AddMovieModal
                        setAddMovieModalIsOpen={setAddMovieModalIsOpen}
                        movieInfo={movieInfo}
                        isEditMode={isEditMode}
                        />
                </Modal>

            </div>
        </div>
    )
}

export default MoviePage