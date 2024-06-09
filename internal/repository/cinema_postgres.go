package repository

import (
	"database/sql"
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

	query := `
        SELECT c.id, c.name, c.address, c.category_id, cg.name AS category_name,
               c.phone, c.image AS image
        FROM cinema c
        JOIN category cg ON c.category_id = cg.id
    `

	err := r.db.Select(&res, query)
	if err != nil {
		return nil, err
	}

	return res, nil
}

func (r *CinemaPostgres) GetCinemaById(cinemaID int64) (entities.Cinema, error) {
	var res entities.Cinema

	query := `
        SELECT c.id, c.name, c.address, c.category_id, cg.name AS category_name,
               c.phone, c.image AS image
        FROM cinema c
        JOIN category cg ON c.category_id = cg.id
        WHERE c.id = $1
    `

	err := r.db.Get(&res, query, cinemaID)
	if err != nil {
		return res, err
	}

	halls, err := r.GetHallsByCinemaId(cinemaID)
	res.Halls = halls

	return res, err
}

func (r *CinemaPostgres) GetHallsByCinemaId(cinemaID int64) ([]entities.Hall, error) {
	var res []entities.Hall

	query := `SELECT h.id, h.cinema_id, h.seats,
       		h.name as hall_name, h.hall_category_id, 
       		hc.hall_category AS hall_category_name       		
			FROM hall h
			JOIN hall_category hc on h.hall_category_id = hc.id
			WHERE h.cinema_id = $1`

	err := r.db.Select(&res, query, cinemaID)
	return res, err
}

func (r *CinemaPostgres) GetAllCategories() ([]entities.Category, error) {
	var res []entities.Category
	err := r.db.Select(&res, `SELECT * FROM "category"`)
	return res, err
}

func (r *CinemaPostgres) CreateCinema(cinema *entities.Cinema) (int64, error) {
	var cinemaID int64
	catId, err := r.GetCategoryId(cinema.Category)
	if err != nil {
		return 0, err
	}
	query := `INSERT INTO "cinema" (name, address, category_id, phone, image) VALUES 
                                ($1, $2, $3, $4, $5) RETURNING id`
	err = r.db.QueryRowx(query, cinema.Name, cinema.Address, catId, cinema.Phone, cinema.Image).Scan(&cinemaID)
	if err != nil {
		return 0, err
	}
	return cinemaID, nil
}

func (r *CinemaPostgres) GetCategoryId(category string) (int64, error) {
	var id int64
	err := r.db.Get(&id, `SELECT id FROM category WHERE name=$1`, category)
	if err == sql.ErrNoRows {
		err := r.db.QueryRowx("INSERT INTO category (name) VALUES ($1) RETURNING id", category).Scan(&id)
		if err != nil {
			return 0, err
		}
	} else if err != nil {
		return 0, err
	}

	return id, nil
}

func (r *CinemaPostgres) GetHallCategoryId(category string) (int64, error) {
	var id int64
	err := r.db.Get(&id, `SELECT id FROM hall_category WHERE hall_category=$1`, category)
	if err == sql.ErrNoRows {
		err := r.db.QueryRowx("INSERT INTO hall_category (hall_category) VALUES ($1) RETURNING id", category).Scan(&id)
		if err != nil {
			return 0, err
		}
	} else if err != nil {
		return 0, err
	}
	return id, nil
}

func (r *CinemaPostgres) CreateHalls(cinemaID int64, halls []entities.Hall) error {
	for _, h := range halls {
		hallID, err := r.GetHallCategoryId(h.Category)
		if err != nil {
			return err
		}

		_, err = r.db.Exec(`INSERT INTO hall (cinema_id, seats, name, hall_category_id) VALUES ($1, $2, $3, $4)`,
			cinemaID, h.Seats, h.Name, hallID)

		if err != nil {
			return err
		}
	}
	return nil
}

func (r *CinemaPostgres) UpdateHalls(cinemaID int64, halls []entities.Hall) error {
	var existingHalls []int64

	err := r.db.Select(&existingHalls, `SELECT id FROM hall WHERE cinema_id=$1`, cinemaID)
	if err != nil {
		return err
	}

	hallsToKeep := make(map[int64]struct{})
	for _, hall := range halls {
		hallsToKeep[hall.Id] = struct{}{}
	}

	for _, id := range existingHalls {
		if _, ok := hallsToKeep[id]; !ok {
			_, err := r.db.Exec(`DELETE FROM hall WHERE id=$1`, id)
			if err != nil {
				return err
			}
		}
	}

	for _, h := range halls {
		categoryID, err := r.GetHallCategoryId(h.Category)
		if err != nil {
			return err
		}

		if h.Id == 0 {
			_, err = r.db.Exec(`INSERT INTO hall (cinema_id, seats, name, hall_category_id) VALUES ($1, $2, $3, $4)`,
				cinemaID, h.Seats, h.Name, categoryID)
			if err != nil {
				return err
			}
		} else {
			_, err = r.db.Exec(`UPDATE hall SET seats=$1, name=$2, hall_category_id=$3 WHERE id=$4 `,
				h.Seats, h.Name, categoryID, h.Id)

			if err != nil {
				return err
			}
		}
	}
	return nil
}

func (r *CinemaPostgres) GetAllHallCategories() ([]entities.HallCategory, error) {
	var res []entities.HallCategory

	err := r.db.Select(&res, `SELECT * FROM hall_category`)
	return res, err
}

func (r *CinemaPostgres) UpdateCinema(cinema *entities.Cinema) error {
	categoryId, err := r.GetCategoryId(cinema.Category)
	if err != nil {
		return err
	}

	cinema.CategoryId = categoryId

	_, err = r.db.Exec(`UPDATE "cinema" SET name=$1, address=$2, image=$3,
                    category_id=$4, phone=$5 WHERE id=$6`, cinema.Name, cinema.Address, cinema.Image,
		cinema.CategoryId, cinema.Phone, cinema.Id)

	return r.UpdateHalls(cinema.Id, cinema.Halls)
}

func (r *CinemaPostgres) DeleteCinema(cinemaID int64) error {
	_, err := r.db.Exec(`DELETE FROM "cinema"  WHERE id=$1`, cinemaID)
	return err
}
