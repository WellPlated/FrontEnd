import React from "react";
import '../css/SideNav.css';

const SideNav = (props) => {
  return (
    <div className="sidenav">
      <h3 href="/">Well Plated</h3>
      <a href="/Profile">View Profile</a>
      <a href="/Login">Login</a>
      <a href="#section">About Us</a>
    </div>
  );
};
export default SideNav;
