/**
 * SideBar
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React, { Component } from "react";
import "./sidebar.scss";

class ValueCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid  mt-5">
          <div className="row">
            <div
              className="col-md-4 col-6 mb-4"
            >
              <div className="total-value-card">
                <h6>Total Value Locked</h6>
                <h2>$13,458.82</h2>
                <h6></h6>
              </div>
            </div>

            <div
              className=" col-md-4 col-6 mb-4"
            >
              <div className="total-value-card">
                <h6>Total Value Locked</h6>
                <h2>$13,458.82</h2>
                <h6>~$2,333.34</h6>
              </div>
            </div>

            <div
              className=" col-md-4 col-6 mb-4"
            >
              <div className=" total-value-card">
                <h6>Total Value Locked</h6>
                <h2>$13,458.82</h2>
                <h6>~$2,333.34</h6>
              </div>
            </div>

            <div
              className="col-md-4 col-6 mb-4"
            >
              <div className="total-value-card">
                <h6>Total Value Locked</h6>
                <h2>$13,458.82</h2>
                <h6></h6>
              </div>
            </div>

            <div
              className="col-md-4 col-6 mb-4"
            >
              <div className="total-value-card">
                <h6>Total Value Locked</h6>
                <h2>$13,458.82</h2>
                <h6>~$2,333.34</h6>
              </div>
            </div>

            <div
              className="col-md-4 col-6 mb-4"
            >
              <div className="total-value-card">
                <h6>Total Value Locked</h6>
                <h2>$13,458.82</h2>
                <h6>~$2,333.34</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="containerClass my-4">
          <button disabled="" className="buttonStyle">
            Compound All
          </button>
          <button disabled="" className="buttonStyle">
            Harvest All
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export default ValueCard;
