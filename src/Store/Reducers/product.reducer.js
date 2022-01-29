import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function productReducer(state = initialState.products, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_PRODUCT_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
