import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  ToastAndroid,
  Modal,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";
import ButtomImg from "../../components/ButtonImg/ButtonImg";
import React, { PureComponent } from "react";
import data from "./testData";
import AnswerReverse from "./components/AnswerReverse";
import TableBorder from "./components/TableBorder";
import styles from "../../../assets/css/common";
import { StackActions } from "react-navigation";

export default class ADL_Detail extends PureComponent {
  constructor(props) {
    super(props);
    let item = this.props.navigation.state.params.item;
    console.log("-----------------------");
    console.log("item", item);

    const propsInfo = JSON.parse(item.assessmentAnswer);
    const score = data.score;
    const result = data.result;
    const questionModel = propsInfo.adl.questionInfo;
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
  goBack=()=>{
    const popAction = StackActions.pop({
      n: 1,
    });
    this.props.navigation.dispatch(popAction);
  }
  render() {
    const adlInfo = [
      {
        question: "1.自己搭公共车辆",
        score: this.state.questionModel["lift"]["score"]
      },
      {
        question: "2.到家附近的地方去",
        score: this.state.questionModel["goOut"]["score"]
      },
      {
        question: "3.自己做做饭(包括生火)",
        score: this.state.questionModel["selfCatering"]["score"]
      },
      {
        question: "4.做家务",
        score: this.state.questionModel["keepHouse"]["score"]
      },
      {
        question: "5.吃药",
        score: this.state.questionModel["takeMedicine"]["score"]
      },
      { question: "6.吃饭", score: this.state.questionModel["eat"]["score"] },
      {
        question: "7.穿衣服、脱衣服",
        score: this.state.questionModel["putOn"]["score"]
      },
      {
        question: "8.梳头、刷牙等",
        score: this.state.questionModel["brushTeeth"]["score"]
      },
      {
        question: "9.洗自己的衣服",
        score: this.state.questionModel["washClothes"]["score"]
      },
      {
        question: "10.在平坦的室内走",
        score: this.state.questionModel["indoor"]["score"]
      },
      {
        question: "11.上下楼梯",
        score: this.state.questionModel["stairs"]["score"]
      },
      {
        question: "12.上下床，坐下或者站起",
        score: this.state.questionModel["bed"]["score"]
      },
      {
        question: "13.提水煮饭，洗澡",
        score: this.state.questionModel["takeBath"]["score"]
      },
      {
        question: "14.洗澡水(水已放好)",
        score: this.state.questionModel["takeBathTwo"]["score"]
      },
      {
        question: "15.剪脚趾甲",
        score: this.state.questionModel["trimx"]["score"]
      },
      {
        question: "16.逛街、购物",
        score: this.state.questionModel["shopping"]["score"]
      },
      {
        question: "17.定时去厕所",
        score: this.state.questionModel["toilet"]["score"]
      },
      {
        question: "18.打电话",
        score: this.state.questionModel["phone"]["score"]
      },
      {
        question: "19.处理好自己的钱财",
        score: this.state.questionModel["takeMoney"]["score"]
      },
      {
        question: "20.独自在家",
        score: this.state.questionModel["alone"]["score"]
      }
    ];
    return (
      <React.Fragment>
      <View style={{height: dp(90),backgroundColor: "#33455d"}}>
            <ImageBackground source={require("./img/top.png")} style={{
                width: "100%",
                height: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
              <ButtomImg
              onPress={this.goBack}
              style={{
                width: dp(36),
                height: dp(38),
                marginLeft: dp(40),
                marginRight: dp(40)
              }}
              source={require("./img/back.png")}
            />
            </ImageBackground>
        </View>
        <View style={{ alignItems: "center", backgroundColor: '#fff',height: dp(1300),paddingTop:dp(20)}}>
          <View
            style={{
              width: dp(1400),
              height: dp(200),
              borderWidth: dp(2),
              borderColor: "#ddd",
              alignItems: "center",
              paddingTop:dp(10),
              paddingBottom:dp(10)
            }}
          >
            <Text>ADL量表评估报告</Text>
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
          <View
            style={{
              width: dp(1400),
              height: dp(790),
              borderWidth: dp(2),
              borderColor: "#ddd"
            }}
          >
            <ScrollView>
              <View>
                <Text style={{ marginBottom: dp(20) }}>
                  现在为想问些有关于您平常每天需要做的事情，我想知道，您可以自己做这些事情还是需要你家人的帮助，或者您根本没法做这些事？
                  {"\n"}
                  评分:(1)自己可以做;(2)有些困难;(3)需要帮助;(4)根本没法做;
                </Text>
                {adlInfo.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <View
                        style={{
                          flexDirection: "row"
                        }}
                      >
                        <Text
                          style={{
                            marginTop: dp(10),
                            width: "49%"
                          }}
                        >
                          {item.question}
                        </Text>
                        <Text
                          style={{
                            textAlign: "right",
                            width: "49%"
                          }}
                        >
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
        </View>
      </React.Fragment>
    );
  }
}
