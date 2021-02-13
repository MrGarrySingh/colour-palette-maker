import React from "react";
import { Link } from "react-router-dom";
import MiniPalette from "../MiniPalette/MiniPalette.jsx";
import { withStyles } from "@material-ui/styles";
import styles from "../../styles/PaletteListStyles.js";

function PaletteList({ classes, palettes, history, deletePalette }) {
  const goToPalette = (id) => {
    history.push(`/palette/${id}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.title}>Colour Palettes</h1>
          <Link to="/palette/new">CREATE NEW PALETTE</Link>
        </nav>
        <div className={classes.palettes}>
          {palettes.map((palette) => (
            <MiniPalette
              {...palette}
              handleClick={() => goToPalette(palette.id)}
              deletePalette={deletePalette}
              key={palette.id}
              id={palette.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
