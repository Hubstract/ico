import Big from "big.js";
export const divideNo = (res) => {
  if (typeof res === "string" && res === "") {
    res = "0";
  }
  let bigNo = new Big(res);
  let bigNo1 = new Big(Math.pow(10, 18));
  let number = bigNo.div(bigNo1).toFixed(18);
  return number;
};

export const remaining = (res) => {
  if (typeof res === "string" && res === "") {
    res = "0";
  }
  let bigNo = new Big(res);
  let max = new Big(2000000000000000000)
  let bigNo1 = new Big(Math.pow(10, 18));

  let number = max.minus(bigNo).div(bigNo1).toFixed(18);
  
  return number;
};

export const buy = (res) => {
  if (typeof res === "string" && res === "") {
    res = "0";
  }
  let bigNo = new Big(res);
  let number = bigNo.div(1500).toFixed(18);
  
  return number;
};

