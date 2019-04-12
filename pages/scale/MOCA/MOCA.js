/**
 * Created by zxf on 2018.9.17.
 */
import React from "react";
import { View, Text, StyleSheet, ART } from "react-native";
import TopBar from "../../../components/TopBar/TopBar";
// import ProgressBar from "../../../components/ProgressBar/ProgressBar";

import { BackgroundImage } from "../../../components/BackgroundImage/BackgroundImage";
import ButtonImg from "../../../components/ButtonImg/ButtonImg";
import DoctorHelpWaring from "../../PageComponent/DoctorHelpWaring/DoctorHelpWaring";
import { inject } from "mobx-react";
// 量表的各个问题模块
import ViewSpace from "./components/ViewSpace";
import Named from "./components/Named";
import Memory from "./components/Memory";
import Attention from "./components/Attention";
import RecordOne from "./components/RecordOne";
import Calculate from "./components/Calculate";
import RepeatRead from "./components/RepeatRead";
import Fluency from "./components/Fluency";
import Abstract from "./components/Abstract";
import DelayRemeber from "./components/DelayRemeber";
import DirectiveForce from "./components/DirectiveForce";

// 量表
import { save } from "../routeAndSave";

/**
 * @description 把一个量表按问题模块划分，最后再汇总到这个父级模块进行计算
 * @export
 * @class MMSE
 */
@inject("rootStore")
export default class MOCA extends React.Component {
  constructor(props) {
    super(props);
    // 代表精神量表的问题模块
    let questionModelArr = [
      "viewSpace",
      "named",
      "memory",
      "attention",
      "recordOne",
      "calculate",
      "repeatRead",
      "fluency",
      "abstract",
      "delayRemeber",
      "directiveForce"
    ];
    this.state = {
      homePage: true,
      questionModel: questionModelArr[0],
      questionModelNum: questionModelArr.length,
      questionModelIndex: 0,
      // 表示该模块是走正序还是反序
      directionForward: false,
      // 各个问题模块的答案
      // 各个问题模块的答案
      viewSpace: {
        questionInfo: ""
      },
      named: {
        questionInfo: ""
      },
      memory: {
        questionInfo: ""
      },
      attention: {
        questionInfo: ""
      },
      recordOne: {
        questionInfo: ""
      },
      calculate: {
        questionInfo: ""
      },
      repeatRead: {
        questionInfo: ""
      },
      fluency: {
        questionInfo: ""
      },
      abstract: {
        questionInfo: ""
      },
      delayRemeber: {
        questionInfo: ""
      },
      directiveForce: {
        questionInfo: ""
      }
    };
  }

  /**
   * @description 进行总分计算，并且判断痴呆程度
   * @returns
   */
  calculateAll = () => {
    console.log("this.state_", this.state);
    let totalPoints = 0;
    let entries = Object.entries(this.state);
    for (let item = 0; item < entries.length; item++) {
      const key = entries[item][0];
      const value = entries[item][1];
      if(key !== 'memory' && value['totalScore']){
        totalPoints += value.totalScore;
      } else {
          continue;
      }
    }
    // 获取受试者年龄
    const educationTime = this.props.rootStore.userInfo['educationTime']
    if(educationTime<=12 && totalPoints<30){
      totalPoints += 1; 
    }
    console.log("totalPoints_moca_", totalPoints);
    console.log("directiveForce_moca_123_", this.state.directiveForce);
    const obj = {
      viewSpace: this.state.viewSpace,
      named: this.state.named,

      memory: this.state.memory,
      attention: this.state.attention,

      recordOne: this.state.recordOne,
      calculate: this.state.calculate,

      repeatRead: this.state.repeatRead,
      fluency: this.state.fluency,
      abstract: this.state.abstract,
      delayRemeber: this.state.delayRemeber,
      directiveForce: this.state.directiveForce
    };
    const questionInfoTotal = Object.assign({}, obj);
    console.log("questionInfo_MOCA_", questionInfoTotal);
    // 依据总分判断状态
    let status;
    if (totalPoints > 26) {
      status = "正常";
    } else {
      status = "重度";
    }
    // this.props.rootStore.
    // this.props.rootStore.setReportData(reportData)
    const MOCA = {
      assessmentAnswer: JSON.stringify(questionInfoTotal),
      result: status,
      score: totalPoints
    };
    return MOCA;
  };

