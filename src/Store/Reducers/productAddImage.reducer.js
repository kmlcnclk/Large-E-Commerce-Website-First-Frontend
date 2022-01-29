import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function productAddImageReducer(
  state = initialState.productAddImage,
  action
) {
  switch (action.type) {
    case actionTypes.PRODUCT_ADD_IMAGE:
      return action.payload;
    default:
      return state;
  }
}
