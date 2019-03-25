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
import { BackgroundImage } from "../../../../components/BackgroundImage/BackgroundImage";
import PageOrderCode from "../../../PageComponent/PageOrderCode/PageOrderCode";
import Radio from "../../../../components/Radio/src/Radio";
import Audio from "../../../../components/Audio/Audio";
import FrontAndBack from "../../../PageComponent/frontAndBack/frontAndBack";
import androidToast from "../../../PageComponent/AndroidToast/AndroidToast";
import { objectClone } from "../../../../utils/objectClone";
import * as commonFunction from "../../../PageComponent/commonFunction/commonFunction";

export default class DelayRecall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionModel: "delayRecall",
      questionIndex: 12
    };
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      ball: objectClone(answerModel),
      nationalFlag: objectClone(answerModel),
      trees: objectClone(answerModel)
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
    questionInfo["ball"]["score"] = parseInt(questionInfo["ball"]["answer"]);
    questionInfo["nationalFlag"]["score"] = parseInt(
      questionInfo["nationalFlag"]["answer"]
    );
    questionInfo["trees"]["score"] = parseInt(questionInfo["trees"]["answer"]);
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
      <View style={{ marginTop: dp(30) }}>
        <View style={{ backgroundColor: "#fff", marginTop: dp(50) }}>
          <PageOrderCode
            backgroundColor={"green"}
            index={this.state.questionIndex + 1}
            indexTotal={19}
          />
          <View
            style={{
              flexDirection: "row",
              width: dp(1600),
              marginTop: dp(-570),
              marginLeft: dp(200)
            }}
          >
            <Text style={[styles.questionText, { width: dp(1600) }]}>
              还记得刚才让您记住的那三个词吗？请您再说一遍
            </Text>
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
              borderBottomColor: "#ddd",
              marginTop: dp(50)
            }}
          />
        </View>
        <View style={[styles.table]}>
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
              <Text style={[styles.td, styles.tdb]}>皮球</Text>
              <Radio.RadioGroup
                model={this.state.questionInfo["ball"]["answer"]}
                onChange={this.keyBoardChange.bind(this, "ball")}
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
              <Text style={[styles.td, styles.tdb]}>国旗</Text>
              <Radio.RadioGroup
                model={this.state.questionInfo["nationalFlag"]["answer"]}
                onChange={this.keyBoardChange.bind(this, "nationalFlag")}
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
              <Text style={[styles.td, styles.tdb]}>树木</Text>
              <Radio.RadioGroup
                model={this.state.questionInfo["trees"]["answer"]}
                onChange={this.keyBoardChange.bind(this, "trees")}
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
        <View style={{ alignItems: "center", marginTop: dp(230) }} />
        <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
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
