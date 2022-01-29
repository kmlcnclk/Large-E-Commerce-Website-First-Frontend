import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function productAddReducer(
  state = initialState.productAdd,
  action
) {
  switch (action.type) {
    case actionTypes.PRODUCT_ADD:
      return action.payload;

    default:
      return state;
  }
}
