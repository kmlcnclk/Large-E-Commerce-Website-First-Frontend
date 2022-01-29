import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function productDetailReducer(
  state = initialState.productDetail,
  action
) {
  switch (action.type) {
    case actionTypes.PRODUCT_DETAIL_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
