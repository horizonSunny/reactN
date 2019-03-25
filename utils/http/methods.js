/**
 * Created by zuoxiaofei on 2018.7.16.
 */
import commonData from "./common";

export function Methods(axioxInstance) {
  return {
    post(url, data) {
      // data = Object.assign({}, commonData, data);
      dataJson = JSON.stringify(data);
      console.log("method_dataJson_", dataJson);
      return axioxInstance.post(url, dataJson);
    },
    get(url, params) {
      return axioxInstance.get(url, params);
    }
  };
}
