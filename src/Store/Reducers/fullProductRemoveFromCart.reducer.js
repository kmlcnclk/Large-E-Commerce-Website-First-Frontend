import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function fullProductRemoveFromCartReducer(
  state = initialState.carts,
  action
) {
  switch (action.type) {
    case actionTypes.FULL_PRODUCT_REMOVE_FROM_CART:
      return action.payload;
    default:
      return state;
  }
}
