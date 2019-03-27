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
export default class DirectiveForce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: this.props.directionForward ? 21 : 16
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
    // 表示是否全部问题, 是否全部结束了
    if (this.state.questionIndex === questionTotal.length - 1) {
      this.calculateScore();
      return;
    }
    this.setState({
      questionIndex: ++this.state.questionIndex
    });
  };
  render() {
    const namedList = [
      {
        question: "请告诉现在是那年?",
        questionType: "year"
      },
      {
        question: "请告诉我现在是哪月(几月份)?",
        questionType: "month"
      },
      {
        question: "请告诉我现在是娜日(今天是几号)?",
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
          {props.index === 17 && <Audio src="moca_17.m4a" />}
          {props.index === 18 && <Audio src="moca_18.m4a" />}
          {props.index === 19 && <Audio src="moca_19.m4a" />}
          {props.index === 20 && <Audio src="moca_20.m4a" />}
          {props.index === 21 && <Audio src="moca_21.m4a" />}
          {props.index === 22 && <Audio src="moca_22.m4a" />}
        </View>
      );
    }
    return namedList.map((item, index) => {
      return (
        this.state.questionIndex === index + 16 && (
          <DoctorHelpConfirm
            key={index}
            question={item.question}
            questionType={item.questionType}
            indexTotal={19}
            questionInfo={this.state.questionInfo}
            questionIndex={this.state.questionIndex + 1}
            keyBoardChange={this.keyBoardChange}
            goPrev={this.goPrev}
            goNext={this.goNext}
            audio={<AudioShow index={this.state.questionIndex + 1} />}
          >
            <View style={{ marginTop: dp(100) }} />
          </DoctorHelpConfirm>
        )
      );
    });
  }
}
