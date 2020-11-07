import React from "react";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import "./Navbar.css";

const Navbar = ({ level, changeLevel }) => {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <a href="/">colourpalettemaker</a>
      </div>
      <div className="navbar__sliderContainer">
        <span>Level: {level}</span>
        <div className="navbar__slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={changeLevel}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
