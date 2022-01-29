import * as actionTypes from "./actionTypes.actions";
import { getAccessTokenLocal } from "./localStorage.actions";

export const productUpdateSuccess = (product) => {
  return {
    type: actionTypes.PRODUCT_UPDATE,
    payload: product,
  };
};

export const productUpdateImageSuccess = (image) => {
  return {
    type: actionTypes.PRODUCT_UPDATE_IMAGE,
    payload: image,
  };
};

export const productUpdate = (id, name, content, price, category) => {
  return async function (dispatch) {
    let url = `http://localhost:5000/product/edit/${id}`;

    const response = await fetch(url, {
      method: "PUT",
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

    return dispatch(productUpdateSuccess(data));
  };
};

export const productUpdateImage = (imageUrl, id) => {
  return async function (dispatch) {
    let url = `http://localhost:5000/product/editImage/${id}`;

    var bodyFormData = new FormData();

    bodyFormData.append("imageUrl", imageUrl[0]);
    bodyFormData.append("imageUrl", imageUrl[1]);
    bodyFormData.append("imageUrl", imageUrl[2]);
    bodyFormData.append("imageUrl", imageUrl[3]);
    bodyFormData.append("imageUrl", imageUrl[4]);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer: ${getAccessTokenLocal()[0]}`,
      },
      body: bodyFormData,
    });
    const data = await response.json();

    return dispatch(productUpdateImageSuccess(data));
  };
};
