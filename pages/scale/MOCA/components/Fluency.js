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
export default class Fluency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionModel: "fluency",
      questionIndex: 12,
      totalScore: 0
    };
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      fluency: objectClone(answerModel)
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
    this.setState({ questionInfo: this.state.questionInfo });
    commonFunction.jumpWithParameter("forward", this.state, this.props);
    return;
  };
  goNext = () => {
    let { keys, values, entries } = Object;
    for (let value of values(this.state.questionInfo)) {
      if (value["answer"] === "") {
        androidToast("请选择选项");
        return;
      }
    }
    this.calculateScore();
  };
  calculateScore = () => {
    let questionInfo = objectClone(this.state.questionInfo);
    questionInfo["fluency"]["score"] = parseInt(
      questionInfo["fluency"]["answer"]
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
    const info = {
      question: "词语流畅性",
      questionDetail:"请您尽可能快，尽可能多地说出您所知道的动物的名称。时间是1分钟，请您想一想，准备好了么？开始(提示：1分钟内说出动物名称大于等于11个算正确)",
      questionType: "fluency"
    };

    function AudioShow() {
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
                <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_8.m4a" />
              </View>
        </View>
      );
    }
    return (
      <DoctorConfirmNormal
        question={info.question}
        questionDetail = {info.questionDetail}
        questionType={info.questionType}
        indexTotal={11}
        questionInfo={this.state.questionInfo}
        questionIndex={7}
        keyBoardChange={this.keyBoardChange}
        goPrev={this.goPrev}
        goNext={this.goNext}
        audio={<AudioShow />}
      />
    );
  }
}
