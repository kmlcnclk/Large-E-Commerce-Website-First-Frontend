import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function loginReducer(state = initialState.user, action) {
  switch (action.type) {
    case actionTypes.USERDATA:
      return action.payload;

    default:
      return state;
  }
}
