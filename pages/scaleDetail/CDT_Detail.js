import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ToastAndroid,
  Modal,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";
import React, { PureComponent } from "react";
import data from "./testData";
import AnswerReverse from "./components/AnswerReverse";
import TableBorder from "./components/TableBorder";
import styles from "../../../assets/css/common";

export default class CDT_Detail extends PureComponent {
  constructor(props) {
    super(props);
    // const propsInfo = this.props.Info;
    console.log("data.assessmentAnswer_", data);
    const propsInfo = data.assessmentAnswer;
    const score = data.score;
    const result = data.result;
    const questionModel = {
      directiveForce: propsInfo.directiveForce,
      ImmediatelyRecall: propsInfo.ImmediatelyRecall,
      calculAteattention: propsInfo.calculAteattention,
      named: propsInfo.named,
      retell: propsInfo.retell,
      read: propsInfo.read,
      understand: propsInfo.understand,
      write: propsInfo.write,
      viewSpace: propsInfo.viewSpace,
      delayRecall: propsInfo.delayRecall
    };
    // 头部预留，可能要修改
    this.state = {
      questionModel: questionModel,
      totalScore: score,
      result: result
    };
  }
  render() {
    const cdtInfo = [
      { question: "画好一个封闭的圆", score: 0 },
      { question: "12个数字均没有遗漏", score: 1 },
      { question: "数字的位置及顺序准确", score: 0 },
      { question: "将指针置于正确的位置", score: 1 }
    ];
    return (
      <React.Fragment>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: dp(1400),
              height: dp(200),
              borderWidth: dp(2),
              borderColor: "#000",
              alignItems: "center"
            }}
          >
            <Text>MoCa量表评估报告</Text>
            <View style={styles.tableRow}>
              <Text style={[styles.tableDetial, styles.tdb]}>项目 </Text>
              <Text style={[styles.tableDetial, styles.tdb]}>内容</Text>
              <Text style={[styles.tableDetial, styles.tdb]}>得分</Text>
              <Text style={[styles.tableDetial, styles.tdb]}>正常参考值</Text>
              <Text style={[styles.tableDetial, styles.tdb]}>结果</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableDetial, styles.tdb]}>MoCa量表 </Text>
              <Text style={[styles.tableDetial, styles.tdb]}>情景记忆</Text>
              <Text style={[styles.tableDetial, styles.tdb]}>87.0</Text>
              <Text style={[styles.tableDetial, styles.tdb]}>>61.2</Text>
              <Text style={[styles.tableDetial, styles.tdb]}>正常</Text>
            </View>
          </View>
          <View
            style={{
              width: dp(1400),
              height: dp(50)
            }}
          />
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: dp(1400),
                flexDirection: "row"
              }}
            >
              <Text
                style={{
                  width: "60%",
                  height: dp(50),
                  borderColor: "#000",
                  borderTopWidth: dp(3),
                  borderBottomWidth: dp(2),
                  textAlign: "center",
                  textAlignVertical: "center"
                }}
              >
                项目
              </Text>
              <Text
                style={{
                  width: "40%",
                  height: dp(50),
                  borderColor: "#000",
                  borderTopWidth: dp(3),
                  borderBottomWidth: dp(2),
                  textAlign: "center",
                  textAlignVertical: "center"
                }}
              >
                得分
              </Text>
            </View>
            {cdtInfo.map((item, index) => {
              return (
                <View
                  style={{
                    width: dp(1400),
                    height: dp(100),
                    borderColor: "#000",
                    flexDirection: "row"
                  }}
                  key={index}
                >
                  <Text
                    style={{
                      width: "60%",
                      height: dp(50),
                      textAlign: "center",
                      textAlignVertical: "center"
                    }}
                  >
                    {item.question}
                  </Text>
                  <Text
                    style={{
                      width: "40%",
                      height: dp(50),
                      textAlign: "center",
                      textAlignVertical: "center"
                    }}
                  >
                    <AnswerReverse score={item["score"]} />
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </React.Fragment>
    );
  }
}
