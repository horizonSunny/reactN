import React, { Component } from "react";
import { View, Text } from "react-native";
export default class AnswerReverse extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Text>
        {"   "}
        {this.props.score === 1 ? "[ √ ]" : "[ × ]"}
      </Text>
    );
  }
}
