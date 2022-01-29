import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function profileEditReducer(
  state = initialState.profileEdit,
  action
) {
  switch (action.type) {
    case actionTypes.PROFILE_EDIT:
      return action.payload;

    default:
      return state;
  }
}
