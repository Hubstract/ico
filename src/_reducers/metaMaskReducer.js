import {
  SET_META_MASK_ADDRESS,
  SET_CONTRACT,
  DELETE_CONTRACT,
  DELETE_META_MASK_ADDRESS,
  SET_APPROVAL_FOR_LP,
  SET_DECIMALS_FOR_ALIA,
  SET_APPROVAL_FOR_ALIA,
  SET_DECIMALS_FOR_LP,
  DELETE_APPROVAL_FOR_ALIA,
  DELETE_APPROVAL_FOR_LP,
  DELETE_DECIMALS_FOR_ALIA,
  DELETE_DECIMALS_FOR_LP,
  SET_VALUES_FOR_ALIA_PRICE,
  SET_TRANSACTION_IN_PROGRESS,
  SET_LANGUAGE,
  SET_CIR_SUPP_FOR_LP,
  SET_TOTAL_STAKES,
  SET_TOTAL_FARMS,
  SET_APY_LP,
  SET_APY_ALIA,
  SET_PROVIDER,
} from "../_actions/types";

let initialState = {
  provider: "",
  metaMaskAddress: "",
  contract: "",

  decimalsForLp: "",
  decimalsForAlia: "",

  approvalForLp: false,
  approvalForAlia: false,

  bnbPriceDollar: "",
  aliaBNBPriceDollar: "",

  transactionInProgress: false,
  language: localStorage.getItem("lang") || "en",

  noOfAlia: 0,
  noOfBNB: 0,

  circulatingSuppLp: 0,

  totalFarms: 0,
  totalStakes: 0,

  APY_ALIA: 0,
  APY_LP: 0,

  APR_ALIA: 0,
  APR_LP: 0,

  emissionRate: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PROVIDER:
      return {
        ...state,
        provider: {...payload},
      };

    case SET_META_MASK_ADDRESS:
      localStorage.setItem("userConnected", true);
      return {
        ...state,
        metaMaskAddress: payload,
      };
    case SET_CONTRACT:
      return {
        ...state,
        contract: payload,
      };
    case DELETE_META_MASK_ADDRESS:
      return {
        ...state,
        metaMaskAddress: "",
      };
    case DELETE_CONTRACT:
      return {
        ...state,
        contract: "",
      };

    //decimal and approvalRequired
    case SET_DECIMALS_FOR_LP:
      return {
        ...state,
        decimalsForLp: payload,
      };
    case SET_DECIMALS_FOR_ALIA:
      return {
        ...state,
        decimalsForAlia: payload,
      };

    case SET_APPROVAL_FOR_LP:
      // sessionStorage.setItem("approvalForLp", payload);
      return {
        ...state,
        approvalForLp: payload,
      };

    case SET_APPROVAL_FOR_ALIA:
      return {
        ...state,
        approvalForAlia: payload,
      };

    case DELETE_DECIMALS_FOR_LP:
      return {
        ...state,
        decimalsForLp: payload,
      };
    case DELETE_DECIMALS_FOR_ALIA:
      return {
        ...state,
        decimalsForAlia: payload,
      };
    case DELETE_APPROVAL_FOR_LP:
      return {
        ...state,
        approvalForLp: payload,
      };
    case DELETE_APPROVAL_FOR_ALIA:
      return {
        ...state,
        approvalForAlia: payload,
      };

    case SET_VALUES_FOR_ALIA_PRICE:
      return {
        ...state,
        aliaBNBPriceDollar: payload.aliaBNBPriceDollar,
        bnbPriceDollar: payload.bnbPriceDollar,
        noOfAlia: payload.noOfAlia,
        noOfBNB: payload.noOfBNB,
      };

    case SET_CIR_SUPP_FOR_LP:
      return {
        ...state,
        circulatingSuppLp: action.payload,
      };

    case SET_TOTAL_FARMS:
      return {
        ...state,
        totalFarms: action.payload,
      };
    case SET_TOTAL_STAKES:
      return {
        ...state,
        totalStakes: action.payload,
      };

    case SET_TRANSACTION_IN_PROGRESS:
      return {
        ...state,
        transactionInProgress: payload,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: payload,
      };

    case SET_APY_LP:
      return {
        ...state,
        APY_LP: payload.APY_LP,
        APR_LP: payload.APR_LP,
        emissionRate: payload.emissionRate,
      };
    case SET_APY_ALIA:
      return {
        ...state,
        APY_ALIA: payload.APY_ALIA,
        APR_ALIA: payload.APR_ALIA,
        emissionRate: payload.emissionRate,
      };

    default:
      return state;
  }
}
