import React, { useEffect, useState } from "react";
import "css/IntroCardContainer.css";
import axios from "axios";

const TenMinutes = 600000; // in ms

const IntroCardContainer = () => {
  let locationFromStorage = localStorage.getItem("location");
  const [location, setLocation] = React.useState(locationFromStorage);

  console.log("location from localStorage: " + location);

  React.useEffect(() => {
    if (location != null) {
      let storedDate = Date.parse(location["timestamp"]);
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
    fetch("api/query")
      .then((res) => res.json())
      .then((location) => {
        setLocation(location);
        localStorage.setItem("location", JSON.stringify(location));
      });
  };

  console.log(location);

  return (
    <div className="IntroContainer">
      <div className="IntroContainer-content">
        <div className="IntroContainer-content--intro">
          hi there! my name is
        </div>
        <div className="IntroContainer-content--name">case.</div>
        <div className="IntroContainer-content--occupation">
          <div>developer + student</div>
        </div>
      </div>
    </div>
  );
};

export default IntroCardContainer;
