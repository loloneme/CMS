package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

func (h *Handler) Authentication() gin.HandlerFunc {
	return func(c *gin.Context) {
		parts := c.Request.Header["Authorization"]
		if len(parts) == 0 {
			ErrorResponse(c, http.StatusUnauthorized, "Authorization header is missing")
			return
		}
		headerParts := strings.Split(parts[0], " ")
		if len(headerParts) != 2 || headerParts[0] != "Bearer" {
			ErrorResponse(c, http.StatusUnauthorized, "Invalid token")
			return
		}

		if len(headerParts[1]) == 0 {
			ErrorResponse(c, http.StatusUnauthorized, "Invalid token")
			return
		}

		payload, err := h.services.TokenManager.ParseJWTToken(headerParts[1])
		if err != nil {
			ErrorResponse(c, http.StatusUnauthorized, "Invalid token")
			return
		}
		c.Set("userId", payload.UserId)
		c.Set("userRole", payload.Role)

		c.Next()
	}
}

func (h *Handler) Authorization(roles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		role, exist := c.Get("userRole")
		if !exist {
			ErrorResponse(c, http.StatusForbidden, "No claims found")
			return
		}

		for _, r := range roles {
			if r == role {
				c.Next()
				return
			}
		}
		ErrorResponse(c, http.StatusForbidden, "Forbidden")
		return
	}
}
