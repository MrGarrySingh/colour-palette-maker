import React, { useState } from "react";
import ColourBox from "../ColourBox/ColourBox.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";

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
        showSlider
      />
      <div className="palette__colors">
        {palette.colors[level].map((color) => (
          <ColourBox
            bgColor={color[format]}
            name={color.name}
            key={color.id}
            id={color.id}
            paletteId={palette.id}
            showLink={true}
          />
        ))}
      </div>
      <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
}

export default Palette;
