import React, { useState, useRef } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useEffect } from 'react';
import style from "../styles/AddModal.module.css"
import CustomStyles from '../styles/CustomStylesMultiSelect';
import { convertToBase64, convertToISO } from '../utils/utils';
import { createMovie, updateMovie, deleteMovie, getAllActors, getAllCountries, getAllGenres, getAllStudios } from '../utils/DataFetching';

const AddMovieModal = ({ setAddMovieModalIsOpen, movieInfo, isEditMode }) => {
  const fileInputRef = useRef(null)

  const [movieData, setMovieData] = useState(movieInfo || {
    movie_name: '',
    movie_image: '',
    year: 2024,
    premiere: '2001-01-01',
    rating: '12+',
    duration: 60,
    opertator: '',
    director: '',
    description: '',
    genres: [],
    actors: [],
    studios: [],
    countries: []
  })

  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [studios, setStudios] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getAllGenres();
        setGenres(data.map((genre) => ({
          value: genre.genre_id,
          label: genre.genre_name
        })))
      } catch (error) {
        console.error("Error fetching genres:", error)
      }
    }

    const fetchStudios = async () => {
      try {
        const data = await getAllStudios();
        setStudios(data.map((studio) => ({
          value: studio.studio_id,
          label: studio.studio_name
        })))
      } catch (error) {
        console.error("Error fetching genres:", error)
      }
    }

    const fetchActors = async () => {
      try {
        const data = await getAllActors();
        setActors(data.map((actor) => ({
          value: actor.actor_id,
          label: actor.actor_name
        })))
      } catch (error) {
        console.error("Error fetching genres:", error)
      }
    }

    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data.map((country) => ({
          value: country.country_id,
          label: country.country_name
        })))
      } catch (error) {
        console.error("Error fetching genres:", error)
      }
    }

    fetchCountries()
    fetchGenres()
    fetchStudios()
    fetchActors()
  }, [])

  console.log(movieData)


  const handleFileInput = () => {
    fileInputRef.current.click();
  }

  const handleAddMovie = async () => {
    try {
      const data = await createMovie(movieData);
      alert(data.message)
    } catch (error) {
      console.error('Error creating movie:', error);
    }
  };

  const handleUpdateMovie = async (e) => {
    try {
      const data = await updateMovie(movieData);
      alert(data.message)
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  }

  const handleDelete = async () => {
    try {
      const data = await deleteMovie(movieData.movie_id);
      alert(data.message)
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
    setAddMovieModalIsOpen(false)
    window.location.reload()
  }


  const submitMovie = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      handleUpdateMovie()
    } else {
      handleAddMovie()
    }

    setAddMovieModalIsOpen(false)
    window.location.reload()
  }

  const handleChange = (field, value) => {
    if (field === 'genres') {
      value = value.map(item => ({ [`genre_name`]: item.label }));
    } else if (field === 'actors') {
      value = value.map(item => ({ [`actor_name`]: item.label }));
    } else if (field === 'studios') {
      value = value.map(item => ({ [`studio_name`]: item.label }));
    } else if (field === 'countries') {
      value = value.map(item => ({ [`country_name`]: item.label }));
    } else if (field === 'premiere') {
      const isoDate = convertToISO(value);
      if (isoDate) {
        value = isoDate
      } else {
        console.error('Invalid date format');
      }
    } else if (field === 'year' || field === 'duration') {
      value = parseInt(value)
    }

    setMovieData({
      ...movieData,
      [field]: value
    })
  }


  return (
    <div className={style.container}>
      <div className={style.title}>{isEditMode ? "Редактирование фильма" : "Добавить фильм"}</div>
      <form onSubmit={submitMovie} className={style.movie_form}>
        <div className={style.form}>
          <div className={style.image_uploading}>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={async (e) => {
                try {
                  const converted = await convertToBase64(e.target.files[0])
                  handleChange("movie_image", converted)
                } catch (error) {
                  console.log(error)
                }
              }}
            />
            <label htmlFor="fileInput">Выберите фото:</label>
            {movieData.movie_image == "" || movieData.movie_image == null ?
              <img className={style.image} style={{ objectFit: "contain" }} src="movie.svg" onClick={handleFileInput} />
              : <img className={style.image} src={`data:image/png;base64,${movieData.movie_image}`} onClick={handleFileInput} />}
          </div>
          <div className={style.info}>
            <input className={style.input}
              type="text"
              value={movieData.movie_name}
              placeholder='Название фильма'
              required
              onChange={(e) => handleChange("movie_name", e.target.value)}
            />

            <input className={style.input}
              type="text"
              value={isEditMode ? movieData.rating : null}
              placeholder='Возрастное ограничение'
              required
              onChange={(e) => handleChange("rating", e.target.value)}
            />

            <input className={style.input}
              type="number"
              min={0}
              value={isEditMode ? movieData.duration : null}
              placeholder='Продолжительность'
              required
              onChange={(e) => handleChange("duration", e.target.value)}
            />

            <input className={style.input}
              type="number"
              min={0}
              value={isEditMode ? movieData.year : null}
              placeholder='Год производства'
              required
              onChange={(e) => handleChange("year", e.target.value)}
            />

            <input className={style.input}
              type="date"
              value={isEditMode ? convertToISO(movieData.premiere) : null}
              placeholder='Дата премьеры'
              required
              onChange={(e) => handleChange('premiere', e.target.value)}
            />

            <label>Оператор</label>
            <input className={style.input}
              type="text"
              value={movieData.operator}
              placeholder='Имя Фамилия'
              required
              onChange={(e) => handleChange('operator', e.target.value)}
            />

            <label>Режиссер</label>
            <input className={style.input}
              type="text"
              value={movieData.director}
              placeholder='Имя Фамилия'
              required
              onChange={(e) => handleChange('director', e.target.value)}
            />
          </div>
        </div>

        <div className={style.selects}>
          <label>Страны:</label>
          <CreatableSelect
            isMulti
            options={countries}
            onChange={(newValue) => handleChange('countries', newValue)}
            formatCreateLabel={(inputValue) => `Создать "${inputValue}"`}
            placeholder="Выбрать"
            styles={CustomStyles}
            noOptionsMessage={() => { return "Нет вариантов" }}
            defaultValue={movieData.countries ? movieData.countries.map((country) => ({
              value: country.country_id,
              label: country.country_name
            })) : null}

          />


          <div>
            <label>Жанры:</label>
            <CreatableSelect
              isMulti
              options={genres}
              onChange={(newValue) => handleChange('genres', newValue)}
              formatCreateLabel={(inputValue) => `Создать "${inputValue}"`}
              placeholder="Выбрать"
              styles={CustomStyles}
              defaultValue={movieData.genres ? movieData.genres.map((genre) => ({
                value: genre.genre_id,
                label: genre.genre_name
              })) : null}
            />
          </div>

          <div>
            <label>Актеры:</label>
            <CreatableSelect
              isMulti
              options={actors}
              onChange={(newValue) => handleChange('actors', newValue)}
              formatCreateLabel={(inputValue) => `Создать "${inputValue}"`}
              placeholder="Выбрать"
              styles={CustomStyles}

              noOptionsMessage={() => { return "Нет вариантов" }}
              defaultValue={movieData.actors ? movieData.actors.map((actor) => ({
                value: actor.actor_id,
                label: actor.actor_name
              })) : null}
            />
          </div>

          <div>
            <label>Киностудии:</label>
            <CreatableSelect
              isMulti
              options={studios}
              onChange={(newValue) => handleChange('studios', newValue)}
              // onCreateOption={handleCreateStudio}
              formatCreateLabel={(inputValue) => `Создать "${inputValue}"`}
              placeholder="Выбрать"
              styles={CustomStyles}
              // value={selectedStudios}
              noOptionsMessage={() => { return "Нет вариантов" }}
              defaultValue={movieData.studios ? movieData.studios.map((studio) => ({
                value: studio.studio_id,
                label: studio.studio_name
              })) : null}
            />
          </div>
        </div>
        <div className={style.desc}>
          <label>Описание:</label>
          <textarea className={style.desc_input}
            spellCheck="true"
            autoCapitalize='true'
            wrap="soft"
            value={movieData.description}
            placeholder='Введите здесь'
            required
            onChange={(e) => handleChange('description', e.target.value)}
          />

        </div>


        <div className={style.buttons} style={isEditMode ? { gridTemplateColumns: "100px auto 100px" } : { gridTemplateColumns: "auto" }}>
          {isEditMode &&
            <button className={style.delete_button} onClick={() => handleDelete()}>Удалить</button>
          }
          <button type="submit" className={style.button}>Сохранить</button>
        </div>
      </form>

    </div>

  );
};

export default AddMovieModal;
