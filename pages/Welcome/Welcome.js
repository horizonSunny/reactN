/**
 * Created by ZuoXiaoFei on 2018.9.1.
 */
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  BackHandler,
  ImageBackground,
  ToastAndroid} from 'react-native';
import ButtonImg from "../../components/ButtonImg/ButtonImg";
import BaseInfo from "../OneLevel/BaseInfo/BaseInfo";
export default class Welcome extends React.Component{
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props){
    super(props);
    this._didFocusSubscription=props.navigation.addListener('didFocus',payLoad => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    })
  }
  handleBackPress=()=>{
    console.log('点击后退了')
    if(this.backStartTime&&Date.now()-this.backStartTime<2000){
      console.log('退出')
      return false;
    }
    this.backStartTime=Date.now();
    ToastAndroid.show('再按一次退出',1000);
    return true;
  };
  handleStart=(id)=>{
    this.props.navigation.navigate('BaseInfo')
  };
  componentDidMount() {
    this._willBlurSubscription=this.props.navigation.addListener('willBlur',payLoad => {
      console.log('移除')
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    })
  }
  componentWillUnmount() {
    this.backStartTime=null;
    console.log('unmount');
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    this._willBlurSubscription&&this._willBlurSubscription.remove();
    this._didFocusSubscription&&this._didFocusSubscription.remove();
  }
  render(){

    const {navigation}=this.props;
    const username=navigation.getParam('username');
    return (
      <View style={style.container}>
       <ImageBackground source={require('./img/bk1.png')} style={{width: '100%', height: '100%'}}>
         <View>
         </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{includeFontPadding:false,fontSize:font(138),color:'#ffffff',marginTop:dp(298),fontWeight:'bold'}}>脑健康体检</Text>
            <Text style={{includeFontPadding:false,fontSize:font(86),color:'#ffffff'}}>痴呆风险筛查</Text>
            <Text  style={{includeFontPadding:false,fontSize:font(34),color:'#ffffff',marginTop:dp(26)}}>北京市公共卫生服务体系</Text>
            <Text  style={{includeFontPadding:false,fontSize:font(40),color:'#ffffff',marginTop:dp(100)}}>脑健康加油站</Text>
            <ButtonImg
              source={require('./img/startBtn.png')}
              sourcePress={require('./img/startBtnPress.png')}
              style={{width:dp(382),height:dp(95),marginTop:dp(30)}}

              onPress={this.handleStart}><Text style={{fontSize:font(40),fontWeight:'bold',color:'#ffffff'}}>立即开始</Text></ButtonImg>
          </View>
       </ImageBackground>
      </View>
    )
  }
};
const style=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    fontSize:30
  }
});