import React from "react";
import * as IconBi from "react-icons/bi";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ImageUser from "../../Image/Default-Img-User/user-1.png";

const UserName = ({ loginStatus, userName }) => {
  return (
    <div>
      <div>
        {loginStatus ? (
          <div>
            <Link className="LinkLog" to="/MyAccount">
              <span className="spanUserName">{userName}</span>
              <img className="ImageUserName" src={ImageUser} alt="" />
            </Link>
          </div>
        ) : (
          <div>
            <Link className="LinkLog" to="/LoginAndSingUp">
              <span className="spanUserName">Login</span>
              <IconBi.BiLogIn className="loginIcon" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.DataUser.login,
    userName: state.DataUser.userName,
  };
};

export default connect(mapStateToProps)(UserName);
