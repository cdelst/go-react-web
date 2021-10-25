package server

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/influxdata/influxdb-client-go/v2/api"

	"github.com/pkg/errors"

	"github.com/influxdata/influxdb-client-go/v2"
)

var (
	InfluxClient influxdb2.Client
	InfluxWrite  api.WriteAPI
	InfluxQuery  api.QueryAPI
)

type LocationRecord struct {
	Timestamp          time.Time
	Latitude           float64
	Longitude          float64
	Altitude           int
	Speed              int
	HorizontalAccuracy int
	VerticalAccuracy   int
	Motion             string
	DeviceId           string
	BatteryState       bool
	BatteryLevel       float64
}

func WriteLocationEntry(entry LocationEntry) {
	if entry.Type != "Feature" {
		return
	}
	parsedTimestamp, err := time.Parse(time.RFC3339, entry.Properties.Timestamp)
	if err != nil {
		panic(err)
	}

	// create point using fluent style
	p := influxdb2.NewPointWithMeasurement("location").
		AddField("lat", entry.Geometry.Coordinates[Latitude]).
		AddField("long", entry.Geometry.Coordinates[Longitude]).
		AddField("alt", entry.Properties.Altitude).
		AddField("spd", entry.Properties.Speed).
		AddField("hacc", entry.Properties.HorizontalAccuracy).
		AddField("vacc", entry.Properties.VerticalAccuracy).
		AddField("motion", motionToString(entry.Properties.Motion)).
		AddField("id", entry.Properties.DeviceID).
		AddField("bat_state", entry.Properties.BatteryState == "charging").
		AddField("bat_level", entry.Properties.BatteryLevel).
		SetTime(parsedTimestamp)

	// write point asynchronously
	InfluxWrite.WritePoint(p)
	InfluxWrite.Flush()
}

func InitInfluxClients() error {
	apiToken := os.Getenv("INFLUX_API_TOKEN")
	if apiToken == "" {
		fmt.Printf("Influx Token Not Set.")
		return errors.New("$INFLUX_API_TOKEN not set.  Cannot init influx client")
	}

	InfluxClient = influxdb2.NewClient("https://us-west-2-1.aws.cloud2.influxdata.com", apiToken)
	InfluxWrite = InfluxClient.WriteAPI("casedelst@gmail.com", "location")
	InfluxQuery = InfluxClient.QueryAPI("casedelst@gmail.com")
	return nil
}

// Bool used to tell if there is a real struct
func GetLastPoint() (LocationRecord, bool) {
	query := `from(bucket:"location")|> range(start: -14d) |> last()`

	// get QueryTableResult
	result, err := InfluxQuery.Query(context.Background(), query)
	if err != nil {
		panic(err)
	}

	var record LocationRecord

	fmt.Printf("HEHEHEHE")

	// Iterate over query response, filling struct
	for result.Next() {
		switch result.Record().Field() {
		case "lat":
			record.Latitude = result.Record().Value().(float64)
			record.Timestamp = result.Record().Time()
		case "long":
			record.Longitude = result.Record().Value().(float64)
		case "alt":
			record.Altitude = int(result.Record().Value().(int64))
		case "spd":
			record.Speed = int(result.Record().Value().(int64))
		case "hacc":
			record.HorizontalAccuracy = int(result.Record().Value().(int64))
		case "vacc":
			record.VerticalAccuracy = int(result.Record().Value().(int64))
		case "motion":
			record.Motion = result.Record().Value().(string)
		case "id":
			record.DeviceId = result.Record().Value().(string)
		case "bat_state":
			record.BatteryState = result.Record().Value().(bool)
		case "bat_level":
			record.BatteryLevel = result.Record().Value().(float64)
		default:
			fmt.Printf("Entered default case, Field: %s", result.Record().Field())
		}
	}
	// check for an error
	if result.Err() != nil {
		panic(err)
	}

	fmt.Printf("Parsed struct: %+v\n", record)
	return record, true
}
