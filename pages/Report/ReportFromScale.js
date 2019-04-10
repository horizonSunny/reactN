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

@inject("rootStore")
export default class ReportFromScale extends Component {
  state = {
    schemeData: [],
    currentScheme: ""
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // 获取rooter并且转换成数据对象
    let info = this.props.navigation.state.params.info;
    console.log("ReportFromScale_info_", info);
    // const {} = {info.items}
    this.setState(
      {
        schemeData: info.items
      },
      () => {
        console.log("this.state.schemeData_", this.state.schemeData);
      }
    );
  }

  // 点击跳转详情页面
  handleToDetails = () => {
    console.log("info_", this.state.currentScheme);
    const item = this.state.currentScheme;
    NavigationService.navigate(item.assessmentName + "_Detail", { item });
    // NavigationService.navigate("CDT" + "_Detail", { name: "123" });
  };

  renderPages() {
    return (
      <React.Fragment>
        <TopBar />
        <View>
          <View style={[styles.mainCont]}>
            <View
              style={{
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
    return this.state.schemeData.map((item, index) => {
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
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
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
