import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import '../../css/SideNav.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const SideNav = (props) => {
  const Links = [
    { 
      label: "View Profile",
      href: "/Profile"
    },
    { 
      label: "Login",
      href: "/Login"
    },
    { 
      label: "Upload",
      href: "/Upload"
    },
  ];
  return (
    <div className="sidenav">
      <h1 className="header"><a href="/">Well Plated</a></h1>
      <a href="/Profile">View Profile</a>
      <a href="/Login">Login</a>
      <a href="/Upload">Upload</a>
      <a href="/About">About Us</a>
    </div>
  );
};
export default SideNav;




SideNav.prototypes = {
  container: PropTypes.object,
};