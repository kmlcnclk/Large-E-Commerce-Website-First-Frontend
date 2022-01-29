import * as actionTypes from "./actionTypes.actions";
import { getAccessTokenLocal } from "./localStorage.actions";

export const getUserCartSuccess = (userCart) => {
  return {
    type: actionTypes.GET_USER_CART,
    payload: userCart,
  };
};

export const getUserCart = () => {
  return async function (dispatch) {
    let url = `http://localhost:5000/auth/cart`;

    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer: ${getAccessTokenLocal()[0]}` },
    });

    const data = await response.json();

    return dispatch(getUserCartSuccess(data));
  };
};
