import * as actionTypes from "./actionTypes.actions";
import { getAccessTokenLocal } from "./localStorage.actions";

export const profileEditSuccess = (profileEdit) => {
  return {
    type: actionTypes.PROFILE_EDIT,
    payload: profileEdit,
  };
};

export const profileEdit = (name, email, password, profile_image) => {
  return async function (dispatch) {
    let url = "http://localhost:5000/auth/edit";

    var bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("email", email);
    bodyFormData.append("password", password);
    bodyFormData.append("profile_image", profile_image);

    const response = await fetch(url, {
      method: "PUT",
      headers: { Authorization: `Bearer: ${getAccessTokenLocal()[0]}` },
      body: bodyFormData,
    });

    const data = await response.json();

    return dispatch(profileEditSuccess(data));
  };
};
