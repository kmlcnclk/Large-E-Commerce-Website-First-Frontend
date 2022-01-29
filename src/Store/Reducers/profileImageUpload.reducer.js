import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function profileImageUploadReducer(
  state = initialState.profileImageUpload,
  action
) {
  switch (action.type) {
    case actionTypes.IMAGE_UPLOAD:
      return action.payload;

    default:
      return state;
  }
}
