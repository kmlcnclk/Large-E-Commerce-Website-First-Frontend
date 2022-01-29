import * as actionTypes from "./actionTypes.actions";

export const loadingScreen = (loading) => {
  return {
    type: actionTypes.LOADING_SCREEN,
    payload: loading,
  };
};
