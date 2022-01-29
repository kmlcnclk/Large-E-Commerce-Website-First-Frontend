import * as actionTypes from "./actionTypes.actions";

export const profileImageLocal = (profileImageLocal) => {
  return {
    type: actionTypes.PROFILE_IMAGE_LOCAL,
    payload: profileImageLocal,
  };
};
