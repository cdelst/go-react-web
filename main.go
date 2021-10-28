package main

import (
	"encoding/json"
	"net/http"

	"github.com/cdelst/go-react-web/server"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load("client/.env")
	if err != nil {
		panic(err)
	}

	// Set the router as the default one shipped with Gin
	router := gin.Default()
	err = server.InitInfluxClients()
	defer server.InfluxClient.Close()

	if err != nil {
		panic(err)
	}

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./client/build", true)))

	router.POST("/location", func(c *gin.Context) {

		locationPayload, err := server.ParseLocationPayload(c.Request.Body)
		if err != nil {
			panic(err)
			return
		}

		server.FilterAndWriteLocationData(locationPayload)

		c.JSON(http.StatusOK, gin.H{
			"result": "ok",
		})
	})

	router.GET("/api/query", func(c *gin.Context) {

		val, _ := server.GetLastPoint()
		valBytes, err := json.Marshal(val)
		if err != nil {
			panic(err)
		}
		c.Data(http.StatusOK, "application/json", valBytes)
	})

	router.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"http://localhost:3000"},
		AllowMethods:  []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"},
		AllowHeaders:  []string{"Origin", "Content-Length", "Content-Type"},
		ExposeHeaders: []string{"X-Total-Count"},
	}))

	// Start and run the server
	router.Run(":3001")
}
