package config

import (
	"fmt"
	"github.com/ilyakaznacheev/cleanenv"
	"github.com/joho/godotenv"
	"github.com/loloneme/CMS/backend"
	"github.com/loloneme/CMS/backend/internal/handler"
	"github.com/loloneme/CMS/backend/internal/logger"
	repository2 "github.com/loloneme/CMS/backend/internal/repository"
	"github.com/loloneme/CMS/backend/internal/service"
	"log"
	"os"
)

type Config struct {
	Env        string `env-default:"local"`
	HTTPServer backend.Config
	Storage    repository2.Config
}

func MustLoad() {
	currDir, err := os.Getwd()
	if err != nil {
		log.Fatalf("Failed to find current dir")
	}

	err = godotenv.Load(fmt.Sprintf("%s/.env", currDir))
	if err != nil {
		log.Fatalf("Failed to read environment variables: %v\n", err)
	}

	var cfg Config
	if err := cleanenv.ReadEnv(&cfg); err != nil {
		log.Fatalf("Failed to read environment variables: %v\n", err)
	}

	logger.SetupLogger(cfg.Env)

	db, err := repository2.ConnectToDB(cfg.Storage)

	repos := repository2.NewRepository(db)
	services := service.NewService(repos)
	handlers := handler.NewHandler(services)

	srv := new(backend.Server)
	if err := srv.Run(cfg.HTTPServer, handlers.InitRoutes()); err != nil {
		log.Fatalf("Failed to connect to server")
	}
}
