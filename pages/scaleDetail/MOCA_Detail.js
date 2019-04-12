import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ToastAndroid,
  Modal,
  TouchableNativeFeedback,
  ScrollView,
  ImageBackground
} from "react-native";
import React, { PureComponent } from "react";
import data from "./testData";
import AnswerReverse from "./components/AnswerReverse";
import TableBorder from "./components/TableBorder";
import styles from "../../../assets/css/common";
import ButtomImg from "../../components/ButtonImg/ButtonImg";
import { StackActions } from "react-navigation";

export default class MOCA_Detail extends PureComponent {
  constructor(props) {
    super(props);
    let item = this.props.navigation.state.params.item;
    console.log("-----------------------");
    console.log("item", item);

    const propsInfo = JSON.parse(item.assessmentAnswer);

    const questionModel = {
      viewSpace: propsInfo.viewSpace,
      named: propsInfo.named,
      memory: propsInfo.memory,
      attention: propsInfo.attention,
      recordOne: propsInfo.recordOne,
      calculate: propsInfo.calculate,
      repeatRead: propsInfo.repeatRead,
      fluency: propsInfo.fluency,
      abstract: propsInfo.abstract,
      delayRemeber: propsInfo.delayRemeber,
      directiveForce: propsInfo.directiveForce
    };
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
    const scoreInfo = [
      { height: "dp(400)", top: "dp(317)", score: 3 },
      { height: "dp(400)", top: "dp(317)", score: 3 }
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
        <View style={{ alignItems: "center", backgroundColor: '#fff',height: dp(1300),paddingTop:dp(20) }}>
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
            <Text>MoCa量表评估报告</Text>
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
              <View
                style={{
                  width: dp(1300),
                  height: dp(1900),
                  borderTopWidth: dp(2),
                  borderColor: "#ddd"
                }}
              >
                <TableBorder
                  style={{
                    width: dp(1300),
                    height: dp(400),
                    borderTopWidth: dp(0)
                  }}
                >
                  <Text
                    style={{
                      width: dp(300),
                      backgroundColor: "#ddd",
                      fontWeight: "100",
                      paddingLeft: dp(20)
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#fff",
                        backgroundColor: "#000",
                        fontWeight: "100"
                      }}
                    >
                      视空间与执行能力:
                    </Text>
                  </Text>
                  <View
                    style={{
                      width: dp(395),
                      height: dp(248),
                      flexDirection: "row"
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        marginLeft: dp(20),
                        marginTop: dp(20),
                        resizeMode: "cover"
                      }}
                      source={require("./img/line.png")}
                    />
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        marginLeft: dp(20),
                        marginTop: dp(20),
                        resizeMode: "cover"
                      }}
                      source={require("./img/cube.png")}
                    />
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        marginLeft: dp(20),
                        marginTop: dp(20),
                        resizeMode: "cover"
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "row", marginTop: dp(30) }}>
                    <Text style={{ marginLeft: dp(130) }}>
                      连线
                      <AnswerReverse
                        score={
                          this.state.questionModel["viewSpace"]["questionInfo"][
                            "ligature"
                          ]["score"]
                        }
                      />
                    </Text>
                    <Text style={{ marginLeft: dp(300) }}>
                      立方体
                      <AnswerReverse
                        score={
                          this.state.questionModel["viewSpace"]["questionInfo"][
                            "cube"
                          ]["score"]
                        }
                      />
                    </Text>
                    <Text style={{ marginLeft: dp(150) }}>
                      轮廓
                      <AnswerReverse
                        score={
                          this.state.questionModel["viewSpace"]["questionInfo"][
                            "horologe"
                          ]["score"]
                        }
                      />
                    </Text>
                    <Text style={{ marginLeft: dp(20) }}>
                      数字
                      <AnswerReverse
                        score={
                          this.state.questionModel["viewSpace"]["questionInfo"][
                            "horologe"
                          ]["score"]
                        }
                      />
                    </Text>
                    <Text style={{ marginLeft: dp(20) }}>
                      指针
                      <AnswerReverse
                        score={
                          this.state.questionModel["viewSpace"]["questionInfo"][
                            "horologe"
                          ]["score"]
                        }
                      />
                    </Text>
                  </View>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(1300),
                    height: dp(400),
                    borderTopWidth: dp(0)
                  }}
                >
                  <Text
                    style={{
                      width: dp(150),
                      backgroundColor: "#ddd",
                      fontWeight: "100",
                      paddingLeft: dp(20)
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#fff",
                        backgroundColor: "#000",
                        fontWeight: "100"
                      }}
                    >
                      命名:
                    </Text>
                  </Text>
                  <View
                    style={{
                      width: dp(395),
                      height: dp(248),
                      flexDirection: "row"
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        marginLeft: dp(20),
                        marginTop: dp(20)
                      }}
                      source={require("./img/lion.png")}
                    />
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        marginLeft: dp(20),
                        marginTop: dp(20)
                      }}
                      source={require("./img/rhinoceros.png")}
                    />
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        marginLeft: dp(20),
                        marginTop: dp(20)
                      }}
                      source={require("./img/camel.png")}
                    />
                  </View>
                  <View style={{ flexDirection: "row", marginTop: dp(30) }}>
                    <Text style={{ marginLeft: dp(130) }}>
                      <AnswerReverse
                        score={
                          this.state.questionModel["named"]["questionInfo"][
                            "lion"
                          ]["score"]
                        }
                      />
                    </Text>
                    <Text style={{ marginLeft: dp(370) }}>
                      <AnswerReverse
                        score={
                          this.state.questionModel["named"]["questionInfo"][
                            "rhinoceros"
                          ]["score"]
                        }
                      />
                    </Text>
                    <Text style={{ marginLeft: dp(370) }}>
                      <AnswerReverse
                        score={
                          this.state.questionModel["named"]["questionInfo"][
                            "camel"
                          ]["score"]
                        }
                      />
                    </Text>
                  </View>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(1300),
                    height: dp(200),
                    borderTopWidth: dp(0)
                  }}
                >
                  <Text
                    style={{
                      width: dp(150),
                      backgroundColor: "#ddd",
                      fontWeight: "100",
                      paddingLeft: dp(20)
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#fff",
                        backgroundColor: "#000",
                        fontWeight: "100"
                      }}
                    >
                      记忆:
                    </Text>
                  </Text>
                  <Text
                    style={{
                      width: dp(250),
                      height: dp(140),
                      left: dp(150),
                      position: "absolute"
                    }}
                  >
                    读出下列词语，而后由患者重复上述过程2次，5分钟后回忆
                  </Text>
                  <View
                    style={[
                      {
                        position: "absolute",
                        left: dp(398)
                      }
                    ]}
                  >
                    <View
                      style={[
                        { flex: 1, flexDirection: "row" },
                        {
                          width: dp(500),
                          height: dp(66)
                        }
                      ]}
                    >
                      <Text style={[styles.tableDisplay, styles.tdb]}> </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        面孔
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        天鹅绒
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        教堂
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        菊花
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        红色
                      </Text>
                    </View>
                    <View
                      style={[
                        { flex: 1, flexDirection: "row" },
                        {
                          width: dp(500),
                          height: dp(66)
                        }
                      ]}
                    >
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        第一次{" "}
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        <AnswerReverse
                          score={
                            this.state.questionModel["memory"]["questionInfo"][
                              "face"
                            ]["score"]
                          }
                        />
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        <AnswerReverse
                          score={
                            this.state.questionModel["memory"]["questionInfo"][
                              "velvet"
                            ]["score"]
                          }
                        />
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        <AnswerReverse
                          score={
                            this.state.questionModel["memory"]["questionInfo"][
                              "church"
                            ]["score"]
                          }
                        />
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        <AnswerReverse
                          score={
                            this.state.questionModel["memory"]["questionInfo"][
                              "chrysanthemum"
                            ]["score"]
                          }
                        />
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        <AnswerReverse
                          score={
                            this.state.questionModel["memory"]["questionInfo"][
                              "red"
                            ]["score"]
                          }
                        />
                      </Text>
                    </View>
                    <View
                      style={[
                        { flex: 1, flexDirection: "row" },
                        {
                          width: dp(500),
                          height: dp(66)
                        }
                      ]}
                    >
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        第二次{" "}
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        <AnswerReverse
                          score={
                            this.state.questionModel["memory"]["questionInfo"][
                              "faceTwo"
                            ]["score"]
                          }
                        />
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        <AnswerReverse
                          score={
                            this.state.questionModel["memory"]["questionInfo"][
                              "velvetTwo"
                            ]["score"]
                          }
                        />
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        <AnswerReverse
                          score={
                            this.state.questionModel["memory"]["questionInfo"][
                              "churchTwo"
                            ]["score"]
                          }
                        />
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        <AnswerReverse
                          score={
                            this.state.questionModel["memory"]["questionInfo"][
                              "chrysanthemumTwo"
                            ]["score"]
                          }
                        />
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        <AnswerReverse
                          score={
                            this.state.questionModel["memory"]["questionInfo"][
                              "redTwo"
                            ]["score"]
                          }
                        />
                      </Text>
                    </View>
                  </View>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(1300),
                    height: dp(100),
                    borderTopWidth: dp(0)
                  }}
                >
                  <Text
                    style={{
                      width: dp(150),
                      backgroundColor: "#ddd",
                      fontWeight: "100",
                      paddingLeft: dp(20)
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#fff",
                        backgroundColor: "#000",
                        fontWeight: "100"
                      }}
                    >
                      注意:
                    </Text>
                  </Text>
                  <Text
                    style={{
                      width: dp(500),
                      height: dp(140),
                      left: dp(150),
                      position: "absolute"
                    }}
                  >
                    读出下列数字，请患者重复{"\n"}(每秒一个)
                  </Text>
                  <View
                    style={[
                      {
                        position: "absolute",
                        left: dp(700)
                      }
                    ]}
                  >
                    <Text>
                      顺背
                      <AnswerReverse
                        score={
                          this.state.questionModel["attention"]["questionInfo"][
                            "orderRead"
                          ]["score"]
                        }
                      />{" "}
                      2 1 8 5 4
                    </Text>
                    <Text>
                      倒背
                      <AnswerReverse
                        score={
                          this.state.questionModel["attention"]["questionInfo"][
                            "invertedOrder"
                          ]["score"]
                        }
                      />{" "}
                      7 4 2
                    </Text>
                  </View>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(1300),
                    height: dp(100),
                    borderTopWidth: dp(0)
                  }}
                >
                  <Text
                    style={{
                      paddingLeft: dp(20)
                    }}
                  >
                    读出下列数字,每当数字1出现时,患者必须用手敲打一下桌面，错误数大于等于2个不给分
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: dp(10) }}>
                    <Text style={{ marginLeft: dp(130) }}>
                      <AnswerReverse
                        score={
                          this.state.questionModel["recordOne"]["questionInfo"][
                            "haveOneNum"
                          ]["score"]
                        }
                      />
                      <Text>
                        {" "}
                        5 2 1 3 9 4 1 1 8 0 6 2 1 5 1 9 4 5 1 1 1 4 1 9 0 5 1 1
                        2
                      </Text>
                    </Text>
                  </View>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(1300),
                    height: dp(100),
                    borderTopWidth: dp(0)
                  }}
                >
                  <Text
                    style={{
                      paddingLeft: dp(20),
                      width: dp(1300)
                    }}
                  >
                    100连续减7
                    <Text style={{ marginLeft: dp(150) }}>
                      <AnswerReverse
                        score={
                          this.state.questionModel["calculate"]["questionInfo"][
                            "ninetyThree"
                          ]["score"]
                        }
                      />{" "}
                      93
                    </Text>
                    <Text style={{ marginLeft: dp(150) }}>
                      <AnswerReverse
                        score={
                          this.state.questionModel["calculate"]["questionInfo"][
                            "eightySix"
                          ]["score"]
                        }
                      />{" "}
                      86
                    </Text>
                    <Text style={{ marginLeft: dp(150) }}>
                      <AnswerReverse
                        score={
                          this.state.questionModel["calculate"]["questionInfo"][
                            "seventyNine"
                          ]["score"]
                        }
                      />{" "}
                      79
                    </Text>
                    <Text style={{ marginLeft: dp(150) }}>
                      <AnswerReverse
                        score={
                          this.state.questionModel["calculate"]["questionInfo"][
                            "seventyTwo"
                          ]["score"]
                        }
                      />{" "}
                      72
                    </Text>
                    <Text style={{ marginLeft: dp(150) }}>
                      <AnswerReverse
                        score={
                          this.state.questionModel["calculate"]["questionInfo"][
                            "sixtyFive"
                          ]["score"]
                        }
                      />{" "}
                      65
                    </Text>
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: dp(10) }}>
                    <Text style={{ marginLeft: dp(130) }}>
                      4～5个正确给3分，2～3个正确给2分，1个正确给1分，全部错误为0分
                    </Text>
                  </View>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(1300),
                    height: dp(150),
                    borderTopWidth: dp(0)
                  }}
                >
                  <Text
                    style={{
                      width: dp(150),
                      backgroundColor: "#ddd",
                      fontWeight: "100",
                      paddingLeft: dp(20)
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#fff",
                        backgroundColor: "#000",
                        fontWeight: "100"
                      }}
                    >
                      语言:
                    </Text>
                  </Text>
                  <View
                    style={[
                      {
                        position: "absolute",
                        left: dp(400)
                      }
                    ]}
                  >
                    <Text>
                      重复:我只知道今天张亮是过来帮过忙的人
                      <AnswerReverse
                        score={
                          this.state.questionModel["repeatRead"][
                            "questionInfo"
                          ]["oneRepeat"]["score"]
                        }
                      />
                    </Text>
                    <Text>
                      {"         "}狗在房间的时候，猫总是躺在沙发下面
                      <AnswerReverse
                        score={
                          this.state.questionModel["repeatRead"][
                            "questionInfo"
                          ]["twoRepeat"]["score"]
                        }
                      />
                    </Text>
                  </View>
                </TableBorder>

                <TableBorder
                  style={{
                    width: dp(1300),
                    height: dp(50),
                    borderTopWidth: dp(0)
                  }}
                >
                  <View style={{ flexDirection: "row", marginTop: dp(10) }}>
                    <Text
                      style={{
                        paddingLeft: dp(20)
                      }}
                    >
                      流畅性：在一分钟内尽可能多的说出动物的名字
                    </Text>
                    <AnswerReverse
                      score={
                        this.state.questionModel["fluency"]["questionInfo"][
                          "fluency"
                        ]["score"]
                      }
                    />
                  </View>
                </TableBorder>

                <TableBorder
                  style={{
                    width: dp(1300),
                    height: dp(50),
                    borderTopWidth: dp(0)
                  }}
                >
                  <Text
                    style={{
                      width: dp(150),
                      backgroundColor: "#ddd",
                      fontWeight: "100",
                      paddingLeft: dp(20)
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#fff",
                        backgroundColor: "#000",
                        fontWeight: "100"
                      }}
                    >
                      抽象:
                    </Text>
                  </Text>
                  <Text
                    style={{
                      width: dp(1200),
                      height: dp(140),
                      left: dp(150),
                      position: "absolute"
                    }}
                  >
                    词语相似性:如香蕉-橘子=水果
                    <AnswerReverse
                      score={
                        this.state.questionModel["abstract"]["questionInfo"][
                          "transportation"
                        ]["score"]
                      }
                    />
                    火车-自行车
                    <AnswerReverse
                      score={
                        this.state.questionModel["abstract"]["questionInfo"][
                          "measure"
                        ]["score"]
                      }
                    />
                    手表-尺子
                  </Text>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(1300),
                    height: dp(200),
                    borderTopWidth: dp(0)
                  }}
                >
                  <Text
                    style={{
                      width: dp(150),
                      backgroundColor: "#ddd",
                      fontWeight: "100",
                      paddingLeft: dp(20)
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#fff",
                        backgroundColor: "#000",
                        fontWeight: "100"
                      }}
                    >
                      延迟回忆:
                    </Text>
                  </Text>
                  <View
                    style={[
                      {
                        position: "absolute",
                        left: dp(300)
                      }
                    ]}
                  >
                    <View
                      style={[
                        { flex: 1, flexDirection: "row" },
                        {
                          width: dp(500),
                          height: dp(66)
                        }
                      ]}
                    >
                      <Text
                        style={[
                          styles.tableDisplay,
                          styles.tdb,
                          { width: dp(248) }
                        ]}
                      >
                        回忆时不能提示
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        {"   "}面孔{"\n"}
                        <AnswerReverse
                          score={
                            this.state.questionModel["delayRemeber"][
                              "questionInfo"
                            ]["face"]["score"]
                          }
                        />
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        {"  "}
                        天鹅绒{"\n"}
                        <AnswerReverse
                          score={
                            this.state.questionModel["delayRemeber"][
                              "questionInfo"
                            ]["velvet"]["score"]
                          }
                        />
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        {"   "}教堂{"\n"}
                        <AnswerReverse
                          score={
                            this.state.questionModel["delayRemeber"][
                              "questionInfo"
                            ]["church"]["score"]
                          }
                        />
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        {"   "}菊花{"\n"}
                        <AnswerReverse
                          score={
                            this.state.questionModel["delayRemeber"][
                              "questionInfo"
                            ]["chrysanthemum"]["score"]
                          }
                        />
                      </Text>
                      <Text style={[styles.tableDisplay, styles.tdb]}>
                        {"   "}红色{"\n"}
                        <AnswerReverse
                          score={
                            this.state.questionModel["delayRemeber"][
                              "questionInfo"
                            ]["red"]["score"]
                          }
                        />
                      </Text>
                    </View>
                    <View
                      style={[
                        { flex: 1, flexDirection: "row" },
                        {
                          width: dp(500),
                          height: dp(66)
                        }
                      ]}
                    >
                      <Text
                        style={[
                          styles.tableDisplay,
                          styles.tdb,
                          { width: dp(248) }
                        ]}
                      >
                        分类提示
                      </Text>
                      {[0, 1, 2, 3, 4].map((item, index) => {
                        return (
                          <Text
                            key={index}
                            style={[styles.tableDisplay, styles.tdb]}
                          />
                        );
                      })}
                    </View>
                    <View
                      style={[
                        { flex: 1, flexDirection: "row" },
                        {
                          width: dp(500),
                          height: dp(66)
                        }
                      ]}
                    >
                      <Text
                        style={[
                          styles.tableDisplay,
                          styles.tdb,
                          { width: dp(248) }
                        ]}
                      >
                        多选提示
                      </Text>
                      {[0, 1, 2, 3, 4].map((item, index) => {
                        return (
                          <Text
                            key={index}
                            style={[styles.tableDisplay, styles.tdb]}
                          />
                        );
                      })}
                    </View>
                  </View>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(1300),
                    height: dp(50),
                    borderTopWidth: dp(0)
                  }}
                >
                  <Text
                    style={{
                      width: dp(150),
                      backgroundColor: "#ddd",
                      fontWeight: "100",
                      paddingLeft: dp(20)
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#fff",
                        backgroundColor: "#000",
                        fontWeight: "100"
                      }}
                    >
                      定向:
                    </Text>
                  </Text>
                  <Text
                    style={{
                      width: dp(1200),
                      height: dp(140),
                      left: dp(150),
                      position: "absolute"
                    }}
                  >
                    <AnswerReverse
                      score={
                        this.state.questionModel["directiveForce"][
                          "questionInfo"
                        ]["year"]["score"]
                      }
                    />
                    日期
                    <AnswerReverse
                      score={
                        this.state.questionModel["directiveForce"][
                          "questionInfo"
                        ]["month"]["score"]
                      }
                    />
                    月份
                    <AnswerReverse
                      score={
                        this.state.questionModel["directiveForce"][
                          "questionInfo"
                        ]["day"]["score"]
                      }
                    />
                    年代
                    <AnswerReverse
                      score={
                        this.state.questionModel["directiveForce"][
                          "questionInfo"
                        ]["weekDay"]["score"]
                      }
                    />
                    星期几
                    <AnswerReverse
                      score={
                        this.state.questionModel["directiveForce"][
                          "questionInfo"
                        ]["company"]["score"]
                      }
                    />
                    地点
                    <AnswerReverse
                      score={
                        this.state.questionModel["directiveForce"][
                          "questionInfo"
                        ]["city"]["score"]
                      }
                    />
                    城市
                  </Text>
                </TableBorder>
              </View>
              {/*  右边分数 */}
              <View
                style={{
                  width: dp(300),
                  position: "absolute",
                  left: dp(1300),
                  borderTopWidth: dp(2),
                  borderColor: "#ddd"
                }}
              >
                <TableBorder
                  style={{
                    width: dp(100),
                    height: dp(400),
                    borderWidth: dp(0),
                    borderBottomWidth: dp(2),
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#fff",
                      backgroundColor: "#000",
                      width: dp(100),
                      fontWeight: "100",
                      textAlign: "center"
                    }}
                  >
                    得分
                  </Text>
                  <Text
                    style={{
                      width: dp(100),
                      height: dp(50),
                      position: "relative",
                      top: dp(280),
                      textAlign: "center"
                    }}
                  >
                    {this.state.questionModel["viewSpace"]["totalScore"]}/5
                  </Text>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(100),
                    height: dp(400),
                    borderWidth: dp(0),
                    borderBottomWidth: dp(2),
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      width: dp(100),
                      height: dp(50),
                      position: "relative",
                      top: dp(317),
                      textAlign: "center"
                    }}
                  >
                    {this.state.questionModel["named"]["totalScore"]}/3
                  </Text>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(100),
                    height: dp(200),
                    borderWidth: dp(0),
                    borderBottomWidth: dp(2),
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      width: dp(100),
                      height: dp(50),
                      position: "relative",
                      top: dp(130),
                      textAlign: "center"
                    }}
                  >
                    不计分
                  </Text>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(100),
                    height: dp(100),
                    borderWidth: dp(0),
                    borderBottomWidth: dp(2),
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      width: dp(100),
                      height: dp(50),
                      position: "relative",
                      top: dp(50),
                      textAlign: "center"
                    }}
                  >
                    {this.state.questionModel["attention"]["totalScore"]}/2
                  </Text>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(100),
                    height: dp(100),
                    borderWidth: dp(0),
                    borderBottomWidth: dp(2),
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      width: dp(100),
                      height: dp(50),
                      position: "relative",
                      top: dp(50),
                      textAlign: "center"
                    }}
                  >
                    {this.state.questionModel["recordOne"]["totalScore"]}/1
                  </Text>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(100),
                    height: dp(100),
                    borderWidth: dp(0),
                    borderBottomWidth: dp(2),
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      width: dp(100),
                      height: dp(50),
                      position: "relative",
                      top: dp(50),
                      textAlign: "center"
                    }}
                  >
                    {this.state.questionModel["calculate"]["totalScore"]}/3
                  </Text>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(100),
                    height: dp(150),
                    borderWidth: dp(0),
                    borderBottomWidth: dp(2),
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      width: dp(100),
                      height: dp(100),
                      position: "relative",
                      top: dp(80),
                      textAlign: "center"
                    }}
                  >
                    {this.state.questionModel["repeatRead"]["totalScore"]}/2
                  </Text>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(100),
                    height: dp(50),
                    borderWidth: dp(0),
                    borderBottomWidth: dp(2),
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      width: dp(100),
                      height: dp(50),
                      position: "relative",
                      top: dp(10),
                      textAlign: "center"
                    }}
                  >
                    {this.state.questionModel["fluency"]["totalScore"]}/1
                  </Text>
                </TableBorder>

                <TableBorder
                  style={{
                    width: dp(100),
                    height: dp(50),
                    borderWidth: dp(0),
                    borderBottomWidth: dp(2),
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      width: dp(100),
                      height: dp(100),
                      position: "relative",
                      top: dp(10),
                      textAlign: "center"
                    }}
                  >
                    {this.state.questionModel["abstract"]["totalScore"]}/2
                  </Text>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(100),
                    height: dp(200),
                    borderWidth: dp(0),
                    borderBottomWidth: dp(2),
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      width: dp(100),
                      height: dp(100),
                      position: "relative",
                      top: dp(140),
                      textAlign: "center"
                    }}
                  >
                    {this.state.questionModel["delayRemeber"]["totalScore"]}/5
                  </Text>
                </TableBorder>
                <TableBorder
                  style={{
                    width: dp(100),
                    height: dp(50),
                    borderWidth: dp(0),
                    borderBottomWidth: dp(2),
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      width: dp(100),
                      height: dp(100),
                      position: "relative",
                      top: dp(10),
                      textAlign: "center"
                    }}
                  >
                    {this.state.questionModel["directiveForce"]["totalScore"]}/6
                  </Text>
                </TableBorder>
              </View>
              {/*总分数*/}
              <View
                style={{
                  width: dp(500),
                  position: "absolute",
                  left: dp(1100),
                  borderTopWidth: dp(2),
                  borderColor: "#ddd"
                }}
              >
                <TableBorder
                  style={{
                    width: dp(300),
                    height: dp(100),
                    borderTopWidth: dp(0),
                    alignItems: "center",
                    top: dp(1800)
                  }}
                >
                  <Text
                    style={{
                      position: "relative",
                      top: dp(30)
                    }}
                  >
                    总分
                    <Text>
                      {"    "} {this.state.score}/30
                    </Text>
                  </Text>
                </TableBorder>
              </View>
            </ScrollView>
          </View>
        </View>
      </React.Fragment>
    );
  }
}
