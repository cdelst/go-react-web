import "./css/App.css";
import Title from "components/Title";
import IntroCardContainer from "components/IntroCardContainer";
import React from "react";
import { MuiThemeProvider } from "material-ui";
import Header from "components/Header";

function App() {
  return (
    <div className="App">
      <MuiThemeProvider>
        <Header />
        <header className="App-header">
          <IntroCardContainer />
        </header>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
