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

export default class Attention extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionModel: "attention",
      questionIndex: 7,
      totalScore: 0
    };
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      orderRead: objectClone(answerModel),
      invertedOrder: objectClone(answerModel)
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
    console.log("this.state.questionInfo_", this.state.questionInfo);
    this.calculateScore();
    return;
  };
  calculateScore = () => {
    let questionInfo = objectClone(this.state.questionInfo);
    questionInfo["orderRead"]["score"] = parseInt(
      questionInfo["orderRead"]["answer"]
    );
    questionInfo["invertedOrder"]["score"] = parseInt(
      questionInfo["invertedOrder"]["answer"]
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
                  注意力检测
                </Text>
                <Text style={{ color: "black", fontSize: font(30) }}>
                    下面请您仔细听我说一些数字，当我说完您就跟着照样背出来。下面我再说一些数字，您仔细听，当我说完时请您按我说当
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
                <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_6_1.m4a" />
              </View>
            </View>
        </View>
        <View style={[styles.table, {marginBottom: dp(350), marginTop: dp(50) },{
              flexDirection: "row",
              height: dp(150),
              alignItems: "center"
            }]}>
          <View style={{ width: dp(70) }} />
          <View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCheckTd, styles.tdb]}>顺背</Text>
              {[2, 1, 8, 5, 4].map((item, index) => {
                return (
                  <Text
                    key={index}
                    style={[
                      styles.tableCheckTd,
                      styles.tdb,
                      { backgroundColor: "white" }
                    ]}
                  >
                    {item}
                  </Text>
                );
              })}
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCheckTd, styles.tdb]}>倒背</Text>
              {[7, 4, 2, "", ""].map((item, index) => {
                return (
                  <Text
                    key={index}
                    style={[
                      styles.tableCheckTd,
                      styles.tdb,
                      { backgroundColor: "white" }
                    ]}
                  >
                    {item}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
        <View style={[styles.table, { marginBottom: dp(50) },{
              flexDirection: "row",
              height: dp(150),
              alignItems: "center"
            }]}>
          <View style={styles.tableColumn1}>
            <Image
              style={{ width: dp(102), height: dp(150) }}
              source={require("./img/doctor1.png")}
            />
          </View>
          <View>
            <View style={[styles.tableRow,{fontSize:dp(20)}]}>
              <Text style={[styles.th, styles.tdb,{fontSize:dp(20)}]}>词语名称 </Text>
              <Text style={[styles.th, styles.tdb,{fontSize:dp(20)}]}>正确</Text>
              <Text style={[styles.th, styles.tdb,{fontSize:dp(20)}]}>错误</Text>
            </View>
            <View style={[styles.tableRow,{fontSize:dp(20)}]}>
              <Text style={[styles.td, styles.tdb,{fontSize:dp(20)}]}>顺背</Text>
              <Radio.RadioGroup
                model={this.state.questionInfo["orderRead"]["answer"]}
                onChange={this.keyBoardChange.bind(this, "orderRead")}
              >
                <View style={styles.td}>
                  <Radio value={1} style={[styles.radio,{width: dp(30), height: dp(30)}]} />
                </View>
                <View style={styles.td}>
                  <Radio value={0} style={[styles.radio,{width: dp(30), height: dp(30)}]} />
                </View>
              </Radio.RadioGroup>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.td, styles.tdb,{fontSize:dp(20)}]}>倒背</Text>
              <Radio.RadioGroup
                model={this.state.questionInfo["invertedOrder"]["answer"]}
                onChange={this.keyBoardChange.bind(this, "invertedOrder")}
              >
                <View style={styles.td}>
                  <Radio value={1} style={[styles.radio,{width: dp(30), height: dp(30)}]} />
                </View>
                <View style={styles.td}>
                  <Radio value={0} style={[styles.radio,{width: dp(30), height: dp(30)}]} />
                </View>
              </Radio.RadioGroup>
            </View>
          </View>
        </View>
        <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
      </React.Fragment>
    );
  }
}
