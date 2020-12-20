import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "../../styles/FooterStyles.js";

function Footer({ paletteName, emoji, classes }) {
  return (
    <footer className={classes.footer}>
      {paletteName}
      <span className={classes.footerEmoji}>{emoji}</span>
    </footer>
  );
}

export default withStyles(styles)(Footer);
