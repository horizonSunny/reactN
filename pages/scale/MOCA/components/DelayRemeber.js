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
import Audio from "../../../../components/Audio/Audio";
import CheckBox from "../../../../components/CheckBox/src/CheckBox";

export default class DelayRemeber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionModel: "delayRemeber",
      questionIndex: 15,
      totalScore: 0,
      presentIllnessOne: []
    };
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      face: objectClone(answerModel),
      velvet: objectClone(answerModel),
      church: objectClone(answerModel),
      chrysanthemum: objectClone(answerModel),
      red: objectClone(answerModel)
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
    questionInfo["face"]["score"] = parseInt(questionInfo["face"]["answer"]);
    questionInfo["velvet"]["score"] = parseInt(
      questionInfo["velvet"]["answer"]
    );
    questionInfo["church"]["score"] = parseInt(
      questionInfo["church"]["answer"]
    );
    questionInfo["chrysanthemum"]["score"] = parseInt(
      questionInfo["chrysanthemum"]["answer"]
    );
    questionInfo["red"]["score"] = parseInt(questionInfo["red"]["answer"]);
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
    const radioStyles = [
      { oneTop: dp(80), twoTop: dp(150), left: dp(285), name: "face" },
      { oneTop: dp(80), twoTop: dp(150), left: dp(485), name: "velvet" },
      { oneTop: dp(80), twoTop: dp(150), left: dp(685), name: "church" },
      {
        oneTop: dp(80),
        twoTop: dp(150),
        left: dp(885),
        name: "chrysanthemum"
      },
      { oneTop: dp(80), twoTop: dp(150), left: dp(1085), name: "red" }
    ];
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
                marginTop: dp(10)
              }}
            >
              <PageOrderCode
                index={10}
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
                   延迟回忆，回忆时不能提示
                </Text>
                <Text style={{ color: "black", fontSize: font(30) }}>
                    刚才我给你读了几个词让您记住，请您再尽量回忆一下，告诉我这些词都有什么
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
                <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_10.m4a" />
              </View>
            </View>
        </View>
        <View style={{ alignItems: "center", marginTop: dp(550) }} />
        <View style={{ alignItems: "center", marginTop: dp(50) }} >
          <View style={[styles.table,{ marginBottom: dp(20) },{height: dp(200),marginLeft:dp(0)}]}>
          <View style={styles.tableColumn1}>
            <Image
              style={{width: dp(150), height: dp(200)}}
              source={require("./img/doctor1.png")}
            />
          </View>
          <View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCheckTh, styles.tdb]}>词语名称 </Text>
              <Text style={[styles.tableCheckTh, styles.tdb]}>面孔</Text>
              <Text style={[styles.tableCheckTh, styles.tdb]}>天鹅绒</Text>
              <Text style={[styles.tableCheckTh, styles.tdb]}>教堂</Text>
              <Text style={[styles.tableCheckTh, styles.tdb]}>菊花</Text>
              <Text style={[styles.tableCheckTh, styles.tdb]}>红色</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCheckTd, styles.tdb]}>正确</Text>
              <Text style={styles.tableCheckTd} />
              <Text style={styles.tableCheckTd} />
              <Text style={styles.tableCheckTd} />
              <Text style={styles.tableCheckTd} />
              <Text style={styles.tableCheckTd} />
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCheckTd, styles.tdb]}>错误</Text>
              <Text style={styles.tableCheckTd} />
              <Text style={styles.tableCheckTd} />
              <Text style={styles.tableCheckTd} />
              <Text style={styles.tableCheckTd} />
              <Text style={styles.tableCheckTd} />
            </View>
            {radioStyles.map((item, index) => {
              return (
                <Radio.RadioGroup
                  key={index}
                  model={this.state.questionInfo[item["name"]]["answer"]}
                  onChange={this.keyBoardChange.bind(this, item["name"])}
                >
                  <View
                    style={{
                      position: "absolute",
                      top: item["oneTop"],
                      left: item["left"],
                      backgroundColor: "#fff"
                    }}
                  >
                    <Radio value={1} styleHight={25} style={{width: dp(30), height: dp(30)}} />
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      top: item["twoTop"],
                      left: item["left"],
                      backgroundColor: "#fff"
                    }}
                  >
                    <Radio value={0} styleHight={25} style={{width: dp(30), height: dp(30)}} />
                  </View>
                </Radio.RadioGroup>
              );
            })}
          </View>
        </View>
        </View>
        <View style={{ alignItems: "center", marginTop: dp(20) }} />
        <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
      </React.Fragment>
    );
  }
}
