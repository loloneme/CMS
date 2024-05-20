package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/loloneme/CMS/internal/entities"
	"net/http"
)

//var (
//	UserAlreadyExists = errors.New()
//	UserDoesNotExist  = errors.New("user does not exist")
//)

func (h *Handler) Register(c *gin.Context) {
	var user entities.User
	if err := c.BindJSON(&user); err != nil {
		ErrorResponse(c, http.StatusBadRequest, err.Error())
	}

	userID, err := h.services.Authorization.CreateUser(&user)
	if err != nil {
		ErrorResponse(c, http.StatusInternalServerError, "could not create user")
	}

	//token, err := h.services.TokenManager.GenerateJWTToken(service.Payload{
	//	UserId: userID,
	//	Role:   "",
	//})
	//if err != nil {
	//	ErrorResponse(c, http.StatusInternalServerError, "could not create jwt")
	//}

	c.JSON(http.StatusCreated, map[string]interface{}{
		"user_id": userID,
	})
}

func (h *Handler) Login(c *gin.Context) {
	var user entities.User
	if err := c.BindJSON(&user); err != nil {
		ErrorResponse(c, http.StatusUnauthorized, err.Error())
	}

	token, err := h.services.Authorization.Login(user)

	if err != nil {
		ErrorResponse(c, http.StatusNotFound, err.Error())
	}

	c.JSON(200, map[string]interface{}{
		"access_token": token,
	})
}
