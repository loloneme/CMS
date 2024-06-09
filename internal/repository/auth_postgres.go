package repository

import (
	"database/sql"
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
	cinemaId := sql.NullInt64{}
	if user.CinemaId != 0 {
		cinemaId.Valid = true
		cinemaId.Int64 = user.CinemaId
	}
	query := `INSERT INTO "user" (fullname, phone, role_id, email, password, cinema_id) VALUES 
                                ($1, $2, $3, $4, $5, $6) RETURNING id`
	err := r.db.QueryRowx(query, user.FullName, user.Phone, user.RoleId, user.Email, user.Password, cinemaId).Scan(&userID)
	if err != nil {
		return 0, err
	}
	return userID, nil
}

func (r *AuthPostgres) GetUserByEmail(email string) (entities.User, error) {
	var user entities.User
	if err := r.db.Get(&user, `SELECT u.id, u.fullname, u.phone, u.role_id, r.name AS role,
       COALESCE(u.cinema_id, 0) AS cinema_id, u.email, u.password
       FROM "user" u JOIN "role" r ON r.id=u.role_id WHERE u.email=$1`, email); err != nil {
		return user, fmt.Errorf("error getting user by email: %s", err)
	}
	return user, nil
}

func (r *AuthPostgres) GetUserInfo(email, password string) (entities.User, error) {
	var user entities.User
	if err := r.db.Get(&user, `SELECT u.id, u.fullname, 
       u.phone, r.name as role, u.cinema_id, u.email, u.password
    	FROM user u
         JOIN role r on r.id=u.role_id
         WHERE email=$1 AND password=$2`, email, password); err != nil {
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

func (r *AuthPostgres) GetRoles() ([]entities.Role, error) {
	var res []entities.Role

	err := r.db.Select(&res, `SELECT * FROM role`)

	return res, err
}

func (r *AuthPostgres) GetUsers() ([]entities.User, error) {
	var res []entities.User

	err := r.db.Select(&res, `SELECT u.id, u.fullname, u.phone,
       					r.id AS role_id, r.name AS role, 
       					u.email, u.password,
						COALESCE(u.cinema_id, 0) AS cinema_id,
						COALESCE(c.name, '-') AS cinema_name
						FROM "user" u 
						JOIN "role" r ON u.role_id=r.id
						LEFT JOIN "cinema" c on u.cinema_id=c.id
						ORDER BY role, cinema_id
						`)

	return res, err
}

func (r *AuthPostgres) UpdateUser(user *entities.User) error {
	cinemaId := sql.NullInt64{}
	if user.CinemaId != 0 {
		cinemaId.Valid = true
		cinemaId.Int64 = user.CinemaId
	}
	_, err := r.db.Exec(`UPDATE "user" SET fullname=$1, phone=$2, email=$3, 
                  cinema_id=$4, role_id=$5 WHERE id=$6`, user.FullName, user.Phone,
		user.Email, cinemaId, user.RoleId, user.Id)

	return err
}

func (r *AuthPostgres) DeleteUser(userID int64) error {
	_, err := r.db.Exec(`DELETE FROM "user" WHERE id=$1`, userID)
	return err
}
