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
import DoctorHelpConfirm from "../../../PageComponent/DoctorHelpConfirm/DoctorHelpConfirm";
import styles from "../../../../../assets/css/common";
import { DrawNumberCircle } from "../../../../utils/drawNumberCircle";
import AnswerConfirm from "../../../PageComponent/AnswerConfirm/AnswerConfirm";
import namedList from "./NamedComponent/namedComponent";
import Audio from "../../../../components/Audio/Audio";
import DoctorConfirmNormal from "../../../PageComponent/DoctorConfirmNormal/DoctorConfirmNormal";

export default class DirectiveForce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: this.props.directionForward ? 21 : 16,
      questionModel: "directiveForce",
      totalScore: 0
    };
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      year: objectClone(answerModel),
      month: objectClone(answerModel),
      day: objectClone(answerModel),
      weekDay: objectClone(answerModel),
      company: objectClone(answerModel),
      city: objectClone(answerModel)
    };
    if (this.props.questionModel["questionInfo"] === "") {
      console.log("directive_nothing");
      this.setState({ questionInfo: questionInfo });
    } else {
      console.log("directive_have");
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
    const index = this.state.questionIndex - 16;
    const questionType = questionTotal[index];
    if (this.state.questionInfo[questionType]["answer"] === "") {
      androidToast("请选择选项");
      return;
    }
    // 表示是否全部问题, 是否全部结束了
    if (index === questionTotal.length - 1) {
      this.calculateScore();
      return;
    }
    this.setState({
      questionIndex: ++this.state.questionIndex
    });
  };
  calculateScore = () => {
    let questionInfo = objectClone(this.state.questionInfo);
    questionInfo["year"]["score"] = parseInt(questionInfo["year"]["answer"]);
    questionInfo["month"]["score"] = parseInt(questionInfo["month"]["answer"]);
    questionInfo["day"]["score"] = parseInt(questionInfo["day"]["answer"]);
    questionInfo["weekDay"]["score"] = parseInt(
      questionInfo["weekDay"]["answer"]
    );
    questionInfo["company"]["score"] = parseInt(
      questionInfo["company"]["answer"]
    );
    questionInfo["city"]["score"] = parseInt(questionInfo["city"]["answer"]);
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
    const moduleName = '定向'
    const namedList = [
      {
        question: "请您告诉现在是哪年?",
        questionType: "year"
      },
      {
        question: "请告诉我现在是哪月?",
        questionType: "month"
      },
      {
        question: "请告诉我现在是哪日?",
        questionType: "day"
      },
      {
        question: "请告诉我今天是星期几?",
        questionType: "weekDay"
      },
      {
        question: "请告诉我这是什么单位?",
        questionType: "company"
      },
      {
        question: "请告诉我您现在在那一个城市?",
        questionType: "city"
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
              {props.index === 17 && <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_11_1.m4a" />}
              {props.index === 18 && <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_11_2.m4a" />}
              {props.index === 19 && <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_11_3.m4a" />}
              {props.index === 20 && <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_11_4.m4a" />}
              {props.index === 21 && <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_11_5.m4a" />}
              {props.index === 22 && <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_11_6.m4a" />}
              </View>
        </View>
      );
    }
    return namedList.map((item, index) => {
      return (
        this.state.questionIndex === index + 16 && (
          <DoctorConfirmNormal
            key={index}
            question={moduleName}
            questionType={item.questionType}
            indexTotal={22}
            questionInfo={this.state.questionInfo}
            questionIndex={this.state.questionIndex}
            keyBoardChange={this.keyBoardChange}
            goPrev={this.goPrev}
            goNext={this.goNext}
            audio={<AudioShow index={this.state.questionIndex + 1} />}
          >
            <View style={{marginTop:dp(200),marginBottom:dp(200)}}>
              <Text style={{fontSize:font(40),color:'black'}}>{item["question"]}</Text>
            </View>
          </DoctorConfirmNormal>
        )
      );
    });
  }
}
