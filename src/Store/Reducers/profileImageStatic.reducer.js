import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function profileImageStaticReducer(
  state = initialState.profileImageStatic,
  action
) {
  switch (action.type) {
    case actionTypes.PROFILE_IMAGE_STATIC:
      return action.payload;

    default:
      return state;
  }
}
