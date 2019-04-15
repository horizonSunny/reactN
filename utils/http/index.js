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
    "Content-Type": "application/json; charset=UTF-8",//这是contentType
    // 'Token': 'Bearer WE0vNi9piAIKs2yXCHhXlRYWEHUOAnuJD960jCk+IhitJpq/eL461qs8RgzFNHCUfmSwgUNsVLepnGbxSUwBYg=='
  }});
/**
 * 请求拦截
 */
// async function getToken(){
//   console.log('这里是获取accesstoken')
//   let token
//     await storage.load('accesstoken', (data) => {
//     console.log('token____baseConfig_getToken_2313_',data)
//     return data;
//   });
//   console.log('token____baseConfig_getToken_5678_',token)
//   return token;
// }
let token 
storage.load('accesstoken', (data) => {
  token = data 
  console.log('token____baseConfig_getToken_2313_',token)
  // return data;
});
// let token = 'Bearer WE0vNi9piAIKs2yXCHhXlRYWEHUOAnuJD960jCk+IhitJpq/eL461qs8RgzFNHCUfmSwgUNsVLepnGbxSUwBYg=='
axiosInstance.interceptors.request.use(
  config => {
    //请求拦截器,发起请求时可以显示loading,
    // config.headers.common['Token'] = 'Bearer WE0vNi9piAIKs2yXCHhXlRYWEHUOAnuJD960jCk+IhitJpq/eL461qs8RgzFNHCUfmSwgUNsVLepnGbxSUwBYg=='
    config.headers.common['Token'] = token;
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
