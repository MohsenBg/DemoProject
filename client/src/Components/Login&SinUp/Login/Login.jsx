import React, { useState } from "react";
import LoginImg from "../../../Image/Log&Sing-Img/Log&Sing-Img.png";
import axios from "axios";
import "./Login.css";
import { Redirect } from "react-router-dom";
import { getUserNameValue } from "../../../Redux/Log$Sin/Action/ActionLog&Sin";
import { connect } from "react-redux";

function Login({ getUserName }, props) {
  const [userNameValue, setUserNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loginMassage, setLoginMassage] = useState("");
  const [loginLink, setLoginLink] = useState("/LoginAndSingUp");
  const [labelUser, setLabelUser] = useState("");
  const [labelPassword, setLabelPassword] = useState("");

  const getInputUserNameLogin = (usernameValue) => {
    setUserNameValue(usernameValue);
  };

  const getInputPasswordLogin = (passwordValue) => {
    setPasswordValue(passwordValue);
  };

  // SEND userName to my redux store
  const sendUserNameValue = () => {
    getUserName(userNameValue);
  };

  const checkUserName = () => {
    let userValue = userNameValue;
    if (userValue === "") {
      setLabelUser("insert userName");
    }
    if (userValue !== "" && userValue.length < 5) {
      setLabelUser("userName must have 5 charters at least");
    }
    if (userValue !== "" && userValue.length >= 5) {
      setLabelUser("");
    }
  };

  const checkPassword = () => {
    let passValue = passwordValue;
    if (passValue === "") {
      setLabelPassword("insert password");
    }
    if (passValue !== "" && passValue.length < 8) {
      setLabelPassword("password must have 8 charters at least");
    }
    if (passValue !== "" && passValue.length >= 8) {
      setLabelPassword("");
    }
  };

  const login = () => {
    let userValue = userNameValue;
    let passValue = passwordValue;
    checkUserName();
    checkPassword();
    try {
      if (
        passValue !== "" &&
        userValue !== "" &&
        passValue.length >= 8 &&
        userValue.length >= 5
      ) {
        getDataUserMongo();
        setLabelUser("");
        setLabelPassword("");
      }
    } catch (e) {
      console.log(e instanceof TypeError);
      console.log(e.message); // "null has no properties"
      console.log(e.name); // "TypeError"
      console.log(e.fileName); // "Scratchpad/1"
      console.log(e.lineNumber); // 2
      console.log(e.columnNumber); // 2
      console.log(e.stack); // "@Scratchpad/2:2:3\n"
    }
  };

  //-------------------------------------------
  //Mongo

  const getDataUserMongo = () => {
    try {
      axios
        .post("http://localhost:5001/login", {
          userName: userNameValue,
          password: passwordValue,
        })
        .then((response) => {
          if (response.data.length < 1) {
            setLoginMassage("your password/userName wrong");
          } else {
            console.log(response.data.length);
            setLoginMassage(`welcome ${response.data[0].userName}`);
            setLoginLink("/");
            sendUserNameValue();
          }
        });
    } catch (e) {
      console.log(e instanceof TypeError);
      console.log(e.message); // "null has no properties"
      console.log(e.name); // "TypeError"
      console.log(e.fileName); // "Scratchpad/1"
      console.log(e.lineNumber); // 2
      console.log(e.columnNumber); // 2
      console.log(e.stack); // "@Scratchpad/2:2:3\n"
    }
  };

  //------------------------------------
  //SQL

  const getDataUser = () => {
    try {
      axios
        .post("http://localhost:5000/login", {
          userName: userNameValue,
          password: passwordValue,
        })
        .then((response) => {
          if (response.data.message) {
            setLoginMassage(response.data.message);
          } else {
            setLoginMassage(`welcome ${response.data[0].userName}`);
            setLoginLink("/");
            sendUserNameValue();
          }
        });
    } catch (e) {
      console.log(e instanceof TypeError);
      console.log(e.message); // "null has no properties"
      console.log(e.name); // "TypeError"
      console.log(e.fileName); // "Scratchpad/1"
      console.log(e.lineNumber); // 2
      console.log(e.columnNumber); // 2
      console.log(e.stack); // "@Scratchpad/2:2:3\n"
    }
  };

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">
        <span aria-hidden="true">Login</span>
        <span aria-hidden="true">Login</span>
        <span aria-hidden="true">Login</span>
      </div>
      <div className="content">
        <div className="image">{<img src={LoginImg} alt="log" />}</div>
        <label className="checkLabel">{loginMassage}</label>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="input"
              type="text"
              onChange={(e) => getInputUserNameLogin(e.target.value)}
              name="username"
              placeholder="username"
            />
            <label className="labelWarning">{labelUser}</label>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="input"
              type="password"
              onChange={(e) => getInputPasswordLogin(e.target.value)}
              name="password"
              placeholder="password"
            />
            <label className="labelWarning">{labelPassword}</label>
          </div>
        </div>
      </div>
      <div className="footer">
        <Redirect to={loginLink} />
        <button onClick={login} type="button" className="btn">
          Login
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.login.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserName: (userName) => dispatch(getUserNameValue(userName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
