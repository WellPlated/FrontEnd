import React from "react";
import '../../css/SideNav.css';

const SideNav = (props) => {
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
 