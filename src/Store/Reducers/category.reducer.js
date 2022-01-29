import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function categoryReducer(
  state = initialState.categories,
  action
) {
  switch (action.type) {
    case actionTypes.GET_ALL_CATEGORY_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
