/**
 * Created by zxf on 2018.9.10.
 */
import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
export default class BottomBar extends React.PureComponent{
  render(){
    return(
      <View style={{width:'100%',position:'absolute',bottom:0}}>
        <ImageBackground source={require('./img/bottom.png')} style={{height:dp(58),justifyContent:'center',alignItems:'flex-end'}}>
          <Text style={{color:'#ffffff',fontSize:font(22),marginRight:dp(100)}}>北京师范大学认识神经科学与学习国家重点实验室</Text>
        </ImageBackground>
      </View>
    )
  }
}

