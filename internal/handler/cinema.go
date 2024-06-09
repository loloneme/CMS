package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/loloneme/CMS/internal/entities"
	"net/http"
	"strconv"
)

func (h *Handler) GetAllCinemas(c *gin.Context) {
	res, err := h.services.Cinema.GetAllCinemas()
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	c.JSON(200, res)
}

func (h *Handler) GetCinema(c *gin.Context) {
	cinemaID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
	}

	res, err := h.services.GetCinemaById(int64(cinemaID))
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	c.JSON(200, res)
}

func (h *Handler) GetAllCategories(c *gin.Context) {
	res, err := h.services.Cinema.GetAllCategories()
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	c.JSON(200, res)
}

func (h *Handler) GetAllHallCategories(c *gin.Context) {
	res, err := h.services.Cinema.GetAllHallCategories()
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
		"message":   "Кинотеатра успешно создан!",
	})
}

func (h *Handler) UpdateCinema(c *gin.Context) {
	var cinema entities.Cinema
	cinemaID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
	}

	if err = c.BindJSON(&cinema); err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
	}

	cinema.Id = int64(cinemaID)

	err = h.services.UpdateCinema(&cinema)
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	c.JSON(http.StatusCreated, map[string]interface{}{
		"message": "Успешно обновлено!",
	})
}

func (h *Handler) DeleteCinema(c *gin.Context) {
	cinemaID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
	}

	err = h.services.DeleteCinema(int64(cinemaID))
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	c.JSON(http.StatusCreated, map[string]interface{}{
		"message": "Успешно удалено!",
	})
}