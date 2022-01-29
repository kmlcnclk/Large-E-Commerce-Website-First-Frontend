import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function loginReducer(state = initialState.login, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return action.payload;

    default:
      return null;
  }
}
