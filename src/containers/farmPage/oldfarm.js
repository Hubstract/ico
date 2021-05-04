import React from "react";
import "./farm-cta.scss";

import { Button, Modal } from "react-bootstrap";

import { showNotification } from "../../component/Notifications/showNotification";
import { connect } from "react-redux";
import checkWalletConnection from "../../utils/checkWalletConnection";
import StakingContractAddTestNet from "../../config/contractAddress/StakingContractAddTestNet";

import LoadingDialog from "../../component/loadingDialog/loadingDialog";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FormattedMessage } from "react-intl";
import {
  getAliaAllowance,
  getLpAllowance,
} from "../../contractCalls/allowance";

import { isStaging } from "../../config/stagingSetup";
import insertComma from "../../utils/insertComma";
import { showActualValue } from "../../utils/showActualValue";
import ValueLoader from "../../component/ValueLoader/valueLoader";
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

      balanceOfLp: "",
      balanceOfAlia: "",

      lpReward: 0,
      aliaReward: 0,

      farmRewards: 0,
      stakeRewards: 0,

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
      loaderFor: ''
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

  handleSuccessResponse(res) {
    // this.setState({
    //   loading: true,
    //   mainHeading: "Transaction Submitted",
    //   msg: "Your transaction has been completed",
    //   subMsg: "",
    //   forLoading: false,
    //   forSuccess: true,
    // });
    // showNotification("Success", "Transaction Successful", "success", 3000);
  }

  handleErrorTransaction(err) {
    //console.log("err", err);
    this.closeDialog();
    showNotification(
      "Error",
      "Something went wrong while making the transaction",
      "danger",
      3000
    );
  }

  handleErrorAccount(err) {
    //console.log(err);
    this.closeDialog();
    showNotification(
      "Error",
      "Error while getting your account info",
      "danger",
      3000
    );
  }

  handleInProgressTransaction() {
    showNotification(
      "Transaction in Progress",
      "Transaction is already in process. Complete or Abort it first.",
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
      this.setState({ loaderFor: loaderType })

      // this.showConfirmationDialog();
      var web3 = new Web3(Web3.givenProvider);
      web3.eth
        .getAccounts()
        .then((acc) => {
          if (this.props.selectedTab === "aliabnb") {
            this.props.setTransactionInProgress(true);
            this.props.contract.stakingContract.methods
              .createfarm(web3.utils.toWei(this.state.stakingValueLp, "ether"))
              .send({ from: acc[0] })
              .then((res) => {
                this.props.setTransactionInProgress(false);
                this.setState({ loaderFor: '' })

                this.handleSuccessResponse(res);
                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
                this.setState({ stakingValueLp: "" });
              })
              .catch((err) => {
                this.props.setTransactionInProgress(false);
                this.handleErrorTransaction(err);
                this.setState({ loaderFor: '' })

                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
              });
          } else if (this.props.selectedTab === "alia") {
            this.props.setTransactionInProgress(true);
            this.props.contract.stakingContract.methods
              .createStake(
                web3.utils.toWei(this.state.stakingValueAlia, "ether")
              )
              .send({ from: acc[0] })
              .then((res) => {
                this.props.setTransactionInProgress(false);
                this.handleSuccessResponse(res);
                this.setState({ loaderFor: '' })

                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
                this.setState({ stakingValueAlia: "" });
              })
              .catch((err) => {
                this.props.setTransactionInProgress(false);
                this.handleErrorTransaction(err);
                this.setState({ loaderFor: '' })
                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
              });
          }
        })
        .catch((err) => {
          this.props.setTransactionInProgress(false);
          this.handleErrorAccount(err);
          this.setState({ loaderFor: '' })
          this.setDecimalsAndApproval(
            this.props.contract,
            this.props.metaMaskAddress
          );
        });

    }


  }

  handleUnStake(loaderType) {
    if (this.props.transactionInProgress) {
      this.handleInProgressTransaction();
      return;
    }
    if (this.props.selectedTab === "aliabnb") {
      if (!validateInput(this.state.unStakingValueLp)) {
        this.setState({ showErrorMsg: true });
        return;
      }
    }

    if (this.props.selectedTab === "alia") {
      if (!validateInput(this.state.unStakingValueAlia)) {
        this.setState({ showErrorMsg: true });
        return;
      }
    }
    if (
      checkWalletConnection(this.props.contract, this.props.metaMaskAddress)
    ) {
      this.setState({ loaderFor: loaderType })
      // this.showConfirmationDialog();
      var web3 = new Web3(Web3.givenProvider);
      web3.eth
        .getAccounts()
        .then((acc) => {
          if (this.props.selectedTab === "aliabnb") {
            this.props.setTransactionInProgress(true);
            this.props.contract.stakingContract.methods
              .unFarm(web3.utils.toWei(this.state.unStakingValueLp, "ether"))
              .send({ from: acc[0] })
              .then((res) => {
                this.props.setTransactionInProgress(false);
                this.setState({ loaderFor: '' })
                this.handleSuccessResponse(res);
                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
                this.setState({ unStakingValueLp: "" });
              })
              .catch((err) => {
                this.setState({ loaderFor: '' })
                this.props.setTransactionInProgress(false);
                this.handleErrorTransaction(err);
              });
          } else if (this.props.selectedTab === "alia") {
            this.props.setTransactionInProgress(true);
            this.props.contract.stakingContract.methods
              .unStake(web3.utils.toWei(this.state.unStakingValueAlia, "ether"))
              .send({ from: acc[0] })
              .then((res) => {
                this.props.setTransactionInProgress(false);
                this.setState({ loaderFor: '' })
                this.handleSuccessResponse(res);
                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
                this.setState({ unStakingValueAlia: "" });
              })
              .catch((err) => {
                this.props.setTransactionInProgress(false);
                this.handleErrorTransaction(err);
                this.setState({ loaderFor: '' })
                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
              });
          }
        })
        .catch((err) => {
          this.props.setTransactionInProgress(false);
          this.handleErrorAccount(err);
          this.setState({ loaderFor: '' })
          this.setDecimalsAndApproval(
            this.props.contract,
            this.props.metaMaskAddress
          );
        });

    }
  }

  handleCompound(loaderType) {
    if (this.props.transactionInProgress) {
      this.handleInProgressTransaction();
      return;
    }
    if (
      checkWalletConnection(this.props.contract, this.props.metaMaskAddress)
    ) {
      this.setState({ loaderFor: loaderType })
      // this.showConfirmationDialog();
      var web3 = new Web3(Web3.givenProvider);
      web3.eth
        .getAccounts()
        .then((acc) => {
          if (this.props.selectedTab === "aliabnb") {
            this.props.setTransactionInProgress(true);
            this.props.contract.stakingContract.methods
              .compoundLP()
              .send({ from: acc[0] })
              .then((res) => {
                this.props.setTransactionInProgress(false);
                this.setState({ loaderFor: '' })

                this.handleSuccessResponse(res);
                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
              })
              .catch((err) => {
                this.props.setTransactionInProgress(false);
                this.handleErrorTransaction(err);
                this.setState({ loaderFor: '' })

                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
              });
          } else if (this.props.selectedTab === "alia") {
            this.props.setTransactionInProgress(true);
            this.setState({ loaderFor: '' })

            this.props.contract.stakingContract.methods
              .compound()
              .send({ from: acc[0] })
              .then((res) => {
                this.props.setTransactionInProgress(false);
                this.handleSuccessResponse(res);
                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
              })
              .catch((err) => {
                this.props.setTransactionInProgress(false);
                this.handleErrorTransaction(err);
                this.setState({ loaderFor: '' })

                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
              });
          }
        })
        .catch((err) => {
          this.props.setTransactionInProgress(false);
          this.handleErrorAccount(err);
          this.setState({ loaderFor: '' })

          this.setDecimalsAndApproval(
            this.props.contract,
            this.props.metaMaskAddress
          );
        });
    }
  }

  handleHarvest(loaderType) {
    if (this.props.transactionInProgress) {
      this.handleInProgressTransaction();
      return;
    }

    if (
      checkWalletConnection(this.props.contract, this.props.metaMaskAddress)
    ) {
      this.setState({ loaderFor: loaderType })

      // this.showConfirmationDialog();
      var web3 = new Web3(Web3.givenProvider);
      web3.eth
        .getAccounts()
        .then((acc) => {
          if (this.props.selectedTab === "aliabnb") {
            this.props.setTransactionInProgress(true);
            this.props.contract.stakingContract.methods
              .harvestLP()
              .send({ from: acc[0] })
              .then((res) => {
                this.handleSuccessResponse(res);
                this.setState({ loaderFor: '' })

                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
                this.props.setTransactionInProgress(false);
              })
              .catch((err) => {
                this.setState({ loaderFor: '' })

                this.handleErrorTransaction(err);
                this.props.setTransactionInProgress(false);
              });
          } else if (this.props.selectedTab === "alia") {
            this.props.setTransactionInProgress(true);
            this.props.contract.stakingContract.methods
              .harvest()
              .send({ from: acc[0] })
              .then((res) => {
                this.setState({ loaderFor: '' })

                this.handleSuccessResponse(res);
                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
                this.props.setTransactionInProgress(false);
              })
              .catch((err) => {
                this.setState({ loaderFor: '' })

                this.props.setTransactionInProgress(false);
                this.handleErrorTransaction(err);
                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
              });
          }
        })
        .catch((err) => {
          this.props.setTransactionInProgress(false);
          this.setState({ loaderFor: '' })

          this.handleErrorAccount(err);
          this.setDecimalsAndApproval(
            this.props.contract,
            this.props.metaMaskAddress
          );
        });
    }
  }

  handleApprove(tokenType) {
    if (this.props.transactionInProgress) {
      this.handleInProgressTransaction();
      return;
    }

    if (this.props.selectedTab === "aliabnb") {
      if (!validateInput(this.state.balanceForLp)) {
        this.setState({ showErrorMsg: true });
        return;
      }
    }
    if (this.props.selectedTab === "alia") {
      if (!validateInput(this.state.balanceForAlia)) {
        this.setState({ showErrorMsg: true });
        return;
      }
    }
    if (
      checkWalletConnection(this.props.contract, this.props.metaMaskAddress)
    ) {
      this.setState({ loaderFor: true })

      // this.showConfirmationDialog();
      let appprovalValue = 10000000;

      var web3 = new Web3(Web3.givenProvider);
      web3.eth
        .getAccounts()
        .then((acc) => {
          if (tokenType === "Lp") {
            this.props.setTransactionInProgress(true);
            this.props.contract.lpContract.methods
              .approve(
                StakingContractAddTestNet,
                // web3.utils.toWei(this.state.balanceForLp, "ether")
                web3.utils.toWei(appprovalValue.toString(), "ether")
              )
              .send({ from: acc[0] })
              .then((res) => {
                this.handleSuccessResponse(res);
                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
                this.props.setTransactionInProgress(false);
                this.setState({
                  balanceForLp: "",
                });
              })
              .catch((err) => {
                this.props.setTransactionInProgress(false);
                this.handleErrorTransaction(err);
                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
              });
          } else {
            this.props.setTransactionInProgress(true);
            this.props.contract.aliaContract.methods
              .approve(
                StakingContractAddTestNet,
                web3.utils.toWei(appprovalValue.toString(), "ether")
              )
              .send({ from: acc[0] })
              .then((res) => {
                this.handleSuccessResponse(res);
                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
                this.props.setTransactionInProgress(false);
                this.setState({
                  balanceForAlia: "",
                });
              })
              .catch((err) => {
                this.props.setTransactionInProgress(false);
                this.handleErrorTransaction(err);
                this.setDecimalsAndApproval(
                  this.props.contract,
                  this.props.metaMaskAddress
                );
              });
          }
        })
        .catch((err) => {
          this.props.setTransactionInProgress(false);
          this.handleErrorAccount(err);
          this.setDecimalsAndApproval(
            this.props.contract,
            this.props.metaMaskAddress
          );
        });
      this.setState({ loaderFor: false })

    }

  }

  componentDidMount() {
    this.APR(0.4, 100, "LP");
    this.APR(0.4, 100, "ALIA");
    if (this.props.contract && this.props.metaMaskAddress) {
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
    this.props.contract.stakingContract.methods
      .farmRecords(this.props.metaMaskAddress)
      .call()
      .then((res) => {
        // console.log("farmOf", typeof res, res);
        this.setState({
          farmOf: parseInt(res.farmedAmount),
          tvlForLp: (
            parseInt(res.farmedAmount) *
            this.props.aliaBNBPriceDollar *
            this.props.bnbPriceDollar
          ).toFixed(2),
        });
      })
      .catch((err) => {
        //console.log("err", err);
      });
    this.props.contract.stakingContract.methods
      .totalFarms()
      .call()
      .then((res) => {
        // console.log("totalFarms", typeof res, res);
        this.setState({ totalFarms: parseInt(res) });
      })
      .catch((err) => {
        //console.log("err", err);
      });
    this.props.contract.stakingContract.methods
      .totalStakes()
      .call()
      .then((res) => {
        // console.log("totalStakes", typeof res, res);
        this.setState({ totalStakes: parseInt(res) });
      })
      .catch((err) => {
        //console.log("err", err);
      });
    this.props.contract.stakingContract.methods
      .stakeRecords(this.props.metaMaskAddress)
      .call()
      .then((res) => {
        // console.log("stakeOf", typeof res, res);
        this.setState({
          stakeOf: parseInt(res.stakedAmount),
          tvlForAlia: (
            parseInt(res.stakedAmount) *
            this.props.aliaBNBPriceDollar *
            this.props.bnbPriceDollar
          ).toFixed(2),
        });
      })
      .catch((err) => {
        //console.log("err", err);
      });
    this.props.contract.lpContract.methods
      .balanceOf(this.props.metaMaskAddress)
      .call()
      .then((res) => {
        // console.log("balanceOf LP", typeof res, res);
        this.setState({ balanceOfLp: parseInt(res) });
      })
      .catch((err) => {
        //console.log("err", err);
      });
    this.props.contract.aliaContract.methods
      .balanceOf(this.props.metaMaskAddress)
      .call()
      .then((res) => {
        // console.log("balanceOf Alia", typeof res, res);
        this.setState({ balanceOfAlia: parseInt(res) });
      })
      .catch((err) => {
        //console.log("err", err);
      });
    var web3 = new Web3(Web3.givenProvider);

    this.props.contract.stakingContract.methods
      .calculateRewardLP(this.props.metaMaskAddress)
      .call()
      .then((res) => {
        // console.log("lpStakeReward", typeof res, res);
        // this.setState({
        //   lpReward: parseInt(res) / Math.pow(10, 18),
        // });
        this.setState({
          lpReward: web3.utils.fromWei(res),
        });
      })
      .catch((err) => {
        //console.log("err", err);
      });

    this.props.contract.stakingContract.methods
      .farmRewards(this.props.metaMaskAddress)
      .call()
      .then((res) => {
        // console.log("farmRewards lp", typeof res, res);
        this.setState({
          farmRewards: parseInt(res) / Math.pow(10, 18),
        });
      })
      .catch((err) => {
        //console.log("err", err);
      });

    this.props.contract.stakingContract.methods
      .stakeRewards(this.props.metaMaskAddress)
      .call()
      .then((res) => {
        // console.log("stakeReward alia", typeof res, res);
        this.setState({
          stakeRewards: parseInt(res) / Math.pow(10, 18),
        });
      })
      .catch((err) => {
        //console.log("err", err);
      });

    this.props.contract.stakingContract.methods
      .calculateReward(this.props.metaMaskAddress)
      .call()
      .then((res) => {
        // console.log("aliaStakeReward", typeof res, res);
        // this.setState({
        //   aliaReward: parseInt(res) / Math.pow(10, 18),
        // });
        this.setState({
          aliaReward: web3.utils.fromWei(res),
        });
      })
      .catch((err) => {
        //console.log("err", err);
      });

    this.props.contract.lpContract.methods
      .allowance(this.props.metaMaskAddress, StakingContractAddTestNet)
      .call()
      .then((res) => {
        // console.log("allowance for lp", typeof res, res);
        this.setState({
          allowanceForLp: parseInt(res),
        });
      })
      .catch((err) => {
        //console.log("err", err);
        // showNotification("Error", err.message, "danger", 4000);
      });
    this.props.contract.aliaContract.methods
      .allowance(this.props.metaMaskAddress, StakingContractAddTestNet)
      .call()
      .then((res) => {
        // console.log("allowance for alia", typeof res, res);
        this.setState({
          allowanceForAlia: parseInt(res),
        });
      })
      .catch((err) => {
        //console.log("err", err);
        // showNotification("Error", err.message, "danger", 4000);
      });

    this.props.contract.panCakeSwapContract.methods
      .getReserves()
      .call()
      .then((res) => {
        const bnbPriceDollar = parseInt(res[1]) / parseInt(res[0]);
        this.setState({
          bnbPriceDollar: bnbPriceDollar,
        });
      })
      .catch((err) => {
        //console.log("err bnb price", err);
      });

    this.props.contract.aliaBNBReserveContract.methods
      .getReserves()
      .call()
      .then((res) => {
        const aliaBNBPriceDollar = parseInt(res[0]) / parseInt(res[1]);
        this.setState({
          aliaBNBPriceDollar: aliaBNBPriceDollar,
        });
      })
      .catch((err) => {
        //console.log("err aliaBNBPriceDollar", err);
      });
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
      this.APR(5, 100, "LP");
      this.APR(5, 100, "ALIA");
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

        balanceOfLp: "",
        balanceOfAlia: "",

        lpReward: 0,
        aliaReward: 0,

        farmRewards: 0,
        stakeRewards: 0,

        allowanceForLp: "",
        allowanceForAlia: "",

        count: 0,
        showModel: false,

        aliaBNBPriceDollar: 0,
        bnbPriceDollar: 0,
      });
    }
  }

  handleMaxApprove(calledFor) {
    if (
      checkWalletConnection(this.props.contract, this.props.metaMaskAddress) &&
      this.props.metaMaskAddress
    ) {
      if (calledFor === "lp") {
        let no = this.state.balanceOfLp / Math.pow(10, 18);
        this.setState({
          balanceForLp: showActualValue(no, 8, "string"),
        });
      } else if (calledFor === "alia") {
        let no = this.state.balanceOfAlia / Math.pow(10, 18);
        this.setState({
          balanceForAlia: showActualValue(no, 8, "string"),
        });
      }
    }
  }

  findMaxBalance(type) {
    if (
      checkWalletConnection(this.props.contract, this.props.metaMaskAddress) &&
      this.props.metaMaskAddress
    ) {
      if (type === "Stake") {
        if (this.props.selectedTab === "aliabnb") {
          let no = this.state.balanceOfLp / Math.pow(10, 18);
          this.setState({
            stakingValueLp: showActualValue(no, 18, "string"),
          });
        } else {
          let no = this.state.balanceOfAlia / Math.pow(10, 18);
          this.setState({
            stakingValueAlia: showActualValue(no, 18, "string"),
          });
        }
      } else if (type === "Unstake") {
        if (this.props.selectedTab === "aliabnb") {
          let no = this.state.farmOf / Math.pow(10, 18);
          this.setState({
            unStakingValueLp: showActualValue(no, 18, "string"),
          });
        } else {
          let no = this.state.stakeOf / Math.pow(10, 18);
          this.setState({
            unStakingValueAlia: showActualValue(no, 18, "string").toString(),
          });
        }
      }
    }
  }

  calculateTvlForLp() {
    const aliaPrice = this.props.bnbPriceDollar * this.props.aliaBNBPriceDollar;
    const totalTvl =
      aliaPrice * this.props.noOfAlia +
      this.props.bnbPriceDollar * this.props.noOfBNB;
    const lpPrice = totalTvl / this.props.circulatingSuppLp;
    const tvlLp = lpPrice * (this.props.totalFarms / Math.pow(10, 18));
    // console.log("lpPrice", lpPrice);
    // console.log("tvlLp", tvlLp);
    return tvlLp;
  }

  calculateEstimatedValuesForLp() {
    let poolPencentageForLp = (this.state.farmOf / this.state.totalFarms) * 100;
    let tvlForLp = this.calculateTvlForLp();
    let ForLp = (tvlForLp * poolPencentageForLp) / 100;
    return ForLp;
  }

  calculateEstimatedValuesForAlia() {
    let poolPencentageForAlia =
      (this.state.stakeOf / this.state.totalStakes) * 100;

    let tvlForAlia =
      (this.props.totalStakes / Math.pow(10, 18)) *
      this.props.bnbPriceDollar *
      this.props.aliaBNBPriceDollar;
    let ForAlia = (tvlForAlia * poolPencentageForAlia) / 100;
    return ForAlia;
  }

  // APR(tokenPerBlock, investment, For) {
  //   let priceOfToken =
  //   this.props.bnbPriceDollar * this.props.aliaBNBPriceDollar;

  //     // console.log("priceOfToken", priceOfToken)
  //   let TVL = 0;
  //   if (For === "ALIA") {
  //     // priceOfToken = this.props.bnbPriceDollar * this.props.aliaBNBPriceDollar;
  //     TVL = priceOfToken * (this.props.totalStakes / Math.pow(10, 18));
  //   } else {
  //     let totalTVL =
  //       this.props.bnbPriceDollar *
  //         this.props.aliaBNBPriceDollar *
  //         this.props.noOfAlia +
  //       this.props.bnbPriceDollar * this.props.noOfBNB;
  //     let priceOfTokenForLP = totalTVL / this.props.circulatingSuppLp;
  //     TVL = priceOfTokenForLP * (this.props.totalFarms / Math.pow(10, 18));
  //     // console.log("TVL", TVL)
  //   }

  //   const daysInMonth = 365;
  //   const blockPerDay = 28800;

  //   let valuePercentage;
  //   let price;
  //   let dailyAPR;
  //   let yearlyAPR;
  //   let investmentLocked;
  //   let APY;
  //   if (For == "LP") {
  //     valuePercentage = (tokenPerBlock * 50) / 100;
  //     var LPperDay = blockPerDay * valuePercentage;
  //     price = LPperDay * priceOfToken;
  //     // console.log(price);
  //     dailyAPR = (price / TVL) * 100;
  //     investmentLocked = investment;
  //     for (let i = 0; i < 365; i++) {
  //       investment = (dailyAPR * investment) / 100 + investment;
  //     }
  //     APY = (investment / investmentLocked - 1) * 100;
  //     // console.log(APY);
  //     yearlyAPR = dailyAPR * 365;
  //     // console.log(yearlyAPR);
  //     if (APY !== Infinity) {
  //       this.setState({ APY_LP: isNaN(APY) ? 0 : APY });
  //     }
  //     // console.log(APY);
  //   } else if (For == "ALIA") {
  //     valuePercentage = (tokenPerBlock * 15) / 100;
  //     var ALIAperDay = blockPerDay * valuePercentage;
  //     price = ALIAperDay * priceOfToken;
  //     dailyAPR = (price / TVL) * 100;
  //     investmentLocked = investment;
  //     for (let i = 0; i < 365; i++) {
  //       investment = (dailyAPR * investment) / 100 + investment;
  //     }
  //     APY = (investment / investmentLocked - 1) * 100;
  //     // console.log(APY);
  //     yearlyAPR = dailyAPR * 365;
  //     // console.log("yearlyAPR", isNaN(yearlyAPR));
  //     if (APY !== Infinity) {
  //       this.setState({ APY_ALIA: isNaN(APY) ? 0 : APY });
  //     }
  //     // console.log(APY);
  //   }
  // }

  APR(tokenPerBlock, investment, For) {
    let priceOfToken =
      this.props.bnbPriceDollar * this.props.aliaBNBPriceDollar;

    // console.log("priceOfToken", priceOfToken)
    let TVL = 0;
    if (For === "ALIA") {
      // priceOfToken = this.props.bnbPriceDollar * this.props.aliaBNBPriceDollar;
      TVL = priceOfToken * (this.props.totalStakes / Math.pow(10, 18));
    } else {
      let totalTVL =
        this.props.bnbPriceDollar *
        this.props.aliaBNBPriceDollar *
        this.props.noOfAlia +
        this.props.bnbPriceDollar * this.props.noOfBNB;
      let priceOfTokenForLP = totalTVL / this.props.circulatingSuppLp;
      TVL = priceOfTokenForLP * (this.props.totalFarms / Math.pow(10, 18));
      // console.log("TVL", TVL)
    }
    if (this.props.contract) {
      this.props.contract.stakingContract.methods
        .tokenPerBlocks()
        .call()
        .then((response) => {
          // console.log("res for token per  block", response);
          let res = parseInt(response) / Math.pow(10, 18);
          let priceOfToken =
            this.props.bnbPriceDollar * this.props.aliaBNBPriceDollar;
          let TVL = 0;
          if (For === "ALIA") {
            // priceOfToken = this.props.bnbPriceDollar * this.props.aliaBNBPriceDollar;
            TVL = priceOfToken * (this.props.totalStakes / Math.pow(10, 18));
          } else {
            let totalTVL =
              this.props.bnbPriceDollar *
              this.props.aliaBNBPriceDollar *
              this.props.noOfAlia +
              this.props.bnbPriceDollar * this.props.noOfBNB;
            let priceOfTokenForLP = totalTVL / this.props.circulatingSuppLp;
            TVL =
              priceOfTokenForLP * (this.props.totalFarms / Math.pow(10, 18));
          }

          const daysInMonth = 365;
          const blockPerDay = 28800;

          let valuePercentage;
          let price;
          let dailyAPR;
          let yearlyAPR;
          let investmentLocked;
          let APY;
          if (For == "LP") {
            valuePercentage = (res * 50) / 100;
            var LPperDay = blockPerDay * valuePercentage;
            price = LPperDay * priceOfToken;
            // console.log(price);
            dailyAPR = (price / TVL) * 100;
            investmentLocked = investment;
            for (let i = 0; i < 365; i++) {
              investment = (dailyAPR * investment) / 100 + investment;
            }
            APY = (investment / investmentLocked - 1) * 100;
            // console.log(APY);
            yearlyAPR = dailyAPR * 365;
            // console.log(yearlyAPR);
            if (APY !== Infinity) {
              this.setState({ APY_LP: isNaN(APY) ? 0 : APY });
            }
            // console.log(APY);
          } else if (For == "ALIA") {
            valuePercentage = (res * 15) / 100;
            var ALIAperDay = blockPerDay * valuePercentage;
            price = ALIAperDay * priceOfToken;
            dailyAPR = (price / TVL) * 100;
            investmentLocked = investment;
            for (let i = 0; i < 365; i++) {
              investment = (dailyAPR * investment) / 100 + investment;
            }
            APY = (investment / investmentLocked - 1) * 100;
            // console.log(APY);
            yearlyAPR = dailyAPR * 365;
            // console.log("yearlyAPR", isNaN(yearlyAPR));
            if (APY !== Infinity) {
              this.setState({ APY_ALIA: isNaN(APY) ? 0 : APY });
            }
            // console.log(APY);
          }
        })
        .catch((err) => {
          // console.log("err", err);
        });
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
        <div className="farm-cta">
          <div className="chip-card-list">
            <div className="chip-card-item">
              <h6>
                <FormattedMessage id={"aprUnstable"} />
              </h6>
              <h2>
                {this.props.selectedTab === "aliabnb"
                  ? insertComma(this.state.APY_LP.toFixed(2))
                  : insertComma(this.state.APY_ALIA.toFixed(2))}
                %
              </h2>
            </div>
            <div className="chip-card-item">
              <h6>
                <FormattedMessage id={"myPoolShare"} />
              </h6>
              <h2>
                {this.props.selectedTab === "aliabnb"
                  ? isNaN(this.state.farmOf / this.state.totalFarms)
                    ? "0"
                    : (
                      (this.state.farmOf / this.state.totalFarms) *
                      100
                    ).toFixed(8)
                  : isNaN(this.state.stakeOf / this.state.totalStakes)
                    ? "0"
                    : (
                      (this.state.stakeOf / this.state.totalStakes) *
                      100
                    ).toFixed(8)}
                %
              </h2>
            </div>
            <div className="chip-card-item">
              <h6>
                <FormattedMessage id={"estimatedmyShare"} />
              </h6>
              <h2>
                $
                {/* {this.props.selectedTab === "aliabnb"
                  ? isNaN(this.state.farmOf / Math.pow(10, 18))
                    ? "0 ALIABNB LP"
                    : (
                        (this.state.farmOf / Math.pow(10, 18)) *
                        (this.state.aliaBNBPriceDollar *
                          this.state.bnbPriceDollar)
                      ).toFixed(2)
                  : isNaN(this.state.stakeOf / Math.pow(10, 18))
                  ? "0 ALIA"
                  : (
                      (this.state.stakeOf / Math.pow(10, 18)) *
                      (this.state.aliaBNBPriceDollar *
                        this.state.bnbPriceDollar)
                    ).toFixed(2)} */}
                {/* {this.props.selectedTab === "aliabnb"
                  ? isNaN(this.state.farmOf / Math.pow(10, 18))
                    ? "0 ALIABNB LP"
                    : (
                        (this.state.farmOf / Math.pow(10, 18)) *
                        (this.state.aliaBNBPriceDollar *
                          this.state.bnbPriceDollar)
                      ).toFixed(2)
                  : isNaN(this.state.stakeOf / Math.pow(10, 18))
                  ? "0 ALIA"
                  : (
                      (this.state.stakeOf / Math.pow(10, 18)) *
                      (this.state.aliaBNBPriceDollar *
                        this.state.bnbPriceDollar)
                    ).toFixed(2)} */}
                {this.props.selectedTab === "aliabnb"
                  ? isNaN(this.calculateEstimatedValuesForLp())
                    ? "0"
                    : insertComma(
                      this.calculateEstimatedValuesForLp().toFixed(2)
                    )
                  : isNaN(this.calculateEstimatedValuesForAlia())
                    ? "0"
                    : insertComma(
                      this.calculateEstimatedValuesForAlia().toFixed(2)
                    )}
              </h2>
            </div>
          </div>

          <ul className="summery-card">
            <li>
              <div className="card-d1">
                <FormattedMessage
                  id={
                    this.props.selectedTab === "aliabnb"
                      ? "LPBalance"
                      : "AliaBalance"
                  }
                />
              </div>

              <div className="border"></div>
              <div className="card-d2 card-size">
                {this.props.selectedTab === "aliabnb"
                  ? isNaN(this.state.balanceOfLp / Math.pow(10, 18))
                    ? "0 ALIABNB LP"
                    : insertComma(
                      showActualValue(
                        this.state.balanceOfLp / Math.pow(10, 18),
                        18,
                        "string"
                      ),
                      true
                    ) + " ALIABNB LP"
                  : isNaN(this.state.balanceOfAlia / Math.pow(10, 18))
                    ? "0 ALIA"
                    : insertComma(
                      showActualValue(
                        this.state.balanceOfAlia / Math.pow(10, 18),
                        18,
                        "string"
                      ),
                      true
                    ) + " ALIA"}{" "}
              </div>
            </li>
            <li>
              <div className="card-d1">
                <FormattedMessage
                  id={
                    this.props.selectedTab === "aliabnb"
                      ? "LPStaked"
                      : "AliaStaked"
                  }
                />
              </div>
              <div className="border"></div>
              <div className="card-d2 card-size">
                {this.props.selectedTab === "aliabnb"
                  ? isNaN(this.state.farmOf / Math.pow(10, 18))
                    ? "0 ALIABNB LP"
                    : insertComma(
                      showActualValue(
                        this.state.farmOf / Math.pow(10, 18),
                        18,
                        "string"
                      ),
                      true
                    ) + " ALIABNB LP"
                  : isNaN(this.state.stakeOf / Math.pow(10, 18))
                    ? "0 ALIA"
                    : insertComma(
                      showActualValue(
                        this.state.stakeOf / Math.pow(10, 18),
                        18,
                        "string"
                      ),
                      true
                    ) + " ALIA"}{" "}
              </div>
            </li>
            <li>
              <div className="card-d1">
                <FormattedMessage id={"Totalvaluelocked"} />
              </div>
              <div className="border"></div>
              <div className="card-d2 card-size">
                {this.props.selectedTab === "aliabnb"
                  ? isNaN(this.calculateTvlForLp())
                    ? "0.00 $"
                    : insertComma(
                      showActualValue(this.calculateTvlForLp(), 2, "string"),
                      true
                    ) + " $"
                  : isNaN(
                    this.props.totalStakes *
                    this.props.bnbPriceDollar *
                    this.props.aliaBNBPriceDollar
                  )
                    ? "0.00 $"
                    : insertComma(
                      showActualValue(
                        (this.props.totalStakes / Math.pow(10, 18)) *
                        this.props.bnbPriceDollar *
                        this.props.aliaBNBPriceDollar,
                        2,
                        "string"
                      ),
                      true
                    ) + " $"}{" "}
              </div>
            </li>
            {/* <li>
              <div className="card-d1">Contract </div>
              <div className="border"></div>
              <div
                className="card-d2"
                style={{
                  width: 100,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#000000",
                  cursor: "pointer",
                }}
                onClick={() =>
                  window.open(
                    `https://testnet.bscscan.com/address/${
                      this.props.selectedTab === "aliabnb"
                        ? StakingContractAddTestNet
                        : StakingContractAddTestNet
                    }`,
                    "_blank"
                  )
                }
              >
                {this.props.selectedTab === "aliabnb"
                  ? StakingContractAddTestNet
                  : StakingContractAddTestNet}
              </div>
              <div className="card-d2 arrow">
                {" "}
                <img
                  src={path_img}
                  onClick={() =>
                    window.open(
                      `https://testnet.bscscan.com/address/${
                        this.props.selectedTab === "aliabnb"
                          ? StakingContractAddTestNet
                          : StakingContractAddTestNet
                      }`,
                      "_blank"
                    )
                  }
                />{" "}
              </div>
            </li> */}
          </ul>

          {this.props.approvalForLp === true &&
            this.props.selectedTab === "aliabnb" ? (
            <div className="form-input-group">
              <div className="form-item input-select">
                <input
                  type="text"
                  className="form-control"
                  name={"balanceForLp"}
                  onChange={(e) => this.onHandleChange(e)}
                  value={this.state.balanceForLp}
                />
                <span
                  style={{ cursor: "pointer" }}
                  onClick={
                    isStaging
                      ? () => this.handleMaxApprove("lp")
                      : () => this.setShow(true)
                  }
                >
                  <FormattedMessage id={"max"} />
                </span>
              </div>
              <div className="form-item input-select">
                <Button
                  block
                  variant="outline-primary"
                  onClick={
                    isStaging
                      ? () => this.handleApprove("Lp")
                      : () => this.setShow(true)
                  }
                  disabled={this.state.balanceForLp === "" ? true : false}
                >
                  {this.state.loaderFor ? <ValueLoader /> : <FormattedMessage id={"approval"} />}


                </Button>
              </div>
            </div>
          ) : this.props.approvalForAlia === true &&
            this.props.selectedTab === "alia" ? (
            <div className="form-input-group">
              <div className="form-item input-select">
                <input
                  type="text"
                  className="form-control"
                  name={"balanceForAlia"}
                  onChange={(e) => this.onHandleChange(e)}
                  value={this.state.balanceForAlia}
                />
                <span
                  style={{ cursor: "pointer" }}
                  onClick={
                    isStaging
                      ? () => this.handleMaxApprove("alia")
                      : () => this.setShow(true)
                  }
                >
                  <FormattedMessage id={"max"} />
                </span>
              </div>
              <div className="form-item input-select">
                <Button
                  block
                  variant="outline-primary"
                  onClick={
                    isStaging
                      ? () => this.handleApprove("Alia")
                      : () => this.setShow(true)
                  }
                  disabled={this.state.balanceForAlia === "" ? true : false}
                >
                  <FormattedMessage id={"approval"} />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="form-input-group">
                <div className="form-item input-select">
                  <input
                    type="text"
                    className="form-control"
                    name={
                      this.props.selectedTab === "aliabnb"
                        ? "stakingValueLp"
                        : "stakingValueAlia"
                    }
                    onChange={(e) => this.onHandleChange(e)}
                    value={
                      this.props.selectedTab === "aliabnb"
                        ? this.state.stakingValueLp
                        : this.state.stakingValueAlia
                    }
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
                        ? () => this.handleStake('stack')
                        : () => this.setShow(true)
                    }
                  >
                    {this.state.loaderFor === 'stack' ? <ValueLoader /> : <FormattedMessage id={"stake"} />}

                  </Button>
                </div>
              </div>
            </>
          )}
          <div className="form-input-group">
            <div className="form-item input-select">
              <input
                type="text"
                className="form-control"
                name={
                  this.props.selectedTab === "aliabnb"
                    ? "unStakingValueLp"
                    : "unStakingValueAlia"
                }
                onChange={(e) => this.onHandleChange(e)}
                value={
                  this.props.selectedTab === "aliabnb"
                    ? this.state.unStakingValueLp
                    : this.state.unStakingValueAlia
                }
              />
              <span
                style={{ cursor: "pointer" }}
                onClick={
                  isStaging
                    ? () => this.findMaxBalance("Unstake")
                    : () => this.setShow(true)
                }
              >
                <FormattedMessage id={"max"} />
              </span>
            </div>
            <div className="form-item input-select">
              <Button
                block
                variant="outline-primary"
                onClick={
                  isStaging
                    ? () => this.handleUnStake('unStack')
                    : () => this.setShow(true)
                }
              >
                {this.state.loaderFor === "unStack" ? <ValueLoader /> : <FormattedMessage id={"unStake"} />}


              </Button>
            </div>
          </div>
          <div className="title-card-ui">
            <span
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.open(
                  "https://exchange.pancakeswap.finance/#/add/BNB/0x13861C017735d3b2F0678A546948D67AD51AC07B",
                  "_blank"
                )
              }
            >
              <FormattedMessage id={"addMoreLiquidity"} />
            </span>
          </div>
          <div className="title-card-ui-reward">
            <FormattedMessage id={"reward"} />
          </div>
          <div className="ala-to-harvest">
            <div className="tile1">
              <FormattedMessage id={"aliaToHarvest"} />
            </div>
            <div className="tile2">
              {this.props.selectedTab === "aliabnb"
                ? insertComma(
                  showActualValue(
                    this.state.lpReward + this.state.farmRewards,
                    18,
                    "string"
                  ),
                  true
                )
                : insertComma(
                  showActualValue(
                    this.state.aliaReward + this.state.stakeRewards,
                    18,
                    "string"
                  ),
                  true
                )}
            </div>
            <div className="tile3">
              <FormattedMessage id={"alia"} />
              <span className="black-cir">
                <img src="https://cdn.xanalia.com/assets/images/logo-v2.svg" />
              </span>
            </div>
          </div>

          <div className="footer-btn-ui">
            <Button
              block
              variant="primary"
              onClick={
                isStaging
                  ? () => this.handleCompound('compound')
                  : () => this.setShow(true)
              }
            >
              {this.state.loaderFor === 'compound' ? <ValueLoader /> : <FormattedMessage id={"compound"} />}
            </Button>
            <Button
              block
              variant="outline-primary"
              onClick={
                isStaging
                  ? () => this.handleHarvest('harvest')
                  : () => this.setShow(true)
              }
            >
              {this.state.loaderFor === 'harvest' ? <ValueLoader /> : <FormattedMessage id={"harvest"} />
              }
            </Button>
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
        {/* {this.state.loading ? (
          <LoadingDialog
            mainheading={this.state.mainHeading}
            loading={this.state.loading}
            msg={this.state.msg}
            submsg={this.state.subMsg}
            forloading={this.state.forLoading}
            forsuccess={this.state.forSuccess}
            closesuccessdialog={this.closeDialog.bind(this)}
          />
        ) : undefined} */}

        {this.state.showErrorMsg ? (
          <ToastContainer limit={1} style={{ top: "4rem" }} />
        ) : undefined}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Farm);

