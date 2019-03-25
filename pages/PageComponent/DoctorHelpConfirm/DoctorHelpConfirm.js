import { Text, View, StyleSheet } from "react-native";
import PageOrderCode from "../PageOrderCode/PageOrderCode";
import { Image } from "react-native/Libraries/Animated/src/Animated";
import PrevButton from "../../PageComponent/PrevButton/PrevButton";
import Radio from "../../../components/Radio/src/Radio";
import FrontAndBack from "../../PageComponent/frontAndBack/frontAndBack";
import React from "react";

export default class DoctorHelpConfirm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ marginTop: dp(30) }}>
        <View style={{ backgroundColor: "#fff", marginTop: dp(50) }}>
          <PageOrderCode
            backgroundColor={"green"}
            index={this.props.questionIndex + 1}
            indexTotal={this.props.indexTotal}
          />
          <View
            style={{
              flexDirection: "row",
              width: dp(1500),
              marginTop: dp(-570),
              marginLeft: dp(200)
            }}
          >
            <Text
              style={[
                styles.questionText,
                {
                  marginTop: dp(30),
                  fontSize: font(60),
                  marginLeft: dp(200)
                }
              ]}
            >
              {this.props.question}
            </Text>
          </View>
          {this.props.audio}
        </View>
        <View
          style={{
            alignItems: "center",
            width: "100%"
          }}
        >
          {this.props.children}
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
        <View style={styles.table}>
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
                model={
                  this.props.questionInfo[this.props.questionType]["answer"]
                }
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
        <View
          style={{
            marginTop: dp(40),
            marginBottom: dp(40)
          }}
        />
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
  radio: {
    width: dp(50),
    height: dp(50)
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f9fd"
  },
  questions: {
    backgroundColor: "#406ece",
    minHeight: dp(200),
    alignItems: "center"
  },
  questionText: {
    color: "#ffffff",
    fontSize: font(60),
    paddingTop: dp(30),
    paddingBottom: dp(30)
  },
  quesNum: {
    fontSize: font(40),
    color: "#ffffff",
    marginRight: dp(20),
    position: "absolute",
    left: dp(20),
    top: dp(20)
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
  },
  table: {
    flexDirection: "row",
    marginBottom: dp(50)
  },
  tableRow: {
    flex: 1,
    flexDirection: "row"
  },
  tableTh: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    borderWidth: dp(0.5),
    borderColor: "#f0b22b"
  },
  tableTd: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    borderWidth: dp(0.5),
    borderColor: "#f0b22b"
  },
  tableThText: {
    fontSize: font(40)
  },
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
