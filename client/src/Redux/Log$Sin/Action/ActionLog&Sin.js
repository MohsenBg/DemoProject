import * as Type from "../Type/TypeLog&Sin";
import axios from "axios";

export const fetchDataLoginRequest = () => {
  return {
    type: Type.FETCH_DATA_LOGIN_REQUEST,
  };
};

export const fetchDataLoginSuccess = (users) => {
  return {
    type: Type.FETCH_DATA_LOGIN_SUCCESS,
    payload: users,
  };
};

export const fetchDataLoginFailure = (error) => {
  return {
    type: Type.FETCH_DATA_LOGIN_SUCCESS,
    payload: error,
  };
};

export const getUserNameValue = (userName) => {
  return {
    type: Type.GET_VALUE_USERNAME,
    payload: userName,
  };
};

export const getPasswordValue = (password) => {
  return {
    type: Type.GET_PASSWORD_VALUE,
    payload: password,
  };
};

export const getEmailValue = (Email) => {
  return {
    type: Type.GET_Email_VALUE,
    payload: Email,
  };
};

export const getIdValue = (id) => {
  return {
    type: Type.GET_ID_VALUE,
    payload: id,
  };
};

export const Update = () => {
  return {
    type: Type.UPDATE,
  };
};

export const Logout = () => {
  return { type: Type.LOG_OUT };
};

//sql work only
export const fetchDataUser = () => {
  return (dispatch) => {
    dispatch(fetchDataLoginRequest());
    axios
      .get("http://localhost:5000/getDataLogin")
      .then((response) => {
        const users = response.data;
        dispatch(fetchDataLoginSuccess(users));
      })
      .catch((error) => {
        const errorMsg = error.massage;
        dispatch(fetchDataLoginFailure(errorMsg));
      });
  };
};
