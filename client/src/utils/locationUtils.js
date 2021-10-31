const OneSecond = 1000;
const OneMinute = 60000;
const OneHour = 3600000;
const OneDay = 86400000;

export const processLocationData = (location) => {
  let motionVerb,
    address,
    speed,
    altitude,
    batteryPercent,
    batteryStatus,
    horizontalAccuracy,
    verticalAccuracy,
    pastTimeSentence;

  if (!location) {
    return [
      motionVerb,
      address,
      speed,
      altitude,
      batteryPercent,
      batteryStatus,
      horizontalAccuracy,
      verticalAccuracy,
      pastTimeSentence,
    ];
  }

  if (location["motion"]) {
    let splitMotion = location["motion"].split(",");

    if (location["motion"] === " ") {
      motionVerb = "stationary";
    } else if (splitMotion.length === 1) {
      motionVerb = splitMotion[0];
    } else if (splitMotion.length === 2) {
      if (splitMotion.includes("driving")) {
        motionVerb = "driving";
      } else if (splitMotion.includes("walking")) {
        motionVerb = "walking";
      } else if (splitMotion.includes("running")) {
        motionVerb = "running";
      } else if (splitMotion.includes("cycling")) {
        motionVerb = "cycling";
      } else if (splitMotion.includes("stationary")) {
        motionVerb = "stationary";
      }
    }
  }

  if (location["geocodio_results"]) {
    let addressComponents = location["geocodio_results"]["address_components"];
    let street = addressComponents["formatted_street"];
    let county = addressComponents["county"];
    let gpsState = addressComponents["state"];

    address = (street + ", " + county + ", " + gpsState).toLowerCase();
  }

  if (location["speed"]) {
    if (location["speed"] < 0) {
      speed = 0;
    } else {
      //m/s to mph
      speed = Math.round(location["speed"] * 2.23694);
    }
  }

  if (location["altitude"]) {
    altitude = metersToFeet(location["altitude"]);
  }

  if (location["battery_level"]) {
    batteryPercent = Math.round(100 * location["battery_level"]);
  }

  if (location["battery_state"] !== undefined) {
    if (location["battery_state"] === true) {
      batteryStatus = "charging";
    } else {
      batteryStatus = "draining";
    }
  }

  horizontalAccuracy = metersToFeet(location["horizontal_accuracy"]);
  verticalAccuracy = metersToFeet(location["vertical_accuracy"]);

  if (location["timestamp"]) {
    let timeString = "";

    const now = Date.now();
    const lastTime = parseInt(
      new Date(location["timestamp"]).getTime().toFixed(0)
    );

    let diffMs = now - lastTime;

    let days = Math.floor(diffMs / OneDay);
    diffMs %= OneDay;
    let hours = Math.floor(diffMs / OneHour);
    diffMs %= OneHour;
    let minutes = Math.floor(diffMs / OneMinute);
    diffMs %= OneMinute;
    let seconds = Math.floor(diffMs / OneSecond);

    if (days !== 0) {
      if (days === 1) {
        timeString += days + " day";
      } else {
        timeString += days + " days";
      }
    }

    if (hours !== 0) {
      if (timeString.length === 0) {
        if (hours === 1) {
          timeString += hours + " hour";
        } else {
          timeString += hours + " hours";
        }
      } else {
        if (hours === 1) {
          timeString += ", " + hours + " hour";
        } else {
          timeString += ", " + hours + " hours";
        }
      }
    }

    if (minutes !== 0) {
      if (timeString.length === 0) {
        if (minutes === 1) {
          timeString += minutes + " minute";
        } else {
          timeString += minutes + " minutes";
        }
      } else {
        if (minutes === 1) {
          timeString += ", " + days + " minute";
        } else {
          timeString += ", " + minutes + " minutes";
        }
      }
    }

    if (seconds !== 0) {
      if (timeString.length === 0) {
        if (seconds === 1) {
          timeString += seconds + " second";
        } else {
          timeString += seconds + " seconds";
        }
      } else {
        if (days === 1) {
          timeString += ", " + days + " day";
        }
        timeString += ", " + seconds + " seconds";
      }
    }

    timeString += " ago";
    pastTimeSentence = timeString;
  }

  return [
    motionVerb,
    address,
    speed,
    altitude,
    batteryPercent,
    batteryStatus,
    horizontalAccuracy,
    verticalAccuracy,
    pastTimeSentence,
  ];
};

const metersToFeet = (value) => {
  return Math.round(value * 3.28084);
};
