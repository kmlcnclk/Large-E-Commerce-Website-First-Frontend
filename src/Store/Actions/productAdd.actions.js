import * as actionTypes from "./actionTypes.actions";
import { getAccessTokenLocal } from "./localStorage.actions";

export const productAddSuccess = (product) => {
  return {
    type: actionTypes.PRODUCT_ADD,
    payload: product,
  };
};

export const productAddImageSuccess = (image) => {
  return {
    type: actionTypes.PRODUCT_ADD_IMAGE,
    payload: image,
  };
};

export const productAddImageStaticSuccess = (imageStatic) => {
  return {
    type: actionTypes.PRODUCT_ADD_IMAGE_STATIC,
    payload: imageStatic,
  };
};

export const productAdd = (name, content, price, category) => {
  return async function (dispatch) {
    let url = "http://localhost:5000/product/product_add";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer: ${getAccessTokenLocal()[0]}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        content,
        price,
        category,
      }),
    });
    const data = await response.json();

    return dispatch(productAddSuccess(data));
  };
};

export const productAddImage = (imageUrl, id) => {
  return async function (dispatch) {
    let url = `http://localhost:5000/product/productAddImage/${id}`;

    var bodyFormData = new FormData();

    bodyFormData.append("imageUrl", imageUrl[0]);
    bodyFormData.append("imageUrl", imageUrl[1]);
    bodyFormData.append("imageUrl", imageUrl[2]);
    bodyFormData.append("imageUrl", imageUrl[3]);
    bodyFormData.append("imageUrl", imageUrl[4]);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer: ${getAccessTokenLocal()[0]}`,
      },
      body: bodyFormData,
    });
    const data = await response.json();

    return dispatch(productAddImageSuccess(data));
  };
};

export const productAddImageStatic = (imageId) => {
  return async function (dispatch) {
    let url = `http://localhost:5000/public/products/${imageId}`;

    const response = await fetch(url);

    const data = await response.url;

    return dispatch(productAddImageStaticSuccess(data));
  };
};
