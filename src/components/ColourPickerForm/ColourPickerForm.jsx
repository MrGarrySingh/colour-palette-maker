import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useStyles from "../../styles/ColourPickerFormStyles.js";

function ColourPickerForm({ paletteIsFull, paletteColors, addNewColor }) {
  const classes = useStyles();

  const [currColor, setCurrColor] = useState("teal");
  const [colorName, setColorName] = useState("");

  const changeColor = (color) => {
    setCurrColor(color.hex);
  };

  const handleChange = (e) => {
    setColorName(e.target.value);
  };

  const handleAddColor = () => {
    const newColor = { color: currColor, name: colorName };
    addNewColor(newColor);
    setColorName("");
  };

  // creating custom validation rule for the text field where we check if the added color is unique
  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return paletteColors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", () => {
      return paletteColors.every(
        ({ color }) => color.toLowerCase() !== currColor.toLowerCase()
      );
    });
  });

  return (
    <div className={classes.root}>
      <ChromePicker
        color={currColor}
        onChangeComplete={(newColor) => changeColor(newColor)}
        className={classes.picker}
        width="100%"
      />
      <ValidatorForm onSubmit={handleAddColor}>
        <TextValidator
          value={colorName}
          onChange={handleChange}
          placeholder="Color Name"
          className={classes.colorNameInput}
          variant="filled"
          margin="normal"
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a Color Name",
            "Color Name must be unique",
            "Color already used",
          ]}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={paletteIsFull}
          className={classes.addColor}
          style={{ backgroundColor: paletteIsFull ? "grey" : currColor }}
        >
          {paletteIsFull ? "PALETTE FULL" : "ADD COLOUR"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColourPickerForm;
