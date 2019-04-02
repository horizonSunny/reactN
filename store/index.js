/**
 * Created by ZuoXiaoFei on 2018.8.31.
 */
import { observable, computed, action, configure, runInAction } from "mobx";
configure({ enforceActions: "observed" }); // 不允许在动作之外进行状态修改
import Http from "../utils/http";

class Store {
  // 存储从安卓传来的量表名字,表示要做那几个测评量表，可以理解为一个schedule
  @observable scaleName = [{ assessmentName: "MOCA", assessmentUid: 0 }];
  @action.bound
  setScaleNames(scaleName) {
    this.scaleName.replace(scaleName);
  }
  // 操作流程，1 表示有用户有量表，2表示无用户有量表， 3表示有用户无量表
  @observable operateProcess = 2;
  @action.bound
  setOperateProcess(process) {
    this.operateProcess = process;
  }
  // 设置当前量表index,依据index获取scaleName,确保路由跳转
  @observable scaleCurrentIndex = 0;
  @action.bound
  setScaleIndex() {
    this.scaleCurrentIndex += 1;
  }
  // 是否是脑健康管理师自测，是否有用户信息
  @observable haveUser = false;
  @action.bound
  setUser() {
    this.haveUser = true;
  }
  // 患者个人信息，从安卓获取或者在BaseInfo获取
  @observable userInfo = {
    name: "",
    age: "",
    sex: "",
    phone: "",
    idNumber: ""
  };
  @action.bound
  setUserInfo(userInfo) {
    this.userInfo = userInfo;
  }
  // 存储做过的量表的信息，是一个list集合的对象,绑定一个保存完成量表的方法
  @observable finishedScale = [];
  @action.bound
  saveFinishedScale(scaleInfo) {
    this.finishedScale.push(scaleInfo);
    console.log("this.finishedScale_", this.finishedScale);
  }
}
export default Store;
