import * as actionTypes from "./actionTypes.actions";

export const profileImageStaticSuccess = (profileImageStatic) => {
  return {
    type: actionTypes.PROFILE_IMAGE_STATIC,
    payload: profileImageStatic,
  };
};

export const profileImageStatic = (imageId) => {
  return async function (dispatch) {
    let url = `http://localhost:5000/public/profiles/${imageId}`;

    const response = await fetch(url);

    const data = await response.url;

    return dispatch(profileImageStaticSuccess(data));
  };
};
