import React, { Component } from "react";
import Question from "../../Components/Question/Question";
import QuestionImage01 from "../../Image/QuestionImage/QuestionImage01.png";
import "./Home.css";
import Food01 from "../../Image/HomePageImage/Food01.jpg";
import Food02 from "../../Image/HomePageImage/Food02.jpg";
import FaceBook from "../../Image/Social/FaceBook.png";
import Twitter from "../../Image/Social/Twitter.png";
import LikeDisable from "../../Image/HomePageImage/LikeDisable.png";
import LikeAble from "../../Image/HomePageImage/likeAble.png";
import search from "../../Image/HomePageImage/search.png";
import bar from "../../Image/HomePageImage/bar.png";

import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      QuestionImage: false,
      like: false,
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
      <div className="homePageTotal">
        <div className="foodTotalBack">
          <div className="foodLeftBack"></div>
          <div className="moreBackgroundColor"></div>
          <div className="yellowRight"></div>
          <div className="yellowLeftTop">
            <MdIcons.MdKeyboardArrowRight />
          </div>
          <div className="yellowLeftDown">
            <MdIcons.MdKeyboardArrowLeft />
          </div>
          <div className="PhotoFoodRightDiv"></div>

          <img src={Food02} className="PhotoFoodLeft" alt="Food02" />
          <img src={FaceBook} className="PhotoFaceBook" alt="FaceBook" />
          <img src={Twitter} className="PhotoTwitter" alt="Twitter" />
          <img src={LikeDisable} className="PhotoLink" alt="Link" />
          <img src={search} className="PhotoSearch" alt="Search" />
          <img src={bar} className="PhotoBar" alt="Bar" />
          <div className="btnPlay">
            <BsIcons.BsFillPlayFill />
          </div>
          <div>
            <h1 className="titleOfHomePage">
              Demo <br />
              Project
            </h1>
            <span className="spanOfHomePage">
              hello this is a demo project and <br />
              make by MohsenBG thanks for <br />
              watching this demo project <br />
              enjoy!
            </span>
            <span className="createByDot">.</span>
            <span className="createBy">
              Mohsen
              <br /> Bagheri
            </span>
          </div>
        </div>

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
