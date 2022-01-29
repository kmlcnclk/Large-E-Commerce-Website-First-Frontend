import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function productRemoveFromCartReducer(
  state = initialState.carts,
  action
) {
  switch (action.type) {
    case actionTypes.PRODUCT_REMOVE_FROM_CART:
      return action.payload;
    default:
      return state;
  }
}
