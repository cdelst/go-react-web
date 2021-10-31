import React from "react";
import LocationVariable from "./LocationVariable";
import {
  FaCarAlt,
  FaWalking,
  FaRunning,
  FaBiking,
  FaMale,
  FaClock,
  FaMountain,
  FaBatteryEmpty,
  FaBatteryQuarter,
  FaBatteryHalf,
  FaBatteryThreeQuarters,
  FaBatteryFull,
  FaBolt,
  FaMapMarkedAlt,
  FaStopwatch,
  FaAngleDoubleDown,
  FaMapPin,
} from "react-icons/fa";

const LocationVariableContainer = (props) => {
  const { type, value } = props;

  const iconStyles = {
    fontSize: "1.50em",
    verticalAlign: "middle",
  };

  // Handle location
  switch (type) {
    case "motion":
      switch (value) {
        case "driving":
          return (
            <LocationVariable
              icon={<FaCarAlt style={iconStyles} />}
              value={value}
            />
          );
        case "walking":
          return (
            <LocationVariable
              icon={<FaWalking style={iconStyles} />}
              value={value}
            />
          );
        case "running":
          return (
            <LocationVariable
              icon={<FaRunning style={iconStyles} />}
              value={value}
            />
          );
        case "cycling":
          return (
            <LocationVariable
              icon={<FaBiking style={iconStyles} />}
              value={value}
            />
          );
        case "stationary":
          return (
            <LocationVariable
              icon={<FaMale style={iconStyles} />}
              value={value}
            />
          );
      }
      break;
    case "address":
      return (
        <LocationVariable
          icon={<FaMapMarkedAlt style={iconStyles} />}
          value={value}
        />
      );
    case "speed":
      return (
        <LocationVariable
          icon={<FaStopwatch style={iconStyles} />}
          value={value}
        />
      );
    case "altitude":
      return (
        <LocationVariable
          icon={<FaMountain style={iconStyles} />}
          value={value}
        />
      );
    case "batteryPercent":
      if (value > 95) {
        return (
          <LocationVariable
            icon={<FaBatteryFull style={iconStyles} />}
            value={value}
          />
        );
      } else if (value > 75) {
        return (
          <LocationVariable
            icon={<FaBatteryThreeQuarters style={iconStyles} />}
            value={value}
          />
        );
      } else if (value > 50) {
        return (
          <LocationVariable
            icon={<FaBatteryHalf style={iconStyles} />}
            value={value}
          />
        );
      } else if (value > 25) {
        return (
          <LocationVariable
            icon={<FaBatteryQuarter style={iconStyles} />}
            value={value}
          />
        );
      } else {
        return (
          <LocationVariable
            icon={<FaBatteryEmpty style={iconStyles} />}
            value={value}
          />
        );
      }

    case "batteryStatus":
      if (value === "charging") {
        return (
          <LocationVariable
            icon={<FaBolt style={iconStyles} />}
            value={value}
          />
        );
      } else {
        return (
          <LocationVariable
            icon={<FaAngleDoubleDown style={iconStyles} />}
            value={value}
          />
        );
      }
    case "horizontalAccuracy":
      return (
        <LocationVariable
          icon={<FaMapPin style={iconStyles} />}
          value={value}
        />
      );
    case "verticalAccuracy":
      return (
        <LocationVariable
          icon={<FaMapPin style={iconStyles} />}
          value={value}
        />
      );
    case "pastTimeSentence":
      return (
        <LocationVariable icon={<FaClock style={iconStyles} />} value={value} />
      );
    default:
    // code block
  }

  return <LocationVariable />;
};

export default LocationVariableContainer;
