import React, { useState } from "react";
import ColourBox from "../ColourBox/ColourBox.jsx";
import Navbar from "../Navbar/Navbar.jsx";

import "./Palette.css";

function Palette({ palette }) {
  const [level, setLevel] = useState(500);

  const changeLevel = (level) => {
    setLevel(level);
  };

  return (
    <div className="palette">
      <Navbar level={level} changeLevel={changeLevel} />
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
