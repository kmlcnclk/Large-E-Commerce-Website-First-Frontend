import * as actionTypes from "./actionTypes.actions";
import { addAccessTokenLocal } from "./localStorage.actions";
import FormData from "form-data";

export const registerSuccess = (register) => {
  return {
    type: actionTypes.REGISTER,
    payload: register,
  };
};

export const register = (name, email, password, profile_image) => {
  return async function (dispatch) {
    let url = "http://localhost:5000/auth/register";

    var bodyFormData = new FormData();

    bodyFormData.append("name", name);
    bodyFormData.append("email", email);
    bodyFormData.append("password", password);
    bodyFormData.append("profile_image", profile_image);

    const response = await fetch(url, {
      method: "POST",
      body: bodyFormData,
    });

    const data = await response.json();

    if (data.success === true) {
      await addAccessTokenLocal(data.access_token);
    }

    return dispatch(registerSuccess(data));
  };
};
