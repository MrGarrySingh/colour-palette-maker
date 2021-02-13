import { makeStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "../constants.js";
import sizes from "./sizes.js";

const drawerWidth = DRAWER_WIDTH;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px",
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
  navButtons: {
    marginRight: "1rem",
    "& a": {
      textDecoration: "none",
    },
    [sizes.down("xs")]: {
      marginRight: "0.5rem",
    },
  },
  button: {
    margin: "0 0.5rem",
    [sizes.down("xs")]: {
      margin: "0 0.25rem",
      padding: "0.33rem",
    },
  },
}));

export default useStyles;
