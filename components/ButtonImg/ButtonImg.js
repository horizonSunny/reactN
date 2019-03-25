/**
 * Created by zxf on 2018.9.7.
 */
/**
 * Created by ZuoXiaoFei on 2018.9.2.
 */
import React from "react";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ImageBackground,
  TouchableNativeFeedback,
  ImageSourcePropType,
  GestureResponderEvent,
  Platform
} from "react-native";

interface ButtonImgInterface {
  source: ImageSourcePropType;
  sourcePress?: ImageSourcePropType;
  onPress?: () => any;
  type?: string;
  rippleColor?: string;
  style?: any;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
}
interface ButtonImgState {
  source: ImageSourcePropType;
}

export default class ButtonImage extends React.Component<
  ButtonImgInterface,
  ButtonImgState
> {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    fontSize: 20,
    color: "#ffff",
    fontWeight: "normal",
    type: ""
  };
  state = {
    source: this.props.source
  };
  handlePressIn = () => {
    if (this.props.sourcePress) {
      this.setState({
        source: this.props.sourcePress
      });
    }
  };
  handlePressOut = () => {
    this.setState({
      source: this.props.source
    });
  };
  handlePress = () => {
    this.setState({
      source: this.props.source
    });
    if (this.props.onPress) {
      this.props.onPress();
    }
  };
  static getDerivedStateFromProps(props: ButtonImgInterface, state) {
    if (props.source !== state.source) {
      if (props.sourcePress === state.source) {
        return {
          source: props.sourcePress
        };
      } else {
        return {
          source: props.source
        };
      }
    }
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.source !== nextProps.source ||
      this.state.source !== nextState.source
    );
  }

  render() {
    if (this.props.type === "ripple") {
      return (
        <TouchableNativeFeedback
          background={
            Platform.Version < 21
              ? TouchableNativeFeedback.SelectableBackground()
              : TouchableNativeFeedback.Ripple(
                  this.props.rippleColor ? this.props.rippleColor : "#a2a4a6",
                  false
                )
          }
          style={{ flex: 1 }}
          onPress={this.handlePress}
          onPressIn={this.props.sourcePress ? this.handlePressIn : undefined}
          onPressOut={this.props.sourcePress ? this.handlePressOut : undefined}
        >
          <View
            style={[styles.button, this.props.style ? this.props.style : null]}
          >
            <ImageBackground source={this.state.source} style={styles.text}>
              {this.props.children && this.props.children}
            </ImageBackground>
          </View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          hitSlop={{ top: dp(50), left: dp(50), right: dp(50), bottom: dp(50) }}
          onPress={this.handlePress}
          onPressIn={this.props.sourcePress ? this.handlePressIn : undefined}
          onPressOut={this.props.sourcePress ? this.handlePressOut : undefined}
        >
          <View
            style={[styles.button, this.props.style ? this.props.style : null]}
          >
            <ImageBackground source={this.state.source} style={styles.text}>
              <Text>{this.props.children && this.props.children}</Text>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
}

const styles = StyleSheet.create({
  button: {
    width: 380,
    height: 107
  },
  text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  }
});
