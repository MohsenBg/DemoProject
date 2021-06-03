import * as Type from "../Type/TypeLog&Sin";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.FETCH_DATA_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.FETCH_DATA_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case Type.FETCH_DATA_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        users: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
