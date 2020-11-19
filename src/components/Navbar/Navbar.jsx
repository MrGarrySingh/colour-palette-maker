import React, { useState } from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "rc-slider/assets/index.css";
import "./Navbar.css";

const Navbar = ({ level, changeLevel, handleChange }) => {
  const [format, setFormat] = useState("hex");

  const changeFormat = (e) => {
    setFormat(e.target.value);
    handleChange(e.target.value);
  };

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
      <div className="navbar__selectContainer">
        <Select onChange={changeFormat} value={format}>
          <MenuItem value="hex">HEX - #FFFFFF</MenuItem>
          <MenuItem value="rgb">RBG - RGB(255, 255, 255)</MenuItem>
          <MenuItem value="rgba">RGBA - RGB(255, 255, 255, 1.0)</MenuItem>
        </Select>
      </div>
    </header>
  );
};

export default Navbar;
