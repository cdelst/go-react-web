import "./css/App.css";
import IntroCardContainer from "components/IntroCardContainer";
import React from "react";
import { MuiThemeProvider } from "material-ui";
import Header from "components/Header";
import Title from "./components/Title";

const path = require("path");
console.log(path.resolve(__dirname, "../.env"));
require("dotenv").config({ path: __dirname + "/../.env" });

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
