import * as actionTypes from "./actionTypes.actions";
import { getAccessTokenLocal } from "./localStorage.actions";

export const productDeleteSuccess = (product) => {
  return {
    type: actionTypes.PRODUCT_DELETE,
    payload: product,
  };
};

export const productDelete = (id) => {
  return async function (dispatch) {
    let url = `http://localhost:5000/product/delete_product/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer: ${getAccessTokenLocal()[0]}`,
      },
    });
    const data = await response.json();

    return dispatch(productDeleteSuccess(data));
  };
};
