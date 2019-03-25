import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ToastAndroid
} from "react-native";

import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import TopBar from "../../../components/TopBar/TopBar";
import { BackgroundImage } from "../../../components/BackgroundImage/BackgroundImage";
import ButtonImg from "../../../components/ButtonImg/ButtonImg";
import RadioButton from "../../../components/RadioButton";
import PrevButton from "../../PageComponent/PrevButton/PrevButton";
import DoctorHelpWaring from "../../PageComponent/DoctorHelpWaring/DoctorHelpWaring";
import { inject } from "mobx-react";
import RNbridge from "../../../components/RNbridge/RNbridge";

import ActiveScale from "./components/ActiveScale";

@inject("rootStore")
export default class ADL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homePage: true
    };
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
      <React.Fragment>
        <View style={{ justifyContent: "center", marginTop: dp(60) }}>
          <BackgroundImage
            source={require("./img/bk1.png")}
            style={{
              height: dp(625),
              width: dp(1725),
              alignItems: "center",
              marginTop: dp(125)
            }}
          >
            <Text
              style={{
                fontSize: font(100),
                color: "#ffffff",
                marginTop: dp(170),
                fontWeight: "900",
                textAlign: "center"
              }}
            >
              日常生活能力测评{"\n"}ADL
            </Text>
            <Text
              style={{
                fontSize: font(36),
                color: "#c4e1fe",
                marginTop: dp(40)
              }}
            >
              本次测评大约需要3分钟
            </Text>
          </BackgroundImage>
          {/*<DoctorHelpWaring/>*/}
        </View>
        <View style={{ alignItems: "center", marginTop: dp(80) }}>
          <ButtonImg
            source={require("./img/btn-default.png")}
            sourcePress={require("./img/btn-press.png")}
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
      </React.Fragment>
    );
  }
  renderQuestionPage() {
    return <ActiveScale />;
  }
  render() {
    return (
      <View style={styles.container}>
        <TopBar
          onPress={this.onPress}
          content={{ completeForm: "3", evaluationName: "ADl" }}
        />
        {this.state.homePage && this.renderHomePage()}
        {!this.state.homePage && this.renderQuestionPage()}
      </View>
    );
  }
}
const BASE_COLOR = "#479e13";
const styles = StyleSheet.create({
  baseColor: {
    color: BASE_COLOR
  },
  questionContainer: {
    backgroundColor: "#406dce",
    minHeight: dp(250),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
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
    flex: 1,
    flexDirection: "row"
  },
  td: {
    fontSize: font(28),
    color: "#777777",
    width: dp(400),
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: dp(0.5),
    borderColor: BASE_COLOR
  },
  tdb: {
    backgroundColor: "rgb(246,246,246)"
  },
  radio: {
    width: dp(50),
    height: dp(50)
  },
  th: {
    fontSize: font(40),
    color: "#777777",
    width: dp(400),
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: dp(0.5),
    borderColor: BASE_COLOR
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  questions: {
    backgroundColor: "#406ece",
    minHeight: dp(200),
    alignItems: "center"
  },
  questionText: {
    width: dp(1200),
    color: "#2c2c2c",
    fontSize: font(60),
    lineHeight: dp(88),
    marginLeft: dp(41),
    paddingRight: dp(80),
    fontWeight: "100",
    textAlign: "center"
  },
  questionText1: {
    color: "#2c2c2c",
    fontSize: font(60)
  },
  quesNum: {
    fontSize: font(60),
    color: "#ffffff"
  },
  backButton: {
    width: dp(351),
    height: dp(80),
    borderWidth: dp(3),
    borderColor: "#f0b22b",
    backgroundColor: "#ffffff",
    borderRadius: dp(10),
    marginRight: dp(194),
    justifyContent: "center",
    alignItems: "center"
  }
});
