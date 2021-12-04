import React, { Component } from "react";
import Routing from "./Routing/Routing";
import { ThemeColor } from "./Config/Config";

class App extends Component {
  state = {
    themeColor: Boolean(localStorage.getItem("theme"))
      ? parseInt(localStorage.getItem("theme"))
      : ThemeColor.Light,
  };

  render() {
    return <Routing />;
  }
}

export default App;
