import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./ColourBox.css";

function ColourBox({ bgColor, name }) {
  return (
    <CopyToClipboard text={bgColor}>
      <div style={{ background: bgColor }} className="colourBox">
        <div className="colourBox__copyContainer">
          <div className="colourBox__boxContent">
            <span>{name}</span>
          </div>
          <button className="colourBox__button">COPY</button>
          <span className="colourBox__more">MORE</span>
        </div>
      </div>
    </CopyToClipboard>
  );
}

export default ColourBox;
