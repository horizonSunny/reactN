import { Text, View, StyleSheet } from "react-native";
import PageOrderCode from "../PageOrderCode/PageOrderCode";
import { Image } from "react-native/Libraries/Animated/src/Animated";
import PrevButton from "../../PageComponent/PrevButton/PrevButton";
import Radio from "../../../components/Radio/src/Radio";
import FrontAndBack from "../../PageComponent/frontAndBack/frontAndBack";
import React from "react";
import AnswerConfirm from "../../PageComponent/AnswerConfirm/AnswerConfirm";

export default class DoctorConfirmNormal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const pageOrderCodeCss =  { 
      background:{
        width: dp(150),
        height: dp(65),
        position: "absolute",
        top: dp(50),
        left: dp(-20) },
      quesNum:{
        fontSize: font(30),
        color: "#ffffff",
        marginRight: dp(20),
        position: "absolute",
        left: dp(10),
        top: dp(10)
      },
      text:{
        fontSize: font(20) 
      }
    }
    const lineStyle = this.props.children ? {}:{marginTop:dp(350)}
    return (
      <View style={{ marginTop: dp(10) }}>
        <View style={{ backgroundColor: "#fff" }}>
          <PageOrderCode
            index={this.props.questionIndex + 1}
            indexTotal={this.props.indexTotal}
            pageOrderCodeStyle={pageOrderCodeCss}
          />
          <View
            style={{
              width: dp(1500),
              marginTop: dp(-570)
            }}
          >
            <Text
              style={[
                styles.questionText,
                {
                  marginTop: dp(50),
                  fontSize: font(40)
                }
              ]}
            >
            {this.props.question}         
            </Text>
            { this.props.questionDetail && 
              <Text style={{ color: "black", fontSize: font(30), marginLeft: dp(200) }}>
                        {this.props.questionDetail}
              </Text>}
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
            style={[{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: dp(1500),
              borderBottomWidth: dp(1),
              borderBottomColor: "#ddd"
            },lineStyle]}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: dp(20) }} >
        <View style={{
              flexDirection: "row",
              height: dp(150),
              alignItems: "center"
            }}>
          <View style={styles.tableColumn1}>
            <Image
              style={{ width: dp(102), height: dp(150) }}
              source={require("../img/doctor1.png")}
            />
          </View>
          <View>
            <View style={styles.tableRow}>
              <Text style={[styles.th, { width: dp(250) }, styles.tdb,{fontSize:dp(20)}]}>
                正确
              </Text>
              <Text style={[styles.th, { width: dp(250) }, styles.tdb,{fontSize:dp(20)}]}>
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
                <View style={[styles.td, { width: dp(250) }]}>
                  <Radio value={1} style={{width: dp(30), height: dp(30)}} />
                </View>
                <View style={[styles.td, { width: dp(250) }]}>
                  <Radio value={0} style={{width: dp(30), height: dp(30)}} />
                </View>
              </Radio.RadioGroup>
              </View>
            </View>
          </View>
        </View>   
        <View
          style={{
            marginTop: dp(40),
            marginBottom: dp(40)
          }}
        />
        <FrontAndBack frontAndBackStyle={{paddingRight:dp(50)}} goNext={this.props.goNext} goPrev={this.props.goPrev} />
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
    lineHeight: dp(88),
    paddingRight: dp(80), 
    fontWeight: "100",
    marginLeft: dp(200),
    marginTop: dp(20)
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
