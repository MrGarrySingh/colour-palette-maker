import React from "react";
import { Link } from "react-router-dom";

function PaletteList({ palettes }) {
  return (
    <div>
      <h1>Color Palettes</h1>
      {palettes.map((palette) => (
        <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
      ))}
    </div>
  );
}

export default PaletteList;
