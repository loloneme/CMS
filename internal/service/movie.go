package service

import (
	"github.com/loloneme/CMS/internal/entities"
	"github.com/loloneme/CMS/internal/repository"
)

type MovieService struct {
	repo repository.Movie
}

func NewMovieService(repo repository.Movie) *MovieService {
	return &MovieService{repo: repo}
}

func (s *MovieService) GetAllMovies() ([]entities.Movie, error) {
	return s.repo.GetAllMovies()
}

func (s *MovieService) CreateMovie(movie *entities.Movie) (int64, error) {
	movieID, err := s.repo.CreateMovie(movie)

	if err != nil {
		return 0, err
	}

	if err = s.repo.ConnectMovieStudios(movieID, movie.Studios); err != nil {
		return 0, err
	}
	if err = s.repo.ConnectMovieGenres(movieID, movie.Genres); err != nil {
		return 0, err
	}
	if err = s.repo.ConnectMovieActors(movieID, movie.Actors); err != nil {
		return 0, err
	}
	if err = s.repo.ConnectMovieCountries(movieID, movie.Countries); err != nil {
		return 0, err
	}

	return movieID, nil
}

func (s *MovieService) GetAllGenres() ([]entities.Genre, error) {
	return s.repo.GetAllGenres()
}
func (s *MovieService) GetAllActors() ([]entities.Actor, error) {
	return s.repo.GetAllActors()
}
func (s *MovieService) GetAllStudios() ([]entities.Studio, error) {
	return s.repo.GetAllStudios()
}

func (s *MovieService) GetAllCountries() ([]entities.Country, error) {
	return s.repo.GetAllCountries()
}

func (s *MovieService) UpdateMovie(movie *entities.Movie) error {
	err := s.repo.UpdateMovie(movie)

	if err != nil {
		return err
	}

	err = s.repo.DeleteMovieCountryConnection(movie.Id)
	if err != nil {
		return err
	}
	if err = s.repo.ConnectMovieCountries(movie.Id, movie.Countries); err != nil {
		return err
	}

	err = s.repo.DeleteMovieGenreConnection(movie.Id)
	if err != nil {
		return err
	}
	if err = s.repo.ConnectMovieGenres(movie.Id, movie.Genres); err != nil {
		return err
	}

	err = s.repo.DeleteMovieActorConnection(movie.Id)
	if err != nil {
		return err
	}
	if err = s.repo.ConnectMovieActors(movie.Id, movie.Actors); err != nil {
		return err
	}

	err = s.repo.DeleteMovieStudioConnection(movie.Id)
	if err != nil {
		return err
	}
	if err = s.repo.ConnectMovieStudios(movie.Id, movie.Studios); err != nil {
		return err
	}

	return nil
}

func (s *MovieService) DeleteMovie(movieID int64) error {
	return s.repo.DeleteMovie(movieID)
}

//func (s *MovieService) UpdateCinema(cinema *entities.Cinema) error {
//	return s.repo.UpdateCinema(cinema)
//}
//
//func (s *MovieService) DeleteCinema(cinemaID int64) error {
//	return s.repo.DeleteCinema(cinemaID)
//}
