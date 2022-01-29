import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function forgotPasswordReducer(
  state = initialState.forgotPassword,
  action
) {
  switch (action.type) {
    case actionTypes.FORGOT_PASSWORD:
      return action.payload;

    default:
      return state;
  }
}
