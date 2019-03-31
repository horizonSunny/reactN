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
export default class Abstract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 13
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
        questionTitl: "6-2.请您说说句子和香蕉在上面方面相似？如橘子-香蕉=水果",
        question:
          "您再说说火车和自行车在什么方面相似？(回答运输工具，交通工具，旅行用的的均视为正确)",
        questionType: "transportation"
      },
      {
        questionTitl: "6-2.请您说说句子和香蕉在上面方面相似？如橘子-香蕉=水果",
        question:
          "您再说说手表和尺子在什么方面相似？(回答测量仪器，测量用的均视为正确)",
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
          }}>
          {props.index === 13 && <Audio src="moca_13.m4a" />}
          {props.index === 14 && <Audio src="moca_14.m4a" />}
        </View>
      );
    }
    return namedList.map((item, index) => {
      return (
        this.state.questionIndex === index + 13 && (
          <DoctorHelpConfirm
            key={index}
            question={item.questionTitl}
            questionType={item.questionType}
            indexTotal={19}
            questionInfo={this.state.questionInfo}
            questionIndex={this.state.questionIndex + 4}
            keyBoardChange={this.keyBoardChange}
            goPrev={this.goPrev}
            goNext={this.goNext}
            audio={<AudioShow index={this.state.questionIndex} />}>
            <View>
              <Text>{item["question"]}</Text>
            </View>
          </DoctorHelpConfirm>
        )
      );
    });
  }
}
