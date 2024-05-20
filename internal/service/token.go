package service

import (
	"errors"
	"github.com/golang-jwt/jwt/v5"
	"github.com/loloneme/CMS/internal/repository"
	"os"
	"time"
)

type TokenManagerService struct {
	repo repository.TokenManager
}

type Payload struct {
	UserId int64  `json:"user_id"`
	Role   string `json:"role"`
}

type Claims struct {
	jwt.MapClaims
	Payload
}

const (
	accessTokenTTL  = time.Minute * 15
	refreshTokenTTL = time.Hour * 24 * 30
)

var AccessSigningKey = os.Getenv("SECRET_KEY_ACCESS")
var RefreshSigningKey = os.Getenv("SECRET_KEY_REFRESH")

func NewTokenManagerService(repo repository.TokenManager) *TokenManagerService {
	return &TokenManagerService{repo: repo}
}

func (s *TokenManagerService) GenerateJWTToken(payload Payload) (string, error) {
	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, &Claims{
		jwt.MapClaims{
			"ExpiresAt": time.Now().Add(accessTokenTTL).Unix(),
			"IssuedAt":  time.Now().Unix(),
		},
		payload,
	}).SignedString([]byte(AccessSigningKey))
	if err != nil {
		return "", err
	}
	return token, nil
}

func (s *TokenManagerService) GenerateRefreshToken(userID int64) (string, error) {
	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, &jwt.MapClaims{
		"ExpiresAt": time.Now().Add(refreshTokenTTL).Unix(),
		"IssuedAt":  time.Now().Unix(),
		"user_id":   userID,
	}).SignedString([]byte(RefreshSigningKey))
	if err != nil {
		return "", err
	}
	return token, nil
}

func (s *TokenManagerService) ParseJWTToken(accessToken string) (*Payload, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(accessToken, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}

		return []byte(AccessSigningKey), nil
	})
	if err != nil {
		return &Payload{}, err
	}

	claims, ok := token.Claims.(*Claims)
	if !ok {
		return &Payload{}, errors.New("error in token claims")
	}
	return &claims.Payload, nil
}

func (s *TokenManagerService) ParseRefreshToken(refreshToken string) (int64, error) {
	claims := &jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(refreshToken, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}

		return []byte(RefreshSigningKey), nil
	})
	if err != nil {
		return 0, err
	}

	if !token.Valid {
		return 0, errors.New("token is not valid")
	}

	userID, ok := (*claims)["user_id"]
	if !ok {
		return 0, errors.New("error in token claims")
	}

	res, ok := userID.(int64)
	if !ok {
		return 0, errors.New("user_id claim has invalid type")
	}

	return res, nil
}
