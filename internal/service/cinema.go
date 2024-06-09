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

func (s *CinemaService) GetCinemaById(cinemaID int64) (entities.Cinema, error) {
	return s.repo.GetCinemaById(cinemaID)
}

func (s *CinemaService) GetAllCategories() ([]entities.Category, error) {
	return s.repo.GetAllCategories()
}

func (s *CinemaService) GetAllHallCategories() ([]entities.HallCategory, error) {
	return s.repo.GetAllHallCategories()
}

func (s *CinemaService) CreateCinema(cinema *entities.Cinema) (int64, error) {
	id, err := s.repo.CreateCinema(cinema)
	if err != nil {
		return 0, err
	}
	err = s.repo.CreateHalls(id, cinema.Halls)
	return id, err
}

func (s *CinemaService) UpdateCinema(cinema *entities.Cinema) error {
	return s.repo.UpdateCinema(cinema)
}

func (s *CinemaService) DeleteCinema(cinemaID int64) error {
	return s.repo.DeleteCinema(cinemaID)
}
