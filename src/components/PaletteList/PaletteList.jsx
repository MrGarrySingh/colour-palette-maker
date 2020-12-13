import React from "react";
import MiniPalette from "../MiniPalette/MiniPalette.jsx";
import { Link } from "react-router-dom";

function PaletteList({ palettes }) {
  return (
    <div>
      <MiniPalette />
      <h1>Color Palettes</h1>
      {palettes.map((palette) => (
        <MiniPalette {...palette} />
      ))}
    </div>
  );
}

export default PaletteList;
