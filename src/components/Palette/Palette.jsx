import React, { useState } from "react";
import ColourBox from "../ColourBox/ColourBox.jsx";
import Navbar from "../Navbar/Navbar.jsx";

import "./Palette.css";

function Palette({ palette }) {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");

  const changeLevel = (level) => {
    setLevel(level);
  };

  const changeFormat = (val) => {
    setFormat(val);
  };

  return (
    <div className="palette">
      <Navbar
        level={level}
        changeLevel={changeLevel}
        handleChange={changeFormat}
      />
      <div className="palette__colors">
        {palette.colors[level].map((color) => (
          <ColourBox
            bgColor={color[format]}
            name={color.name}
            key={color.id}
            id={color.id}
            paletteId={palette.id}
          />
        ))}
      </div>
      <footer className="palette__footer">
        {palette.paletteName}
        <span className="palette__footerEmoji">{palette.emoji}</span>
      </footer>
    </div>
  );
}

export default Palette;
