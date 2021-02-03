import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColourList from "../DraggableColourList/DraggableColourList.jsx";
import { arrayMove } from "react-sortable-hoc";
import CreatePaletteNavbar from "../CreatePaletteNavbar/CreatePaletteNavbar.jsx";
import ColourPickerForm from "../ColourPickerForm/ColourPickerForm.jsx";
import useStyles from "../../styles/NewPaletteFormStyles.js";

function NewPaletteForm({ savePalette, palettes }) {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [paletteColors, setPaletteColors] = useState(palettes[0].colors);

  const paletteIsFull = paletteColors.length >= 20;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setPaletteColors([...paletteColors, newColor]);
  };

  const handleDeleteColor = (colorName) => {
    setPaletteColors(paletteColors.filter((color) => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setPaletteColors(arrayMove(paletteColors, oldIndex, newIndex));
  };

  const clearPalette = () => {
    setPaletteColors([]);
  };

  const getRandomColor = () => {
    const allColors = palettes.map((p) => p.colors).flat();
    let randomNum = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[randomNum];
    setPaletteColors([...paletteColors, randomColor]);
  };

  const saveNewPalette = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = paletteColors;

    savePalette(newPalette);
    // Redirect to main page once palette has been saved
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <CreatePaletteNavbar
        open={open}
        palettes={palettes}
        saveNewPalette={saveNewPalette}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearPalette}
              className={classes.button}
            >
              CLEAR PALETTE
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={getRandomColor}
              disabled={paletteIsFull}
              className={classes.button}
            >
              RANDOM COLOUR
            </Button>
          </div>
          <ColourPickerForm
            paletteIsFull={paletteIsFull}
            paletteColors={paletteColors}
            addNewColor={addNewColor}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColourList
          paletteColors={paletteColors}
          handleDeleteColor={handleDeleteColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}

export default NewPaletteForm;
