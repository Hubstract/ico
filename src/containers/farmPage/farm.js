import React from "react";
import "./farm-cta.scss";
import { Button, Modal, ProgressBar } from "react-bootstrap";
import { showNotification } from "../../component/Notifications/showNotification";
import { connect } from "react-redux";
import checkWalletConnection from "../../utils/checkWalletConnection";
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
  setTransactionInProgress,
} from "../../_actions/metaMaskActions";

import validateInput from "./validateInputFunction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FormattedMessage } from "react-intl";
import {
  getAliaAllowance,
  getLpAllowance,
} from "../../contractCalls/allowance";

import { isStaging } from "../../config/stagingSetup";
import ValueLoader from "../../component/ValueLoader/valueLoader";
import "./farmpage.scss";
import IcoAbi from "../../config/abi/Ico.js";
import icoAdd from "../../config/contractAddress/ico";
import { divideNo, remaining, buy } from "../../utils/divideByEighteen";
import artAbi from "config/abi/artAbi";
import artAdd from "config/contractAddress/artAdd";
import { providerUrl } from "config/chainIds";

const Web3 = require("web3");

class Farm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      showDialog: false,
      showErrorMsg: false,

      loading: false,
      mainHeading: "",
      msg: "",
      subMsg: "",
      forLoading: false,
      forSuccess: false,

      balanceForLp: "", //value to be added for approval lp
      balanceForAlia: "", //value to be added for approval for alia

      stakingValueLp: "",
      unStakingValueLp: "",

      stakingValueAlia: "",
      unStakingValueAlia: "",

      maxBalanceToBeStakedLp: "",
      maxBalanceToBeStakedAlia: "",

      totalFarms: 0,
      totalStakes: 0,
      farmOf: 0,
      stakeOf: 0,

      farmOfString: "0",
      stakeOfString: "0",

      balanceOfLp: "0",
      balanceOfAlia: "0",

      lpReward: 0,
      aliaReward: 0,

      lpRewardString: "",
      aliaRewardString: "",

      farmRewards: 0,
      stakeRewards: 0,

      farmRewardsString: "",
      stakeRewardsString: "",

      allowanceForLp: "",
      allowanceForAlia: "",

      count: 0,
      showModel: false,

      aliaBNBPriceDollar: 0,
      bnbPriceDollar: 0,

      tvlForLp: "0.00",
      tvlForAlia: "0.00",
      transactionInProgress: false,

      APY_ALIA: 0,
      APY_LP: 0,
      loaderFor: "",

      totalRaised: 0,
      userShare: 0,
      ARTBalance: 0,
    };
  }
  setShow(value) {
    this.setState({ showModel: value });
  }

  setDecimalsAndApproval(contract, metaMaskAddress) {
    getLpAllowance(metaMaskAddress, contract, this.props.setApprovalForLp);
    getAliaAllowance(metaMaskAddress, contract, this.props.setApprovalForAlia);
  }

  hideDialog() {
    this.setState({ showDialog: false });
  }

  handleSuccessResponse(res) {}

  handleErrorTransaction(err) {
    //console.log("err", err);
    this.closeDialog();
    showNotification(
      document.getElementById("error").innerHTML,
      document.getElementById("somethingWentWrong").innerHTML,
      "danger",
      3000
    );
  }

  handleErrorAccount(err) {
    //console.log(err);
    this.closeDialog();
    showNotification(
      document.getElementById("error").innerHTML,
      document.getElementById("errorWhileAccount").innerHTML,
      "danger",
      3000
    );
  }

  handleInProgressTransaction() {
    showNotification(
      document.getElementById("transactionInProgress").innerHTML,
      document.getElementById("transactiobInProcess").innerHTML,
      "info",
      3000
    );
  }

  closeDialog() {
    this.setState({
      loading: false,
      mainHeading: "",
      msg: "",
      subMsg: "",
      forLoading: false,
      forSuccess: false,
    });
  }

  showConfirmationDialog() {
    this.setState({
      loading: true,
      mainHeading: "Waiting For Confirmation",
      msg: "",
      subMsg: "Confirm your transaction in your wallet",
      forLoading: true,
      forSuccess: false,
    });
  }

  onHandleChange(e) {
    var re = /^\d*\.?\d*$/;
    if (re.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleStake(loaderType) {
    if (this.props.transactionInProgress) {
      this.handleInProgressTransaction();
      return;
    }
    if (this.props.selectedTab === "aliabnb") {
      if (!validateInput(this.state.stakingValueLp)) {
        this.setState({ showErrorMsg: true });
        return;
      }
    }
    if (this.props.selectedTab === "alia") {
      if (!validateInput(this.state.stakingValueAlia)) {
        this.setState({ showErrorMsg: true });
        return;
      }
    }
    if (
      checkWalletConnection(this.props.contract, this.props.metaMaskAddress)
    ) {
      this.setState({ loaderFor: loaderType });
      // this.showConfirmationDialog();
      let web3 = new Web3(this.props.provider);
      web3.eth
        .getAccounts()
        .then((acc) => {
          if (this.props.selectedTab === "alia") {
            console.log("acc ", acc);
            this.props.setTransactionInProgress(true);
            let inputVal = this.state.stakingValueAlia;
            if (inputVal.startsWith(".")) {
              inputVal = "0" + inputVal;
            }
            console.log("in 1", inputVal);
            inputVal = buy(inputVal);
            console.log("in 2", inputVal);
            web3.eth
              .sendTransaction({
                to: icoAdd,
                from: acc[0],
                value: web3.utils.toWei(inputVal, "ether"),
              })
              .then((res) => {
                this.props.setTransactionInProgress(false);
                this.setState({ loaderFor: "" });
              })
              .catch((err) => {
                this.props.setTransactionInProgress(false);
                this.setState({ loaderFor: "" });
              });
          }
        })
        .catch((err) => {
          this.props.setTransactionInProgress(false);
          this.handleErrorAccount(err);
          this.setState({ loaderFor: "" });
          this.setDecimalsAndApproval(
            this.props.contract,
            this.props.metaMaskAddress
          );
        });
    }
  }

  componentDidMount() {
    // this.APR(0.4, 100, "LP");
    // this.APR(0.4, 100, "ALIA");

    if (this.props.contract) {
      this.getStats();
    }

    this.intervalId = setInterval(this.timer.bind(this), 6000);
  }

  timer() {
    this.setState({ count: this.state.count + 1 });
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getStats() {
    let web3 = new Web3(providerUrl);
    let icoContract = new web3.eth.Contract(IcoAbi, icoAdd);
    icoContract.methods
      .weiRaised()
      .call()
      .then((res) => {
        console.log("raised ", res);
        let number = divideNo(res);
        this.setState({ totalRaised: number });
      })
      .catch((err) => {
        console.log("raised err ", err);
      });
    if (this.props.metaMaskAddress) {
      icoContract.methods
        .userInfo(this.props.metaMaskAddress)
        .call()
        .then((res) => {
          console.log("info ", res);
          let number = divideNo(res);
          console.log("num ", number);
          this.setState({ userShare: number });
        })
        .catch((err) => {
          console.log("info err ", err);
        });

      let ArtContract = new web3.eth.Contract(artAbi, artAdd);
      ArtContract.methods
        .balanceOf(this.props.metaMaskAddress)
        .call()
        .then((res) => {
          console.log("info ", res);
          let number = divideNo(res);
          console.log("num ", number);
          this.setState({ ARTBalance: number });
        })
        .catch((err) => {
          console.log("info err ", err);
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.count !== prevState.count &&
      this.props.contract &&
      this.props.metaMaskAddress
    ) {
      this.getStats();
    }

    if (this.state.count !== prevState.count) {
      // this.APR(5, 100, "LP");
      // this.APR(5, 100, "ALIA");
    }

    if (
      this.props.metaMaskAddress === "" &&
      this.props.metaMaskAddress !== prevProps.metaMaskAddress
    ) {
      this.setState({
        token: "",
        showDialog: false,
        showErrorMsg: false,

        loading: false,
        mainHeading: "",
        msg: "",
        subMsg: "",
        forLoading: false,
        forSuccess: false,

        balanceForLp: "", //value to be added for approval lp
        balanceForAlia: "", //value to be added for approval for alia

        stakingValueLp: "",
        unStakingValueLp: "",

        stakingValueAlia: "",
        unStakingValueAlia: "",

        maxBalanceToBeStakedLp: "",
        maxBalanceToBeStakedAlia: "",

        totalFarms: 0,
        totalStakes: 0,
        farmOf: 0,
        stakeOf: 0,

        farmOfString: "0",
        stakeOfString: "0",

        balanceOfLp: "0",
        balanceOfAlia: "0",

        lpReward: 0,
        aliaReward: 0,

        lpRewardString: "",
        aliaRewardString: "",

        farmRewards: 0,
        stakeRewards: 0,

        farmRewardsString: "",
        stakeRewardsString: "",

        allowanceForLp: "",
        allowanceForAlia: "",

        count: 0,
        showModel: false,

        aliaBNBPriceDollar: 0,
        bnbPriceDollar: 0,
      });
    }
  }

  findMaxBalance(type) {
    if (
      checkWalletConnection(this.props.contract, this.props.metaMaskAddress) &&
      this.props.metaMaskAddress
    ) {
      if (type === "Stake") {
        let web3 = new Web3(this.props.provider);
        if (this.props.selectedTab === "alia") {
          let icoContract = new web3.eth.Contract(IcoAbi, icoAdd);

          icoContract.methods
            .userInfo(this.props.metaMaskAddress)
            .call()
            .then((res) => {
              console.log("info ", res);
              let number = remaining(res);
              console.log("num ", number);
              this.setState({ stakingValueAlia: number });
            })
            .catch((err) => {
              console.log("info err ", err);
            });
        }
      }
    }
  }

  render() {
    if (this.state.showErrorMsg) {
      setTimeout(() => {
        this.setState({ showErrorMsg: false });
      }, 2000);
    }

    return (
      <React.Fragment>
        <p style={{ display: "none" }} id="error">
          {" "}
          <FormattedMessage id="error" />
        </p>
        <p style={{ display: "none" }} id="success">
          {" "}
          <FormattedMessage id="success" />
        </p>
        <p style={{ display: "none" }} id="tansactionSuccessFull">
          {" "}
          <FormattedMessage id="tansactionSuccessFull" />
        </p>
        <p style={{ display: "none" }} id="somethingWentWrong">
          {" "}
          <FormattedMessage id="somethingWentWrong" />
        </p>
        <p style={{ display: "none" }} id="errorWhileAccount">
          {" "}
          <FormattedMessage id="errorWhileAccount" />
        </p>
        <p style={{ display: "none" }} id="transactionInProgress">
          {" "}
          <FormattedMessage id="transactionInProgress" />
        </p>
        <p style={{ display: "none" }} id="transactiobInProcess">
          {" "}
          <FormattedMessage id="transactiobInProcess" />
        </p>
        <ProgressBar
          now={(parseFloat(this.state.totalRaised) / 333) * 100}
          label={`${(parseFloat(this.state.totalRaised) / 333) * 100}%`}
          style={{ margin: "20px" }}
        />
        <div className="farm-cta">
          <div className="chip-card-list">
            <div className="chip-card-item">
              <h6>Balance</h6>
              <h2>{this.state.ARTBalance}</h2>
            </div>
            <div className="chip-card-item">
              <h6>My Share</h6>
              <h2>{this.state.userShare}</h2>
            </div>
            <div className="chip-card-item">
              <h6>Total Raised</h6>
              <h2>{parseFloat(this.state.totalRaised).toFixed(2)}</h2>
            </div>
          </div>

          <br />
          <div className="form-input-group">
            <div className="form-item input-select">
              <input
                type="text"
                className="form-control"
                name={"stakingValueAlia"}
                onChange={(e) => this.onHandleChange(e)}
                value={this.state.stakingValueAlia}
              />
              <span
                style={{ cursor: "pointer" }}
                onClick={
                  isStaging
                    ? () => this.findMaxBalance("Stake")
                    : () => this.setShow(true)
                }
              >
                <FormattedMessage id={"max"} />
              </span>
            </div>
            <div className="form-item input-select">
              <Button
                block
                variant="primary"
                onClick={
                  isStaging
                    ? () => this.handleStake("stack")
                    : () => this.setShow(true)
                }
              >
                {this.state.loaderFor === "stack" ? <ValueLoader /> : "Buy"}
              </Button>
            </div>
          </div>
        </div>
        {this.state.showModel && (
          <Modal
            show={this.state.showModel}
            onHide={() => this.setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                <FormattedMessage id={"comingSoon"} />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p></p>
            </Modal.Body>
          </Modal>
        )}
        {this.state.showErrorMsg ? (
          <ToastContainer limit={1} style={{ top: "4rem" }} />
        ) : (
          undefined
        )}
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
  deleteApprovalForAlia,
  deleteApprovalForLp,
  setDecimalsForAlia,
  setDecimalsForLp,
  deleteDecimalsForAlia,
  deleteDecimalsForLp,
  setTransactionInProgress,
};

const mapStateToProps = (state, ownProps) => {
  return {
    metaMaskAddress: state.metaMaskReducer.metaMaskAddress,
    provider: state.metaMaskReducer.provider,
    contract: state.metaMaskReducer.contract,
    decimalsForLp: state.metaMaskReducer.decimalsForLp,
    decimalsForAlia: state.metaMaskReducer.decimalsForAlia,
    approvalForLp: state.metaMaskReducer.approvalForLp,
    approvalForAlia: state.metaMaskReducer.approvalForAlia,

    totalFarms: state.metaMaskReducer.totalFarms,
    totalStakes: state.metaMaskReducer.totalStakes,

    aliaBNBPriceDollar: state.metaMaskReducer.aliaBNBPriceDollar,
    bnbPriceDollar: state.metaMaskReducer.bnbPriceDollar,
    noOfAlia: state.metaMaskReducer.noOfAlia,
    noOfBNB: state.metaMaskReducer.noOfBNB,
    circulatingSuppLp: state.metaMaskReducer.circulatingSuppLp,

    transactionInProgress: state.metaMaskReducer.transactionInProgress,

    APR_ALIA: state.metaMaskReducer.APR_ALIA,
    APY_ALIA: state.metaMaskReducer.APY_ALIA,
    APY_LP: state.metaMaskReducer.APY_LP,
    APR_LP: state.metaMaskReducer.APR_LP,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Farm);