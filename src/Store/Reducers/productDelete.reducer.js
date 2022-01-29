import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function productDeleteReducer(
  state = initialState.productDelete,
  action
) {
  switch (action.type) {
    case actionTypes.PRODUCT_DELETE:
      return action.payload;
    default:
      return state;
  }
}
