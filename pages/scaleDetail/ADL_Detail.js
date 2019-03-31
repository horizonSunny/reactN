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

export default class ADL_Detail extends PureComponent {
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
    const adlInfo = [
      { question: "1.自己搭公共车辆", score: "3" },
      { question: "2.到家附近的地方去", score: "3" },
      { question: "3.自己做做饭(包括生火)", score: "3" },
      { question: "4.做家务", score: "3" },
      { question: "5.吃药", score: "3" },
      { question: "6.吃饭", score: "3" },
      { question: "7.穿衣服、脱衣服", score: "3" },
      { question: "8.梳头、刷牙等", score: "3" },
      { question: "9.洗自己的衣服", score: "3" },
      { question: "10.在平坦的室内走", score: "3" },
      { question: "11.上下楼梯", score: "3" },
      { question: "12.上下床，坐下或者站起", score: "3" },
      { question: "13.提水煮饭，洗澡", score: "3" },
      { question: "14.洗澡水(水已放好)", score: "3" },
      { question: "15.剪脚趾甲", score: "3" },
      { question: "16.逛街、购物", score: "3" },
      { question: "17.定时去厕所", score: "3" },
      { question: "18.打电话", score: "3" },
      { question: "19.处理好自己的钱财", score: "3" },
      { question: "20.独自在家", score: "3" }
    ];
    return (
      <View
        style={{
          width: dp(1400),
          height: dp(1000),
          borderWidth: dp(2),
          borderColor: "#000"
        }}>
        <ScrollView>
          <View>
            <Text style={{ marginBottom: dp(20) }}>
              现在为想问些有关于您平常每天需要做的事情，我想知道，您可以自己做这些事情还是需要你家人的帮助，或者您根本没法做这些事？
              {"\n"}评分:(1)自己可以做;(2)有些困难;(3)需要帮助;(4)根本没法做;
            </Text>
            {adlInfo.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <View
                    style={{
                      flexDirection: "row"
                    }}>
                    <Text
                      style={{
                        marginTop: dp(10),
                        width: "49%"
                      }}>
                      {item.question}
                    </Text>
                    <Text
                      style={{
                        textAlign: "right",
                        width: "49%"
                      }}>
                      [{item.score}]
                    </Text>
                  </View>
                  {/* <View
                    style={{
                      backgroundColor: "yellow",
                      width: dp(500),
                      float: "right"
                    }}>
                    <Text>[{item.score}]</Text>
                  </View> */}
                </React.Fragment>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
