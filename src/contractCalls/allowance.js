// import { showNotification } from "../component/Notifications/showNotification";
import StakingContractAddTestNet from "../config/contractAddress/StakingContractAddTestNet";

export function getLpAllowance(metaMaskAddress, contract, setApprovalForLp) {
  contract.lpContract.methods
    .allowance(metaMaskAddress, StakingContractAddTestNet)
    .call()
    .then((res) => {
      // console.log("allowance for lp", typeof res, res);
      if (parseInt(res) === 0) {
        setApprovalForLp(true);
      } else if (parseInt(res) > 0) {
        setApprovalForLp(false);
      }
    })
    .catch((err) => {
      //console.log("err allowance in lp", err);
      //   showNotification("Error", err.message, "danger", 4000);
      return false;
    });
}

export function getAliaAllowance(
  metaMaskAddress,
  contract,
  setApprovalForAlia
) {
  contract.aliaContract.methods
    .allowance(metaMaskAddress, StakingContractAddTestNet)
    .call()
    .then((res) => {
      // console.log("allowance for alia", typeof res, res);
      if (parseInt(res) === 0) {
        setApprovalForAlia(true);
      } else if (parseInt(res) > 0) {
        setApprovalForAlia(false);
      }
    })
    .catch((err) => {
      //console.log("err allowance in alia", err);
      //   showNotification("Error", err.message, "danger", 4000);
      return false;
    });
}
