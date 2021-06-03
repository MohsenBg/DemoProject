// I can use Route for clean my code but it's a simple
// and i add Route for app when it's get big

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

const UserDataModel = require("./models/UserData");

app.use(bodyParser.json());
app.use(cors());

//mongoose Connection
mongoose.connect(
  process.env.CONNECTION_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("mongoDB connect")
);

//ChangePassword

app.put("/ChangePassword", async (req, res) => {
  const Id = req.body.Id;
  const NewPassword = req.body.NewPassword;
  const UserData = UserDataModel;
  try {
    UserDataModel.findById(Id, (err, UpdatePassword) => {
      UpdatePassword.Password = NewPassword;
      UpdatePassword.save();
      res.send("PasswordUpdate");
    });
  } catch (err) {
    console.log(err);
  }
});

//Store password And Email when User Login
app.post("/passwordAndEmail", async (req, res) => {
  const UserName = req.body.userName;
  UserDataModel.find({ UserName: UserName }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

//Login
app.post("/login", async (req, res) => {
  const UserName = req.body.userName;
  const Password = req.body.password;
  UserDataModel.find(
    { UserName: UserName, Password: Password },
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      res.send(result);
      console.log(err);
    }
  );
});

//get SinUp inputs (for check quinic userName and Email)
app.get("/checkUserData", async (req, res) => {
  UserDataModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send(result);
    }
  });
});

//post SinUp inputs
app.post("/UserData", async (req, res) => {
  const UserName = req.body.userName;
  const Password = req.body.password;
  const Email = req.body.Email;

  const UserData = new UserDataModel({
    UserName: UserName,
    Password: Password,
    Email: Email,
  });
  try {
    await UserData.save();
    console.log(UserData);
  } catch (err) {
    console.log(err);
  }
});

//-------------------------------------------
// put inputs Account

//put FirstName
app.put("/SendFirstName", async (req, res) => {
  const Id = req.body.Id;
  const firstName = req.body.firstName;
  console.log(Id);
  try {
    UserDataModel.findById(Id, (err, UpdateFirstName) => {
      UpdateFirstName.FirstName = firstName;
      UpdateFirstName.save();
      res.send("UpdateFirstNameSuccessfully");
    });
  } catch (err) {
    console.log(err);
  }
});

//put LastName
app.put("/SendLastName", async (req, res) => {
  const Id = req.body.Id;
  const lastName = req.body.lastName;
  try {
    UserDataModel.findById(Id, (err, UpdateLastName) => {
      UpdateLastName.LastName = lastName;
      UpdateLastName.save();
      res.send("UpdateLastNameSuccessfully");
    });
  } catch (err) {
    console.log(err);
  }
});

//put Job
app.put("/SendJob", async (req, res) => {
  const Id = req.body.Id;
  const job = req.body.job;
  try {
    UserDataModel.findById(Id, (err, UpdateJob) => {
      UpdateJob.Job = job;
      UpdateJob.save();
      res.send("UpdateJobSuccessfully");
    });
  } catch (err) {
    console.log(err);
  }
});

//put Birthday
app.put("/SendBirthday", async (req, res) => {
  const Id = req.body.Id;
  const birthday = req.body.birthday;
  try {
    UserDataModel.findById(Id, (err, UpdateBirthday) => {
      UpdateBirthday.Birthday = birthday;
      UpdateBirthday.save();
      res.send("UpdateBirthdaySuccessfully");
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/SendCountry", async (req, res) => {
  const Id = req.body.Id;
  const country = req.body.country;

  try {
    UserDataModel.findById(Id, (err, UpdateCountry) => {
      UpdateCountry.Country = country;
      UpdateCountry.save();
      res.send("UpdateCountrySuccessfully");
    });
  } catch (err) {
    console.log(err);
  }
});

//  Information Account user
app.post("/getAccountData", async (req, res) => {
  const UserName = req.body.userName;
  await UserDataModel.find({ UserName: UserName }, (err, result) => {
    if (err) console.log(err);
    if (result) res.send(result);
  });
});

app.listen(process.env.Port, () => {
  console.log(`your server running in ${process.env.Port} port`);
});
