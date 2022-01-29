import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function notLogoutReducer(
  state = initialState.notLogout,
  action
) {
  switch (action.type) {
    case actionTypes.NOTLOGOUT:
      return action.payload;

    default:
      return null;
  }
}
