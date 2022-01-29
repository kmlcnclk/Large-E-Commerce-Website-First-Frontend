import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function productAddToCartReducer(
  state = initialState.carts,
  action
) {
  switch (action.type) {
    case actionTypes.PRODUCT_ADD_TO_CART:
      return action.payload;
    default:
      return state;
  }
}
