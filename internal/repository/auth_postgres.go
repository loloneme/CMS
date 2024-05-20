package repository

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/loloneme/CMS/internal/entities"
)

type AuthPostgres struct {
	db *sqlx.DB
}

func NewAuthPostgres(db *sqlx.DB) *AuthPostgres {
	return &AuthPostgres{db: db}
}

func (r *AuthPostgres) CreateUser(user *entities.User) (int64, error) {
	var userID int64
	query := `INSERT INTO "user" (fullname, phone, role, email, password) VALUES 
                                ($1, $2, $3, $4, $5) RETURNING id`
	err := r.db.QueryRowx(query, user.FullName, user.Phone, user.RoleId, user.Email, user.Password).Scan(&userID)
	if err != nil {
		return 0, err
	}
	return userID, nil
}

func (r *AuthPostgres) GetUserByEmail(email string) (entities.User, error) {
	var user entities.User
	if err := r.db.Get(&user, `SELECT * FROM "user" WHERE email=$1`, email); err != nil {
		return user, fmt.Errorf("error getting user by email: %s", err)
	}
	return user, nil
}

func (r *AuthPostgres) GetUserInfo(email, password string) (entities.User, error) {
	var user entities.User
	if err := r.db.Get(&user, `SELECT * FROM "user" WHERE email=$1 AND password=$2`, email, password); err != nil {
		return user, fmt.Errorf("user was not found: %s", err)
	}
	return user, nil
}

func (r *AuthPostgres) GetUserByID(userID int64) (entities.User, error) {
	var user entities.User
	if err := r.db.Get(&user, `SELECT * FROM "user" WHERE id=$1`, userID); err != nil {
		return user, fmt.Errorf("error getting user by email: %s", err)
	}
	return user, nil
}

func (r *AuthPostgres) DeleteUser(userID int64) error {
	return nil
}
