import { showNotification } from "../component/Notifications/showNotification";
import { binanceTestNet, binanceMainNet } from "../config/chainIds";

function checkWalletConnection(contract, metaMaskAddress) {
  var language = localStorage.getItem("lang");
  const connectedWith = localStorage.getItem("connectedWith");
  if (contract !== "" && contract !== {} && metaMaskAddress !== "") {
    if (
      connectedWith === "metamask" &&
      window.ethereum !== undefined &&
      (window.ethereum.networkVersion === binanceTestNet ||
        window.ethereum.networkVersion === binanceMainNet)
    ) {
      return true;
    } else if (
      connectedWith === "binanceSmartChain" &&
      window.BinanceChain !== undefined &&
      (parseInt(window.BinanceChain.chainId).toString() === binanceTestNet ||
        parseInt(window.BinanceChain.chainId).toString() === binanceMainNet)
    ) {
      return true;
    } else if (connectedWith === "walletConnect") {
      return true;
    }

    showNotification(
      language === "en" ? "Error" : "오류",
      language === "en"
        ? "Make sure you are connected with your binance smart chain wallet"
        : "Binance 스마트 체인 지갑과 연결되어 있는지 확인하십시오"
    );
    return false;
  } else {
    showNotification(
      language === "en" ? "Error" : "오류",
      language === "en"
        ? "Make sure you are connected with your metamask wallet"
        : "메타 마스크 지갑과 연결되어 있는지 확인하세요."
    );
    return false;
  }
}

export default checkWalletConnection;
