package main

import (
	"fiber/app"
	"fiber/helper"
	"fiber/model"
	"github.com/gofiber/fiber/v2"
	"time"
)

func main() {
	server := fiber.New(fiber.Config{
		IdleTimeout:  time.Second * 5,
		WriteTimeout: time.Second * 5,
		ReadTimeout:  time.Second * 5,
		Prefork:      true,
	})

	config := app.Config()
	var db = app.DatabaseInit(config)

	server.Get("/api/hello", func(ctx *fiber.Ctx) error {
		return ctx.SendString("Hello World")
	})

	server.Get("/api/gorm", func(ctx *fiber.Ctx) error {
		var todos []model.Todo
		err := db.Find(&todos).Error

		if err != nil {
			return ctx.Status(500).SendString(err.Error())
		}

		return ctx.JSON(todos)
	})

	err := server.Listen("localhost:4001")
	helper.PanicIfError(err)
}
