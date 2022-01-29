import * as actionTypes from "../Actions/actionTypes.actions";
import initialState from "./initialState";

export default function undoLikeProductReducer(
  state = initialState.undoLike,
  action
) {
  switch (action.type) {
    case actionTypes.UNDO_LIKE_PRODUCT:
      return action.payload;
    default:
      return state;
  }
}
