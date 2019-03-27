import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ToastAndroid,
  Modal,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";
import Canvas from "../../../../components/Canvas/Canvas";
import { Image } from "react-native/Libraries/Animated/src/Animated";
import KeyBoardNumber from "../../../../components/tools/KeyBoardNumber";
import ButtonImg from "../../../../components/ButtonImg/ButtonImg";
import { BackgroundImage } from "../../../../components/BackgroundImage/BackgroundImage";
import Radio from "../../../../components/Radio/src/Radio";
import RadioButton from "../../../../components/RadioButton/src/RadioButton";
import FrontAndBack from "../../../PageComponent/frontAndBack/frontAndBack";
import PageOrderCode from "../../../PageComponent/PageOrderCode/PageOrderCode";
import androidToast from "../../../PageComponent/AndroidToast/AndroidToast";
import * as commonFunction from "../../../PageComponent/commonFunction/commonFunction";
import { inject } from "mobx-react";
import AnswerConfirm from "../../../PageComponent/AnswerConfirm/AnswerConfirm";

// tools
import { objectClone } from "../../../../utils/objectClone";
import { save } from "../../routeAndSave";
import styles from "../../../../../assets/css/common";

@inject("rootStore")
export default class CdtScale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      canvasImg: ""
    };
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      haveCircle: objectClone(answerModel),
      twelveNum: objectClone(answerModel),
      ordinalPosition: objectClone(answerModel),
      pointer: objectClone(answerModel)
    };
    this.setState({ questionInfo: questionInfo });
  }
  keyBoardChange = (key, value) => {
    let questionInfo = this.state.questionInfo;
    questionInfo[key]["answer"] = value;
    this.setState({ questionInfo: questionInfo });
  };
  goNext = () => {};
  goPrev = () => {
    if (this.state.questionIndex === 0) {
      return;
    }
    this.setState((prevState, props) => {
      questionIndex: prevState.questionIndex - 1;
    });
  };
  calculate = () => {};
  canvasCdt = React.createRef();
  getBase64 = base64 => {
    this.setState({
      canvasImg: base64,
      questionIndex: this.state.questionIndex + 1
    });
  };
  render() {
    info = [
      { quetionName: "封闭的圆", quetionType: "haveCircle" },
      { quetionName: "12个数字", quetionType: "twelveNum" },
      { quetionName: "位置准确", quetionType: "ordinalPosition" },
      { quetionName: "指针正确", quetionType: "pointer" }
    ];
    return (
      <View>
        {this.state.questionIndex === 0 && (
          <View style={{ marginTop: dp(30) }}>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: dp(50),
                alignItems: "center"
              }}
            >
              <PageOrderCode
                index={this.state.questionIndex + 1}
                indexTotal={19}
              />
              <View
                style={{
                  width: dp(1000),
                  marginTop: dp(-570),
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center"
                }}
              >
                <Text style={[styles.questionText, { width: "100%" }]}>
                  1-2.画钟表
                  <Text style={{ color: "black", fontSize: font(40) }}>
                    (11点15分)
                  </Text>
                </Text>
              </View>
              <View style={{ justifyContent: "center" }} />
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: dp(60),
                height: dp(700)
              }}
            >
              <Canvas
                getBase64={this.getBase64}
                ref={this.canvasCdt}
                strokeWidth={1}
                canvasStyle={{
                  width: dp(1300),
                  height: dp(700)
                }}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: dp(100) }} />
            <FrontAndBack
              goNext={() => {
                this.canvasCdt.current.buildImg();
              }}
              goPrev={this.goPrev}
            />
          </View>
        )}
        {this.state.questionIndex === 1 && (
          <View>
            <View style={{ alignItems: "center" }}>
              <View style={{ width: dp(1000), height: dp(500) }}>
                {this.state.canvasImg && (
                  <Image
                    source={{ uri: this.state.canvasImg }}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgb(240,240,240)",
                      resizeMode: "cover"
                    }}
                  />
                )}
              </View>
              <View style={{ alignItems: "center", marginTop: dp(50) }} />
            </View>
            <View style={[styles.table, { marginBottom: dp(50) }]}>
              <View style={styles.tableColumn1}>
                <Image
                  style={{ width: dp(250), height: dp(320) }}
                  source={require("../img/doctor1.png")}
                />
              </View>
              <View>
                <View style={styles.tableRow}>
                  <Text style={[styles.th, styles.tdb]}>词语名称 </Text>
                  <Text style={[styles.th, styles.tdb]}>正确</Text>
                  <Text style={[styles.th, styles.tdb]}>错误</Text>
                </View>
                {info.map((item, index) => {
                  return (
                    <View key={index} style={styles.tableRow}>
                      <Text style={[styles.td, styles.tdb]}>
                        {item.quetionName}
                      </Text>
                      <Radio.RadioGroup
                        model={
                          this.state.questionInfo[item.quetionType]["answer"]
                        }
                        onChange={this.keyBoardChange.bind(
                          this,
                          item.quetionType
                        )}
                      >
                        <View style={styles.td}>
                          <Radio value={1} style={styles.radio} />
                        </View>
                        <View style={styles.td}>
                          <Radio value={0} style={styles.radio} />
                        </View>
                      </Radio.RadioGroup>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={{ alignItems: "center", marginTop: dp(50) }} />
            <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
          </View>
        )}
      </View>
    );
  }
}
