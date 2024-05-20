package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/loloneme/CMS/internal/entities"
)

type Repository struct {
	Authorization
	TokenManager
	Cinema
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
	//GetCinema(cinemaId int64) (entities.Cinema, error)
	GetAllCinemas() ([]entities.Cinema, error)
	GetAllCategories() ([]entities.Category, error)
	GetAllStatuses() ([]entities.Status, error)

	//
	//CreateCategory(category string) (int64, error)
	//UpdateCinema(cinema *entities.Cinema) error
	//DeleteCinema(cinemaID int64) error
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db),
		TokenManager:  NewTokenManagerPostgres(db),
		Cinema:        NewCinemaPostgres(db),
	}

}
