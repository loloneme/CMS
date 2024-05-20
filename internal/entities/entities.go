package entities

type User struct {
	Id       int64  `json:"user_id" db:"id"`
	FullName string `json:"full_name" db:"fullname"`
	Phone    string `json:"phone" db:"phone"`
	RoleId   int64  `json:"role_id" db:"role"`
	Email    string `json:"email" db:"email"`
	Password string `json:"password" db:"password"`
}

type Cinema struct {
	Id      int64  `json:"cinema_id" db:"id"`
	Name    string `json:"cinema_name" db:"name"`
	Address string `json:"address" db:"address"`

	Image string `json:"cinema_image" db:"image"`

	Category   string `json:"category" db:"category_name"`
	CategoryId int64  `json:"category_id" db:"category_id"`

	Status   string `json:"status" db:"status_name"`
	StatusId int64  `json:"status_id" db:"status_id"`
	Phone    string `json:"cinema_phone" db:"phone"`
	City     string `json:"city" db:"city"`
}

type Status struct {
	Id   int64  `json:"status_id" db:"id"`
	Name string `json:"status_name" db:"name"`
}

type Category struct {
	Id   int64  `json:"category_id" db:"id"`
	Name string `json:"category_name" db:"name"`
}
