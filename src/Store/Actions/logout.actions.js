import * as actionTypes from "./actionTypes.actions";
// import axios from "axios";
import { getAccessTokenLocal } from "./localStorage.actions";

export const logoutSuccess = (logout) => {
  return {
    type: actionTypes.LOGOUT,
    payload: logout,
  };
};

export const logoutNotSuccess = (logout) => {
  return {
    type: actionTypes.NOTLOGOUT,
    payload: logout,
  };
};

export const logout = () => {
  return async function (dispatch) {
    let url = "http://localhost:5000/auth/logout";
    // const response = await axios.get(url, {
    //   headers: { Authorization: `Bearer: ${getAccessTokenLocal()}` },
    // });
    // .then((response) => {
    //   dispatch(logoutSuccess(response.data.message));
    // })
    // .catch((err) => {
    //   dispatch(logoutNotSuccess("Please try again"));
    // });
    const response = await fetch(url, {
      headers: { Authorization: `Bearer: ${getAccessTokenLocal()[0]}` },
    });

    const data = await response.json();

    return dispatch(logoutSuccess(data.message));
  };
};
