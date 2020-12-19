import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";

import "./ColourBox.css";

function ColourBox({ bgColor, name, paletteId, id, showLink }) {
  const [copied, setCopied] = useState(false);

  const toggleCopy = () => {
    setCopied(
      true,
      setTimeout(() => setCopied(false), 1500)
    );
  };

  const isDarkColour = chroma(bgColor).luminance() <= 0.15;
  const isLightColour = chroma(bgColor).luminance() >= 0.65;

  return (
    <CopyToClipboard text={bgColor} onCopy={toggleCopy}>
      <div style={{ background: bgColor }} className="colourBox">
        <div
          style={{ background: bgColor }}
          className={`colourBox__copyOverlay ${copied && "show"}`}
        />
        <div className={`colourBox__copyMsg ${copied && "show"}`}>
          <h1>COPIED!</h1>
          <p className={isLightColour && "colourBox__darkText"}>{bgColor}</p>
        </div>
        <div className="colourBox__copyContainer">
          <div className="colourBox__boxContent">
            <span className={isDarkColour && "colourBox__lightText"}>
              {name}
            </span>
          </div>
          <button
            className={`colourBox__button ${
              isLightColour && "colourBox__darkText"
            }`}
          >
            COPY
          </button>
        </div>
        {showLink && (
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={`colourBox__more ${
                isLightColour && "colourBox__darkText"
              }`}
            >
              MORE
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

export default ColourBox;
