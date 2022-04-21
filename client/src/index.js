import React from "react";
import ReactDOM from "react-dom";
import "css/index.css";
import App from "App";
import { BrowserRouter as Router } from "react-router-dom";

// Fixes the yarn problem in webstorm:
// \\wsl$\Ubuntu\home\casedelst\.nvm\versions\node\v16.8.0\lib\node_modules\yarn

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
