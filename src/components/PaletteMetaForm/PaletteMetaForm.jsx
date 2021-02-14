import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function PaletteMetaForm({ palettes, saveNewPalette, hideForm }) {
  const [stage, setStage] = useState("form");
  const [newPaletteName, setNewPaletteName] = useState("");

  // creating custom validation rule for the text field where we check if the added color is unique
  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const nextStage = () => {
    setStage("emoji");
  };

  const savePalette = (emoji) => {
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native,
    };
    saveNewPalette(newPalette);
    setStage("");
  };

  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={hideForm}>
        <DialogTitle id="picker-dialog-title">
          Choose a Palette Emoji
        </DialogTitle>
        <Picker onSelect={savePalette} title="Pick a Palette Emoji" />
      </Dialog>
      <Dialog
        open={stage === "form"}
        onClose={hideForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={nextStage}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new Palette. Make sure it's unique!
            </DialogContentText>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              fullWidth
              margin="normal"
              onChange={(e) => setNewPaletteName(e.target.value)}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Enter a Palette Name",
                "Palette Name already taken",
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Continue
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm;
