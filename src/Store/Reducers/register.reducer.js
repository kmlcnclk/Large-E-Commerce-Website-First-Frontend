import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function registerReducer(state = initialState.register, action) {
  switch (action.type) {
    case actionTypes.REGISTER:
      return action.payload;

    default:
      return null;
  }
}
