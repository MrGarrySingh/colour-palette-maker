import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "../../styles/ColourBoxStyles.js";

function ColourBox({ bgColor, name, paletteId, id, showLink, classes }) {
  const [copied, setCopied] = useState(false);

  const toggleCopy = () => {
    setCopied(
      true,
      setTimeout(() => setCopied(false), 1500)
    );
  };

  return (
    <CopyToClipboard text={bgColor} onCopy={toggleCopy}>
      <div style={{ background: bgColor }} className={classes.colourBox}>
        <div
          style={{ background: bgColor }}
          className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
        />
        <div
          className={`${classes.copyMessage} ${copied && classes.showMessage}`}
        >
          <h1>COPIED!</h1>
          <p className={classes.copyText}>{bgColor}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>COPY</button>
        </div>
        {showLink && (
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

export default withStyles(styles)(ColourBox);
