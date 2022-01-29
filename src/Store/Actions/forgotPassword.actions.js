import * as actionTypes from "./actionTypes.actions";

export const forgotPasswordSuccess = (forgotPassword) => {
  return {
    type: actionTypes.FORGOT_PASSWORD,
    payload: forgotPassword,
  };
};

export const forgotPassword = (email) => {
  return async function (dispatch) {
    let url = "http://localhost:5000/auth/forgotpassword";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    const data = await response.json();

    return dispatch(forgotPasswordSuccess(data));
  };
};
