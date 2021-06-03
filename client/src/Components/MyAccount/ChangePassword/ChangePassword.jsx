import React, { useEffect, useState } from "react";
import "./ChangePassword.css";
import * as AiIcons from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Update } from "../../../Redux/Log$Sin/Action/ActionLog&Sin";
import { Redirect } from "react-router";

const ChangePassword = () => {
  //State
  const [InputPassword, setInputPassword] = useState([
    {
      id: 1,
      type: "password",
      placeholder: "Inter your password",
      PasswordShowOrHidden: true,
      value: "",
    },
    {
      id: 2,
      type: "password",
      placeholder: "Inter your New password",
      PasswordShowOrHidden: true,
      value: "",
    },
    {
      id: 3,
      type: "password",
      placeholder: "Confirm your New password",
      PasswordShowOrHidden: true,
      value: "",
    },
  ]);
  const [CheckPassword, setCheckPassword] = useState(false);
  const [LabelPasswordLength, setPasswordLength] = useState("");
  const [LabelConfirm, setLabelConfirm] = useState("");
  const [LabelChecker, setLabelChecker] = useState("");
  const [LabelSamePassword, setLabelSamePassword] = useState("");
  const [updatePassword, setUpdatePassword] = useState(0);
  const [successChangPassword, setSuccessChangPassword] = useState(false);
  const [link, setLink] = useState("/MyAccount");

  const UpdateDispatch = useDispatch();
  const UserPassword = useSelector((state) => state.DataUser.Password);
  const userName = useSelector((state) => state.DataUser.userName);

  const Id = useSelector((state) => state.DataUser.id);

  const showOrHidden = (id, showOrHidden) => {
    if (showOrHidden) {
      let arr = [...InputPassword];
      let obj0 = InputPassword.filter((input) => input.id === id);
      obj0[0].PasswordShowOrHidden = false;
      obj0[0].type = "text";
      arr[id - 1] = obj0[0];
      setInputPassword(arr);
    } else {
      let arr = [...InputPassword];
      let obj0 = InputPassword.filter((input) => input.id === id);
      obj0[0].PasswordShowOrHidden = true;
      obj0[0].type = "password";
      arr[id - 1] = obj0[0];
      setInputPassword(arr);
    }
  };

  const getInputsValue = (id, value) => {
    let arr = [...InputPassword];
    let obj = InputPassword.filter((input) => input.id === id);
    obj[0].value = value;
    arr[id - 1] = obj[0];
    setInputPassword(arr);
  };

  useEffect(() => checkPassword(), [InputPassword[0].value]);

  useEffect(
    () => ConfirmPassword(),
    [InputPassword[2].value, InputPassword[1].value, InputPassword[2].value]
  );

  useEffect(() => UpdateDispatch(Update()), [updatePassword]);

  useEffect(
    () => samePassword(),
    [InputPassword[2].value, InputPassword[1].value, InputPassword[2].value]
  );

  useEffect(() => PasswordLength(), [InputPassword[1].value]);

  const samePassword = () => {
    if (
      UserPassword === InputPassword[1].value &&
      UserPassword === InputPassword[2].value
    ) {
      setLabelSamePassword("your Password already it is");
    } else {
      setLabelSamePassword("");
    }
  };

  const checkPassword = () => {
    let ValuePassword = InputPassword[0].value;
    if (UserPassword === ValuePassword) {
      setCheckPassword(true);
      setLabelChecker("");
    } else {
      setCheckPassword(false);
      setLabelChecker("your Password Wrong");
    }
  };

  const ConfirmPassword = () => {
    if (InputPassword[1].value !== InputPassword[2].value) {
      setLabelConfirm("ConfirmPassword");
    } else {
      setLabelConfirm("");
    }
  };

  const PasswordLength = () => {
    if (InputPassword[1].value.length < 8)
      setPasswordLength("Password must At least 8 characters");
    else setPasswordLength("");
  };

  //-----------------------------------------
  //SQL
  //postNewPasswordSQL

  const postNewPasswordSQL = () => {
    if (CheckPassword) {
      axios.post("http://localhost:5000/ChangePassword", {
        NewPassword: InputPassword[1].value,
        userName: userName,
      });
    }
  };

  //---------------------------
  //Mongo
  //post NewPasswordMongo

  const postNewPasswordMongo = () => {
    if (CheckPassword) {
      axios
        .put("http://localhost:5001/ChangePassword", {
          NewPassword: InputPassword[1].value,
          userName: userName,
          Id: Id,
        })
        .then((response) => {
          if (response.data === "PasswordUpdate") {
            let arr = [...InputPassword];
            const Update = () => UpdateDispatch(Update());
            arr[0].value = "";
            arr[1].value = "";
            arr[2].value = "";
            setInputPassword(arr);
            setSuccessChangPassword(true);
            setUpdatePassword(updatePassword + 1);
          }
        });
    }
  };

  const ChangePassword = async () => {
    const CheckPassword = await checkPassword();
    const PostNewPassword = await postNewPasswordMongo();

    if (
      LabelChecker === "" &&
      LabelConfirm === "" &&
      LabelPasswordLength === "" &&
      LabelSamePassword === ""
    )
      return CheckPassword, PostNewPassword;
  };

  return (
    <div>
      {!successChangPassword ? (
        <div className="totalOfChangPassword">
          <h1 className="titleChangePassword">Change Password</h1>
          {InputPassword.map((input) => (
            <div className="InputAndIconsPassword" key={input.id}>
              <input
                className="inputPasswords"
                type={input.type}
                value={input.value}
                placeholder={input.placeholder}
                onChange={(e) => getInputsValue(input.id, e.target.value)}
              />
              {input.PasswordShowOrHidden ? (
                <div
                  className="IconEye"
                  onClick={() =>
                    showOrHidden(input.id, input.PasswordShowOrHidden)
                  }
                >
                  <AiIcons.AiFillEye />
                </div>
              ) : (
                <div
                  className="IconEye"
                  onClick={() =>
                    showOrHidden(input.id, input.PasswordShowOrHidden)
                  }
                >
                  <AiIcons.AiFillEyeInvisible />
                </div>
              )}
            </div>
          ))}
          <button onClick={ChangePassword} className="btnChangePassword">
            Change Password
          </button>
          <label className="labelResult">{LabelChecker}</label>
          <label className="labelResult">{LabelPasswordLength}</label>
          <label className="labelResult">{LabelConfirm}</label>
          <label className="labelResult">{LabelSamePassword}</label>
        </div>
      ) : (
        <div className="BackgroundSuccessChangPassword">
          <h1 className="titleSuccessChangPassword">ChangPassword</h1>
          <span className="SpanSuccessChangPassword">
            your password change successfully
          </span>
          <div
            className="btnSuccessChangPassword"
            onClick={() => setSuccessChangPassword(!successChangPassword)}
          >
            OK
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
