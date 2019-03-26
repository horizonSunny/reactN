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
      questionModel: "directiveForce",
      questionIndex: 17,
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
    this.calculateScore();
    return;
  };
  calculateScore = () => {};

  render() {
    const radioStyles = [
      { oneTop: dp(110), twoTop: dp(220), left: dp(272), name: "face" },
      { oneTop: dp(110), twoTop: dp(220), left: dp(472), name: "velvet" },
      { oneTop: dp(110), twoTop: dp(220), left: dp(672), name: "church" },
      {
        oneTop: dp(110),
        twoTop: dp(220),
        left: dp(872),
        name: "chrysanthemum"
      },
      { oneTop: dp(110), twoTop: dp(220), left: dp(1072), name: "red" }
    ];
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
                3-1.(延时回忆，不能提醒)刚才我给您读了几个词让您记住，请您再尽量回忆一下，告诉我这些词都有什么？
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
              <Audio src="moca_16.m4a" />
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: dp(50) }} />
        <View style={[styles.table]}>
          <View style={styles.tableColumn1}>
            <Image
              style={{ width: dp(250), height: dp(320) }}
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
                      width: 50,
                      height: 50,
                      backgroundColor: "#fff"
                    }}
                  >
                    <Radio value={1} style={styles.radio} />
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      width: 50,
                      height: 49,
                      top: item["twoTop"],
                      left: item["left"],
                      backgroundColor: "#fff"
                    }}
                  >
                    <Radio value={0} style={styles.radio} />
                  </View>
                </Radio.RadioGroup>
              );
            })}
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: dp(180) }} />
        <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
      </React.Fragment>
    );
  }
}
