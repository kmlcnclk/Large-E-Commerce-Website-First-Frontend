import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function profileImageLocalReducer(
  state = initialState.profileImageLocal,
  action
) {
  switch (action.type) {
    case actionTypes.PROFILE_IMAGE_LOCAL:
      return action.payload;

    default:
      return state;
  }
}
