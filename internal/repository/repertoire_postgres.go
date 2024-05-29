package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/loloneme/CMS/internal/entities"
	"time"
)

type RepertoirePostgres struct {
	db *sqlx.DB
}

func NewRepertoirePostgres(db *sqlx.DB) *RepertoirePostgres {
	return &RepertoirePostgres{db: db}
}

func (r *RepertoirePostgres) CreateSession(session *entities.Session) (int64, error) {
	var sessionID int64

	sessionTime, err := time.Parse("2006-01-02T15:04", session.Date)
	if err != nil {
		return 0, err
	}

	err = r.db.QueryRowx(`INSERT INTO "session" (hall_id, movie_id, date, cost, booked_seats) 
							VALUES ($1, $2, $3, $4, $5) RETURNING id`, session.HallId, session.MovieId,
		sessionTime, session.Cost, session.BookedSeats).Scan(&sessionID)
	return sessionID, err
}

func (r *RepertoirePostgres) GetSession(sessionId int64) (entities.Session, error) {
	var res entities.Session

	query := `SELECT s.id, s.hall_id, 
       h.name AS hall_name, s.movie_id, s.date, s.cost, s.booked_seats, h.cinema_id
		FROM session s
		LEFT JOIN hall h on s.hall_id = h.id
		WHERE s.id = $1`

	err := r.db.Get(&res, query, sessionId)

	return res, err
}

func (r *RepertoirePostgres) GetMovieBriefInfo(movieId int64) (entities.Movie, error) {
	var res entities.Movie

	query := `SELECT m.id, m.name, m.rating, m.duration
		FROM movie m
		WHERE m.id = $1`

	err := r.db.Get(&res, query, movieId)
	return res, err
}

func (r *RepertoirePostgres) GetAllMovies() ([]entities.Movie, error) {
	var res []entities.Movie

	query := `SELECT m.id, m.name, m.rating, m.duration, m.image
		FROM movie m`

	err := r.db.Select(&res, query)
	return res, err
}

func (r *RepertoirePostgres) GetAllCinemas() ([]entities.Cinema, error) {
	var res []entities.Cinema

	query := `SELECT c.id, c.name FROM cinema c`

	err := r.db.Select(&res, query)
	return res, err
}

func (r *RepertoirePostgres) GetSessionsByCinemaAndMovie(cinemaID, movieID int64) ([]entities.Session, error) {
	var res []entities.Session
	query := `SELECT s.id, s.hall_id, 
       h.name AS hall_name, s.movie_id, s.date, s.cost, s.booked_seats, h.cinema_id
		FROM session s
		LEFT JOIN hall h on s.hall_id = h.id
		LEFT JOIN cinema c on h.cinema_id = c.id
		WHERE s.movie_id = $1 AND c.id = $2`

	err := r.db.Select(&res, query, movieID, cinemaID)
	return res, err
}

func (r *RepertoirePostgres) GetAllSessionsByCinemas() ([]entities.Repertoire, error) {
	var res []entities.Repertoire

	createViewQuery := `
    CREATE OR REPLACE VIEW cinema_movie_sessions_view AS
    SELECT 
        c.id AS cinema_id,
        s.movie_id AS movie_id,
        s.id AS id,
        s.date AS date
    FROM cinema c
    JOIN hall h ON c.id = h.cinema_id
    JOIN session s ON h.id = s.hall_id;
    `
	_, err := r.db.Exec(createViewQuery)
	if err != nil {
		return res, err
	}

	err = r.db.Select(&res, `SELECT id AS cinema_id, name AS cinema_name FROM cinema`)
	if err != nil {
		return res, err
	}

	var movies []entities.MovieRepertoire
	err = r.db.Select(&movies, `SELECT id, name, image FROM movie`)
	if err != nil {
		return res, err
	}

	for i, cinema := range res {
		for _, movie := range movies {
			m := entities.MovieRepertoire{
				Id:       movie.Id,
				Name:     movie.Name,
				Image:    movie.Image,
				Sessions: []entities.Session{},
			}
			err = r.db.Select(&m.Sessions, `SELECT id, date FROM cinema_movie_sessions_view WHERE 
													cinema_id=$1 AND movie_id=$2`, cinema.CinemaId, movie.Id)
			if err != nil {
				return nil, nil
			}

			if len(m.Sessions) != 0 {
				res[i].Movies = append(res[i].Movies, m)
			}

		}
	}

	return res, nil

}
