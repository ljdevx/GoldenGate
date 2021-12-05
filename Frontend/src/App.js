import React, { Component } from "react";
import Routing from "./Routing/Routing";
import { ThemeColor } from "./Config/Config";



const App = () => {
  const state = {
    themeColor: Boolean(localStorage.getItem("theme"))
      ? parseInt(localStorage.getItem("theme"))
      : ThemeColor.Light,
  };

 

 //  return null;
  
  return <Routing />;
}

export default App;
