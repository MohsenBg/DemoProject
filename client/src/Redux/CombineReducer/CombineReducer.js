import loginReducer from "../Log$Sin/Reducer/ReducerLog&Sin";
import ReducerDataUserLog from "../Log$Sin/Reducer/ReducerLogin";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  DataUser: ReducerDataUserLog,
  login: loginReducer,
});

export default rootReducer;
