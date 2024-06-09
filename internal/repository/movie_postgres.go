package repository

import (
	"database/sql"
	"encoding/json"
	"github.com/jmoiron/sqlx"
	"github.com/loloneme/CMS/internal/entities"
	"log"
	"time"
)

type MoviePostgres struct {
	db *sqlx.DB
}

func NewMoviePostgres(db *sqlx.DB) *MoviePostgres {
	return &MoviePostgres{db: db}
}

func (r *MoviePostgres) GetAllMovies() ([]entities.Movie, error) {
	var res []entities.MovieDB

	query := `
        SELECT
            m.id AS id,
            m.name AS name,
            m.director AS director,
            m.operator AS operator,
            m.image AS image,
            m.premiere AS premiere,
            m.year AS year,
            m.description AS description,
        	m.rating AS rating,
            m.duration AS duration,

            COALESCE(json_agg(DISTINCT jsonb_build_object('genre_id', g.id, 'genre_name', g.name)), '[]') AS genres,
            COALESCE(json_agg(DISTINCT jsonb_build_object('studio_id', s.id, 'studio_name', s.name)) , '[]') AS studios,
            COALESCE(json_agg(DISTINCT jsonb_build_object('actor_id', a.id, 'actor_name', a.fullname)), '[]') AS actors,
            COALESCE(json_agg(DISTINCT jsonb_build_object('country_id', c.id, 'country_name', c.country)), '[]') AS countries

        FROM
            movie m
        LEFT JOIN movie_genre mg ON m.id = mg.movie_id
        LEFT JOIN genre g ON mg.genre_id = g.id
        LEFT JOIN movie_studio ms ON m.id = ms.movie_id
        LEFT JOIN studio s ON ms.studio_id = s.id
        LEFT JOIN movie_actor ma ON m.id = ma.movie_id
        LEFT JOIN actor a ON ma.actor_id = a.id
        LEFT JOIN movie_country mc on m.id = mc.movie_id
        LEFT JOIN country c on mc.country_id = c.id
        GROUP BY m.id;
    `
	err := r.db.Select(&res, query)
	if err != nil {
		log.Fatalln(err)
	}

	movies := make([]entities.Movie, len(res))
	for i, movieDB := range res {
		var movie entities.Movie
		movie.Id = movieDB.Id
		movie.Name = movieDB.Name
		movie.Director = movieDB.Director
		movie.Operator = movieDB.Operator
		movie.Image = movieDB.Image
		movie.Premiere = movieDB.Premiere
		movie.Year = movieDB.Year
		movie.Rating = movieDB.Rating
		movie.Duration = movieDB.Duration
		movie.Description = movieDB.Description

		err := json.Unmarshal(movieDB.Genres, &movie.Genres)
		if err != nil {
			return nil, err
		}

		err = json.Unmarshal(movieDB.Studios, &movie.Studios)
		if err != nil {
			return nil, err
		}

		err = json.Unmarshal(movieDB.Actors, &movie.Actors)
		if err != nil {
			return nil, err
		}

		err = json.Unmarshal(movieDB.Countries, &movie.Countries)
		if err != nil {
			return nil, err
		}

		movies[i] = movie
	}

	return movies, err
}

func (r *MoviePostgres) GetAllGenres() ([]entities.Genre, error) {
	var res []entities.Genre
	err := r.db.Select(&res, `SELECT * FROM genre`)

	return res, err
}

func (r *MoviePostgres) GetAllActors() ([]entities.Actor, error) {
	var res []entities.Actor
	err := r.db.Select(&res, `SELECT * FROM actor`)

	return res, err
}

func (r *MoviePostgres) GetAllStudios() ([]entities.Studio, error) {
	var res []entities.Studio
	err := r.db.Select(&res, `SELECT * FROM studio`)

	return res, err
}

func (r *MoviePostgres) GetAllCountries() ([]entities.Country, error) {
	var res []entities.Country
	err := r.db.Select(&res, `SELECT * FROM country`)

	return res, err
}

func (r *MoviePostgres) GetAllMovieNames() ([]entities.Movie, error) {
	var res []entities.Movie
	err := r.db.Select(&res, `SELECT id, name FROM movie`)

	return res, err

}

func (r *MoviePostgres) CreateMovie(movie *entities.Movie) (int64, error) {
	var movieID int64

	newDate, err := time.Parse("2006-01-02", movie.Premiere)
	if err != nil {
		log.Fatal("Invalid date format:", err)
	}
	query := `INSERT INTO "movie" (name, director, operator, image, premiere, year, rating, duration, description) VALUES 
                                ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`
	err = r.db.QueryRowx(query, movie.Name, movie.Director, movie.Operator,
		movie.Image, newDate, movie.Year, movie.Rating, movie.Duration, movie.Description).Scan(&movieID)
	if err != nil {
		return 0, err
	}
	return movieID, nil
}

