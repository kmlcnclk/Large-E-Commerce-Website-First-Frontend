import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function productAddImageStaticReducer(
  state = initialState.productAddImageStatic,
  action
) {
  switch (action.type) {
    case actionTypes.PRODUCT_ADD_IMAGE_STATIC:
      return action.payload;
    default:
      return state;
  }
}
