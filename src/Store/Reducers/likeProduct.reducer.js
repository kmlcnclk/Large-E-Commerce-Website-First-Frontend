import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function likeProductReducer(state = initialState.like, action) {
  switch (action.type) {
    case actionTypes.LIKE_PRODUCT:
      return action.payload;
    default:
      return state;
  }
}
