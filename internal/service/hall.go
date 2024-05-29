package service

import (
	"github.com/loloneme/CMS/internal/entities"
	"github.com/loloneme/CMS/internal/repository"
)

type HallService struct {
	repo repository.Hall
}

func NewHallService(repo repository.Hall) *HallService {
	return &HallService{repo: repo}
}

func (r *HallService) GetAllHallCategories() ([]entities.HallCategory, error) {
	return r.repo.GetAllHallCategories()
}
