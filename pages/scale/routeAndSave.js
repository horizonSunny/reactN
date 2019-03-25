import http from "../../utils/http/index";
import * as message from "./scaleMessage";
import axios from "axios";

export function save(calculateResult, rootStore) {
  console.log("calculateResult_", calculateResult, "_rootStore_", rootStore);
  const scaleScheduleIndex = rootStore.scaleCurrentIndex;
  const scaleScheduleLength = rootStore.scaleName.length - 1;
  const currentScaleName = rootStore.scaleName[scaleScheduleIndex];
  // 获取一些信息
  const scaleMessage = message[currentScaleName];
  const data = calculateResult;
  // 这边需要放入量表内容，量表名称，量表参考值
  let scaleInfo = Object.assign(data, scaleMessage);
  console.log("sacle_DATA_", scaleInfo);
  rootStore.saveFinishedScale(scaleInfo);
  // test 直接发给后端
  const obj = {
    assessmentPlanUid: 1,
    items: rootStore.finishedScale,
    patientUid: 2
  };
  http
    .post("http://192.168.5.185:8081/rest/assessmentRecord", obj)
    .then(function(response) {
      console.log("response_", response);
    })
    .catch(function(error) {
      console.log("error_", error);
    });

  // if (scaleScheduleIndex < scaleScheduleLength) {
  //   console.log("goToNext");
  //   rootStore.setScaleIndex(scaleScheduleIndex + 1);
  //   // 路由到下一个量表页面
  //   return;
  // } else {
  //   console.log("goToResultPage");
  //   // 路由到结果页面
  // }
}
