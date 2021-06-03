import React, { useState, useEffect } from "react";
import { Logout } from "../../Redux/Log$Sin/Action/ActionLog&Sin";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./MyAccount.css";
import ImageUser from "../../Image/Default-Img-User/user-1.png";

import Account from "../../Components/MyAccount/Account/Account";
import ChangePassword from "../../Components/MyAccount/ChangePassword/ChangePassword";
import BillingAddress from "../../Components/MyAccount/BillingAddress/BillingAddress";
import MyOrder from "../../Components/MyAccount/My order/MyOrder";
import Privacy from "../../Components/MyAccount/Privacy/Privacy";
import DeleteAccount from "../../Components/MyAccount/DeleteAccount/DeleteAccount";
import ShippingAddress from "../../Components/MyAccount/ShippingAddress/ShippingAddress";

import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as RiIcons from "react-icons/ri";

const MyAccount = ({ logOut, loginStatus, userName }) => {
  const [status, setStatus] = useState("Account");
  const [SizeScreenStatus, setSizeScreenStatus] = useState(false);

  const AccountActive = () => {
    setStatus("Account");
  };

  const ChangPasswordActive = () => {
    setStatus("ChangePassword");
  };

  const BillingAddressActive = () => {
    setStatus("BillingAddress");
  };

  const ShippingAddressActive = () => {
    setStatus("ShippingAddress");
  };

  const MyOrderActive = () => {
    setStatus("MyOrder");
  };

  const PrivacyActive = () => {
    setStatus("Privacy");
  };

  const DeleteAccountActive = () => {
    setStatus("DeleteAccount");
  };

  return (
    <div>
      {loginStatus ? (
        <div>
          <h1 className="TotalTitle">My account</h1>
          <div className="TotalOFAccount">
            <div className="RightOfPage">
              <ul className="UlButtonOFAccount">
                <li>
                  <img className="ImageUser" src={ImageUser} alt="" />
                  <p className="NameUser">{userName}</p>
                </li>

                <li className="LiButtonOFAccount" onClick={AccountActive}>
                  <FaIcons.FaUserCircle className="Icons" />
                  Account
                  <button className="ArrowIcons">
                    <RiIcons.RiArrowRightSLine />
                  </button>
                </li>
                <li className="LiButtonOFAccount" onClick={ChangPasswordActive}>
                  <SiIcons.SiKeepassxc className="Icons" />
                  Change Password
                  <button className="ArrowIcons">
                    <RiIcons.RiArrowRightSLine />
                  </button>
                </li>
                <li
                  className="LiButtonOFAccount liLogOut"
                  onClick={() => logOut()}
                >
                  <RiIcons.RiLogoutBoxRFill className="Icons" />
                  LogOut
                  <button className="ArrowIcons">
                    <RiIcons.RiArrowRightSLine />
                  </button>
                </li>
                <li
                  className="LiButtonOFAccount"
                  onClick={BillingAddressActive}
                >
                  <RiIcons.RiBankCardFill className="Icons" />
                  Billing Address
                  <button className="ArrowIcons">
                    <RiIcons.RiArrowRightSLine />
                  </button>
                </li>
                <li
                  className="LiButtonOFAccount"
                  onClick={ShippingAddressActive}
                >
                  <FaIcons.FaTruckMoving className="Icons" />
                  Shipping Address
                  <button className="ArrowIcons">
                    <RiIcons.RiArrowRightSLine />
                  </button>
                </li>
                <li className="LiButtonOFAccount" onClick={MyOrderActive}>
                  <FaIcons.FaShoppingCart className="Icons" />
                  My order
                  <button className="ArrowIcons">
                    <RiIcons.RiArrowRightSLine />
                  </button>
                </li>
                <li className="LiButtonOFAccount" onClick={PrivacyActive}>
                  <FaIcons.FaLock className="Icons" />
                  Privacy
                  <button className="ArrowIcons">
                    <RiIcons.RiArrowRightSLine />
                  </button>
                </li>
                <li className="LiButtonOFAccount" onClick={DeleteAccountActive}>
                  <FaIcons.FaTrash className="Icons" />
                  Delete Account
                  <button className="ArrowIcons">
                    <RiIcons.RiArrowRightSLine />
                  </button>
                </li>
              </ul>
            </div>
            <div className="LeftOfPage">
              {status === "Account" && (
                <div className="Account">
                  <Account />
                </div>
              )}

              {status === "ChangePassword" && (
                <div>
                  <ChangePassword />
                </div>
              )}

              {status === "BillingAddress" && (
                <div>
                  <BillingAddress />
                </div>
              )}

              {status === "ShippingAddress" && (
                <div>
                  <ShippingAddress />
                </div>
              )}

              {status === "MyOrder" && (
                <div>
                  <MyOrder />
                </div>
              )}

              {status === "Privacy" && (
                <div>
                  <Privacy />
                </div>
              )}

              {status === "DeleteAccount" && (
                <div>
                  <DeleteAccount />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Redirect to="/LoginAndSingUp" />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.DataUser.login,
    userName: state.DataUser.userName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(Logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
