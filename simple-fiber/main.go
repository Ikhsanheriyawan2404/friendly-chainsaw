package main

import (
	"github.com/gofiber/fiber/v2"
)

func main() {
	// Buat instance dari Fiber
	app := fiber.New()

	// Definisikan endpoint /simple
	app.Get("/simple", func(c *fiber.Ctx) error {
		// Buat JSON response dengan pesan "Hello World"
		response := fiber.Map{
			"message": "Hello World",
		}

		// Kirim response sebagai JSON
		return c.Status(fiber.StatusOK).JSON(response)
	})

	// Jalankan server di port 3000
	app.Listen(":8080")
}
