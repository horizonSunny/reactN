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
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from "react-native";
import { BackgroundImage } from "../../components/BackgroundImage/BackgroundImage";
import ButtonImg from "../../components/ButtonImg/ButtonImg";
import { parseTime, diffTime } from "../../utils/handleTime";
import { inject } from "mobx-react";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/Button";
import data from "./testData";
import NavigationService from "../../router/NavigationService";
import http from "../../utils/http/index";
import { url } from '../../utils/globalUrl';

@inject("rootStore")
export default class Report extends Component {
  state = {
    resData: [],
    schemeData: [],
    schemeTime: [],
    scaleArr: [],
    currentTime: "",
    currentScheme: ""
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // 获取时间并且转换成数据对象
    let self = this;
    const urlAll = url+"/rest/assessmentRecord/"+rootStore.userInfo.patientUid
    console.log("urlAll_",urlAll);
    http
      .get(urlAll)
      .then(function(response) {
        self.setState({ resData: data }, () => {
          console.log("resData__", self.state.resData);
          self.getTime();
        });
      })
      .catch(function(error) {});
    // console.log('url____',url)
    // this.setState({ resData: data },()=>{
    //   this.getTime();
    // })
  }
  //获取scheme时间并且转换成数组
  getTime = () => {
    this.setState(
      {
        schemeData: this.state.resData.body
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
        // 将第一个显示
        this.setState(
          {
            scaleArr: this.state.schemeData[0].items,
            currentTime: timeArr[0].timeDetail
          },
          () => {
            console.log("------------------");
            console.log("schemeArr_true", this.state.scaleArr);
            console.log("schemeArr_", this.state.schemeData[0].items);
          }
        );
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
  // 点击跳转详情页面
  handleToDetails = () => {
    console.log("info_", this.state.currentScheme);
    const item = this.state.currentScheme;
    NavigationService.navigate(item.assessmentName + "_Detail", { item });
    // NavigationService.navigate("CDT" + "_Detail", { name: "123" });
  };
  // 当点击的时候获取点击的“text”时间值
  clickGetScheme(time) {
    this.setState(
      {
        currentTime: time
      },
      () => {
        //  filter 返回一个新数组
        // const scheme = this.state.schemeData.filter(this.getSchemeFilter);
        let scheme;
        for (var i = 0; i < this.state.schemeData.length; i++) {
          if (
            this.state.currentTime ===
            this.state.schemeData[i]["assessmentDate"]
          ) {
            scheme = this.state.schemeData[i];
            break;
          }
        }
        this.setState(
          {
            currentScheme: scheme
          },
          () => {
            console.log("------------------");
            console.log("currentScheme_", this.state.currentScheme);
            this.setState({
              schemeArr: this.state.currentScheme['items']
            })
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
        <View>
          <View style={[styles.mainCont, { position: "relative" }]}>
            <View
              style={{
                position: "absolute",
                top: dp(150),
                left: dp(10),
                height: dp(800),
                width: dp(300),
                alignItems: "center"
              }}
            >
              {this.renderSlider()}
            </View>
            <View
              style={{
                position: "absolute",
                top: dp(150),
                right: dp(80),
                borderColor: "#ddd",
                padding: dp(10),
                borderWidth: dp(3),
                height: dp(800),
                width: dp(1300),
                alignItems: "center"
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={styles.reportTitle}>脑健康评估报告</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tdhSlider, styles.th, styles.tf]}>
                  名称
                </Text>
                <Text style={[styles.th, styles.tdhSlider]}>内容</Text>
                <Text style={[styles.th, styles.tdhSlider]}>得分</Text>
                <Text style={[styles.th, styles.tdhSlider]}>正常参考值</Text>
                <Text style={[styles.th, styles.tdhSlider]}>结果</Text>
                <Text style={[styles.th, styles.tdhSlider]}>操作</Text>
              </View>
              <ScrollView>{this.renderTable()}</ScrollView>
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
  renderTable() {
    console.log('abcderrffdasdasdasd')
    console.log('this.state.scaleArr——',this.state.scaleArr)
    return this.state.scaleArr.map((item, index) => {
      return (
        <View style={styles.tableRow} key={index}>
          <Text style={[styles.td, styles.tdhSlider, styles.tf, styles.tdf]}>
            {item.assessmentName}
          </Text>
          <Text style={[styles.td, styles.tdhSlider]}>
            {item.assessmentContent}
          </Text>
          <Text style={[styles.td, styles.tdhSlider]}>{item.score}</Text>
          <Text style={[styles.td, styles.tdhSlider]}>
            {item.referenceValue}
          </Text>
          <Text
            style={[
              styles.td,
              styles.tdhSlider,
              item.result === "正常" ? styles.tdl : styles.tdred
            ]}
          >
            {item.result}
          </Text>
          <View style={[styles.td, styles.tdhSlider]}>
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
                onPress={() => {
                  this.setState({ currentScheme: item }, this.handleToDetails);
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
    const imgArr = [
      require("./img/selected.png"),
      require("./img/unselected.png")
    ];
    return (
      <View
        style={{
          height: dp(800)
        }}
      >
        <ScrollView>
          {this.state.schemeTime.map((item, index) => {
            return (
              <View key={index}>
                <View>
                  <View
                    style={{
                      height: dp(100),
                      width: dp(500),
                      marginLeft: dp(50)
                    }}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => {
                        this.clickGetScheme(item.timeDetail);
                      }}
                    >
                      <View
                        style={{
                          height: dp(100),
                          width: dp(200),
                          position: "relative"
                        }}
                      >
                        <View
                          style={{
                            position: "absolute",
                            left: dp(20),
                            top: dp(10),
                            fontSize: dp(20),
                            alignItems: "center"
                          }}
                        >
                          <Image
                            style={{ width: dp(20), height: dp(20) }}
                            source={
                              item.timeDetail === this.state.currentTime
                                ? imgArr[0]
                                : imgArr[1]
                            }
                          />
                          {index !== this.state.schemeTime.length - 1 && (
                            <Image
                              style={{
                                width: dp(5),
                                height: dp(50),
                                marginTop: dp(15)
                              }}
                              source={require("./img/timeline.png")}
                            />
                          )}
                        </View>
                        {/* 左侧时间右半部分 */}
                        <View
                          style={{
                            position: "absolute",
                            left: dp(50),
                            fontSize: dp(20)
                          }}
                        >
                          <Text>
                            {item.month}/{item.day}
                            <Text style={{ fontSize: dp(20) }}>
                              {" "}
                              {item.hourSecondes}
                            </Text>
                          </Text>
                          <Text style={{ fontSize: dp(20) }}>{item.year}</Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
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
  tdhSlider: {
    width: dp(200),
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
