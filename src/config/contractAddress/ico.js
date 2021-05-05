import { networkType } from "../networkType.js";

let add = "";
if (networkType === "testnet") {
  add = "0xde3CE1d9b11A202851DbF2DB8238B0DD1F0ad31E"; // test net
} else if (networkType === "mainnet") {
  add = "0x48A13a1e17A887374375681bEB16e79fAF822886"; // main net
}

export default add;