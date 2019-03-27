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
import AnswerConfirm from "../../../PageComponent/AnswerConfirm/AnswerConfirm";

export default class ViewSpace extends Component {
  constructor(props) {
    super(props);
    let answerModel = {
      score: 0,
      answer: ""
    };
    this.state = {
      questionModel: "directiveForce",
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
      horologe: objectClone(answerModel)
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
    const questionTotal = Object.getOwnPropertyNames(this.state.questionInfo);
    // 表示是否全部问题, 是否全部结束了
    if (this.state.questionIndex === questionTotal.length - 1) {
      this.calculateScore();
      return;
    }
    this.setState({
      questionIndex: ++this.state.questionIndex
    });
  };
  calculateScore = () => {};
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
                indexTotal={19}
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
              <PageOrderCode
                index={this.state.questionIndex + 1}
                indexTotal={19}
              />
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
              <PageOrderCode
                index={this.state.questionIndex + 1}
                indexTotal={19}
              />
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
              <AnswerConfirm
                questionType={"horologe"}
                questionInfo={this.state.questionInfo}
                keyBoardChange={this.keyBoardChange}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: dp(50) }} />
            <FrontAndBack goNext={this.goNext} goPrev={this.goPrev} />
          </View>
        )}
      </React.Fragment>
    );
  }
}
