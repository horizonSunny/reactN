import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ToastAndroid,
  Modal,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";

import { Image } from "react-native/Libraries/Animated/src/Animated";
import KeyBoardNumber from "../../../../components/tools/KeyBoardNumber";
import ButtonImg from "../../../../components/ButtonImg/ButtonImg";
import { BackgroundImage } from "../../../../components/BackgroundImage/BackgroundImage";
import Radio from "../../../../components/Radio/src/Radio";
import RadioButton from "../../../../components/RadioButton/src/RadioButton";
import FrontAndBack from "../../../PageComponent/frontAndBack/frontAndBack";
import PageOrderCode from "../../../PageComponent/PageOrderCode/PageOrderCode";
import androidToast from "../../../PageComponent/AndroidToast/AndroidToast";
import * as commonFunction from "../../../PageComponent/commonFunction/commonFunction";
// tools
import { objectClone } from "../../../../utils/objectClone";

export default class ActiveItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("ADL_props_", this.props);
  }
  componentWillMount() {}
  render() {
    const options = [
      {
        text: "自己完全可以做",
        value: 1
      },
      {
        text: "有些困难，自己尚能完成",
        value: 2
      },
      {
        text: "需要帮助",
        value: 3
      },
      {
        text: "根本不能做",
        value: 4
      }
    ];
    return (
      <View style={{ marginTop: dp(50) }}>
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: dp(50),
            height: dp(200)
          }}
        >
          <PageOrderCode index={this.props.index + 1} indexTotal={20} />
          {/* 有副标题 */}
          {this.props.item.subTitle !== "" && (
            <View
              style={{
                width: dp(1500),
                marginTop: dp(-570),
                marginLeft: dp(200)
              }}
            >
              <Text
                style={[
                  styles.questionText,
                  { width: dp(1500), fontSize: font(60), marginTop: dp(20) }
                ]}
              >
                {this.props.item.title}
              </Text>
              <Text
                style={[
                  styles.questionText,
                  { width: dp(1500), fontSize: font(40) }
                ]}
              >
                【{this.props.item.subTitle}】
              </Text>
            </View>
          )}
          {/* 无副标题的 */}
          {this.props.item.subTitle === "" && (
            <View
              style={{
                width: dp(1500),
                marginTop: dp(-570),
                marginLeft: dp(200)
              }}
            >
              <Text
                style={[
                  styles.questionText,
                  { width: dp(1500), fontSize: font(60), marginTop: dp(70) }
                ]}
              >
                {this.props.item.title}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: dp(50),
            marginBottom: dp(50)
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: dp(1500),
              borderBottomWidth: dp(1),
              borderBottomColor: "#ddd"
            }}
          />
        </View>
        {/* 这边进行数据绑定 */}
        <View style={{ alignItems: "center", marginTop: dp(20) }}>
          <RadioButton.RadioButtonGroup
            style={{
              width: dp(1500),
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap"
            }}
            model={this.props.itemAnswer}
            onChange={this.props.keyBoardChange.bind(
              this,
              this.props.item["name"]
            )}
          >
            {options.map((optionItem, optionIndex) => {
              return (
                <RadioButton
                  style={{
                    marginLeft: dp(50),
                    marginRight: dp(50),
                    marginTop: dp(20),
                    width: dp(600),
                    marginBottom: dp(30)
                  }}
                  text={optionItem.text}
                  key={optionIndex}
                  value={optionItem.value}
                />
              );
            })}
          </RadioButton.RadioButtonGroup>
        </View>
        <View style={{ alignItems: "center", marginTop: dp(140) }} />
        {/* 这边可能要带参 */}
        <FrontAndBack goNext={this.props.goNext} goPrev={this.props.goPrev} />
      </View>
    );
  }
}
const BASE_COLOR = "#479e13";
const styles = StyleSheet.create({
  baseColor: {
    color: BASE_COLOR
  },
  questionContainer: {
    backgroundColor: "#406dce",
    minHeight: dp(250),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  table: {
    flexDirection: "row",
    height: dp(320),
    alignItems: "center",
    marginLeft: dp(240)
  },
  tableColumn1: {
    alignItems: "center",
    borderBottomColor: BASE_COLOR,
    borderBottomWidth: dp(0.5)
  },
  tableRow: {
    flex: 1,
    flexDirection: "row"
  },
  td: {
    fontSize: font(28),
    color: "#777777",
    width: dp(400),
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: dp(0.5),
    borderColor: BASE_COLOR
  },
  tdb: {
    backgroundColor: "rgb(246,246,246)"
  },
  radio: {
    width: dp(50),
    height: dp(50)
  },
  th: {
    fontSize: font(40),
    color: "#777777",
    width: dp(400),
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: dp(0.5),
    borderColor: BASE_COLOR
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  questions: {
    backgroundColor: "#406ece",
    minHeight: dp(200),
    alignItems: "center"
  },
  questionText: {
    width: dp(1200),
    color: "#2c2c2c",
    fontSize: font(60),
    lineHeight: dp(88),
    marginLeft: dp(41),
    paddingRight: dp(80),
    fontWeight: "100",
    textAlign: "center"
  },
  questionText1: {
    color: "#2c2c2c",
    fontSize: font(60)
  },
  quesNum: {
    fontSize: font(60),
    color: "#ffffff"
  },
  backButton: {
    width: dp(351),
    height: dp(80),
    borderWidth: dp(3),
    borderColor: "#f0b22b",
    backgroundColor: "#ffffff",
    borderRadius: dp(10),
    marginRight: dp(194),
    justifyContent: "center",
    alignItems: "center"
  }
});
