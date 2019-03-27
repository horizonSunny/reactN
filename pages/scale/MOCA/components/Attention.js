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
      questionModel: "directiveForce",
      questionIndex: this.props.directionForward ? 7 : 6,
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
  calculateScore = () => {};
  render() {
    return (
      <React.Fragment>
        <View style={{ marginTop: dp(30) }}>
          <View
            style={{
              backgroundColor: "white",
              marginTop: dp(50)
            }}
          >
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
              }}
            >
              <Text style={[styles.questionText, { width: "100%" }]}>
                3-1.读出下列词语(每秒1个),后由患者{"\n"}
                重复上述过程，重复两次，5分钟后回忆
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
              <Audio src="moca_1.m4a" />
            </View>
          </View>
        </View>
        <View
          style={[styles.table, { marginBottom: dp(30), marginTop: dp(50) }]}
        >
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
              {[7, 4, 3, "", ""].map((item, index) => {
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
        <View style={[styles.table, { marginBottom: dp(50) }]}>
          <View style={styles.tableColumn1}>
            <Image
              style={{ width: dp(250), height: dp(320) }}
              source={require("./img/doctor1.png")}
            />
          </View>
          <View>
            <View style={styles.tableRow}>
              <Text style={[styles.th, styles.tdb]}>词语名称 </Text>
              <Text style={[styles.th, styles.tdb]}>正确</Text>
              <Text style={[styles.th, styles.tdb]}>错误</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.td, styles.tdb]}>顺背</Text>
              <Radio.RadioGroup
                model={this.state.questionInfo["orderRead"]["answer"]}
                onChange={this.keyBoardChange.bind(this, "orderRead")}
              >
                <View style={styles.td}>
                  <Radio value={1} style={styles.radio} />
                </View>
                <View style={styles.td}>
                  <Radio value={0} style={styles.radio} />
                </View>
              </Radio.RadioGroup>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.td, styles.tdb]}>倒背</Text>
              <Radio.RadioGroup
                model={this.state.questionInfo["invertedOrder"]["answer"]}
                onChange={this.keyBoardChange.bind(this, "invertedOrder")}
              >
                <View style={styles.td}>
                  <Radio value={1} style={styles.radio} />
                </View>
                <View style={styles.td}>
                  <Radio value={0} style={styles.radio} />
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
