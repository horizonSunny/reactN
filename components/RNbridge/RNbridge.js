/**
 * Created by zxf on 2018.9.26.
 */
import {NativeModules} from 'react-native';
const ReactBridge=NativeModules.ReactBridge;
import rootStore from '../../store'
import {toJS} from 'mobx';

/**
 *
 * @param {Object} obj
 * @returns {Object}
 */
function toJsonString(obj){
  let newObj={}
 for (let [key,value] of Object.entries(obj)){
    if(typeof value!=='string'){
      value=String(value);
    }
    newObj[key]=value;
 }
 return newObj;
}

const BASE_LOCAL_URL="http://192.168.0.192:16020/";//何老师
const BASE__LOCAL_GAME_URL="http://192.168.0.192:16020/";//董老师

const BASE_RELEASE_URL="http://pub.brainsources.com/";//线上路径
// 上线时修改为true;
const isRelease=true;

class RNbridge{
	static init_xz(){
		return ReactBridge.init_xz()
	}
  /**
   * {doctorId,doctorName,schedule}
   * 获取安卓传输的数据
   * @returns {Promise}
   */
  static init(){
    return ReactBridge.init()
  }
  static getId(){
  	return ReactBridge.getId()
	}
	static takePhoto(){
		return ReactBridge.takePhoto()
	}
	static getAudio(){
		return ReactBridge.getAudio()
	}
  static pingIpAddress(){
  	return ReactBridge.pingIpAddress()
	}
	static startTrain(data){
  	return ReactBridge.startTrain(data)
	}

  /**
   *
   * @param {String} path 后台接口路径
   * @param {object} data
   * @param {string} commonInfo
   * @param {Boolean} isGame 游戏的路径需要传入true，其他量表不需要传入
   * @returns {*}
   */
  static saveDataBase(path,data,isGame,commonInfo){
    if(typeof isGame!=="boolean"){
      commonInfo=isGame;
    }
	  if(typeof commonInfo.age == 'number'){
		  commonInfo.age = JSON.stringify(commonInfo.age)
	  }
    data=toJsonString(data);
   if(isRelease){//上线路径
     path=`${BASE_RELEASE_URL}${path}`
   }
   else{//本地路径
     if(isGame){
       path=`${BASE__LOCAL_GAME_URL}${path}`
     }
     else{
       path=`${BASE_LOCAL_URL}${path}`
     }
   }
   const finalData=JSON.stringify({...data,...toJS(commonInfo)});
   console.log('path',path);
    return ReactBridge.saveDataBase(path,finalData);
  }
  static updateDataBase(id,data,isGame,commonInfo){
		if(typeof isGame!=="boolean"){
			commonInfo=isGame;
		}
		data=toJsonString(data);
	  if(typeof commonInfo.age != 'String'){
		  commonInfo.age = JSON.stringify(commonInfo.age)
	  }
		const finalData=JSON.stringify({...data,...toJS(commonInfo)});
		console.log('id',id);
		return ReactBridge.updateDataBase(id,finalData);
	}
}
export default RNbridge;