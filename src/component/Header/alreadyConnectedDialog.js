import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Modal, Button } from "react-bootstrap";
import "./alreadyConnected.scss";
import urlIcon from "../../assets/images/arrow-top.svg";
import { useWeb3React } from "@web3-react/core";

function LoadingDialog(props) {
  const { activate, deactivate } = useWeb3React();

  const [copied, setCopied] = useState(false);

  if (copied) {
    setTimeout(() => {
      setCopied(false);
    }, 800);
  }

  function handleLogout() {
    deactivate();
    props.handleLogout();
  }

  return (
    <>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={() => props.hideShow()}
        dialogClassName="modal-connect-ui-logout whiteBg"
        backdropClassName="custom-backdrop"
        contentClassName="custom-content"
      >
        <div className="copymessage">
          {copied ? (
            <span>
              <FormattedMessage id={"Copied"} />
              <svg viewBox="0 -65 434.67733 434">
                <path d="m152.003906 304.34375c-5.460937 0-10.921875-2.089844-15.082031-6.25l-130.664063-130.667969c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339844-8.339844 21.820313-8.339844 30.164063 0l115.582031 115.582031 246.253906-246.25c8.339844-8.339844 21.820313-8.339844 30.164063 0 8.339844 8.34375 8.339844 21.824219 0 30.167969l-261.332031 261.332031c-4.160156 4.160156-9.625 6.25-15.085938 6.25zm0 0" />
              </svg>
            </span>
          ) : undefined}
        </div>
        <Modal.Header closeButton className="wallet-logout">
          <Modal.Title className="wallet-modal-title">
            <FormattedMessage id={"Yourwallet"} className="formated-message" />{" "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="wallet-body">
          <p className="addresscopy"> {props.userAddress}</p>

          <div className="linksCopy">
            <a
              target="_blank"
              href={`https://bscscan.com/address/${props.userAddress}`}
            >
              <FormattedMessage id={"ViewonBscScan"} />
              <img
                src={urlIcon}
                alt=""
                style={{
                  width: 14,
                  height: 14,
                  marginLeft: 5,
                  position: "relative",
                  top: "0",
                  background: "#008FFF",
                }}
              />{" "}
            </a>

            <CopyToClipboard
              text={props.userAddress}
              onCopy={() => setCopied(true)}
            >
              <span
                data-balloon="size: 2x"
                data-balloon-pos="up"
                class="db color-inherit link hover-cyan"
              >
                <FormattedMessage id={"Copyaddress"} />
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="copy"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="svg-inline--fa fa-copy fa-w-14 fa-1x"
                  style={{
                    width: 15,
                    height: 14,
                    margin: 5,
                    color: "rgb(0, 153, 255)",
                  }}
                >
                  <path
                    fill="currentColor"
                    d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"
                    className=""
                  ></path>
                </svg>
              </span>
            </CopyToClipboard>
          </div>

          <div style={{ textAlign: "center", marginTop: 30 }}>
            <Button variant="primary" onClick={() => handleLogout()}>
              <FormattedMessage id={"Logout"} />
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default React.memo(LoadingDialog);
