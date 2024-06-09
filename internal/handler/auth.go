package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/loloneme/CMS/internal/entities"
	"net/http"
	"strconv"
)

func (h *Handler) Register(c *gin.Context) {
	var user entities.User
	if err := c.BindJSON(&user); err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	userID, err := h.services.Authorization.CreateUser(&user)
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, "could not create user")
		return
	}

	c.JSON(http.StatusCreated, map[string]interface{}{
		"user_id": userID,
		"message": "Пользователь успешно создан",
	})
}

func (h *Handler) Login(c *gin.Context) {
	var user entities.User
	if err := c.BindJSON(&user); err != nil {
		ErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	token, err := h.services.Authorization.Login(user)

	if err != nil {
		ErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	c.JSON(200, map[string]interface{}{
		"access_token": token,
	})
}

func (h *Handler) GetAllUsers(c *gin.Context) {
	res, err := h.services.Authorization.GetUsers()

	if err != nil {
		ErrorResponse(c, http.StatusNotFound, err.Error())
		return
	}

	c.JSON(200, res)
}

func (h *Handler) GetRoles(c *gin.Context) {
	res, err := h.services.Authorization.GetRoles()

	if err != nil {
		ErrorResponse(c, http.StatusNotFound, err.Error())
		return
	}

	c.JSON(200, res)
}

func (h *Handler) UpdateUser(c *gin.Context) {
	var user entities.User
	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	if err = c.BindJSON(&user); err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	user.Id = int64(userID)

	err = h.services.Authorization.UpdateUser(&user)
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusCreated, map[string]interface{}{
		"message": "Успешно обновлено!",
	})
}

func (h *Handler) DeleteUser(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	err = h.services.Authorization.DeleteUser(int64(userID))
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, map[string]interface{}{
		"message": "Успешно удалено!",
	})
}
