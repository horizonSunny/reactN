/**
 * Created by ZuoXiaoFei on 2018.8.29.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import RadioButtonGroup from "./RadioButtonGroup";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableNativeFeedback
} from "react-native";
export default class RadioButton extends Component {
  static RadioButtonGroup = RadioButtonGroup;
  static propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
  state = {
    value: this.props.value
  };
  handlePress = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    } else {
      console.error("missing onChange callback");
    }
  };
  shouldComponentUpdate(nextProps) {
    if (nextProps.model !== this.props.model) {
      return true;
    }
    return false;
  }
  isChecked() {
    return this.props.model === this.state.value;
  }
  render() {
    return (
      <View
        style={[
          styles.radioButton,
          this.props.style,
          this.isChecked() ? styles.checkedView : null
        ]}
      >
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(
            this.props.rippleColor ? this.props.rippleColor : "#a2a4a6",
            true
          )}
          onPress={this.handlePress}
        >
          <View>
            <Text
              style={[
                styles.text,
                this.isChecked() ? styles.checkedText : null
              ]}
            >
              {" "}
              {this.props.text}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radioButton: {
    width: dp(310),
    height: dp(85),
    borderRadius: dp(40),
    borderColor: "#b7d1fd",
    borderWidth: dp(3),
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: dp(20),
    fontSize: font(30),
    color: "#565656"
  },
  checkedView: {
    backgroundColor: "#406ece"
  },
  checkedText: {
    color: "#ffffff"
  }
});
