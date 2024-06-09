package config

import (
	"fmt"
	"github.com/ilyakaznacheev/cleanenv"
	"github.com/joho/godotenv"
	"github.com/loloneme/CMS"
	"github.com/loloneme/CMS/internal/handler"
	"github.com/loloneme/CMS/internal/logger"
	"github.com/loloneme/CMS/internal/repository"
	"github.com/loloneme/CMS/internal/service"
	"log"
	"os"
)

type Config struct {
	Env        string `env-default:"local"`
	HTTPServer CMS.Config
	Storage    repository.Config
}

func MustLoad() {
	currDir, err := os.Getwd()
	if err != nil {
		log.Fatalf("Failed to find current dir")
	}

	err = godotenv.Load(fmt.Sprintf("%s/.env", currDir))
	var cfg Config
	if err := cleanenv.ReadEnv(&cfg); err != nil {
		log.Fatalf("Failed to read environment variables: %v\n", err)
	}

	logger.SetupLogger(cfg.Env)

	db, err := repository.ConnectToDB(cfg.Storage)

	repos := repository.NewRepository(db)
	services := service.NewService(repos)
	handlers := handler.NewHandler(services)

	srv := new(CMS.Server)
	if err := srv.Run(cfg.HTTPServer, handlers.InitRoutes()); err != nil {
		log.Fatalf("Failed to connect to server")
	}
}
