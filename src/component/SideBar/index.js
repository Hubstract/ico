/**
 * SideBar
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React, { Component } from "react";
import "./sidebar.scss";

class SideBar extends Component {
 
  render() {
    return (
      <React.Fragment>
        <div className="side-bar-nav" id="mySidebar">
          <div className="close-icon">
            <i className="fas fa-times"></i>
          </div>
          <ul>
            <li><a className="nav-item">Form</a></li>
            <li><a className="nav-item">zz</a></li>
            <li><a className="nav-item">Doc</a></li>
            <li><a className="nav-item">Community</a></li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
export default SideBar;
