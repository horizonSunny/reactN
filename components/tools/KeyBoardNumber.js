/**
 * Created by zxf on 2018.9.18.
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { BackgroundImage } from "../BackgroundImage/BackgroundImage";
import ButtonImg from "../ButtonImg/ButtonImg";

class NumberButton extends React.Component {
  static propTypes = {
    text: PropTypes.number
  };
  shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text;
  }
  render() {
    return (
      <ButtonImg
        type="ripple"
        onPress={this.props.onPress}
        style={styles.buttonNum}
        source={require("../../../assets/img/num.png")}
      >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </ButtonImg>
    );
  }
}
export default class KeyBoardNumber extends React.Component {
  static propTypes = {
    scu: PropTypes.bool.isRequired
  };
  numbers = [];
  onPressNumber = value => {
    console.log(this.numbers);
    this.numbers.push(value);
    if (this.props.onChangeText) {
      this.props.onChangeText(this.numbers.join(""));
    }
  };
  handleDelete = () => {
    this.numbers = [];
    if (this.props.onChangeText) {
      this.props.onChangeText(this.numbers.join(""));
    }
  };
  // 保存父级对象的值
  saveAndClear = item => {
    this.numbers = [];
  };
  handleEnsure = () => {
    if (this.props.onEnsure) {
      this.props.onEnsure();
      this.numbers = [];
    }
  };
  componentWillUnmount() {
    this.numbers = [];
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.scu !== this.props.scu;
  }
  render() {
    return (
      <View style={this.props.style}>
        <View
          style={{
            width: dp(570),
            height: dp(450),
            paddingLeft: dp(60),
            paddingRight: dp(60)
          }}
        >
          <View style={styles.buttonWrap}>
            <NumberButton onPress={this.onPressNumber.bind(this, 1)} text={1} />
            <NumberButton onPress={this.onPressNumber.bind(this, 2)} text={2} />
            <NumberButton onPress={this.onPressNumber.bind(this, 3)} text={3} />
            <NumberButton onPress={this.onPressNumber.bind(this, 4)} text={4} />
            <NumberButton onPress={this.onPressNumber.bind(this, 5)} text={5} />
            <NumberButton onPress={this.onPressNumber.bind(this, 6)} text={6} />
            <NumberButton onPress={this.onPressNumber.bind(this, 7)} text={7} />
            <NumberButton onPress={this.onPressNumber.bind(this, 8)} text={8} />
            <NumberButton onPress={this.onPressNumber.bind(this, 9)} text={9} />
            <ButtonImg
              style={styles.buttonStyle}
              source={require("../../../assets/img/delete.png")}
            >
              <Text
                onPress={this.handleDelete}
                style={[styles.buttonText, { color: "#ffffff" }]}
              >
                删除
              </Text>
            </ButtonImg>
            <NumberButton onPress={this.onPressNumber.bind(this, 0)} text={0} />
            <ButtonImg
              style={styles.buttonStyle}
              source={require("../../../assets/img/ensure.png")}
            >
              <Text
                onPress={this.handleEnsure}
                style={[styles.buttonText, { color: "#ffffff" }]}
              >
                确定
              </Text>
            </ButtonImg>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonStyle: {
    width: dp(140),
    height: dp(80),
    color: "#ffffff",
    fontSize: font(48)
  },
  buttonNum: {
    width: dp(140),
    height: dp(80),
    marginBottom: dp(20),
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#080808",
    fontSize: font(32)
  },
  buttonWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
});
