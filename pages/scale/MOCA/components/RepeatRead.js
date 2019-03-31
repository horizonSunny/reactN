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
import Radio from "../../../../components/Radio/src/Radio";
import { DrawNumberCircle } from "../../../../utils/drawNumberCircle";
import AnswerConfirm from "../../../PageComponent/AnswerConfirm/AnswerConfirm";
import namedList from "./NamedComponent/namedComponent";
import Audio from "../../../../components/Audio/Audio";
import CheckBox from "../../../../components/CheckBox/src/CheckBox";

export default class RepeatRead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionModel: "repeatRead",
      questionIndex: this.props.directionForward ? 11 : 10,
      totalScore: 0
    };
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      oneRepeat: objectClone(answerModel),
      twoRepeat: objectClone(answerModel)
    };
    if (this.props.questionModel["questionInfo"] === "") {
      this.setState({ questionInfo: questionInfo });
    } else {
      this.setState({ questionInfo: this.props.questionModel["questionInfo"] });
    }
  }
  keyBoardChange = (key, value) => {
    // console.log('key_'+ key +'_answer_'+value);
    let questionInfo = this.state.questionInfo;
    questionInfo[key]["answer"] = value;
    this.setState({ questionInfo: questionInfo });
    // console.log('this_state_questionInfo_',this.state.questionInfo);
  };
  goPrev = () => {
    this.setState({ questionInfo: this.state.questionInfo });
    console.log("immediatrly_", this.state.questionInfo);
    commonFunction.jumpWithParameter("forward", this.state, this.props);
    return;
  };
  goNext = () => {
    const questionTotal = Object.getOwnPropertyNames(this.state.questionInfo);
    // 判断是否为空，为空则return
    const questionType = questionTotal[this.state.questionIndex - 10];
    if (this.state.questionInfo[questionType]["answer"] === "") {
      androidToast("请选择选项");
      return;
    }
    if (this.state.questionIndex === 11) {
      this.calculateScore();
      return;
    }
    this.setState({
      questionIndex: ++this.state.questionIndex
    });
  };
  calculateScore = () => {
    let questionInfo = objectClone(this.state.questionInfo);
    questionInfo["oneRepeat"]["score"] = parseInt(
      questionInfo["oneRepeat"]["answer"]
    );
    questionInfo["twoRepeat"]["score"] = parseInt(
      questionInfo["twoRepeat"]["answer"]
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
    return (
      <View>
        <View style={{ marginTop: dp(30) }}>
          <View
            style={{
              backgroundColor: "white",
              marginTop: dp(50)
            }}>
            <PageOrderCode
              backgroundColor={"green"}
              index={this.state.questionIndex + 1}
              indexTotal={19}
            />
            <View
              style={{
                flexDirection: "row",
                width: dp(1300),
                alignItems: "center",
                marginTop: dp(-570),
                marginLeft: dp(300)
              }}>
              <Text style={[styles.questionText, { width: "100%" }]}>
                5-2.(语言)请重复下面的句子
              </Text>
            </View>
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
              {this.state.questionIndex === 10 && <Audio src="moca_11.m4a" />}
              {this.state.questionIndex === 11 && <Audio src="moca_12.m4a" />}
            </View>
          </View>
        </View>

        {this.state.questionIndex === 10 && (
          <React.Fragment>
            <View
              style={{
                alignItems: "center",
                marginBottom: dp(100)
              }}>
              <Text
                style={{
                  marginTop: dp(200),
                  fontSize: 30
                }}>
                我只知道今天张亮是来帮过忙的人
              </Text>
              <View
                style={{
                  width: dp(1200),
                  marginTop: dp(50),
                  borderBottomColor: "#ddd",
                  borderBottomWidth: dp(3)
                }}
              />
            </View>
            <View style={{ alignItems: "center", marginBottom: dp(50) }}>
              <AnswerConfirm
                questionType={"oneRepeat"}
                questionInfo={this.state.questionInfo}
                keyBoardChange={this.keyBoardChange}
              />
            </View>
            <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
          </React.Fragment>
        )}
        {this.state.questionIndex === 11 && (
          <React.Fragment>
            <React.Fragment>
              <View
                style={{
                  alignItems: "center",
                  marginBottom: dp(100)
                }}>
                <Text
                  style={{
                    marginTop: dp(200),
                    fontSize: 30
                  }}>
                  狗在房间的时候，猫总是躺在沙发下面
                </Text>
                <View
                  style={{
                    width: dp(1200),
                    marginTop: dp(50),
                    borderBottomColor: "#ddd",
                    borderBottomWidth: dp(3)
                  }}
                />
              </View>
              <View style={{ alignItems: "center", marginBottom: dp(50) }}>
                <AnswerConfirm
                  questionType={"twoRepeat"}
                  questionInfo={this.state.questionInfo}
                  keyBoardChange={this.keyBoardChange}
                />
              </View>
              <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
            </React.Fragment>
          </React.Fragment>
        )}
      </View>
    );
  }
}
