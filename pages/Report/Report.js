import React, { Component } from "react";
import RNbridge from "../../components/RNbridge/RNbridge";
import qs from "querystring";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  ProgressBarAndroid,
  BackHandler,
  Modal,
  Alert,
  ActivityIndicator,
  TouchableNativeFeedback
} from "react-native";
import { BackgroundImage } from "../../components/BackgroundImage/BackgroundImage";
import ButtonImg from "../../components/ButtonImg/ButtonImg";
import { parseTime, diffTime } from "../../utils/handleTime";
import { inject } from "mobx-react";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/Button";
import data from "./testData";

@inject("rootStore")
export default class Report extends Component {
  state = {
    schemeData: [],
    schemeTime: [],
    currentTime: "",
    currentScheme: ""
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // 获取时间并且转换成数据对象
    this.getTime();
  }
  //获取scheme时间并且转换成数组
  getTime = () => {
    this.setState(
      {
        schemeData: data.body
      },
      () => {
        // 存放量表的时间，用于显示右边侧边栏
        const schemeData = this.state.schemeData;
        let timeArr = [];
        for (let item = 0; item < schemeData.length; item++) {
          const timeDetail = schemeData[item].assessmentDate;
          // 这边要对时间进行切割，适应UI布局
          const timeDate = timeDetail.split(" ");
          const hourSecondes = timeDate[1];
          const dayYear = timeDate[0].split("-");
          const [year, month, day] = dayYear;
          const time = {
            hourSecondes,
            year,
            month,
            day,
            timeDetail
          };
          timeArr.push(time);
        }
        this.setState(
          {
            schemeTime: timeArr
          },
          () => {
            console.log("this.state.schemeTime123_", this.state.schemeTime);
          }
        );
      }
    );
  };
  // 当点击的时候获取点击的“text”时间值
  clickGetScheme(time) {
    this.setState(
      {
        currentTime: time
      },
      () => {
        const scheme = this.state.schemeData.filter(this.getSchemeFilter);
        this.setState(
          {
            currentScheme: scheme
          },
          () => {
            console.log("------------------");
            console.log("currentScheme_", this.state.currentScheme);
          }
        );
      }
    );
  }
  // 依据过滤的点击时间值返回scheme的数据
  getSchemeFilter = item => {
    if (this.state.currentTime === item.assessmentDate) {
      return item;
    }
  };
  goNext = () => {};
  goPre = () => {
    BackHandler.exitApp();
  };
  renderPages() {
    return (
      <React.Fragment>
        <TopBar />
        <View style={{ alignItems: "center" }}>
          <View style={styles.mainCont}>
            <View>
              <Text style={styles.reportTitle}>脑健康评估报告</Text>
            </View>
            {this.renderSlider()}
            <View
              style={{
                height: dp(650)
              }}
            >
              <View style={styles.tableRow} key={"111"}>
                <Text style={[styles.tdh, styles.th, styles.tf]}>名称</Text>
                <Text style={[styles.th, styles.tdh]}>内容</Text>
                <Text style={[styles.th, styles.tdh]}>得分</Text>
                <Text style={[styles.th, styles.tdh]}>正常参考值</Text>
                <Text style={[styles.th, styles.tdh]}>结果</Text>
                <Text style={[styles.th, styles.tdh]}>操作</Text>
              </View>
              <ScrollView>{this.renderTable()}</ScrollView>
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
  renderTable() {
    const data = [
      {
        name: "MOCA量表",
        content: "情景记忆",
        score: "61",
        referenceScore: ">61",
        result: "正常"
      },
      {
        name: "MOCA量表",
        content: "情景记忆",
        score: "61",
        referenceScore: ">61",
        result: "正常"
      },
      {
        name: "MOCA量表",
        content: "情景记忆",
        score: "61",
        referenceScore: ">61",
        result: "正常"
      }
    ];
    return data.map((item, index) => {
      return (
        <View style={styles.tableRow} key={index + item.name}>
          <Text style={[styles.td, styles.tdh, styles.tf, styles.tdf]}>
            {item.name}
          </Text>
          <Text style={[styles.td, styles.tdh]}>{item.content}</Text>
          <Text style={[styles.td, styles.tdh]}>{item.score}</Text>
          <Text style={[styles.td, styles.tdh]}>{item.referenceScore}</Text>
          <Text
            style={[
              styles.td,
              styles.tdh,
              item.result === "正常" ? styles.tdl : styles.tdred
            ]}
          >
            {item.result}
          </Text>
          <View style={[styles.td, styles.tdh]}>
            <View
              style={{
                borderWidth: dp(1),
                borderColor: "#ddd",
                borderRadius: dp(10),
                height: dp(40),
                width: dp(100),
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                  this.props.rippleColor ? this.props.rippleColor : "#a2a4a6",
                  true
                )}
                onPress={this.handlePress}
              >
                <View
                  style={{
                    height: dp(40),
                    width: dp(100),
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: dp(20),
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    查看详情
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      );
    });
  }
  renderSlider() {
    return (
      <View>
        {this.state.schemeTime.map((item, index) => {
          return (
            <View key={index}>
              <View style={[styles.td, styles.tdh]}>
                <View
                  style={{
                    borderWidth: dp(1),
                    borderColor: "#ddd",
                    borderRadius: dp(10),
                    height: dp(100),
                    width: dp(300),
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(
                      this.props.rippleColor
                        ? this.props.rippleColor
                        : "#a2a4a6",
                      true
                    )}
                    onPress={() => {
                      this.clickGetScheme(item.timeDetail);
                    }}
                  >
                    <View
                      style={{
                        height: dp(40),
                        width: dp(100),
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: dp(20),
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        {item.month}/{item.day} {item.hourSecondes}
                        {"\n"}
                        {item.year}
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
  render() {
    return (
      <View style={{ justifyContent: "center" }}>{this.renderPages()}</View>
    );
  }
}

const BASE_COLOR = "#9ac0e5";
const styles = StyleSheet.create({
  topTip: {
    height: dp(100),
    width: "100%",
    paddingLeft: dp(50),
    paddingRight: dp(50),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff"
  },
  font40: {
    fontSize: font(40)
  },
  mainCont: {
    height: dp(1070),
    width: "95%",
    alignItems: "center",
    margin: dp(20),
    borderRadius: dp(10),
    borderBottomColor: "#c7c7c7",
    borderBottomWidth: dp(0.5),
    backgroundColor: "#fff"
  },
  ret: {
    fontSize: font(26)
  },
  right: {
    alignItems: "flex-end"
  },
  table: {
    flexDirection: "row",
    height: dp(320),
    alignItems: "center",
    marginLeft: dp(240)
  },
  tableColumn1: {
    alignItems: "center",
    borderBottomColor: BASE_COLOR,
    borderBottomWidth: dp(0.5)
  },
  tableRow: {
    flexDirection: "row"
  },
  tdh: {
    width: dp(240),
    height: dp(80),
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: dp(1),
    borderColor: "#9ac0e5",
    borderLeftWidth: dp(0)
  },
  td: {
    fontSize: font(22),
    color: "#878787",
    backgroundColor: "#fff",
    borderTopWidth: dp(0)
  },
  th: {
    fontSize: font(26),
    color: "#2b2b2b",
    backgroundColor: "#e9f4ff"
  },
  tf: {
    borderLeftWidth: dp(1)
  },
  tdf: {
    color: "#228be0"
  },
  tdl: {
    color: "#25bc3a"
  },
  tdred: {
    color: "#d11d1d"
  },
  reportTitle: {
    height: dp(50),
    width: dp(478),
    margin: dp(50),
    textAlign: "center",
    // textAlignVertical: 'center',
    fontSize: font(42),
    color: "#333744"
    // borderBottomWidth: dp(0.5),
    // borderBottomColor: '#424242'
  },
  reportTime: {
    height: dp(84),
    width: dp(478),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: font(20),
    color: "#878787"
  },
  patientInfo: {
    width: dp(1070),
    height: dp(60),
    flexDirection: "row",
    marginTop: dp(40),
    justifyContent: "space-between"
  },
  patientInfoItem: {
    flexDirection: "row"
  },
  pKey: {
    fontSize: font(26),
    fontWeight: "bold"
  },
  pValue: {
    fontSize: font(24)
  }
});
