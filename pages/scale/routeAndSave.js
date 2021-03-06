import http from "../../utils/http/index";
import * as message from "./scaleMessage";
import NavigationService from "../../router/NavigationService";
import { url } from '../../utils/globalUrl';
import RNbridge from "../../components/RNbridge/RNbridge";

export function save(calculateResult, rootStore) {
  // console.log("calculateResult_", calculateResult, "_rootStore_", rootStore);
  const scaleScheduleIndex = rootStore.scaleCurrentIndex;
  const currentScaleName =
    rootStore.scaleName[scaleScheduleIndex]["assessmentName"];
  console.log(
    'rootStore.scaleName[scaleScheduleIndex]["assessmentName"]_',
    rootStore.scaleName[scaleScheduleIndex]["assessmentName"]
  );
  // 获取一些信息
  const scaleMessage = message[currentScaleName];
  const data = calculateResult;
  // 这边需要放入量表内容，量表名称，量表参考值，合并一些数据
  let scaleInfo = Object.assign(
    data,
    scaleMessage,
    rootStore.scaleName[scaleScheduleIndex]
  );
  console.log("sacle_DATA_", scaleInfo);
  rootStore.saveFinishedScale(scaleInfo);
  // currentindex +1
  rootStore.setScaleIndex();
  //
  if (rootStore.scaleCurrentIndex === rootStore.scaleName.length) {
    const obj = {
      assessmentPlanUid: rootStore.userInfo.assessmentPlanUid,
      items: rootStore.finishedScale,
      patientUid: rootStore.userInfo.patientUid
    };
    //表示有用户有量表，这边只有1，3能进.2是直接到档案列表页面
    const urlAll = url+"/rest/assessmentRecord"
    if (rootStore.operateProcess === 1) {
      http
        .post(urlAll, obj)
        .then(function(response) {
          //这边调安卓端方法进行回掉刷新
          RNbridge.homeFlash();
          console.log("response_", response);
        })
        .catch(function(error) {
          console.log("error_", error);
        });
    }
    NavigationService.navigate("ReportFromScale", { info: obj });
    // this.rootStore.finishedScale
  } else {
    console.log("rootStore_scaleCurrentIndex", rootStore.scaleCurrentIndex);
    const nextScale =
      rootStore.scaleName[rootStore.scaleCurrentIndex]["assessmentName"];
    NavigationService.navigate(nextScale);
  }
}
