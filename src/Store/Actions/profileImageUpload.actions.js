import * as actionTypes from "./actionTypes.actions";
import { getAccessTokenLocal } from "./localStorage.actions";

export const profileImageUploadSuccess = (image) => {
  return {
    type: actionTypes.IMAGE_UPLOAD,
    payload: image,
  };
};

export const profileImageUpload = (profile_image) => {
  return async function (dispatch) {
    let url = "http://localhost:5000/auth/uploadimage";

    var bodyFormData = new FormData();

    bodyFormData.append("profile_image", profile_image);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer: ${getAccessTokenLocal()[0]}`,
      },
      body: bodyFormData,
    });

    const data = await response.json();

    return dispatch(profileImageUploadSuccess(data));
  };
};
