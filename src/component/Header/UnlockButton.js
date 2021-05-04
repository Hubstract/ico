import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useWeb3React } from "@web3-react/core";
import "./header.scss";
import { Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import WalletSelectDialog from "./walletSelectDialog";

const UnlockButton = (props) => {
  const { login, logout } = useAuth();
  const { library } = useWeb3React();
  const disconnect = localStorage.getItem("disconnect");
  // const userConnected = localStorage.getItem("userConnected");

  // const [showWalletConnectDialog, setShowWalletConnectDialog] = useState(disconnect ? false : true);
  const [showWalletConnectDialog, setShowWalletConnectDialog] = useState(false);

  useEffect(() => {
    if(disconnect){
      setTimeout(() => {
        localStorage.removeItem("disconnect");
      }, 3000)
    }
    if (typeof library !== "undefined") {
      // console.log("library", library);
      props.connectWithWalletConnect(library);
    }
  }, [library, disconnect]);

  function connectWithWallet(calledFor) {
    if (calledFor === "walletConnect") {
      let success = login();
      if (!success) {
        setShowWalletConnectDialog(false);
      }
      return;
    }
    props.connectWithWallet(calledFor);
    setShowWalletConnectDialog(false);
  }

  useEffect(() => {
    if (
      localStorage.getItem("userConnected") === "true" &&
      localStorage.getItem("connectedWith") === "walletConnect"
    ) {
      login();
    }
  }, []);

  return (
    <>
      <Button
        variant="outline-primary"
        className="my-2"
        onClick={() => setShowWalletConnectDialog(true)}
        id="connectWallet"
      >
        {" "}
        <FormattedMessage id={"connectWallet"} />
      </Button>

      {showWalletConnectDialog ? (
        <WalletSelectDialog
          show={showWalletConnectDialog}
          hideShow={() => setShowWalletConnectDialog(false)}
          connectWithWallet={connectWithWallet}
        />
      ) : undefined}
    </>
  );
};

export default React.memo(UnlockButton);
