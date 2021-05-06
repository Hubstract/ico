import React, { useState, useEffect, useReducer } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./sideNav.scss";

import {
  binanceMainNet,
  binanceTestNet,
  providerUrl,
  providerUrlForAliaPrice,
} from "../../config/chainIds";

import {
  setMetaMask,
  setContract,
  deleteContract,
  deleteMetaMask,
  setApprovalForAlia,
  setApprovalForLp,
  deleteApprovalForAlia,
  deleteApprovalForLp,
  setDecimalsForAlia,
  setDecimalsForLp,
  deleteDecimalsForAlia,
  deleteDecimalsForLp,
  setValuesForAliaPrice,
  setLPCirSupp,
  setTotalFarms,
  setTotalStakes,
  setAPYAlia,
  setAPYLp,
} from "../../_actions/metaMaskActions";

import LpAbi from "../../config/abi/LpAbi";
import AliaAbi from "../../config/abi/AliaAbi";
import StakingAbiTestNet from "../../config/abi/StakingAbiTestNet";
import panCakeSwapAbi from "../../config/abi/panCakeSwapAbi";
import aliaBNBReserveAbi from "../../config/abi/aliaBNBReserveAbi";

import LPTokenAdd from "../../config/contractAddress/LPTokenAdd";
import AliaTokenAdd from "../../config/contractAddress/AliaTokenAdd";
import StakingContractAddTestNet from "../../config/contractAddress/StakingContractAddTestNet";
import pancakeSwapAdd from "../../config/contractAddress/pancakeSwapAdd";
import aliaBNBReserveAdd from "../../config/contractAddress/aliaBNBReserveAdd";

import { connect } from "react-redux";
import IcoAbi from "config/abi/Ico";
import icoAdd from "config/contractAddress/ico"
import { divideNo } from "utils/divideByEighteen";



const Web3 = require("web3");

var showToggleCommunity = false;

const initialState = {
  bnbPriceDollar: "",
  aliaBNBPriceDollar: "",
  noOfAlia: "",
  noOfBNB: "",

  noOfAlia: 0,
  noOfBNB: 0,

  circulatingSuppLp: 0,

  totalFarms: 0,
  totalStakes: 0,
};

function reducer(state, action) {
  return { ...state, [action.key]: action.value };
}

