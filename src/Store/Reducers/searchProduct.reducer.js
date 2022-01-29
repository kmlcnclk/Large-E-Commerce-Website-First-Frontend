import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function searchProductReducer(
  state = initialState.searchProduct,
  action
) {
  switch (action.type) {
    case actionTypes.SEARCH_PRODUCT:
      return action.payload;

    default:
      return state;
  }
}
