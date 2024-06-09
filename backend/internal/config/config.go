package config

import (
	"github.com/ilyakaznacheev/cleanenv"
	"github.com/joho/godotenv"
	"github.com/loloneme/CMS/backend/internal/handler"
	"github.com/loloneme/CMS/backend/internal/logger"
	repository2 "github.com/loloneme/CMS/backend/internal/repository"
	"github.com/loloneme/CMS/backend/internal/service"
	"log"
)

type Config struct {
	Env        string `env-default:"local"`
	HTTPServer CMS.Config
	Storage    repository2.Config
}

func MustLoad() {
	//currDir, err := os.Getwd()
	//if err != nil {
	//	log.Fatalf("Failed to find current dir")
	//}

	err = godotenv.Load("../.env")
	var cfg Config
	if err := cleanenv.ReadEnv(&cfg); err != nil {
		log.Fatalf("Failed to read environment variables: %v\n", err)
	}

	logger.SetupLogger(cfg.Env)

	db, err := repository2.ConnectToDB(cfg.Storage)

	repos := repository2.NewRepository(db)
	services := service.NewService(repos)
	handlers := handler.NewHandler(services)

	srv := new(CMS.Server)
	if err := srv.Run(cfg.HTTPServer, handlers.InitRoutes()); err != nil {
		log.Fatalf("Failed to connect to server")
	}
}
