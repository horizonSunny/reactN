/**
 * Created by zuoxiaofei on 2018.7.16.
 * axios 基本配置
 */
import Qs from "querystring";
const CONFIG = {
  baseURL: "",
  timeout: 5000,
  headers: {
    "X-Requested-With": "XMLHttpRequest", //设置该请求为ajax异步请求，区分传统页面请求等等
    "Content-Type": "application/json; charset=UTF-8", //这是contentType
    Token:
      "Bearer rrKIdGmqHzhBKeQq7kPbW0pOmCmd6GX6yQoDWE2rKT/RN8LkeOz2zn/Uv0gSKd5LaQtbtDoAlEDcHavhCwEsHg==" //待设置
  },
  paramsSerializer: function(params) {
    //序列化get请求参数
    if (params === undefined) {
      return "";
    }
    return params && Qs.stringify(params);
  }
  // transformRequest: [
  //   function(data, headers) {
  //     if (data === undefined) return;
  //     // Do whatever you want to transform the data
  //     //对 data 进行任意转换处理
  //     // const query = Object.keys(data)
  //     //   .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
  //     //   .join("&");
  //     return data;
  //   }
  // ]
};
export { CONFIG };
