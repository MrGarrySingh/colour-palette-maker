import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "../../styles/MiniPaletteStyles.js";
import DeleteIcon from "@material-ui/icons/Delete";

function MiniPalette({
  classes,
  paletteName,
  emoji,
  colors,
  handleClick,
  deletePalette,
  id,
}) {
  const miniColorBoxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));

  const removePalette = (e) => {
    e.stopPropagation();
    deletePalette(id);
  };

  return (
    <div className={classes.root} onClick={handleClick}>
      <DeleteIcon className={classes.deleteIcon} onClick={removePalette} />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
