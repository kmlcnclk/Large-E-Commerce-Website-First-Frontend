import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function profileReducer(state = initialState.profile, action) {
  switch (action.type) {
    case actionTypes.PROFILE:
      return action.payload;

    default:
      return state;
  }
}
