import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function logoutReducer(state = initialState.logout, action) {
  switch (action.type) {
    case actionTypes.LOGOUT:
      return action.payload;

    default:
      return null;
  }
}
