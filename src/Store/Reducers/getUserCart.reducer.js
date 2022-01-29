import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function getUserCartReducer(
  state = initialState.getUserCart,
  action
) {
  switch (action.type) {
    case actionTypes.GET_USER_CART:
      return action.payload;
    default:
      return state;
  }
}
