import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function resetPasswordReducer(
  state = initialState.resetPassword,
  action
) {
  switch (action.type) {
    case actionTypes.RESET_PASSWORD:
      return action.payload;

    default:
      return state;
  }
}
