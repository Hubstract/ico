import { networkType } from "../networkType.js";

let add = "";
if (networkType === "testnet") {
  add = "0x68091fcE8d0E0f39DDb118F5753eC1316270F064"; // test net
} else if (networkType === "mainnet") {
  add = "0x7216f56167a607E406fAAC4585338e8232B5EA03"; // main net
}

export default add;