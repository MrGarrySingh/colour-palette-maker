import React from "react";

import "./ColourBox.css";

function ColourBox({ bgColor, name }) {
  return (
    <div style={{ background: bgColor }} className="colourBox">
      <span>MORE</span>
      <span>{name}</span>
    </div>
  );
}

export default ColourBox;
