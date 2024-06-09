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

	sessionTime, err := time.Parse(time.RFC3339, session.Date)
	if err != nil {
		return 0, err
	}

	err = r.db.QueryRowx(`INSERT INTO "session" (hall_id, movie_id, date, cost, booked_seats) 
							VALUES ($1, $2, $3, $4, $5) RETURNING id`, session.HallId, session.MovieId,
		sessionTime, session.Cost, session.BookedSeats).Scan(&sessionID)
	return sessionID, err
}

func (r *RepertoirePostgres) IntersectsWithAnySession(session *entities.Session) (bool, error) {
	var movieDuration int
	var intersects bool

	err := r.db.Get(&movieDuration, `SELECT duration FROM movie WHERE id=$1`, session.MovieId)
	if err != nil {
		return false, err
	}

	sessionTime, err := time.Parse(time.RFC3339, session.Date)
	if err != nil {
		return false, err
	}

	err = r.db.Get(&intersects, `SELECT EXISTS (
        SELECT 1
        FROM session s
        JOIN movie m ON s.movie_id = m.id
        WHERE s.hall_id = $1
        AND (
            ($2::timestamptz, $2::timestamptz + INTERVAL '1 minute' * $3) OVERLAPS (s.date, s.date + INTERVAL '1 minute' * m.duration)
            OR
            (s.date, s.date + INTERVAL '1 minute' * m.duration) OVERLAPS ($2::timestamptz, $2::timestamptz + INTERVAL '1 minute' * $3)
        )
    )`, session.HallId, sessionTime, movieDuration)

	if err != nil {
		return false, err
	}
	return intersects, nil
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
       h.name as hall_name, s.movie_id, h.seats, hc.hall_category, s.date, s.cost, s.booked_seats, h.cinema_id
		FROM session s
		LEFT JOIN hall h on s.hall_id = h.id
		LEFT JOIN hall_category hc on h.hall_category_id = hc.id
		LEFT JOIN cinema c on h.cinema_id = c.id
		WHERE s.movie_id = $1 AND c.id = $2`

	err := r.db.Select(&res, query, movieID, cinemaID)
	return res, err
}

func (r *RepertoirePostgres) UpdateSession(session *entities.Session) error {
	sessionTime, err := time.Parse(time.RFC3339, session.Date)
	if err != nil {
		return err
	}

	_, err = r.db.Exec(`UPDATE "session" SET hall_id=$1, date=$2, cost=$3,
                    booked_seats=$4 WHERE id=$5`, session.HallId, sessionTime, session.Cost, session.BookedSeats, session.Id)
	return err
}

func (r *RepertoirePostgres) DeleteSession(sessionID int64) error {
	_, err := r.db.Exec(`DELETE FROM "session"  WHERE id=$1`, sessionID)
	return err
}
