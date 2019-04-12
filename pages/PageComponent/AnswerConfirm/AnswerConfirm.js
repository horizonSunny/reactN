import { Text, View, StyleSheet } from "react-native";
import { Image } from "react-native/Libraries/Animated/src/Animated";
import Radio from "../../../components/Radio/src/Radio";
import React from "react";
import styles from "../../../../assets/css/common";

export default class AnswerConfirm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const styleOut = this.props.answerConfirmStyle ? this.props.answerConfirmStyle['styleOut'] : 
    {
      flexDirection: "row",
      height: dp(320),
      alignItems: "center"
    }
    const styleImg = this.props.answerConfirmStyle ? this.props.answerConfirmStyle['styleImg'] : { width: dp(250), height: dp(320) }
    const styleAnswer = this.props.answerConfirmStyle ? this.props.answerConfirmStyle['styleAnswer'] : [styles.th, { width: dp(600) }, styles.tdb]
    const styleRadio = this.props.answerConfirmStyle ? this.props.answerConfirmStyle['styleRadio'] : [styles.td, { width: dp(600) }]
    const styleRadioSize = this.props.answerConfirmStyle ? this.props.answerConfirmStyle['styleRadioSize']:styles.radio
    return (
      <View
        style={styleOut}
      >
        <View style={styles.tableColumn1}>
          <Image
            style={styleImg}
            source={require("../img/doctor1.png")}
          />
        </View>
        <View>
          <View style={styles.tableRow}>
            <Text style={styleAnswer}>
              正确
            </Text>
            <Text style={styleAnswer}>
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
              <View style={styleRadio}>
                <Radio value={1} style={styleRadioSize} />
              </View>
              <View style={styleRadio}>
                <Radio value={0} style={styleRadioSize} />
              </View>
            </Radio.RadioGroup>
          </View>
        </View>
      </View>
    );
  }
}
