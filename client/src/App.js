import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/SidePannelBar/Navbar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import MyAccount from "./Pages/MyAccount/MyAccount";
import LoginAndSingUp from "./Pages/Log&Sin/Login&SinUp";
import axios from "axios";
import {
  getEmailValue,
  getPasswordValue,
  getIdValue,
} from "./Redux/Log$Sin/Action/ActionLog&Sin";
import { connect } from "react-redux";

const App = ({
  userName,
  loginStatus,
  getEmail,
  getPassword,
  getId,
  UpdateProps,
}) => {
  const [UserName, setUserName] = useState();

  //mongo
  useEffect(() => {
    function getPasswordANDEmailAndIdMongo() {
      axios
        .post("http://localhost:5001/passwordAndEmail", {
          userName: userName,
        })
        .then((response) => {
          try {
            getPassword(response.data[0].Password);
            getEmail(response.data[0].Email);
            getId(response.data[0]._id);
            console.log(response.data);
          } catch (error) {
            getPassword("");
            getEmail("");
            getId("");
            console.log(response.data);
          }
        });
    }
    getPasswordANDEmailAndIdMongo();
  }, [UserName, UpdateProps, loginStatus]);

  setTimeout(() => {
    setUserName(userName);
  }, 1000);

  //----------------
  //SQL

  const getPasswordANDEmailSQL = () => {
    axios
      .post("http://localhost:5000/UserAndEmail", {
        userName: userName,
      })
      .then((response) => {
        try {
          getPassword(response.data[0].Password);
          getEmail(response.data[0].Email);
          getId(response.data[0]._id);
          console.log(response.data);
        } catch (error) {
          getPassword("");
          getEmail("");
          getId("");
          console.log(response.data);
        }
      });
  };

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/MyAccount" component={MyAccount} />
          <Route path="/LoginAndSingUp" component={LoginAndSingUp} />
        </Switch>
      </Router>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    UpdateProps: state.DataUser.Update,
    userName: state.DataUser.userName,
    loginStatus: state.DataUser.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPassword: (email) => dispatch(getPasswordValue(email)),
    getEmail: (password) => dispatch(getEmailValue(password)),
    getId: (id) => dispatch(getIdValue(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
