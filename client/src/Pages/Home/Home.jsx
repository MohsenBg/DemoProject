import React, { Component } from "react";
import Question from "../../Components/Question/Question";
import QuestionImage01 from "../../Image/QuestionImage/QuestionImage01.png";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    return (
      <div>
        <h1 className="home">Home</h1>
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

export default Home;