// {this.state.showDialog ? (
//   <AddLiquidityDialog
//     hideDialog={this.hideDialog.bind(this)}
//     history={this.props.history}
//   />
// ) : undefined}

{
  /* <div className="sc-ckVGcZ sc-fYxtnH sc-tilXH sc-cCVOAp kutun">
<div className="sc-cfWELz cfKrxJ">
  <div className="sc-dnqmqq eChOxP sc-kAdXeD bwrowM css-826sb8">
    Rewards per block
  </div>
  <div className="sc-gJqsIT kpjHTE">
    <div>
      Rewards start from block{" "}
      <a
        href="https://bscscan.com/block/5128600"
        target="_blank"
        rel="noopener noreferrer"
      >
        5128600
      </a>
    </div>
  </div>
</div>
<div className="sc-hCaUpS jAZWkx">
  <div className="sc-ckVGcZ sc-eNQAEJ sc-hMqMXs gLTseD">
    <div className="sc-dnqmqq eChOxP css-9dabyk">0.0124</div>
    <div className="sc-ckVGcZ sc-eNQAEJ ercnjM">
      <a
        href="https://bscscan.com/address/0x4f0ed527e8A95ecAA132Af214dFd41F30b361600"
        target="_blank"
        rel="noopener noreferrer"
        className="sc-bvTASY kVofLo sc-bnXvFD gZpDdB"
      >
        <span>vBSWAP</span>
        <span className="sc-gFaPwZ kNWadY">↗</span>
      </a>
      <img
        title="0x4f0ed527e8A95ecAA132Af214dFd41F30b361600"
        className="sc-cbkKFq kXCKMG sc-fYiAbW ldoyGW"
        alt="vBSWAP logo"
        src="https://raw.githubusercontent.com/valuedefi/trustwallet-assets/master/blockchains/smartchain/assets/0x4f0ed527e8A95ecAA132Af214dFd41F30b361600/logo.png"
      />
    </div>
  </div>
</div>
</div> */
}

// handleAdd() {
//   if (checkWalletConnection(this.props.contract,this.props.metaMaskAddress)) {
//     this.showConfirmationDialog();
//     var web3 = new Web3(Web3.givenProvider);
//     web3.eth
//       .getAccounts()
//       .then((acc) => {
//         this.props.contract.methods
//           .mint("0x9b6D7b08460e3c2a1f4DFF3B2881a854b4f3b859", 121)
//           .send({ from: acc[0] })
//           .then((res) => {
//             this.handleSuccessResponse(res);
//           })
//           .catch((err) => {
//             this.handleErrorTransaction(err);
//           });
//       })
//       .catch((err) => {
//         this.handleErrorAccount(err);
//       });
//   }
// }

// handleGet() {
//   if (checkWalletConnection(this.props.contract,this.props.metaMaskAddress)) {
//     this.props.contract.methods
//       .name()
//       .call()
//       .then(function (res) {
//         console.log("name here", res);
//       })
//       .catch((err) => {
//         console.log("err", err);
//         showNotification("Error", err.message, "danger", 4000);
//       });
//   }
// }
