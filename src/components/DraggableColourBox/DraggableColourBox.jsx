import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
  },
};

function DraggableColourBox({ color, classes, name }) {
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      {color}
      <h1>{name}</h1>
    </div>
  );
}

export default withStyles(styles)(DraggableColourBox);
