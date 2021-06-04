import React from "react";
import PropTypes from "prop-types";
import '../../css/SideNav.css';

// Sidebar for navigation (appears on every page)
const SideNav = () => {
  return (
    <div className="sidenav">
      <h1 className="header"><a href="/">Well Plated</a></h1>
      <a href="/Profile">Profile</a>
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