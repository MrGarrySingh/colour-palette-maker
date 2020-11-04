import React from "react";
import Palette from "./components/Palette/Palette.jsx";
import seedPalettes from "./seedPalettes.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Palette {...seedPalettes[4]} />
    </div>
  );
}

export default App;
