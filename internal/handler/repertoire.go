package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/loloneme/CMS/internal/entities"
	"net/http"
	"strconv"
)

func (h *Handler) GetSession(c *gin.Context) {
	sessionID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	res, err := h.services.Repertoire.GetSession(int64(sessionID))
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return

	}
	c.JSON(200, res)
}

func (h *Handler) CreateSession(c *gin.Context) {
	var session entities.Session
	if err := c.BindJSON(&session); err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
		return

	}

	sessionID, err := h.services.Repertoire.CreateSession(&session)
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(200, map[string]interface{}{
		"session_id": sessionID,
		"message":    "Сеанс успешно создан!",
	})
}

//func (h *Handler) GetAllSessionsByCinema(c *gin.Context) {
//	res, err := h.services.GetAllSessionsByCinemas()
//	if err != nil {
//		ErrorResponse(c, http.StatusInternalServerError, err.Error())
//		return
//
//	}
//	c.JSON(200, res)
//}

func (h *Handler) GetAllMoviesBriefInfo(c *gin.Context) {
	res, err := h.services.Repertoire.GetAllMovies()
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return

	}
	c.JSON(200, res)
}

func (h *Handler) GetAllCinemasBriefInfo(c *gin.Context) {
	res, err := h.services.Repertoire.GetAllCinemas()
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return

	}
	c.JSON(200, res)
}

func (h *Handler) GetSessionsByCinemaAndMovie(c *gin.Context) {
	cinemaID, err := strconv.Atoi(c.Query("cinema_id"))
	if err != nil {
		ErrorResponse(c, http.StatusBadRequest, "Missing cinema_id parameter")
		return
	}

	movieID, err := strconv.Atoi(c.Query("movie_id"))
	if err != nil {
		ErrorResponse(c, http.StatusBadRequest, "Missing movie_id parameter")
		return
	}

	res, err := h.services.Repertoire.GetSessionsByCinemaAndMovie(int64(cinemaID), int64(movieID))
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return

	}
	c.JSON(200, res)
}

func (h *Handler) UpdateSession(c *gin.Context) {
	var session entities.Session
	sessionID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	if err = c.BindJSON(&session); err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	session.Id = int64(sessionID)

	err = h.services.Repertoire.UpdateSession(&session)
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusCreated, map[string]interface{}{
		"message": "Успешно обновлено!",
	})
}

func (h *Handler) DeleteSession(c *gin.Context) {
	sessionID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	err = h.services.Repertoire.DeleteSession(int64(sessionID))
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return

	}
	c.JSON(200, map[string]interface{}{
		"message": "Успешно удалено!",
	})
}
