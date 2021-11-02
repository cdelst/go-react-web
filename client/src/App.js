import "./css/App.css";
import LocationSummaryContainer from "components/LocationSummaryContainer";
import IntroCardContainer from "components/IntroCardContainer";
import React from "react";
import { DeckGLComponent } from "./components/DeckGL";
import "./css/deckGl.css";

function App() {
  return (
    <div className="App">
      <div className="body">
        <div>
          <IntroCardContainer />
          <LocationSummaryContainer />
        </div>
      </div>
      <div id="map" className="DeckGLContainer">
        <DeckGLComponent />
      </div>
    </div>
  );
}

export default App;
