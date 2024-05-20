package service

import (
	"github.com/loloneme/CMS/internal/entities"
	"github.com/loloneme/CMS/internal/repository"
)

type CinemaService struct {
	repo repository.Cinema
}

func NewCinemaService(repo repository.Cinema) *CinemaService {
	return &CinemaService{repo: repo}
}

func (s *CinemaService) GetAllCinemas() ([]entities.Cinema, error) {
	return s.repo.GetAllCinemas()
}

func (s *CinemaService) GetAllCategories() ([]entities.Category, error) {
	return s.repo.GetAllCategories()
}

func (s *CinemaService) GetAllStatuses() ([]entities.Status, error) {
	return s.repo.GetAllStatuses()
}

func (s *CinemaService) CreateCinema(cinema *entities.Cinema) (int64, error) {
	return s.repo.CreateCinema(cinema)
}
