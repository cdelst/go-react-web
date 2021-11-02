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

  // Handle location
  switch (type) {
    case "motion":
      switch (value) {
        case "driving":
          return (
            <LocationVariable
              icon={<FaCarAlt className="LocationVariable-icon" />}
              value={value}
            />
          );
        case "walking":
          return (
            <LocationVariable
              icon={<FaWalking className="LocationVariable-icon" />}
              value={value}
            />
          );
        case "running":
          return (
            <LocationVariable
              icon={<FaRunning className="LocationVariable-icon" />}
              value={value}
            />
          );
        case "cycling":
          return (
            <LocationVariable
              icon={<FaBiking className="LocationVariable-icon" />}
              value={value}
            />
          );
        case "stationary":
          return (
            <LocationVariable
              icon={<FaMale className="LocationVariable-icon" />}
              value={value}
            />
          );
      }
      break;
    case "address":
      return (
        <LocationVariable
          icon={<FaMapMarkedAlt className="LocationVariable-icon" />}
          value={value}
        />
      );
    case "speed":
      return (
        <LocationVariable
          icon={<FaStopwatch className="LocationVariable-icon" />}
          value={value}
        />
      );
    case "altitude":
      return (
        <LocationVariable
          icon={<FaMountain className="LocationVariable-icon" />}
          value={value}
        />
      );
    case "batteryPercent":
      if (value > 95) {
        return (
          <LocationVariable
            icon={<FaBatteryFull className="LocationVariable-icon" />}
            value={value}
          />
        );
      } else if (value > 75) {
        return (
          <LocationVariable
            icon={<FaBatteryThreeQuarters className="LocationVariable-icon" />}
            value={value}
          />
        );
      } else if (value > 50) {
        return (
          <LocationVariable
            icon={<FaBatteryHalf className="LocationVariable-icon" />}
            value={value}
          />
        );
      } else if (value > 25) {
        return (
          <LocationVariable
            icon={<FaBatteryQuarter className="LocationVariable-icon" />}
            value={value}
          />
        );
      } else {
        return (
          <LocationVariable
            icon={<FaBatteryEmpty className="LocationVariable-icon" />}
            value={value}
          />
        );
      }

    case "batteryStatus":
      if (value === "charging") {
        return (
          <LocationVariable
            icon={<FaBolt className="LocationVariable-icon" />}
            value={value}
          />
        );
      } else {
        return (
          <LocationVariable
            icon={<FaAngleDoubleDown className="LocationVariable-icon" />}
            value={value}
          />
        );
      }
    case "horizontalAccuracy":
      return (
        <LocationVariable
          icon={<FaMapPin className="LocationVariable-icon" />}
          value={value}
        />
      );
    case "verticalAccuracy":
      return (
        <LocationVariable
          icon={<FaMapPin className="LocationVariable-icon" />}
          value={value}
        />
      );
    case "pastTimeSentence":
      return (
        <LocationVariable
          icon={<FaClock className="LocationVariable-icon" />}
          value={value}
        />
      );
    default:
    // code block
  }

  return <LocationVariable />;
};

export default LocationVariableContainer;
