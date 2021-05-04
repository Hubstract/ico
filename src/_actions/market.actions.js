import {
  SET_ALL_TOKENS,
  SET_3D_ASSETS,
  SET_2D_ASSETS,
  SET_SINGLE_NFT,
  SET_ALL_NFTS,
  REMOVE_ALL_NFTS,
} from "../_actions/types";

export const setAllTokens = (content) => ({
  type: SET_ALL_TOKENS,
  payload: content,
});

export const set3DAssets = (content) => ({
  type: SET_3D_ASSETS,
  payload: content,
});

export const set2DAssets = (content) => ({
  type: SET_2D_ASSETS,
  payload: content,
});

export const setSingleNFT = (content) => ({
  type: SET_SINGLE_NFT,
  payload: content,
});

export const setAllNFTs = (content) => ({
  type: SET_ALL_NFTS,
  payload: content,
});

export const removeAllNFTs = () => ({
  type: REMOVE_ALL_NFTS,
});
