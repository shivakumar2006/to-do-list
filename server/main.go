package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/shivakumar2006/to-do-list/router"
)

func main() {
	r := router.Router()
	fmt.Println("starting the server on port 9000...")

	// Enable CORS for all routes
	log.Fatal(http.ListenAndServe("0.0.0.0:9000", handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}), // You can limit the origin to your frontend's URL instead of "*" if needed.
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization", "X-Requested-With"}),
	)(r)))
}
