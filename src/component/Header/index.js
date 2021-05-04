/**
 * HomePage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from "react";
import "./header.scss";
import { Navbar, Button, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Logo from "assets/medium.png"
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
  setLanguage,
  setProvider,
} from "../../_actions/metaMaskActions";

import { showNotification } from "../Notifications/showNotification";
import NotAvailableDialog from "./notAvailableDialog.js";
import AlreadyConnectedDialog from "./alreadyConnectedDialog";
import sampleAbi from "../../config/abi/sample";
import LpAbi from "../../config/abi/LpAbi";
import AliaAbi from "../../config/abi/AliaAbi";
import StakingAbiTestNet from "../../config/abi/StakingAbiTestNet";
import panCakeSwapAbi from "../../config/abi/panCakeSwapAbi";
import aliaBNBReserveAbi from "../../config/abi/aliaBNBReserveAbi";

import sampleAddress from "../../config/contractAddress/sample";
import LPTokenAdd from "../../config/contractAddress/LPTokenAdd";
import AliaTokenAdd from "../../config/contractAddress/AliaTokenAdd";
import StakingContractAddTestNet from "../../config/contractAddress/StakingContractAddTestNet";
import pancakeSwapAdd from "../../config/contractAddress/pancakeSwapAdd";
import aliaBNBReserveAdd from "../../config/contractAddress/aliaBNBReserveAdd";

import { getAliaDecimals, getLpDecimals } from "../../contractCalls/decimals";
import {
  getAliaAllowance,
  getLpAllowance,
} from "../../contractCalls/allowance";

import UnlockButton from "./UnlockButton.js";

const Web3 = require("web3");

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      back: false,
      showFlag: false,
      showSpinner: true,
      selectedFlag: "https://cdn.xanalia.com/assets/images/en.svg",
      unSelectedFlag: "https://cdn.xanalia.com/assets/images/ko.svg",
      unSelectedFlag1: "https://cdn.xanalia.com/assets/images/ja.svg",
      unSelectedFlag2: "https://cdn.xanalia.com/assets/images/zh-hant.png",
      selectedLang: localStorage.getItem("lang") || "en",

      open: false,
      showModal: false,

      showConnectedModal: false,

      showWalletConnectDialog: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.change = this.change.bind(this);
    // this.onClickFlag = this.onClickFlag.bind(this);
    this.clickShowFun = this.clickShowFun.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.hideConnectedModal = this.hideConnectedModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  addContract(calledFor, provider = null) {
    let web3, web3ForAliaPrice;
    if (
      calledFor === "metamask" &&
      Web3.givenProvider &&
      Web3.givenProvider.networkVersion === binanceMainNet &&
      Web3.givenProvider.networkVersion === binanceTestNet
    ) {
      web3 = new Web3(Web3.givenProvider);
      // console.log(Web3.givenProvider.chainId);
      this.props.setProvider(Web3.givenProvider);
    } else if (
      calledFor === "binanceSmartChain" &&
      window.BinanceChain !== "undefined" &&
      parseInt(window.BinanceChain.chainId).toString() === binanceMainNet &&
      parseInt(window.BinanceChain.chainId).toString() === binanceTestNet
    ) {
      web3 = new Web3(window.BinanceChain);
      this.props.setProvider(window.BinanceChain);
    } else if (calledFor === "walletConnect") {
      web3 = new Web3(provider);
      this.props.setProvider({ ...provider });
    } else {
      web3 = new Web3(providerUrl);
    }

    web3ForAliaPrice = new Web3(providerUrlForAliaPrice);

    let sampleContract = new web3.eth.Contract(sampleAbi, sampleAddress);
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
      sampleContract,
      lpContract,
      aliaContract,
      stakingContract,
      panCakeSwapContract,
      aliaBNBReserveContract,
    };
    this.props.setContract(obj);

    return obj;
  }

  clearReducer() {
    this.props.setMetaMask("");
    this.props.setContract("");
    this.props.deleteApprovalForLp(false);
    this.props.deleteApprovalForAlia(false);
    this.props.deleteDecimalsForAlia("");
    this.props.deleteDecimalsForLp("");
  }

  setDecimalsAndApproval(contract, metaMaskAddress) {
    getLpDecimals(contract, this.props.setDecimalsForLp);
    getAliaDecimals(contract, this.props.setDecimalsForAlia);
    getLpAllowance(metaMaskAddress, contract, this.props.setApprovalForLp);
    getAliaAllowance(metaMaskAddress, contract, this.props.setApprovalForAlia);
  }

  async connectWithWalletMetaMask(calledFor = "connected") {
    if (window.screen.width > 768) {
      let web3, ethereum;
      if (typeof window.ethereum !== "undefined") {
        ethereum = window.ethereum;
        // console.log(ethereum.networkVersion);
        if (ethereum.networkVersion !== binanceMainNet) {
          showNotification(
            document.getElementById("changeBlockChain").innerHTML,
            document.getElementById("selectBianceSmartChain").innerHTML,
            "danger",
            4000
          );
          return;
        }
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        localStorage.setItem("accounts", accounts[0]);
        localStorage.setItem("connectedWith", "metamask");

        if (accounts.length > 0) {
          // console.log("accounts", accounts[0]);
          this.props.setMetaMask(accounts[0]);
          if (calledFor === "accountChanged") {
            // showNotification(
            //   "Connected",
            //   "You have been connected with your new account.",
            //   "success",
            //   3000
            // );
          } else {
            // showNotification(
            //   document.getElementById("connected").innerHTML,
            //   document.getElementById("metamaskConnected").innerHTML,
            //   "success",
            //   3000
            // );
          }
        }

        if (accounts.length === 0) {
          this.clearReducer();
          showNotification(
            document.getElementById("disConnected").innerHTML,
            document.getElementById("disconnectMetamask").innerHTML,
            "danger",
            4000
          );
        }

        ethereum.on("networkChanged", (accounts) => {
          // console.log(accounts);
          // this.clearReducer();
          this.addContract("metamask");
          this.props.setMetaMask("");
          if (accounts !== binanceTestNet) {
            showNotification(
              document.getElementById("disConnected").innerHTML,
              document.getElementById("disconnectMetamaskWithBiance").innerHTML,
              "danger",
              4000
            );
          }
        });

        if (
          Web3.givenProvider &&
          Web3.givenProvider.networkVersion === binanceMainNet &&
          Web3.givenProvider.networkVersion === binanceTestNet
        ) {
          web3 = new Web3(Web3.givenProvider);
        } else {
          web3 = new Web3(providerUrl);
        }

        const newContract = this.addContract("metamask");
        this.setDecimalsAndApproval(newContract, accounts[0]);
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      } else {
        this.clearReducer();

        showNotification(
          document.getElementById("error").innerHTML,
          document.getElementById("metamaskExtensionError").innerHTML,
          "danger",
          4000
        );
      }
    } else {
      this.setState({ showModal: true });
      return;
    }
  }

  async connectWithWalletWithBinance(calledFor = "connected") {
    setTimeout(async () => {
      if (window.screen.width > 768) {
        let web3, ethereum;
        if (typeof window.BinanceChain !== "undefined") {
          ethereum = window.BinanceChain;
          if (parseInt(ethereum.chainId, 16).toString() !== binanceMainNet) {
            showNotification(
              document.getElementById("changeBlockChain").innerHTML,
              document.getElementById("selectBianceSmartChain").innerHTML,
              "danger",
              4000
            );
            return;
          }
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          localStorage.setItem("accounts", accounts[0]);
          localStorage.setItem("connectedWith", "binanceSmartChain");
          if (accounts.length > 0) {
            // console.log("accounts", accounts[0]);
            this.props.setMetaMask(accounts[0]);
            if (calledFor === "accountChanged") {
            } else {
              // showNotification(
              //   document.getElementById("connected").innerHTML,
              //   document.getElementById("metamaskConnected").innerHTML,
              //   "success",
              //   3000
              // );
            }
          }

          if (accounts.length === 0) {
            this.clearReducer();
            showNotification(
              document.getElementById("disConnected").innerHTML,
              document.getElementById("disconnectMetamask").innerHTML,
              "danger",
              4000
            );
          }

          ethereum.on("chainChanged", () => {
            this.addContract("binanceSmartChain");
            this.props.setMetaMask("");
            if (parseInt(ethereum.chainId, 16).toString() !== binanceTestNet) {
              this.clearReducer();
              showNotification(
                document.getElementById("disConnected").innerHTML,
                document.getElementById("disconnectMetamaskWithBiance")
                  .innerHTML,
                "danger",
                4000
              );
            }
          });

          if (
            Web3.givenProvider &&
            Web3.givenProvider.networkVersion === binanceMainNet &&
            Web3.givenProvider.networkVersion === binanceTestNet
          ) {
            web3 = new Web3(Web3.givenProvider);
          } else {
            web3 = new Web3(providerUrl);
          }

          const newContract = this.addContract("binanceSmartChain");
          this.setDecimalsAndApproval(newContract, accounts[0]);
        } else if (window.web3) {
          web3 = new Web3(window.web3.currentProvider);
        } else {
          this.clearReducer();
          showNotification(
            document.getElementById("error").innerHTML,
            document.getElementById("metamaskExtensionError").innerHTML,
            "danger",
            4000
          );
        }
      } else {
        this.setState({ showModal: true });
        return;
      }
    }, 0);
  }

  async connectWithWalletConnect(provider) {
    // try {
    //   const provider = new WalletConnectProvider({
    //     rpc: {
    //       56: "https://bsc-dataseed.binance.org/",
    //       // 97: "https://data-seed-prebsc-1-s1.binance.org:8545",
    //     },
    //     bridge: "https://bridge.walletconnect.org",
    //     qrcode: true,
    //     pollingInterval: 12000,
    //   });
    //   await provider.enable();
    //   console.log(provider);
    //   if (provider.chainId.toString() !== binanceMainNet) {
    //     return;
    //   }
    //   localStorage.setItem("accounts", provider.accounts[0]);
    //   localStorage.setItem("connectedWith", "walletConnect");
    //   this.props.setMetaMask(provider.accounts[0]);
    //   const newContract = this.addContract("walletConnect", provider);
    //   this.setDecimalsAndApproval(newContract, provider.accounts[0]);
    // } catch (err) {
    //   console.log(err);
    // }
    localStorage.setItem("accounts", provider.accounts[0]);
    localStorage.setItem("connectedWith", "walletConnect");
    this.props.setMetaMask(provider.accounts[0]);
    const newContract = this.addContract("walletConnect", provider);
    this.setDecimalsAndApproval(newContract, provider.accounts[0]);
  }

  connectWithWallet(calledFor) {
    if (calledFor === "binanceSmartChain") {
      this.connectWithWalletWithBinance();
    } else if (calledFor === "metamask") {
      this.connectWithWalletMetaMask();
    } else if (calledFor === "walletConnect") {
      // this.connectWithWalletConnect();
    }

    this.setState({ showWalletConnectDialog: false });
  }

  goBack() {
    this.setState({ back: true });
  }
  handleClickOutside(event) {
    // console.log(this.state.showFlag);
    if (event.target.className === "lang-flag") {
      this.setState({ showFlag: true });
    } else if (event.target.className === "lang-flag flag-img") {
    } else {
      this.setState({ showFlag: false });
    }
    // console.log('click')
    // if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
    //   alert('You clicked outside of me!');
    // }
  }
  componentDidUpdate() {
    window.onclick = function (event) {
      if (false) {
        // if (event.target.id == 'flag') {
        //   this.setState({ showFlag: false });
        // }
      }
    };
  }

  handleShowSpinner = () => {
    setTimeout(() => {
      this.setState({ showSpinner: false });
    }, 1000);
  };

  componentDidMount(preProps) {
    const account = localStorage.getItem("accounts");
    const userlogout = localStorage.getItem("logout");
    const disconnect = localStorage.getItem("disconnect");
    this.handleShowSpinner();
    if (this.state.selectedLang === "en") {
      this.setState({
        selectedFlag: "https://cdn.xanalia.com/assets/images/en.svg",
        unSelectedFlag: "https://cdn.xanalia.com/assets/images/ko.svg",
        unSelectedFlag1: "https://cdn.xanalia.com/assets/images/ja.svg",
        unSelectedFlag2: "https://cdn.xanalia.com/assets/images/zh-hant.png",
      });

      // const hol = this.props.setLanguage("ko");
      //localStorage.setItem("lang", "ko");
    } else if (this.state.selectedLang === "ko") {
      this.setState({
        selectedFlag: "https://cdn.xanalia.com/assets/images/ko.svg",
        unSelectedFlag: "https://cdn.xanalia.com/assets/images/en.svg",
        unSelectedFlag1: "https://cdn.xanalia.com/assets/images/ja.svg",
        unSelectedFlag2: "https://cdn.xanalia.com/assets/images/zh-hant.png",
      });
    } else if (this.state.selectedLang === "ja") {
      this.setState({
        selectedFlag: "https://cdn.xanalia.com/assets/images/ja.svg",
        unSelectedFlag: "https://cdn.xanalia.com/assets/images/en.svg",
        unSelectedFlag1: "https://cdn.xanalia.com/assets/images/ko.svg",
        unSelectedFlag2: "https://cdn.xanalia.com/assets/images/zh-hant.png",
      });
    } else if (this.state.selectedLang === "zh-hans") {
      this.setState({
        selectedFlag: "https://cdn.xanalia.com/assets/images/zh-hant.png",
        unSelectedFlag: "https://cdn.xanalia.com/assets/images/en.svg",
        unSelectedFlag1: "https://cdn.xanalia.com/assets/images/ko.svg",
        unSelectedFlag2: "https://cdn.xanalia.com/assets/images/ja.svg",
      });
    }

    setInterval(() => {
      let web3 = "";
      if (typeof window.ethereum !== "undefined") {
        web3 = new Web3(Web3.givenProvider);
      }
      if (web3 !== "") {
        web3.eth
          .getAccounts()
          .then((acc) => {
            if (
              acc.length === 0 &&
              localStorage.getItem("userConnected") === "true" &&
              localStorage.getItem("connectedWith") === "metamask"
            ) {
              localStorage.removeItem("userConnected");
              localStorage.removeItem("connectedWith");
              window.location.reload();
            }
          })
          .catch((e) => {
            // console.log(e);
          });
      }
    }, 1000);
    document.addEventListener("mousedown", this.handleClickOutside);

    if (localStorage.getItem("userConnected") === "true") {
      setTimeout(() => {
        // document.getElementById("connectWallet").click();
        const connectedWith = localStorage.getItem("connectedWith");
        if (connectedWith === "metamask") {
          this.connectWithWallet("metamask");
        } else if (connectedWith === "binanceSmartChain") {
          this.connectWithWallet("binanceSmartChain");
        } else if (connectedWith === "walletConnect") {
          this.connectWithWallet("walletConnect");
        }
      }, 600);
    }

    const shouldShow = window?.location?.pathname
    document.getElementById("mySidenav").classList.add("showClass");
    shouldShow !== "/admin" && document.getElementById("hamburger").classList.add("blue");
    document.getElementById("overlay").classList.remove("overlay");
    window.addEventListener("resize", this.updateDimensions, this.resize);
    window.addEventListener("resize", this.resize);
    if (window.innerWidth <= 1021) {
      document.getElementById("mySidenav").classList.add("hideClass");
      document.getElementById("mySidenav").classList.remove("showClass");
      shouldShow !== "/admin" && document.getElementById("hamburger").classList.remove("blue");
      document.getElementById("overlay").classList.remove("overlay");
    }

    if (!this.props.metaMaskAddress && !account && !userlogout) {
      this.setState({ showWalletConnectDialog: true });
    } else if (userlogout || disconnect) {
      localStorage.removeItem("logout");
      // localStorage.removeItem("disconnect");
    }
  }

  updateDimensions() {
    const shouldShow = window?.location?.pathname;
    if (window.innerWidth <= 1020) {
      document.getElementById("mySidenav").classList.add("hideClass");
      document.getElementById("mySidenav").classList.remove("showClass");
      shouldShow !== "/admin" && document.getElementById("hamburger").classList.remove("blue");
      document.getElementById("overlay").classList.remove("overlay");
    }
  }

  handleOpen() {
    const shouldShow = window?.location?.pathname;
    document.getElementById("overlay").classList.add("overlay");
    document.getElementById("mySidenav").classList.remove("hideClass");
    document.getElementById("mySidenav").classList.add("showClass");
    shouldShow !== "/admin" && document.getElementById("hamburger").classList.add("blue");
  }

  resize() {
    const shouldShow = window?.location?.pathname;
    if (window.innerWidth > 1020) {
      document.getElementById("mySidenav").classList.add("showClass");
      shouldShow !== "/admin" && document.getElementById("hamburger").classList.add("blue");
      document.getElementById("mySidenav").classList.remove("hideClass");
      document.getElementById("overlay").classList.remove("overlay");
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    window.removeEventListener("resize", this.resize.bind(this));
  }

  change(option) {
    // localStorage.setItem('lang', option);
    localStorage.setItem("lang", option.target.value);
    this.props.setLanguage(option.target.value);
    // this.setState({showFlag: false})
    // window.location.reload();
  }
  clickShowFun(icon) {
    if (icon === "https://cdn.xanalia.com/assets/images/en.svg") {
      const ab1 = this.setState({
        selectedLang: "en",
        showFlag: !this.state.showFlag,
        selectedFlag: "https://cdn.xanalia.com/assets/images/en.svg",
        unSelectedFlag: "https://cdn.xanalia.com/assets/images/ko.svg",
        unSelectedFlag1: "https://cdn.xanalia.com/assets/images/ja.svg",
        unSelectedFlag2: "https://cdn.xanalia.com/assets/images/zh-hant.png",
      });

      const hol = this.props.setLanguage("en");
      localStorage.setItem("lang", "en");
    } else if (icon === "https://cdn.xanalia.com/assets/images/ko.svg") {
      const ab = this.setState({
        selectedLang: "ko",
        selectedFlag: "https://cdn.xanalia.com/assets/images/ko.svg",
        unSelectedFlag: "https://cdn.xanalia.com/assets/images/en.svg",
        unSelectedFlag1: "https://cdn.xanalia.com/assets/images/ja.svg",
        unSelectedFlag2: "https://cdn.xanalia.com/assets/images/zh-hant.png",
        showFlag: false,
      });

      const hol = this.props.setLanguage("ko");
      localStorage.setItem("lang", "ko");
    } else if (icon === "https://cdn.xanalia.com/assets/images/ja.svg") {
      const ab = this.setState({
        selectedLang: "ja",
        selectedFlag: "https://cdn.xanalia.com/assets/images/ja.svg",
        unSelectedFlag: "https://cdn.xanalia.com/assets/images/en.svg",
        unSelectedFlag1: "https://cdn.xanalia.com/assets/images/ko.svg",
        unSelectedFlag2: "https://cdn.xanalia.com/assets/images/zh-hant.png",
        showFlag: false,
      });

      const hol = this.props.setLanguage("ja");
      localStorage.setItem("lang", "ja");
    } else if (icon === "https://cdn.xanalia.com/assets/images/zh-hant.png") {
      const ab = this.setState({
        selectedLang: "zh-hant",
        selectedFlag: "https://cdn.xanalia.com/assets/images/zh-hant.png",
        unSelectedFlag: "https://cdn.xanalia.com/assets/images/en.svg",
        unSelectedFlag1: "https://cdn.xanalia.com/assets/images/ko.svg",
        unSelectedFlag2: "https://cdn.xanalia.com/assets/images/ja.svg",
        showFlag: false,
      });

      const hol = this.props.setLanguage("zh-hans");
      localStorage.setItem("lang", "zh-hans");
    }
  }

  handleConnectedButton() {
    this.setState({ showConnectedModal: true });
  }

  hideConnectedModal() {
    this.setState({ showConnectedModal: false });
  }

  async handleLogout(should) {
    localStorage.removeItem("userConnected");
    localStorage.removeItem("connectedWith");
    localStorage.removeItem("accounts");
    localStorage.removeItem("walletconnect");
    localStorage.removeItem("connectorId");
    localStorage.setItem("logout", true);
    localStorage.setItem("disconnect", true);
    // window.location.reload()
    const disconnect = localStorage.getItem("disconnect");

    this.hideConnectedModal();
    if (disconnect) {
      setTimeout(() => {
        !should && window.location.reload();
      }, 2000);
    }
  }

  render() {
    const user = localStorage.getItem("accounts");
    const disconnect = localStorage.getItem("logout");
    window.ethereum !== undefined &&
      window.ethereum.on("accountsChanged", (acc) => {
        if (this.props.metaMaskAddress !== "" && acc.length > 0) {
          this.connectWithWallet("metamask");
        }
        if (acc.length === 0) {
          this.handleLogout();
        }
      });
    window.BinanceChain !== undefined &&
      window.BinanceChain.on("accountsChanged", (acc) => {
        if (this.props.metaMaskAddress !== "" && acc.length > 0) {
          this.connectWithWallet("binanceSmartChain");
        }
        if (acc.length === 0) {
          this.handleLogout(true);
        }
      });

    const shouldShow = window?.location?.pathname;
    return (
      <React.Fragment>
        {disconnect && (
          <div className="walletDisconnect  w3-container w3-center w3-animate-top">
            Wallet has been disconnected.
          </div>
        )}
        <p style={{ display: "none" }} id="error">
          {" "}
          <FormattedMessage id="error" />
        </p>
        <p style={{ display: "none" }} id="metamaskExtensionError">
          {" "}
          <FormattedMessage id="metamaskExtensionError" />
        </p>
        <p style={{ display: "none" }} id="changeBlockChain">
          {" "}
          <FormattedMessage id="changeBlockChain" />
        </p>
        <p style={{ display: "none" }} id="selectBianceSmartChain">
          {" "}
          <FormattedMessage id="selectBianceSmartChain" />
        </p>
        <p style={{ display: "none" }} id="connected">
          {" "}
          <FormattedMessage id="connected" />
        </p>
        <p style={{ display: "none" }} id="metamaskConnected">
          {" "}
          <FormattedMessage id="metamaskConnected" />
        </p>
        <p style={{ display: "none" }} id="disConnected">
          {" "}
          <FormattedMessage id="disConnected" />
        </p>
        <p style={{ display: "none" }} id="disconnectMetamask">
          {" "}
          <FormattedMessage id="disconnectMetamask" />
        </p>
        <p style={{ display: "none" }} id="disconnectMetamaskWithBiance">
          {" "}
          <FormattedMessage id="disconnectMetamaskWithBiance" />
        </p>
        <p style={{ display: "none" }} id="accountChanged">
          {" "}
          <FormattedMessage id="accountChanged" />
        </p>
        <p style={{ display: "none" }} id="changeAccountConnectAgain">
          {" "}
          <FormattedMessage id="changeAccountConnectAgain" />
        </p>

        <Navbar collapseOnSelect className="header">
          {shouldShow !== "/admin" &&
            <svg
              id="hamburger"
              viewBox="0 0 24 24"
              onClick={() => this.handleOpen()}
              width="24px"
              color="textSubtle"
              xmlns="http://www.w3.org/2000/svg"
              className="sc-bdfBwQ ewCGLh hamburger"
            >
              <path d="M4 18H20C20.55 18 21 17.55 21 17C21 16.45 20.55 16 20 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM4 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM3 7C3 7.55 3.45 8 4 8H20C20.55 8 21 7.55 21 7C21 6.45 20.55 6 20 6H4C3.45 6 3 6.45 3 7Z"></path>
            </svg>
          }
          <div className="row" style={{ width: "100%" }}>
            <div className="col-4 logo">
              <NavLink to="/home">
                <img src={Logo} className="pl-sm-3 " alt=""  width={100}/>
              </NavLink>
            </div>

            <div className="col-8 pt-sm-1">
              <div className="row">
              
                <div
                  className="col-xs-12"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <div className="my-2 connect-wallet-section">
                    {/* <select
                       className="custom-select pull right"
                       onChange={this.change}
                       value={this.props.language}
                     >
                       <option value="en">English </option>
                       <option value="ko">코렌</option>
                     </select> */}
                    
                  </div>
                 
                  {this.props.onClickSignUp ? (
                    <Button
                      variant="light"
                      className="m-2"
                      onClick={() => this.props.onClickSignUp()}
                    >
                      Sign up
                    </Button>
                  ) : this.props.onClickLogin ? (
                    <Button
                      variant="outline-primary"
                      className="m-2"
                      onClick={() => this.props.onClickLogin()}
                    >
                      Login
                    </Button>
                  ) : this.props.metaMaskAddress && user ? (
                    <Button
                      variant="outline-primary"
                      className="m-2"
                      onClick={() => {
                        this.handleConnectedButton();
                      }}
                    >
                      <FormattedMessage id={"connected"} />
                    </Button>
                  ) : this.state.showSpinner ? (
                    <Button
                      variant="primary"
                      style={{ width: "103.39px" }}
                      className="my-2"
                    >
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </Button>
                  ) : (
                    // <Button
                    //   variant="outline-primary"
                    //   className="my-2"
                    //   onClick={() =>
                    //     this.setState({ showWalletConnectDialog: true })
                    //   }
                    //   id="connectWallet"
                    // >
                    //   {" "}
                    //   <FormattedMessage id={"connectWallet"} />
                    // </Button>
                    <UnlockButton
                      connectWithWalletConnect={this.connectWithWalletConnect.bind(
                        this
                      )}
                      connectWithWallet={this.connectWithWallet.bind(this)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Navbar>

        {this.state.showModal ? (
          <NotAvailableDialog
            show={this.state.showModal}
            hideShow={() => this.setState({ showModal: false })}
          />
        ) : undefined}

        {this.state.showConnectedModal ? (
          <AlreadyConnectedDialog
            show={this.state.showConnectedModal}
            hideShow={this.hideConnectedModal}
            userAddress={this.props.metaMaskAddress}
            handleLogout={this.handleLogout}
          />
        ) : undefined}

        {/* {this.state.showWalletConnectDialog ? (
          <WalletSelectDialog
            show={this.state.showWalletConnectDialoga}
            hideShow={() => this.setState({ showWalletConnectDialog: false })}
            connectWithWallet={this.connectWithWallet.bind(this)}
          />
        ) : undefined} */}
      </React.Fragment>
    );
  }
}

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
  setLanguage,
  setProvider,
};

const mapStateToProps = (state, ownProps) => {
  return {
    metaMaskAddress: state.metaMaskReducer.metaMaskAddress,
    contract: state.metaMaskReducer.contract,
    language: state.metaMaskReducer.language,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
