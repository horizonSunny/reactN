/**
 * Created by zxf on 2018.9.10.
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Modal,
  Image,
  TouchableNativeFeedback,
  BackHandler,
  ToastAndroid,
  StatusBar
} from "react-native";
import ButtomImg from "../../components/ButtonImg/ButtonImg";
import PrevButton from "../../pages/PageComponent/PrevButton/PrevButton";
import { inject } from "mobx-react";
import PubSub from "../PubSub/PubSub";
import RNbridge from "../RNbridge/RNbridge";
@inject("rootStore")
export default class TopBar extends React.PureComponent {
  onPress = () => {
    if (this.props.onPress) {
      // this.props.onPress();
    }
  };
  state = {
    exit: false,
    time: global.time.number
  };
  startTime() {
    PubSub.publish("startTime");
  }
  transfromTime() {
    let m, s;
    if (this.state.time > 60) {
      m = parseInt(this.state.time / 60);
      s = this.state.time % 60;
    } else {
      m = 0;
      s = this.state.time;
    }
    if (s < 10) {
      s = "0" + s;
    }
    if (m < 10) {
      m = "0" + m;
    }
    return `${m}:${s}`;
  }
  componentDidMount() {
    this.startTime();
    this.handleTimer = PubSub.subscribe("updateTime", () => {
      this.setState({
        time: global.time.number
      });
    });
  }
  componentWillUnmount() {
    PubSub.publish("stopTime");
    PubSub.unsubscribe(this.handleTimer);
  }
  exitApp = () => {
    this.setState(
      {
        exit: false
      },
      () => {
        PubSub.publish("stopTime");
        BackHandler.exitApp();
      }
    );
  };
  openExit = () => {
    PubSub.publish("stopTime");
    this.setState({ exit: true });
  };
  cancelExit = () => {
    PubSub.publish("startTime");
    this.setState({ exit: false });
  };

  render() {
    let userInfo;

    if (this.props.rootStore.userInfo.name) {
      userInfo = (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.name}>{this.props.rootStore.userInfo.name}</Text>
          <Text style={styles.sex}>
            [{this.props.rootStore.userInfo.sex == "1" ? "男" : "女"}
          </Text>
          <Text style={styles.age}>{this.props.rootStore.userInfo.age}岁]</Text>
        </View>
      );
    } else {
      userInfo = null;
    }
    return (
      <View style={[styles.container]}>
        <ImageBackground source={require("./img/top.png")} style={styles.bk}>
          <Text style={styles.leftText}>欢迎进行脑健康体检</Text>
          {userInfo}
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.time}>{this.transfromTime()}</Text>
            <ButtomImg
              onPress={this.openExit}
              style={{
                width: dp(36),
                height: dp(38),
                marginLeft: dp(40),
                marginRight: dp(40)
              }}
              source={require("./img/exitBtn.png")}
            />
          </View>
        </ImageBackground>

        <Modal
          animationType="slide"
          transparent={true}
          presentationStyle="overFullScreen"
          onRequestClose={() => {}}
          visible={this.state.exit}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.6)",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                width: dp(730),
                height: dp(450),
                backgroundColor: "#ffffff"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  backgroundColor: "#406dce",
                  height: dp(100)
                }}
              >
                <Text
                  style={{
                    fontSize: font(38),
                    marginTop: dp(20),
                    marginRight: dp(440),
                    color: "#fff"
                  }}
                >
                  温馨提示
                </Text>
                <TouchableNativeFeedback
                  onPress={() => {
                    this.setState({ exit: false });
                  }}
                  background={TouchableNativeFeedback.SelectableBackground()}
                >
                  <Text
                    style={{
                      fontSize: font(60),
                      marginTop: dp(10),
                      marginRight: dp(50),
                      color: "#fff"
                    }}
                  >
                    ×
                  </Text>
                </TouchableNativeFeedback>
              </View>
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  justifyContent: "center",
                  marginTop: dp(0),
                  flexDirection: "row"
                }}
              >
                <Image
                  style={{ width: dp(66), height: dp(66), marginRight: dp(50) }}
                  source={require("./img/!.png")}
                />
                <Text style={{ fontSize: font(40), color: "#333" }}>
                  是否退出本测验
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: "50%",
                    boxSizing: "border-box",
                    borderRightWidth: dp(0.5),
                    borderColor: "#e6e6e6",
                    height: dp(130),
                    borderTopWidth: dp(1)
                  }}
                >
                  <PrevButton
                    text="确定"
                    onPress={this.exitApp}
                    buttonStyle={{
                      color: "#406dce",
                      marginLeft: dp(50),
                      width: dp(250),
                      height: dp(70),
                      marginTop: dp(30),
                      borderColor: "#406dce"
                    }}
                    textStyle={{ color: "#406dce", fontSize: font(30) }}
                  />
                </View>
                <View
                  style={{
                    width: "50%",
                    boxSizing: "border-box",
                    borderLeftWidth: dp(0.5),
                    borderColor: "#e6e6e6",
                    height: dp(130),
                    borderTopWidth: dp(1)
                  }}
                >
                  <PrevButton
                    text="取消"
                    onPress={this.cancelExit}
                    buttonStyle={{
                      color: "#406dce",
                      backgroundColor: "#406dce",
                      marginLeft: dp(50),
                      width: dp(250),
                      height: dp(70),
                      marginTop: dp(30),
                      borderColor: "#406dce"
                    }}
                    textStyle={{ color: "#fff", fontSize: font(30) }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: dp(90),
    backgroundColor: "#33455d"
  },
  bk: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  leftText: {
    fontSize: font(24),
    color: "#ffffff",
    marginLeft: dp(52)
  },
  name: {
    fontSize: font(30),
    color: "#ffffff"
  },
  sex: {
    fontSize: font(24),
    marginLeft: dp(13),
    marginRight: dp(25),
    color: "#ffffff"
  },
  age: {
    fontSize: font(24),
    color: "#ffffff"
  },
  time: {
    fontSize: font(26),
    color: "#ffffff"
  }
});
