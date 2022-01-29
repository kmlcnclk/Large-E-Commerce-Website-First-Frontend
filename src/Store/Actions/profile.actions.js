import * as actionTypes from "./actionTypes.actions";
import { getAccessTokenLocal } from "./localStorage.actions";

export const profileSuccess = (profile) => {
  return {
    type: actionTypes.PROFILE,
    payload: profile,
  };
};

export const profile = () => {
  return async function (dispatch) {
    let url = "http://localhost:5000/auth/profile";

    const response = await fetch(url, {
      headers: { Authorization: `Bearer: ${getAccessTokenLocal()[0]}` },
    });

    const data = await response.json();

    return dispatch(profileSuccess(data));
  };
};
