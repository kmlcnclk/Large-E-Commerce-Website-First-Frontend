import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function productUpdateReducer(
  state = initialState.productUpdate,
  action
) {
  switch (action.type) {
    case actionTypes.PRODUCT_UPDATE:
      return action.payload;
    default:
      return state;
  }
}
