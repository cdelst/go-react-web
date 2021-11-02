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
          <div>
            {v("motion", motionVerb)}, {v("speed", speed)}mph{" "}
          </div>
          <div>
            {v("altitude", altitude)}ft within{" "}
            {v("verticalAccuracy", verticalAccuracy)}ft{" "}
          </div>
          <div>
            {v("batteryStatus", batteryStatus)} at{" "}
            {v("batteryPercent", batteryPercent)}%.
          </div>
          <div>
            {v("address", address)} within{" "}
            {v("horizontalAccuracy", horizontalAccuracy)}ft{" "}
          </div>
          <div>
            <div>{v("pastTimeSentence", pastTimeSentence)}</div>
          </div>
        </div>
      ) : (
        <MyLoader />
      )}
    </div>
  );
};

export default LocationSummary;
