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

import { Image } from "react-native/Libraries/Animated/src/Animated";
import Canvas from "../../../../components/Canvas/Canvas";
import KeyBoardNumber from "../../../../components/tools/KeyBoardNumber";
import ButtonImg from "../../../../components/ButtonImg/ButtonImg";
import { BackgroundImage } from "../../../../components/BackgroundImage/BackgroundImage";
import Radio from "../../../../components/Radio/src/Radio";
import RadioButton from "../../../../components/RadioButton/src/RadioButton";
import FrontAndBack from "../../../PageComponent/frontAndBack/frontAndBack";
import PageOrderCode from "../../../PageComponent/PageOrderCode/PageOrderCode";
import androidToast from "../../../PageComponent/AndroidToast/AndroidToast";
import Audio from "../../../../components/Audio/Audio";
import PrevButton from "../../../PageComponent/PrevButton/PrevButton";
import * as commonFunction from "../../../PageComponent/commonFunction/commonFunction";

// tools
import { objectClone } from "../../../../utils/objectClone";

export default class ViewSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionModel: "viewSpace",
      questionIndex: 17
      // isDrawResult: false
    };
  }
  canvas = React.createRef();
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      draw: objectClone(answerModel)
    };
    if (this.props.questionModel["questionInfo"] === "") {
      this.setState({ questionInfo: questionInfo });
    } else {
      this.setState({ questionInfo: this.props.questionModel["questionInfo"] });
    }
    let isDrawResult = false;
    this.props.questionModel["isDrawResult"]
      ? this.setState({
          isDrawResult: this.props.questionModel["isDrawResult"]
        })
      : this.setState({ isDrawResult: false });
  }
  keyBoardChange = (key, value) => {
    let questionInfo = this.state.questionInfo;
    questionInfo[key]["answer"] = value;
    this.setState({ questionInfo: questionInfo });
  };
  goPrev = () => {
    this.setState({ questionInfo: this.state.questionInfo });
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
    questionInfo["draw"]["score"] = parseInt(questionInfo["draw"]["answer"]);
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
  getBase64 = base64 => {
    console.log("123_", base64);
    this.setState({
      imgPath: base64,
      isDrawResult: true
    });
  };
  draw() {
    return (
      <React.Fragment>
        <View style={{ backgroundColor: "#fff", marginTop: dp(80) }}>
          <PageOrderCode index={this.state.questionIndex + 1} />
          <View
            style={{
              flexDirection: "row",
              width: dp(1000),
              marginTop: dp(-570),
              marginLeft: dp(200)
            }}
          >
            <Text
              style={[
                styles.questionText,
                { width: dp(1000), textAlign: "left" }
              ]}
            >
              请您照着下图的样子在右侧方框里画出来
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: dp(395), height: dp(248) }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                marginLeft: dp(250),
                marginTop: dp(100)
              }}
              source={require("./img/17-img.png")}
            />
          </View>
          <View
            style={{
              marginLeft: dp(800),
              height: dp(700),
              marginTop: dp(-200),
              width: dp(600)
            }}
          >
            <Canvas
              getBase64={this.getBase64}
              ref={this.canvas}
              strokeWidth={4}
              canvasStyle={{
                width: dp(600),
                height: dp(700)
              }}
            />
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: dp(80) }} />
        <FrontAndBack
          goNext={() => {
            this.canvas.current.buildImg();
          }}
          goPrev={this.goPrev}
        />
      </React.Fragment>
    );
  }
  drawResult() {
    return (
      <React.Fragment>
        <View style={{ backgroundColor: "#fff", marginTop: dp(80) }}>
          <PageOrderCode
            backgroundColor={"green"}
            index={this.state.questionIndex + 1}
            indexTotal={19}
          />
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "rgb(246,246,246)",
              width: dp(1460),
              marginTop: dp(-570),
              marginLeft: dp(230)
            }}
          >
            <View style={{ width: dp(395), height: dp(248) }}>
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  marginLeft: dp(200),
                  marginTop: dp(10)
                }}
                source={require("./img/17-img.png")}
              />
            </View>
            <View
              style={{ width: dp(240), height: dp(280), marginLeft: dp(700) }}
            >
              {this.state.imgPath && (
                <Image
                  source={{ uri: this.state.imgPath }}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: dp(50),
            marginBottom: dp(50)
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: dp(1500),
              borderBottomWidth: dp(1),
              borderBottomColor: "#ddd"
            }}
          />
        </View>
        <View style={styles.table}>
          <View style={styles.tableColumn1}>
            <Image
              style={{ width: dp(250), height: dp(320) }}
              source={require("./img/doctor1.png")}
            />
          </View>
          <View>
            <View style={styles.tableRow}>
              <Text style={[styles.th, { width: dp(600) }, styles.tdb]}>
                正确
              </Text>
              <Text style={[styles.th, { width: dp(600) }, styles.tdb]}>
                错误
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Radio.RadioGroup
                model={this.state.questionInfo["draw"]["answer"]}
                onChange={this.keyBoardChange.bind(this, "draw")}
              >
                <View style={[styles.td, { width: dp(600) }]}>
                  <Radio value={1} style={styles.radio} />
                </View>
                <View style={[styles.td, { width: dp(600) }]}>
                  <Radio value={0} style={styles.radio} />
                </View>
              </Radio.RadioGroup>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: dp(80) }} />
        <FrontAndBack
          goNext={this.goNext}
          goPrev={() => {
            this.setState({
              isDrawResult: false
            });
          }}
        />
      </React.Fragment>
    );
  }
  render() {
    return (
      <View>
        {!this.state.isDrawResult && this.draw()}
        {this.state.isDrawResult && this.drawResult()}
      </View>
    );
  }
}
const BASE_COLOR = "#479e13";
const styles = StyleSheet.create({
  baseColor: {
    color: BASE_COLOR
  },
  questionContainer: {
    backgroundColor: "#406dce",
    minHeight: dp(250),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  radio: {
    width: dp(50),
    height: dp(50)
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f9fd"
  },
  questions: {
    backgroundColor: "#406ece",
    minHeight: dp(200),
    alignItems: "center"
  },
  questionText: {
    color: "#ffffff",
    fontSize: font(60),
    paddingTop: dp(30),
    paddingBottom: dp(30)
  },
  quesNum: {
    fontSize: font(40),
    color: "#ffffff",
    marginRight: dp(20),
    position: "absolute",
    left: dp(20),
    top: dp(20)
  },
  backButton: {
    width: dp(351),
    height: dp(80),
    borderWidth: dp(3),
    borderColor: "#f0b22b",
    backgroundColor: "#ffffff",
    borderRadius: dp(10),
    marginRight: dp(194),
    justifyContent: "center",
    alignItems: "center"
  },
  table: {
    flexDirection: "row"
  },
  tableRow: {
    flex: 1,
    flexDirection: "row"
  },
  tableTh: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    borderWidth: dp(0.5),
    borderColor: "#f0b22b"
  },
  tableTd: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    borderWidth: dp(0.5),
    borderColor: "#f0b22b"
  },
  tableThText: {
    fontSize: font(40)
  },
  baseColor: {
    color: BASE_COLOR
  },
  questionContainer: {
    backgroundColor: "#406dce",
    minHeight: dp(250),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  table: {
    flexDirection: "row",
    height: dp(320),
    alignItems: "center",
    marginLeft: dp(240)
  },
  tableColumn1: {
    alignItems: "center",
    borderBottomColor: BASE_COLOR,
    borderBottomWidth: dp(0.5)
  },
  tableRow: {
    flex: 1,
    flexDirection: "row"
  },
  td: {
    fontSize: font(28),
    color: "#777777",
    width: dp(400),
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: dp(0.5),
    borderColor: BASE_COLOR
  },
  tdb: {
    backgroundColor: "rgb(246,246,246)"
  },
  radio: {
    width: dp(50),
    height: dp(50)
  },
  th: {
    fontSize: font(40),
    color: "#777777",
    width: dp(400),
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: dp(0.5),
    borderColor: BASE_COLOR
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  questions: {
    backgroundColor: "#406ece",
    minHeight: dp(200),
    alignItems: "center"
  },
  questionText: {
    width: dp(1200),
    color: "#2c2c2c",
    fontSize: font(60),
    lineHeight: dp(88),
    marginLeft: dp(41),
    paddingRight: dp(80),
    fontWeight: "100",
    textAlign: "center"
  },
  questionText1: {
    color: "#2c2c2c",
    fontSize: font(60)
  },
  quesNum: {
    fontSize: font(60),
    color: "#ffffff"
  },
  backButton: {
    width: dp(351),
    height: dp(80),
    borderWidth: dp(3),
    borderColor: "#f0b22b",
    backgroundColor: "#ffffff",
    borderRadius: dp(10),
    marginRight: dp(194),
    justifyContent: "center",
    alignItems: "center"
  }
});
