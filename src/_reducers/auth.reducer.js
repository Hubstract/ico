import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RECOVER_PASSWORD_CHANGE_SUCCESS
} from "../_actions/types";

// const user = JSON.parse(localStorage.getItem("user"));

// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };
const initialState = { isLoggedIn: false, user_token: null };

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user_token: payload
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user_token: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user_token: null,
      };
    case RECOVER_PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user_token: payload
      }
    default:
      return state;
  }
}