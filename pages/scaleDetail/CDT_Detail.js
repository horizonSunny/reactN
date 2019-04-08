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
// import NavigationService from "../../router/NavigationService";
import { NavigationActions } from "react-navigation";

export default class CDT_Detail extends PureComponent {
  constructor(props) {
    super(props);
    // 获取参数，test测试
    let item = this.props.navigation.state.params.item;
    console.log("-----------------------");
    console.log("item", item);

    const propsInfo = JSON.parse(item.assessmentAnswer);
    const score = data.score;
    const result = data.result;
    const questionModel = propsInfo.cdt.questionInfo;
    // 头部预留，可能要修改
    this.state = {
      questionModel: questionModel,
      assessmentName: item.assessmentName,
      assessmentContent: item.assessmentContent,
      score: item.score,
      referenceValue: item.referenceValue,
      result: item.result
    };
  }
  render() {
    const cdtInfo = [
      {
        question: "画好一个封闭的圆",
        score: this.state.questionModel["haveCircle"]["score"]
      },
      {
        question: "12个数字均没有遗漏",
        score: this.state.questionModel["twelveNum"]["score"]
      },
      {
        question: "数字的位置及顺序准确",
        score: this.state.questionModel["ordinalPosition"]["score"]
      },
      {
        question: "将指针置于正确的位置",
        score: this.state.questionModel["pointer"]["score"]
      }
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
            <Text>CDT量表评估报告</Text>
            <View style={styles.tableRow}>
              <Text style={[styles.tableDetial, styles.tdb]}>项目 </Text>
              <Text style={[styles.tableDetial, styles.tdb]}>内容</Text>
              <Text style={[styles.tableDetial, styles.tdb]}>得分</Text>
              <Text style={[styles.tableDetial, styles.tdb]}>正常参考值</Text>
              <Text style={[styles.tableDetial, styles.tdb]}>结果</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableDetial, styles.tdb]}>
                {this.state.assessmentName}
              </Text>
              <Text style={[styles.tableDetial, styles.tdb]}>
                {this.state.assessmentContent}
              </Text>
              <Text style={[styles.tableDetial, styles.tdb]}>
                {this.state.score}
              </Text>
              <Text style={[styles.tableDetial, styles.tdb]}>
                {this.state.referenceValue}
              </Text>
              <Text style={[styles.tableDetial, styles.tdb]}>
                {this.state.result}
              </Text>
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
