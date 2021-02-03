import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";
import styles from "../../styles/DraggableColourBoxStyles.js";

const DraggableColourBox = SortableElement(
  ({ color, classes, name, handleDelete }) => {
    return (
      <div className={classes.root} style={{ backgroundColor: color }}>
        <div className={classes.boxContent}>
          <span>{name.toUpperCase()}</span>
          <DeleteIcon className={classes.deleteIcon} onClick={handleDelete} />
        </div>
      </div>
    );
  }
);

export default withStyles(styles)(DraggableColourBox);
