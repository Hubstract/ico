import {GET_NFT_LIST} from "../_actions/types";

let initialState = {
    allNFTsList: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NFT_LIST:
        return {
            ...state,
            allNFTsList:payload,
        }
    default:
      return state;
  }
}
