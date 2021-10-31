import "./css/App.css";
import LocationSummaryContainer from "components/LocationSummaryContainer";
import IntroCardContainer from "components/IntroCardContainer";
import React from "react";
import Title from "./components/Title";

function App() {
  return (
    <div className="App">
      <div className="body">
        <IntroCardContainer />
        <LocationSummaryContainer />
      </div>
    </div>
  );
}

export default App;
