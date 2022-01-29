import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function productUpdateImageReducer(
  state = initialState.productUpdateImage,
  action
) {
  switch (action.type) {
    case actionTypes.PRODUCT_UPDATE_IMAGE:
      return action.payload;
    default:
      return state;
  }
}
