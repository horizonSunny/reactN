/**
 * Created by zxf on 2018.9.17.
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TopBar from "../../../components/TopBar/TopBar";
// import ProgressBar from "../../../components/ProgressBar/ProgressBar";

import { BackgroundImage } from "../../../components/BackgroundImage/BackgroundImage";
import ButtonImg from "../../../components/ButtonImg/ButtonImg";
import DoctorHelpWaring from "../../PageComponent/DoctorHelpWaring/DoctorHelpWaring";
import { inject } from "mobx-react";
import * as dateTime from "../../../utils/getDate";
// 量表的各个问题模块
import DirectiveForce from "./components/DirectiveForce";
import ImmediatelyRecall from "./components/ImmediatelyRecall";
import CalculAteattention from "./components/CalculAteattention";
import Named from "./components/Named";
import Retell from "./components/Retell";
import Read from "./components/Read";
import Understand from "./components/Understand";
import Write from "./components/Write";
import ViewSpace from "./components/ViewSpace";
import DelayRecall from "./components/DelayRecall";
// 量表
import { save } from "../routeAndSave";

/**
 * @description 把一个量表按问题模块划分，最后再汇总到这个父级模块进行计算
 * @export
 * @class MMSE
 */
@inject("rootStore")
export default class MMSE extends React.Component {
  constructor(props) {
    super(props);
    // 代表精神量表的问题模块
    let questionModelArr = [
      "directiveForce",
      "immediatelyRecall",
      "calculAteattention",
      "named",
      "retell",
      "read",
      "understand",
      "write",
      "viewSpace",
      "delayRecall"
    ];
    this.state = {
      modalVisible: false,
      homePage: true,
      questionModel: questionModelArr[0],
      questionModelNum: questionModelArr.length,
      questionModelIndex: 0,
      // 表示该模块是走正序还是反序
      directionForward: false,
      // 各个问题模块的答案
      directiveForce: {
        questionInfo: ""
      },
      ImmediatelyRecall: {
        questionInfo: ""
      },
      calculAteattention: {
        questionInfo: ""
      },
      named: {
        questionInfo: ""
      },
      retell: {
        questionInfo: ""
      },
      read: {
        questionInfo: ""
      },
      understand: {
        questionInfo: ""
      },
      write: {
        questionInfo: ""
      },
      viewSpace: {
        questionInfo: ""
      },
      delayRecall: {
        questionInfo: ""
      }
    };
  }

  /**
   * @description 进行总分计算，并且判断痴呆程度
   * @returns
   */
  calculate = () => {
    console.log("123_start");
    console.log("this.state_", this.state);
    let totalPoints = 0;
    let values = Object.values(this.state);
    for (let item = 0; item < values.length; item++) {
      if (values[item].totalScore) {
        totalPoints += values[item].totalScore;
      } else {
        continue;
      }
    }
    console.log("totalPoints_MMse_", totalPoints);
    console.log("directiveForce_MMse_123_", this.state.directiveForce);
    const obj = {
      directiveForce: this.state.directiveForce,
      ImmediatelyRecall: this.state.ImmediatelyRecall,
      calculAteattention: this.state.calculAteattention,
      named: this.state.named,
      retell: this.state.retell,
      read: this.state.read,
      understand: this.state.understand,
      write: this.state.write,
      viewSpace: this.state.viewSpace,
      delayRecall: this.state.delayRecall
    };
    const questionInfoTotal = Object.assign({}, obj);
    console.log("questionInfo_MMse_", questionInfoTotal);
    // 依据总分判断状态
    let status;
    if (totalPoints >= 27) {
      status = "正常";
    } else if (27 > totalPoints >= 21) {
      status = "轻度";
    } else if (21 > totalPoints >= 10) {
      status = "中度";
    } else {
      status = "重度";
    }
    // this.props.rootStore.setReportData(reportData)
    const MMSE = {
      assessmentAnswer: questionInfoTotal,
      result: status,
      score: totalPoints
    };
    return MMSE;
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
          const calculateResult = this.calculate();
          console.log("-----------------------------");
          console.log("calculateResult_", calculateResult);
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

  /**
   * @description 最后的保存计算
   */
  /**
   *
   * @returns 测量问题页面,或者返回主页
   */
  renderQuestionPage() {
    return (
      <View>
        {this.state.questionModelIndex === 0 && (
          <DirectiveForce
            questionModel={this.state.directiveForce}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 1 && (
          <ImmediatelyRecall
            questionModel={this.state.ImmediatelyRecall}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 2 && (
          <CalculAteattention
            questionModel={this.state.calculAteattention}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 3 && (
          <Named
            questionModel={this.state.named}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 4 && (
          <Retell
            questionModel={this.state.retell}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 5 && (
          <Read
            questionModel={this.state.read}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 6 && (
          <Understand
            questionModel={this.state.understand}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 7 && (
          <Write
            questionModel={this.state.write}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 8 && (
          <ViewSpace
            questionModel={this.state.viewSpace}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
        {this.state.questionModelIndex === 9 && (
          <DelayRecall
            questionModel={this.state.delayRecall}
            directionForward={this.state.directionForward}
            callBack={this.childrenInfo}
          />
        )}
      </View>
    );
  }
  // 必须绑定一个函数,设置不是首页，让取第一个测评问题模块页面
  startMeasurement = () => {
    this.setState({
      homePage: false,
      directionForward: false
    });
  };
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
              总体认知能力测评{"\n"}MMSE
            </Text>
            <Text
              style={{
                fontSize: font(36),
                color: "#c4e1fe",
                marginTop: dp(40)
              }}
            >
              本次测评大约需要7分钟
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
