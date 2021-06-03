import React, { useState, useEffect } from "react";
import LoginImg from "../../../Image/Log&Sing-Img/Log&Sing-Img.png";
import axios from "axios";

const SingUp = (props) => {
  const [userNameValue, setUserNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [labelUser, setLabelUser] = useState("");
  const [labelPass, setLabelPass] = useState("");
  const [labelEmail, setLabelEmail] = useState("");
  const [allUserName, setAllUserName] = useState([]);
  const [allEmail, setAllEmail] = useState([]);
  const [singUpConditional, setSingUpConditional] = useState(false);

  //sql
  // useEffect(() => getCheckingAllEmail(), [emailValue]);

  //fetch Data for get all userName and Email Mongo
  useEffect(() => {
    function getCheckingAllUserNameMongo() {
      axios
        .get("http://localhost:5001/checkUserData")
        .then(function (result) {
          console.log(result);
          setAllUserName(result.data.map((user) => user.UserName));
          setAllEmail(result.data.map((user) => user.Email));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    getCheckingAllUserNameMongo();
  }, [userNameValue]);

  // checking value of input

  useEffect(() => {
    function checkUserNameValue() {
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
    }
    checkUserNameValue();
  }, [userNameValue]);

  useEffect(() => {
    function checkEmailValue() {
      let EmailValue = emailValue;
      if (EmailValue === "") {
        setLabelEmail("insert Email");
      }
      if (
        EmailValue !== "" &&
        (!EmailValue.includes("@") ||
          EmailValue.startsWith("@") ||
          !EmailValue.endsWith(".com"))
      ) {
        setLabelEmail("Wrong Email");
      }
      if (
        EmailValue.includes("@") &&
        !EmailValue.startsWith("@") &&
        EmailValue.endsWith(".com")
      ) {
        setLabelEmail("");
      }
    }
    checkEmailValue();
  }, [emailValue]);

  useEffect(() => {
    function checkPasswordValue() {
      let passValue = passwordValue;
      if (passValue === "") {
        setLabelPass("insert password");
      }
      if (passValue !== "" && passValue.length < 8) {
        setLabelPass("password must have 8 charters at least");
      }
      if (passValue !== "" && passValue.length >= 8) {
        setLabelPass("");
      }
    }
    checkPasswordValue();
  }, [passwordValue]);

  // checking  user and email to be Quinic

  useEffect(() => {
    function checkQuinicValueUserMongo() {
      let AllUserName = allUserName;
      let UserName = userNameValue;

      let checking = AllUserName.includes(UserName);

      if (checking) {
        setLabelUser("this UserName already in use");
      }
    }
    checkQuinicValueUserMongo();
  }, [userNameValue]);

  useEffect(() => {
    function checkQuinicValueEmailMongo() {
      let AllEmail = allEmail;
      let EmailValue = emailValue;
      let checking = AllEmail.includes(EmailValue);
      if (checking) {
        setLabelEmail("this Email already in use");
      }
    }
    checkQuinicValueEmailMongo();
  }, [emailValue]);

  // Value of input

  const getInputUserNameValue = (userValue) => {
    setUserNameValue(userValue);
  };

  const getInputPasswordValue = (passValue) => {
    setPasswordValue(passValue);
  };

  const getInputEmailValue = (emailValue) => {
    setEmailValue(emailValue);
  };

  //-------------------------------------------
  //Mongo Data work on prot 5001 public server

  // mongo function active
  const postInputsMongo = () => {
    axios.post("http://localhost:5001/UserData", {
      password: passwordValue,
      userName: userNameValue,
      Email: emailValue,
    });
  };

  //------------------------------------------------------
  //Sql Data work on localHost 5000 prot

  //(sql disable but you can active it
  // by replace function sql and disable
  //mongo function because )

  //post user and pass and email
  const postInputsSql = () => {
    axios.post("http://localhost:5000/singUp", {
      password: passwordValue,
      userName: userNameValue,
      Email: emailValue,
    });
  };

  const postDataUser = () => {
    axios.post("http://localhost:5000/UserData", {
      userName: userNameValue,
    });
  };

  //get user and pass and email from DataBase

  const getCheckingAllUserNameSql = () => {
    axios
      .get("http://localhost:5000/checkUser")
      .then(function (result) {
        console.log(result);
        setAllUserName(result.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCheckingAllEmail = () => {
    axios
      .get("http://localhost:5000/checkEmail")
      .then(function (result) {
        setAllEmail(result.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // check quinic userName and email

  const checkQuinicValueUserSql = () => {
    let AllUserName = allUserName;
    let UserName = userNameValue;

    let checking = AllUserName.filter((user) => user.userName === UserName);

    if (checking.length > 0) {
      setLabelUser("this UserName already in use");
    }
  };

  const checkQuinicValueEmailSql = () => {
    let AllEmail = allEmail;
    let EmailValue = emailValue;
    let checking = AllEmail.filter((Email) => Email.Email === EmailValue);
    if (checking.length > 0) {
      setLabelEmail("this Email already in use");
    }
  };

  //--------------------------------------------------
  // on click singUp btn
  const singUp = async () => {
    let LabelUser = labelUser;
    let LabelPass = labelPass;
    let LabelEmail = labelEmail;
    if (LabelPass === "" && LabelUser === "" && LabelEmail === "") {
      try {
        // const postDataUsers = await postDataUser(); (active when sql want work)
        const postInput = await postInputsMongo();
        return (
          postInput,
          // postDataUsers,(active when sql want work)
          setTimeout(() => {
            setSingUpConditional(true);
          }, 500)
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {!singUpConditional ? (
        <div className="base-container" ref={props.containerRef}>
          <div className="header">Sing up</div>
          <div className="content">
            <div className="image">
              <img src={LoginImg} alt="login" />
            </div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  className="input"
                  type="text"
                  name="username"
                  onChange={(e) => getInputUserNameValue(e.target.value)}
                  placeholder="username"
                />
                <label className="labelWarning">{labelUser}</label>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="input"
                  type="email"
                  onChange={(e) => getInputEmailValue(e.target.value)}
                  name="email"
                  placeholder="email"
                />
                <label className="labelWarning">{labelEmail}</label>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={(e) => getInputPasswordValue(e.target.value)}
                  placeholder="password"
                />
                <label className="labelWarning">{labelPass}</label>
              </div>
            </div>
          </div>
          <div className="footer">
            <button onClick={singUp} type="button" className="btn">
              Sing up
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="base-container" ref={props.containerRef}>
            <div className="header">Sing up</div>
            <div className="content">
              <div className="image">
                <img src={LoginImg} alt="login" />
              </div>
              <div className="form">
                <div className="form-group">
                  <h1 className="loginSuccess">you are SingUp successfully</h1>
                  <p className="loginSuccessP">now you can login</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingUp;
