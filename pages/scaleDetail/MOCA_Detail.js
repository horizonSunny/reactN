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
import styles from "../../../assets/css/common";

export default class MOCA_Detail extends PureComponent {
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
    const scoreInfo = [
      { height: "dp(400)", top: "dp(317)", score: 3 },
      { height: "dp(400)", top: "dp(317)", score: 3 }
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
          <View
            style={{
              width: dp(1300),
              height: dp(1900)
            }}>
            <TableBorder
              style={{
                width: dp(1300),
                height: dp(400),
                borderTopWidth: dp(0)
              }}>
              <Text
                style={{
                  width: dp(300),
                  backgroundColor: "#ddd",
                  fontWeight: "100",
                  paddingLeft: dp(20)
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    backgroundColor: "#000",
                    fontWeight: "100"
                  }}>
                  视空间与执行能力:
                </Text>
              </Text>
              <View
                style={{
                  width: dp(395),
                  height: dp(248),
                  flexDirection: "row"
                }}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    marginLeft: dp(20),
                    marginTop: dp(20)
                  }}
                  source={require("./img/17-img.png")}
                />
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    marginLeft: dp(20),
                    marginTop: dp(20)
                  }}
                  source={require("./img/17-img.png")}
                />
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    marginLeft: dp(20),
                    marginTop: dp(20)
                  }}
                  source={require("./img/17-img.png")}
                />
              </View>
              <View style={{ flexDirection: "row", marginTop: dp(30) }}>
                <Text style={{ marginLeft: dp(130) }}>
                  连线
                  <AnswerReverse score={0} />
                </Text>
                <Text style={{ marginLeft: dp(300) }}>
                  立方体
                  <AnswerReverse score={1} />
                </Text>
                <Text style={{ marginLeft: dp(150) }}>
                  轮廓
                  <AnswerReverse score={0} />
                </Text>
                <Text style={{ marginLeft: dp(20) }}>
                  数字
                  <AnswerReverse score={0} />
                </Text>
                <Text style={{ marginLeft: dp(20) }}>
                  指针
                  <AnswerReverse score={0} />
                </Text>
              </View>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(1300),
                height: dp(400),
                borderTopWidth: dp(0)
              }}>
              <Text
                style={{
                  width: dp(150),
                  backgroundColor: "#ddd",
                  fontWeight: "100",
                  paddingLeft: dp(20)
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    backgroundColor: "#000",
                    fontWeight: "100"
                  }}>
                  命名:
                </Text>
              </Text>
              <View
                style={{
                  width: dp(395),
                  height: dp(248),
                  flexDirection: "row"
                }}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    marginLeft: dp(20),
                    marginTop: dp(20)
                  }}
                  source={require("./img/17-img.png")}
                />
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    marginLeft: dp(20),
                    marginTop: dp(20)
                  }}
                  source={require("./img/17-img.png")}
                />
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    marginLeft: dp(20),
                    marginTop: dp(20)
                  }}
                  source={require("./img/17-img.png")}
                />
              </View>
              <View style={{ flexDirection: "row", marginTop: dp(30) }}>
                <Text style={{ marginLeft: dp(130) }}>
                  <AnswerReverse score={0} />
                </Text>
                <Text style={{ marginLeft: dp(370) }}>
                  <AnswerReverse score={1} />
                </Text>
                <Text style={{ marginLeft: dp(370) }}>
                  <AnswerReverse score={0} />
                </Text>
              </View>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(1300),
                height: dp(200),
                borderTopWidth: dp(0)
              }}>
              <Text
                style={{
                  width: dp(150),
                  backgroundColor: "#ddd",
                  fontWeight: "100",
                  paddingLeft: dp(20)
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    backgroundColor: "#000",
                    fontWeight: "100"
                  }}>
                  记忆:
                </Text>
              </Text>
              <Text
                style={{
                  width: dp(250),
                  height: dp(140),
                  left: dp(150),
                  position: "absolute"
                }}>
                读出下列词语，而后由患者重复上述过程2次，5分钟后回忆
              </Text>
              <View
                style={[
                  {
                    position: "absolute",
                    left: dp(398)
                  }
                ]}>
                <View
                  style={[
                    { flex: 1, flexDirection: "row" },
                    {
                      width: dp(500),
                      height: dp(66)
                    }
                  ]}>
                  <Text style={[styles.tableDisplay, styles.tdb]}> </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>面孔</Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>天鹅绒</Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>教堂</Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>菊花</Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>红色</Text>
                </View>
                <View
                  style={[
                    { flex: 1, flexDirection: "row" },
                    {
                      width: dp(500),
                      height: dp(66)
                    }
                  ]}>
                  <Text style={[styles.tableDisplay, styles.tdb]}>第一次 </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    <AnswerReverse score={0} />
                  </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    <AnswerReverse score={0} />
                  </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    <AnswerReverse score={0} />
                  </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    <AnswerReverse score={0} />
                  </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    <AnswerReverse score={0} />
                  </Text>
                </View>
                <View
                  style={[
                    { flex: 1, flexDirection: "row" },
                    {
                      width: dp(500),
                      height: dp(66)
                    }
                  ]}>
                  <Text style={[styles.tableDisplay, styles.tdb]}>第二次 </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    <AnswerReverse score={0} />
                  </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    <AnswerReverse score={0} />
                  </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    <AnswerReverse score={0} />
                  </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    <AnswerReverse score={0} />
                  </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    <AnswerReverse score={0} />
                  </Text>
                </View>
              </View>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(1300),
                height: dp(100),
                borderTopWidth: dp(0)
              }}>
              <Text
                style={{
                  width: dp(150),
                  backgroundColor: "#ddd",
                  fontWeight: "100",
                  paddingLeft: dp(20)
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    backgroundColor: "#000",
                    fontWeight: "100"
                  }}>
                  注意:
                </Text>
              </Text>
              <Text
                style={{
                  width: dp(500),
                  height: dp(140),
                  left: dp(150),
                  position: "absolute"
                }}>
                读出下列数字，请患者重复{"\n"}(每秒一个)
              </Text>
              <View
                style={[
                  {
                    position: "absolute",
                    left: dp(700)
                  }
                ]}>
                <Text>
                  顺背
                  <AnswerReverse score={0} /> 2 1 8 5 4
                </Text>
                <Text>
                  倒背
                  <AnswerReverse score={0} /> 7 4 2
                </Text>
              </View>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(1300),
                height: dp(100),
                borderTopWidth: dp(0)
              }}>
              <Text
                style={{
                  paddingLeft: dp(20)
                }}>
                读出下列数字,每当数字1出现时,患者必须用手敲打一下桌面，错误数大雨等于2个不给分
              </Text>
              <View style={{ flexDirection: "row", marginTop: dp(10) }}>
                <Text style={{ marginLeft: dp(130) }}>
                  <AnswerReverse score={0} />
                  <Text>
                    {" "}
                    5 2 1 3 9 4 1 1 8 0 6 2 1 5 1 9 4 5 1 1 1 4 1 9 0 5 1 1 2
                  </Text>
                </Text>
              </View>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(1300),
                height: dp(100),
                borderTopWidth: dp(0)
              }}>
              <Text
                style={{
                  paddingLeft: dp(20),
                  width: dp(1300)
                }}>
                100连续减7
                <Text style={{ marginLeft: dp(150) }}>
                  <AnswerReverse score={0} /> 93
                </Text>
                <Text style={{ marginLeft: dp(150) }}>
                  <AnswerReverse score={0} /> 86
                </Text>
                <Text style={{ marginLeft: dp(150) }}>
                  <AnswerReverse score={0} /> 79
                </Text>
                <Text style={{ marginLeft: dp(150) }}>
                  <AnswerReverse score={0} /> 72
                </Text>
                <Text style={{ marginLeft: dp(150) }}>
                  <AnswerReverse score={0} /> 65
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
              }}>
              <Text
                style={{
                  width: dp(150),
                  backgroundColor: "#ddd",
                  fontWeight: "100",
                  paddingLeft: dp(20)
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    backgroundColor: "#000",
                    fontWeight: "100"
                  }}>
                  语言:
                </Text>
              </Text>
              <Text
                style={{
                  width: dp(250),
                  height: dp(140),
                  left: dp(150),
                  position: "absolute"
                }}>
                读出下列数字，请患者重复{"\n"}(每秒一个)
              </Text>
              <View
                style={[
                  {
                    position: "absolute",
                    left: dp(400)
                  }
                ]}>
                <Text>
                  重复:我只知道今天是张亮过来帮过忙的人
                  <AnswerReverse score={0} />
                </Text>
                <Text>
                  {"         "}狗在房间的时候，猫总是躺在沙发下面
                  <AnswerReverse score={0} />
                </Text>
              </View>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(1300),
                height: dp(50),
                borderTopWidth: dp(0)
              }}>
              <Text
                style={{
                  width: dp(150),
                  backgroundColor: "#ddd",
                  fontWeight: "100",
                  paddingLeft: dp(20)
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    backgroundColor: "#000",
                    fontWeight: "100"
                  }}>
                  抽象:
                </Text>
              </Text>
              <Text
                style={{
                  width: dp(1200),
                  height: dp(140),
                  left: dp(150),
                  position: "absolute"
                }}>
                词语相似性:如香蕉-橘子=水果
                <AnswerReverse score={0} />
                火车-自行车
                <AnswerReverse score={0} />
                手表-尺子
              </Text>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(1300),
                height: dp(200),
                borderTopWidth: dp(0)
              }}>
              <Text
                style={{
                  width: dp(150),
                  backgroundColor: "#ddd",
                  fontWeight: "100",
                  paddingLeft: dp(20)
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    backgroundColor: "#000",
                    fontWeight: "100"
                  }}>
                  延时回忆:
                </Text>
              </Text>
              <View
                style={[
                  {
                    position: "absolute",
                    left: dp(300)
                  }
                ]}>
                <View
                  style={[
                    { flex: 1, flexDirection: "row" },
                    {
                      width: dp(500),
                      height: dp(66)
                    }
                  ]}>
                  <Text
                    style={[
                      styles.tableDisplay,
                      styles.tdb,
                      { width: dp(248) }
                    ]}>
                    回忆时不能提示
                  </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    {"   "}面孔{"\n"}
                    <AnswerReverse score={0} />
                  </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    {"  "}
                    天鹅绒{"\n"}
                    <AnswerReverse score={0} />
                  </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    {"   "}教堂{"\n"}
                    <AnswerReverse score={0} />
                  </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    {"   "}菊花{"\n"}
                    <AnswerReverse score={0} />
                  </Text>
                  <Text style={[styles.tableDisplay, styles.tdb]}>
                    {"   "}红色{"\n"}
                    <AnswerReverse score={0} />
                  </Text>
                </View>
                <View
                  style={[
                    { flex: 1, flexDirection: "row" },
                    {
                      width: dp(500),
                      height: dp(66)
                    }
                  ]}>
                  <Text
                    style={[
                      styles.tableDisplay,
                      styles.tdb,
                      { width: dp(248) }
                    ]}>
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
                  ]}>
                  <Text
                    style={[
                      styles.tableDisplay,
                      styles.tdb,
                      { width: dp(248) }
                    ]}>
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
              }}>
              <Text
                style={{
                  width: dp(150),
                  backgroundColor: "#ddd",
                  fontWeight: "100",
                  paddingLeft: dp(20)
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    backgroundColor: "#000",
                    fontWeight: "100"
                  }}>
                  定向:
                </Text>
              </Text>
              <Text
                style={{
                  width: dp(1200),
                  height: dp(140),
                  left: dp(150),
                  position: "absolute"
                }}>
                <AnswerReverse score={0} />
                日期
                <AnswerReverse score={0} />
                月份
                <AnswerReverse score={0} />
                年代
                <AnswerReverse score={0} />
                星期几
                <AnswerReverse score={0} />
                地点
                <AnswerReverse score={0} />
                城市
              </Text>
            </TableBorder>
          </View>
          {/* 右边分数 */}
          <View
            style={{
              width: dp(300),
              position: "absolute",
              left: dp(1300)
            }}>
            <TableBorder
              style={{
                width: dp(100),
                height: dp(400),
                borderWidth: dp(0),
                borderBottomWidth: dp(2),
                alignItems: "center"
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#fff",
                  backgroundColor: "#000",
                  width: dp(100),
                  fontWeight: "100",
                  textAlign: "center"
                }}>
                得分
              </Text>
              <Text
                style={{
                  width: dp(100),
                  height: dp(50),
                  position: "relative",
                  top: dp(280),
                  textAlign: "center"
                }}>
                3/5
              </Text>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(100),
                height: dp(400),
                borderWidth: dp(0),
                borderBottomWidth: dp(2),
                alignItems: "center"
              }}>
              <Text
                style={{
                  width: dp(100),
                  height: dp(50),
                  position: "relative",
                  top: dp(317),
                  textAlign: "center"
                }}>
                3/5
              </Text>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(100),
                height: dp(200),
                borderWidth: dp(0),
                borderBottomWidth: dp(2),
                alignItems: "center"
              }}>
              <Text
                style={{
                  width: dp(100),
                  height: dp(50),
                  position: "relative",
                  top: dp(130),
                  textAlign: "center"
                }}>
                3/5
              </Text>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(100),
                height: dp(100),
                borderWidth: dp(0),
                borderBottomWidth: dp(2),
                alignItems: "center"
              }}>
              <Text
                style={{
                  width: dp(100),
                  height: dp(50),
                  position: "relative",
                  top: dp(50),
                  textAlign: "center"
                }}>
                3/5
              </Text>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(100),
                height: dp(100),
                borderWidth: dp(0),
                borderBottomWidth: dp(2),
                alignItems: "center"
              }}>
              <Text
                style={{
                  width: dp(100),
                  height: dp(50),
                  position: "relative",
                  top: dp(50),
                  textAlign: "center"
                }}>
                3/5
              </Text>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(100),
                height: dp(100),
                borderWidth: dp(0),
                borderBottomWidth: dp(2),
                alignItems: "center"
              }}>
              <Text
                style={{
                  width: dp(100),
                  height: dp(50),
                  position: "relative",
                  top: dp(50),
                  textAlign: "center"
                }}>
                3/5
              </Text>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(100),
                height: dp(150),
                borderWidth: dp(0),
                borderBottomWidth: dp(2),
                alignItems: "center"
              }}>
              <Text
                style={{
                  width: dp(100),
                  height: dp(100),
                  position: "relative",
                  top: dp(80),
                  textAlign: "center"
                }}>
                3/5
              </Text>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(100),
                height: dp(50),
                borderWidth: dp(0),
                borderBottomWidth: dp(2),
                alignItems: "center"
              }}>
              <Text
                style={{
                  width: dp(100),
                  height: dp(100),
                  position: "relative",
                  top: dp(10),
                  textAlign: "center"
                }}>
                3/5
              </Text>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(100),
                height: dp(200),
                borderWidth: dp(0),
                borderBottomWidth: dp(2),
                alignItems: "center"
              }}>
              <Text
                style={{
                  width: dp(100),
                  height: dp(100),
                  position: "relative",
                  top: dp(140),
                  textAlign: "center"
                }}>
                3/5
              </Text>
            </TableBorder>
            <TableBorder
              style={{
                width: dp(100),
                height: dp(50),
                borderWidth: dp(0),
                borderBottomWidth: dp(2),
                alignItems: "center"
              }}>
              <Text
                style={{
                  width: dp(100),
                  height: dp(100),
                  position: "relative",
                  top: dp(10),
                  textAlign: "center"
                }}>
                3/5
              </Text>
            </TableBorder>
          </View>
          {/*总分数 */}
          <View
            style={{
              width: dp(500),
              position: "absolute",
              left: dp(1100)
            }}>
            <TableBorder
              style={{
                width: dp(300),
                height: dp(100),
                borderTopWidth: dp(0),
                alignItems: "center",
                top: dp(1750)
              }}>
              <Text
                style={{
                  position: "relative",
                  top: dp(30)
                }}>
                总分
                <Text>{"    "}3/30</Text>
              </Text>
            </TableBorder>
          </View>
        </ScrollView>
      </View>
    );
  }
}
