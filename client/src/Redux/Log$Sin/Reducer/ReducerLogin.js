import * as Type from "../Type/TypeLog&Sin";

const initialState = {
  id: "",
  userName: "",
  Email: "",
  Password: "",
  login: false,
  Update: 0,
};

const ReducerDataUserLog = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_VALUE_USERNAME:
      return {
        ...state,
        login: true,
        userName: action.payload,
      };

    case Type.GET_PASSWORD_VALUE:
      return {
        ...state,
        Password: action.payload,
      };

    case Type.GET_Email_VALUE:
      return {
        ...state,
        Email: action.payload,
      };
    case Type.GET_ID_VALUE:
      return {
        ...state,
        id: action.payload,
      };
    case Type.UPDATE:
      return {
        ...state,
        Update: state.Update + 1,
      };

    case Type.LOG_OUT:
      return {
        ...state,
        login: false,
        userName: "",
        Password: "",
        Email: "",
      };

    default:
      return state;
  }
};

export default ReducerDataUserLog;
