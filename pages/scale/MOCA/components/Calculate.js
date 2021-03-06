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
import styles from "../../../../../assets/css/common";
import Audio from "../../../../components/Audio/Audio";

export default class Calculate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reduceSeven: 5,
      questionModel: "calculate",
      questionIndex: 9
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
    console.log('questionCurrent_',questionCurrent);
    const noEmpty = this.state.questionInfo[questionCurrent]["answer"] === "";
    const iterable = Object.values(this.state.questionInfo);
    console.log("iterable_", iterable);
    if (noEmpty) {
      androidToast("请选择选项");
      return;
    } else {
      // this.catchFocus();
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
    if(totalScore>3){
      totalScore = 3
    }else if(totalScore>=2&&totalScore<=3){
      totalScore = 2
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
  // catchFocus = () => {
  //   let index = 5 - this.state.reduceSeven + 1;
  //   item = this.state.questionArr[index];
  //   switch (item) {
  //     case "ninetyThree":
  //       this.refs.ninetyThree.focus();
  //       break;
  //     case "eightySix":
  //       this.refs.eightySix.focus();
  //       break;
  //     case "seventyNine":
  //       this.refs.seventyNine.focus();
  //       break;
  //     case "seventyTwo":
  //       this.refs.seventyTwo.focus();
  //       break;
  //     case "sixtyFive":
  //       this.refs.sixtyFive.focus();
  //       break;
  //     default:
  //       this.refs.ninetyThree.focus();
  //       break;
  //   }
  // };
  goPrev = () => {
    this.setState({ questionInfo: this.state.questionInfo });
    console.log("immediatrly_", this.state.questionInfo);
    commonFunction.jumpWithParameter("forward", this.state, this.props);
    return;
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
             {item === this.state.questionArr[5 - this.state.reduceSeven] && <Image
                style={{ width: dp(30), height: dp(30),marginTop:dp(26),marginRight:dp(15) }}
                source={require("./img/radio-sel.png")}
              />}
              <Text style={{ fontSize: font(60) }}>
                {item === "ninetyThree" ? "100-7:" : "继续减7:"}
              </Text>
              {/* <TextInput
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
              /> */}
              <Text   style={{
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
                }}>{this.state.questionInfo[item]["answer"]}</Text>
            </View>
          );
        })}
      </React.Fragment>
    );
  }
  render() {
    const pageOrderCodeCss =  { 
      background:{
        width: dp(150),
        height: dp(65),
        position: "absolute",
        top: dp(50),
        left: dp(-20) },
      quesNum:{
        fontSize: font(30),
        color: "#ffffff",
        marginRight: dp(20),
        position: "absolute",
        left: dp(10),
        top: dp(10)
      },
      text:{
        fontSize: font(20) 
      }
    }
    return (
      <View>
      <View style={{ marginTop: dp(10) }}>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: dp(0)
              }}
            >
              <PageOrderCode
                index={6}
                indexTotal={11}
                pageOrderCodeStyle={pageOrderCodeCss}
              />
              <View
                style={{
                  width: dp(1300),
                  marginTop: dp(-570),
                  marginLeft: dp(150)
                }}
              >
                <Text style={[{
                  width: dp(1200),
                  color: "#2c2c2c",
                  marginTop:dp(15),
                  lineHeight: dp(70),
                  paddingRight: dp(80),
                  fontWeight: "100"
                }, { fontSize: font(40),width: "80%" }]}>
                  连续减7
                </Text>
                <Text style={{ color: "black", fontSize: font(30) }}>
                    现在请您做一道计算题，计算100连续减去7，共计算5次，将每次计算的得数告诉我
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderLeftColor: "#ddd",
                  position: "absolute",
                  right: dp(50),
                  height: dp(200),
                  width: dp(200),
                }}
              >
                <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_6_3.m4a" />
              </View>
            </View>
        </View>
         <View style={{ flexDirection: "row", marginLeft: dp(350),marginTop: dp(50) }}>
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
