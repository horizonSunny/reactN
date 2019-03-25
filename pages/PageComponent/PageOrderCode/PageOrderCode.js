import ButtonImg from "../../../components/ButtonImg/ButtonImg";
import { Text, StyleSheet } from "react-native";
import { BackgroundImage } from "../../../components/BackgroundImage/BackgroundImage";
import React from "react";

export default class PageOrderCode extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BackgroundImage
        source={
          this.props.backgroundColor && this.props.backgroundColor === "green"
            ? require("../img/bianhao.png")
            : require("../img/bianhao1.png")
        }
        key={4}
        style={{
          width: dp(219),
          height: dp(98),
          position: "absolute",
          top: 0,
          left: dp(-20)
        }}
      >
        <Text
          style={[
            styles.quesNum,
            { width: "100%" },
            { textAlign: "right" },
            { paddingRight: dp(30) }
          ]}
        >
          {this.props.index}
          <Text style={{ fontSize: font(30) }}>/ {this.props.indexTotal}</Text>
        </Text>
      </BackgroundImage>
    );
  }
}
const styles = StyleSheet.create({
  quesNum: {
    fontSize: font(40),
    color: "#ffffff",
    marginRight: dp(20),
    position: "absolute",
    left: dp(20),
    top: dp(20)
  }
});
