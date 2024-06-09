package entities

import (
	"encoding/json"
)

type User struct {
	Id         int64  `json:"user_id" db:"id"`
	FullName   string `json:"full_name" db:"fullname"`
	Phone      string `json:"phone" db:"phone"`
	RoleId     int64  `json:"role_id" db:"role_id"`
	Role       string `json:"role_name" db:"role"`
	CinemaId   int64  `json:"cinema_id,omitempty" db:"cinema_id"`
	CinemaName string `json:"cinema_name" db:"cinema_name"`

	Email    string `json:"email" db:"email"`
	Password string `json:"password" db:"password"`
}

type Role struct {
	Id   int64  `json:"role_id" db:"id"`
	Name string `json:"role" db:"name"`
}

type Cinema struct {
	Id      int64  `json:"cinema_id" db:"id"`
	Name    string `json:"cinema_name" db:"name"`
	Address string `json:"address,omitempty" db:"address"`

	Image string `json:"cinema_image,omitempty" db:"image"`
	Halls []Hall `json:"halls,omitempty"`

	Category   string `json:"category_name,omitempty" db:"category_name"`
	CategoryId int64  `json:"category_id,omitempty" db:"category_id"`

	Phone string `json:"cinema_phone,omitempty" db:"phone"`
}

type Category struct {
	Id   int64  `json:"category_id" db:"id"`
	Name string `json:"category_name" db:"name"`
}

type Movie struct {
	Id          int64  `json:"movie_id,omitempty" db:"id"`
	Name        string `json:"movie_name,omitempty" db:"name"`
	Director    string `json:"director,omitempty" db:"director"`
	Operator    string `json:"operator,omitempty" db:"operator"`
	Image       string `json:"movie_image,omitempty" db:"image"`
	Premiere    string `json:"premiere,omitempty" db:"premiere"`
	Year        int    `json:"year,omitempty" db:"year"`
	Rating      string `json:"rating,omitempty" db:"rating"`
	Description string `json:"description,omitempty" db:"description"`
	Duration    int    `json:"duration,omitempty" db:"duration"`

	Genres    []Genre   `json:"genres"`
	Studios   []Studio  `json:"studios"`
	Actors    []Actor   `json:"actors"`
	Countries []Country `json:"countries"`
}

type MovieDB struct {
	Id          int64  `db:"id"`
	Name        string `db:"name"`
	Director    string `db:"director"`
	Operator    string `db:"operator"`
	Image       string `db:"image"`
	Premiere    string `db:"premiere"`
	Year        int    `db:"year"`
	Rating      string `db:"rating"`
	Description string `db:"description"`
	Duration    int    `db:"duration"`

	Genres    json.RawMessage `db:"genres"`
	Studios   json.RawMessage `db:"studios"`
	Actors    json.RawMessage `db:"actors"`
	Countries json.RawMessage `db:"countries"`
}

type Genre struct {
	Id   int64  `json:"genre_id" db:"id"`
	Name string `json:"genre_name" db:"name"`
}

type Studio struct {
	Id   int64  `json:"studio_id" db:"id"`
	Name string `json:"studio_name" db:"name"`
}

type Actor struct {
	Id       int64  `json:"actor_id" db:"id"`
	FullName string `json:"actor_name" db:"fullname"`
}

type Country struct {
	Id   int64  `json:"country_id" db:"id"`
	Name string `json:"country_name" db:"country"`
}

type Hall struct {
	Id       int64  `json:"hall_id" db:"id"`
	CinemaId int64  `json:"cinema_id" db:"cinema_id"`
	Seats    int    `json:"hall_seats" db:"seats"`
	Name     string `json:"hall_name" db:"hall_name"`

	HallCategoryId int64  `json:"hall_category_id" db:"hall_category_id"`
	Category       string `json:"hall_category_name" db:"hall_category_name"`
}

type HallCategory struct {
	Id       int64  `json:"hall_category_id" db:"id"`
	Category string `json:"hall_category" db:"hall_category"`
}

type Session struct {
	Id     int64 `json:"session_id" db:"id"`
	HallId int64 `json:"hall_id,omitempty" db:"hall_id"`

	HallName     string `json:"hall_name,omitempty" db:"hall_name"`
	HallSeats    int    `json:"hall_seats,omitempty" db:"seats"`
	HallCategory string `json:"hall_category_name,omitempty" db:"hall_category"`

	MovieId int64 `json:"movie_id,omitempty" db:"movie_id"`
	Movie   Movie `json:"movie,omitempty"`

	CinemaId int64 `json:"cinema_id,omitempty" db:"cinema_id"`

	Date        string `json:"session_date" db:"date"`
	Cost        int    `json:"cost" db:"cost"`
	BookedSeats int    `json:"booked_seats" db:"booked_seats"`
}
