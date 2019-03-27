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

import CdtScale from "./components/CdtScale";
import styles from "../../../../assets/css/common";

@inject("rootStore")
export default class CDT extends React.Component {
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
              画钟测验{"\n"}CDT
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
    return <CdtScale />;
  }
  render() {
    return (
      <View style={styles.container}>
        <TopBar
          onPress={this.onPress}
          content={{ completeForm: "3", evaluationName: "CDT" }}
        />
        {this.state.homePage && this.renderHomePage()}
        {!this.state.homePage && this.renderQuestionPage()}
      </View>
    );
  }
}
