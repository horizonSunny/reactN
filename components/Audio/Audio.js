/**
 * Created by zxf on 2018.10.10.
 */
import React from "react";
import ButtonImg from "../ButtonImg/ButtonImg";
import { Text } from "react-native";
import PropTypes from "prop-types";
const Sound = require("react-native-sound");
export default class Audio extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.audioPauseImg = require("./img/audio.png");
    this.audioPlayingImg = require("./img/audio-press.png");
    this.status = false;
    this.state = {
      audioIcon: this.audioPauseImg
    };
    this.whoosh = new Sound(props.src, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
      }
    });
  }
  handlePress = () => {
    if (!this.status) {
      this.status = true;
      this.setState({
        audioIcon: this.audioPlayingImg
      });

      // loaded successfully
      this.whoosh.play(success => {
        if (success) {
          this.status = false;
          this.setState({
            audioIcon: this.audioPauseImg
          });
          console.log("successfully finished playing");
        } else {
          console.log("playback failed due to audio decoding errors");
          // reset the player to its uninitialized state (android only)
          // this is the only option to recover after an error occured and use the player again
          whoosh.reset();
        }
      });
    } else {
      this.setState({
        audioIcon: this.audioPauseImg
      });
      this.whoosh.pause();
      this.status = false;
    }
  };
  componentWillUnmount() {
    this.whoosh.release();
    this.whoosh = null;
  }
  render() {
    console.log(this.state.audioIcon);
    const style = this.props.audioStyle ? this.props.audioStyle : { width: dp(230), height: dp(230) }
    
    return (
      <React.Fragment>
        <ButtonImg
          onPress={this.handlePress}
          style={style}
          source={this.state.audioIcon}
        />
        <Text style={{ fontSize: font(30), color: "#479e13" }}>点击播放</Text>
      </React.Fragment>
    );
  }
}
