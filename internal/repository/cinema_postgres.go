package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/loloneme/CMS/internal/entities"
)

type CinemaPostgres struct {
	db *sqlx.DB
}

func NewCinemaPostgres(db *sqlx.DB) *CinemaPostgres {
	return &CinemaPostgres{db: db}
}

func (r *CinemaPostgres) GetAllCinemas() ([]entities.Cinema, error) {
	var res []entities.Cinema
	//var statuses map[int64]interface{}
	//var categories map[int64]interface{}

	query := `
        SELECT c.id, c.name, c.address, c.category_id, cg.name AS category_name, c.status_id, 
               s.name AS status_name, c.phone, c.city, COALESCE(c.image, '') AS image
        FROM cinema c
        JOIN category cg ON c.category_id = cg.id
        JOIN status s ON c.status_id = s.id
    `

	err := r.db.Select(&res, query)
	if err != nil {
		return nil, err
	}

	//
	//err = r.db.Select(&statuses, `SELECT * FROM "status"`)
	//if err != nil{
	//	return nil, err
	//}
	//
	//err = r.db.Select(&categories, `SELECT * FROM "category"`)
	//if err != nil{
	//	return nil, err
	//}
	//
	//for i, cinema := range res{
	//	status, ok := statuses[]
	//}
	return res, nil
}

func (r *CinemaPostgres) GetAllCategories() ([]entities.Category, error) {
	var res []entities.Category
	err := r.db.Select(&res, `SELECT * FROM "category"`)
	return res, err
}

func (r *CinemaPostgres) GetAllStatuses() ([]entities.Status, error) {
	var res []entities.Status
	err := r.db.Select(&res, `SELECT * FROM "status"`)
	return res, err
}

func (r *CinemaPostgres) CreateCinema(cinema *entities.Cinema) (int64, error) {
	var cinemaID int64
	query := `INSERT INTO "cinema" (name, address, category_id, status_id, phone, city, image) VALUES 
                                ($1, $2, $3, $4, $5, $6, $7) RETURNING id`
	err := r.db.QueryRowx(query, cinema.Name, cinema.Address, cinema.CategoryId,
		cinema.StatusId, cinema.Phone, cinema.City, cinema.Image).Scan(&cinemaID)
	if err != nil {
		return 0, err
	}
	return cinemaID, nil
}
