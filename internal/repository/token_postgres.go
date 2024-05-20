package repository

import "github.com/jmoiron/sqlx"

type TokenManagerPostgres struct {
	db *sqlx.DB
}

func NewTokenManagerPostgres(db *sqlx.DB) *AuthPostgres {
	return &AuthPostgres{db: db}
}
