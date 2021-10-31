import React from "react";
import "css/LocationSummary.css";
import LocationVariableContainer from "./LocationVariableContainer";
import MyLoader from "./ContentLoader";

const LocationSummary = (props) => {
  const {
    motionVerb,
    address,
    speed,
    altitude,
    batteryPercent,
    batteryStatus,
    horizontalAccuracy,
    verticalAccuracy,
    pastTimeSentence,
  } = props;

  console.log(motionVerb);

  const v = (type, value) => {
    return <LocationVariableContainer type={type} value={value} />;
  };

  return (
    <div className="LocationSummary">
      {motionVerb ? (
        <div className="LocationSummary-content">
          {v("address", address)} +/-
          {v("horizontalAccuracy", horizontalAccuracy)}ft <br />
          {v("motion", motionVerb)}, {v("speed", speed)}mph <br />
          {v("altitude", altitude)}ft +/-{" "}
          {v("verticalAccuracy", verticalAccuracy)}ft <br />
          {v("batteryStatus", batteryStatus)} at{" "}
          {v("batteryPercent", batteryPercent)}%.
          <div className="LocationSummary-content--time">
            updated {v("pastTimeSentence", pastTimeSentence)}
          </div>
        </div>
      ) : (
        <MyLoader />
      )}
    </div>
  );
};

export default LocationSummary;
