package service

import (
	"errors"
	"fmt"
	"github.com/loloneme/CMS/internal/entities"
	"github.com/loloneme/CMS/internal/repository"
	"github.com/loloneme/CMS/internal/utils"
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
		return "", fmt.Errorf("wrong password")
	}

	return s.tokenManager.GenerateJWTToken(Payload{
		UserId: userInfo.Id,
		Role:   "",
	})
}

func (s *AuthService) GetUserByEmail(email string) (entities.User, error) {
	return s.repo.GetUserByEmail(email)
}

func (s *AuthService) GetUserByID(userID int64) (entities.User, error) {
	return s.repo.GetUserByID(userID)
}

func (s *AuthService) DeleteUser(userID int64) error {
	return s.repo.DeleteUser(userID)
}
