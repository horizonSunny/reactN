import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";

import { Image } from "react-native/Libraries/Animated/src/Animated";
import KeyBoardNumber from "../../../../components/tools/KeyBoardNumber";
import androidToast from "../../../PageComponent/AndroidToast/AndroidToast";
import { objectClone } from "../../../../utils/objectClone";
import * as commonFunction from "../../../PageComponent/commonFunction/commonFunction";
import PageOrderCode from "../../../PageComponent/PageOrderCode/PageOrderCode";
import FrontAndBack from "../../../PageComponent/frontAndBack/frontAndBack";

export default class CalculAteattention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reduceSeven: 5,
      questionModel: "calculAteattention",
      questionIndex: 10
    };
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      ninetyThree: objectClone(answerModel),
      eightySix: objectClone(answerModel),
      seventyNine: objectClone(answerModel),
      seventyTwo: objectClone(answerModel),
      sixtyFive: objectClone(answerModel)
    };

    if (this.props.questionModel["questionInfo"] === "") {
      this.setState({ questionInfo: questionInfo });
    } else {
      this.setState({ questionInfo: this.props.questionModel["questionInfo"] });
    }
    // console.log('this.state.questionInfo_calcul_',this.state.questionInfo);
    const questionArr = Object.keys(questionInfo);
    this.setState({ questionArr: questionArr });
  }
  /**
   * @description 表示下一次减法运算
   */
  goNext = () => {
    console.log("goNext!!!");
    console.log("this.state.questionInfo_", this.state.questionInfo);
    const questionCurrent = this.state.questionArr[5 - this.state.reduceSeven];
    const noEmpty = this.state.questionInfo[questionCurrent]["answer"] === "";
    const iterable = Object.values(this.state.questionInfo);
    console.log("iterable_", iterable);
    if (noEmpty) {
      androidToast("请选择选项");
      return;
    } else {
      this.catchFocus();
      if (this.state.reduceSeven > 1) {
        this.setState({
          reduceSeven: this.state.reduceSeven - 1
        });
      } else {
        for (const item of iterable) {
          if (item.answer === "") {
            androidToast("请选择选项");
            return;
          }
        }
        this.calculateScore();
      }
    }
  };
  judgeReduce(subtractor, minuend) {
    return parseInt(subtractor) - parseInt(minuend) === 7 ? 1 : 0;
  }
  calculateScore = () => {
    let questionInfo = objectClone(this.state.questionInfo);
    questionInfo["ninetyThree"]["score"] = this.judgeReduce(
      100,
      questionInfo["ninetyThree"]["answer"]
    );
    questionInfo["eightySix"]["score"] = this.judgeReduce(
      questionInfo["ninetyThree"]["answer"],
      questionInfo["eightySix"]["answer"]
    );
    questionInfo["seventyNine"]["score"] = this.judgeReduce(
      questionInfo["eightySix"]["answer"],
      questionInfo["seventyNine"]["answer"]
    );
    questionInfo["seventyTwo"]["score"] = this.judgeReduce(
      questionInfo["seventyNine"]["answer"],
      questionInfo["seventyTwo"]["answer"]
    );
    questionInfo["sixtyFive"]["score"] = this.judgeReduce(
      questionInfo["seventyTwo"]["answer"],
      questionInfo["sixtyFive"]["answer"]
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
  keyBoardChange = (key, value) => {
    let questionInfo = this.state.questionInfo;
    questionInfo[key]["answer"] = value;
    this.setState({ questionInfo: questionInfo });
  };
  catchFocus = () => {
    let index = 5 - this.state.reduceSeven + 1;
    item = this.state.questionArr[index];
    switch (item) {
      case "ninetyThree":
        this.refs.ninetyThree.focus();
        break;
      case "eightySix":
        this.refs.eightySix.focus();
        break;
      case "seventyNine":
        this.refs.seventyNine.focus();
        break;
      case "seventyTwo":
        this.refs.seventyTwo.focus();
        break;
      case "sixtyFive":
        this.refs.sixtyFive.focus();
        break;
      default:
        this.refs.ninetyThree.focus();
        break;
    }
  };

  reduce() {
    // if(this.state.reduceSeven === 5){
    return (
      <React.Fragment>
        {this.state.questionArr.map(item => {
          return (
            <View
              key={item}
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: dp(40)
              }}
            >
              <Text style={{ fontSize: font(60) }}>
                {item === "ninetyThree" ? "100-7:" : "继续减7:"}
              </Text>
              <TextInput
                ref={item}
                placeholderTextColor="#434343"
                keyboardType="number-pad"
                style={{
                  width: dp(300),
                  height: dp(100),
                  borderColor: "#444444",
                  borderWidth: dp(1),
                  fontSize: font(60),
                  textAlign: "center",
                  color: "#434343",
                  backgroundColor: "#fff",
                  padding: dp(0),
                  lineHeight: dp(100)
                }}
                value={this.state.questionInfo[item]["answer"]}
                onFocus={() => {
                  this.setState({
                    reduceSeven: 5 - this.state.questionArr.indexOf(item)
                  });
                }}
                autoFocus={item === "ninetyThree"}
                onBlur={() => {
                  this.refs.refKeyBoard.saveAndClear();
                }}
              />
            </View>
          );
        })}
      </React.Fragment>
    );
  }
  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: dp(50),
            alignItems: "center"
          }}
        >
          <PageOrderCode index={this.state.questionIndex + 1} indexTotal={19} />
          <View
            style={{
              width: dp(800),
              marginTop: dp(-570),
              justifyContent: "center",
              textAlign: "center"
            }}
          >
            <Text style={[styles.questionText, { width: "100%" }]}>
              请您计算100连续减去7
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginLeft: dp(350) }}>
          <View style={{ width: "50%", paddingRight: dp(300) }}>
            {this.reduce()}
          </View>
          <View style={{ width: "50%" }}>
            <KeyBoardNumber
              ref="refKeyBoard"
              key={7}
              style={{ marginTop: dp(200) }}
              onEnsure={this.goNext}
              onChangeText={this.keyBoardChange.bind(
                this,
                this.state.questionArr[5 - this.state.reduceSeven]
              )}
              scu={false}
            />
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: dp(50) }} />
        <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
      </View>
    );
  }
}
const BASE_COLOR = "#479e13";
const styles = StyleSheet.create({
  radio: {
    width: dp(50),
    height: dp(50)
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f9fd"
  },
  questionText: {
    fontSize: font(60),
    paddingTop: dp(30),
    paddingBottom: dp(30),
    width: dp(1200),
    color: "#2c2c2c",
    lineHeight: dp(88),
    marginLeft: dp(41),
    paddingRight: dp(80),
    fontWeight: "100",
    textAlign: "center"
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
  }
});
