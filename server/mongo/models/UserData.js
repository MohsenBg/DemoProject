const mongoose = require("mongoose");

const UserDataSchema = mongoose.Schema({
  UserName: {
    type: String,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  FirstName: {
    type: String,
    default: "",
  },
  LastName: {
    type: String,
    default: "",
  },
  Job: {
    type: String,
    default: "",
  },
  Birthday: {
    type: String,
    default: "",
  },
  Country: {
    type: String,
    default: "",
  },
});

const UserData = mongoose.model("UserData", UserDataSchema);

module.exports = UserData;
