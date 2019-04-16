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
import { Image } from "react-native/Libraries/Animated/src/Animated";
import androidToast from "../../../PageComponent/AndroidToast/AndroidToast";
import { objectClone } from "../../../../utils/objectClone";
import * as commonFunction from "../../../PageComponent/commonFunction/commonFunction";
import DoctorConfirmNormal from "../../../PageComponent/DoctorConfirmNormal/DoctorConfirmNormal";
import namedList from "./NamedComponent/namedComponent";
import Audio from "../../../../components/Audio/Audio";
import styles from "../../../../../assets/css/common";

export default class Named extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionModel: "named",
      questionIndex: this.props.directionForward ? 2 : 0,
      totalScore: 0
    };
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      lion: objectClone(answerModel),
      rhinoceros: objectClone(answerModel),
      camel: objectClone(answerModel)
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
    if (this.state.questionIndex === 0) {
      commonFunction.jumpWithParameter("forward", this.state, this.props);
      return;
    }
    this.setState({
      questionIndex: --this.state.questionIndex
    });
  };
  goNext = () => {
    const questionTotal = Object.getOwnPropertyNames(this.state.questionInfo);
    // 判断是否为空，为空则return,135,对应0，1，2
    const questionType = questionTotal[this.state.questionIndex];
    console.log("questionType_", questionType);
    if (this.state.questionInfo[questionType]["answer"] === "") {
      androidToast("请选择选项");
      return;
    }
    // 表示是否全部问题, 是否全部结束了
    if (this.state.questionIndex === questionTotal.length - 1) {
      this.calculateScore();
      return;
    }
    this.setState({
      questionIndex: ++this.state.questionIndex
    });
  };
  calculateScore = () => {
    let questionInfo = objectClone(this.state.questionInfo);
    questionInfo["lion"]["score"] = parseInt(questionInfo["lion"]["answer"]);
    questionInfo["rhinoceros"]["score"] = parseInt(
      questionInfo["rhinoceros"]["answer"]
    );
    questionInfo["camel"]["score"] = parseInt(questionInfo["camel"]["answer"]);
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
                <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_4.m4a" />
              </View>
           
        </View>
      );
    }
    console.log("namedList_", namedList);
    const img_arr = [
      require("./img/lion.png"),
      require("./img/rhinoceros.png"),
      require("./img/camel.png")
    ];
    return namedList.map((item, index) => {
      return (
        this.state.questionIndex === index && (
          <DoctorConfirmNormal
            key={index}
            question={item.question}
            questionType={item.questionType}
            indexTotal={11}
            questionInfo={this.state.questionInfo}
            questionIndex={3}
            keyBoardChange={this.keyBoardChange}
            goPrev={this.goPrev}
            goNext={this.goNext}
            audio={<AudioShow />}
          >
            <Image
              style={{
                width: dp(600),
                height: dp(450),
                marginTop: dp(10),
                resizeMode: "cover"
              }}
              source={img_arr[index]}
            />
          </DoctorConfirmNormal>
        )
      );
    });
  }
}
