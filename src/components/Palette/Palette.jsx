import React from "react";
import ColourBox from "../ColourBox/ColourBox.jsx";

import "./Palette.css";

function Palette({ colors, emoji, id, paletteName }) {
  return (
    <div className="palette">
      {/* Navbar */}
      <div className="palette__colors">
        {colors.map((color) => (
          <ColourBox bgColor={color.color} name={color.name} />
        ))}
      </div>
      {/* Footer */}
    </div>
  );
}

export default Palette;
