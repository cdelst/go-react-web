import React from "react";
import "css/LocationVariable.css";

const LocationVariable = (props) => {
  const { icon, value } = props;
  return (
    <div className="LocationVariable">
      <div className="LocationVariable-icon">{icon}</div>
      <div className="LocationVariable-text">{value}</div>
    </div>
  );
};

export default LocationVariable;
