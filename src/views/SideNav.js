import React from "react";
import '../css/SideNav.css';

const SideNav = (props) => {
  return (
    <div className="sidenav">
      <a href="/Profile">View Profile</a>
      <a href="/Login">Login</a>
      <a href="#section">Clients</a>
      <a href="#section">Contact</a>
    </div>
  );
};
export default SideNav;
