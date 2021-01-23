import React from "react";
import DraggableColourBox from "../DraggableColourBox/DraggableColourBox.jsx";
import { SortableContainer } from "react-sortable-hoc";

const DraggableColourList = SortableContainer(
  ({ paletteColors, handleDeleteColor }) => {
    return (
      <div style={{ height: "100%" }}>
        {paletteColors.map((color, i) => (
          <DraggableColourBox
            index={i}
            color={color.color}
            key={color.name}
            name={color.name}
            handleDelete={() => handleDeleteColor(color.name)}
          />
        ))}
      </div>
    );
  }
);

export default DraggableColourList;
