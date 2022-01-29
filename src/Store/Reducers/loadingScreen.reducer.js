import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function loadingScreenReducer(
  state = initialState.loading,
  action
) {
  switch (action.type) {
    case actionTypes.LOADING_SCREEN:
      return action.payload;

    default:
      return state;
  }
}
