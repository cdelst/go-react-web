package main

import (
	"net/http"

	"github.com/cdelst/go-react-web/server"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()
	err := server.InitInfluxClients()
	defer server.InfluxClient.Close()

	if err != nil {
		panic(err)
	}

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./client/build", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.POST("/location", func(c *gin.Context) {

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

		api.POST("/query", func(c *gin.Context) {

			server.GetLastPoint()
			c.JSON(http.StatusOK, gin.H{
				"result": "ok",
			})
		})
	}

	// Start and run the server
	router.Run(":5000")
}
