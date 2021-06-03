import React, { Component } from "react";
import "./Account.css";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import Country from "../../Inputs/Country/Country";
import { connect } from "react-redux";
import axios from "axios";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InputFirst: {
        id: "1",
        valueChange: "",
        readOnly: true,
        placeholder: "FirstName",
        editActive: false,
      },
      lastName: {
        id: "2",
        valueChange: "",
        readOnly: true,
        placeholder: "lastName",
        editActive: false,
      },
      job: {
        id: "3",
        valueChange: "",
        readOnly: true,
        placeholder: "job",
        editActive: false,
      },
      birthday: {
        id: "4",
        valueChange: "",
        readOnly: false,
        placeholder: "birthday",
        type: "text",
        editActive: false,
      },
      Country: {
        id: "5",
        valueChange: "",
        readOnly: true,
        placeholder: "Country",
        editActive: false,
      },
      userData: [],
    };
  }

  InputFirstNameValue = (value) => {
    let InputFirst = { ...this.state.InputFirst };
    let valueChange = { ...InputFirst.valueChange };
    valueChange = value;
    InputFirst.valueChange = valueChange;
    this.setState({
      InputFirst,
    });
  };

  InputLastNameValue = (value) => {
    let lastName = { ...this.state.lastName };
    let valueChange = { ...lastName.valueChange };
    valueChange = value;
    lastName.valueChange = valueChange;
    this.setState({
      lastName,
    });
  };

  InputJobValue = (value) => {
    let job = { ...this.state.job };
    let valueChange = { ...job.valueChange };
    valueChange = value;
    job.valueChange = valueChange;
    this.setState({
      job,
    });
  };

  InputBirthdayValue = (value) => {
    let birthday = { ...this.state.birthday };
    let valueChange = { ...birthday.valueChange };
    valueChange = value;
    birthday.valueChange = valueChange;
    this.setState({ birthday });
  };

  EditInput = (idInput) => {
    if (idInput === "1") {
      this.setState({
        InputFirst: {
          id: "1",
          readOnly: false,
          editActive: true,
          valueChange: "",
        },
      });
      this.InputFirst.focus();
    }

    if (idInput === "2") {
      this.setState({
        lastName: {
          id: "2",
          readOnly: false,
          editActive: true,
          valueChange: "",
        },
      });
      this.InputLastName.focus();
    }

    if (idInput === "3") {
      this.setState({
        job: {
          id: "3",
          readOnly: false,
          editActive: true,
          valueChange: "",
        },
      });
      this.InputJob.focus();
    }

    if (idInput === "4") {
      let birthday = { ...this.state.birthday };
      let readOnly = { ...birthday.readOnly };
      readOnly = true;
      birthday.readOnly = readOnly;
      this.setState({ birthday });
    }

    if (idInput === "5") {
      this.setState({
        Country: {
          id: "5",
          readOnly: false,
        },
      });
    }
  };

  SaveInput = async (idInput) => {
    if (idInput === "1") {
      const UpdateFirstName = await this.UpdateFirstNameMongo();
      return (
        UpdateFirstName,
        setTimeout(() => {
          this.setState({
            InputFirst: {
              id: "1",
              readOnly: true,
              placeholder: this.state.InputFirst.valueChange,
            },
          });
        }, 1000)
      );
    }

    if (idInput === "2") {
      const UpdateLastName = await this.UpdateLastNameMongo();
      return (
        UpdateLastName,
        setTimeout(() => {
          this.setState({
            lastName: {
              id: "2",
              readOnly: true,
              placeholder: this.state.lastName.valueChange,
            },
          });
        }, 1000)
      );
    }

    if (idInput === "3") {
      const UpdateJob = await this.UpdateJobMongo();
      return (
        UpdateJob,
        setTimeout(() => {
          this.setState({
            job: {
              id: "3",
              readOnly: true,
              placeholder: this.state.job.valueChange,
            },
          });
        }, 1000)
      );
    }

    if (idInput === "4") {
      const UpdateBirthday = await this.UpdateBirthdayMongo();
      return (
        UpdateBirthday,
        setTimeout(() => {
          let birthday = { ...this.state.birthday };
          let readOnly = { ...birthday.readOnly };
          readOnly = false;
          birthday.readOnly = readOnly;
          this.setState({ birthday });
        }, 1000)
      );
    }
  };

  getValueOfCountry = (value) => {
    return this.setState({
      Country: {
        id: "5",
        valueChange: value,
        readOnly: false,
        placeholder: value,
      },
    });
  };

  SaveValueOfCountry = async () => {
    const UpdateCountry = this.UpdateCountryMongo();
    return (
      UpdateCountry,
      setTimeout(() => {
        let Country = { ...this.state.Country };
        let readOnly = { ...Country.readOnly };
        readOnly = true;
        Country.readOnly = readOnly;

        this.setState({ Country });
      }, 1000)
    );
  };

  //--------------------------------------
  //Mongo
  UpdateFirstNameMongo = () => {
    axios.put("http://localhost:5001/SendFirstName", {
      userName: this.props.userName,
      firstName: this.state.InputFirst.valueChange,
      Id: this.props.Id,
    });
  };

  UpdateLastNameMongo = () => {
    axios.put("http://localhost:5001/SendLastName", {
      userName: this.props.userName,
      lastName: this.state.lastName.valueChange,
      Id: this.props.Id,
    });
  };

  UpdateJobMongo = () => {
    axios.put("http://localhost:5001/SendJob", {
      userName: this.props.userName,
      job: this.state.job.valueChange,
      Id: this.props.Id,
    });
  };

  UpdateBirthdayMongo = () => {
    axios.put("http://localhost:5001/SendBirthday", {
      userName: this.props.userName,
      birthday: this.state.birthday.valueChange,
      Id: this.props.Id,
    });
  };

  UpdateCountryMongo = () => {
    axios.put("http://localhost:5001/SendCountry", {
      userName: this.props.userName,
      country: this.state.Country.valueChange,
      Id: this.props.Id,
    });
  };

  getUserDataMongo = () => {
    axios
      .post("http://localhost:5001/getAccountData", {
        userName: this.props.userName,
      })
      .then((response) => {
        this.setState({
          userData: response.data,
        });
      });
  };
  //----------------------------------
  //SQL

  //post (Update) inputs
  UpdateFirstNameSQL = () => {
    axios.post("http://localhost:5000/SendFirstName", {
      userName: this.props.userName,
      firstName: this.state.InputFirst.valueChange,
    });
  };

  UpdateLastNameSQL = () => {
    axios.post("http://localhost:5000/SendLastName", {
      userName: this.props.userName,
      lastName: this.state.lastName.valueChange,
    });
  };

  UpdateJobSQL = () => {
    axios.post("http://localhost:5000/SendJob", {
      userName: this.props.userName,
      job: this.state.job.valueChange,
    });
  };

  UpdateBirthdaySQL = () => {
    axios.post("http://localhost:5000/SendBirthday", {
      userName: this.props.userName,
      birthday: this.state.birthday.valueChange,
    });
  };

  UpdateCountrySQL = () => {
    axios.post("http://localhost:5000/SendCountry", {
      userName: this.props.userName,
      country: this.state.Country.valueChange,
    });
  };

  //get all userData
  getUserDataSql = () => {
    axios
      .post("http://localhost:5000/getAccountData", {
        userName: this.props.userName,
      })
      .then((response) => {
        this.setState({
          userData: response.data,
        });
      });
  };

  //----------------------------------------------

  componentDidMount() {
    this.getUserDataMongo();
    //this.getUserDataSql();
  }

  componentDidUpdate() {
    this.getUserDataMongo();
    //this.getUserDataSql();
  }
  componentWillUnmount() {
    this.getUserDataMongo();
    //this.getUserDataSql();
  }

  render() {
    return (
      <div className="TotalContentAccount">
        <h1 className="titleAccount">Account</h1>
        <div className="DivFirstName">
          <label className="labelOfAccount">firstName:</label>
          <input
            ref={(InputFirst) => {
              this.InputFirst = InputFirst;
            }}
            onChange={(e) => this.InputFirstNameValue(e.target.value)}
            className="FirstNameAccountInput"
            type="text"
            name="FirstName"
            value={
              this.state.InputFirst.editActive
                ? this.state.InputFirst.valueChange
                : this.state.userData.map((user) => user.FirstName)
            }
            id="1"
            placeholder={this.state.InputFirst.placeholder}
            readOnly={this.state.InputFirst.readOnly}
          />
          <RiIcons.RiEditBoxFill
            className="IconsEdit"
            id="1"
            onClick={() => this.EditInput(this.state.InputFirst.id)}
          />
          <GiIcons.GiSave
            className="IconsSave"
            id="1"
            onClick={() => this.SaveInput(this.state.InputFirst.id)}
          />
        </div>

        <div className="DivFirstName">
          <label className="labelOfAccount">lastName:</label>
          <input
            ref={(InputLastName) => {
              this.InputLastName = InputLastName;
            }}
            onChange={(e) => this.InputLastNameValue(e.target.value)}
            className="FirstNameAccountInput"
            type="text"
            name="lastName"
            value={
              this.state.lastName.editActive
                ? this.state.lastName.valueChange
                : this.state.userData.map((user) => user.LastName)
            }
            id="2"
            placeholder={this.state.lastName.placeholder}
            readOnly={this.state.lastName.readOnly}
          />
          <RiIcons.RiEditBoxFill
            className="IconsEdit"
            id="2"
            onClick={() => this.EditInput(this.state.lastName.id)}
          />
          <GiIcons.GiSave
            className="IconsSave"
            id="1"
            onClick={() => this.SaveInput(this.state.lastName.id)}
          />
        </div>

        <div className="DivFirstName">
          <label className="labelOfAccount">job:</label>
          <input
            ref={(inputJob) => (this.InputJob = inputJob)}
            type="text"
            className="FirstNameAccountInput"
            value={
              this.state.job.editActive
                ? this.state.job.valueChange
                : this.state.userData.map((user) => user.Job)
            }
            onChange={(e) => this.InputJobValue(e.target.value)}
            className="FirstNameAccountInput"
            type="text"
            name="Job"
            id="3"
            placeholder={this.state.job.placeholder}
            readOnly={this.state.job.readOnly}
          />
          <RiIcons.RiEditBoxFill
            className="IconsEdit"
            id="3"
            onClick={() => this.EditInput(this.state.job.id)}
          />
          <GiIcons.GiSave
            className="IconsSave"
            id="3"
            onClick={() => this.SaveInput(this.state.job.id)}
          />
        </div>

        <div className="DivFirstName">
          {this.state.birthday.readOnly ? (
            <div>
              <label className="labelOfAccount">birthday:</label>
              <input
                onChange={(e) => this.InputBirthdayValue(e.target.value)}
                type="date"
                className="BirthdayAccountInput"
                name="birthday"
                id="4"
                placeholder="birthday"
              />
            </div>
          ) : (
            <div>
              <label className="labelOfAccount">birthday:</label>
              <input
                type="text"
                className="BirthdayAccountInput"
                value={
                  this.state.birthday.editActive
                    ? this.state.birthday.valueChange
                    : this.state.userData.map((user) => user.Birthday)
                }
                name="birthday"
                id="4"
                placeholder="birthday"
                readOnly={true}
              />
            </div>
          )}
          <div>
            <RiIcons.RiEditBoxFill
              className="IconsEdit"
              id="4"
              onClick={() => this.EditInput(this.state.birthday.id)}
            />
            <GiIcons.GiSave
              className="IconsSave"
              id="4"
              onClick={() => this.SaveInput(this.state.birthday.id)}
            />
          </div>
        </div>
        <div className="DivFirstName">
          <label className="labelOfAccount">Country:</label>

          {!this.state.Country.readOnly ? (
            <div className="country">
              <Country id="5" onGetValue={this.getValueOfCountry} />
            </div>
          ) : (
            <div>
              <input
                ref={(InputCountry) => {
                  this.InputCountry = InputCountry;
                }}
                className="FirstNameAccountInput"
                type="text"
                name="Country"
                value={
                  this.state.Country.editActive
                    ? this.state.Country.valueChange
                    : this.state.userData.map((user) => user.Country)
                }
                id="5"
                placeholder={this.state.Country.placeholder}
                readOnly
              />
            </div>
          )}

          <RiIcons.RiEditBoxFill
            className="IconsEdit"
            onClick={() => this.EditInput(this.state.Country.id)}
          />
          <GiIcons.GiSave
            className="IconsSave"
            id="1"
            onClick={this.SaveValueOfCountry}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.DataUser.userName,
    Id: state.DataUser.id,
  };
};

export default connect(mapStateToProps)(Account);