  // 从子组件问题模块传上来的值，然后确定是向前还是向后
  childrenInfo = (questionModel, questionInfo, totalScore, direction) => {
    console.log("have_in_questionModel", questionModel);
    console.log("have_in_childrenInfo", questionInfo);
    console.log("totalScore_", totalScore);
    const qustionModelInfo = {
      questionInfo,
      totalScore
    };

    this.setState(
      {
        [questionModel]: qustionModelInfo
      },
      () => {
        // 先判断是否是最前面一个或者最后面一个,forward表示上一个问题模块,backwards表示下一个问题模块
        if (this.state.questionModelIndex === 0 && direction === "forward") {
          return;
        } else if (
          this.state.questionModelIndex === this.state.questionModelNum - 1 &&
          direction === "backwards"
        ) {
          // 表示完成，rootStory保存量表信息
          const calculateResult = this.calculateAll();
          save(calculateResult, this.props.rootStore);
          return;
        }
        // 不是第一个和最后一个话，直接让question模块自增或者自减，
        // directionForward 表示进入问题模块是从头进还是从尾进
        if (direction === "forward") {
          console.log('direction === "forward"');
          this.setState({
            questionModelIndex: --this.state.questionModelIndex,
            directionForward: true
          });
        } else if (direction === "backwards") {
          this.setState({
            questionModelIndex: ++this.state.questionModelIndex,
            directionForward: false
          });
        }
      }
    );
  };

  // 必须绑定一个函数,设置不是首页，让取第一个测评问题模块页面
  startMeasurement = () => {
    this.setState(
      {
        homePage: false,
        directionForward: false
      },
      () => {
        console.log("this.state.homePage_", this.state.homePage);
      }
    );
  };
  renderQuestionPage() {
    return (
      <View>
        {this.state.questionModelIndex === 0 && (
          <ViewSpace
            questionModel={this.state.viewSpace}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 1 && (
          <Named
            questionModel={this.state.named}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 2 && (
          <Memory
            questionModel={this.state.memory}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 3 && (
          <Attention
            questionModel={this.state.attention}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 4 && (
          <RecordOne
            questionModel={this.state.recordOne}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 5 && (
          <Calculate
            questionModel={this.state.calculate}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 6 && (
          <RepeatRead
            questionModel={this.state.repeatRead}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 7 && (
          <Fluency
            questionModel={this.state.fluency}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 8 && (
          <Abstract
            questionModel={this.state.abstract}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 9 && (
          <DelayRemeber
            questionModel={this.state.delayRemeber}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 10 && (
          <DirectiveForce
            questionModel={this.state.directiveForce}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {/* <Text>123</Text> */}
      </View>
    );
  }
  renderHomePage() {
    return (
      <View>
        <View style={{ justifyContent: "center", marginTop: dp(60) }}>
          <BackgroundImage
            source={require("./components/img/bk1.png")}
            style={{ height: dp(500), width: dp(1725), alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: font(100),
                color: "#ffffff",
                marginTop: dp(120),
                fontWeight: "900",
                textAlign: "center"
              }}
            >
              MoCA认知测评
            </Text>
            <Text
              style={{
                fontSize: font(36),
                color: "#c4e1fe",
                marginTop: dp(40)
              }}
            >
              本次测评大约需要10分钟
            </Text>
          </BackgroundImage>
          <DoctorHelpWaring />
        </View>
        <View style={{ alignItems: "center", marginTop: dp(20) }}>
          <ButtonImg
            source={require("./components/img/btn-default.png")}
            sourcePress={require("./components/img/btn-press.png")}
            style={{
              width: dp(382),
              height: dp(95),
              marginTop: dp(74),
              borderRadius: dp(10),
              overflow: "hidden"
            }}
            onPress={this.startMeasurement}
          >
            <Text
              style={{
                fontSize: font(40),
                fontWeight: "bold",
                color: "#ffffff"
              }}
            >
              开始测评
            </Text>
          </ButtonImg>
        </View>
      </View>
    );
  }

  /**
   * @description
   * @returns
   */
  render() {
    return (
      <View style={styles.container}>
        <TopBar
          onPress={this.onPress}
          content={{ completeForm: "3", evaluationName: "MMSE" }}
        />
        {this.state.homePage && this.renderHomePage()}
        {!this.state.homePage && this.renderQuestionPage()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
