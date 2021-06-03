import React from "react";
import "./LogOut.css";
import { connect } from "react-redux";
import { Logout } from "../../../Redux/Log$Sin/Action/ActionLog&Sin";
import { Link } from "react-router-dom";

const LogOut = ({ logout }) => {
  return (
    <div className="containerLogIn">
      <div className="fromLogOut">
        <h1 className="titleLogin">your are already Login</h1>
        <div className="btnContainerLogin">
          <Link to="/MyAccount" className="LinkLog">
            <div className="btnLog">My account</div>
          </Link>
          <div className="btnLog" onClick={() => logout()}>
            LogOut
          </div>
          <Link className="LinkLog" to="/">
            <div className="btnLog">Home</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(Logout()),
  };
};

export default connect(null, mapDispatchToProps)(LogOut);
