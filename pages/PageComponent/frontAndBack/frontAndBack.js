import ButtonImg from "../../../components/ButtonImg/ButtonImg";
import { View, Text, StyleSheet } from "react-native";
import { BackgroundImage } from "../../../components/BackgroundImage/BackgroundImage";
import PrevButton from "../../PageComponent/PrevButton/PrevButton";
import React from "react";

export default class FrontAndBack extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const stylePadding = this.props.frontAndBackStyle ? this.props.frontAndBackStyle : {};
    return (
      <View style={[{ alignItems: "center" },stylePadding]}>
        <PrevButton
          onPress={this.props.goPrev}
          text="上一页"
          buttonStyle={{
            position: "absolute",
            left: "50%",
            marginLeft: dp(-330)
          }}
        />
        <PrevButton
          onPress={this.props.goNext}
          text="继续"
          buttonStyle={{
            color: "#656565",
            position: "absolute",
            left: "50%",
            marginLeft: 50
          }}
          textStyle={{ color: "#656565" }}
        />
      </View>
    );
  }
}
