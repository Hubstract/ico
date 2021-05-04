import React, { useState } from "react";
// import "./addLiquidity.css";
import "./tabs.scss";
import { Tabs, Tab } from 'react-bootstrap'
import Farm from "./farm";

export default class AddLiquidity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vBSWAP: "",
      BNB: "",
    };
  }

  onHandleChange(e) {
    var re = /^[-+]?\d*\.?\d*$/;
    if (re.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="tab_ui">
           <App />
       </div>
      </React.Fragment>

    /*  <div className="mainDiv my-3">
   
        { <div style={{ textAlign: "center" }}>
          <h5 style={{ fontWeight: "bold" }}>Add liquidity</h5>
          <div>
            <span>50% vBSWAP - 50% WBNB</span>
          </div>
        </div>

        <hr
          heigh={20}
          style={{
            backgroundColor: "#FF94E2",
            marginLeft: -15,
            marginRight: -15,
          }}
        />

        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h6 style={{ color: "black" }}>Add vBSWAP</h6>
            <h6 style={{ color: "grey" }}>Balance: 0.00653</h6>
          </div>

          <div className="ZJMhs">
            <input
              className="kdGAKC"
              inputMode="decimal"
              placeholder="0.0"
              minLength="1"
              maxLength="79"
              value={this.state.vBSWAP}
              name={"vBSWAP"}
              onChange={(e) => this.onHandleChange(e)}
            />
            <button className="gJNdXO">
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div className="maxStyle">Max</div>

                <div className="cKhnLK"></div>
                <span className="bSMgmK">vBSWAP</span>
              </span>
            </button>
          </div>
        </div>

        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="my-3"
        >
          <img
            src={Plus}
            style={{ width: 20, height: 20, cursor: "pointer" }}
          />
        </div>

        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h6 style={{ color: "black" }}>Add vBSWAP</h6>
            <h6 style={{ color: "grey" }}>Balance: 0.00653</h6>
          </div>

          <div className="ZJMhs">
            <input
              className="kdGAKC"
              inputMode="decimal"
              placeholder="0.0"
              minLength="1"
              maxLength="79"
              value={this.state.vBSWAP}
              name={"vBSWAP"}
              onChange={(e) => this.onHandleChange(e)}
            />
            <button className="gJNdXO">
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div className="maxStyle">Max</div>

                <div className="cKhnLK"></div>
                <span className="bSMgmK">BNB</span>
              </span>
            </button>
          </div>
        </div>

        <div className="fIrYzu my-5">
          <div className="iUleLj" style={{}}>
            <h6>Prices and pool share</h6>
            <div className="css-rq0hzj">0x8DD3...8267&nbsp;</div>
          </div>

          <div className="jtCoxa">
            <hr heigh={20} style={{ backgroundColor: "#FF94E2" }} />

            <div className="kJbVQq">
              <div className="heRrIF">
                <div className="dAECav">
                  <div className="css-arxbvm">0.01712</div>
                  <div className="css-jtrmog">vBSWAP per WBNB</div>
                </div>
                <div className="dAECav">
                  <div className="css-arxbvm">58.4134</div>
                  <div className="css-jtrmog">WBNB per vBSWAP</div>
                </div>
                <div className="dAECav">
                  <div className="css-arxbvm">0%</div>
                  <div className="css-jtrmog">Share of Pool</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="kJbVQq" style={{ marginTop: 45 }}>
          <button className="bcnqvA">Enter Amount</button>
        </div> }
      </div>*/
    );
  }
}

