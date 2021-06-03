import React, { Component } from "react";
import "./Question.css";
import * as AiIcons from "react-icons/ai";
class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sendStatus: false,
      textareaValue: "",
    };
  }

  handleValueTextarea = (Value) => {
    this.setState({ textareaValue: Value });
  };

  handleSend = () => {
    let textareaValue = this.state.textareaValue;
    if (textareaValue !== "") {
      this.setState({ sendStatus: true });
    } else return console.log("notwork");
  };

  render() {
    console.log(this.state.sendStatus);
    return (
      <div className="Total">
        {!this.state.sendStatus ? (
          <div>
            <h1 className="title1">Tell us what's your problem</h1>
            <div onClick={this.props.onClick} to="#" className="bars-close">
              <AiIcons.AiOutlineClose />
            </div>

            <div className="textareaPosition">
              <textarea
                onChange={(e) => this.handleValueTextarea(e.target.value)}
                className="inputComment"
                type="text"
                placeholder="Tell us what's your problem"
              />
            </div>
            <button className="btnSize" onClick={this.handleSend}>
              Send
            </button>
          </div>
        ) : (
          <div>
            <h1 className="sendMassageTitle"> your massage send </h1>
            <p className="pSend">we soon as can contact to you</p>
            <p className="pSend">thank you</p>
            <button className="btnSend" onClick={this.props.onClick}>
              continue
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Question;
