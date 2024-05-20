package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/loloneme/CMS/internal/entities"
	"net/http"
)

func (h *Handler) GetAllCinemas(c *gin.Context) {
	res, err := h.services.GetAllCinemas()
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	c.JSON(200, res)
}

func (h *Handler) GetAllStatuses(c *gin.Context) {
	res, err := h.services.GetAllStatuses()
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	c.JSON(200, res)
}

func (h *Handler) GetAllCategories(c *gin.Context) {
	res, err := h.services.GetAllCategories()
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	c.JSON(200, res)
}

func (h *Handler) CreateCinema(c *gin.Context) {
	var cinema entities.Cinema
	if err := c.BindJSON(&cinema); err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
	}

	cinemaID, err := h.services.CreateCinema(&cinema)
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	c.JSON(http.StatusCreated, map[string]interface{}{
		"cinema_id": cinemaID,
	})

}
