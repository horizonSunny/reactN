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

export default class RecordOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionModel: "recordOne",
      questionIndex: 8,
      totalScore: 0
    };
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      haveOneNum: objectClone(answerModel)
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
    questionInfo["haveOneNum"]["score"] = parseInt(
      questionInfo["haveOneNum"]["answer"]
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
      <React.Fragment>
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
                3-1.每当数字1出现时，患者必须用手敲打一下桌面，错误数大于或者等于2个不给分
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
              <Audio src="moca_1.m4a" />
            </View>
          </View>
        </View>
        <View
          style={[
            styles.table,
            { marginBottom: dp(30), marginTop: dp(50), marginLeft: dp(350) }
          ]}>
          <View style={{ width: dp(70) }} />
          <View>
            <View style={styles.tableRow}>
              {[
                [5, 2, 1, 3, 9, 4],
                [1, 1, 8, 0, 6, 2],
                [1, 5, 1, 9, 4, 5],
                [1, 1, 1, 4, 1, 9],
                [0, 5, 1, 1, 2]
              ].map((item, index) => {
                return (
                  <View key={index}>
                    {item.map((itemInfo, indexInfo) => {
                      return (
                        <Text
                          key={indexInfo}
                          style={[
                            styles.tableCheckTd,
                            styles.tdb,
                            { backgroundColor: "white" }
                          ]}>
                          {itemInfo}
                        </Text>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center", marginBottom: dp(50) }}>
          <AnswerConfirm
            questionType={"haveOneNum"}
            questionInfo={this.state.questionInfo}
            keyBoardChange={this.keyBoardChange}
          />
        </View>
        <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
      </React.Fragment>
    );
  }
}