const Side = (props) => {
  const [open, setOpen] = useState(true);
  const [selectedlink, setSelectedlink] = useState("Home");

  const [bnbPriceDollar, setBnbPriceDollar] = useState("");
  const [aliaBNBPriceDollar, setAliaBNBPriceDollar] = useState("");

  const [count, setCount] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [openCollectionModal, setopenCollectionModal] = useState(false);
  const [openAddItemModal, setopenAddItemModal] = useState(false)
 
  const parts = window.location.href.split("/");
  var myUrl = parts[parts.length - 1];
  function handleClose() {
    document.getElementById("hamburger").classList.remove("blue");
    document.getElementById("mySidenav").classList.remove("showClass");
    document.getElementById("mySidenav").classList.add("hideClass");
    document.getElementById("overlay").classList.remove("overlay");
  }

    function openAddCollection(){
      setopenCollectionModal(true)
  }
    function openItemModal(){
    this.setState({
        openAddItemModal:true,  
    })
    }

  function changeSelectedTab(key) {
    setSelectedlink(key);
    // if(showToggleCommunity) {
    //   showToggleCommunity = false;
    // }else {
    //     showToggleCommunity = true;
    // }
    // if (key === 'Market') {
    //   if (showToggleCommunity) {
    //     showToggleCommunity = false;
    //   } else {
    //     showToggleCommunity = true;
    //   }
    // } else {
    document.getElementById("mySidenav").classList.remove("showClass");
    document.getElementById("mySidenav").classList.add("hideClass");
    document.getElementById("overlay").classList.remove("overlay");

    showToggleCommunity = false;
    // }
    props.changeSelectedTab(key);
  }

  useEffect(() => {
    let web3, web3ForAliaPrice;
    if (
      Web3.givenProvider &&
      Web3.givenProvider.networkVersion === binanceMainNet &&
      Web3.givenProvider.networkVersion === binanceTestNet
    ) {
      web3 = new Web3(Web3.givenProvider);
    } else {
      web3 = new Web3(providerUrl);
    }

    web3ForAliaPrice = new Web3(providerUrlForAliaPrice);

    let lpContract = new web3.eth.Contract(LpAbi, LPTokenAdd);
    let aliaContract = new web3.eth.Contract(AliaAbi, AliaTokenAdd);
    let stakingContract = new web3.eth.Contract(
      StakingAbiTestNet,
      StakingContractAddTestNet
    );
    let panCakeSwapContract = new web3ForAliaPrice.eth.Contract(
      panCakeSwapAbi,
      pancakeSwapAdd
    );

    let aliaBNBReserveContract = new web3ForAliaPrice.eth.Contract(
      aliaBNBReserveAbi,
      aliaBNBReserveAdd
    );

    let obj = {
      lpContract,
      aliaContract,
      stakingContract,
      panCakeSwapContract,
      aliaBNBReserveContract,
    };
    props.setContract(obj);
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 6000);

    getStatsWithOutMetaMask(obj);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count !== 0) {
      getStatsWithOutMetaMask();
    }
  }, [count]);

  

  function getStatsWithOutMetaMask(conObj) {
    
  }

  setTimeout(() => {
    if (
       
      (props.location.pathname === "/" &&
        window.innerWidth >= 930 &&
        window.innerWidth <= 1120)
    ) {
      document.getElementById("mySidenav").classList.add("mobile-sidebar");
    } else {
      document.getElementById("mySidenav").classList.remove("mobile-sidebar");
    }
  }, 700);

  return (
    <>
      <div id="overlay" onClick={handleClose} className="overlay"></div>

      <div id="mySidenav" className={props.history.location.pathname.includes('/admin') ?  "hide" : "sidenav hideClass"}>
        <div>
          <ul className="sidebar-links">
           
              <li className={myUrl === "" ? "active" : null}>
                <NavLink to="/" onClick={() => changeSelectedTab("Home")}>
                  <span>
                    <svg width="23" height="23" viewBox="0 0 70 70">
                      <defs>
                        <clipPath id="clip-Home">
                          <rect width="70" height="70" />
                        </clipPath>
                      </defs>
                      <g id="Home" clipPath="url(#clip-Home)">
                        <path
                          id="home_1_"
                          data-name="home (1)"
                          d="M68.62,30.446l-.005-.005L40.057,1.887a6.445,6.445,0,0,0-9.115,0L2.4,30.426l-.029.029A6.441,6.441,0,0,0,6.66,41.435c.066.006.132.01.2.01H8V62.457A7.551,7.551,0,0,0,15.54,70H26.713a2.051,2.051,0,0,0,2.051-2.051V51.474a3.445,3.445,0,0,1,3.442-3.441H38.8a3.445,3.445,0,0,1,3.441,3.441V67.949A2.051,2.051,0,0,0,44.287,70H55.46A7.551,7.551,0,0,0,63,62.457V41.444h1.055a6.445,6.445,0,0,0,4.561-11Zm-2.9,6.21a2.329,2.329,0,0,1-1.657.687H60.952A2.051,2.051,0,0,0,58.9,39.394V62.457A3.445,3.445,0,0,1,55.46,65.9H46.338V51.474A7.551,7.551,0,0,0,38.8,43.932h-6.59a7.552,7.552,0,0,0-7.544,7.543V65.9H15.54a3.445,3.445,0,0,1-3.441-3.44V39.394a2.051,2.051,0,0,0-2.051-2.051H6.995l-.1,0a2.34,2.34,0,0,1-1.614-4h0l0,0L33.844,4.787a2.342,2.342,0,0,1,3.313,0l28.55,28.546.013.013a2.348,2.348,0,0,1,0,3.31Zm0,0"
                          transform="translate(-0.5 0.001)"
                        />
                      </g>
                    </svg>
                  </span>{" "}
                  <span style={{ paddingTop: "2px" }}>
                    <FormattedMessage id={"home"} />
                  </span>
                </NavLink>
              </li>
            <MarketLinks cls={showToggleCommunity ? "show" : "hide"} />
            <MarketLinks cls={showToggleCommunity ? "show" : "hide"} />          
              <li className="community-link">
                <a
                  className={selectedlink}
                  onClick={() => changeSelectedTab("Community")}
                >
                  <span>
                    <svg width="23" height="23" viewBox="0 0 70 70">
                      <defs>
                        <clipPath id="clip-Community_">
                          <rect width="70" height="70" />
                        </clipPath>
                      </defs>
                      <g
                        id="Community_"
                        data-name="Community "
                        clipPath="url(#clip-Community_)"
                      >
                        <g id="care" transform="translate(0 0)">
                          <path
                            id="Path_237"
                            data-name="Path 237"
                            d="M22.114,144.991a10.6,10.6,0,0,0-9.672-2.831V128.221a6.221,6.221,0,1,0-12.441,0v22.454a11.694,11.694,0,0,0,3.458,8.272l9.7,9.576v4.747a2.051,2.051,0,0,0,2.051,2.051H30.9a2.051,2.051,0,0,0,2.051-2.051V159.438a8.946,8.946,0,0,0-2.629-6.31Zm6.734,26.228H17.264v-3.554a2.051,2.051,0,0,0-.61-1.46L6.339,156.027A7.566,7.566,0,0,1,4.1,150.674V128.221a2.119,2.119,0,0,1,4.238,0v15.786a10.587,10.587,0,0,0-1.177,1.016,2.051,2.051,0,0,0,0,2.9l9.229,9.229a2.051,2.051,0,1,0,2.9-2.9l-7.543-7.543a6.511,6.511,0,0,1,7.477,1.2l8.206,8.137a4.816,4.816,0,0,1,1.416,3.4v11.78Z"
                            transform="translate(0 -105.32)"
                          />
                          <path
                            id="Path_238"
                            data-name="Path 238"
                            d="M297.728,122a6.228,6.228,0,0,0-6.221,6.221V142.16a10.6,10.6,0,0,0-9.672,2.831l-8.206,8.137a8.944,8.944,0,0,0-2.629,6.31V173.27a2.051,2.051,0,0,0,2.051,2.051h15.685a2.051,2.051,0,0,0,2.051-2.051v-4.747l9.7-9.576a11.694,11.694,0,0,0,3.458-8.272V128.221A6.228,6.228,0,0,0,297.728,122Zm2.119,28.674a7.566,7.566,0,0,1-2.238,5.352L287.3,166.205a2.051,2.051,0,0,0-.61,1.46v3.554H275.1V159.438a4.816,4.816,0,0,1,1.416-3.4l8.206-8.137a6.51,6.51,0,0,1,7.477-1.2l-7.543,7.543a2.051,2.051,0,0,0,2.9,2.9l9.229-9.229a2.051,2.051,0,0,0,0-2.9,10.617,10.617,0,0,0-1.177-1.016V128.221a2.119,2.119,0,0,1,4.238,0Z"
                            transform="translate(-233.949 -105.32)"
                          />
                          <path
                            id="Path_239"
                            data-name="Path 239"
                            d="M168.051,34.863h20.508a2.051,2.051,0,0,0,2.051-2.051V26.66a12.325,12.325,0,0,0-7.952-11.509,8.2,8.2,0,1,0-8.705,0A12.325,12.325,0,0,0,166,26.66v6.152A2.051,2.051,0,0,0,168.051,34.863ZM178.3,4.1a4.1,4.1,0,1,1-4.1,4.1A4.106,4.106,0,0,1,178.3,4.1ZM170.1,26.66a8.2,8.2,0,0,1,16.406,0v4.1H170.1Z"
                            transform="translate(-143.305)"
                          />
                        </g>
                      </g>
                      {/* </g> */}
                    </svg>
                  </span>
                  <span style={{ paddingTop: "2px" }}>
                    <FormattedMessage id={"community"} />
                  </span>
                  <span className="drop-down-community">
                    {/* <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15">
                  <defs>
                    <clipPath id="clip-Down">
                      <rect width="16" height="15"/>
                    </clipPath>
                  </defs>
                  <g id="Down" clipPath="url(#clip-Down)">
                    <path id="XMLID_19_" d="M.689,0,0,.689,7.237,7.927,0,15.164l.689.689L8.616,7.927Z" transform="translate(15.853 3) rotate(90)"/>
                  </g>
                </svg> */}
                    <svg width="16" height="15" viewBox="0 0 16 15">
                      <defs>
                        <clipPath id="clip-Down">
                          <rect width="16" height="15" />
                        </clipPath>
                      </defs>
                      <g id="Down" clipPath="url(#clip-Down)">
                        <path
                          id="XMLID_19_"
                          d="M.689,0,0,.689,7.237,7.927,0,15.164l.689.689L8.616,7.927Z"
                          transform="translate(15.853 3) rotate(90)"
                        />
                      </g>
                    </svg>
                  </span>
                </a>
              </li>
           
          </ul>
          <CommunityLinks />
        </div>
        <div
          className={
            // props.location.pathname.includes("market") ||
            props.location.pathname === "/" &&
            window.innerWidth >= 920 &&
            window.innerWidth <= 1120
              ? "bottom-price small-header-hide"
              : "bottom-price"
          }
        >
          <div className="social-links pl-4 d-none">
            
            <a
              onClick={() => {
                showToggleCommunity = false;
              }}
              target="_blank"
              href="#"
            >
              <span>
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <g>
                      <path
                        d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016
                      c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992
                      c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056
                      c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152
                      c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792
                      c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44
                      C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568
                      C480.224,136.96,497.728,118.496,512,97.248z"
                      />
                    </g>
                  </g>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const Sidebar = withRouter(Side);

const mapDispatchToProps = {
  setMetaMask,
  setContract,
  deleteContract,
  deleteMetaMask,

  setApprovalForAlia,
  setApprovalForLp,
  setDecimalsForAlia,
  setDecimalsForLp,
  deleteApprovalForAlia,
  deleteApprovalForLp,
  deleteDecimalsForAlia,
  deleteDecimalsForLp,

  setValuesForAliaPrice,
  setLPCirSupp,

  setTotalStakes,
  setTotalFarms,

  setAPYAlia,
  setAPYLp,
};

const mapStateToProps = (state, ownProps) => {
  return {
    metaMaskAddress: state.metaMaskReducer.metaMaskAddress,
    contract: state.metaMaskReducer.contract,
    bnbPriceDollar: state.metaMaskReducer.bnbPriceDollar,
    aliaBNBPriceDollar: state.metaMaskReducer.aliaBNBPriceDollar,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

function CommunityLinks() {
  return (
    <ul className="sidebar-links subNav">     
      
        <li style={{ fontSize: "1.1em", fontWeight: "bold" }}>
          <a
            onClick={() => {
              showToggleCommunity = false;
            }}
            className="nav-icon"
            target="_blank"
            href="https://twitter.com/hubstractArt"
          >
            <span>
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path
                      d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016
                      c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992
                      c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056
                      c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152
                      c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792
                      c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44
                      C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568
                      C480.224,136.96,497.728,118.496,512,97.248z"
                    />
                  </g>
                </g>
              </svg>
            </span>
            <span style={{ paddingTop: "2px" }}>
              <FormattedMessage id={"twitter"} />
            </span>
          </a>
        </li>
        <li style={{ fontSize: "1.1em", fontWeight: "bold" }}>
          <a
            onClick={() => {
              showToggleCommunity = false;
            }}
            className="nav-icon"
            target="_blank"
            href="https://t.me/hubstract"
          >
            <span>
              <svg
                id="Bold"
                enableBackground="new 0 0 24 24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z" />
              </svg>
            </span>
            <span style={{ paddingTop: "2px" }}>
              <FormattedMessage id={"telegram"} />
            </span>
          </a>
        </li>
    </ul>
  );
}

function MarketLinks(props) {
  return (
    <ul className={"sidebar-links subNav " + props.cls}>
      <li style={{ fontSize: "1.1em", fontWeight: "bold" }}>
        <a
          onClick={() => {
            showToggleCommunity = false;
          }}
          className="nav-icon"
          target="_blank"
          href="https://twitter.com/hubstractArt"
        >
          <span>
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
            >
              <g>
                <g>
                  <path
                    d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016
                      c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992
                      c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056
                      c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152
                      c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792
                      c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44
                      C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568
                      C480.224,136.96,497.728,118.496,512,97.248z"
                  />
                </g>
              </g>
            </svg>
          </span>
          <span style={{ paddingTop: "2px" }}>
            <FormattedMessage id={"twitter"} />
          </span>
        </a>
      </li>
      <li style={{ fontSize: "1.1em", fontWeight: "bold" }}>
        <a
          onClick={() => {
            showToggleCommunity = false;
          }}
          className="nav-icon"
          target="_blank"
          href="https://t.me/hubstract"
        >
          <span>
            <svg
              id="Bold"
              enableBackground="new 0 0 24 24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z" />
            </svg>
          </span>
          <span style={{ paddingTop: "2px" }}>
            <FormattedMessage id={"telegram"} />
          </span>
        </a>
      </li>
    </ul>
    
  );
}