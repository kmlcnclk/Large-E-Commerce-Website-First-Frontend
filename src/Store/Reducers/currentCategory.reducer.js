import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function currentCategoryReducer(
  state = initialState.currentCategory,
  action
) {
  switch (action.type) {
    case actionTypes.CURRENT_CATEGORY:
      return action.payload;

    default:
      return state;
  }
}
