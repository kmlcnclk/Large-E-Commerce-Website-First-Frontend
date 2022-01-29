import * as actionTypes from "./actionTypes.actions";

export const localStorageSuccess = (user) => {
  return {
    type: actionTypes.USERDATA,
    payload: user,
  };
};

export const localStorage = (data) => {
  return function (dispatch) {
    addLocal(data);
    const datas = getLocal();
    datas.forEach((get) => {
      if (get.name === data.name) {
        return dispatch(localStorageSuccess(get));
      } else {
        return dispatch(localStorageSuccess({}));
      }
    });
  };
};

export const addLocal = (user) => {
  const getUser = getLocal();

  if (getUser.indexOf(user) === -1 && user !== {}) {
    getUser.push(user);
  }

  window.localStorage.setItem("User", JSON.stringify(getUser));
};

export const getLocal = () => {
  let user;
  if (window.localStorage.getItem("User") === null) {
    user = [];
  } else {
    user = JSON.parse(window.localStorage.getItem("User"));
  }
  return user;
};

export const addAccessTokenLocal = (access_token) => {
  const getToken = getAccessTokenLocal();

  if (getToken.indexOf(access_token) === -1 && access_token !== "") {
    getToken.push(access_token);
  }

  window.localStorage.setItem("access_token", JSON.stringify(getToken));
};

export const getAccessTokenLocal = () => {
  let access_token;
  if (window.localStorage.getItem("access_token") === null) {
    access_token = [];
  } else {
    access_token = JSON.parse(window.localStorage.getItem("access_token"));
  }
  return access_token;
};

export const deleteAccessTokenLocal = () => {
  window.localStorage.removeItem("access_token");
};

export const deleteLocal = () => {
  window.localStorage.removeItem("User");
};
