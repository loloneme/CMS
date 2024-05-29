package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/loloneme/CMS/internal/entities"
)

type HallPostgres struct {
	db *sqlx.DB
}

func NewHallPostgres(db *sqlx.DB) *HallPostgres {
	return &HallPostgres{db: db}
}

func (r *HallPostgres) GetAllHallCategories() ([]entities.HallCategory, error) {
	var res []entities.HallCategory

	err := r.db.Select(&res, `SELECT * FROM hall_category`)
	return res, err
}
