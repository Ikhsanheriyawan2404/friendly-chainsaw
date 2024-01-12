package main

import (
	"encoding/json"
	"fmt"
	"sync"
	"net/http"
	"gorm.io/gorm"
	"gorm.io/driver/postgres"
)

type Village struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
	Meta string `json:"meta"`
}

type Province struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
	Meta string `json:"meta"`
}

type District struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
	Meta string `json:"meta"`
}

type City struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
	Meta string `json:"meta"`
}

type Response struct {
	Message string `json:"message"`
}

var db *gorm.DB

func main() {
	dsn := "user=postgres password=admin dbname=inv sslmode=disable"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}
	db = database

	http.HandleFunc("/simple", func(w http.ResponseWriter, r *http.Request) {
		response := Response{
			Message: "Hello world!",
		}

		jsonData, err := json.Marshal(response)
		if err != nil {
			http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")

		w.Write(jsonData)
	})

	http.HandleFunc("/getTestData", getTestData)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Error:", err)
	}
}

func getTestData(w http.ResponseWriter, r *http.Request) {
	var (
		villages   []Village
		provinces  []Province
		districts  []District
		cities     []City
		wg         sync.WaitGroup
		resultData = make(map[string]interface{})
	)

	wg.Add(4)
	go func() {
		defer wg.Done()
		db.Table("indonesia_villages").Select("id, name, meta").Find(&villages)
		resultData["villages"] = villages
	}()

	go func() {
		defer wg.Done()
		db.Table("indonesia_provinces").Select("id, name, meta").Find(&provinces)
		resultData["provinces"] = provinces
	}()

	go func() {
		defer wg.Done()
		db.Table("indonesia_districts").Select("id, name, meta").Find(&districts)
		resultData["districts"] = districts
	}()

	go func() {
		defer wg.Done()
		db.Table("indonesia_cities").Select("id, name, meta").Find(&cities)
		resultData["cities"] = cities
	}()

	wg.Wait()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resultData)
}
