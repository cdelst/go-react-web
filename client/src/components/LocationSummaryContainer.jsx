import React, { useEffect, useState } from "react";
import "css/LocationSummary.css";
import LocationSummary from "./LocationSummary";
import { processLocationData } from "../utils/locationUtils";
import MyLoader from "./ContentLoader";

const TenMinutes = 600000; // in ms
const Geocodio = require("geocodio-library-node");
const geocoder = new Geocodio(process.env.REACT_APP_GEOCODIO_API_KEY);

const API = process.env.PORT === '3000' ?  'http://localhost:3000' : 'https://cdelst-website-2.herokuapp.com/';


const LocationSummaryContainer = () => {
  let locationFromStorage = JSON.parse(localStorage.getItem("location"));
  const [location, setLocation] = useState(locationFromStorage);

  async function getLocation() {
    let response = await fetch(API + "api/query");
    return await response.json();
  }

  useEffect(() => {
    const fetchAndStoreLocation = () => {
      getLocation().then((data) => {
        let tempLocation = data;

        let query =
          tempLocation["latitude"].toFixed(7) +
          "," +
          tempLocation["longitude"].toFixed(7);

        geocoder
          .reverse(query)
          .then((response) => {
            tempLocation["last_updated"] = Date.now();
            tempLocation["geocodio_results"] = response.results[0];
            setLocation(tempLocation);
            localStorage.setItem("location", JSON.stringify(tempLocation));
          })
          .catch((err) => {
            console.error(err);
          });
      });
    };

    if (process.env.REACT_APP_DEV_MODE) {
      console.log("Dev mode enabled, not fetching data.");
      return;
    }
    if (location != null) {
      let storedDate = parseInt(location["last_updated"]);
      let now = Date.now();

      if (now - storedDate > TenMinutes) {
        fetchAndStoreLocation();
        console.log("Longer than 10 minutes since last fetch");
      }
    }

    if (location == null) {
      fetchAndStoreLocation();
      console.log("localStorage empty, fetching");
    }
  }, [location]);

  let [
    motionVerb,
    address,
    speed,
    altitude,
    batteryPercent,
    batteryStatus,
    horizontalAccuracy,
    verticalAccuracy,
    pastTimeSentence,
  ] = processLocationData(location);

  return (
    <LocationSummary
      motionVerb={motionVerb}
      address={address}
      speed={speed}
      altitude={altitude}
      batteryPercent={batteryPercent}
      batteryStatus={batteryStatus}
      horizontalAccuracy={horizontalAccuracy}
      verticalAccuracy={verticalAccuracy}
      pastTimeSentence={pastTimeSentence}
    />
  );
};

export default LocationSummaryContainer;

// Fetch Format:
// altitude: 66
// battery_level: 0.6499999761581421
// device_id: "CD6s"
// horizontal_accuracy: 11
// latitude: -122.05449562737229
// longitude: 36.97199261359573
// motion: " "
// speed: -1
// timestamp: "2021-10-24T01:18:04Z"
// vertical_accuracy: 22
