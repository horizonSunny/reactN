import React, { Component } from "react";
import {
  View,
  Img,
  Text,
  ART,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";
import Canvas from "../../../../components/Canvas/Canvas";
import { Image } from "react-native/Libraries/Animated/src/Animated";
import KeyBoardNumber from "../../../../components/tools/KeyBoardNumber";
import androidToast from "../../../PageComponent/AndroidToast/AndroidToast";
import { objectClone } from "../../../../utils/objectClone";
import * as commonFunction from "../../../PageComponent/commonFunction/commonFunction";
import PageOrderCode from "../../../PageComponent/PageOrderCode/PageOrderCode";
import FrontAndBack from "../../../PageComponent/frontAndBack/frontAndBack";
import DoctorConfirmNormal from "../../../PageComponent/DoctorConfirmNormal/DoctorConfirmNormal";
import styles from "../../../../../assets/css/common";
import { DrawNumberCircle } from "../../../../utils/drawNumberCircle";
import AnswerConfirm from "../../../PageComponent/AnswerConfirm/AnswerConfirm";
import namedList from "./NamedComponent/namedComponent";
import Audio from "../../../../components/Audio/Audio";
export default class Abstract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionModel: "abstract",
      questionIndex: this.props.directionForward ? 14 : 13,
      totalScore: 0
    };
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      transportation: objectClone(answerModel),
      measure: objectClone(answerModel)
    };
    if (this.props.questionModel["questionInfo"] === "") {
      this.setState({ questionInfo: questionInfo });
    } else {
      this.setState({ questionInfo: this.props.questionModel["questionInfo"] });
    }
  }
  keyBoardChange = (key, value) => {
    let questionInfo = this.state.questionInfo;
    questionInfo[key]["answer"] = value;
    this.setState({ questionInfo: questionInfo });
  };
  goPrev = () => {
    if (this.state.questionIndex === 13) {
      this.setState({ questionInfo: this.state.questionInfo });
      commonFunction.jumpWithParameter("forward", this.state, this.props);
      return;
    }
    this.setState({
      questionIndex: --this.state.questionIndex
    });
  };
  goNext = () => {
    const questionTotal = Object.getOwnPropertyNames(this.state.questionInfo);
    const questionType = questionTotal[this.state.questionIndex - 13];
    if (this.state.questionInfo[questionType]["answer"] === "") {
      androidToast("请选择选项");
      return;
    }
    // 表示是否全部问题, 是否全部结束了
    if (this.state.questionIndex === 14) {
      this.calculateScore();
      return;
    }
    this.setState({
      questionIndex: ++this.state.questionIndex
    });
  };
  calculateScore = () => {
    let questionInfo = objectClone(this.state.questionInfo);
    questionInfo["transportation"]["score"] = parseInt(
      questionInfo["transportation"]["answer"]
    );
    questionInfo["measure"]["score"] = parseInt(
      questionInfo["measure"]["answer"]
    );
    let values = Object.values(questionInfo);
    let totalScore = 0;
    for (let index = 0; index < values.length; index++) {
      totalScore += Number(values[index].score);
    }
    this.setState(
      {
        questionInfo: questionInfo,
        totalScore: totalScore
      },
      () => {
        commonFunction.jumpWithParameter("backwards", this.state, this.props);
      }
    );
  };
  render() {
    const namedList = [
      {
        question:"抽象思维",
        questionDetail:"请您说说橘子和香蕉在什么方面相类似？您再说说火车和自行车在什么方面相类似？(回答运输工具、交通工具、旅行用的均视为正确)",
        questionType: "transportation"
      },
      {
        question:"抽象思维",
        questionDetail:"您再说说手表和尺子在什么方面相类似？(下列的回答被视为正确：测量仪器、测量用的)",
        questionType: "measure"
      }
    ];
  function AudioShow(props) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderLeftColor: "#ddd",
            position: "absolute",
            right: dp(50),
            height: dp(200),
            width: dp(200)
          }}
        >
            <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderLeftColor: "#ddd",
                  position: "absolute",
                  right: dp(50),
                  height: dp(200),
                  width: dp(200)
                }}
              >
                 {props.index === 13 &&   
                  <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_9_1.m4a" />}
                 {props.index === 14 && 
                   <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_9_2.m4a" />}
              </View>
        </View>
      );
    }
  return namedList.map((item, index) => {
      return (
        this.state.questionIndex === index + 13 && (
          <DoctorConfirmNormal
            key={index}
            question={item.question}
            questionDetail = {item.questionDetail}
            questionType={item.questionType}
            indexTotal={22}
            questionInfo={this.state.questionInfo}
            questionIndex={this.state.questionIndex}
            keyBoardChange={this.keyBoardChange}
            goPrev={this.goPrev}
            goNext={this.goNext}
            audio={<AudioShow index={this.state.questionIndex} />}
          >
          </DoctorConfirmNormal>
        )
      );
    });
  }
}
