import React, { Component } from "react";
import { View, Text } from "react-native";
export default class AnswerReverse extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>今年几月份？ {this.props.score === 1 ? "[ √ ]" : "[ × ]"}</Text>
      </View>
    );
  }
}
