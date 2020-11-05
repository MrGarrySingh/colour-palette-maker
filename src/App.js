import React from "react";
import Palette from "./components/Palette/Palette.jsx";
import seedPalettes from "./seedPalettes.js";
import { generatePalette } from "./colorHelpers.js";

import "./App.css";

function App() {
  console.log(generatePalette(seedPalettes[4]));
  return (
    <div className="App">
      <Palette {...seedPalettes[4]} />
    </div>
  );
}

export default App;
