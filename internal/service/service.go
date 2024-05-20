package service

import (
	"github.com/loloneme/CMS/internal/entities"
	"github.com/loloneme/CMS/internal/repository"
)

type Service struct {
	Authorization
	TokenManager
	Cinema
}

type Authorization interface {
	CreateUser(user *entities.User) (int64, error)
	Login(user entities.User) (string, error)
	GetUserByEmail(email string) (entities.User, error)
	GetUserByID(userID int64) (entities.User, error)
	DeleteUser(userID int64) error
}

type TokenManager interface {
	GenerateJWTToken(payload Payload) (string, error)
	GenerateRefreshToken(userID int64) (string, error)

	ParseJWTToken(accessToken string) (*Payload, error)
	ParseRefreshToken(refreshToken string) (int64, error)
	//SaveRefreshToken(token string) error
	//DeleteRefreshToken(token string) error
}

type Cinema interface {
	CreateCinema(cinema *entities.Cinema) (int64, error)
	//GetCinema(cinemaId int64) (entities.Cinema, error)
	GetAllCinemas() ([]entities.Cinema, error)
	GetAllCategories() ([]entities.Category, error)
	GetAllStatuses() ([]entities.Status, error)

	//CreateCategory(category string) (int64, error)
	//UpdateCinema(cinema *entities.Cinema) error
	//DeleteCinema(cinemaID int64) error
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization, NewTokenManagerService(repos)),
		Cinema:        NewCinemaService(repos.Cinema),
	}
}
