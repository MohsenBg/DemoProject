import React, { Component } from "react";
import CombineSinLog from "../../Components/Login&SinUp/Combine-Sin&Log/Combine-Sin&Log";
import Question from "../../Components/Question/Question";
import QuestionImage01 from "../../Image/QuestionImage/QuestionImage01.png";
import { connect } from "react-redux";
import LogOut from "../../Components/Login&SinUp/LogOut/LogOut";

class logAadSinUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLogin: 0,
      loginStatus: false,
      getloginstatus: false,
      QuestionImage: false,
    };
  }

  QuestionImageStatus = () => {
    this.setState({ QuestionImage: true });
  };

  handleClose = () => {
    this.setState({ QuestionImage: false });
  };

  render() {
    if (this.props.loginStatus) {
      return (
        <div>
          <LogOut />
        </div>
      );
    } else {
      return (
        <div className="back">
          <h1 className="LoginAndSingUp">
            <CombineSinLog className="content" />
          </h1>
          {!this.state.QuestionImage ? (
            <img
              className="QuestionImage"
              onClick={this.QuestionImageStatus}
              src={QuestionImage01}
              alt=""
            />
          ) : (
            <div>
              <div className="QuestionForm">
                <Question onClick={this.handleClose} />
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.DataUser.login,
  };
};

export default connect(mapStateToProps)(logAadSinUp);
