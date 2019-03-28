import React, { Component } from "react";
import {
  View,
  ref,
  Text,
  StyleSheet,
  TextInput,
  ToastAndroid,
  Modal,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";
import ViewShot, { captureScreen, captureRef } from "react-native-view-shot";

export default class MOCA_Detail extends Component {
  render() {
    return (
      <View>
        <Text
          style={{ fontSize: 20 }}
          onPress={() => {
            this.snapshot("reftest");
            {
              /* this.alert(""); */
            }
          }}
        >
          点击
        </Text>
        <View ref="reftest">
          <Text>123</Text>
        </View>
      </View>
    );
  }

  alert = () => {
    alert("123");
  };
  snapshot = refname =>
    captureRef(this.refs["reftest"], {
      format: "jpg",
      quality: 0.4,
      result: "tmpfile",
      snapshotContentContainer: true
    })
      .then
      // uri => console.log("Image saved to", uri),
      // error => console.error("Oops, snapshot failed", error)
      ();
}
