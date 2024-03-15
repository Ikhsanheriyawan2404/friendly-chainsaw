package app

import (
	"github.com/spf13/viper"
	"fmt"
)

func Config() *viper.Viper {
	config := viper.New()
	config.SetConfigFile("config.yaml")
	config.AddConfigPath(".")

	err := config.ReadInConfig()

	if err != nil {
		panic(fmt.Errorf("fatal error config file: %w", err))
	}

	return config
}
