import { Text, View, StyleSheet } from "react-native";
import { Image } from "react-native/Libraries/Animated/src/Animated";
import Radio from "../../../../../components/Radio/src/Radio";
import React from "react";
import styles from "../../../../../../assets/css/common";

export default class AnswerConfirm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: dp(320),
          alignItems: "center"
        }}
      >
        <View style={styles.tableColumn1}>
          <Image
            style={{ width: dp(250), height: dp(320) }}
            source={require("../img/doctor1.png")}
          />
        </View>
        <View>
          <View style={styles.tableRow}>
            <Text style={[styles.th, { width: dp(600) }, styles.tdb]}>
              正确
            </Text>
            <Text style={[styles.th, { width: dp(600) }, styles.tdb]}>
              错误
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Radio.RadioGroup
              model={this.props.questionInfo[this.props.questionType]["answer"]}
              onChange={this.props.keyBoardChange.bind(
                this,
                this.props.questionType
              )}
            >
              <View style={[styles.td, { width: dp(600) }]}>
                <Radio value={1} style={styles.radio} />
              </View>
              <View style={[styles.td, { width: dp(600) }]}>
                <Radio value={0} style={styles.radio} />
              </View>
            </Radio.RadioGroup>
          </View>
        </View>
      </View>
    );
  }
}
