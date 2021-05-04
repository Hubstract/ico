import {
  SET_ALL_TOKENS,
  SET_3D_ASSETS,
  SET_2D_ASSETS,
  SET_SINGLE_NFT,
  SET_ALL_NFTS,
  REMOVE_ALL_NFTS,
} from "../_actions/types";

let initialState = {
  totalMarketTokens: [],
  total3DAssets: [],
  total2DAssets: [],
  singleNFTObj: {},
  allNFTS: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALL_TOKENS:
      return {
        ...state,
        totalMarketTokens: payload,
      };

    case SET_ALL_NFTS:
      return {
        ...state,
        allNFTS: [...state.allNFTS, payload],
      };
    case REMOVE_ALL_NFTS:
      return {
        ...state,
        allNFTS: [],
      };

    case SET_3D_ASSETS:
      return {
        ...state,
        total3DAssets: [...state.total3DAssets, payload],
      };
    case SET_2D_ASSETS:
      return {
        ...state,
        total2DAssets: payload,
      };
    case SET_SINGLE_NFT:
      return {
        ...state,
        singleNFTObj: payload,
      };
    default:
      return state;
  }
}