func (r *MoviePostgres) ConnectMovieStudios(movieID int64, studios []entities.Studio) error {
	for _, s := range studios {
		var id int64
		err := r.db.Get(&id, `SELECT id FROM studio WHERE name=$1`, s.Name)
		if err == sql.ErrNoRows {
			err := r.db.QueryRowx("INSERT INTO studio (name) VALUES ($1) RETURNING id", s.Name).Scan(&id)
			if err != nil {
				return err
			}
		} else if err != nil {
			return err
		}

		_, err = r.db.Exec(`INSERT INTO movie_studio (movie_id, studio_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
			movieID, id)

		if err != nil {
			return err
		}
	}
	return nil
}

func (r *MoviePostgres) ConnectMovieGenres(movieID int64, genres []entities.Genre) error {
	for _, g := range genres {
		var id int64
		err := r.db.Get(&id, `SELECT id FROM genre WHERE name=$1`, g.Name)
		if err == sql.ErrNoRows {
			err := r.db.QueryRowx("INSERT INTO genre (name) VALUES ($1) RETURNING id", g.Name).Scan(&id)
			if err != nil {
				return err
			}
		} else if err != nil {
			return err
		}

		_, err = r.db.Exec(`INSERT INTO movie_genre (movie_id, genre_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
			movieID, id)

		if err != nil {
			return err
		}
	}
	return nil
}

func (r *MoviePostgres) ConnectMovieActors(movieID int64, actors []entities.Actor) error {
	for _, a := range actors {
		var id int64
		err := r.db.Get(&id, `SELECT id FROM actor WHERE fullname=$1`, a.FullName)
		if err == sql.ErrNoRows {
			err := r.db.QueryRowx("INSERT INTO actor (fullname) VALUES ($1) RETURNING id", a.FullName).Scan(&id)
			if err != nil {
				return err
			}
		} else if err != nil {
			return err
		}
		_, err = r.db.Exec(`INSERT INTO movie_actor (movie_id, actor_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
			movieID, id)

		if err != nil {
			return err
		}
	}
	return nil
}

func (r *MoviePostgres) ConnectMovieCountries(movieID int64, countries []entities.Country) error {
	for _, c := range countries {
		var id int64
		err := r.db.Get(&id, `SELECT id FROM country WHERE country=$1`, c.Name)
		if err == sql.ErrNoRows {
			err := r.db.QueryRowx("INSERT INTO country (country) VALUES ($1) RETURNING id", c.Name).Scan(&id)
			if err != nil {
				return err
			}
		} else if err != nil {
			return err
		}
		_, err = r.db.Exec(`INSERT INTO movie_country (movie_id, country_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
			movieID, id)

		if err != nil {
			return err
		}
	}
	return nil
}

func (r *MoviePostgres) UpdateMovie(movie *entities.Movie) error {
	newDate, err := time.Parse("2006-01-02", movie.Premiere)
	if err != nil {
		log.Fatal("Invalid date format:", err)
	}
	query := `UPDATE movie SET name=$1, director=$2, operator=$3, image=$4, premiere=$5, year=$6, rating=$7, duration=$8, description=$9
				WHERE id=$10`
	_, err = r.db.Exec(query, movie.Name, movie.Director, movie.Operator,
		movie.Image, newDate, movie.Year, movie.Rating, movie.Duration, movie.Description, movie.Id)

	if err != nil {
		return err
	}
	return nil
}

func (r *MoviePostgres) DeleteMovieCountryConnection(movieID int64) error {
	_, err := r.db.Exec(`DELETE FROM movie_country WHERE movie_id=$1`, movieID)
	return err
}

func (r *MoviePostgres) DeleteMovieActorConnection(movieID int64) error {
	_, err := r.db.Exec(`DELETE FROM movie_actor WHERE movie_id=$1`, movieID)
	return err
}

func (r *MoviePostgres) DeleteMovieGenreConnection(movieID int64) error {
	_, err := r.db.Exec(`DELETE FROM movie_genre WHERE movie_id=$1`, movieID)
	return err
}

func (r *MoviePostgres) DeleteMovieStudioConnection(movieID int64) error {
	_, err := r.db.Exec(`DELETE FROM movie_studio WHERE movie_id=$1`, movieID)
	return err
}

func (r *MoviePostgres) DeleteMovie(movieID int64) error {
	_, err := r.db.Exec(`DELETE FROM movie WHERE id=$1`, movieID)
	return err
}
