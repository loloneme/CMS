package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/loloneme/CMS/internal/entities"
	"net/http"
	"strconv"
)

func (h *Handler) GetAllMovies(c *gin.Context) {
	res, err := h.services.Movie.GetAllMovies()
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}

	c.JSON(200, res)
}

func (h *Handler) GetAllGenres(c *gin.Context) {
	res, err := h.services.GetAllGenres()
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}

	c.JSON(200, res)
}

func (h *Handler) GetAllStudios(c *gin.Context) {
	res, err := h.services.GetAllStudios()
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}

	c.JSON(200, res)
}

func (h *Handler) GetAllCountries(c *gin.Context) {
	res, err := h.services.GetAllCountries()
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}

	c.JSON(200, res)
}

func (h *Handler) GetAllActors(c *gin.Context) {
	res, err := h.services.GetAllActors()
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}

	c.JSON(200, res)
}

func (h *Handler) CreateMovie(c *gin.Context) {
	var movie entities.Movie
	if err := c.BindJSON(&movie); err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
	}

	movieID, err := h.services.CreateMovie(&movie)
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}

	c.JSON(http.StatusCreated, map[string]interface{}{
		"movie_id": movieID,
	})
}

func (h *Handler) UpdateMovie(c *gin.Context) {
	var movie entities.Movie
	movieID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
	}

	if err = c.BindJSON(&movie); err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
	}

	movie.Id = int64(movieID)

	err = h.services.Movie.UpdateMovie(&movie)
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	c.JSON(http.StatusCreated, map[string]interface{}{
		"message": "Успешно обновлено!",
	})
}

func (h *Handler) DeleteMovie(c *gin.Context) {
	movieID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
	}

	err = h.services.Movie.DeleteMovie(int64(movieID))
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
	}
	c.JSON(http.StatusCreated, map[string]interface{}{
		"message": "Успешно удалено!",
	})
}
