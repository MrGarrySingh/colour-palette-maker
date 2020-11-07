import React, { useState } from "react";
import ColourBox from "../ColourBox/ColourBox.jsx";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import "./Palette.css";

function Palette({ palette }) {
  const [level, setLevel] = useState(500);

  const changeLevel = (level) => {
    setLevel(level);
  };

  return (
    <div className="palette">
      <div className="palette__slider">
        <Slider
          defaultValue={level}
          min={100}
          max={900}
          step={100}
          onAfterChange={changeLevel}
        />
      </div>
      {/* Navbar */}
      <div className="palette__colors">
        {palette.colors[level].map((color) => (
          <ColourBox bgColor={color.hex} name={color.name} />
        ))}
      </div>
      {/* Footer */}
    </div>
  );
}

export default Palette;
