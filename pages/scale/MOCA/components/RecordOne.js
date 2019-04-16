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
    const pageOrderCodeCss =  { 
      background:{
        width: dp(150),
        height: dp(65),
        position: "absolute",
        top: dp(50),
        left: dp(-20) },
      quesNum:{
        fontSize: font(30),
        color: "#ffffff",
        marginRight: dp(20),
        position: "absolute",
        left: dp(10),
        top: dp(10)
      },
      text:{
        fontSize: font(20) 
      }
    }
    const answerConfirmCss =  {
      styleOut:  {
              flexDirection: "row",
              height: dp(150),
              alignItems: "center"
            },
      styleImg:{ width: dp(102), height: dp(150) },
      styleAnswer:[styles.th, { width: dp(250) }, styles.tdb,{fontSize:dp(20)}],
      styleRadio:[styles.td, { width: dp(250) }],
      styleRadioSize: {width: dp(30), height: dp(30)}
    }
    return (
      <React.Fragment>
      <View style={{ marginTop: dp(10) }}>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: dp(0)
              }}
            >
              <PageOrderCode
                index={6}
                indexTotal={11}
                pageOrderCodeStyle={pageOrderCodeCss}
              />
              <View
                style={{
                  width: dp(1300),
                  marginTop: dp(-570),
                  marginLeft: dp(150)
                }}
              >
                <Text style={[{
                  width: dp(1200),
                  color: "#2c2c2c",
                  marginTop:dp(15),
                  lineHeight: dp(70),
                  paddingRight: dp(80),
                  fontWeight: "100"
                }, { fontSize: font(40),width: "80%" }]}>
                  警觉性
                </Text>
                <Text style={{ color: "black", fontSize: font(30) }}>
                    下面我要读出一串数字，请注意听。每当我读到1的时候，您就敲打一下桌子，当我读其他数字时候不要敲打(提示：如果完全正确或只有一次错误则算正确)
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
                }}
              >
                <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_6_2.m4a" />
              </View>
            </View>
        </View>
        <View
          style={[
            styles.table,
            { marginBottom: dp(30), marginTop: dp(50), marginLeft: dp(350) }
          ]}
        >
          <View style={{ width: dp(70) }} />
          <View>
            <View style={styles.tableRow}>
              {[
                [5, 1, 1, 1, 0],
                [2, 1, 5, 1, 5],
                [1, 8, 1, 1, 1],
                [3, 0, 9, 4, 1],
                [9, 6, 4, 1, 2],
                [4, 2, 5, 9],
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
                          ]}
                        >
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
            answerConfirmStyle = {answerConfirmCss}
          />
        </View>
        <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} frontAndBackStyle={{paddingRight:dp(50)}}/>
      </React.Fragment>
    );
  }
}
