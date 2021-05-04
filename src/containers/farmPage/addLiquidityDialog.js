import React from "react";

import { Modal } from "react-bootstrap";

import "./farm.css";

class addLiquidityDialog extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  render() {
    return (
      <div>
        <Modal
          show={true}
          // onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="my-modal"
        >
          <Modal.Body>
            <h5 style={{}}>IMPORTANT NOTICE</h5>
            <ul>
              <li>
                <b>Using our platform may involve financial risk of loss</b>
              </li>
              <li>
                <b>Never</b> invest more than what you can afford to lose
              </li>
              <li>
                <b>Never</b> invest in a pool with tokens you don't trust
              </li>
              <li>
                <b>Never</b> invest in a pool with tokens whose rules for
                minting you don’t agree with
              </li>
              <li>
                Ensure the accuracy of the contracts for the tokens in the pool
              </li>
              <li>
                [FOR PROJECTS THAT HAVE NOT BEEN WHITELISTED] Anyone can create
                an ERC20 token on Ethereum with any name, including creating
                fake versions of existing tokens and tokens that claim to
                represent projects that do not have a token
              </li>
              <li>Always do your own research!</li>
            </ul>

            <label
              className="MuiFormControlLabel-root sc-iomxrj gUrAXu"
              font-size="0.875rem"
            >
              <span
                className="MuiButtonBase-root MuiIconButton-root jss30 MuiCheckbox-root MuiCheckbox-colorSecondary color-secondary sc-dvCyap YoKOH MuiIconButton-colorSecondary"
                aria-disabled="false"
                style={{ marginLeft: 10 }}
              >
                <span className="MuiIconButton-label">
                  <input
                    className="jss33"
                    style={{ width: 20, height: 20 }}
                    type="checkbox"
                    data-indeterminate="false"
                    value={this.state.checked}
                    onChange={(e) =>
                      this.setState({ checked: e.target.checked })
                    }
                  />
                  {/* <svg
                    className="MuiSvgIcon-root"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                  </svg> */}
                </span>
                <span className="MuiTouchRipple-root"></span>
              </span>
              <span
                style={{ marginLeft: 10, fontSize: 15 }}
                className="MuiTypography-root MuiFormControlLabel-label label MuiTypography-body1"
              >
                By checking this box, you agree that Value DeFi is not liable
                for any financial losses you might incur as a direct or indirect
                result of investing in any of the pools in the platform.
              </span>
            </label>

            <div
              className="sc-ckVGcZ sc-eNQAEJ ercnjM"
              style={{ marginTop: 12 }}
            >
              <button
                width="auto"
                className="sc-ckVGcZ gjTRg sc-gPEVay sc-gipzik ZXOUw"
                onClick={() => this.props.hideDialog()}
              >
                Decline
              </button>
              <button
                width="auto"
                className="sc-ckVGcZ gjTRg sc-gPEVay sc-iRbamj cFIXdF"
                disabled={this.state.checked ? false : true}
                onClick={() => this.props.history.push("farm/addLiquidity")}
              >
                I agree
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default addLiquidityDialog;
