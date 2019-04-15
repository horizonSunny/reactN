/**
 * Created by zuoxiaofei on 2018.7.16.
 * axios 封装
 */
import axios from "axios";
import { ToastAndroid } from "react-native";
import { checkStatus } from "./checkStatus";
import { storage } from '../../utils/storage';
import { Methods } from "./methods";



let  axiosInstance  = axios.create({
  baseURL: "",
  timeout: 5000,
  headers: {
    "X-Requested-With": "XMLHttpRequest", //设置该请求为ajax异步请求，区分传统页面请求等等
    "Content-Type": "application/json; charset=UTF-8" //这是contentType
  }});
/**
 * 请求拦截
 */
axiosInstance.interceptors.request.use(
  config => {
    //请求拦截器,发起请求时可以显示loading,
    let token =  await storage.load('accesstoken', (data) => {
      return data;
    });
    console.log('这里设置请求头部信息')
    config.headers.common['Token'] = token
    return config;
  },
  function(error) {
    //错误的请求
    return Promise.reject(error);
  }
);
/**
 * 响应拦截
 */
axiosInstance.interceptors.response.use(
  response => {
    console.log("http_123", response);
    //请求拦拦截，校验http状态码等等
    if (checkStatus(response.status)) {
      return response.data;
    } else {
      return {
        code: 404,
        msg: "网络异常"
      };
    }
  },
  error => {
    console.log(error);
    ToastAndroid.show("网络异常1", ToastAndroid.SHORT);
  }
);
const http = Methods(axiosInstance);
export default http;
