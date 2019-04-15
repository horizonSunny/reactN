/**
 * Created by zuoxiaofei on 2018.7.16.
 * axios 基本配置
 */
import Qs from "querystring";
import { storage } from '../../utils/storage';
function setConfig(accesstoken){
  console.log('accesstoken__',accesstoken);
  return {
    baseURL: "",
    timeout: 5000,
    headers: {
      "X-Requested-With": "XMLHttpRequest", //设置该请求为ajax异步请求，区分传统页面请求等等
      "Content-Type": "application/json; charset=UTF-8", //这是contentType
      // 'Token': 'Bearer RALut4oY7dGRBeYP26Hy0kpOmCmd6GX6yQoDWE2rKT/RN8LkeOz2zn/Uv0gSKd5L96zXlpJjWPxK66FEFwnGhg==' 
      'Token': 'Bearer WE0vNi9piAIKs2yXCHhXlRYWEHUOAnuJD960jCk+IhitJpq/eL461qs8RgzFNHCUfmSwgUNsVLepnGbxSUwBYg=='
      // 'Token': accesstoken
    },
    paramsSerializer: function(params) {
      //序列化get请求参数
      if (params === undefined) {
        return "";
      }
      return params && Qs.stringify(params);
    }
  };
}

export async function getConfig(){
  console.log('这里是获取accesstoken')
  let token = await storage.load('accesstoken', (data) => {
    console.log('token____baseConfig_',data)
    return data;
  });
  const config  = await setConfig(token);
  return config;
}