{
  /* <div
style={{
  borderRadius: 5,
  borderWidth: 5,
  borderColor: "blue",
  backgroundColor: "red",
}}
>
<div style={{ textAlign: "center" }}>
  <h6 style={{ textAlign: "center", fontWeight: "bold" }}>
    Add liquidity
  </h6>
  <div style={{ width: 30 }}></div>
  <div>
    <span>50% vBSWAP - 50% WBNB</span>
  </div>
</div>

<div className="sc-ckVGcZ sc-eNQAEJ sc-gVLVqr fiWkDz"></div>
<div id="swap-page" className="sc-hGoxap sc-cqpYsc dtbpli">
  <div className="sc-kIPQKe kJbVQq">
    <div className="sc-fOKMvo fkaexr">
      <div className="sc-dUjcNx gqAykw">
        <h6 style={{ color: "black" }}>Add vBSWAP</h6>
      </div>

      <div className="sc-gHboQg ZJMhs">
        <input
          style={{
            borderRadius: 5,
            borderColor: "blue",
            borderWidth: 5,
          }}
          className="sc-bXGyLb kdGAKC token-amount-input"
          inputmode="decimal"
          //   pattern="^[0-9]*[.,]?[0-9]*$"
          placeholder="0.0"
          minLength="1"
          maxlength="79"
          //   autocomplete="off"
          //   autocorrect="off"
          //   type="text"
          //   spellcheck="false"
          value={this.state.vBSWAP}
          name={"vBSWAP"}
          onChange={(e) => this.onHandleChange(e)}
        />
        <button className="sc-eerKOB gJNdXO open-currency-select-button">
          <span className="sc-emmjRN eGOsla">
            <img
              title="0x4f0ed527e8A95ecAA132Af214dFd41F30b361600"
              className="sc-cbkKFq kXCKMG sc-fYiAbW cKhnLK"
              alt="vBSWAP logo"
              src="https://raw.githubusercontent.com/valuedefi/trustwallet-assets/master/blockchains/smartchain/assets/0x4f0ed527e8A95ecAA132Af214dFd41F30b361600/logo.png"
            />
            <div
              style={{
                borderRadius: 10,
                width: 10,
                height: 10,
                backgroundColor: "black",
              }}
            ></div>
            <span className="sc-cpmLhU bSMgmK token-symbol-container">
              vBSWAP
            </span>
          </span>
        </button>
      </div>
    </div>
    <div className="sc-kfGgVZ sc-esjQYD bqYAK">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ABB2C8"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </div>
    <div className="sc-fOKMvo fkaexr">
      <div className="sc-dUjcNx gqAykw">
        <div className="sc-ckVGcZ sc-eNQAEJ sc-hMqMXs gLTseD">
          <div className="sc-dnqmqq eChOxP css-y8wv5z">Add BNB</div>
          <div></div>
        </div>
      </div>
      <div className="sc-gHboQg hCSlzW">
        <input
          className="sc-bXGyLb kdGAKC token-amount-input"
          inputmode="decimal"
          //   pattern="^[0-9]*[.,]?[0-9]*$"
          placeholder="0.0"
          minLength="1"
          maxlength="79"
          //   autocomplete="off"
          //   autocorrect="off"
          //   type="text"
          //   spellcheck="false"
          value={this.state.BNB}
          name={"BNB"}
          onChange={(e) => this.onHandleChange(e)}
        />
        <button className="sc-eerKOB hDgGsK open-currency-select-button">
          <span className="sc-emmjRN eGOsla">
            <img
              title="ether"
              className="sc-cbkKFq kXCKMG sc-fYiAbW cKhnLK"
              alt="BNB logo"
              src={BSC}
            />
            <span className="sc-cpmLhU bMeMrH token-symbol-container">
              BNB
            </span>
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              className="sc-dymIpo jPLMSs"
            >
              <path
                d="M0.97168 1L6.20532 6L11.439 1"
                stroke="#AEAEAE"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div className="sc-ckVGcZ sc-fYxtnH fIrYzu">
      <div className="sc-ckVGcZ sc-eNQAEJ sc-hMqMXs iUleLj">
        <div className="sc-dnqmqq eChOxP css-1aekuku">
          Prices and pool share
        </div>
        <div className="sc-dnqmqq eChOxP css-rq0hzj">
          0x8DD3...8267&nbsp;
          <a
            href="https://bscscan.com/address/0x8DD39f0a49160cDa5ef1E2a2fA7396EEc7DA8267"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#43d2ff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>{" "}
      <div className="sc-ckVGcZ sc-fYxtnH jtCoxa">
        <div className="sc-kIPQKe kJbVQq">
          <div className="sc-ckVGcZ sc-eNQAEJ sc-kkGfuU heRrIF">
            <div className="sc-kIPQKe dAECav">
              <div className="sc-dnqmqq eChOxP css-arxbvm">0.01712</div>
              <div className="sc-dnqmqq eChOxP css-jtrmog">
                vBSWAP per WBNB
              </div>
            </div>
            <div className="sc-kIPQKe dAECav">
              <div className="sc-dnqmqq eChOxP css-arxbvm">58.4134</div>
              <div className="sc-dnqmqq eChOxP css-jtrmog">
                WBNB per vBSWAP
              </div>
            </div>
            <div className="sc-kIPQKe dAECav">
              <div className="sc-dnqmqq eChOxP css-arxbvm">0%</div>
              <div className="sc-dnqmqq eChOxP css-jtrmog">
                Share of Pool
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="sc-kIPQKe kJbVQq" style={{ marginTop: 10 }}>
      <button className="sc-ckVGcZ dtxXzN sc-gPEVay sc-iRbamj bcnqvA">
        <div
          className="sc-dnqmqq eChOxP css-1x8wv8d"
          style={{ color: "black" }}
        >
          Connect Wallet
        </div>
      </button>
    </div>
  </div>
</div>
</div> */
}

function App() {
  const [key, setKey] = useState('aliabnb');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="aliabnb" title="Stake ALIABNB LP">
      <React.Fragment>
           <Farm />
        </React.Fragment>
      </Tab>
      <Tab eventKey="alia" title="Stake ALIA">
        <React.Fragment>
           <Farm />
        </React.Fragment>
      </Tab>


    </Tabs>
  );
}