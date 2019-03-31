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
        <View
          style={{
            width: dp(1400),
            flexDirection: "row"
          }}>
          <Text
            style={{
              width: "60%",
              height: dp(50),
              borderColor: "#000",
              borderTopWidth: dp(3),
              borderBottomWidth: dp(2),
              textAlign: "center",
              textAlignVertical: "center"
            }}>
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
            }}>
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
              key={index}>
              <Text
                style={{
                  width: "60%",
                  height: dp(50),
                  textAlign: "center",
                  textAlignVertical: "center"
                }}>
                {item.question}
              </Text>
              <Text
                style={{
                  width: "40%",
                  height: dp(50),
                  textAlign: "center",
                  textAlignVertical: "center"
                }}>
                <AnswerReverse score={item["score"]} />
              </Text>
            </View>
          );
        })}
      </React.Fragment>
    );
  }
}
