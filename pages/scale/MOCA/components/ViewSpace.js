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
      questionIndex: this.props.directionForward ? 2 : 0,
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
      horologeImg: objectClone(answerModel),
      ligatureImg: objectClone(answerModel),
      cubeImg: objectClone(answerModel),
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
    const questionLength = 2;
    // 表示是否全部问题, 是否全部结束了
    const questionTotal = Object.getOwnPropertyNames(this.state.questionInfo);
    const typeIndex = this.state.questionIndex;
    console.log("typeIndex_", typeIndex);
    console.log('this.state.questionInfo_',this.state.questionInfo);
    const questionType = questionTotal[typeIndex];
    console.log("questionType_", this.state);
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
    questionInfo["ligatureImg"]["answer"] = this.state.ligatureImg
    questionInfo["cubeImg"]["answer"] = this.state.cubeImg
    questionInfo["horologeImg"]["answer"] = this.state.horologeImg
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
    const index = this.state.questionIndex;
    console.log('index_',index);
    switch (this.state.questionIndex) {
      case 0:
        this.setState({
          ligatureImg: base64
        },()=>{
          this.goNext();
        });
        break;
      case 1:
        this.setState({
          cubeImg: base64
        },()=>{
          this.goNext();
        });
        break;
      case 2:
        this.setState({
          horologeImg: base64
        },()=>{
          this.goNext();
        });
        break;
    }
  };

  render() {
    const answerConfirmCss =  {
      styleOut:  {
              flexDirection: "row",
              height: dp(150),
              alignItems: "center"
            },
      styleImg:{ width: dp(102), height: dp(150) },
      styleAnswer:[styles.th, { width: dp(250) }, styles.tdb,{fontSize:dp(20)}],
      styleRadio:[styles.td, { width: dp(250) }],
      styleRadioSize: {width: dp(30), height: dp(30)}
    }
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
      <React.Fragment>
        {this.state.questionIndex === 0 && (
          <View style={{ marginTop: dp(10) }}>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: dp(0)
              }}
            >
              <PageOrderCode
                index={1}
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
                  交替连线测验
                </Text>
                <Text style={{ color: "black", fontSize: font(30) }}>
                    请您在这画一条连线，按照从数字到汉字并逐渐升高到顺序。您从这里开始[指向数字(1)],从1连向甲，再连向2，并一直连下去，到这里结束[指向汉字(戊)]
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
                <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_1.m4a" />
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: dp(10),
                height: dp(600),
                zIndex: 999
              }}
            >
              <Canvas
                getBase64={this.getBase64}
                ref={this.canvasLigature}
                strokeWidth={1}
                canvasStyle={{
                  width: dp(1200),
                  height: dp(600)
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
            <View style={{ alignItems: "center", marginTop: dp(20) }} >
                <AnswerConfirm
                    questionType={"ligature"}
                    questionInfo={this.state.questionInfo}
                    keyBoardChange={this.keyBoardChange}
                    answerConfirmStyle = {answerConfirmCss}
                  />
            </View>
            <View style={{marginTop: dp(30) }} />
            <FrontAndBack
              frontAndBackStyle={{paddingRight:dp(50)}}
              goNext={() => {
                this.canvasLigature.current.buildImg();
              }}
              goPrev={this.goPrev}
            />
          </View>
        )}
        {this.state.questionIndex === 1 && (
          <View style={{ marginTop: dp(10) }}>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: dp(0)
              }}
            >
              <PageOrderCode
                index={2}
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
                  视结构功能检测(立方体)
                </Text>
                <Text style={{ color: "black", fontSize: font(30) }}>
                    请您照着这幅图在下面的空白处原样画一遍，并尽可能准确
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
                <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_2.m4a" />
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: dp(20),
                height: dp(600)
              }}
            >
            <Image
                style={{
                  width: dp(400),
                  height: dp(400),
                  marginTop: dp(10),
                  marginRight: dp(20),
                  resizeMode: "cover"
                }}
                source={require("./img/cube.png")}
              />
              <Canvas
                getBase64={this.getBase64}
                ref={this.canvasCube}
                strokeWidth={1}
                canvasStyle={{
                  width: dp(700),
                  height: dp(600)
                }}
              />
            </View>     
            <View style={{ alignItems: "center", marginTop: dp(20) }} >
                  <AnswerConfirm
                      questionType={"cube"}
                      questionInfo={this.state.questionInfo}
                      keyBoardChange={this.keyBoardChange}
                      answerConfirmStyle = {answerConfirmCss}
                    />
            </View>
            <View style={{marginTop: dp(20) }} />
            <FrontAndBack
              frontAndBackStyle={{paddingRight:dp(50)}}
              goNext={() => {
                this.canvasCube.current.buildImg();
              }}
              goPrev={this.goPrev}
            />
          </View>
        )}
        {this.state.questionIndex === 2 && (
          <View style={{ marginTop: dp(10) }}>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: dp(0)
              }}
            >
              <PageOrderCode
                index={3}
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
                  执行功能检测(画钟试验)
                </Text>
                <Text style={{ color: "black", fontSize: font(30) }}>
                    请您在这画一个圆形的表，像一般钟表一样填齐所有数字，并用指针画出11点10分
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
                <Audio audioStyle={{width: dp(150), height: dp(150) }} src="moca_3.m4a" />
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: dp(10),
                height: dp(600)
              }}
            >
              <Canvas
                getBase64={this.getBase64}
                ref={this.canvasHorologe}
                strokeWidth={1}
                canvasStyle={{
                  width: dp(1200),
                  height: dp(600)
                }}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: dp(20) }} >
            <View style={[styles.table, { marginBottom: dp(20) },{height: dp(200),marginLeft:dp(0)}]}>
                          <View style={styles.tableColumn1}>
                            <Image
                              style={{ width: dp(150), height: dp(200) }}
                              source={require("./img/doctor1.png")}
                            />
                          </View>
                          <View>
                                <View style={styles.tableRow}>
                                  <Text style={[styles.th, styles.tdb,{fontSize: font(24),width: dp(240)}]}>词语名称 </Text>
                                  <Text style={[styles.th, styles.tdb,{fontSize: font(24),width: dp(240)}]}>正确</Text>
                                  <Text style={[styles.th, styles.tdb,{fontSize: font(24),width: dp(240)}]}>错误</Text>
                                </View>
                                <View style={styles.tableRow}>
                                <Text style={[styles.td, styles.tdb,{fontSize: font(24),width: dp(240)}]}>轮廓</Text>
                                  <Radio.RadioGroup
                                    model={this.state.questionInfo["outline"]["answer"]}
                                    onChange={this.keyBoardChange.bind(this, "outline")}
                                  >
                                    <View style={[styles.td, {fontSize: font(24),width: dp(240)}]}>
                                      <Radio value={1} style={{width: dp(30), height: dp(30)}} />
                                    </View>
                                    <View style={[styles.td, {fontSize: font(24),width: dp(240)}]}>
                                      <Radio value={0} style={{width: dp(30), height: dp(30)}} />
                                    </View>
                                  </Radio.RadioGroup>
                                </View>
                                <View style={styles.tableRow}>
                                  <Text style={[styles.td, styles.tdb,{fontSize: font(24),width: dp(240)}]}>数字</Text>
                                  <Radio.RadioGroup
                                    model={this.state.questionInfo["number"]["answer"]}
                                    onChange={this.keyBoardChange.bind(this, "number")}
                                  >
                                    <View style={[styles.td, {fontSize: font(24),width: dp(240)}]}>
                                      <Radio value={1} style={{width: dp(30), height: dp(30)}} />
                                    </View>
                                    <View style={[styles.td, {fontSize: font(24),width: dp(240)}]}>
                                      <Radio value={0} style={{width: dp(30), height: dp(30)}} />
                                    </View>
                                  </Radio.RadioGroup>
                                </View>
                                <View style={styles.tableRow}>
                                  <Text style={[styles.td, styles.tdb,{fontSize: font(24),width: dp(240)}]}>指针</Text>
                                  <Radio.RadioGroup
                                    model={this.state.questionInfo["pointer"]["answer"]}
                                    onChange={this.keyBoardChange.bind(this, "pointer")}
                                  >
                                    <View style={[styles.td, {fontSize: font(24),width: dp(240)}]}>
                                      <Radio value={1} style={{width: dp(30), height: dp(30)}} />
                                    </View>
                                    <View style={[styles.td, {fontSize: font(24),width: dp(240)}]}>
                                      <Radio value={0} style={{width: dp(30), height: dp(30)}} />
                                    </View>
                                  </Radio.RadioGroup>
                                </View>
                              </View>
                            </View>
            </View>
            <FrontAndBack
              frontAndBackStyle={{paddingRight:dp(50)}}
              goNext={() => {
                this.canvasHorologe.current.buildImg();
              }}
              goPrev={this.goPrev}
            />
          </View>
        )}
      </React.Fragment>
    );
  }
}
