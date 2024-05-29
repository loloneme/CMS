package service

import (
	"github.com/loloneme/CMS/internal/entities"
	"github.com/loloneme/CMS/internal/repository"
)

type RepertoireService struct {
	repo repository.Repertoire
}

func NewRepertoireService(repo repository.Repertoire) *RepertoireService {
	return &RepertoireService{repo: repo}
}

func (s *RepertoireService) CreateSession(session *entities.Session) (int64, error) {
	return s.repo.CreateSession(session)
}

func (s *RepertoireService) GetSession(sessionID int64) (entities.Session, error) {
	res, err := s.repo.GetSession(sessionID)
	if err != nil {
		return res, err
	}

	movie, err := s.repo.GetMovieBriefInfo(res.MovieId)
	if err != nil {
		return res, err
	}

	res.Movie = movie
	return res, nil
}

func (s *RepertoireService) GetAllSessionsByCinemas() ([]entities.Repertoire, error) {
	return s.repo.GetAllSessionsByCinemas()
}

func (s *RepertoireService) GetAllMovies() ([]entities.Movie, error) {
	return s.repo.GetAllMovies()
}
func (s *RepertoireService) GetAllCinemas() ([]entities.Cinema, error) {
	return s.repo.GetAllCinemas()
}
func (s *RepertoireService) GetSessionsByCinemaAndMovie(cinemaID, movieID int64) ([]entities.Session, error) {
	return s.repo.GetSessionsByCinemaAndMovie(cinemaID, movieID)
}

//func (s *RepertoireService) GetAllSessions() ([]entities.Session, error) {
//	return s.repo.GetAllSessions()
//}
