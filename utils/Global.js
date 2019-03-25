/**
 * Created by ZuoXiaoFei on 2018.8.25.
 *
 */
import {px2dp,FontSize,__HEIGHT__,navigationHeight} from './tools'


/**
 *
 * @param {object} target
 * @param {string} prop
 * @param {any} value
 */
const defineProp=function(target,prop,value){
  Object.defineProperty(target,prop,{
    value:value
  })
}
const __BASE_URL__='192.168.0.192:300';
global.dp=px2dp;
global.font=FontSize;
import Http from './http'
defineProp(global,'__HEIGHT__',__HEIGHT__);
defineProp(global,'__NAVIGATION_HEIGHT__',navigationHeight);
defineProp(global,'__BASE_URL__',__BASE_URL__);
defineProp(global,'Http',Http);


global.parseRoute=function(url){
  if(!url){
    console.warn('parseRoute function need a valiad url');
    return;
  }
  if(url.indexOf('?')>-1){
    let arr=url.match(/(.*?)\?(.*)/);
    return arr[1]
  }
  else{
    return url
  }
}
/**
 *
 * @param url
 * @returns {*|string[]}
 */
global.parseRouteAndGetGameUrl=function(url){
  if(url.indexOf('?')>-1){
    let arr=url.match(/(.*?)\?(.*)/);
    return arr[2].split('&');
  }else{
    console.warn("path is not including game path")
  }
}
defineProp(global,'__START_TIME__',new Date().getTime());