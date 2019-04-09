/**
 * Created by zuoxiaofei on 2018.7.16.
 * axios 封装
 */
import axios from "axios";
import { ToastAndroid } from "react-native";
import { CONFIG } from "./baseConfig";
import { checkStatus } from "./checkStatus";
import { Methods } from "./methods";

const axiosInstance = axios.create(CONFIG);

/**
 * 请求拦截
 */
axiosInstance.interceptors.request.use(
  config => {
    //请求拦截器,发起请求时可以显示loading,
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
