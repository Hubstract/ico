import React, { useEffect, useState } from "react";
import Farm from "./farm";
import "./tabs.scss";
import "./farmpage.scss";
import { Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

function TabsBlock(props) {
  const [key, setKey] = useState(props.tabValue);

  useEffect(() => {
    if (props.data) {
      setKey(props.data);
    }
  }, []);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
        <Tab eventKey="alia" title={"BUY ART"}>
          <React.Fragment>
            <Farm selectedTab={key} />
          </React.Fragment>
        </Tab>
    </Tabs>
  );
}

class FarmHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "Form",

      count: 0,
      farmOf: 0,
      stakeOf: 0,
      totalStakes: 0,
      totalFarms: 0,

      APY_ALIA: 0,
      APY_LP: 0,

      APR_ALIA: 0,
      APR_LP: 0,
    };
  }

  componentDidMount() {
    // this.APR(5, 100, "LP");
    // this.APR(5, 100, "ALIA");
    // if (this.props.contract && this.props.metaMaskAddress) {
    //   this.getStats();
    // }

    this.intervalId = setInterval(this.timer.bind(this), 6000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timer() {
    this.setState({ count: this.state.count + 1 });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== prevState.count) {
      // this.APR(5, 100, "LP");
      // this.APR(5, 100, "ALIA");
    }

    // if (
    //   this.state.count !== prevState.count &&
    //   this.props.contract &&
    //   this.props.metaMaskAddress
    // ) {
    //   this.getStats();
    // }

    if (
      this.props.metaMaskAddress === "" &&
      this.props.metaMaskAddress !== prevProps.metaMaskAddress
    ) {
      this.setState({
        farmOf: 0,
        stakeOf: 0,
        totalStakes: 0,
        totalFarms: 0,

        APY_ALIA: 0,
        APY_LP: 0,
      });
    }
  }

  

  changeSelectedTab(key) {
    this.setState({ selectedTab: key });
  }

  

  render() {
    return (
      <React.Fragment>
        <div className="main-content farm-page bg-color">
          {/* <div className="image-placeholder ">
            <img src={pandaPic} />
          </div> */}
        
          <div className="container-fluid pl-0 pr-0">
            <div className="row">
              <div className="col-md-12 pl-custom">
                <div className="tab_ui">
                  <TabsBlock
                    tabValue={"alia"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    metaMaskAddress: state.metaMaskReducer.metaMaskAddress,
    contract: state.metaMaskReducer.contract,
    decimalsForLp: state.metaMaskReducer.decimalsForLp,
    decimalsForAlia: state.metaMaskReducer.decimalsForAlia,
    approvalForLp: state.metaMaskReducer.approvalForLp,
    approvalForAlia: state.metaMaskReducer.approvalForAlia,

    bnbPriceDollar: state.metaMaskReducer.bnbPriceDollar,
    aliaBNBPriceDollar: state.metaMaskReducer.aliaBNBPriceDollar,
    noOfAlia: state.metaMaskReducer.noOfAlia,
    noOfBNB: state.metaMaskReducer.noOfBNB,

    circulatingSuppLp: state.metaMaskReducer.circulatingSuppLp,
    totalFarms: state.metaMaskReducer.totalFarms,
    totalStakes: state.metaMaskReducer.totalStakes,

    APR_ALIA: state.metaMaskReducer.APR_ALIA,
    APY_ALIA: state.metaMaskReducer.APY_ALIA,
    APY_LP: state.metaMaskReducer.APY_LP,
    APR_LP: state.metaMaskReducer.APR_LP,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FarmHome);

{/* <div className="ammount-chip">
<div className="ammount-chip-item">
  <div className="block-chip-left">
    <h6>
      <FormattedMessage id={"aprStake"} />
    </h6>
    <h2>
      {" "}
      {insertComma(this.props.APY_LP.toFixed(2))}
      %
    </h2>
  </div>
  <div className="block-chip-right">
    <ul>
      <li>
        <div className="label">APR</div>
        <div className="label-value">
          <span>
            {this.props.APR_LP !== "" ? (
              insertComma(this.props.APR_LP.toFixed(2)) + " %"
            ) : (
              <ValueLoader />
            )}{" "}
          </span>
        </div>
      </li>
      <li>
        <div className="label">DAILY</div>
        <div className="label-value">
          <span>
            {this.props.APR_LP !== "" ? (
              insertComma((this.props.APR_LP / 365).toFixed(4)) +
              " %"
            ) : (
              <ValueLoader />
            )}{" "}
          </span>
        </div>
      </li>
    </ul>
  </div>
</div>

<div className="ammount-chip-item">
  <div className="block-chip-left">
    <h6>
      <FormattedMessage id={"stakeALIAAPR"} />
    </h6>
    <h2>{insertComma(this.props.APY_ALIA.toFixed(2))}%</h2>
  </div>
  <div className="block-chip-right">
    <ul>
      <li>
        <div className="label">APR</div>
        <div className="label-value">
          <span>
            {this.props.APR_LP !== "" ? (
              insertComma(this.props.APR_ALIA.toFixed(2)) + " %"
            ) : (
              <ValueLoader />
            )}
          </span>
        </div>
      </li>
      <li>
        <div className="label">DAILY</div>
        <div className="label-value">
          <span>
            {" "}
            {this.props.APR_ALIA !== "" ? (
              insertComma((this.props.APR_ALIA / 365).toFixed(4)) +
              " %"
            ) : (
              <ValueLoader />
            )}{" "}
          </span>
        </div>
      </li>
    </ul>
  </div>
</div>
</div> */}
