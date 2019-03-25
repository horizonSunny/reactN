/**
 * Created by ZuoXiaoFei on 2018.8.27.
 */
import {
  createStackNavigator,
  NavigationActions,
  StackActions
} from "react-navigation";
import React from "react";

// import ScaleMain from '../pages/scale/scaleMain'
import MMSE from "../pages/scale/MMSE/MMSE";
import ADL from "../pages/scale/ADL/ADL";
import MOCA from "../pages/scale/MOCA/MOCA";
import Report from "../pages/Report/Report";

import RNbridge from "../components/RNbridge/RNbridge";
import { inject } from "mobx-react";
function initData(res, rootStore) {
  console.log("initScaleData", res);
  // 这边判断是有没有用户信息和量表信息
  const info = res;
  if (
    info.age !== undefined &&
    info.sex !== undefined &&
    info.name !== undefined
  ) {
    let userInfo = {
      sex: info.sex,
      age: info.age,
      name: info.name,
      phone: info.mobilephonenum,
      idNumber: info.idNumber
    };
    rootStore.setUserInfo(userInfo);
  }
  console.log("info.scaleName === true_", info.scaleName.length);
  info.scaleName.length !== 0 ? rootStore.setScaleNames(info.scaleName) : "";
  judgeOperateProcess(info, rootStore);
}

/**
 * @description 判断脑健康师操作流程,1有用户有量表，测评 2有用户无量表，档案 3 无用户有量表 脑健康师自测 ；
 */
function judgeOperateProcess(info, rootStore) {
  if (info.name && info.scaleName.length !== 0) {
    rootStore.setOperateProcess(1);
  } else if (info.name && info.scaleName.length === 0) {
    rootStore.setOperateProcess(2);
  } else if (!info.name && info.scaleName.length !== 0) {
    rootStore.setOperateProcess(3);
  }
}
const Main = inject("rootStore")(props => {
  RNbridge.init().then(res => {
    console.log("******", res);
    initData(res, props.rootStore);
    // 判断量表里面有没有东西，有的话走1，3，没有走2
    firstPage = props.rootStore.scaleName.length !== 0 ? "MOCA" : "Report";
    console.log("firstPage_" + firstPage);
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: firstPage })]
    });
    props.navigation.dispatch(resetAction);
  });
  return null;
});

const routes = {
  Main: {
    screen: Main
  },
  MMSE: {
    screen: MMSE
  },
  ADL: {
    screen: ADL
  },
  MOCA: {
    screen: MOCA
  },
  Report: {
    screen: Report
  }
};
const MainStack = createStackNavigator(routes, {
  navigationOptions: {
    header: null
  }
});
export default MainStack;
