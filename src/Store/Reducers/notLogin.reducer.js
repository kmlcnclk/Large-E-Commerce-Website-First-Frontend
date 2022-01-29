import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function loginReducer(state = initialState.notLogin, action) {
  switch (action.type) {
    case actionTypes.NOTLOGIN:
      return action.payload;

    default:
      return null;
  }
}
