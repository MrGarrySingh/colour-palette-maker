import React, { useState } from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "rc-slider/assets/index.css";
import "./Navbar.css";

const Navbar = ({ level, changeLevel, handleChange }) => {
  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);

  const changeFormat = (e) => {
    /* Snackbar doesn't work onClick but works with keyboard input? */
    setOpen(true);
    setFormat(e.target.value);
    handleChange(e.target.value);
  };

  const closeSnackbar = () => {
    setOpen(false);
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={2000}
        message={
          <span id="message-id">Format Changed To {format.toUpperCase()}!</span>
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        onClose={closeSnackbar}
        action={[
          <IconButton
            onClick={closeSnackbar}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </header>
  );
};

export default Navbar;
