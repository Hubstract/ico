import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../../containers/Slider/sliderss.scss";
import "../../containers/Market/market.scss";
import { setSingleNFT } from "../../_actions/market.actions";
import { divideNo } from "../../utils/divideByEighteen";
import { showActualValue } from "../../utils/showActualValue";
import insertComma from "../../utils/insertComma";

function Card(props) {
  const [showPop, setShowPopup] = useState(false);

  useEffect(() => {
    //item.owner_address  props.metaMaskAddress
  }, []);

  const showDetail = (data) => {
    props.showDetail && props.showDetail(data);
  };

  return (
    <React.Fragment>
      {props.data &&
        props.data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid-item slider-grid-item"
              onClick={() => showDetail(item)}
            >
              <div className="gurd-main">
                <div className={"gurd-image slider-image " + props.class}>
                  <img className="g-image" src={item.image} alt="" />
                </div>
                <span class="apr-init slider-apr-init">
                  {" "}
                  <FormattedMessage id="comingSoonApr" />
                </span>
              </div>
              <div className="gurd-footer gurd-slider-footer">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="header-pr">
                    <div>
                      <h3 className="sliderProgramm">
                        {item.title}
                        {/* <FormattedMessage id="nftName" /> */}
                      </h3>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span className="list-price merket-list-price">
                        {" "}
                        <FormattedMessage id="lateSalePrice" />
                      </span>
                      <span
                        style={{ textAlign: "end" }}
                        className="list-price sale-price"
                      >
                        {item.amount
                          ? insertComma(
                              showActualValue(
                                divideNo(item.amount),
                                18,
                                "string"
                              ),
                              true
                            )
                          : "0.0"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="wrap-element slider-ele">
                  {/* <div className="footer-location">{item.date}</div> */}
                  <div className="footer-location slider-location market-footer">
                    <div className="footer-role market-footer-role">
                      <p className="role">
                        <span>
                          <FormattedMessage id="owner" />{" "}
                        </span>
                        <br />
                        <span className="nameCircle">
                          <span></span>
                          {item.owner_address ? (
                            item.owner_address
                          ) : (
                            <FormattedMessage id="name" />
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="footer-role hide-artist market-footer-role">
                      <p className="role">
                        <span>
                          <FormattedMessage id="artist" />{" "}
                        </span>
                        <br />
                        <span className="nameCircle">
                          <span></span>
                          {item.author ? (
                            item.author
                          ) : (
                            <FormattedMessage id="name" />
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="footer-date slider-date market-date">
                      <span
                        className="list-price list-pr small-price"
                        style={{
                          fontSize: "9px",
                          display: "block",
                          textAlign: "end",
                          color: "#99999 !important",
                        }}
                      >
                        {" "}
                        <FormattedMessage id="listPrice" />
                      </span>
                      <p
                        className="logo-price marketUpdate"
                        style={{ top: "2px" }}
                      >
                        <img src={item.logoImg} alt="" />
                        <p className="price">
                          {
                            // item && item.owner_address &&
                            // item.owner_address
                            // ===
                            // props.metaMaskAddress
                            // && item.price > 0 ? "Already On Sell" :
                            // item.owner_address
                            // ===
                            // props.metaMaskAddress ?
                            // <FormattedMessage id="sell"></FormattedMessage> :
                            item.price > 0 ? (
                              <FormattedMessage id="buy"></FormattedMessage>
                            ) : (
                              <FormattedMessage id="notOnSell"></FormattedMessage>
                            )
                          }
                        </p>
                        {/* <FormattedMessage id="tba" />  */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </React.Fragment>
  );
}

const mapDispatchToProps = {
  setSingleNFT,
};

const mapStateToProps = (state, ownProps) => {
  return {
    metaMaskAddress: state.metaMaskReducer.metaMaskAddress,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
