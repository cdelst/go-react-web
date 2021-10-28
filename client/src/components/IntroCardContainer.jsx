import React, { useEffect, useState } from "react";
import "css/IntroCardContainer.css";
import IntroCard from "./IntroCard";

const TenMinutes = 600000; // in ms

const Geocodio = require("geocodio-library-node");
const geocoder = new Geocodio(process.env.REACT_APP_GEOCODIO_API_KEY);

const IntroCardContainer = () => {
  let locationFromStorage = JSON.parse(localStorage.getItem("location"));
  const [location, setLocation] = useState(locationFromStorage);

  useEffect(() => {
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
  }, []);

  async function getLocation() {
    let response = await fetch("api/query");
    let data = await response.json();
    return data;
  }

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

  return <IntroCard />;
};

export default IntroCardContainer;
