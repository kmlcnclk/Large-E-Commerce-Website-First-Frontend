import * as actionTypes from "./actionTypes.actions";
import axios from "axios";

export const getAllCategorySuccess = (category) => {
  return {
    type: actionTypes.GET_ALL_CATEGORY_SUCCESS,
    payload: category,
  };
};

export const currentCategory = (category) => {
  return {
    type: actionTypes.CURRENT_CATEGORY,
    payload: category,
  };
};

export const getAllCategory = () => {
  return function (dispatch) {
    let url = "http://localhost:5000/category";
    return axios
      .get(url)
      .then((response) => dispatch(getAllCategorySuccess(response.data.data)))
      .catch((err) => console.error(err));
  };
};
