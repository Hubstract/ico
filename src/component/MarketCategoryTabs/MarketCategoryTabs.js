import React, { Component } from "react";
import "./market.scss";
import { Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";
import CommingSoon from "../../component/commingSoon/commingSoon";

const Web3 = require("web3");
class MarketHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "3d",
      showPop: false,
      // tokensArray: []
    };
    this.handleClose = this.handleClose.bind(this);
    this.showCommingSoon = this.showCommingSoon.bind(this);
  }

  handleClose() {
    this.setState({
      showPop: false,
    });
  }
  showCommingSoon() {
    this.setState({
      showPop: true,
    });
  }

  componentDidMount() {}

  getAllTokens = () => {};

  getSellList = () => {};

  changeSelectedTab(key) {
    this.setState({ selectedTab: key });
  }

  redirectTab(value) {
    this.props.redirectTab(value);
    this.setState({ selectedTab: value });
  }

  render() {
    const tab = localStorage.getItem("tab");
    return (
      <React.Fragment>
        <div className="filterUi">
          <div className="button-g">
            <Button
              className={tab === "3d" || !tab ? "active-btn" : ""}
              onClick={() => {
                this.redirectTab("3d");
              }}
            >
              3D Assets
            </Button>
            <Button
              className={tab === "2d" ? "active-btn" : ""}
              onClick={() => {
                this.redirectTab("2d");
              }}
            >
              2D Art
            </Button>
          </div>
          <div className="search-input-modal">
            <input type="text" placeholder="Search" />
          </div>
          <div className="search-btn">
            <button onClick={() => this.showCommingSoon()}>
              {" "}
              <FormattedMessage id="search" />{" "}
            </button>
          </div>
        </div>

        <CommingSoon handleClose={this.handleClose} show={this.state.showPop} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};
export default connect(mapStateToProps)(MarketHeader);
