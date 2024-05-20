package CMS

import (
	"context"
	"github.com/rs/cors"
	"net/http"
	"time"
)

type Config struct {
	Port        string        `env:"HTTP_SERVER_PORT"`
	Timeout     time.Duration `env:"HTTP_SERVER_TIMEOUT"`
	IdleTimeout time.Duration `env:"HTTP_SERVER_IDLE_TIMEOUT"`
}

type Server struct {
	httpServer *http.Server
}

func (s *Server) Run(cfg Config, handler http.Handler) error {
	s.httpServer = &http.Server{
		Addr:           ":" + cfg.Port,
		Handler:        cors.Default().Handler(handler),
		MaxHeaderBytes: 1 << 20,
		ReadTimeout:    cfg.Timeout,
		WriteTimeout:   cfg.Timeout,
		IdleTimeout:    cfg.IdleTimeout,
	}

	return s.httpServer.ListenAndServe()
}

func (s *Server) ShutDown(ctx context.Context) error {
	return s.httpServer.Shutdown(ctx)
}
