import "./css/App.css";
import IntroCardContainer from "components/IntroCardContainer";
import React from "react";
import Title from "./components/Title";

function App() {
  return (
    <div className="App">
      <div>
        <Title />
      </div>
      <div className="body">
        <IntroCardContainer />
      </div>
    </div>
  );
}

export default App;
