import * as actionTypes from "./actionTypes.actions";

export const resetPasswordSuccess = (resetPassword) => {
  return {
    type: actionTypes.RESET_PASSWORD,
    payload: resetPassword,
  };
};

export const resetPassword = (password, resetPasswordToken) => {
  return async function (dispatch) {
    let url = `http://localhost:5000/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password }),
    });

    const data = await response.json();

    return dispatch(resetPasswordSuccess(data));
  };
};
