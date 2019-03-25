/**
 * Created by ZuoXiaoFei on 2018.9.2.
 */
import React from 'react'
import {Text, TouchableNativeFeedback, View,StyleSheet} from 'react-native'
import PropTypes from 'prop-types';

class MyButton extends React.Component{
  constructor(props){
    super(props);
    this.nativeButton=React.createRef();
  }
  state={
    disabled:false
  }
  static defaultProps={
    scu:false
  }
  static propTypes={
    scu:PropTypes.bool.isRequired
  }
  setDisable=(value)=>{
    this.setState({
      disabled:value
    })
  }
  // shouldComponentUpdate(nextProps,nextState){
  // 	console.log(this.props.scu!==nextProps.scu,nextState.disabled!==this.state.disabled)
  //   return this.props.scu!==nextProps.scu||nextState.disabled!==this.state.disabled
  // }
  render(){
    return (
      <TouchableNativeFeedback
        disabled={this.state.disabled}
        ref={this.nativeButton}
        background={TouchableNativeFeedback.Ripple(this.props.rippleColor?this.props.rippleColor:'#a2a4a6',false)}
        onPress={this.props.onPress}>
        <View style={[styles.button,this.props.style]}>
          <Text>{ this.props.children}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
export default MyButton
const styles=StyleSheet.create({
  button:{
    width:dp(100),
    height:dp(50),
    position:'relative',
    zIndex:333,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  text:{
    fontSize:font(20),
    flex:1,
    color:'#ffffff',
    textAlignVertical:'center'
  }
})
MyButton.propTypes={
  onPress:PropTypes.func

};
MyButton.defaultProps={

  onPress:()=>{}
};
