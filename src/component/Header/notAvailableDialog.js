import React from "react";
import { FormattedMessage } from "react-intl";
//import WalletConnect from "../../assets/images/WalletConnect.svg";
import "./header.scss"
import { Modal } from "react-bootstrap";
function LoadingDialog(props) {
  return (
    <>
      <Modal
        size="md"
        className="fade connect-modal"
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-connect-ui whiteBg" 
        backdropClassName="custom-backdrop" 
        contentClassName="custom-content"
        centered
        show={true}
        onHide={() => props.hideShow()}
      > 
        <Modal.Body>
        <div className="wallet-connect-list">
        <div className="wallet-connect-item" onClick={()=> props.connectWithWallet("walletConnect")}>
        <div className="cta-">
          <img src="https://cdn.xanalia.com/assets/images/WalletConnect.svg" className="wallet" alt=""/>
           <h5 style={{cursor:'pointer'}} ><FormattedMessage id="walletConnect" /></h5>  
           <p><FormattedMessage id="walletConnection" /></p>
           </div>
        </div>
          
        </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default React.memo(LoadingDialog);
