import React from "react";
import "./Combine-Sin&Log.css";
import SingUp from "../SingUp/SingUp";
import Login from "../Login/Login";

class CombineSinLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLogin: 0,
      isLogginActive: true,
    };
  }

  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");
  }

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState((prevState) => ({
      isLogginActive: !prevState.isLogginActive,
    }));
  }

  getLoginStatus = (val) => {
    console.log(val);
    if (val && this.state.timeLogin === 0) {
      this.setState({ loginStatus: true, timeLogin: 1 });
    }
  };

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "SingUp" : "Login";
    const currentActive = isLogginActive ? "login" : "SingUp";
    return (
      <div className="login">
        <div className="login">
          <div className="container " ref={(ref) => (this.container = ref)}>
            {isLogginActive && (
              <Login
                onClick={this.showStatusLogin}
                login={this.getLoginStatus}
                containerRef={(ref) => (this.current = ref)}
              />
            )}
            {!isLogginActive && (
              <SingUp containerRef={(ref) => (this.current = ref)} />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={(ref) => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const RightSide = (props) => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default CombineSinLog;
