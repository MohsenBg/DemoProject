const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const connection = mysql.createConnection({
  // host: "sql6.freesqldatabase.com",
  // user: "sql6413368",
  // password: "Edf8ZFJeJS",
  // database: "sql6413368",

  host: "localhost",
  user: "root",
  password: "root",
  database: "login",
});

app.use(bodyParser.json());
app.use(cors());

app.get("/checkUser", (req, res) => {
  const GET_USERNAME = "SELECT userName FROM login";
  connection.query(GET_USERNAME, (err, result) => {
    if (result) /*console.log(result),*/ res.send(result);
    // if (err) console.log(err);
  });
});

app.get("/checkEmail", (req, res) => {
  const GET_Email = "SELECT Email FROM login ";
  connection.query(GET_Email, (err, result) => {
    if (result) /*console.log(result),*/ res.send(result);
    // if (err) console.log(err);
  });
});

app.get("/getDataLogin", (req, res) => {
  const GET_USER = "SELECT * FROM login";
  connection.query(GET_USER, (err, result) => {
    if (result) res.send(result);
    if (err) console.log(err);
  });
});

app.post("/singUp", (req, res) => {
  const POST_DATA_OF_USER = `INSERT INTO login.login (userName,password,Email) VALUES ('${req.body.userName}','${req.body.password}','${req.body.Email}')`;
  connection.query(POST_DATA_OF_USER, (err) => {
    if (err) console.log(err);
  });
});

app.post("/UserData", (req, res) => {
  const POST_DATA_OF_USER = `INSERT INTO login.datausers (userName) VALUES ('${req.body.userName}')`;
  connection.query(POST_DATA_OF_USER, (err) => {
    if (err) console.log(err);
  });
});

app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM login Where userName = ? AND password = ? ",
    [userName, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong pass/user" });
      }
    }
  );
});

// post Account
app.post("/SendFirstName", (req, res) => {
  const firstName = req.body.firstName;
  const userName = req.body.userName;
  const UPDATE_FIRST_NAME = `UPDATE login.datausers SET firstName ='${firstName}' WHERE (userName = '${userName}');`;

  connection.query(UPDATE_FIRST_NAME, (err, result) => {
    if (result) {
      console.log(result);
      res.send(result);
    }
    if (err) console.log(err);
  });
});

app.post("/SendLastName", (req, res) => {
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const UPDATE_LAST_NAME = `UPDATE login.datausers SET lastName ='${lastName}' WHERE (userName = '${userName}');`;

  connection.query(UPDATE_LAST_NAME, (err, result) => {
    if (result) {
      res.send(result);
    }
    if (err) console.log(err);
  });
});

app.post("/SendJob", (req, res) => {
  const job = req.body.job;
  const userName = req.body.userName;
  const UPDATE_JOB = `UPDATE login.datausers SET job ='${job}' WHERE (userName = '${userName}');`;

  connection.query(UPDATE_JOB, (err, result) => {
    if (result) {
      res.send(result);
    }
    if (err) console.log(err);
  });
});

app.post("/SendBirthday", (req, res) => {
  const birthday = req.body.birthday;
  const userName = req.body.userName;
  const UPDATE_BIRTHDAY = `UPDATE login.datausers SET birthday ='${birthday}' WHERE (userName = '${userName}');`;

  connection.query(UPDATE_BIRTHDAY, (err, result) => {
    if (result) {
      res.send(result);
    }
    if (err) console.log(err);
  });
});

app.post("/SendCountry", (req, res) => {
  const country = req.body.country;
  const userName = req.body.userName;
  const UPDATE_COUNTRY = `UPDATE login.datausers SET country ='${country}' WHERE (userName = '${userName}');`;

  connection.query(UPDATE_COUNTRY, (err, result) => {
    if (result) {
      res.send(result);
    }
    if (err) console.log(err);
  });
});

// Data Account inputs
app.post("/getAccountData", (req, res) => {
  const userName = req.body.userName;
  const DATA_ACCOUNT = `SELECT * FROM login.datausers where userName = '${userName}' `;
  connection.query(DATA_ACCOUNT, (err, result) => {
    if (result) {
      res.send(result);
    }
    if (err) res.send(err);
  });
});

app.post("/UserAndEmail", (req, res) => {
  const userName = req.body.userName;
  const DATA_ACCOUNT = `SELECT * FROM login.login where userName = '${userName}' `;
  connection.query(DATA_ACCOUNT, (err, result) => {
    if (result) {
      res.send(result);
    }
    if (err) res.send(err);
  });
});

//ChangePassword
app.post("/ChangePassword", (req, res) => {
  const NewPassword = req.body.NewPassword;
  const userName = req.body.userName;
  const UPDATE_PASSWORD = `UPDATE login.login SET password= '${NewPassword}' WHERE (userName = '${userName}')`;

  connection.query(UPDATE_PASSWORD, (err, result) => {
    if (result) console.log(result);
    else (err) => console.log(err);
  });
});

app.listen(5000, () => {
  console.log("Server is Running");
});
