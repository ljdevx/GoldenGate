import React from "react";
import ReactDOM from "react-dom";
import "./assets/webfonts/inter/inter.css";
import "./assets/css/app.min.css";

import { MetaMaskProvider } from "metamask-react";

import App from "./App";
import * as serviceWorker from "./serviceWorker";


ReactDOM.render(
  <React.StrictMode>
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>,
  document.getElementById("root")
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
