import React from "react";
import { FormattedMessage } from "react-intl";
import { Modal } from "react-bootstrap";


function WalletSelectDialog(props) {
  return (
    <>
      <Modal className="connect-modal"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-connect-ui whiteBg" backdropClassName="custom-backdrop" contentClassName="custom-content"
        centered
        show={true}
        onHide={() => props.hideShow()}
      >
        {/* <Modal.Header closeButton> 
        </Modal.Header> */}

        <Modal.Body> 

        <div className="wallet-connect-list">
        <div className="wallet-connect-item metaMask">
          <div className="cta-" onClick={()=> props.connectWithWallet("metamask")}>
          <img src="https://cdn.xanalia.com/assets/images/metmask-icon.svg"/>
          <h5> <FormattedMessage id="metaMask" /></h5>
          <p> <FormattedMessage id="metaMaskConnect" /></p>
          </div>
        </div>
        <div className="wallet-connect-item second-child binance">
        <div className="cta-" onClick={()=> props.connectWithWallet("binanceSmartChain")}>
        <img src="https://cdn.xanalia.com/assets/images/binance-icon.svg"/>
          <h5 style={{cursor:'pointer'}} ><FormattedMessage id="binanceChain" /></h5>
          <p><FormattedMessage id="binanceChain" /></p>
          </div>
        </div>
        <div className="wallet-connect-item" onClick={()=> props.connectWithWallet("walletConnect")}>
        <div className="cta-">
          <img src="https://cdn.xanalia.com/assets/images/WalletConnect.svg" className="wallet"/>
           <h5 style={{cursor:'pointer'}} ><FormattedMessage id="walletConnect" /></h5>  
           <p className="mb-0"><FormattedMessage id="walletConnection" /></p>
           {/* <p className="smallText"><FormattedMessage id="otherWalletWillBeComingSoon" /></p> */}
           </div>
        </div>
          
        </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default React.memo(WalletSelectDialog);
