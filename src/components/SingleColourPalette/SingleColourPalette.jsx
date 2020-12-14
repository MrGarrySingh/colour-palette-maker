import React, { useState, useEffect } from "react";
import ColourBox from "../ColourBox/ColourBox.jsx";

function SingleColourPalette({ colorId, palette }) {
  const [shades, setShades] = useState([]);

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
      key={color.id}
      name={color.name}
      bgColor={color.hex}
      showLink={false}
    />
  ));

  return (
    <div className="palette">
      <h1>SINGLE COLOUR PALETTE</h1>
      <div className="palette__colors">{colorBoxes}</div>
    </div>
  );
}

export default SingleColourPalette;
