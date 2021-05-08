import React from "react";
import '../css/SideNav.css';

const SideNav = (props) => {
  return (
    <div className="sidenav">
      <a href="/Login">Login</a>
      <a href="#section">About</a>
      <a href="#section">Clients</a>
      <a href="#section">Contact</a>
    </div>
  );
};
export default SideNav;
