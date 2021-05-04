// import { showNotification } from "../component/Notifications/showNotification";
export async function getLpDecimals(contract, setDecimalsForLp) {
  contract.lpContract.methods
    .decimals()
    .call()
    .then((res) => {
      // console.log("decimals for lp", typeof res, res);
      setDecimalsForLp(parseInt(res));
    })
    .catch((err) => {
      //console.log("err decimals for lp", err);
      // showNotification("Error", err.message, "danger", 4000);
      return false;
    });
}

export function getAliaDecimals(contract, setDecimalsForAlia) {
  contract.aliaContract.methods
    .decimals()
    .call()
    .then((res) => {
      // console.log("decimals for alia", typeof res, res);
      setDecimalsForAlia(parseInt(res));
    })
    .catch((err) => {
      //console.log("err decimals for alia", err);
      // showNotification("Error", err.message, "danger", 4000);
      return false;
    });
}
