import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

import "./ColourBox.css";

function ColourBox({ bgColor, name, paletteId, id }) {
  const [copied, setCopied] = useState(false);

  const toggleCopy = () => {
    setCopied(
      true,
      setTimeout(() => setCopied(false), 1500)
    );
  };

  return (
    <CopyToClipboard text={bgColor} onCopy={toggleCopy}>
      <div style={{ background: bgColor }} className="colourBox">
        <div
          style={{ background: bgColor }}
          className={`colourBox__copyOverlay ${copied && "show"}`}
        />
        <div className={`colourBox__copyMsg ${copied && "show"}`}>
          <h1>COPIED!</h1>
          <p>{bgColor}</p>
        </div>
        <div className="colourBox__copyContainer">
          <div className="colourBox__boxContent">
            <span>{name}</span>
          </div>
          <button className="colourBox__button">COPY</button>
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="colourBox__more">MORE</span>
          </Link>
        </div>
      </div>
    </CopyToClipboard>
  );
}

export default ColourBox;
