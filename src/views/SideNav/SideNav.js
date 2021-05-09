import React from "react";
import '../../css/SideNav.css';

const SideNav = (props) => {
  return (
    <div className="sidenav">
      <h1 href="/">Well Plated</h1>
      <a href="/Profile">View Profile</a>
      <a href="/Login">Login</a>
      <a href="#section">About Us</a>
    </div>
  );
};
export default SideNav;
