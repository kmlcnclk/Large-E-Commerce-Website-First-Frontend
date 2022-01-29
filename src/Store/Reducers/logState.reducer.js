import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function logStateReducer(state = initialState.logState, action) {
  switch (action.type) {
    case actionTypes.LOG_STATE:
      return action.payload;

    default:
      return state;
  }
}
