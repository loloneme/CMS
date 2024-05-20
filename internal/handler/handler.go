package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/loloneme/CMS/internal/service"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()

	router.Use(gin.Logger())

	auth := router.Group("/auth")
	{
		auth.POST("/sign-up", h.Register)
		auth.POST("/sign-in", h.Login)
	}

	api := router.Group("/handler")
	{
		cinema := api.Group("/cinema")
		{
			cinema.GET("/all", h.GetAllCinemas)
			cinema.GET("/statuses", h.GetAllStatuses)
			cinema.GET("/categories", h.GetAllCategories)

			//cinema.GET("/:id", h.getCinema)
			//
			cinema.POST("", h.CreateCinema)
			//cinema.PUT("/:id", h.updateCinema)
			//cinema.DELETE("/:id", h.deleteCinema)
		}

	}

	return router

}
