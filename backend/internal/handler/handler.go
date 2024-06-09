package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/loloneme/CMS/backend/internal/service"
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
		auth.POST("/sign-up", h.Authentication(), h.Authorization("ADMIN"), h.Register)
		auth.POST("/sign-in", h.Login)
	}

	api := router.Group("/handler")
	{
		user := api.Group("/user")
		{
			user.GET("/all", h.Authentication(), h.Authorization("ADMIN"), h.GetAllUsers)
			user.GET("/roles", h.Authentication(), h.Authorization("ADMIN"), h.GetRoles)

			user.PUT("/:id", h.Authentication(), h.Authorization("ADMIN"), h.UpdateUser)
			user.DELETE("/:id", h.Authentication(), h.Authorization("ADMIN"), h.DeleteUser)

		}

		cinema := api.Group("/cinema")
		{
			cinema.GET("/all", h.Authentication(), h.Authorization("INFO_SERVICE", "CINEMA_WORKER"), h.GetAllCinemas)
			cinema.GET("/categories", h.Authentication(), h.Authorization("INFO_SERVICE", "CINEMA_WORKER"), h.GetAllCategories)
			cinema.GET("/:id", h.Authentication(), h.Authorization("INFO_SERVICE", "CINEMA_WORKER"), h.GetCinema)
			cinema.GET("/halls/categories", h.Authentication(), h.Authorization("INFO_SERVICE", "CINEMA_WORKER"), h.GetAllHallCategories)

			cinema.POST("", h.Authentication(), h.Authorization("INFO_SERVICE"), h.CreateCinema)
			cinema.PUT("/:id", h.Authentication(), h.Authorization("CINEMA_WORKER"), h.UpdateCinema)
			cinema.DELETE("/:id", h.Authentication(), h.Authorization("INFO_SERVICE"), h.DeleteCinema)
		}

		movie := api.Group("/movie")
		{
			movie.GET("/all", h.Authentication(), h.Authorization("INFO_SERVICE", "CINEMA_WORKER"), h.GetAllMovies)
			movie.GET("/all/name", h.Authentication(), h.Authorization("INFO_SERVICE", "CINEMA_WORKER"), h.GetAllMovieNames)
			movie.GET("/genres", h.Authentication(), h.Authorization("INFO_SERVICE", "CINEMA_WORKER"), h.GetAllGenres)
			movie.GET("/actors", h.Authentication(), h.Authorization("INFO_SERVICE", "CINEMA_WORKER"), h.GetAllActors)
			movie.GET("/studios", h.Authentication(), h.Authorization("INFO_SERVICE", "CINEMA_WORKER"), h.GetAllStudios)
			movie.GET("/countries", h.Authentication(), h.Authorization("INFO_SERVICE", "CINEMA_WORKER"), h.GetAllCountries)

			movie.POST("", h.Authentication(), h.Authorization("INFO_SERVICE"), h.CreateMovie)
			movie.PUT("/:id", h.Authentication(), h.Authorization("INFO_SERVICE"), h.UpdateMovie)
			movie.DELETE("/:id", h.Authentication(), h.Authorization("INFO_SERVICE"), h.DeleteMovie)
		}

		repertoire := api.Group("/repertoire")
		{
			repertoire.GET("/sessions", h.Authentication(), h.Authorization("INFO_SERVICE", "CINEMA_WORKER"), h.GetSessionsByCinemaAndMovie)
			repertoire.GET("/cinemas/all", h.Authentication(), h.Authorization("INFO_SERVICE", "CINEMA_WORKER", "ADMIN"), h.GetAllCinemasBriefInfo)
			repertoire.GET("/movies/all", h.Authentication(), h.Authorization("INFO_SERVICE", "CINEMA_WORKER"), h.GetAllMoviesBriefInfo)

			repertoire.POST("", h.Authentication(), h.Authorization("CINEMA_WORKER"), h.CreateSession)
			repertoire.PUT("/:id", h.Authentication(), h.Authorization("CINEMA_WORKER"), h.UpdateSession)
			repertoire.DELETE("/:id", h.Authentication(), h.Authorization("CINEMA_WORKER"), h.DeleteSession)
		}
	}

	return router

}
