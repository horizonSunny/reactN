/**
 * Created by zxf on 2018.9.17.
 */
import React from "react";
import Button from "../../../components/Button/Button";
import { StyleSheet, Text } from "react-native";
import ButtonImg from "../../../components/ButtonImg/ButtonImg";
export default function NextButton(props) {
  return (
    <ButtonImg
      source={require("../img/default.png")}
      sourcePress={require("../img/press.png")}
      style={[styles.backButton, props.buttonStyle]}
      onPress={props.onPress}
    >
      <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
    </ButtonImg>
  );
}
const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    width: dp(351),
    height: dp(80),
    borderWidth: dp(3),
    borderColor: "#f0b22b",
    backgroundColor: "#ffffff",
    borderRadius: dp(10),
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    flex: 1,
    textAlignVertical: "center",
    fontSize: font(36),
    color: "#f0b22b",
    textAlign: "center",
    lineHeight: font(50)
  }
});
