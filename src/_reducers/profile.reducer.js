import {PROFILE_DATA_SUCCESS, PROFILE_IMAGE_FAIL, PROFILE_IMAGE_PASS, PROFILE_IMAGE_UPLOAD_FAIL,
  PROFILE_IMAGE_UPLOAD_SUCCESS} from '../_actions/types';
/*
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {user}
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
*/
const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      case PROFILE_DATA_SUCCESS:
        return {
            ...state,
            userProfile: payload
          };
      
      case PROFILE_IMAGE_FAIL:
        return {
          ...state,
          user_image: null
        };

      case PROFILE_IMAGE_PASS:
        return {
          ...state,
          user_image: payload
        };
     
      case PROFILE_IMAGE_UPLOAD_FAIL:
        return {
          ...state,
          user_image: null
        };

      case PROFILE_IMAGE_UPLOAD_SUCCESS:
        return {
          ...state,
          user_image: payload
        };

      default:
        return state;
    }
}