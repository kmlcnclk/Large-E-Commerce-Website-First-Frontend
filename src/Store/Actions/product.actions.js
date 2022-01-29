import * as actionTypes from "./actionTypes.actions";
import axios from "axios";
import { getAccessTokenLocal } from "./localStorage.actions";

export const getAllProductSuccess = (product) => {
  return {
    type: actionTypes.GET_ALL_PRODUCT_SUCCESS,
    payload: product,
  };
};

export const getSearchProductSuccess = (product) => {
  return {
    type: actionTypes.SEARCH_PRODUCT,
    payload: product,
  };
};

export const getProductDetailSuccess = (product) => {
  return {
    type: actionTypes.PRODUCT_DETAIL_SUCCESS,
    payload: product,
  };
};

export const productAddToCartSuccess = (product) => {
  return {
    type: actionTypes.PRODUCT_ADD_TO_CART,
    payload: product,
  };
};
export const productRemoveFromCartSuccess = (product) => {
  return {
    type: actionTypes.PRODUCT_REMOVE_FROM_CART,
    payload: product,
  };
};
export const fullProductRemoveFromCartSuccess = (product) => {
  return {
    type: actionTypes.FULL_PRODUCT_REMOVE_FROM_CART,
    payload: product,
  };
};

export const likeProductSuccess = (like) => {
  return {
    type: actionTypes.LIKE_PRODUCT,
    payload: like,
  };
};

export const undoLikeProductSuccess = (undoLike) => {
  return {
    type: actionTypes.UNDO_LIKE_PRODUCT,
    payload: undoLike,
  };
};

export const getAllProduct = (category) => {
  return function (dispatch) {
    let url = "http://localhost:5000/";

    return axios
      .get(url + "category/" + category + "?limit=20")
      .then((response) => {
        dispatch(getAllProductSuccess(response.data.data));
      })
      .catch((err) => console.error(err));
  };
};

export const getAllProductSearch = (search) => {
  return function (dispatch) {
    let url = "http://localhost:5000/product?search=";
    return axios
      .get(url + search)
      .then((response) => {
        dispatch(getSearchProductSuccess(response.data.data));
      })
      .catch((err) => console.error(err));
  };
};

export const getProductDetail = (product) => {
  return function (dispatch) {
    let url = "http://localhost:5000/product/";
    return axios
      .get(url + product)
      .then((response) => {
        dispatch(getProductDetailSuccess(response.data.data));
      })
      .catch((err) => console.error(err));
  };
};

export const productAddToCart = (product) => {
  return async function (dispatch) {
    let url = `http://localhost:5000/auth/addToCart/${product._id}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer: ${getAccessTokenLocal()[0]}`,
      },
    });
    const data = await response.json();

    return dispatch(productAddToCartSuccess(data));
  };
};

export const productRemoveFromCart = (product) => {
  return async function (dispatch) {
    let url = `http://localhost:5000/auth/removeFromCart/${product._id}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer: ${getAccessTokenLocal()[0]}`,
      },
    });
    const data = await response.json();

    return dispatch(productRemoveFromCartSuccess(data));
  };
};
export const fullProductRemoveFromCart = (product) => {
  return async function (dispatch) {
    let url = `http://localhost:5000/auth/fullRemoveFromCart/${product._id}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer: ${getAccessTokenLocal()[0]}`,
      },
    });
    const data = await response.json();

    return dispatch(fullProductRemoveFromCartSuccess(data));
  };
};

export const likeProduct = (product) => {
  return async function (dispatch) {
    let url = `http://localhost:5000/product/like/${product._id}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer: ${getAccessTokenLocal()[0]}`,
      },
    });
    const data = await response.json();

    return dispatch(likeProductSuccess(data));
  };
};

export const undoLikeProduct = (product) => {
  return async function (dispatch) {
    let url = `http://localhost:5000/product/undolike/${product._id}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer: ${getAccessTokenLocal()[0]}`,
      },
    });
    const data = await response.json();

    return dispatch(undoLikeProductSuccess(data));
  };
};
