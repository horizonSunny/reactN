/**
 * Created by zxf on 2018.9.17.
 */
import React from "react";
import Button from "../../../components/Button/Button";
import { StyleSheet, Text } from "react-native";

class PrevButton extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text;
  }
  render() {
    return (
      <Button
        style={[styles.backButton, this.props.buttonStyle]}
        onPress={this.props.onPress}
      >
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.text}
        </Text>
      </Button>
    );
  }
}
export default PrevButton;
const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    width: dp(351),
    height: dp(80),
    borderWidth: dp(1),
    borderColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: dp(10),

    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    flex: 1,
    textAlignVertical: "center",
    fontSize: font(36),
    color: "#656565",
    textAlign: "center",
    lineHeight: font(40)
  }
});
