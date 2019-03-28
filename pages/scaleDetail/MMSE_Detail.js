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
import React, { PureComponent } from "react";
import data from "./testData";
export default class MMSE_Detail extends PureComponent {
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
    console.log("this.state.directiveForce_", this.state.directiveForce);
    return (
      <View>
        <View>
          {/* 一个模块左边的地方 */}
          <View>
            <Text>
              今年几月份？{" "}
              {this.state.questionModel.directiveForce.questionInfo.thisYear
                .score === 1
                ? "[ √ ]"
                : "[ × ]"}
            </Text>
          </View>
          {/* 一个模块右边的地方 */}
          <View />
        </View>
      </View>
    );
  }
}
