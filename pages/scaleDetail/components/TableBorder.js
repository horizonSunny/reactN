import React, { Component } from "react";
import { View, Text } from "react-native";
export default class TableBorder extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={[{ borderWidth: dp(2), borderColor: "#000" }, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}
