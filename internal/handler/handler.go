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
			cinema.GET("/categories", h.GetAllCategories)
			cinema.GET("/:id", h.GetCinema)

			//cinema.GET("/:id", h.getCinema)
			//
			cinema.POST("", h.CreateCinema)
			cinema.PUT("/:id", h.UpdateCinema)
			cinema.DELETE("/:id", h.DeleteCinema)
		}

		movie := api.Group("/movie")
		{
			movie.GET("/all", h.GetAllMovies)
			movie.GET("/genres", h.GetAllGenres)
			movie.GET("/actors", h.GetAllActors)
			movie.GET("/studios", h.GetAllStudios)
			movie.GET("/countries", h.GetAllCountries)

			movie.POST("", h.CreateMovie)
			movie.PUT("/:id", h.UpdateMovie)
			movie.DELETE("/:id", h.DeleteMovie)
		}

		hall := api.Group("/hall")
		{
			//movie.GET("/all", h.GetAllMovies)
			hall.GET("/categories", h.GetAllHallCategories)
			//movie.GET("/actors", h.GetAllActors)
			//movie.GET("/studios", h.GetAllStudios)

			//movie.GET("/:id", h.getCinema)
			//
			//movie.POST("", h.CreateMovie)
			//movie.PUT("/:id", h.UpdateCinema)
			//movie.DELETE("/:id", h.DeleteCinema)
		}
		repertoire := api.Group("/repertoire")
		{
			//repertoire.GET("/all", h.GetAllSessions)
			repertoire.GET("/sessions/:id", h.GetSession)
			repertoire.GET("/sessions", h.GetSessionsByCinemaAndMovie)
			repertoire.GET("/cinemas/all", h.GetAllCinemasBriefInfo)
			repertoire.GET("/movies/all", h.GetAllMoviesBriefInfo)

			repertoire.POST("", h.CreateSession)
			//repertoire.PUT("/:id", h.UpdateCinema)
			//repertoire.DELETE("/:id", h.DeleteCinema)
		}

	}

	return router

}
