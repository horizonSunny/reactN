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
    const directive = [
      { question: "1.今年的年份?", answer: 1 },
      { question: "2.现在是什么季节?", answer: 1 },
      { question: "3.现在是几月?", answer: 1 },
      { question: "4.今天是几号?", answer: 1 },
      { question: "5.今天是星期几?", answer: 1 },
      { question: "6.您现在住在那个城市?", answer: 1 },
      { question: "7.您现在住在什么区县?", answer: 1 },
      { question: "8.您现在住在什么街道?", answer: 1 },
      { question: "9.我们现在是在第几层楼?", answer: 1 },
      { question: "10.我们这是什么单位?", answer: 1 }
    ];
    return (
      <View
        style={{
          width: dp(1300),
          height: dp(1000),
          borderWidth: dp(2),
          borderColor: "#000"
        }}>
        <ScrollView>
          <TableBorder style={{ width: dp(1300), height: dp(300) }}>
            <Text>
              <Text style={{ fontSize: 14, color: "#000", fontWeight: "100" }}>
                定向力:
              </Text>
               <Text style={{ fontSize: 12 }}>请被试说出下列各题答案</Text> 
            </Text>
            <View>
              <View style={{ left: dp(0), position: "absolute" }}>
                {directive.map((item, index) => {
                  if (index % 2 === 0) {
                    return (
                      <Text key={index}>
                        {item.question} <AnswerReverse score={item.answer} />
                      </Text>
                    );
                  }
                })}
              </View>
              <View style={{ left: dp(650), position: "absolute" }}>
                {directive.map((item, index) => {
                  if (index % 2 !== 0) {
                    return (
                      <Text key={index}>
                        {item.question} <AnswerReverse score={item.answer} />
                      </Text>
                    );
                  }
                })}
              </View>
            </View>
          </TableBorder>
          <TableBorder
            style={{ width: dp(1300), height: dp(150), borderTopWidth: dp(0) }}>
            <Text>
              <Text style={{ fontSize: 14, color: "#000", fontWeight: "100" }}>
                即刻回忆:
              </Text>
            </Text>
            <View>
              <Text>
                11.现在我说三样东西的名称，在我全部讲完之后，请您重复说一遍，并记住这三样东西，因为等一下要再问您:
                <Text
                  style={{ fontSize: 12, color: "#000", fontWeight: "100" }}>
                  "皮球、国旗、树木"
                </Text>
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginLeft: dp(50) }}>
                皮球
                <AnswerReverse score={0} />
              </Text>
              <Text style={{ marginLeft: dp(100) }}>
                国旗
                <AnswerReverse score={1} />
              </Text>
              <Text style={{ marginLeft: dp(100) }}>
                树木
                <AnswerReverse score={0} />
              </Text>
            </View>
          </TableBorder>
          <TableBorder
            style={{ width: dp(1300), height: dp(150), borderTopWidth: dp(0) }}>
            <Text>
              <Text style={{ fontSize: 14, color: "#000", fontWeight: "100" }}>
                计算和注意力:
              </Text>
            </Text>
            <View>
              <Text>
                12.现在请您计算100连续减去7,共计算5次，说出每减一次的得数
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginLeft: dp(50) }}>
                93
                <AnswerReverse score={0} />
              </Text>
              <Text style={{ marginLeft: dp(100) }}>
                86
                <AnswerReverse score={1} />
              </Text>
              <Text style={{ marginLeft: dp(100) }}>
                79
                <AnswerReverse score={0} />
              </Text>
              <Text style={{ marginLeft: dp(100) }}>
                72
                <AnswerReverse score={1} />
              </Text>
              <Text style={{ marginLeft: dp(100) }}>
                65
                <AnswerReverse score={0} />
              </Text>
            </View>
          </TableBorder>
          <TableBorder
            style={{ width: dp(1300), height: dp(150), borderTopWidth: dp(0) }}>
            <Text>
              <Text style={{ fontSize: 14, color: "#000", fontWeight: "100" }}>
                命名:
              </Text>
            </Text>
            <View>
              <Text>
                14.(主试出示手表)请问这是什么?{"    "}手表
                <AnswerReverse score={0} />
              </Text>
            </View>
            <View>
              <Text>
                (出示铅笔)请问这是什么?{"    "}铅笔
                <AnswerReverse score={0} />
              </Text>
            </View>
          </TableBorder>
          <TableBorder
            style={{ width: dp(1300), height: dp(150), borderTopWidth: dp(0) }}>
            <Text>
              <Text style={{ fontSize: 14, color: "#000", fontWeight: "100" }}>
                复述:
              </Text>
            </Text>
            <View>
              <Text>
                15.现在我要说一句话，请您按照我说的话原样地重复一遍(只说一遍，完全正确的记一分)
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginLeft: dp(50) }}>
                四十四只石狮子
                <AnswerReverse score={0} />
              </Text>
            </View>
          </TableBorder>
          <TableBorder
            style={{ width: dp(1300), height: dp(150), borderTopWidth: dp(0) }}>
            <Text>
              <Text style={{ fontSize: 14, color: "#000", fontWeight: "100" }}>
                阅读:
              </Text>
            </Text>
            <View>
              <Text>
                16.请阅读这张卡片上所写的句子并照着去做(主试出式写有“闭上你的大眼睛”大字的卡片，如果被试闭上眼睛，记一分)
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginLeft: dp(50) }}>
                闭上你的眼睛
                <AnswerReverse score={0} />
              </Text>
            </View>
          </TableBorder>
          <TableBorder
            style={{ width: dp(1300), height: dp(150), borderTopWidth: dp(0) }}>
            <Text>
              <Text style={{ fontSize: 14, color: "#000", fontWeight: "100" }}>
                理解:
              </Text>
            </Text>
            <View>
              <Text>
                17.(主试出示一张纸，说出下面一段话后，将纸给被试，不要重复说明，不要示范，顺序需正确)
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginLeft: dp(50) }}>
                请用右手拿这张纸
                <AnswerReverse score={0} />
              </Text>
              <Text style={{ marginLeft: dp(100) }}>
                把纸对折
                <AnswerReverse score={0} />
              </Text>
              <Text style={{ marginLeft: dp(100) }}>
                将纸放在地面上
                <AnswerReverse score={0} />
              </Text>
            </View>
          </TableBorder>
          <TableBorder
            style={{ width: dp(1300), height: dp(150), borderTopWidth: dp(0) }}>
            <Text>
              <Text style={{ fontSize: 14, color: "#000", fontWeight: "100" }}>
                书写:
              </Text>
            </Text>
            <View>
              <Text>
                18.请您写一句完整的、有意义的句子(句子必须有主语，动词)
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginLeft: dp(50) }}>
                句子
                <AnswerReverse score={0} />
              </Text>
            </View>
          </TableBorder>
          <TableBorder
            style={{ width: dp(1300), height: dp(450), borderTopWidth: dp(0) }}>
            <Text>
              <Text style={{ fontSize: 14, color: "#000", fontWeight: "100" }}>
                视空间知觉:
              </Text>
            </Text>
            <View>
              <Text>19.请你按照样子画图</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: dp(395), height: dp(248) }}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    marginLeft: dp(250)
                  }}
                  source={require("./img/17-img.png")}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginLeft: dp(50) }}>
                画图
                <AnswerReverse score={0} />
              </Text>
            </View>
          </TableBorder>
          <TableBorder
            style={{ width: dp(1300), height: dp(150), borderTopWidth: dp(0) }}>
            <Text>
              <Text style={{ fontSize: 14, color: "#000", fontWeight: "100" }}>
                延迟回忆:
              </Text>
            </Text>
            <View>
              <Text>13.现在请您告诉我，刚才我我要您记住的三样东西是什么</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginLeft: dp(50) }}>
                皮球
                <AnswerReverse score={0} />
              </Text>
              <Text style={{ marginLeft: dp(100) }}>
                国旗
                <AnswerReverse score={0} />
              </Text>
              <Text style={{ marginLeft: dp(100) }}>
                树木
                <AnswerReverse score={0} />
              </Text>
            </View>
          </TableBorder>
        </ScrollView>
      </View>
    );
  }
}
