import * as actionTypes from "./actionTypes.actions";
import axios from "axios";
import { addAccessTokenLocal } from "./localStorage.actions";

export let access_token;

export const loginSuccess = (login) => {
  return {
    type: actionTypes.LOGIN,
    payload: login,
  };
};

export const loginNotSuccess = (login) => {
  return {
    type: actionTypes.NOTLOGIN,
    payload: login,
  };
};

export const logState = (log) => {
  return {
    type: actionTypes.LOG_STATE,
    payload: log,
  };
};

export const login = (email, password) => {
  return function (dispatch) {
    let url = "http://localhost:5000/auth/login";
    return axios
      .post(url, {
        email: email,
        password: password,
      })
      .then((response) => {
        addAccessTokenLocal(response.data.access_token);
        dispatch(loginSuccess(response.data.data));
      })
      .catch((err) => dispatch(loginNotSuccess("Please try again")));
  };
};
