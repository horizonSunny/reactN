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
import AnswerConfirm from "./ViewSpaceComponent/AnswerConfirm";
import namedList from "./NamedComponent/namedComponent";
import Audio from "../../../../components/Audio/Audio";
import CheckBox from "../../../../components/CheckBox/src/CheckBox";

export default class Memory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 9,
      presentIllnessOne: [],
      presentIllnessTwo: []
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
  // 调用keyboard回调的方法
  keyBoardChange = (key, value) => {
    // console.log('key_'+ key +'_answer_'+value);
    let questionInfo = this.state.questionInfo;
    questionInfo[key]["answer"] = value;
    this.setState({ questionInfo: questionInfo });
    // console.log('this_state_questionInfo_',this.state.questionInfo);
  };
  // 该模块上一个问题
  goPrev = () => {
    this.setState({ questionInfo: this.state.questionInfo });
    console.log("immediatrly_", this.state.questionInfo);
    commonFunction.jumpWithParameter("forward", this.state, this.props);
    return;
  };
  goNext = () => {
    console.log(
      "presentIllnessOne_",
      this.state.presentIllnessOne,
      "_presentIllnessTwo_",
      this.state.presentIllnessTwo
    );
    return;
  };
  handleNowPresentOne = value => {
    // let presentIllnessinfo = this.state.presentIllness;
    // presentIllness = value;
    console.log("handleNowPresentIlless_", value);
    this.setState({
      presentIllnessOne: value
    });
  };
  handleNowPresentTwo = value => {
    // let presentIllnessinfo = this.state.presentIllness;
    // presentIllness = value;
    console.log("handleNowPresentIlless_", value);
    this.setState({
      presentIllnessTwo: value
    });
  };
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
          style={[styles.table, { marginBottom: dp(100), marginTop: dp(100) }]}
        >
          <View style={styles.tableColumn1}>
            <Image
              style={{ width: dp(250), height: dp(320) }}
              source={require("./img/doctor1.png")}
            />
          </View>
          <View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCheckTh, styles.tdb]}>词语名称</Text>
              <Text style={[styles.tableCheckTh, styles.tdb]}>面孔</Text>
              <Text style={[styles.tableCheckTh, styles.tdb]}>天鹅绒</Text>
              <Text style={[styles.tableCheckTh, styles.tdb]}>教堂</Text>
              <Text style={[styles.tableCheckTh, styles.tdb]}>菊花</Text>
              <Text style={[styles.tableCheckTh, styles.tdb]}>红色</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCheckTd, styles.tdb]}>第一次</Text>
              <Text
                style={[
                  styles.tableCheckTd,
                  styles.tdb,
                  { backgroundColor: "white" }
                ]}
              />
              <Text
                style={[
                  styles.tableCheckTd,
                  styles.tdb,
                  { backgroundColor: "white" }
                ]}
              />
              <Text
                style={[
                  styles.tableCheckTd,
                  styles.tdb,
                  { backgroundColor: "white" }
                ]}
              />
              <Text
                style={[
                  styles.tableCheckTd,
                  styles.tdb,
                  { backgroundColor: "white" }
                ]}
              />
              <Text
                style={[
                  styles.tableCheckTd,
                  styles.tdb,
                  { backgroundColor: "white" }
                ]}
              />
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCheckTd, styles.tdb]}>第二次</Text>
              <Text
                style={[
                  styles.tableCheckTd,
                  styles.tdb,
                  { backgroundColor: "white" }
                ]}
              />
              <Text
                style={[
                  styles.tableCheckTd,
                  styles.tdb,
                  { backgroundColor: "white" }
                ]}
              />
              <Text
                style={[
                  styles.tableCheckTd,
                  styles.tdb,
                  { backgroundColor: "white" }
                ]}
              />
              <Text
                style={[
                  styles.tableCheckTd,
                  styles.tdb,
                  { backgroundColor: "white" }
                ]}
              />
              <Text
                style={[
                  styles.tableCheckTd,
                  styles.tdb,
                  { backgroundColor: "white" }
                ]}
              />
            </View>
            <View style={{ position: "absolute", top: dp(110), left: dp(275) }}>
              <CheckBox.CheckBoxGroup
                value={this.state.presentIllnessOne}
                img={require("./img/checkbox.png")}
                imgSel={require("./img/checkbox-sel.png")}
                onChange={this.handleNowPresentOne}
              >
                <CheckBox
                  value="0"
                  style={{ marginRight: dp(157) }}
                  iconStyle={styles.checkbox}
                />
                <CheckBox
                  value="1"
                  style={{ marginRight: dp(157) }}
                  iconStyle={styles.checkbox}
                />
                <CheckBox
                  value="2"
                  style={{ marginRight: dp(157) }}
                  iconStyle={styles.checkbox}
                />
                <CheckBox
                  value="3"
                  style={{ marginRight: dp(157) }}
                  iconStyle={styles.checkbox}
                />
                <CheckBox
                  value="4"
                  style={{ marginRight: dp(157) }}
                  iconStyle={styles.checkbox}
                />
              </CheckBox.CheckBoxGroup>
            </View>
            <View style={{ position: "absolute", top: dp(215), left: dp(275) }}>
              <CheckBox.CheckBoxGroup
                value={this.state.presentIllnessTwo}
                img={require("./img/checkbox.png")}
                imgSel={require("./img/checkbox-sel.png")}
                onChange={this.handleNowPresentTwo}
              >
                <CheckBox
                  value="0"
                  style={{ marginRight: dp(157) }}
                  iconStyle={styles.checkbox}
                />
                <CheckBox
                  value="1"
                  style={{ marginRight: dp(157) }}
                  iconStyle={styles.checkbox}
                />
                <CheckBox
                  value="2"
                  style={{ marginRight: dp(157) }}
                  iconStyle={styles.checkbox}
                />
                <CheckBox
                  value="3"
                  style={{ marginRight: dp(157) }}
                  iconStyle={styles.checkbox}
                />
                <CheckBox
                  value="4"
                  style={{ marginRight: dp(157) }}
                  iconStyle={styles.checkbox}
                />
              </CheckBox.CheckBoxGroup>
            </View>
          </View>
        </View>
        <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
      </React.Fragment>
    );
  }
}
