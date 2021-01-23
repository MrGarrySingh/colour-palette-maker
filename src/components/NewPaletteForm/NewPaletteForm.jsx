import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import DraggableColourList from "../DraggableColourList/DraggableColourList.jsx";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";

const drawerWidth = 480;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function NewPaletteForm({ savePalette, palettes }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [currColor, setCurrColor] = useState("teal");
  const [paletteColors, setPaletteColors] = useState([
    { color: "#123abc", name: "Blue" },
  ]);
  const [colorName, setColorName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeColor = (color) => {
    setCurrColor(color.hex);
  };

  const addNewColor = () => {
    const newColor = { color: currColor, name: colorName };
    setPaletteColors([...paletteColors, newColor]);
    setColorName("");
  };

  const handleChange = (e) => {
    setColorName(e.target.value);
  };

  const saveNewPalette = () => {
    const newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      emoji: "",
      colors: paletteColors,
    };
    savePalette(newPalette);
    // Redirect to main page once palette has been saved
    history.push("/");
  };

  const handleDeleteColor = (colorName) => {
    setPaletteColors(paletteColors.filter((color) => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setPaletteColors(arrayMove(paletteColors, oldIndex, newIndex));
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
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={saveNewPalette}>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              onChange={(e) => setNewPaletteName(e.target.value)}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Enter a Palette Name",
                "Palette Name already taken",
              ]}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
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
        <Typography variant="h4">Create Your Palette</Typography>
        <div>
          <Button variant="contained" color="secondary">
            CLEAR PALETTE
          </Button>
          <Button variant="contained" color="primary">
            RANDOM COLOUR
          </Button>
        </div>
        <ChromePicker
          color={currColor}
          onChangeComplete={(newColor) => changeColor(newColor)}
        />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            value={colorName}
            onChange={handleChange}
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
            style={{ backgroundColor: currColor }}
          >
            ADD COLOUR
          </Button>
        </ValidatorForm>
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
