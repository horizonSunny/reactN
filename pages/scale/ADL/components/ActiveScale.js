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
import { questionDisplay } from "./questionInfo";
import ActiveItem from "./ActiveItem";
import { inject } from "mobx-react";
// tools
import { objectClone } from "../../../../utils/objectClone";
import { save } from "../../routeAndSave";
import styles from "../../../../../assets/css/common";

@inject("rootStore")
export default class ActiveScale extends React.Component {
  constructor(props) {
    super(props);
    console.log("question_", questionDisplay);
    this.state = {
      questionCurrentIndex: 0
    };
  }
  componentWillMount() {
    let answerModel = {
      score: 0,
      answer: ""
    };
    let questionInfo = {
      lift: objectClone(answerModel),
      goOut: objectClone(answerModel),
      selfCatering: objectClone(answerModel),
      keepHouse: objectClone(answerModel),
      takeMedicine: objectClone(answerModel),
      eat: objectClone(answerModel),
      putOn: objectClone(answerModel),
      brushTeeth: objectClone(answerModel),
      washClothes: objectClone(answerModel),
      indoor: objectClone(answerModel),
      stairs: objectClone(answerModel),
      bed: objectClone(answerModel),
      takeBath: objectClone(answerModel),
      takeBathTwo: objectClone(answerModel),
      trimx: objectClone(answerModel),
      shopping: objectClone(answerModel),
      toilet: objectClone(answerModel),
      phone: objectClone(answerModel),
      takeMoney: objectClone(answerModel),
      alone: objectClone(answerModel)
    };
    // if (this.props.questionModel["questionInfo"] === "") {
    this.setState({ questionInfo: questionInfo });
    // } else {
    // this.setState({ questionInfo: this.props.questionModel["questionInfo"] });
    // }
  }
  keyBoardChange = (key, value) => {
    let questionInfo = this.state.questionInfo;
    questionInfo[key]["answer"] = value;
    this.setState({ questionInfo: questionInfo }, () => {
      this.nextTimer && clearTimeout(this.nextTimer);
      this.nextTimer = setTimeout(() => {
        this.goNext();
      }, 500);
    });
  };
  goNext = () => {
    this.nextTimer && clearTimeout(this.nextTimer);
    const qusName = questionDisplay[this.state.questionCurrentIndex]["name"];
    console.log("qusName_", qusName);
    const noEmpty = this.state.questionInfo[qusName]["answer"] === "";
    if (noEmpty) {
      androidToast("请选择选项");
      return;
    }
    // this is
    if (this.state.questionCurrentIndex === questionDisplay.length - 1) {
      const calculateResult = this.calculate();
      save(calculateResult, this.props.rootStore);
      return;
    }
    this.setState(
      {
        questionCurrentIndex: this.state.questionCurrentIndex + 1
      },
      () => {
        this.calculate();
        console.log("questionCurrentIndex", this.state.questionCurrentIndex);
      }
    );
  };
  goPrev = () => {
    console.log('this.state.questionCurrentIndex_',this.state.questionCurrentIndex);
    if (this.state.questionCurrentIndex === 0) {
      return;
    }
    this.setState({
      questionCurrentIndex: this.state.questionCurrentIndex - 1
    });
  };
  calculate = () => {
    let questionInfoTotal = Object.assign({}, this.state.questionInfo);
    let totalPoints = 0;
    // 障碍个数，有一个单项大于2分则障碍个数加一
    // let obstacle = 0;
    Object.keys(questionInfoTotal).map(key => {
      // 所有的answer都必须是string 类型
      questionInfoTotal[key].answer += "";
      questionInfoTotal[key].score = parseInt(questionInfoTotal[key].answer);
      totalPoints += questionInfoTotal[key].score;
      // if (questionInfoTotal[key].score > 2) {
      //   obstacle += 1;
      // }
    });
    const info = {
      adl: {
        questionInfo: questionInfoTotal
      }
    };
    console.log("questionInfoTotal_", questionInfoTotal);
    let status;
    if (totalPoints <= 26) {
      status = "正常";
    } else {
      status = "不正常";
    }
    const ADL = {
      assessmentAnswer: JSON.stringify(info),
      result: status,
      score: totalPoints
    };
    return ADL;
  };
  render() {
    return (
      <View>
        {questionDisplay.map((item, index) => {
          return (
            this.state.questionCurrentIndex === index && (
              <ActiveItem
                key={index}
                item={item}
                index={index}
                itemAnswer={this.state.questionInfo[item.name].answer}
                goPrev={this.goPrev}
                goNext={this.goNext}
                keyBoardChange={this.keyBoardChange}
              />
            )
          );
        })}
      </View>
    );
  }
}
