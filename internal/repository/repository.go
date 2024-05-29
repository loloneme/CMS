package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/loloneme/CMS/internal/entities"
)

type Repository struct {
	Authorization
	TokenManager
	Cinema
	Movie
	Hall
	Repertoire
}

type Authorization interface {
	CreateUser(user *entities.User) (int64, error)
	GetUserByEmail(email string) (entities.User, error)
	GetUserByID(userID int64) (entities.User, error)
	DeleteUser(userID int64) error
}

type TokenManager interface {
}

type Cinema interface {
	CreateCinema(cinema *entities.Cinema) (int64, error)
	CreateHalls(cinemaID int64, halls []entities.Hall) error
	//GetCinema(cinemaId int64) (entities.Cinema, error)
	GetAllCinemas() ([]entities.Cinema, error)
	GetCinemaById(cinemaID int64) (entities.Cinema, error)

	GetAllCategories() ([]entities.Category, error)
	GetCategoryId(category string) (int64, error)

	//CreateCategory(category string) (int64, error)
	UpdateCinema(cinema *entities.Cinema) error
	DeleteCinema(cinemaID int64) error
}

type Hall interface {
	//CreateHall(cinema *entities.Cinema) (int64, error)
	//GetCinema(cinemaId int64) (entities.Cinema, error)
	//GetAllHalls() ([]entities.Cinema, error)
	GetAllHallCategories() ([]entities.HallCategory, error)

	//CreateCategory(category string) (int64, error)
	//UpdateCinema(cinema *entities.Cinema) error
	//DeleteCinema(cinemaID int64) error
}

type Movie interface {
	CreateMovie(movie *entities.Movie) (int64, error)
	ConnectMovieStudios(movieID int64, studios []entities.Studio) error
	ConnectMovieGenres(movieID int64, genres []entities.Genre) error
	ConnectMovieActors(movieID int64, actors []entities.Actor) error
	ConnectMovieCountries(movieID int64, countries []entities.Country) error

	GetAllMovies() ([]entities.Movie, error)
	GetAllGenres() ([]entities.Genre, error)
	GetAllActors() ([]entities.Actor, error)
	GetAllStudios() ([]entities.Studio, error)
	GetAllCountries() ([]entities.Country, error)

	DeleteMovieCountryConnection(movieID int64) error
	DeleteMovieActorConnection(movieID int64) error
	DeleteMovieGenreConnection(movieID int64) error
	DeleteMovieStudioConnection(movieID int64) error

	UpdateMovie(movie *entities.Movie) error
	DeleteMovie(movieID int64) error
}

type Repertoire interface {
	CreateSession(session *entities.Session) (int64, error)
	GetSession(sessionId int64) (entities.Session, error)
	GetMovieBriefInfo(movieId int64) (entities.Movie, error)

	GetAllSessionsByCinemas() ([]entities.Repertoire, error)
	GetAllMovies() ([]entities.Movie, error)
	GetAllCinemas() ([]entities.Cinema, error)
	GetSessionsByCinemaAndMovie(cinemaID, movieID int64) ([]entities.Session, error)

	//GetAllSessionsByMovie() ([]entities.Session, error)
	//GetAllSessions() ([]entities.Session, error)

	//CreateCategory(category string) (int64, error)
	//UpdateCinema(cinema *entities.Cinema) error
	//DeleteCinema(cinemaID int64) error
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db),
		TokenManager:  NewTokenManagerPostgres(db),
		Cinema:        NewCinemaPostgres(db),
		Movie:         NewMoviePostgres(db),
		Hall:          NewHallPostgres(db),
		Repertoire:    NewRepertoirePostgres(db),
	}

}
