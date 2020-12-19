import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import ColourBox from "../ColourBox/ColourBox.jsx";
import Footer from "../Footer/Footer.jsx";

function SingleColourPalette({ colorId, palette }) {
  const [shades, setShades] = useState([]);
  const [format, setFormat] = useState("hex");

  useEffect(() => {
    const initialShades = gatherShades(palette, colorId);
    setShades(initialShades);

    return initialShades;
  }, [palette, colorId]);

  const gatherShades = (palette, colorToFilterBy) => {
    let colors = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      colors = colors.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }

    return colors.slice(1);
  };

  const colorBoxes = shades.map((color) => (
    <ColourBox
      key={color.name}
      name={color.name}
      bgColor={color[format]}
      showLink={false}
    />
  ));

  const changeFormat = (val) => {
    setFormat(val);
  };

  return (
    <div className="singleColourPalette palette">
      <Navbar handleChange={changeFormat} showSlider={false} />
      <div className="palette__colors">
        {colorBoxes}
        <div className="palette__goBack colourBox">
          <Link to={`/palette/${palette.id}`} className="colourBox__backButton">
            GO BACK
          </Link>
        </div>
      </div>
      <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
}

export default SingleColourPalette;
