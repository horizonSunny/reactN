import React, { Component } from "react";
import {
  View,
  Text,
  ART,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";
import Canvas from "../../../../components/Canvas/Canvas";
import { Image } from "react-native/Libraries/Animated/src/Animated";
import KeyBoardNumber from "../../../../components/tools/KeyBoardNumber";
import androidToast from "../../../PageComponent/AndroidToast/AndroidToast";
import { objectClone } from "../../../../utils/objectClone";
import * as commonFunction from "../../../PageComponent/commonFunction/commonFunction";
import PageOrderCode from "../../../PageComponent/PageOrderCode/PageOrderCode";
import FrontAndBack from "../../../PageComponent/frontAndBack/frontAndBack";
import Audio from "../../../../components/Audio/Audio";
import styles from "../../../../../assets/css/common";
import { DrawNumberCircle } from "../../../../utils/drawNumberCircle";
import ligatureCoordinate from "./ViewSpaceComponent/ligatureCoordinate";
import Radio from "../../../../components/Radio/src/Radio";
import AnswerConfirm from "../../../PageComponent/AnswerConfirm/AnswerConfirm";

export default class ViewSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionModel: "viewSpace",
      questionIndex: this.props.directionForward ? 5 : 0,
      totalScore: 0
    };
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      ligature: objectClone(answerModel),
      cube: objectClone(answerModel),
      outline: objectClone(answerModel),
      number: objectClone(answerModel),
      pointer: objectClone(answerModel),
    };
    if (this.props.questionModel["questionInfo"] === "") {
      this.setState({ questionInfo: questionInfo });
    } else {
      this.setState({ questionInfo: this.props.questionModel["questionInfo"] });
    }
  }
  canvasLigature = React.createRef();
  canvasCube = React.createRef();
  canvasHorologe = React.createRef();
  // 调用keyboard回调的方法
  keyBoardChange = (key, value) => {
    // console.log('key_'+ key +'_answer_'+value);
    let questionInfo = this.state.questionInfo;
    questionInfo[key]["answer"] = value;
    this.setState({ questionInfo: questionInfo });
  };
  // 该模块上一个问题
  goPrev = () => {
    if (this.state.questionIndex === 0) {
      commonFunction.jumpWithParameter("forward", this.state, this.props);
      return;
    }
    this.setState({
      questionIndex: --this.state.questionIndex
    });
  };
  goNext = () => {
    const questionLength = 5;
    // 表示是否全部问题, 是否全部结束了
    const questionTotal = Object.getOwnPropertyNames(this.state.questionInfo);
    // 判断是否为空，为空则return,135,对应0，1，2
    const typeIndex = (this.state.questionIndex + 1) / 2 - 1;
    console.log("typeIndex_", typeIndex);
    const questionType = questionTotal[typeIndex];
    console.log("questionType_", questionType);
    if (this.state.questionInfo[questionType]["answer"] === "") {
      androidToast("请选择选项");
      return;
    }
    console.log("this.state.questionIndex_", this.state.questionIndex);
    if (this.state.questionIndex === questionLength) {
      this.calculateScore();
      return;
    }
    this.setState({
      questionIndex: ++this.state.questionIndex
    });
  };
  calculateScore = () => {
    let questionInfo = objectClone(this.state.questionInfo);
    questionInfo["ligature"]["score"] = parseInt(
      questionInfo["ligature"]["answer"]
    );
    questionInfo["cube"]["score"] = parseInt(questionInfo["cube"]["answer"]);
    questionInfo["outline"]["score"] = parseInt(
      questionInfo["outline"]["answer"]
    );
    questionInfo["number"]["score"] = parseInt(
      questionInfo["number"]["answer"]
    );
    questionInfo["pointer"]["score"] = parseInt(
      questionInfo["pointer"]["answer"]
    );
    console.log('weqeqeqeqwewqeqwewqeqeqewwqewqewqewq')
    console.log('questionInfo["ligature"]["answer"]_',questionInfo["ligature"]["answer"])
    console.log('this.state.horologeImg_',this.state.horologeImg)
    questionInfo["ligature"]["answer"] = this.state.ligatureImg
    questionInfo["cube"]["answer"] = this.state.cubeImg
    questionInfo["outline"]["answer"] = this.state.horologeImg
    console.log('weqeqeqeqwewqeqwewqeqeqewwqewqewqewq')
    let values = Object.values(questionInfo);
    let totalScore = 0;
    for (let index = 0; index < values.length; index++) {
      totalScore += Number(values[index].score);
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
  getBase64 = base64 => {
    switch (this.state.questionIndex) {
      case 0:
        this.setState({
          ligatureImg: base64,
          questionIndex: this.state.questionIndex + 1
        });
        break;
      case 2:
        this.setState({
          cubeImg: base64,
          questionIndex: this.state.questionIndex + 1
        });
        break;
      case 4:
        this.setState({
          horologeImg: base64,
          questionIndex: this.state.questionIndex + 1
        });
        break;
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.state.questionIndex === 0 && (
          <View style={{ marginTop: dp(30) }}>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: dp(50)
              }}
            >
              <PageOrderCode
                backgroundColor={"green"}
                index={this.state.questionIndex + 1}
                indexTotal={22}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: dp(1300),
                  alignItems: "center",
                  marginTop: dp(-570),
                  marginLeft: dp(300)
                }}
              >
                <Text style={[styles.questionText, { width: "80%" }]}>
                  1-1.请您按照
                  <Text style={{ color: "black", fontSize: font(40) }}>
                    (1甲2乙3丙4丁5戊的顺序连线)
                  </Text>
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
                  width: dp(200)
                }}
              >
                <Audio src="moca_1.m4a" />
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: dp(60),
                height: dp(700),
                zIndex: 999
              }}
            >
              <Canvas
                getBase64={this.getBase64}
                ref={this.canvasLigature}
                strokeWidth={1}
                canvasStyle={{
                  width: dp(1300),
                  height: dp(700)
                }}
              >
                {ligatureCoordinate.map((item, index) => {
                  return (
                    <DrawNumberCircle
                      key={index}
                      circle={item["circle"]}
                      text={item["text"]}
                    />
                  );
                })}
              </Canvas>
            </View>
            <View style={{ alignItems: "center", marginTop: dp(100) }} />
            <FrontAndBack
              goNext={() => {
                this.canvasLigature.current.buildImg();
              }}
              goPrev={this.goPrev}
            />
          </View>
        )}
        {this.state.questionIndex === 1 && (
          <View>
            <View style={{ alignItems: "center" }}>
              <View style={{ width: dp(1000), height: dp(500) }}>
                {this.state.ligatureImg && (
                  <Image
                    source={{ uri: this.state.ligatureImg }}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgb(240,240,240)",
                      resizeMode: "cover"
                    }}
                  />
                )}
              </View>
              <View style={{ alignItems: "center", marginTop: dp(50) }} />
              <AnswerConfirm
                questionType={"ligature"}
                questionInfo={this.state.questionInfo}
                keyBoardChange={this.keyBoardChange}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: dp(50) }} />
            <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
          </View>
        )}
        {this.state.questionIndex === 2 && (
          <View style={{ marginTop: dp(30) }}>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: dp(50),
                alignItems: "center"
              }}
            >
              <PageOrderCode index={2} indexTotal={22} />
              <View
                style={{
                  width: dp(1000),
                  marginTop: dp(-570),
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center"
                }}
              >
                <Text style={[styles.questionText, { width: "100%" }]}>
                  1-2.请画一个立方体
                  <Text style={{ color: "black", fontSize: font(40) }}>
                    (视空间与执行能力)
                  </Text>
                </Text>
              </View>
              <View style={{ justifyContent: "center" }} />
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: dp(60),
                height: dp(700)
              }}
            >
              <Canvas
                getBase64={this.getBase64}
                ref={this.canvasCube}
                strokeWidth={1}
                canvasStyle={{
                  width: dp(1300),
                  height: dp(700)
                }}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: dp(100) }} />
            <FrontAndBack
              goNext={() => {
                this.canvasCube.current.buildImg();
              }}
              goPrev={this.goPrev}
            />
          </View>
        )}
        {this.state.questionIndex === 3 && (
          <View>
            <View style={{ alignItems: "center" }}>
              <View style={{ width: dp(1000), height: dp(500) }}>
                {this.state.cubeImg && (
                  <Image
                    source={{ uri: this.state.cubeImg }}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgb(240,240,240)",
                      resizeMode: "cover"
                    }}
                  />
                )}
              </View>
              <View style={{ alignItems: "center", marginTop: dp(50) }} />
              <AnswerConfirm
                questionType={"cube"}
                questionInfo={this.state.questionInfo}
                keyBoardChange={this.keyBoardChange}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: dp(50) }} />
            <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
          </View>
        )}
        {this.state.questionIndex === 4 && (
          <View style={{ marginTop: dp(30) }}>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: dp(50),
                alignItems: "center"
              }}
            >
              <PageOrderCode index={3} indexTotal={22} />
              <View
                style={{
                  width: dp(1000),
                  marginTop: dp(-570),
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center"
                }}
              >
                <Text style={[styles.questionText, { width: "100%" }]}>
                  1-2.画钟表
                  <Text style={{ color: "black", fontSize: font(40) }}>
                    (11点15分)
                  </Text>
                </Text>
              </View>
              <View style={{ justifyContent: "center" }} />
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: dp(60),
                height: dp(700)
              }}
            >
              <Canvas
                getBase64={this.getBase64}
                ref={this.canvasHorologe}
                strokeWidth={1}
                canvasStyle={{
                  width: dp(1300),
                  height: dp(700)
                }}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: dp(100) }} />
            <FrontAndBack
              goNext={() => {
                this.canvasHorologe.current.buildImg();
              }}
              goPrev={this.goPrev}
            />
          </View>
        )}
        {this.state.questionIndex === 5 && (
          <View>
            <View style={{ alignItems: "center" }}>
              <View style={{ width: dp(1000), height: dp(500) }}>
                {this.state.horologeImg && (
                  <Image
                    source={{ uri: this.state.horologeImg }}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgb(240,240,240)",
                      resizeMode: "cover"
                    }}
                  />
                )}
              </View>
              <View style={{ alignItems: "center", marginTop: dp(50) }} />
              <View style={[styles.table, { marginBottom: dp(50) }]}>
          <View style={styles.tableColumn1}>
            <Image
              style={{ width: dp(250), height: dp(320) }}
              source={require("./img/doctor1.png")}
            />
          </View>
          <View>
            <View style={styles.tableRow}>
              <Text style={[styles.th, styles.tdb]}>词语名称 </Text>
              <Text style={[styles.th, styles.tdb]}>正确</Text>
              <Text style={[styles.th, styles.tdb]}>错误</Text>
            </View>
              <View style={styles.tableRow}>
                <Text style={[styles.td, styles.tdb]}>轮廓</Text>
                <Radio.RadioGroup
                  model={this.state.questionInfo["outline"]["answer"]}
                  onChange={this.keyBoardChange.bind(this, "outline")}
                >
                  <View style={styles.td}>
                    <Radio value={1} style={styles.radio} />
                  </View>
                  <View style={styles.td}>
                    <Radio value={0} style={styles.radio} />
                  </View>
                </Radio.RadioGroup>
               </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.td, styles.tdb]}>数字</Text>
                  <Radio.RadioGroup
                    model={this.state.questionInfo["number"]["answer"]}
                    onChange={this.keyBoardChange.bind(this, "number")}
                  >
                    <View style={styles.td}>
                      <Radio value={1} style={styles.radio} />
                    </View>
                    <View style={styles.td}>
                      <Radio value={0} style={styles.radio} />
                    </View>
                  </Radio.RadioGroup>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.td, styles.tdb]}>指针</Text>
                  <Radio.RadioGroup
                    model={this.state.questionInfo["pointer"]["answer"]}
                    onChange={this.keyBoardChange.bind(this, "pointer")}
                  >
                    <View style={styles.td}>
                      <Radio value={1} style={styles.radio} />
                    </View>
                    <View style={styles.td}>
                      <Radio value={0} style={styles.radio} />
                    </View>
                  </Radio.RadioGroup>
                </View>
              </View>
            </View>
        
            </View>
            <View style={{ alignItems: "center", marginTop: dp(50) }} />
            <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
          </View>
        )}
      </React.Fragment>
    );
  }
}
