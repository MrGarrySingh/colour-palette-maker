import React from "react";
import MiniPalette from "../MiniPalette/MiniPalette.jsx";
import { withStyles } from "@material-ui/styles";
import styles from "../../styles/PaletteListStyles.js";

function PaletteList({ classes, palettes, history }) {
  const goToPalette = (id) => {
    history.push(`/palette/${id}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>Colour Palettes</h1>
        </nav>
        <div className={classes.palettes}>
          {palettes.map((palette) => (
            <MiniPalette
              {...palette}
              handleClick={() => goToPalette(palette.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
