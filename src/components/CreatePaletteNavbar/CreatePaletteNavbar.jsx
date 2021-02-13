import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import PaletteMetaForm from "../PaletteMetaForm/PaletteMetaForm.jsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PaletteIcon from "@material-ui/icons/Palette";
import Button from "@material-ui/core/Button";
import useStyles from "../../styles/CreatePaletteNavbarStyles.js";

function CreatePaletteNavbar({
  open,
  palettes,
  saveNewPalette,
  handleDrawerOpen,
}) {
  const classes = useStyles();
  const [formShowing, setFormShowing] = useState(false);

  const showForm = () => {
    setFormShowing(true);
  };

  const hideForm = () => {
    setFormShowing(false);
  };

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
            onClick={() => handleDrawerOpen(open)}
            edge="start"
            className={clsx(classes.menuButton, { [classes.hide]: open })}
          >
            <PaletteIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create Your Palette
          </Typography>
        </Toolbar>
        <div className={classes.navButtons}>
          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Go Back
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={showForm}
            className={classes.button}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={palettes}
          saveNewPalette={saveNewPalette}
          hideForm={hideForm}
        />
      )}
    </div>
  );
}

export default CreatePaletteNavbar;
