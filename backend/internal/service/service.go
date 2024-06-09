package service

import (
	"github.com/loloneme/CMS/backend/internal/entities"
	"github.com/loloneme/CMS/backend/internal/repository"
	"time"
)

type Service struct {
	Authorization
	TokenManager
	Cinema
	Movie
	Repertoire
}

type Authorization interface {
	CreateUser(user *entities.User) (int64, error)
	Login(user entities.User) (string, error)

	GetUserByEmail(email string) (entities.User, error)
	GetUserByID(userID int64) (entities.User, error)
	GetUsers() ([]entities.User, error)
	GetRoles() ([]entities.Role, error)

	UpdateUser(user *entities.User) error
	DeleteUser(userID int64) error
}

type TokenManager interface {
	GenerateJWTToken(payload Payload) (string, error)
	ParseJWTToken(accessToken string) (*Payload, error)
}

type Cinema interface {
	CreateCinema(cinema *entities.Cinema) (int64, error)

	GetAllCinemas() ([]entities.Cinema, error)
	GetCinemaById(cinemaID int64) (entities.Cinema, error)
	GetAllHallCategories() ([]entities.HallCategory, error)
	GetAllCategories() ([]entities.Category, error)

	UpdateCinema(cinema *entities.Cinema) error
	DeleteCinema(cinemaID int64) error
}

type Movie interface {
	CreateMovie(movie *entities.Movie) (int64, error)

	GetAllMovies() ([]entities.Movie, error)
	GetAllGenres() ([]entities.Genre, error)
	GetAllActors() ([]entities.Actor, error)
	GetAllStudios() ([]entities.Studio, error)
	GetAllCountries() ([]entities.Country, error)
	GetAllMovieNames() ([]entities.Movie, error)

	UpdateMovie(movie *entities.Movie) error
	DeleteMovie(movieID int64) error
}

type Repertoire interface {
	CreateSession(session *entities.Session) (int64, error)

	GetSession(sessionId int64) (entities.Session, error)
	GetAllMovies() ([]entities.Movie, error)
	GetAllCinemas() ([]entities.Cinema, error)
	GetSessionsByCinemaAndMovie(cinemaID, movieID int64) ([]entities.Session, error)

	UpdateSession(session *entities.Session) error
	DeleteSession(sessionID int64) error
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization, NewTokenManagerService(time.Minute*300)),
		TokenManager:  NewTokenManagerService(time.Minute * 300),
		Cinema:        NewCinemaService(repos.Cinema),
		Movie:         NewMovieService(repos.Movie),
		Repertoire:    NewRepertoireService(repos.Repertoire),
	}
}
