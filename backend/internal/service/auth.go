package service

import (
	"errors"
	"github.com/loloneme/CMS/backend/internal/entities"
	"github.com/loloneme/CMS/backend/internal/repository"
	"github.com/loloneme/CMS/backend/internal/utils"
)

type AuthService struct {
	repo         repository.Authorization
	tokenManager TokenManager
}

func NewAuthService(repo repository.Authorization, tokenManager *TokenManagerService) *AuthService {
	return &AuthService{repo: repo, tokenManager: tokenManager}
}

func (s *AuthService) CreateUser(user *entities.User) (int64, error) {
	_, err := s.repo.GetUserByEmail(user.Email)
	if err == nil {
		return 0, errors.New("user already exists")
	}

	user.Password = utils.GeneratePasswordHash(user.Password)

	return s.repo.CreateUser(user)
}

func (s *AuthService) Login(user entities.User) (string, error) {
	userInfo, err := s.repo.GetUserByEmail(user.Email)
	if err != nil {
		return "", err
	}

	if !utils.CheckPassword(user.Password, userInfo.Password) {
		return "", errors.New("wrong password")
	}

	return s.tokenManager.GenerateJWTToken(Payload{
		UserId: userInfo.Id,
		Role:   userInfo.Role,
		Cinema: userInfo.CinemaId,
	})
}

func (s *AuthService) GetUserByEmail(email string) (entities.User, error) {
	return s.repo.GetUserByEmail(email)
}

func (s *AuthService) GetUserByID(userID int64) (entities.User, error) {
	return s.repo.GetUserByID(userID)
}

func (s *AuthService) GetRoles() ([]entities.Role, error) {
	return s.repo.GetRoles()
}

func (s *AuthService) GetUsers() ([]entities.User, error) {
	return s.repo.GetUsers()
}

func (s *AuthService) UpdateUser(user *entities.User) error {
	return s.repo.UpdateUser(user)
}

func (s *AuthService) DeleteUser(userID int64) error {
	return s.repo.DeleteUser(userID)
}
